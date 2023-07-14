// Makink the Authentication page functional
// //////////////////////////////////////////////////////
const logSignLink = document.querySelectorAll("#authentication_page .link");
const logInPage = document.querySelector("#log_in_page");
const signUpPage = document.querySelector("#sign_up_page");

logSignLink.forEach((item) => {
  item.addEventListener("click", function () {
    if (item === logSignLink[0]) {
      logInPage.style.display = "none";
      signUpPage.style.display = "flex";
    }
    if (item === logSignLink[1]) {
      signUpPage.style.display = "none";
      logInPage.style.display = "flex";
    }
  });
});
