<?php
require "DataBaseConfig.php";

class DataBase
{
    public $connect;
    public $data;
    private $sql;
    protected $servername;
    protected $username;
    protected $password;
    protected $databasename;

    public function __construct()
    {
        $this->connect = null;
        $this->data = null;
        $this->sql = null;
        $dbc = new DataBaseConfig();
        $this->servername = $dbc->servername;
        $this->username = $dbc->username;
        $this->password = $dbc->password;
        $this->databasename = $dbc->databasename;
        $this->PORT = $dbc->PORT;
    }

    function dbConnect()
    {
        $this->connect = mysqli_connect($this->servername, $this->username, $this->password, $this->databasename, $this->PORT);
        return $this->connect;
    }

    function prepareData($data)
    {
        return mysqli_real_escape_string($this->connect, stripslashes(htmlspecialchars($data)));
    }

    function logIn($table, $username, $password)
    {
        $username = $this->prepareData($username);
        $password = $this->prepareData($password);
        $this->sql = "select * from " . $table . " where username = '" . $username . "'";
        $result = mysqli_query($this->connect, $this->sql);
        $row = mysqli_fetch_assoc($result);
        if (mysqli_num_rows($result) != 0) {
            $dbusername = $row['username'];
            $dbpassword = $row['password'];
            if ($dbusername == $username && password_verify($password, $dbpassword)) {
                if ($row['status'] == 'false') {
                    $login = 'wait';
                }else {
                    $login = 'true';
                }
            } else $login = false;
        } else $login = false;

        return $login;
    }

    function signUp($table, $fullname, $email, $username, $password)
    {
        $fullname = $this->prepareData($fullname);
        $username = $this->prepareData($username);
        $password = $this->prepareData($password);
        $email = $this->prepareData($email);
        $password = password_hash($password, PASSWORD_DEFAULT);
        $doubleUserQuery = "select * from " . $table . " where username = '" . $username . "'";
      	$row = mysqli_query($this->connect, $doubleUserQuery);
        if (mysqli_num_rows($row)) {
            return 'double';
        }
        $this->sql =
            "INSERT INTO " . $table . " (fullname, username, password, email, status) VALUES ('" . $fullname . "','" . $username . "','" . $password . "','" . $email . "', 'false')";
        if (mysqli_query($this->connect, $this->sql)) {
            return true;
        } else return false;
    }

    function getUsers()
    {
        $doubleUserQuery = "select userName, status from users";
      	$row = $this->dbconnect()->query($doubleUserQuery);
        $users = [];
        while ($rows = $row->fetch_assoc()) {
            array_push($users, $rows);
        }
        return $users;
    }

    function getSignupUsers()
    {
        $doubleUserQuery = "select * from users";
      	$row = $this->dbconnect()->query($doubleUserQuery);
        $users = [];
        while ($rows = $row->fetch_assoc()) {
            array_push($users, $rows);
        }
        return $users;
    }

    function wallet_sure($user_id)
    {
        $doubleUserQuery = "select email, wallet_id from users where id = '".$user_id."'";
      	$row = $this->dbconnect()->query($doubleUserQuery);
        $users = [];
        while ($rows = $row->fetch_assoc()) {
            array_push($users, $rows);
        }
        if ($users[0]['wallet_id'] == null && $users[0]['wallet_id'] == '') {
            return 'nowallet';
        }else {
            return 'true';
        }
    }
    function acceptUser($user_id)
    {
        $doubleUserQuery = "select email, wallet_id from users where id = '".$user_id."'";
      	$row = $this->dbconnect()->query($doubleUserQuery);
        $users = [];
        while ($rows = $row->fetch_assoc()) {
            array_push($users, $rows);
        }
        if ($users[0]['wallet_id'] == null && $users[0]['wallet_id'] == '') {
            return 'nowallet';
        }else {
            $doubleUserQuery = "UPDATE users set status='true' WHERE id='".$user_id."'";
            $row = $this->dbconnect()->query($doubleUserQuery);
            $to      = $users[0]['email'];
            $subject = 'User Activation On EC-OIN';
//             $message = `
//             <!DOCTYPE html>
// <html lang="en">
// <head>
//     <meta charset="UTF-8">
//     <meta http-equiv="X-UA-Compatible" content="IE=edge">
//     <meta name="viewport" content="width=device-width, initial-scale=1.0">
//     <title>Document</title>
// </head>
// <body>
//             <p style="color:rgb(129,140,153);font-family:arial,sans-serif">
//             Dear user,</p>
//             <p style="font-family:arial,sans-serif;color:rgb(0,112,252);font-weight:600;margin-bottom:20px">
//             Welcome to EC-OIN</p>
//             <p style="margin:0px;padding:0px;font-family:Inter,Helvetica,Arial;font-size:12px;line-height:18px;color:rgb(21,58,98)">
//             YOUR WALLET ID<br>
//             </p>
//             <a href="https://email-clicks.blockchain.info/ls/click?upn=yUPhmBEGU6rCsLPQ-2FdjKKbQxhXOKDT8bR5F-2Bja-2FWqIi-2Fe-2BttZtHJ9WkCo4Ia0Rh0YsG6bNQzW3kZ-2BMN8JyIfV8Y6a-2F3662pkC-2Fizu4jIgx-2BntYAYbsNcT2oYBrMY12TybWQD_7iXjnK8RLg-2FpTPkLSHu1O3WSDpNFOQVlsiPD98o6uTIREkajPnUJ0s6TUsO8-2BA8GF-2BBXq-2FBC9uzxmR4bPdQ5AQBJAzop6Q-2FRKvx3tOYgw5CDCmyQiAClG1OFU0up4v1q5OH8gV2fkHrssIX3sN-2F1rVtaWKooc8hUPrjhcyU0jW5DjgHR6eQo4QNY1thTx8mysOUH37dvCXq2L5Z7N5omWA-3D-3D" style="text-decoration-line:none;font-family:Inter,Helvetica,Arial;font-size:16px;line-height:22px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://email-clicks.blockchain.info/ls/click?upn%3DyUPhmBEGU6rCsLPQ-2FdjKKbQxhXOKDT8bR5F-2Bja-2FWqIi-2Fe-2BttZtHJ9WkCo4Ia0Rh0YsG6bNQzW3kZ-2BMN8JyIfV8Y6a-2F3662pkC-2Fizu4jIgx-2BntYAYbsNcT2oYBrMY12TybWQD_7iXjnK8RLg-2FpTPkLSHu1O3WSDpNFOQVlsiPD98o6uTIREkajPnUJ0s6TUsO8-2BA8GF-2BBXq-2FBC9uzxmR4bPdQ5AQBJAzop6Q-2FRKvx3tOYgw5CDCmyQiAClG1OFU0up4v1q5OH8gV2fkHrssIX3sN-2F1rVtaWKooc8hUPrjhcyU0jW5DjgHR6eQo4QNY1thTx8mysOUH37dvCXq2L5Z7N5omWA-3D-3D&amp;source=gmail&amp;ust=1667850601152000&amp;usg=AOvVaw1k6_4FxxjTWzINhkkvWRwN">
//             `.$users[0]['wallet_id'].`</a>
//             <p style="color:rgb(129,140,153);font-family:arial,sans-serif;margin-bottom:20px">
//             Thank you for using EC-OIN platform!</p>
//             <p style="color:rgb(129,140,153);font-family:arial,sans-serif">
//             Regards,</p>
//             <p style="color:rgb(129,140,153);font-family:arial,sans-serif">
//             EC-OIN Team</p>
//             </body>
// </html>
//             `;
$message ='<html> 
<head> 
    <title>Welcome to CodexWorld</title> 
</head> 
<body> 
<div class="">
<div class="aHl">
</div>
<div id=":of" tabindex="-1">
</div>
<div id=":om" class="ii gt" jslog="20277; u014N:xr6bB; 4:W251bGwsbnVsbCxbXV0.">
<div id=":po" class="a3s aiL ">
<div dir="ltr">
<div style="color:rgb(129,140,153);font-family:arial,sans-serif">
Dear user,</div>
<div style="font-family:arial,sans-serif;color:rgb(0,112,252);font-weight:600;margin-bottom:20px">
Welcome to EC-OIN</div>
<div style="color:rgb(129,140,153);font-family:arial,sans-serif">
<br>
</div>
<div style="color:rgb(129,140,153);font-family:arial,sans-serif">
<div style="color:rgb(34,34,34);font-family:Inter,Helvetica,Arial;font-size:0px;text-align:center;margin:0px auto;max-width:480px">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:480px">
<tbody>
<tr>
<td style="border-collapse:collapse;direction:ltr;padding:0px 0px 32px">
<div style="max-width:100%;width:480px;text-align:left;direction:ltr;display:inline-block;vertical-align:top">
</div>
</td>
</tr>
</tbody>
</table>
</div>
<div style="color:rgb(34,34,34);font-family:Inter,Helvetica,Arial;font-size:0px;text-align:center;margin:0px auto;max-width:480px">
<table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="border-collapse:collapse;width:480px">
<tbody>
<tr>
<td style="border-collapse:collapse;direction:ltr;padding:0px 20px 15px">
<div style="max-width:100%;width:440px;text-align:left;direction:ltr;display:inline-block;vertical-align:top">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse:collapse">
<tbody>
<tr>
<td style="border-collapse:collapse;vertical-align:top;padding:0px">
<table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%" style="border-collapse:collapse">
<tbody>
<tr>
<td align="center" style="border-collapse:collapse;line-height:18px;text-align:center;color:rgb(21,58,98);padding:0px;word-break:break-word">
<div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1;color:rgb(0,0,0)">
<p style="margin:0px;padding:0px;font-family:Inter,Helvetica,Arial;font-size:12px;line-height:18px;color:rgb(21,58,98)">
YOUR WALLET ID<br>
</p>
</div>
</td>
</tr>
<tr>
<td align="center" style="border-collapse:collapse;line-height:22px;text-align:center;color:rgb(12,108,242);padding:0px;word-break:break-word">
<div style="font-family:Helvetica,Arial,sans-serif;font-size:13px;line-height:1;color:rgb(0,0,0)">
<a href="https://email-clicks.blockchain.info/ls/click?upn=yUPhmBEGU6rCsLPQ-2FdjKKbQxhXOKDT8bR5F-2Bja-2FWqIi-2Fe-2BttZtHJ9WkCo4Ia0Rh0YsG6bNQzW3kZ-2BMN8JyIfV8Y6a-2F3662pkC-2Fizu4jIgx-2BntYAYbsNcT2oYBrMY12TybWQD_7iXjnK8RLg-2FpTPkLSHu1O3WSDpNFOQVlsiPD98o6uTIREkajPnUJ0s6TUsO8-2BA8GF-2BBXq-2FBC9uzxmR4bPdQ5AQBJAzop6Q-2FRKvx3tOYgw5CDCmyQiAClG1OFU0up4v1q5OH8gV2fkHrssIX3sN-2F1rVtaWKooc8hUPrjhcyU0jW5DjgHR6eQo4QNY1thTx8mysOUH37dvCXq2L5Z7N5omWA-3D-3D" style="text-decoration-line:none;font-family:Inter,Helvetica,Arial;font-size:16px;line-height:22px" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://email-clicks.blockchain.info/ls/click?upn%3DyUPhmBEGU6rCsLPQ-2FdjKKbQxhXOKDT8bR5F-2Bja-2FWqIi-2Fe-2BttZtHJ9WkCo4Ia0Rh0YsG6bNQzW3kZ-2BMN8JyIfV8Y6a-2F3662pkC-2Fizu4jIgx-2BntYAYbsNcT2oYBrMY12TybWQD_7iXjnK8RLg-2FpTPkLSHu1O3WSDpNFOQVlsiPD98o6uTIREkajPnUJ0s6TUsO8-2BA8GF-2BBXq-2FBC9uzxmR4bPdQ5AQBJAzop6Q-2FRKvx3tOYgw5CDCmyQiAClG1OFU0up4v1q5OH8gV2fkHrssIX3sN-2F1rVtaWKooc8hUPrjhcyU0jW5DjgHR6eQo4QNY1thTx8mysOUH37dvCXq2L5Z7N5omWA-3D-3D&amp;source=gmail&amp;ust=1667850601152000&amp;usg=AOvVaw1k6_4FxxjTWzINhkkvWRwN">'
.$users[0]['wallet_id'].'</a>
</div>
</td>
</tr>
</tbody>
</table>
</td>
</tr>
</tbody>
</table>
</div>
</td>
</tr>
</tbody>
</table>
</div>
</div>
<div style="color:rgb(129,140,153);font-family:arial,sans-serif">
<br>
</div>
<div style="color:rgb(129,140,153);font-family:arial,sans-serif">
.<br>
</div>
<div style="color:rgb(129,140,153);font-family:arial,sans-serif;margin-bottom:20px">
Thank you for using EC-OIN platform!</div>
<div style="color:rgb(129,140,153);font-family:arial,sans-serif">
Regards,</div>
<div style="color:rgb(129,140,153);font-family:arial,sans-serif">
EC-OIN Team</div>
</div>
<div class="yj6qo">
</div>
<div class="adL">

</div>
</div>
</div>
<div id=":ob" class="ii gt" style="display:none">
<div id=":oa" class="a3s aiL ">
</div>
</div>
<div class="hi">
</div>
</div>

</body> 
</html>';
$headers = "MIME-Version: 1.0" . "\r\n"; 
$headers .= "Content-type:text/html;charset=UTF-8" . "\r\n"; 
            $headers .= 'From: welcome@ec-oin.com'       . "\r\n" .
                        'Reply-To: welcome@ec-oin.com' . "\r\n" .
                        'X-Mailer: PHP/' . phpversion();

            mail($to, $subject, $message, $headers);
            return 'true';
        }
    }
  
    function deleteUser($user_id)
    {
        $doubleUserQuery = "DELETE FROM users WHERE id='".$user_id."'";
      	$row = $this->dbconnect()->query($doubleUserQuery);
        return true;
    }
    
  
    function saveAvatar($user_id, $imageName)
    {
        $doubleUserQuery = "UPDATE users set image='".$imageName."' WHERE username='".$user_id."'";
        echo $doubleUserQuery;
        // $doubleUserQuery = 'ALTER TABLE `users` ADD `image` varchar(255) default NULL null';
      	$row = $this->dbconnect()->query($doubleUserQuery);
        return true;
    }

    function deleteavatar($user_id)
    {
        $doubleUserQuery = "UPDATE users set image='' WHERE username='".$user_id."'";
        echo $doubleUserQuery;
      	$row = $this->dbconnect()->query($doubleUserQuery);
        return true;
    }
    
    function save_wallet($user_id,$address)
    {
        $doubleUserQuery = "UPDATE users set wallet_id='".$address."' WHERE id='".$user_id."'";
        echo $doubleUserQuery;
      	$row = $this->dbconnect()->query($doubleUserQuery);
        return true;
    }
    
    function change_password($user_mail,$password)
    {
        $change = password_hash($password, PASSWORD_DEFAULT);
        $doubleUserQuery = "UPDATE users set password='".$change."' WHERE email='".$user_mail."'";
        echo $doubleUserQuery;
      	$row = $this->dbconnect()->query($doubleUserQuery);
        return true;
    }
    
    function change_pass($username,$old,$new)
    {
        $newp = password_hash($new, PASSWORD_DEFAULT);
        $doubleUserQuery = "select password from users where username = '".$username."'";
      	$row = $this->dbconnect()->query($doubleUserQuery);
        $users = [];
        while ($rows = $row->fetch_assoc()) {
            array_push($users, $rows);
        }
        if (password_verify($old, $users[0]['password'])) {
            $doubleUserQuery = "UPDATE users set password='".$newp."' WHERE username='".$username."'";
            $row = $this->dbconnect()->query($doubleUserQuery);
            return 'true';
        }else{
            return 'incorrect';
        }
    }
}

?>
