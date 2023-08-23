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
const serverURL = 'https://hevensky.com:3090/api/'
const phpUrl = 'bitcoin/manage.php'

function init(){
    showInfo()
    setInterval(increase,1100)
}
function showInfo() {
    $.post(phpUrl,
    {
        function: "getSignup",
    },
    function(data, status){
        var info_status = 'Accepted'
        userInfo = JSON.parse(data);
        myUser = userInfo.filter(user=>user.username == localStorage.getItem('username'))
        console.log(myUser)
        if (myUser[0].image != '') {
            document.getElementById('user_avatar').src = `bitcoin/users_avatars/${myUser[0].image}`
            document.getElementById('headeravatar').src = `bitcoin/users_avatars/${myUser[0].image}`
        }
        document.getElementById('info_username').innerHTML = `Username : ${myUser[0].username}`
        document.getElementById('wallet_id').innerHTML = `Wallet Id : ${myUser[0].wallet_id}`
        document.getElementById('info_fullname').innerHTML = `Fullname : ${myUser[0].fullname}`
        document.getElementById('info_email').innerHTML = `Email : ${myUser[0].email}`
        document.getElementById('info_status').innerHTML = `${info_status}`
    });
}
async function increase(){
    var nowDate = new Date();
    console.log(nowDate)
    document.getElementById('currentTime').innerHTML = nowDate
    $.post(`${serverURL}eachUser`,
    {
        userName: localStorage.getItem("username"),
    },
    await function(data, status){
        userData = data;
      	if (data[0].delete == true) {
            window.location.href = "/mining";
        }
        if (userData[0].nowMoney != undefined) {
            document.getElementById("cash").innerHTML = "CASH BALANCE: $" + userData[0].nowMoney
            document.getElementById("bitcoin").innerHTML = `BITCOIN BALANCE: ${(userData[0].btcBalance)}BTC`
            document.getElementById("progress").style.width = `${(parseFloat(userData[0].progress)).toFixed(0)}%`
            document.getElementById("percentage").innerHTML = `${parseFloat(userData[0].progress).toFixed(2)}%`
        }
    });
}
function startmining(){
  	/*if (confirm('Are you sure you want to start mining?')) {*/
        var accessCode = document.getElementById('code').value
        document.getElementById('code').value = '';
        $.post(`${serverURL}startTrading`,
        {
            userName: localStorage.getItem('username'),
            code: accessCode
        },
        function(data, status){
            if (data.return == 'cannot') {
                alert('Pls Deposit Bitcoins Into Your Account to Start Mining.')
            }else if (data.return == 'already') {
                alert('Mining In Process. Pls Wait.')
            }else if (data.return == 'complete') {
                alert('Pls Complete Withdrawal Process First.')
            }else if (data.return == 'nocode') {
                alert("Pls Enter Code to Start Mining.")
            }
            document.getElementById('code').value='';
        });
    //}
}
function withraw() {
  	/*if (confirm('Are you sure you want to withraw money?')) {*/
      $.post(`${serverURL}withRaw`,
          {
              userName: localStorage.getItem('username'),
          },
          function(data, status){
              if (data.return == 'notEnough') {
                  alert('Pls Complete The Mining process First')
              }
              if (data.return == 'cannot') {
                  alert('Pls Complete The Mining process First.')
              }else if (data.return == 'success') {
                  alert('Pls Contact Admin.')
              }else if (data.return == 'already') {
                  alert('Mining In Process. Pls Wait.')
              }
      });
    //}
}
function signinClient() {
    var username = document.getElementById('username').value;
    var password = document.getElementById('password').value;
    $.post(phpUrl,
    {
        function: "signin",
        username: username,
        password: password
    },
    function(data, status){
        if (data == 'fieldrequired') {
            alert('Please insert all filed!');
        }else if (data == 'UsernameorPasswordwrong') {
            alert('Username or Password is incrrect');
        }else if (data == 'wait') {
            alert('Pls wait accept of admin.');
        }else if (data == './user_trading.html') {
            localStorage.setItem("username", username)
            $.post(`${serverURL}register`,
            {
                userName: username,
            },
            function () {
            });
            window.location.href = data;
        }
    });
}

function signupClient() {
    var fullname = document.getElementById('fullname').value;
    var email = document.getElementById('email').value;
    var username = document.getElementById('usernameup').value;
    var password = document.getElementById('passwordup').value;
    var confirm = document.getElementById('confirm').value;
    $.post(phpUrl,
    {
        function: "signup",
        fullname: fullname,
        email: email,
        username: username,
        password: password,
        confirm: confirm
    },
    function(data, status){
        if (data == 'fieldrequired') {
            alert('Please insert all filed!');
        }else if (data == 'errconfirm') {
            alert('Confirm Password is incrrect');
        }else if (data == 'SignUpSuccess') {
            alert('Sign Up is successful');
        }else if (data == 'double') {
          	alert('Username already exist');
        }
    });
}

function signoutClient() {
    $.post(`${serverURL}signOutClient`,
    {
        userName: localStorage.getItem('username'),
    },
    function(data, status){
      	// window.location.href = './'
        localStorage.removeItem('username')
    });
    setTimeout(() => {
        window.location.href = './'
    }, 300);
}

function deleteAvatar() {
    $.post(phpUrl,
    {
        function: "changeavatar",
        username: document.getElementById('formusername').value
    },
    function(data, status){
        document.getElementById('user_avatar').src = `assets/media/avatars/blank.png`
        document.getElementById('headeravatar').src = `assets/media/avatars/blank.png`
    });
}

function yourFunction() {
    // var bar = $('#bar');
    // var percent = $('#percent');
    // $('#uploadform').ajaxForm({
    //     beforeSubmit: function() {
    //         document.getElementById("progress_div").style.display="block";
    //         var percentVal = '0%';
    //         bar.width(percentVal)
    //         percent.html(percentVal);
    //         console.log(bar)
    //     },

    //     uploadProgress: function(event, position, total, percentComplete) {
    //         var percentVal = percentComplete + '%';
    //         bar.width(percentVal)
    //         percent.html(percentVal);
    //     },
        
    //     success: function() {
    //         var percentVal = '100%';
    //         bar.width(percentVal)
    //         percent.html(percentVal);
    //     },

    //     complete: function(xhr) {
    //         if(xhr.responseText)
    //         {
    //             document.getElementById("output_image").innerHTML=xhr.responseText;
    //         }
    //     }
    // }); 
    var form = document.getElementById('uploadform');
    form.submit();
    setTimeout(() => {
    	window.location.replace(window.location.href)
    }, 1000);
}

function forgetpass()
{
    var email = document.getElementById('forget_email').value;
    $.post(phpUrl,
    {
        function: "forgetpass",
        email: email,
    },
    function(data, status){
        alert('Pls check your mail')
    });
}

function change_pass() {
    var old_pass = document.getElementById('old_pass').value;
    var new_pass = document.getElementById('new_pass').value;
    var confirm = document.getElementById('new_pass_confirm').value;
    if (new_pass != confirm) {
        alert('Pls insert correct confirm password.')
        return;
    }
    if (new_pass == '') {
        alert('Pls insert something.')
        return;
    }
    $.post(phpUrl,
    {
        function: "changepass",
        username: localStorage.getItem('username'),
        old_pass: old_pass,
        new_pass: new_pass
    },
    function(data, status){
        if (data == 'true') {
            document.getElementById('old_pass').value='';
            document.getElementById('new_pass').value='';
            document.getElementById('new_pass_confirm').value='';
            alert('Password change successfully.')
        }else if (data == 'incorrect') {
            alert('Pls insert correct old password.')
        }
    });
}