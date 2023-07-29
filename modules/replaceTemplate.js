module.exports = (temp, dataObj, i, parameter) => {
  let output = "";

  if (parameter === 1) {
    let budget_amount = dataObj[0].budget[i.toString()].monthly_amount;
    let budget_name = dataObj[0].budget[i.toString()].name;
    let spend_amount = dataObj[0].spend[budget_name];

    let percentage = ((spend_amount / budget_amount) * 100).toFixed(1);
    if (/\.0$/.test(percentage)) {
      percentage = parseInt(percentage);
    }

    output = temp.replace(
      /{%LOGO_ALPHABET%}/g,
      dataObj[0].budget[i.toString()].logo_alphabet
    );
    output = output.replace(
      /{%BUDGET_NAME%}/g,
      dataObj[0].budget[i.toString()].name
    );
    output = output.replace(
      /{%BUDGET_AMOUNT%}/g,
      `$${dataObj[0].budget[i.toString()].monthly_amount}`
    );
    output = output.replace(/{%SPEND_AMOUNT%}/g, spend_amount);
    output = output.replace(/{%BUDGET_PERCENTAGE%}/g, percentage);
  }

  // ////////////////////////////////////////////////////////////
  if (parameter === 2) {
    output = temp.replace(
      /{%LOGO_ALPHABET%}/g,
      dataObj[0].budget[i.toString()].logo_alphabet
    );
    output = output.replace(
      /{%BUDGET_NAME%}/g,
      dataObj[0].budget[i.toString()].name
    );
    output = output.replace(
      /{%BUDGET_AMOUNT%}/g,
      dataObj[0].budget[i.toString()].monthly_amount
    );
  }

  // /////////////////////////////////////////////////////////////
  if (parameter === 3) {
    output = temp.replace(
      /{%TRANSACTION_CATEGORY%}/g,
      dataObj[0].transaction[i.toString()].category
    );

    output = output.replace(
      /{%TRANSACTION_TYPE%}/g,
      dataObj[0].transaction[i.toString()].type
    );

    // To place a -ve or +ve sign before amount
    if (dataObj[0].transaction[i.toString()].type === "spend") {
      output = output.replace(
        /{%TRANSACTION_AMOUNT%}/g,
        `-${dataObj[0].transaction[i.toString()].amount}`
      );
    } else if (dataObj[0].transaction[i.toString()].type === "earn") {
      output = output.replace(
        /{%TRANSACTION_AMOUNT%}/g,
        `+${dataObj[0].transaction[i.toString()].amount}`
      );
    }

    output = output.replace(
      /{%TRANSACTION_COMMENT%}/g,
      dataObj[0].transaction[i.toString()].comment
    );
  }

  return output;
};
