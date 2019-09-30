import { loadUser } from "./login.js"
import { homePage } from './myjs.js';
$("#btn-logout").on("click", (e) => {
    sessionStorage.clear();
    $("#profileModal").modal("hide");
    $("#btn-ac").attr("data-target", "#loginModal");
    loadUser();
    homePage();
});