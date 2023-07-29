module.exports = (temp, dataObj, i, parameter) => {
  let output = "";

  if (parameter === 1) {
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
  }

  // ////////////////////////////////////////////////////////////
  if (parameter === 2) {
    output = temp.replace(
      /{%LOGO_ALPHABET%}/g,
      dataObj[0].budget[i].logo_alphabet
    );
    output = output.replace(/{%BUDGET_NAME%}/g, dataObj[0].budget[i].name);
    output = output.replace(
      /{%BUDGET_AMOUNT%}/g,
      dataObj[0].budget[i].monthly_amount
    );
  }

  // /////////////////////////////////////////////////////////////
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
