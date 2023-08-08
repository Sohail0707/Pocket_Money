// required packages
const express = require("express"),
  app = express(),
  fs = require("fs"),
  replaceTemplate = require("./modules/replaceTemplate");

app.use(express.static("css"));
app.use(express.static("script"));
app.use(express.static("pages"));
app.use(express.static("templates"));

// Set EJS as the template engine
app.set("view engine", "ejs");

// READING data.json
const data = fs.readFileSync(`${__dirname}/user_data.json`, "utf-8");
const dataObj = JSON.parse(data); // Convirted to javascript object

const body = fs.readFileSync(`${__dirname}/pages/main_body.ejs`, "utf-8");

//Route for log in page
// ///////////////////////////////////////////////////////////////
app.get(["/", "/log_in"], (req, res) => {
  fs.readFile(
    `${__dirname}/pages/authentication_page.ejs`,
    "utf-8",
    (err, authentication_page) => {
      fs.readFile(
        `${__dirname}/templates/template_log_in.ejs`,
        "utf-8",
        (err, template_log_in) => {
          let result = body.replace(/{%PAGE%}/, authentication_page);
          result = result.replace(/{%LOG_SIGN%}/, template_log_in);
          result = result.replace(
            /{%CSS%}/,
            `<link rel="stylesheet" href="authentication.css" />`
          );
          res.send(result);
        }
      );
    }
  );
});

//Route for sign up page
// ///////////////////////////////////////////////////////////////
app.get("/sign_up", (req, res) => {
  fs.readFile(
    `${__dirname}/pages/authentication_page.ejs`,
    "utf-8",
    (err, authentication_page) => {
      fs.readFile(
        `${__dirname}/templates/template_sign_up.ejs`,
        "utf-8",
        (err, template_sign_up) => {
          let result = body.replace(/{%PAGE%}/, authentication_page);
          result = result.replace(/{%LOG_SIGN%}/, template_sign_up);
          result = result.replace(
            /{%CSS%}/,
            `<link rel="stylesheet" href="authentication.css" />`
          );
          res.send(result);
        }
      );
    }
  );
});

//Route for dashboard
// ///////////////////////////////////////////////////////////////
app.get("/dashboard", (req, res) => {
  fs.readFile(
    `${__dirname}/pages/application_page.ejs`,
    "utf-8",
    (err, application_page) => {
      fs.readFile(
        `${__dirname}/pages/dashboard.ejs`,
        "utf-8",
        (err, dashboard) => {
          fs.readFile(
            `${__dirname}/templates/template_budget_status.ejs`,
            "utf-8",
            (err, template_budget_status) => {
              let result = body.replace(/{%PAGE%}/, application_page);
              result = result.replace(/{%PAGE%}/, dashboard);

              // This section is for replace placeholde with value from database
              // Join multiple template into one string
              let budget = "";
              for (let i = 1; i <= dataObj[0].budget.length; i++) {
                budget += replaceTemplate(
                  template_budget_status,
                  dataObj,
                  i - 1,
                  "dashboard"
                );
              }
              result = result.replace(/{%BUDGET_LIST%}/, budget);
              result = replaceTemplate(result, dataObj, 0, "dashboard");

              result = result.replace(
                /{%CSS%}/,
                `<link rel="stylesheet" href="navigation.css" />
                 <link rel="stylesheet" href="dashboard.css" />`
              );
              res.send(result);
            }
          );
        }
      );
    }
  );
});

//Route for budget
// ///////////////////////////////////////////////////////////////
app.get("/budget", (req, res) => {
  // Reading the aplication page
  fs.readFile(
    `${__dirname}/pages/application_page.ejs`,
    "utf-8",
    (err, application_page) => {
      // Reading the budget page
      fs.readFile(
        `${__dirname}/pages/budget.ejs`,
        "utf-8",
        (err, budget_page) => {
          // Reading template budget
          fs.readFile(
            `${__dirname}/templates/template_budget.ejs`,
            "utf-8",
            (err, template_budget) => {
              let result = body.replace(/{%PAGE%}/, application_page);
              result = result.replace(/{%PAGE%}/, budget_page);

              // This section is for replace placeholde with value from database
              // Join multiple template into one string
              let budget = "";
              for (let i = 1; i <= dataObj[0].budget.length; i++) {
                budget += replaceTemplate(
                  template_budget,
                  dataObj,
                  i - 1,
                  "budget"
                );
              }
              result = result.replace(/{%BUDGET_LIST%}/, budget);
              result = replaceTemplate(result, dataObj, 0, "budget");

              // Attaching the related css files
              result = result.replace(
                /{%CSS%}/,
                `<link rel="stylesheet" href="navigation.css" />
                 <link rel="stylesheet" href="budget.css" />`
              );
              res.send(result);
            }
          );
        }
      );
    }
  );
});

//Route for transaction
// ///////////////////////////////////////////////////////////////
app.get("/transaction", (req, res) => {
  // reading application page
  fs.readFile(
    `${__dirname}/pages/application_page.ejs`,
    "utf-8",
    (err, application_page) => {
      // Reading transaction page
      fs.readFile(
        `${__dirname}/pages/transaction.ejs`,
        "utf-8",
        (err, transaction_page) => {
          // Reading transaction item template
          fs.readFile(
            `${__dirname}/templates/template_transaction_item.ejs`,
            "utf-8",
            (err, template_transaction_item) => {
              // Reading the date tag in the transaction saction
              fs.readFile(
                `${__dirname}/templates/date_tag.ejs`,
                "utf-8",
                (err, date_tag) => {
                  let result = body.replace(/{%PAGE%}/, application_page);
                  result = result.replace(/{%PAGE%}/, transaction_page);

                  // Sorting the transaction data based on date
                  dataObj[0].transaction.sort(
                    (a, b) => new Date(a.date) - new Date(b.date)
                  );

                  // This section is for replace placeholde with value from database
                  // Join multiple template into one string
                  let transaction_list = "";

                  // This is te previous date to check for the change of date
                  let previousDate = null;
                  for (let i = 1; i <= dataObj[0].transaction.length; i++) {
                    // Current date to compare with the previous one
                    let currentDate = dataObj[0].transaction[i - 1].date;

                    // Checking for the date change
                    if (currentDate != previousDate) {
                      transaction_list += date_tag.replace(
                        /{%DATE%}/g,
                        currentDate
                      );

                      console.log(currentDate);
                      previousDate = currentDate;
                    }

                    transaction_list += replaceTemplate(
                      template_transaction_item,
                      dataObj,
                      i - 1,
                      3
                    );
                  }

                  result = result.replace(
                    /{%TRANSACTION_LIST%}/,
                    transaction_list
                  );
                  result = result.replace(
                    /{%CSS%}/,
                    `<link rel="stylesheet" href="navigation.css" />
                 <link rel="stylesheet" href="transaction.css" />`
                  );
                  res.send(result);
                }
              );
            }
          );
        }
      );
    }
  );
});

// Route for profile
// ///////////////////////////////////////////////
app.get("/profile", (req, res) => {
  fs.readFile(
    `${__dirname}/pages/application_page.ejs`,
    "utf-8",
    (err, application_page) => {
      fs.readFile(
        `${__dirname}/pages/profile.ejs`,
        "utf-8",
        (err, profile_page) => {
          let result = body.replace(/{%PAGE%}/, application_page);
          result = result.replace(/{%PAGE%}/, profile_page);

          result = result.replace(
            /{%USER_NAME%}/,
            `${dataObj[0].firstName} ${dataObj[0].lastName}`
          );

          result = result.replace(/{%EMAIL%}/, dataObj[0].email);

          result = result.replace(
            /{%CSS%}/,
            `<link rel="stylesheet" href="navigation.css" />
                 <link rel="stylesheet" href="profile.css" />`
          );
          res.send(result);
        }
      );
    }
  );
});

app.listen(1800, function () {
  console.log("Application started at port:1800");
});
