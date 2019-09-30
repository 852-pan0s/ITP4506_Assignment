import * as Login from './login.js';
import './profile.js';
import { darkStyle, lightStyle } from "./scrolling.js"

// animation
window.sr = ScrollReveal(); // declare animation object

$(document).ready(() => {
  //***************** Declare Functions *****************/ 
  const homePage = () => {
    $(".main-content").load("./home.html");
    $("#directory").addClass("hide");
    window.home = true;
    setTimeout(footerMarginFix, 50);
    marginFix();
  };

  const menuPage = () => {
    $(".main-content").load("./menu.html");
    window.home = false;
    marginFix();
  };

  const marginFix = () => {
    if (window.home) {
      $(".main-content").parent(0).css("margin-top", "0");
    } else {
      $(".main-content").parent(0).css("margin-top", "100px");
      $("#directory").removeClass("hide");
    }
  }

  //fix home footer 
  const footerMarginFix = () => {
    $(".margin").css("marginBottom", $(".content:first").height());
  }
  //***************** Declare Functions *****************/ 

  if (sessionStorage.getItem("user") !== null) {
    $("#btn-ac").attr("data-target", "#profileModal");
  } else {
    $("#btn-ac").attr("data-target", "#loginModal");
  }
  $("#btn-menu").on("click", () => {
    lightStyle();
  });
  $(".btn-home").on("click", () => {
    darkStyle();
  });

  $(window).resize(footerMarginFix);
  homePage();


  /**On click event */
  $(".btn-home, #btn-menu").on("click", () => {
    $(window).scrollTop("0");
  });

  $(".btn-home").on("click", () => {
    homePage();
  });
  $("#btn-menu").on("click", () => {
    menuPage();
  });


  /**Admin function */
  Login.loadUser();
});