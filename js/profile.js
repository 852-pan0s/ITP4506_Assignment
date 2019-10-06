// import { loadUser } from "./login.js"
import * as Main from "./myjs.js";
import { activateFunc } from "./login.js";
$("#btn-logout").on("click", (e) => {
    clearSessionObj("user");
    $("#profileModal").modal("hide");
    $("#btn-ac").attr("data-target", "#loginModal");
    activateFunc(null);
    clearSessionObj("restaurant");
    // loadUser();
    Main.homePage();
});