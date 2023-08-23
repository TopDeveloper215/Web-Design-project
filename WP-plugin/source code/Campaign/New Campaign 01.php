<?php
//include auth_session.php file on all user panel pages
    include("../auth_session.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/css/bootstrap.min.css" rel="stylesheet" rel="stylesheet">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js"></script>
    <title>Page-01</title>
    <link rel="stylesheet" href="../css/style-cam.css">
</head>
<body onload="al()" style="padding : 5%;" >
    <script>
        function al() {
            alert(" <p>Hey, <?php echo $_SESSION['username']; ?>!</p>");
        }
    </script>
    <div class="row">
        <div class="col-md-2">
            <img src="img01.png" alt="" align = "right" style=" margin-top: 25px;">
        </div>
        <div class="col-md-8">
            <label>Kristal @ GiveKindness.asia</label>
            <label class="inp_1">Hope you're holding up well, Mika Boshi!</label>
            <label class="inp_2">I'm Kristal from GiveKindness.asia. I'll guide you through your compaign creation process.</label>
            <label class="inp_2">What type of fundraising campaign are you creating?</label>
            <a href="New Campaign 02.php"><img src="img02.png" alt="" class="img_style" style="margin-top: 20px;"></a>
            <a href="New Campaign 02.php"><img src="img03.png" alt="" class="img_style"></a>
            <a href="New Campaign 02.php"><img src="img04.png" alt="" class="img_style"></a>
        </div>
    </div>
</body>
</html>