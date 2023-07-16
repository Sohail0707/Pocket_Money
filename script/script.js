// ////////// making the navigation working
const pathName = window.location.pathname;
const navBtn = document.querySelectorAll("#navigation .link");
const navIconSolid = document.querySelectorAll("#navigation .icon_solid");
const navIconOutline = document.querySelectorAll("#navigation .icon_outline");
const navText = document.querySelectorAll("#navigation .txt");

window.addEventListener("load", function () {
  if (pathName === "/dashboard") {
    navIconOutline[0].style.display = `none`;
    navIconSolid[0].style.display = `block`;
    navText[0].style.color = `var(--color_primary)`;
  }

  if (pathName === "/budget") {
    navIconOutline[1].style.display = `none`;
    navIconSolid[1].style.display = `block`;
    navText[1].style.color = `var(--color_primary)`;
  }

  if (pathName === "/transaction") {
    navIconOutline[2].style.display = `none`;
    navIconSolid[2].style.display = `block`;
    navText[2].style.color = `var(--color_primary)`;
  }

  if (pathName === "/profile") {
    navIconOutline[3].style.display = `none`;
    navIconSolid[3].style.display = `block`;
    navText[3].style.color = `var(--color_primary)`;
  }
});

// ////////////// Main container margin top
const mainContainer = document.querySelector("#dashboard .main_container");
const topContainer = document.querySelector("#dashboard .top_container");
mainContainer.style.marginTop = `${(topContainer.offsetHeight - 20) / 10}rem`;

// ///////// Dashboard indicator /////////
// //////////////////////////////////////////////////////////
const indicator = document.querySelector("#dashboard .indicator");
const btnIncome = document.querySelector("#dashboard .btn_income");
const btnExpense = document.querySelector("#dashboard .btn_expense");
const incomeIcon = document.querySelector("#dashboard .btn_income .icon");
const expenseIcon = document.querySelector("#dashboard .btn_expense .icon");

btnIncome.addEventListener("click", function () {
  indicator.style.transform = "translateX(0)";
  btnIncome.style.color = `var(--color_light)`;
  incomeIcon.style.fill = `var(--color_light)`;

  btnExpense.style.color = `var(--color_dark)`;
  expenseIcon.style.fill = `var(--color_dark)`;
});

btnExpense.addEventListener("click", function () {
  indicator.style.transform = "translateX(100%)";
  btnExpense.style.color = `var(--color_light)`;
  expenseIcon.style.fill = `var(--color_light)`;

  btnIncome.style.color = `var(--color_dark)`;
  incomeIcon.style.fill = `var(--color_dark)`;
});

// ///////// Setting the colors of dashboard budget /////////
// //////////////////////////////////////////////////////////
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

const budgetPercentage = document.querySelectorAll(".budget .percentage");
const budgetProgress = document.querySelectorAll(".budget .circle");

window.addEventListener("load", function () {
  for (let i = 0; i <= budgetPercentage.length; i++) {
    let percent =
      (27.02 * (100 - parseInt(budgetPercentage[i].innerHTML, 10))) / 100;
    budgetProgress[i].style.strokeDashoffset = `${percent}rem`;
  }
});
