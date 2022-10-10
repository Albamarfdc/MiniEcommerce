const openBtn = document.querySelector("nav > div > i");
const sideBarWrapper = document.querySelector("div.side-bar-wrapper");
const closeBtn = document.querySelector("#close-cart");
const sideBar = document.querySelector("#side-bar");

openBtn.addEventListener("click", function () {
  sideBarWrapper.style.width = "200vw";
  sideBar.style.width = "400px";
});

closeBtn.addEventListener("click", function () {
  sideBarWrapper.style.width = "0vw";
  sideBar.style.width = "0px";
});

sideBarWrapper.addEventListener("click", function () {
  sideBarWrapper.style.width = "0vw";
  sideBar.style.width = "0px";
});

sideBar.addEventListener("click", function (e) {
  e.stopPropagation();
});
