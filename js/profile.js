// import { loadUser } from "./login.js"
import { activateFunc } from "./login.js";
import { homePage } from "./myjs.js";
$("#pro-form").load("../profile.html");
$("#btn-logout").on("click", (e) => {
    yesNoModal("Are you sure to log out? If yes, the page will return to home page at <span class='text-danger'>3</span> seconds.",(c)=>{
        if(c){
            $("#btn-logout").addClass("hide");
            clearSessionObj("currentUser");
            $("#profileModal").modal("hide");
            $("#btn-ac").attr("data-target", "#loginModal");
            activateFunc(null);
            pageReload(3);
        }
    });

    // clearSessionObj("restaurant");
    // loadUser();
  
});

var pageReload = (sec) => {
    showToast(`<span class="text-success">Log out successfully!!</span> Return to home page at <span class="text-danger">${sec}</span> second(s).`);
    if(sec>0){
        setTimeout(()=>{
            pageReload(--sec);
        }, 1000);
    }else{
        homePage();
    }
};