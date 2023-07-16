// ////////// making the navigation working
const pathName = window.location.pathname;
const navBtn = document.querySelectorAll("#navigation .link");
const navIconSolid = document.querySelectorAll("#navigation .icon_solid");
const navIconOutline = document.querySelectorAll("#navigation .icon_outline");
const navText = document.querySelectorAll("#navigation .txt");

window.addEventListener("load", function () {
  if (pathName === "/dashboard") {
    navIconOutline[0].style.display = `none`;
    navIconSolid[0].style.display = `block`;
    navText[0].style.color = `var(--color_primary)`;
  }

  if (pathName === "/budget") {
    navIconOutline[1].style.display = `none`;
    navIconSolid[1].style.display = `block`;
    navText[1].style.color = `var(--color_primary)`;
  }

  if (pathName === "/transaction") {
    navIconOutline[2].style.display = `none`;
    navIconSolid[2].style.display = `block`;
    navText[2].style.color = `var(--color_primary)`;
  }

  if (pathName === "/profile") {
    navIconOutline[3].style.display = `none`;
    navIconSolid[3].style.display = `block`;
    navText[3].style.color = `var(--color_primary)`;
  }
});

// ////////////// Main container margin top
const mainContainer = document.querySelector("#dashboard .main_container");
const topContainer = document.querySelector("#dashboard .top_container");

mainContainer.style.marginTop = `${(topContainer.offsetHeight - 20) / 10}rem`;

// ///////// Setting the colors of dashboard budget /////////
// //////////////////////////////////////////////////////////
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
    }
    if (alphabetSet2.test(alphabet.innerHTML)) {
      alphabet.style.background = colorObj.c2;
    }
    if (alphabetSet3.test(alphabet.innerHTML)) {
      alphabet.style.background = colorObj.c3;
    }
    if (alphabetSet4.test(alphabet.innerHTML)) {
      alphabet.style.background = colorObj.c4;
    }
  });
});
