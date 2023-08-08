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

  // ///////// Dashboard income/expense indicator /////////
  const indicator = document.querySelector("#dashboard .indicator");
  const incomeIndicator = document.querySelector("#dashboard .btn_income");
  const expenseIndicator = document.querySelector("#dashboard .btn_expense");
  const totalBox = document.querySelector("#dashboard .main_container .total");
  const incomeExpenseSection = document.querySelector(
    "#dashboard .main_container .income_expense_section"
  );

  incomeIndicator.addEventListener("click", function () {
    indicator.style.transform = "translateX(0)";
    incomeIndicator.style.color = `var(--color_light)`;
    expenseIndicator.style.color = `var(--color_dark)`;
    totalBox.classList.contains("expense")
      ? totalBox.classList.remove("expense")
      : "";
    totalBox.classList.contains("income")
      ? ""
      : totalBox.classList.add("income");

    incomeExpenseSection.classList.remove("spend");

    incomeExpenseSection.classList.contains("earn")
      ? ""
      : incomeExpenseSection.classList.add("earn");
  });

  expenseIndicator.addEventListener("click", function () {
    indicator.style.transform = "translateX(100%)";
    incomeIndicator.style.color = `var(--color_dark)`;
    expenseIndicator.style.color = `var(--color_light)`;
    totalBox.classList.contains("income")
      ? totalBox.classList.remove("income")
      : "";
    totalBox.classList.contains("expense")
      ? ""
      : totalBox.classList.add("expense");
    incomeExpenseSection.classList.remove("earn");
    incomeExpenseSection.classList.add("spend");
  });

  // Adding the circles parcentage////////////////////
  const budgetPercentage = document.querySelectorAll(".budget_cir .percentage");
  const budgetProgress = document.querySelectorAll(".budget_cir .circle");

  window.addEventListener("load", function () {
    budgetPercentage.forEach((budget) => {
      let percent = (27.02 * (100 - parseInt(budget.innerHTML, 10))) / 100;
      for (let i = 0; i <= budgetPercentage.length; i++) {
        if (budget == budgetPercentage[i])
          budgetProgress[i].style.strokeDashoffset = `${percent}rem`;
      }
    });
  });

  // Add transaction btn animation
  const addBtn = document.querySelector("#dashboard .addBtn");
  addBtn.addEventListener("click", function () {
    addBtn.parentElement.classList.toggle("open");
  });

  // the add transaction form saction
  const transactionForm = document.querySelector("#addTransaction");
  const btnSpend = document.querySelector(".spendBtn");
  const btnEarn = document.querySelector(".earnBtn");

  const categoryBox = document.querySelector("#addTransaction .category_box");
  const earnCategory = document.querySelector(".category_box .earnCategory");
  const spendCategory = document.querySelector(".category_box .spendCategory");

  btnSpend.addEventListener("click", function () {
    transactionForm.style.display = "flex";
    transactionForm.classList.contains("spend")
      ? ""
      : transactionForm.classList.add("spend");

    categoryBox.removeChild(earnCategory);
    dropDownCategory();
  });

  btnEarn.addEventListener("click", function () {
    transactionForm.style.display = "flex";
    transactionForm.classList.contains("earn")
      ? ""
      : transactionForm.classList.add("earn");

    categoryBox.removeChild(spendCategory);
    dropDownCategory();
  });

  // the drop down category menu
  function dropDownCategory() {
    const inputCategory = document.querySelector("#addTransaction .category");
    const categoryList = document.querySelector(
      "#addTransaction .category_list"
    );

    const categoryContainer = document.querySelector(
      "#addTransaction .category_list .category_container"
    );
    const addCategory = document.querySelector(
      "#addTransaction .category_list .addCategory"
    );
    const categoryItem = document.querySelectorAll(
      "#addTransaction .category_list li"
    );

    const categoryArray = [];
    categoryItem.forEach((item) => {
      categoryArray.push(item.innerHTML);
      item.addEventListener("click", function (event) {
        event.stopPropagation();
        inputCategory.value = item.innerHTML;
        categoryList.classList.remove("open");
      });
    });

    // Getting text from search element
    inputCategory.addEventListener("keyup", () => {
      let arr = [];
      let searchedVal = inputCategory.value.toLowerCase();
      arr = categoryArray
        .filter((data) => {
          return data.toLowerCase().startsWith(searchedVal);
        })
        .map((data) => `<li>${data}</li>`)
        .join("");

      categoryContainer.innerHTML = arr;
      closeList();
    });

    function closeList() {
      const categoryItem = document.querySelectorAll(
        "#addTransaction .category_list li"
      );
      categoryItem.forEach((item) => {
        item.addEventListener("click", function (event) {
          event.stopPropagation();
          inputCategory.value = item.innerHTML;
          categoryList.classList.remove("open");
        });
      });
    }

    addCategory.addEventListener("click", function () {
      categoryArray.push(inputCategory.value);
      if (inputCategory.value != "") categoryList.classList.remove("open");
    });

    inputCategory.addEventListener("focus", function () {
      categoryList.classList.add("open");
    });
  }

  // Mode Label style
  const modeLabels = document.querySelectorAll("#addTransaction label");
  const modeRadioBtn = document.querySelectorAll(
    "#addTransaction input[type='radio']"
  );
  const modeIndicator = document.querySelector(
    "#addTransaction .modeIndicator"
  );

  modeRadioBtn.forEach((btn) => {
    btn.addEventListener("change", function () {
      if (btn == modeRadioBtn[0]) {
        modeIndicator.classList.add("left");
        modeIndicator.classList.remove("right");
        modeIndicator.classList.remove("center");

        modeLabels[0].style.color = `var(--color_white)`;
        modeLabels[1].style.color = `var(--color_dark)`;
        modeLabels[2].style.color = `var(--color_dark)`;
      }
      if (btn == modeRadioBtn[1]) {
        modeIndicator.classList.remove("left");
        modeIndicator.classList.remove("right");
        modeIndicator.classList.add("center");
        modeLabels[0].style.color = `var(--color_dark)`;
        modeLabels[1].style.color = `var(--color_white)`;
        modeLabels[2].style.color = `var(--color_dark)`;
      }
      if (btn == modeRadioBtn[2]) {
        modeIndicator.classList.remove("left");
        modeIndicator.classList.add("right");
        modeIndicator.classList.remove("center");
        modeLabels[0].style.color = `var(--color_dark)`;
        modeLabels[1].style.color = `var(--color_dark)`;
        modeLabels[2].style.color = `var(--color_white)`;
      }
    });
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

  const addBudgetBtn = document.querySelector("#budget .btnAdd");
  const addBudgetForm = document.querySelector("#addBudget");
  addBudgetBtn.addEventListener("click", function () {
    addBudgetForm.style.display = "flex";
  });

  const inputCategory = document.querySelector("#addBudget .category");
  const categoryList = document.querySelector("#addBudget .category_list");
  const categoryContainer = document.querySelector(
    "#addBudget .category_list .category_container"
  );
  const addCategory = document.querySelector(
    "#addBudget .category_list .addCategory"
  );
  const categoryItem = document.querySelectorAll(
    "#addBudget .category_list li"
  );

  const categoryArray = [];
  categoryItem.forEach((item) => {
    categoryArray.push(item.innerText);
    item.addEventListener("click", function (event) {
      event.stopPropagation();
      inputCategory.value = item.innerText;
      categoryList.classList.remove("open");
    });
  });

  // Getting text from search element
  inputCategory.addEventListener("keyup", () => {
    // console.log(inputCategory.value);
    let arr = [];
    let searchedVal = inputCategory.value.toLowerCase();
    arr = categoryArray
      .filter((data) => {
        return data.toLowerCase().startsWith(searchedVal);
      })
      .map((data) => `<li>${data}</li>`)
      .join("");

    categoryContainer.innerHTML = arr;
    closeList();
  });

  function closeList() {
    const categoryItem = document.querySelectorAll(
      "#addBudget .category_list li"
    );
    categoryItem.forEach((item) => {
      item.addEventListener("click", function (event) {
        event.stopPropagation();
        inputCategory.value = item.innerHTML;
        categoryList.classList.remove("open");
      });
    });
  }

  addCategory.addEventListener("click", function () {
    categoryArray.push(inputCategory.value);
    if (inputCategory.value != "") categoryList.classList.remove("open");
  });

  inputCategory.addEventListener("focus", function () {
    categoryList.classList.add("open");
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

  // Setting width of input field
  window.addEventListener("load", function () {
    trAmount.forEach((field) => {
      const styles = window.getComputedStyle(field);
      const fontSizeStringValue = styles.fontSize;
      const fontSizeValue = parseFloat(fontSizeStringValue, 10);
      const letterNum = field.value.length;
      field.style.maxWidth = `${((fontSizeValue / 2) * letterNum) / 8}rem`;
    });
  });

  trAmount.forEach((field) => {
    field.addEventListener("keyup", function () {
      const styles = window.getComputedStyle(field);
      const fontSizeStringValue = styles.fontSize;
      const fontSizeValue = parseFloat(fontSizeStringValue, 10);
      const letterNum = field.value.length;
      field.style.maxWidth = `${((fontSizeValue / 2) * letterNum) / 8}rem`;
    });
  });

  // ////////////////////////////////////////////////////
  //  Filter section ////////////////////////////////////
  const btnDuration = document.querySelector("#durationForm input");
  const durationEl = document.querySelectorAll("#durationForm ul li");
  const durationContainer = document.querySelector("#transaction .duration");

  durationContainer.addEventListener("click", function () {
    durationContainer.classList.contains("open")
      ? ""
      : durationContainer.classList.add("open");
  });

  durationEl.forEach((el) => {
    el.addEventListener("click", function (event) {
      event.stopPropagation();
      durationContainer.classList.contains("open")
        ? durationContainer.classList.remove("open")
        : "";

      btnDuration.value = el.innerHTML;
    });
  });
}
