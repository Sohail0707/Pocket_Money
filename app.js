// required packages
const express = require("express"),
  app = express(),
  fs = require("fs"),
  replaceTemplate = require("./modules/replaceTemplate");

app.use(express.static("css"));
app.use(express.static("script"));
app.use(express.static("pages"));
app.use(express.static("templates"));

const body = fs.readFileSync(`${__dirname}/pages/body.html`, "utf-8");
// READING data.json
const data = fs.readFileSync(`${__dirname}/user_data.json`, "utf-8");
const dataObj = JSON.parse(data); // Convirted to javascript object

//Route for log in page
// ///////////////////////////////////////////////////////////////
app.get(["/", "/log_in"], (req, res) => {
  fs.readFile(
    `${__dirname}/pages/authentication_page.html`,
    "utf-8",
    (err, authentication_page) => {
      fs.readFile(
        `${__dirname}/templates/log_in.html`,
        "utf-8",
        (err, log_in_page) => {
          let result = body.replace(/{%PAGE%}/, authentication_page);
          result = result.replace(/{%LOG_IN%}/, log_in_page);
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
    `${__dirname}/pages/authentication_page.html`,
    "utf-8",
    (err, authentication_page) => {
      fs.readFile(
        `${__dirname}/templates/sign_up.html`,
        "utf-8",
        (err, sign_up_page) => {
          let result = body.replace(/{%PAGE%}/, authentication_page);
          result = result.replace(/{%LOG_IN%}/, sign_up_page);
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
    `${__dirname}/pages/main_page.html`,
    "utf-8",
    (err, main_page) => {
      fs.readFile(
        `${__dirname}/templates/dashboard.html`,
        "utf-8",
        (err, dashboard_page) => {
          fs.readFile(
            `${__dirname}/templates/dashboard_budget.html`,
            "utf-8",
            (err, dashboard_budget) => {
              let result = body.replace(/{%PAGE%}/, main_page);
              result = result.replace(/{%PAGE%}/, dashboard_page);

              let budget = "";
              for (let i = 1; i <= Object.keys(dataObj[0].budget).length; i++) {
                budget =
                  budget + replaceTemplate(dashboard_budget, dataObj, i, 1);
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

app.listen(1800, function () {
  console.log("Application started at port:1800");
});
