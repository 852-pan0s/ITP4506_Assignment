import { loadUser } from "./login.js"
$("#btn-logout").on("click", (e) => {
    sessionStorage.clear();
    $("#profileModal").modal("hide");
    $("#btn-ac").attr("data-target", "#loginModal");
    loadUser();
});