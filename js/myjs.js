import * as Login from './login.js';

$(document).ready(() => {
  $("#btn-login").on("click", () => {
    var ac = {};
    $.each($('#loginForm>div>input').serializeArray(), function (i, field) {
      ac[field.name] = field.value;
    });
    console.log(ac.username + "," + ac.password);
    if (Login.login(ac.username, ac.password)) {
      $("#loginModal").modal('dispose');
    } else {
      console.log("false");
    }
    // $.each(ac, (key, value) => {
    //   console.log(`key: ${key}, value:${value}`);
    // });
  });
});