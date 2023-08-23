const cors = require("cors");
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');

//https://javascript.plainenglish.io/build-your-own-forward-and-reverse-proxy-server-using-node-js-from-scratch-eaa0f8d69e1f
//https://github.com/kasattejaswi/nodejs-proxy-server/blob/main/proxy.js

const bit = [
    {start:0, end: 49.765109-0.050043},
    {start:0.0050125, end: 5.015900-0.0050125},
    {start:0.050043, end: 49.765109-0.050043},
]
const cash = [
    {start:0, end: 990000},
    {start:100, end: 99000},
    {start:1000, end: 990000},
]

const app = express();
app.use(bodyParser.urlencoded({ extended: false }))
const server = https.createServer(app);
const PORT = 9999;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})
app.use(cors({origin: '*'}));
app.use(express.json())

var tradingUsers = [];

function tradingPrice() {
    for (let i = 0; i < tradingUsers.length; i++) {
        if (tradingUsers[i].status == true) {
            tradingUsers[i].nowMoney = parseInt(tradingUsers[i].nowMoney) + parseInt(tradingUsers[i].startMoney/100)
        }        
    }
}
setInterval(() => {
    increase()
}, 1000);

app.get('/', function (req, res) {
    console.log('server is running it')
  	return res.json({'return': 'success'})
})
app.post('/api/startTrading', function(req, res){
    for (let i = 0; i < tradingUsers.length; i++) {
        if (tradingUsers[i].userName == req.body.userName) {
            if (tradingUsers[i].startMoney != 0) {
                if (tradingUsers[i].nowMoney == cash[tradingUsers[i].priceLVL].end) {
                    return res.json({'return': 'complete'})
                }else if (tradingUsers[i].status == true) {
                    return res.json({'return': 'already'})
                }else {
                    if (req.body.code == 'word2022') {
                        tradingUsers[i].status = true;
                    }else {
                        return res.json({'return': 'nocode'})
                    }
                }
            }else {
                return res.json({'return': 'cannot'})
            }
        }        
    }
});

app.post('/api/withRaw', function(req, res){
    for (let i = 0; i < tradingUsers.length; i++) {
        if (tradingUsers[i].userName == req.body.userName) {
            if (tradingUsers[i].startMoney && tradingUsers[i].status == false) {
                // tradingUsers[i].status = true;
                return res.json({'return': 'notEnough'})
            }
            if (tradingUsers[i].startMoney == 0) {
                return res.json({'return': 'notEnough'})
            }
            if (tradingUsers[i].status == true) {
                return res.json({'return': 'already'})
            }
            if (tradingUsers[i].nowMoney == cash[tradingUsers[i].priceLVL].end) {
                return res.json({'return': 'success'})
            }
        }        
    }
});

app.post('/api/stopTrading', function(req, res){
    for (let i = 0; i < tradingUsers.length; i++) {
        if (tradingUsers[i].userName == req.body.userName) {
          if (req.body.sure == 'true') {
            return res.json({'return': tradingUsers[i].status?'true':'false'})
          }else if (req.body.sure == 'false') {
          	tradingUsers[i].startMoney = 0
            tradingUsers[i].nowMoney = 0
            tradingUsers[i].priceLVL = 0
            tradingUsers[i].btcBalance = 0
            tradingUsers[i].progress = 0
            tradingUsers[i].status = false;
            return res.json({'return': 'success'})
          }
        }        
    }
});

app.post('/api/adminUserDelete', function(req, res){
    for (let i = 0; i < tradingUsers.length; i++) {
        if (tradingUsers[i].userName == req.body.userName) {
            tradingUsers[i].delete = true;
          	tradingUsers[i].online = false;
            return res.json({'return': 'success'})
        }
    }
});

app.post('/api/accessAccept', function(req, res){
    for (let i = 0; i < tradingUsers.length; i++) {
        if (tradingUsers[i].userName == req.body.userName) {
            if (tradingUsers[i].accept == undefined) {
                return res.json({'return': 'noonline'})
            }else if (tradingUsers[i].accept == false) {
                if (tradingUsers[i].online == false) {
                    return res.json({'return': 'noonline'})
                }else {
                    tradingUsers[i].accept = true;
                    return res.json({'return': 'success'})
                }
            }else if (tradingUsers[i].accept == true) {
                return res.json({'return': 'already'})
            }
        }
    }
});

app.post('/api/adminUserPriceSet', function(req, res){
    for (let i = 0; i < tradingUsers.length; i++) {
        if (tradingUsers[i].userName == req.body.userName) {
            if (tradingUsers[i].status == true) {
                return res.json({'return': 'started'})
            }else {
                tradingUsers[i].startMoney = req.body.price
                tradingUsers[i].nowMoney = req.body.price
                tradingUsers[i].priceLVL = req.body.priceLVL

                tradingUsers[i].ENVfirst1 = bit[req.body.priceLVL].start
                tradingUsers[i].ENVunit2 = cash[req.body.priceLVL].end
                tradingUsers[i].ENVunit1 = (bit[req.body.priceLVL].end)/tradingUsers[i].ENVunit2
                tradingUsers[i].ENVfirst2 = cash[req.body.priceLVL].start
                tradingUsers[i].ENVvalue = cash[req.body.priceLVL].start
                tradingUsers[i].ENVprogress = 100*(tradingUsers[i].ENVvalue-tradingUsers[i].ENVfirst2)/tradingUsers[i].ENVunit2
                tradingUsers[i].btcBalance = tradingUsers[i].ENVfirst1 + tradingUsers[i].ENVunit1*(tradingUsers[i].ENVvalue-tradingUsers[i].ENVfirst2)
                return res.json({'return': 'success'})
            }
        }
    }
});

app.post('/api/eachUser', async function(req, res){
  	for (let i = 0; i < tradingUsers.length; i++) {
        tradingUsers[i].onlineNum = 0
    }
    if (tradingUsers.filter(user=>user.userName==req.body.userName).delete == false) {
        return res.json(tradingUsers.filter(user=>user.userName==req.body.userName))
    }else {
    	return res.json(tradingUsers.filter(user=>user.userName==req.body.userName))
    }
});

app.post('/api/adminGetUser', function(req, res){
    return res.json(tradingUsers)
});

app.post('/api/register', function(req, res){
    for (let i = 0; i < tradingUsers.length; i++) {
        if (tradingUsers[i].userName == req.body.userName) {
            tradingUsers[i].startMoney = tradingUsers[i].startMoney ? tradingUsers[i].startMoney : 0
            tradingUsers[i].nowMoney = tradingUsers[i].nowMoney ? tradingUsers[i].nowMoney : 0
            tradingUsers[i].status = tradingUsers[i].status ? tradingUsers[i].status : false
            tradingUsers[i].priceLVL = tradingUsers[i].priceLVL ? tradingUsers[i].priceLVL : 0
            tradingUsers[i].btcBalance = tradingUsers[i].btcBalance ? tradingUsers[i].btcBalance : 0
            tradingUsers[i].progress = tradingUsers[i].progress ? tradingUsers[i].progress : 0
            tradingUsers[i].delete = false;
            tradingUsers[i].online = true;
            tradingUsers[i].onlineNum = 0;
            tradingUsers[i].accept = false;
        }
    }
});

app.post('/api/signOutClient', function(req, res){
    for (let i = 0; i < tradingUsers.length; i++) {
        if (tradingUsers[i].userName == req.body.userName) {
            tradingUsers[i].online = false;
            tradingUsers[i].accept = false;
            return res.json({'return': 'success'})
        }
    }
});

app.post('/api/giveAllUsers', function(req, res){
    console.log(req.body)
  	if (tradingUsers.length != JSON.parse(req.body.data).length){
	    tradingUsers = JSON.parse(req.body.data);
    }
});

function increase(){
    for (let i = 0; i < tradingUsers.length; i++) {
      	if(tradingUsers[i].onlineNum == 0){
          	tradingUsers[i].online = true
        }
      	if (tradingUsers[i].onlineNum > 2) {
            tradingUsers[i].online = false
            tradingUsers[i].accept = false
        }else {
            tradingUsers[i].onlineNum++
        }
        let value = tradingUsers[i].ENVvalue
        if(value < tradingUsers[i].ENVfirst2+tradingUsers[i].ENVunit2 && tradingUsers[i].status == true) {
            let progress = 100*(value-tradingUsers[i].ENVfirst2)/tradingUsers[i].ENVunit2
            value=value+1;
            tradingUsers[i].nowMoney = value
            tradingUsers[i].ENVvalue = value
            tradingUsers[i].btcBalance = tradingUsers[i].ENVfirst1 + tradingUsers[i].ENVunit1*(value-tradingUsers[i].ENVfirst2)
            tradingUsers[i].progress = progress
        }
    }
}