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

// ////////////////////////////////////////////////////////////////////////
// This will only work when in budget /////////////////////////////////////
// ////////////////////////////////////////////////////////////////////////
if (pathName === "/budget") {
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
}

// ////////////////////////////////////////////////////////////////////////
// This will only work when in transaction ////////////////////////////////
// ////////////////////////////////////////////////////////////////////////
// if (pathName === "/transaction") {
//   const transactionItem =
// }
