import './profile.js';
import {
  darkStyle,
  lightStyle
} from "./scrolling.js";
import {
  login
} from "./login.js";


/**Global variables */

window.style = "default";

//Get today value return dd-mm-yyy
window.today = () => {
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, '0');
  var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  var yyyy = today.getFullYear();

  today = dd + '-' + mm + '-' + yyyy;
  return today;
}

//set object to the session
window.setSessionObj = (session, obj) => {
  sessionStorage.setItem(session, JSON.stringify(obj));
}

//get object from the session
window.getSessionObj = (session) => {
  return JSON.parse(sessionStorage.getItem(session));
}

//clear the session item
window.clearSessionObj = (session) => {
  sessionStorage.removeItem(session);
}

//clear all the session items
window.clear = () => {
  sessionStorage.clear();
  location.reload();
}

//Time picker
window.timePicker = {
  "sTime": null,
  "eTime": null,
  makePicker: (dayTime) => {
    if (dayTime.picker !== null) {
      dayTime.picker.destroy();
    }
    return new Picker(dayTime.element, {
      format: dayTime.format,
      date: dayTime.time,
      headers: dayTime.headers,
      text: {
        title: dayTime.title,
      }
    });
  }
}

//Show the toast 
window.showToast = (message, type) => {
  var color = "";
  switch (type) {
    case 1:
    case "error":
      color = "toast-icon-1";
      break;
    default:
      color = "toast-icon-0";
  }
  $(".toast").toast('dispose');
  $("#toast-message").html(message);
  $('.toast').toast({
    delay: 5000,
    animation: true,
    autohide: true
  })
  $(".toast").toast('show');
  $("#toast-icon").attr("class", color);
}

window.isLoad = {
  "restaurants": false,
};

window._db = {};

//Yes no modal callback function
window.yesNoModal = (text, callback) => {
  $("#yesNo-modal").modal('show'); //show the yes no modal
  $("#yesNo-modal #text").html(text);
  $("#btn-yes").on("click", () => {
    callback(true);
    $("#yesNo-modal").modal('hide'); //hide the yes no modal
  });
  $("#btn-no").on("click", () => {
    callback(false);
    $("#yesNo-modal").modal('hide'); //hide the yes no modal
  });

}

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

  window.menuPage = () => {
    $(".main-content").load("./menu.html");
    window.home = false;
    marginFix();
    lightStyle();
    setSecondDirectory("Menu");
  };

  const footerFix = () => {
    if ($("#main").height() > $(window).height() - 200) {
      $("#sticky-footer").removeClass("footer");
    } else {
      $("#sticky-footer").addClass("footer");
    }
  };

  window.managePage = (name, url, thirdDir) => {
    $(".main-content").load(`./${url}`);
    window.home = false;
    marginFix();
    lightStyle();
    setTimeout(footerFix, 50);
    setSecondDirectory(name);
    if (typeof thirdDir !== "undefined") {
      $("#third").show();
    } else {
      $("#third").hide();
    }

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
    $("#directory>ol>li:nth-child(3)").text(name);
  };

  //fix home footer 
  const footerMarginFix = () => {
    $(".margin").css("height", $(".content:first").height() + 50);
    footerFix();
  }
  //***************** Declare Functions *****************/ 
  $("#password").keyboard();


  if (sessionStorage.getItem("currentUser") !== null) {
    $("#btn-ac").attr("data-target", "#profileModal").attr("data-content", `Click me to edit your profile!`);
  } else {
    $("#btn-ac").attr("data-target", "#loginModal");
  }

  $(window).resize(footerMarginFix);
  $(window).scroll(footerMarginFix);
  homePage();

  window.showPopover = (element) => {
    $(element).popover('show');
  }

  window.hidePopover = (element) => {
    $(element).popover('hide');
  }

  /**On click event */
  $(".btn-show-register").on("click", () => {
    // managePage("Register","register.html");
    $("#loginModal").modal("hide");
  });

  $(".btn-home, #btn-menu").on("click", () => {
    $(window).scrollTop("0");
  });

  $(".btn-home").on("click", () => {
    homePage();
  });
  $("#btn-menu").on("click", () => {
    menuPage();
  });

  $(".btn-manage-restaurant").on("click", () => {
    managePage(`${$(".btn-manage").text()} / ${$(".btn-manage-restaurant").text()}`, "manage_restaurant.html");
  });
  $(".btn-manage-user").on("click", () => {
    managePage(`${$(".btn-manage").text()} / ${$(".btn-manage-user").text()}`, "manage_user.html");
  });

  $(".btn-manage-style").on("click", () => {
    managePage(`${$(".btn-manage").text()} / ${$(".btn-manage-style").text()}`, "manage_style.html");
  });

  $(".btn-manage-menu").on("click", () => {
    managePage(`${$(".btn-manage").text()} / ${$(".btn-manage-menu").text()}`, "manage_menu.html");
  });

  $(".btn-manage-branch ").on("click", () => {
    managePage(`${$(".btn-manage").text()} / ${$(".btn-manage-branch").text()}`, "manage_branch.html");
  });

  $(".btn-restaurant").on("click", () => {
    managePage(`${$($(".btn-restaurant")[0]).text()}`, "customer_menu.html");
  });

  var changeStyle = (inStyle) => {
    style = inStyle;
    var c = "";
    switch (style) {
      case "red":
        c = "text-danger";
        break;
      case "blue":
        c = "text-primary";
        break;
      case "orange":
        c = "text-warning";
        break;
      case "green":
        c = "text-success";
        break;
      default:
        c = "text-secondary";
        break;
    }
    showToast(`Style has been changed to <span class="${c}">${inStyle}</span> successfully!`);
    darkStyle();
    lightStyle();
    footerMarginFix();
    if (home && $(window).scrollTop() <= 50) {
      darkStyle();

    }
  }

  $("#btn-default").on("click", () => {
    changeStyle("default");
  });

  $("#btn-red").on("click", () => {
    changeStyle("red");
  });

  $("#btn-blue").on("click", () => {
    changeStyle("blue");
  });

  $("#btn-orange").on("click", () => {
    changeStyle("orange");
  });

  $("#btn-green").on("click", () => {
    changeStyle("green");
  });

  var fakeLogin = (username, password) => {
    var ac = {
      username,
      password
    };
    var myWindow = window.open("", "Loading...", "width=500,height=500");
    login(ac);
    setTimeout(() => {
      myWindow.close();
    }, 1000);
  };

  $(".g-login").on("click", () => {
    fakeLogin("user","user");
  });

  $(".f-login").on("click", () => {
    fakeLogin("kfc","kfc");
  });

  $(".t-login").on("click", () => {
    fakeLogin("admin","admin");
  });


  /**On click event */

  $('[data-toggle="popover"]').popover();
  $('[data-toggle="tooltip"]').tooltip();

});

export {
  homePage
}