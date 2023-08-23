<!DOCTYPE html>
<html lang="en">
<head>
    <script>
        function verificarDireccion() {
    var wallet = document.getElementById('wallet').value;

    // Validar la dirección de BNB BEP20 utilizando una expresión regular
    if (!/^0x[a-fA-F0-9]{40}$/i.test(wallet)) {
        document.getElementById('error_message').innerHTML = 'La dirección BNB no es válida';
        return false;
    } else {
        document.getElementById('error_message').innerHTML = '';
        return true;
    }
}


    function sendAjax() {
    const walletAddress = document.getElementById('wallet').value;
    
    const inputField = document.getElementById('input_field');
    const inputFieldVisible = inputField.style.display !== 'none';

    if (!inputFieldVisible) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'process.php', true);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.onload = function() {
            console.log(xhr.status, xhr.responseText);
            if (xhr.status === 200) {
                const response = xhr.responseText;
                if (response === 'pedir_contraseña') {
                    inputField.setAttribute('data-input-type', 'password');
                    inputField.placeholder = 'Enter password';
                    inputField.style.display = 'block';
                    document.getElementById('wallet').style.display = 'none';
                    document.getElementById('error_message').innerHTML = '';
                } else if (response === 'crear_contraseña') {
                    inputField.setAttribute('data-input-type', 'new_password');
                    inputField.placeholder = 'Create password';
                    inputField.style.display = 'block';
                    document.getElementById('wallet').style.display = 'none';
                    document.getElementById('error_message').innerHTML = '';
                } else {
                    // Manejar errores
                }
            }
        };
        xhr.send('action=check_wallet&wallet=' + encodeURIComponent(walletAddress));
    } else {
        const inputFieldType = inputField.getAttribute('data-input-type');
        if (inputFieldType === 'password') {
            verifyPassword();
        } else if (inputFieldType === 'new_password') {
            createPassword();
        }
    }
}


        
     function showEnterPasswordForm() {
    const inputField = document.getElementById('input_field');
    inputField.style.display = 'block';
    document.getElementById('instruction_message').innerHTML = 'Ingrese su contraseña';
}

function showCreatePasswordForm() {
    const inputField = document.getElementById('input_field');
    inputField.style.display = 'block';
    document.getElementById('instruction_message').innerHTML = 'Cree una contraseña';
}


    function createPassword() {
    const walletAddress = document.getElementById('wallet').value;
    const password = document.getElementById('input_field').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'process.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        console.log(xhr.status, xhr.responseText);
        if (xhr.status === 200) {
            const response = xhr.responseText;
            if (response === 'password_created') {
                window.location.href = 'profile.html';
            } else {
                document.getElementById('error_message').innerHTML = 'Error creating password';
            }
        }
    };
    xhr.send('action=create_password&wallet=' + encodeURIComponent(walletAddress) + '&password=' + encodeURIComponent(password));
}



function verifyPassword() {
    const walletAddress = document.getElementById('wallet').value;
    const password = document.getElementById('input_field').value;

    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'process.php', true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
        console.log(xhr.status, xhr.responseText);
        if (xhr.status === 200) {
            const response = xhr.responseText;
            if (response === 'password_valid') {
                window.location.href = 'profile.html';
            } else {
                document.getElementById('error_message').innerHTML = 'Invalid password';
            }
        }
    };
    xhr.send('action=verify_password&wallet=' + encodeURIComponent(walletAddress) + '&password=' + encodeURIComponent(password));
}



    </script>

  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>MINE BNB - up to 200% ROI in 10 days</title>
  <meta name="description" content="MINE BNB - from 150% to 200% profit in 10 days">
  <meta name="keywords" content="Mining, Big earnings, 15% daily, 16% daily, 18% daily, 20% daily, 150% ROI, 160% ROI, 180% ROI, 200% ROI, Earn, Earn Crypto, Crypto, BNB mining, BNB miner, BNB, BNB, BNB earn, earn BNB, earn BNB without investments"/>
  <!--Icon-->
  <link rel="shortcut icon" href="template/img/icon.png" type="image/png">
  <!--Materialize-->
  <link rel="stylesheet" href="libs/materialize.min.css" type="text/css"/>
  <!--Icons FontAwesome-->
  <script src="https://kit.fontawesome.com/84d745b22f.js" crossorigin="anonymous"></script>
  <!--Splide (carousel)-->
  <link rel="stylesheet" href="libs/splide.min.css" type="text/css"/>
  <!--My Css-->
  <link rel="stylesheet" href="template/css/other.css" type="text/css"/>
  <link rel="stylesheet" href="template/css/main.css" type="text/css"/>
  <link rel="stylesheet" href="template/css/extra.css" type="text/css"/>
  <link rel="stylesheet" href="template/css/media.css" type="text/css"/>
</head>
<body>
  <!--preloader-->
  <div class="preloader">
    <div class="loader">
      <p class="heading"><img src="template/img/icon.png" class="mr10" style="margin-top: 1px;" width="32px">MINE BNB</p>
      <div class="loading">
        <div class="load"></div>
        <div class="load"></div>
        <div class="load"></div>
        <div class="load"></div>
      </div>
    </div>
  </div>
  <!--preloader-->
  <div class="wrapper">
    <header>
      <div class="header">
        <div class="header-menu">
          <div class="">
            <img src="template/img/home.png" class="mr5" width="32px">
            <a href="/" class="site-name">MINE BNB</a>
          </div>
          <div class="">
            <ul class="ul-pc-menu">

  <li><a href="/"><img src="template/img/icons/home.png">Home</a></li>
  <li><a href="/statistics"><img src="template/img/icons/stat.png">Statistics</a></li>
  <li><a href="/leaders"><img src="template/img/icons/leaders.png">Leaders</a></li>
  <li><a href="/faq"><img src="template/img/icons/faq.png">FAQ</a></li>
  <li><a href="/contacts"><img src="template/img/icons/contacts.png">Contacts</a></li>
  <li class="mr0"><a href="/rules"><img src="template/img/icons/rules.png">Rules</a></li>

            </ul>
            <!--mobile-->
            <div class="mob-menu">
              <label for="burger" class="burger">
                <input id="burger" onclick="showMobMenu()">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>
            <a href="https://t.me/mineBNB_news" target="_blank" class="icon-tg-menu"><img src="template/img/telegram.png" width="32px"></a>
          </div>
        </div>
        <!--mobile-->
        <div class="right-mob-menu">
          <ul class="ul-mob-menu">

  <li><a href="/"><img src="template/img/icons/home.png">Home</a></li>
  <li><a href="/statistics.html"><img src="template/img/icons/stat.png">Statistics</a></li>
  <li><a href="/leaders.html"><img src="template/img/icons/leaders.png">Leaders</a></li>
  <li><a href="/faq.html"><img src="template/img/icons/faq.png">FAQ</a></li>
  <li><a href="/contacts.html"><img src="template/img/icons/contacts.png">Contacts</a></li>
  <li class="mr0"><a href="/rules.html"><img src="template/img/icons/rules.png">Rules</a></li>

          </ul>
          <img src="template/img/icons/close.png" class="close-mob-menu" onclick="closeMobMenu()" width="32px">
        </div>
      </div>
    </header>
    <main>
      <div class="main">
        <div id="upPage">

<!-- timer -->
<script type="text/javascript">
function addTimer(id, targetDate) {

  let myInt = setInterval(function() {

    var diff = new Date(targetDate - new Date());
    var hours = diff.getUTCHours();
    var mins = diff.getUTCMinutes();
    var secs = diff.getUTCSeconds();

    if(diff > 0) {
      var displaytime = pad(hours) + ':' +  pad(mins) + ':' + pad(secs);
      document.querySelector("[data-short='"+id+"']").innerHTML = displaytime;
    } else {
      setTimeout(() => { clearInterval(myInt); window.location.reload(); }, 1000)
    }

  }, 1000);
}

function pad(num) {
  return num > 9 ? num : '0' + num;
}
</script>

<div class="content-block">

<div class="auth-block">
    <div id="upAuth">
      
<form onsubmit="event.preventDefault(); sendAjax();">
    <input type="text" id="wallet" name="wallet" placeholder="Enter BNB BEP20 address" maxlength="100" required>
    <input type="password" id="input_field" name="input_field" placeholder="Enter password" data-input-type="password" style="display: none;">
    <button type="submit" class="waves-effect waves-light btn dark-btn">Submit</button>
</form>
<div id="error_message" style="color: red;"></div>


     
    </div>
</div>

     
      <p class="sign-bonus">
        Sign up Bonus <span class="ml5">0.30<span id="BNB_4"></span></span>
        <img src="template/img/bonus.gif" width="30px" class="ml5">
      </p>
      </div>


  <div class="about-block">
    <p>
      MINE BNB is a unique mining simulator that allows you to earn from <span style="color: #2b5283;">150%</span> to <span style="color: #2b5283;">200%</span> profit in <span style="color: #2b5283;">10 days</span>. You can earn from anywhere, our site is optimized for any device.<br /><br />
      You do not need to stay on the site, the mining process takes place even in your absence. All you need to do to start earning is to make a deposit of <span style="color: #2b5283;">20<span id="BNB"></span></span>.
    </p>
    <img src="template/img/about.png">
  </div>

  <div class="tariffs-block">
    <p class="head">Tariff plans<img src="template/img/tariffs.png" width="32px" class="ml5"></p>
    <div class="multiple-tariffs-cards">

    <div class="tariff-card">
    <p><span>Name</span><span class="text-img">Bonus<img src="template/img/0_tariff.png" width="32px" class="ml5"></span></p>
    <p><span>Rate</span><span>0.1% per day</span></p>
    <p><span>Duration</span><span><i class="fa-solid fa-infinity"></i></span></p>
    <p><span>Min.</span><span>0.30<span id="BNB"></span></span></p>
    <p><span>Max.</span><span>0.30<span id="BNB"></span></span></p>
    <p><span>ROI</span><span>Unlimited</span></p>
  </div>
    <div class="tariff-card">
    <p><span>Name</span><span class="text-img">Start<img src="template/img/1_tariff.png" width="32px" class="ml5"></span></p>
    <p><span>Rate</span><span>15% per day</span></p>
    <p><span>Duration</span><span>10 days</span></p>
    <p><span>Min.</span><span>0.0045 <span id="BNB"></span></span></p>
    <p><span>Max.</span><span>0.2215 <span id="BNB"></span></span></p>
    <p><span>ROI</span><span>150%</span></p>
  </div>
    <div class="tariff-card">
    <p><span>Name</span><span class="text-img">Progress<img src="template/img/2_tariff.png" width="32px" class="ml5"></span></p>
    <p><span>Rate</span><span>16% per day</span></p>
    <p><span>Duration</span><span>10 days</span></p>
    <p><span>Min.</span><span>0.2215 <span id="BNB"></span></span></p>
    <p><span>Max.</span><span>1.10 <span id="BNB"></span></span></p>
    <p><span>ROI</span><span>160%</span></p>
  </div>
    <div class="tariff-card">
    <p><span>Name</span><span class="text-img">Favorite<img src="template/img/3_tariff.png" width="32px" class="ml5"></span></p>
    <p><span>Rate</span><span>18% per day</span></p>
    <p><span>Duration</span><span>10 days</span></p>
    <p><span>Min.</span><span>1.10 <span id="BNB"></span></span></p>
    <p><span>Max.</span><span>5.50 <span id="BNB"></span></span></p>
    <p><span>ROI</span><span>180%</span></p>
  </div>
    <div class="tariff-card">
    <p><span>Name</span><span class="text-img">Exclusive<img src="template/img/4_tariff.png" width="32px" class="ml5"></span></p>
    <p><span>Rate</span><span>20% per day</span></p>
    <p><span>Duration</span><span>10 days</span></p>
    <p><span>Min.</span><span>5.50 <span id="BNB"></span></span></p>
    <p><span>Max.</span><span>11.10<span id="BNB"></span></span></p>
    <p><span>ROI</span><span>200%</span></p>
  </div>
    <div class="tariff-card">
    <p><span>Name</span><span class="text-img">Promoter<img src="template/img/5_tariff.png" width="32px" class="ml5"></span></p>
    <p><span>Rate</span><span>7% per day</span></p>
    <p><span>Duration</span><span><i class="fa-solid fa-infinity"></i></span></p>
    <p><span>Min.</span><span>0.01<span id="BNB"></span></span></p>
    <p><span>Max.</span><span>1.10<span id="BNB"></span></span></p>
    <p><span>ROI</span><span>Unlimited</span></p>
  </div>

</div>
  </div>

  <div class="partners-block">
    <p>
      Do not miss the opportunity to earn on our referral program. We pay <span style="color: #2b5283;">7-2-1%</span> of the deposit of each of your referrals.<br /><br />
      You can use any advertising methods. You can also use our banner to promote your referral link.
    </p>
    <img src="template/img/partners.png" class="mw200">
  </div>

  <div class="bounty-block">
    <p>Get rewarded for reviews on YouTube, Facebook, Telegram, Instagram, TikTok, Twitter or on your personal blog.</p>
    <div class="img-bounty">
      <img src="template/img/bounty/facebook.png" width="64px">
      <img src="template/img/bounty/instagram.png" width="64px">
      <img src="template/img/bounty/telegram.png" width="64px">
      <img src="template/img/bounty/tiktok.png" width="64px">
      <img src="template/img/bounty/twitter.png" width="64px">
      <img src="template/img/bounty/youtube.png" width="64px">
    </div>
  </div>

</div>

    </div>
  </div>
</main>
<footer>
  <div class="footer">
    MINEBNB.PRO © 2023 ALL RIGHTS RESERVED
  </div>
</footer>
</div>
  <!--Jquery-->
  <script type="text/javascript" src="libs/jquery-3.6.3.min.js"></script>
  <!--SweetAlert-->
  <script src="//cdn.jsdelivr.net/npm/sweetalert2@11"></script>
  <!--Splide (carousel)-->
  <script type="text/javascript" src="libs/splide.min.js"></script>
  <!--materialize-->
  <script type="text/javascript" src="libs/materialize.min.js"></script>
  <!--My Js-->
  <script type="text/javascript" src="template/js/main.js"></script>
</body>
</html>
