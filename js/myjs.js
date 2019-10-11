import * as Login from './login.js';
import './profile.js';
import { darkStyle, lightStyle } from "./scrolling.js";

/**Global variables */
window.today = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '-' + mm + '-' + yyyy;
  return today;
}

window.setSessionObj = (session, obj) => {
  sessionStorage.setItem(session, JSON.stringify(obj));
}

window.getSessionObj = (session) => {
  return JSON.parse(sessionStorage.getItem(session));
}

window.clearSessionObj = (session) => {
  sessionStorage.removeItem(session);
}

window.clear = () => {
  sessionStorage.clear();
}

$('.toast').toast({
  delay: 2000,
  animation: true,
  autohide: true
})

window.showToast = (message) => {
  $("#toast-message").html(message);
  $(".toast").toast('show');
}

window.isLoad = {
  "restaurants": false,
};

window._db = {};

const db_load = () => {
  return $.getJSON("../db/data.json").then((data) => {
    return data;
  });
}
/**Global variables */

//load the database first
db_load().then((data) => {
  _db = data;
  if (getSessionObj("db") === null) {
    setSessionObj("db", data);
  }
});

// animation
window.sr = ScrollReveal(); // declare animation object
var homePage;
$(() => {
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
  $(window).scroll(footerMarginFix)
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

  $(".btn-manage-menu").on("click", () => {
    managePage(`${$(".btn-manage").text()} / ${$(".btn-manage-menu").text()}`, "manage_menu.html");
  });

  $("#btn-restaurant").on("click",()=>{
    managePage(`${$("#btn-restaurant").text()}`,"customer_menu.html");
  });
  
  /**On click event */


  //Admin function 
  // Login.loadUser();
});

export { homePage }