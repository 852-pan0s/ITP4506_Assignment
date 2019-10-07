// import { loadUser } from "./login.js"
import { activateFunc } from "./login.js";
import { homePage } from "./myjs.js";
$("#btn-logout").on("click", (e) => {
    clearSessionObj("user");
    $("#profileModal").modal("hide");
    $("#btn-ac").attr("data-target", "#loginModal");
    activateFunc(null);
    // clearSessionObj("restaurant");
    // loadUser();
    homePage();
});