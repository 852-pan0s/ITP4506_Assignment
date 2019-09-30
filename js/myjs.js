import * as Login from './login.js';
import './profile.js';
// import './restaurant.js';
import { darkStyle, lightStyle } from "./scrolling.js";

// animation
window.sr = ScrollReveal(); // declare animation object
var homePage;
$(document).ready(() => {
  //***************** Declare Functions *****************/ 
  homePage = () => {
    $(".main-content").load("./home.html");
    $("#directory").addClass("hide");
    window.home = true;
    setTimeout(footerMarginFix, 50);
    marginFix();
    darkStyle();
  };

  const menuPage = () => {
    $(".main-content").load("./menu.html");
    window.home = false;
    marginFix();
    lightStyle();
    setSecondDirectory("Menu");
  };

  const managePage = (name, url) => {
    $(".main-content").load(`./${url}`);
    window.home = false;
    marginFix();
    lightStyle();
    setSecondDirectory(name);

  }

  const marginFix = () => {
    if (window.home) {
      $(".main-content").parent(0).css("margin-top", "0");
    } else {
      $(".main-content").parent(0).css("margin-top", "100px");
      $("#directory").removeClass("hide");
    }
  }

  const setSecondDirectory = (name) => {
    $("#directory>ol>li:nth-child(2)").text(name);
  };

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
  // $(".btn-manage").on("click",()=> {
  //   managePage();
  // });
  $(".btn-manage-restaurant").on("click", () => {
    managePage(`${$(".btn-manage").text()} / ${$(".btn-manage-restaurant").text()}`, "manage_restaurant.html");
  });
  $(".btn-manage-user").on("click", () => {
    managePage(`${$(".btn-manage").text()} / ${$(".btn-manage-user").text()}`, "manage_user.html");
  });


  /**Admin function */
  Login.loadUser();
});

export { homePage}