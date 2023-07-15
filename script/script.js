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
