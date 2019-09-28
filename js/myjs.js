import * as User from './login.js';


$(document).ready(() => {
  $("#btn-login").on("click", (e) => {
    $(e.delegateTarget).addClass("hide");
    $("#loginLoading").removeClass("hide");
    var ac = {};
    $.each($('#loginForm>div>input').serializeArray(), function (i, field) {
      ac[field.name] = field.value;
    });
    console.log(ac.username + "," + ac.password);
    /* Login function*/
    var isValid = false;
    // console.log(Login.login(ac.username, ac.password));
    User.get().then((data) => {
      $.each(data, (type, values) => {
        $.each(values, (id, userInfo) => {
          // console.log(`CHECK2:${id},${userInfo.username}`)
          if (ac.username === userInfo.username && ac.password === userInfo.password) {
            isValid = true;
            return false;
          };
        });
        if (isValid) {
          return false;
        }
      });
    });
    setTimeout(() => {
      if (isValid) {
        console.log("OK");
        $('#loginModal').modal('hide');
      } else {
        console.log("fail");
      }
      $(e.delegateTarget).removeClass("hide");
      $("#loginLoading").addClass("hide");
    }, 2000);
    /* Login function*/
  });
});
