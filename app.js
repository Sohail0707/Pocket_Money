// required packages
const express = require("express"),
  app = express(),
  fs = require("fs");
// const replaceTemplate = require("./modules/replaceTemplate");

app.use(express.static("css"));
app.use(express.static("script"));
app.use(express.static("pages"));
app.use(express.static("templates"));

const body = fs.readFileSync(`${__dirname}/pages/body.html`, "utf-8");

//Route for log in page
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
          res.send(result);
        }
      );
    }
  );
});

//Route for sign up page
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
          res.send(result);
        }
      );
    }
  );
});

//Route for dashboard
app.get("/dashboard", (req, res) => {
  fs.readFile(
    `${__dirname}/pages/main_page.html`,
    "utf-8",
    (err, main_page) => {
      fs.readFile(
        `${__dirname}/templates/dashboard.html`,
        "utf-8",
        (err, dashboard_page) => {
          let result = body.replace(/{%PAGE%}/, main_page);
          result = result.replace(/{%PAGE%}/, dashboard_page);
          res.send(result);
        }
      );
    }
  );
});

app.listen(1800, function () {
  console.log("Application started at port:1800");
});
