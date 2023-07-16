module.exports = (temp, dataObj, i) => {
  let output = temp.replace(
    /{%LOGO_ALPHABET%}/,
    dataObj[0].budget[i.toString()].logo_alphabet
  );
  output = output.replace(
    /{%BUDGET_NAME%}/,
    dataObj[0].budget[i.toString()].name
  );
  output = output.replace(
    /{%BUDGET_AMOUNT%}/,
    dataObj[0].budget[i.toString()].monthly_amount
  );

  return output;
};
