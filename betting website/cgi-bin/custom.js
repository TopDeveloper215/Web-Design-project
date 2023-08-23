function addTimer(id, targetDate) {
  let tableBody = document.querySelector("#upload tbody");
  let newRow = tableBody.insertRow();
  newRow.setAttribute("data-short", id);
  newRow.innerHTML = `
    <td class="amount"></td>
    <td class="daily-rate"></td>
    <td class="daily-income"></td>
    <td class="total-income"></td>
    <td class="expiry-date"></td>
    <td class="status"></td>
  `;

  let myInt = setInterval(function () {
    var diff = new Date(targetDate - new Date());
    var hours = diff.getUTCHours();
    var mins = diff.getUTCMinutes();
    var secs = diff.getUTCSeconds();

    if (diff > 0) {
      var displaytime = pad(hours) + ":" + pad(mins) + ":" + pad(secs);
      newRow.querySelector(".expiry-date").innerHTML = displaytime;
    } else {
      setTimeout(() => {
        clearInterval(myInt);
        window.location.reload();
      }, 1000);
    }
  }, 1000);
}

function pad(num) {
  return num > 9 ? num : "0" + num;
}

function sendAjax(button) {
  let form = button.closest("form");
  let data = new FormData(form);
  let url = form.getAttribute("action");
  let xhr = new XMLHttpRequest();
   xhr.onload = function () {
  if (xhr.status === 200) {
      let response = JSON.parse(xhr.responseText);
      if (response.status === "success") {
        if (response.action === "collect") {
          let interesAcumulado = parseFloat(response.interes_acumulado);
          let balance = parseFloat(response.balance);
          document.querySelector("#profit").innerHTML = interesAcumulado.toFixed(8) + " BNB";
          document.querySelector('.tooltipped[data-tooltip="Balance"] span:first-child').innerHTML = balance.toFixed(8);
        } else if (response.action === "update") {
          updateTableAndClock(response.deposito);
        }
      } else {
        alert(response.message);
      }
    } else {
      alert("Error de red. Inténtalo de nuevo más tarde.");
    }
  };
  xhr.send(data);
}

if (response.status === "success") {
  let bonus = response.bonus;
  let balance = response.balance;
  let bonusMessage = '';
  if (bonus > 0) {
    bonusMessage = ` (+${bonus.toFixed(8)} BNB bonus)`;
  }
  document.querySelector('#profit').innerHTML = balance.toFixed(8) + bonusMessage;
  document.querySelector('.tooltipped[data-tooltip="Balance"] span:first-child').innerHTML = balance.toFixed(8);
}

function updateTableAndClock(deposito) {
  let tableBody = document.querySelector("#upload tbody");
  let newRow = tableBody.insertRow();
  newRow.innerHTML = `
    <td class="amount">${deposito.amount} BNB</td>
    <td class="daily-rate">0.10%</td>
    <td class="daily-income">${deposito.daily_income.toFixed(8)} BNB</td>
    <td class="total-income">Unlimited</td>
    <td class="expiry-date">Unlimited</td>
    <td class="status">Active</td>
  `;
}
