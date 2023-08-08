module.exports = (temp, dataObj, i, parameter) => {
  let output = "";

  // Will replace all placeholder of dashboard
  if (parameter === "dashboard") {
    let budget_amount = dataObj[0].budget[i].monthly_amount;
    let budget_name = dataObj[0].budget[i].name;
    let spend_amount = dataObj[0].spend[budget_name];

    let percentage = ((spend_amount / budget_amount) * 100).toFixed(1);
    if (/\.0$/.test(percentage)) {
      percentage = parseInt(percentage);
    }

    output = temp.replace(
      /{%LOGO_ALPHABET%}/g,
      dataObj[0].budget[i].logo_alphabet
    );
    output = output.replace(/{%BUDGET_NAME%}/g, dataObj[0].budget[i].name);
    output = output.replace(
      /{%BUDGET_AMOUNT%}/g,
      `$${dataObj[0].budget[i].monthly_amount}`
    );
    output = output.replace(/{%SPEND_AMOUNT%}/g, spend_amount);
    output = output.replace(/{%BUDGET_PERCENTAGE%}/g, percentage);

    // replacing total wealth, bank and cash
    output = output.replace(
      /{%TOTAL_BANK%}/,
      parseFloat(dataObj[0].annual_total.bank).toFixed(2)
    );
    output = output.replace(
      /{%TOTAL_CASH%}/,
      parseFloat(dataObj[0].annual_total.cash).toFixed(2)
    );
    output = output.replace(
      /{%TOTAL_WEALTH%}/,
      parseFloat(
        dataObj[0].annual_total.bank + dataObj[0].annual_total.cash
      ).toFixed(2)
    );

    // replacing total spend, earning, online, cash and bank
    output = output.replace(
      /{%TOTAL_EARN%}/,
      parseFloat(dataObj[0].monthly_total.earn.total).toFixed(2)
    );
    output = output.replace(
      /{%TOTAL_SPEND%}/,
      parseFloat(dataObj[0].monthly_total.spend.total).toFixed(2)
    );

    // replacing online amount
    output = output.replace(
      /{%ONLINE_EARN_AMOUNT%}/,
      parseFloat(dataObj[0].monthly_total.earn.online).toFixed(2)
    );
    output = output.replace(
      /{%ONLINE_SPEND_AMOUNT%}/,
      parseFloat(dataObj[0].monthly_total.spend.online).toFixed(2)
    );

    // replacing cash amount
    output = output.replace(
      /{%CASH_EARN_AMOUNT%}/,
      parseFloat(dataObj[0].monthly_total.earn.cash).toFixed(2)
    );
    output = output.replace(
      /{%CASH_SPEND_AMOUNT%}/,
      parseFloat(dataObj[0].monthly_total.spend.cash).toFixed(2)
    );

    // replacing bank amount
    output = output.replace(
      /{%BANK_EARN_AMOUNT%}/,
      parseFloat(dataObj[0].monthly_total.earn.bank).toFixed(2)
    );
    output = output.replace(
      /{%BANK_SPEND_AMOUNT%}/,
      parseFloat(dataObj[0].monthly_total.spend.bank).toFixed(2)
    );

    // Budget amount and parcentage
    let totalBudget = 0;
    for (let i = 0; i < dataObj[0].budget.length; i++) {
      totalBudget += dataObj[0].budget[i].monthly_amount;
    }

    let parcentage = (
      (dataObj[0].monthly_total.spend.total / totalBudget) *
      100
    ).toFixed(1);
    output = output.replace(/{%TOTAL_BUDGET_PERCENTAGE%}/, parcentage);
    output = output.replace(/{%TOTAL_BUDGET%}/, totalBudget);
    output = output.replace(
      /{%SPEND_BUDGET%}/,
      dataObj[0].monthly_total.spend.total
    );

    let earnElList = "";
    let earnList = Object.keys(dataObj[0].earn);
    for (let i = 0; i < earnList.length; i++) {
      earnElList += `<li>${earnList[i]}</li>`;
    }

    let spendElList = "";
    let spendList = Object.keys(dataObj[0].spend);
    for (let i = 0; i < spendList.length; i++) {
      spendElList += `<li>${spendList[i]}</li>`;
    }

    output = output.replace(/{%EARN_LIST%}/, earnElList);
    output = output.replace(/{%SPEND_LIST%}/, spendElList);
  }

  // ////////////////////////////////////////////////////////////
  // Will replace all placeholder of budget
  if (parameter === "budget") {
    output = temp.replace(
      /{%LOGO_ALPHABET%}/g,
      dataObj[0].budget[i].logo_alphabet
    );
    output = output.replace(/{%BUDGET_NAME%}/g, dataObj[0].budget[i].name);
    output = output.replace(
      /{%BUDGET_AMOUNT%}/g,
      dataObj[0].budget[i].monthly_amount
    );

    let budgetElList = "";
    for (let i = 0; i < dataObj[0].budget.length; i++) {
      let budget = dataObj[0].budget[i].name;
      budgetElList += `<li>${budget}</li>`;
    }

    output = output.replace(/{%CATEGORY_LIST%}/, budgetElList);
  }

  // /////////////////////////////////////////////////////////////
  // Will replace all placeholder of transaction
  if (parameter === 3) {
    output = temp.replace(
      /{%TRANSACTION_CATEGORY%}/g,
      dataObj[0].transaction[i].category
    );

    output = output.replace(
      /{%TRANSACTION_TYPE%}/g,
      dataObj[0].transaction[i].type
    );

    output = output.replace(
      /{%TRANSACTION_AMOUNT%}/,
      dataObj[0].transaction[i].amount
    );

    // To place a -ve or +ve sign before amount
    if (dataObj[0].transaction[i].type === "spend") {
      output = output.replace(/{%SIGN%}/, `-`);
    } else if (dataObj[0].transaction[i].type === "earn") {
      output = output.replace(/{%SIGN%}/, `+`);
    }

    output = output.replace(
      /{%TRANSACTION_COMMENT%}/g,
      dataObj[0].transaction[i].comment
    );
  }

  return output;
};
