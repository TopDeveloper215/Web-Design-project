// preloader
window.onload = function () {
  document.body.classList.add('loaded_hiding');
  window.setTimeout(function () {
    document.body.classList.add('loaded');
    document.body.classList.remove('loaded_hiding');
  }, 500);
}

// initializing tooltips
$(document).ready(function(){
  $('.tooltipped').tooltip();
});

// show additional pc menu
function showAddMenu() {
  // if active - hide
  if ($("#addMenu").hasClass("active")) {
    $('#addMenu').addClass('d-none');
    $('#addMenu').removeClass('active');
  }
  // otherwise - show
  else {
    $('#addMenu').removeClass('d-none');
    $('#addMenu').addClass('active');
  }
}

// show mob menu
function showMobMenu() {
  $('.right-mob-menu').addClass('show');
}

// close mob menu
function closeMobMenu() {
  $('.right-mob-menu').removeClass('show');
}

// go to url
function go(url) {
  window.location.href = url;
}

// go to url web
function go_web(url) {
  window.location.href = url;
}

// Mining
$(document).ready(function() {
  setInterval(function(){0
    $("#profit").each(function(){
      var totime = parseInt($(this).attr("data-tm")) + 1;
      var balance = totime * ($(this).attr("data-prc"));
      $(this).attr("data-tm" , totime);
      var a = balance + parseFloat($(this).attr("data-sum"));
      $(this).html(a.toFixed(7));
    });
  }, 1000);
});

// splide (carousel) initialization
if ($('.splide').length) {
  var splide = new Splide( '.splide', {
    type   : 'loop',
    perPage: 1,
    pagination: true,
    arrows: false,
    autoplay: false,
  });
  splide.mount();
}

// SweetAlert Toast
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  showCloseButton: true,
  timer: 3000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer)
    toast.addEventListener('mouseleave', Swal.resumeTimer)
  }
})

// action on button click from form
$(document).on('click','form button[type="button"]', function(){
  $('form button').addClass('disabled-form');
  $('form input').addClass('disabled-form');
  $('form textarea').addClass('disabled-form');
});


// Copy Text
function CopiedText() {
  var copyText = document.getElementById("copied_text");
  copyText.select();
  document.execCommand("copy");
  Toast.fire({
    icon: 'success',
    title: 'Successfully Copied',
  });
}

// Pagination Deposits on the Profile page
function pag_dep(page) {
  // remove active style from all a
  $('#pag li a').removeClass('active');
  // set active to clicked element
  $('#pag_'+page).addClass('active');
  // disable buttons in pagination
  $('#pag').addClass('disabled');
  // replace content with blinking dots
  $('#upload td').html('<span class="animated-dots">â€¢â€¢â€¢â€¢â€¢</span>');
  // send ajax request
  $.ajax({
    type: "POST",
    url: 'upload',
    data: {
      "type" : 'deposits', // what to load
      "page" : page // what I pass additionally
    },
    success: function(data) {
      $("#upload").html(data);
      // enable buttons in pagination
      $('#pag').removeClass('disabled');
    }
  });
}

// formatting the input of numbers + calling the calculator
$('body').on('input', '#amount', function(){
  // we give the opportunity to enter only numbers and a period
  this.value = this.value.replace(/[^\d\.]/g, "");
  // check that there are not more than 1 dot
  if (this.value.replace(/[^.]/g, "") == "..")
    this.value = this.value.slice(0, -1);
  // check that there are no more than 2 decimal places
  // if there is no focus, then put 2 decimal places (if empty 0.00)
  this.onblur = function() {
    if (this.value != '') {
      this.value = Number($('#amount').val()).toFixed(2);
      // calculation of potential income for a deposit
      if (location.pathname == '/deposit') { updateIncome(); }
    }
  }
  // calculation of potential income for a deposit
  if (location.pathname == '/deposit') { updateIncome(); }
});

// deposit calculator
function updateIncome() {
  var amount = $('#amount').val();
  var rate = $('#rate').val();
  $('#daily').html(Number(amount*rate).toFixed(2));
  $('#total').html(Number(amount*rate*10).toFixed(2));
}

// random
function str_rand() {
  var result = '';
  var words = '123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  var max_position = words.length - 1;
  for (i = 0; i < 15; ++i) {
    position = Math.floor(Math.random() * max_position);
    result = result + words.substring(position, position + 1);
  }
  return result;
}

// change value to edit Ad
function editAd(id, name) {
  $('input#action_'+id).val(name);
}

// show 1,2,3 level ref
function showRef(id) {

  $('#ref1').removeClass('active');
  $('#ref2').removeClass('active');
  $('#ref3').removeClass('active');
  $('#ref'+id).addClass('active');

  $('#show_ref1').hide();
  $('#show_ref2').hide();
  $('#show_ref3').hide();
  $('#show_ref'+id).show();

  $('#show_pag_ref1').removeClass('d-flex');
  $('#show_pag_ref2').removeClass('d-flex');
  $('#show_pag_ref3').removeClass('d-flex');
  $('#show_pag_ref'+id).addClass('d-flex');
}

// pagination, accept ref. level and page number
function pagRef(lvl, page) {
  // switch the active style to the clicked object
  $('#show_pag_ref'+lvl+' li a').removeClass('active');
  // set active to clicked element
  $('#show_pag_ref'+lvl+' li a#pag_'+page).addClass('active');
  // disable buttons in pagination
  $('.pag').addClass('disabled');
  // replace content with blinking dots
  $('#show_ref'+lvl+' td').html('<span class="animated-dots">â€¢â€¢â€¢â€¢â€¢</span>');
  // send ajax request
  $.ajax({
    type: "POST",
    url: 'upload',
    data: {
      "lvl" : lvl,
      "page" : page,
      "type": "pagRef"
    },
    success: function(data) {
      $("#show_ref"+lvl+" table").html(data);
      // enable buttons in pagination
      $('.pag').removeClass('disabled');
    }
  });
}

// Choosing a balance for crediting referral
function chooseAdRefJS(name) {
  $('input#type_balance').val(name);
}

// // Modal Materialize
// $(document).ready(function(){
//   $('.modal').modal();
// });

// Ð¸Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ ÑÐ»ÐµÐ¼ÐµÐ½Ñ‚Ð¾Ð² Ð¿Ð¾ÑÐ»Ðµ load
setInterval(function() {

  // Ð¸Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ Ð²ÑÐ¿Ð»Ñ‹Ð²Ð°ÑŽÑ‰Ð¸Ñ… Ð¿Ð¾Ð´ÑÐºÐ°Ð·Ð¾Ðº
  if ($('.tooltipped').length) {
    if ($('.tooltipped').attr('init') != 'ready') {
      $(document).ready(function(){
        $('.tooltipped').tooltip();
        $('.tooltipped').attr('init', 'ready');
      });
    }
  }

  // Ð¸Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ Ð¼Ð¾Ð´Ð°Ð»ÑŒÐ½Ñ‹Ñ… Ð¾ÐºÐ¾Ð½
  if ($('.modal').length) {
    if ($('.modal').attr('init') != 'ready') {
      $(document).ready(function(){
        $('.modal').modal();
        $('.modal').attr('init', 'ready');
      });
    }
  }

}, 500);
