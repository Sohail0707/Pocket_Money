// ////////// making the navigation working
const pathName = window.location.pathname;
const navBtn = document.querySelectorAll("#navigation .link");
const navText = document.querySelectorAll("#navigation .txt");
const navIcon = document.querySelectorAll("#navigation i");

document.addEventListener("DOMContentLoaded", function () {
  if (pathName === "/dashboard") {
    navBtn[0].style.color = `var(--color_primary)`;
    navText[0].style.color = `var(--color_primary)`;
    navIcon[0].setAttribute("name", "dashboard_solid");
  }

  if (pathName === "/budget") {
    navBtn[1].style.color = `var(--color_primary)`;
    navText[1].style.color = `var(--color_primary)`;
    navIcon[1].setAttribute("name", "budget_solid");
  }

  if (pathName === "/transaction") {
    navBtn[2].style.color = `var(--color_primary)`;
    navText[2].style.color = `var(--color_primary)`;
  }

  if (pathName === "/profile") {
    navBtn[3].style.color = `var(--color_primary)`;
    navText[3].style.color = `var(--color_primary)`;
    navIcon[3].setAttribute("name", "profile_solid");
  }
});

// ////////////////////////////////////////////////////////////////////////
// This will only work when in dashboard //////////////////////////////////
// ////////////////////////////////////////////////////////////////////////

if (pathName === "/dashboard") {
  // ////// Main container margin top ///////
  const mainContainer = document.querySelector("#dashboard .main_container");
  const topContainer = document.querySelector("#dashboard .top_container");
  mainContainer.style.marginTop = `${(topContainer.offsetHeight - 20) / 10}rem`;

  // ///////// Dashboard indicator /////////
  const indicator = document.querySelector("#dashboard .indicator");
  const btnIncome = document.querySelector("#dashboard .btn_income");
  const btnExpense = document.querySelector("#dashboard .btn_expense");
  const totalBox = document.querySelector("#dashboard .main_container .total");

  btnIncome.addEventListener("click", function () {
    indicator.style.transform = "translateX(0)";
    btnIncome.style.color = `var(--color_light)`;
    btnExpense.style.color = `var(--color_dark)`;
    totalBox.classList.contains("expense")
      ? totalBox.classList.remove("expense")
      : "";
    totalBox.classList.contains("income")
      ? ""
      : totalBox.classList.add("income");
  });

  btnExpense.addEventListener("click", function () {
    indicator.style.transform = "translateX(100%)";
    btnIncome.style.color = `var(--color_dark)`;
    btnExpense.style.color = `var(--color_light)`;
    totalBox.classList.contains("income")
      ? totalBox.classList.remove("income")
      : "";
    totalBox.classList.contains("expense")
      ? ""
      : totalBox.classList.add("expense");
  });

  const budgetPercentage = document.querySelectorAll(".budget .percentage");
  const budgetProgress = document.querySelectorAll(".budget .circle");

  window.addEventListener("load", function () {
    for (let i = 0; i <= budgetPercentage.length; i++) {
      let percent =
        (27.02 * (100 - parseInt(budgetPercentage[i].innerHTML, 10))) / 100;
      budgetProgress[i].style.strokeDashoffset = `${percent}rem`;
    }
  });
}

// ////////////////// Color of budget /////////////////////
// ////////////////////////////////////////////////////////
const colorObj = {
  c1: "#EA6988",
  c2: "#69B4EA",
  c3: "#EA9F69",
  c4: "#C6D147",
};
const alphabetSet1 = /[a-f]/i;
const alphabetSet2 = /[g-l]/i;
const alphabetSet3 = /[m-r]/i;
const alphabetSet4 = /[s-z]/i;

const logoAlphabet = document.querySelectorAll(".logo_alphabet");
logoAlphabet.forEach((alphabet) => {
  window.addEventListener("load", function () {
    if (alphabetSet1.test(alphabet.innerHTML)) {
      alphabet.style.background = colorObj.c1;
      alphabet.parentElement.parentElement.classList.add("c1");
    }
    if (alphabetSet2.test(alphabet.innerHTML)) {
      alphabet.style.background = colorObj.c2;
      alphabet.parentElement.parentElement.classList.add("c2");
    }
    if (alphabetSet3.test(alphabet.innerHTML)) {
      alphabet.style.background = colorObj.c3;
      alphabet.parentElement.parentElement.classList.add("c3");
    }
    if (alphabetSet4.test(alphabet.innerHTML)) {
      alphabet.style.background = colorObj.c4;
      alphabet.parentElement.parentElement.classList.add("c4");
    }
  });
});

// ////////////////////////////////////////////////////////////////////////
// This will only work when in budget /////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////
if (pathName === "/budget") {
  const budgetForm = document.querySelectorAll("#budget .budget");

  const buEditBtn = document.querySelectorAll(".budget .btnEdit"),
    buSubmitBtn = document.querySelectorAll(".budget .btnSubmit"),
    buCloseBtn = document.querySelectorAll(".budget .btnClose");

  const budgetAmount = document.querySelectorAll(".budget #budget_amount"),
    budgetName = document.querySelectorAll(".budget #budget_name");

  buEditBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      for (let i = 0; i <= buEditBtn.length; i++) {
        if (btn == buEditBtn[i]) {
          budgetForm[i].classList.add("open");
          budgetAmount[i].removeAttribute("disabled");
          budgetName[i].removeAttribute("disabled");
          budgetAmount[i].focus();
        }
      }
    });
  });

  buCloseBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      for (let i = 0; i <= buCloseBtn.length; i++) {
        if (btn == buCloseBtn[i]) {
          budgetForm[i].classList.remove("open");
          budgetForm[i].reset();

          budgetAmount[i].setAttribute("disabled", "true");
          budgetName[i].setAttribute("disabled", "true");
        }
      }
    });
  });

  buSubmitBtn.forEach((btn) => {
    btn.addEventListener("click", function () {
      for (let i = 0; i <= buSubmitBtn.length; i++) {
        if (btn == buSubmitBtn[i]) {
          budgetForm[i].classList.remove("open");
          budgetForm[i].submit();

          budgetAmount[i].setAttribute("disabled", "true");
          budgetName[i].setAttribute("disabled", "true");
        }
      }
    });
  });
}

// ////////////////////////////////////////////////////////////////////////
// This will only work when in transaction ////////////////////////////////
// ////////////////////////////////////////////////////////////////////////
if (pathName === "/transaction") {
  const transactionItem = document.querySelectorAll(".list_section .item");

  const trEditBtn = document.querySelectorAll(".list_section .btnEdit"),
    trSubmitBtn = document.querySelectorAll(".list_section .btnSubmit"),
    trCloseBtn = document.querySelectorAll(".list_section .btnClose");

  // -------------------------------------------
  const trCategory = document.querySelectorAll(".item #category_name"),
    trAmount = document.querySelectorAll(".item #transaction_amount"),
    trComment = document.querySelectorAll(".item #comment");

  const trInputs = document.querySelectorAll(".item input");
  trInputs.forEach((input) => {
    input.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  });

  transactionItem.forEach((item) => {
    item.addEventListener("click", function () {
      item.classList.contains("close") ? item.classList.remove("close") : "";
      item.classList.contains("open") ? "" : item.classList.add("open");
    });
  });

  trEditBtn.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      for (let i = 0; i <= trEditBtn.length; i++) {
        if (btn == trEditBtn[i]) {
          transactionItem[i].classList.add("edit");
          trCategory[i].removeAttribute("disabled");
          trAmount[i].removeAttribute("disabled");
          trComment[i].removeAttribute("disabled");
          trAmount[i].focus();
        }
      }
    });
  });

  trCloseBtn.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      for (let i = 0; i <= trCloseBtn.length; i++) {
        if (btn == trCloseBtn[i]) {
          transactionItem[i].classList.remove("open");
          transactionItem[i].classList.contains("edit")
            ? transactionItem[i].classList.remove("edit")
            : "";

          transactionItem[i].classList.add("close");
          trCategory[i].setAttribute("disabled", "true");
          trAmount[i].setAttribute("disabled", "true");
          trComment[i].setAttribute("disabled", "true");
          transactionItem[i].reset();
        }
      }
    });
  });

  trSubmitBtn.forEach((btn) => {
    btn.addEventListener("click", function (event) {
      event.stopPropagation();
      for (let i = 0; i <= trCloseBtn.length; i++) {
        if (btn == trSubmitBtn[i]) {
          transactionItem[i].classList.remove("open");

          transactionItem[i].classList.add("close");
          trCategory[i].setAttribute("disabled", "true");
          trAmount[i].setAttribute("disabled", "true");
          trComment[i].setAttribute("disabled", "true");
          transactionItem[i].submit();
        }
      }
    });
  });
}
