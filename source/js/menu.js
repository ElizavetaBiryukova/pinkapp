  var navMain = document.querySelector(".main-nav");
  var navToggle = document.querySelector(".page-header__toggle");
  var navWrapper = document.querySelector(".page-header__wrapper");
  var marginMenu = document.querySelector(".menu-margin");

  navMain.classList.remove("main-nav--nojs");
  navToggle.classList.remove("page-header__toggle--nojs");
  navWrapper.classList.remove("page-header__wrapper--nojs");
  marginMenu.classList.remove("menu-margin--nojs")

  navToggle.addEventListener("click", function () {
    if (navToggle.classList.contains("page-header__toggle--closed")) {
      navToggle.classList.remove("page-header__toggle--closed");
      navMain.classList.remove("main-nav--closed");
      navWrapper.classList.remove("page-header__wrapper--closed");
      navToggle.classList.add("page-header__toggle--opened");
      marginMenu.classList.add("menu-margin--opened");
    } else {
      navToggle.classList.remove("page-header__toggle--opened");
      marginMenu.classList.remove("menu-margin--opened");
      navMain.classList.add("main-nav--closed");
      navToggle.classList.add("page-header__toggle--closed");
      navWrapper.classList.add("page-header__wrapper--closed");

    }
  });
