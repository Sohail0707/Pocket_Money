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

              let budget = "";
              for (let i = 1; i <= Object.keys(dataObj[0].budget).length; i++) {
                budget =
                  budget +
                  replaceTemplate(template_budget_status, dataObj, i, 1);
              }
              result = result.replace(/{%BUDGET_LIST%}/, budget);

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
  fs.readFile(
    `${__dirname}/pages/application_page.ejs`,
    "utf-8",
    (err, application_page) => {
      fs.readFile(
        `${__dirname}/pages/budget.ejs`,
        "utf-8",
        (err, budget_page) => {
          fs.readFile(
            `${__dirname}/templates/template_budget.ejs`,
            "utf-8",
            (err, template_budget) => {
              let result = body.replace(/{%PAGE%}/, application_page);
              result = result.replace(/{%PAGE%}/, budget_page);

              let budget = "";
              for (let i = 1; i <= Object.keys(dataObj[0].budget).length; i++) {
                console.log(template_budget);
                budget =
                  budget + replaceTemplate(template_budget, dataObj, i, 2);
              }
              result = result.replace(/{%BUDGET_LIST%}/, budget);

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

app.listen(1800, function () {
  console.log("Application started at port:1800");
});
