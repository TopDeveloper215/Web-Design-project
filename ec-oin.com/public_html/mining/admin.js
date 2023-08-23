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

var userData = {};

function Stopmining(username){
    $.post(`${serverURL}stopTrading`,
    {
    	userName: username,
        sure: 'true',
  	},
    function(data, status){
      if (data.return == 'true'){
		if (confirm('Are you sure you want to stop mining?')) {
          	$.post(`${serverURL}stopTrading`,
            {
                userName: username,
                sure: 'false',
            },
            function(data, status){
              	
            })
         }
       }else {
        alert('Pls start mining first.')
       }
   	});
}

function Cash(lvl, username){
    var price = cash[lvl].start
    $.post(`${serverURL}adminUserPriceSet`,
    {
        userName: username,
        price: price,
        priceLVL: lvl
    },
    function(data, status){
        if (data.return == 'started') {
            alert('Pls first stop mining.')
        }else if (data.return == 'noaccept') {
            alert('This user doesn\'t have access.')
        }else if (data.return == 'noonline') {
            alert('This user is offline.')
        }
    });
}

function getSignup() {
                $.post(phpUrl,
                {
                    function: "getSignup",
                },
                function(data, status){
                    userInfo = JSON.parse(data);
                    console.log(userInfo)
                    var htmlValue = ``
                    var statusUser = '';
                    var button = ``;
                    for (let i = 0; i < userInfo.length; i++) {
                        if (userInfo[i].wallet_id == null || userInfo[i].wallet_id == '') {
                            var wallet_id = `Empty`
                            var buttonwallet = `<button data-bs-toggle="modal" data-bs-target="#insert_wallet" style="float: right" type="button" class="btn btn-primary" onclick="insert_wallet('','${userInfo[i].id}')">INSERT</button>`
                        }else {
                            var wallet_id = `${userInfo[i].wallet_id}`
                            var buttonwallet = `<button data-bs-toggle="modal" data-bs-target="#insert_wallet" style="float: right" type="button" class="btn btn-success" onclick="insert_wallet('${userInfo[i].wallet_id}','${userInfo[i].id}')">UPDATE</button>`
                        }
                        if (userInfo[i].status == 'true') {
                            statusUser = 'Accepted'
                            button = `<button type="button" class="btn btn-danger" onclick="deleteUser(${userInfo[i].id})">DELETE</button>`;
                        }else if (userInfo[i].status == 'false') {
                            statusUser = 'Require Accept'
                            button = `<button type="button" class="btn btn-success" onclick="acceptUser(${userInfo[i].id})">ACCEPT</button>`;
                        }
                        htmlValue += `<tr>
                                    <td>${userInfo[i].id}</td>
                                    <td>${userInfo[i].username}</td>
                                    <td>${userInfo[i].fullname}</td>
                                    <td>${userInfo[i].email}</td>
                                    <td>${wallet_id}</td>
                                    <td>${buttonwallet}</td>
                                    <td>${button}</td>
                                </tr>`
                    }
                    $("#allusers").html(htmlValue);
                });
}

function deleteUser(user_id) {
  	if (confirm('Are you sure you want to delete?')) {
        $.post(phpUrl,
        {
            function: "deleteUser",
            user_id: user_id
        },
        function(data, status){
            if (data == true) {
                alert('Successfully delete this user')
                getSignup()
            }
        });
    }
}

function accessAccept(username) {
    $.post(`${serverURL}accessAccept`,
    {
        userName: username,
    },
    function(data, status){
        if (data.return == 'success') {
            alert('This user is accepted')
        }else if (data.return == 'already') {
            alert('This user is already accepted')
        }else  if (data.return == 'noonline') {
            alert('This user is offline.')
        }
    });
}

function admin() {
    getAllUsers();
    setInterval(adminprogress, 2000)
}
function getAllUsers(){
    $.post(phpUrl,
    {
        function: "getAllUsers",
    },
    function(data, status){
        if (data) {
            userData = JSON.parse(data);
            userData = userData.filter(user=>user.userName != 'admin');
            console.log(userData)
            userData = userData.filter(user=>user.status == 'true');
            data = JSON.stringify(userData)
            $.post(`${serverURL}giveAllUsers`,
            {data});
            var element = '';
            for (let i = 0; i < userData.length; i++) {
                if (userData[i].online) {
                    var online = `<span class="position-absolute top-50 start-0 translate-middle p-2 bg-primary border border-light rounded-circle">
  </span>`
                }else {
                    var online = `<span class="position-absolute top-50 start-0 translate-middle p-2 bg-danger border border-light rounded-circle">
  </span>`
                }
                if (userData[i].accept) {
                    var acceptF = 'ACCEPTED'
                }else {
                    var acceptF = "NOACCEPT"
                }
                element +=`
                                <!--begin::Menu 3-->
                                <div class="menu-column menu-rounded menu-gray-800 menu-state-bg-light-primary fw-bold" data-kt-menu="true" style="text-align:right">
                                    <!--begin::Menu item-->
                                    <div class="menu-item px-3 position-relative" data-kt-menu-trigger="hover" data-kt-menu-placement="right-end" style="display:inline-block">
										<div id="online${userData[i].userName}">
                                            ${online}
										</div>
                                        <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">
                                        Select Cash
                                        </button>
                                        <ul class="dropdown-menu">'
                                            <li><a class="dropdown-item" onclick='Cash(0, "${userData[i].userName}")'>0</a></li>
                                            <li><a class="dropdown-item" onclick='Cash(1, "${userData[i].userName}")'>100</a></li>
                                            <li><a class="dropdown-item" href="#" onclick='Cash(2, "${userData[i].userName}")'>1000</a></li>
                                        </ul>
                                    </div>
                                    <!--end::Menu item-->
                                    <!--begin::Menu item-->
                                    <div class="menu-item px-3 my-1" style="display:inline-block">
                                        <button class="btn btn-primary form-control-solid" type="button" onclick="Stopmining('${userData[i].userName}')">Stop Mining</button>
                                    </div>
                                    <!--end::Menu item-->
                                </div>
                                <!--end::Menu 3-->
								<div class="fv-row mb-10" style="width:400px; float:left">
                                    <div class="d-flex align-items-center">
                                        <!--begin::Logo-->
                                        <div class="symbol symbol-50px me-2">
                                            <span class="symbol-label">
                                                <img alt="" class="w-25px" src="assets/media/avatars/download.png" />
                                            </span>
                                        </div>
                                        <!--end::Logo-->
                                        <div class="ps-3">
                                            <a href="../dist/account/overview.html" class="text-gray-800 fw-boldest fs-5 text-hover-primary mb-1" id="eachUser${userData[i].userName}">Username: ${userData[i].userName}</a>
                                            <span class="text-gray-800 fw-bold d-block" id="cash${userData[i].userName}">CASH BALANCE: $0</span>
                                            <span class="text-gray-800 fw-bold d-block" id="bitcoin${userData[i].userName}">BITCOIN BALANCE: 0BTC</span>
                                        </div>
                                    </div>
                                </div>
                              	<div class="fv-row mb-10">
                                    <div class="d-flex flex-column w-100 me-2 mt-2">
                                        <span class="text-gray-800 me-2 fw-boldest mb-2" id="percentage${userData[i].userName}">0.00%</span>
                                        <div class="progress bg-light-primary w-100 h-30px">
                                            <div id="progress${userData[i].userName}" class="progress-bar progress-bar-striped bg-success" justify-content: center; role="progressbar" aria-label="Success striped example" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>
                                    </div>
                                </div>`
            }
            document.getElementById('tradingUsers').innerHTML = element;
        }
    });
}

function adminprogress(){
    $.post(`${serverURL}adminGetUser`,
    {},
    function(data, status){
        if (data) {
            userData = data;
            var element = '';
            for (let i = 0; i < userData.length; i++) {
                if (userData[i].online) {
                    var online = `<span class="position-absolute top-50 start-0 translate-middle p-2 bg-primary border border-light rounded-circle">
  </span>`
                }else {
                    var online = `<span class="position-absolute top-50 start-0 translate-middle p-2 bg-danger border border-light rounded-circle">
  </span>`
                }
                if (userData[i].accept) {
                    var acceptF = 'ACCEPTED'
                }else {
                    var acceptF = "NOACCEPT"
                }
                if (userData[i].nowMoney != undefined) {
                    document.getElementById(`cash${userData[i].userName}`).innerHTML = `CASH BALANCE: $${userData[i].nowMoney}`;
                    document.getElementById(`bitcoin${userData[i].userName}`).innerHTML = `BITCOIN BALANCE: ${(userData[i].btcBalance)}BTC`;
                    document.getElementById(`eachUser${userData[i].userName}`).innerHTML = `Username: ${userData[i].userName}`;
                    document.getElementById(`online${userData[i].userName}`).innerHTML = online;
                    //document.getElementById(`accept${userData[i].userName}`).innerHTML = acceptF;
                }
                if (userData[i].progress != undefined) {
                    document.getElementById(`progress${userData[i].userName}`).style.width = `${(parseFloat(userData[i].progress)).toFixed(0)}%`;
                    document.getElementById(`percentage${userData[i].userName}`).innerHTML = `${(userData[i].progress).toFixed(2)}%`;
                }
            }
        }
    });
}
function signinAdmin() {
    var username = document.getElementById('exampleInputEmail1').value;
    if (username != 'admin') {
        alert('Pls insert admin account info')
        return
    }
    var password = document.getElementById('exampleInputPassword1').value;
    $.post(phpUrl,
    {
        function: "adminsignin",
        username: 'admin',
        password: password
    },
    function(data, status){
        if (data == 'fieldrequired') {
            alert('Please insert all filed!');
        }else if (data == 'UsernameorPasswordwrong') {
            alert('Username or Password is incrrect');
        }else {
            localStorage.setItem("admin", username)
            window.location.href = data;
        }
    });
}
function signoutAdmin() {
    localStorage.removeItem('admin')
    window.location.href = "./admin_login.html"
}
function acceptUser(user_id) {
    $.post(phpUrl,
    {
        function: "wallet_sure",
        user_id: user_id
    },
    function(data, status){
        if (data == 'true') {
            if (confirm('Are you sure you want to accept?')) {
                $.post(phpUrl,
                {
                    function: "acceptUser",
                    user_id: user_id
                },
                function(data, status){
                    if (data == 'true') {
                        alert('Successfully accept this user.')
                        getSignup()
                    }else if (data == 'nowallet') {
                        alert('Pls Insert Wallet I.D')
                    }
                });
            }
            getSignup()
        }else if (data == 'nowallet') {
            alert('Pls Insert Wallet I.D')
        }
    });
}


function deleteAvatar() {
    $.post(phpUrl,
    {
        function: "changeavatar",
        username: document.getElementById('formusername').value
    },
    function(data, status){
        document.getElementById('adminavatar').src = `assets/media/avatars/blank.png`
        document.getElementById('admin_avatar').src = `assets/media/avatars/blank.png`
    });
}

function insert_wallet(wallet_id, id) {
    document.getElementById('user_id').value = id
    document.getElementById('input_wallet').value = wallet_id
}

function save_wallet_id() {
    $.post(phpUrl,
    {
        function: "save_wallet_id",
        user_id: document.getElementById('user_id').value,
        address: document.getElementById('input_wallet').value
    },
    function(data, status){
        alert('Successfully changed!')
        getSignup()
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
        username: 'admin',
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
///////datatable

$(document).ready(function () {
    //insert data
    $.post(phpUrl,
    {
        function: "getSignup",
    },
    function(data, status){
        userInfo = JSON.parse(data);
        // if (userInfo.filter(user=>user.username == 'admin')[0].image != '') {
        //     document.getElementById('adminavatar').src = 'bitcoin/users_avatars/'+userInfo.filter(user=>user.username == 'admin')[0].image
        //     document.getElementById('admin_avatar').src = 'bitcoin/users_avatars/'+userInfo.filter(user=>user.username == 'admin')[0].image
        // }
        userInfo = userInfo.filter(user=>user.username != 'admin');
        var htmlValue = ``
        var statusUser = '';
        var button = ``;
        for (let i = 0; i < userInfo.length; i++) {
            if (userInfo[i].wallet_id == null || userInfo[i].wallet_id == '') {
                var wallet_id = `Empty`
                var buttonwallet = `<button data-bs-toggle="modal" data-bs-target="#insert_wallet" style="float: right" type="button" class="btn btn-primary" onclick="insert_wallet('','${userInfo[i].id}')">INSERT</button>`
            }else {
                var wallet_id = `${userInfo[i].wallet_id}`
                var buttonwallet = `<button data-bs-toggle="modal" data-bs-target="#insert_wallet" style="float: right" type="button" class="btn btn-success" onclick="insert_wallet('${userInfo[i].wallet_id}','${userInfo[i].id}')">UPDATE</button>`
            }
            if (userInfo[i].status == 'true') {
            statusUser = 'Accepted'
            button = `<button type="button" class="btn btn-danger" onclick="deleteUser(${userInfo[i].id})">DELETE</button>`;
            }else if (userInfo[i].status == 'false') {
            statusUser = 'Require Accept'
            button = `<button type="button" class="btn btn-success" onclick="acceptUser(${userInfo[i].id})">ACCEPT</button>`;
            }
            htmlValue += `<tr>
                            <td>${userInfo[i].id}</td>
                            <td>${userInfo[i].username}</td>
                            <td>${userInfo[i].fullname}</td>
                            <td>${userInfo[i].email}</td>
                            <td>${wallet_id}</td>
                            <td>${buttonwallet}</td>
                            <td>${button}</td>
                        </tr>`
        }
        $("#allusers").html(htmlValue);
    
        // Setup - add a text input to each footer cell
        /*$('#example tfoot th').each(function () {
            var title = $(this).text();
            $(this).html(`<input style="width:100%" type="text" placeholder="${title}" />`);
        });*/
    
        // DataTable
        var table = $('#example').removeAttr('width').DataTable({
          autoWidth:true,
            initComplete: function () {
                // Apply the search
                this.api()
                    .columns()
                    .every(function () {
                        var that = this;
    
                        $('#search', this.footer()).on('keyup change clear', function () {
                            if (that.search() != this.value) {
                                that.search(this.value).draw();
                            }
                        });
                    });
            },
        });
    });
});