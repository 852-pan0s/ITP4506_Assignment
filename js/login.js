// the file needs to run with jQuery.

const activateFunc = (user) => {
    if (user === null) {
        $(".management").addClass("hide");
    } else {
        $("#btn-logout").removeClass("hide");
        switch (user.type) {
            case "normal_user":
                $(".operator,.admin,.management").addClass("hide");
                break;
            case "administrator":
                $(".admin,.management").removeClass("hide");
                break;
            case "operator":
                $(".admin").addClass("hide");
                $(".operator,.management").removeClass("hide");
                break;
            default:
                $(".management").addClass("hide");
        }
    }
}

const showErrorMsg = (msg) => {
    $("#loginFailMsg").removeClass("hide");
    $("#loginFailMsg").text(msg);
}

$(() => {
    var user = getSessionObj("currentUser");
    if (user !== null) {
        activateFunc(user);
    }
})

$("#btn-login").on("click", (e) => {
    var ac = {
        "username": $("#username").val(),
        "password": $("#password").val(),
    }
    if (ac.username === "") {
        showErrorMsg("Your must enter your username!");
    } else if (ac.password === "") {
        showErrorMsg("Your must enter your password!");
    } else {
        $("#username, #password, #remember").attr("disabled", "disabled");
        $(e.delegateTarget).addClass("hide");
        $("#loginLoading").removeClass("hide");
        /* Login function*/
        var isValid = false;
        // console.log(Login.login(ac.username, ac.password));
        $.each(getSessionObj("db").users, (key, user) => {
            if (ac.username === user.username && ac.password === user.password) {
                setSessionObj("currentUser", user);
                isValid = true;
                return false;
            }
        });

        setTimeout(() => {
            $("#username, #password, #remember").removeAttr("disabled");
            if (isValid) {
                var user = getSessionObj("currentUser");
                activateFunc(user);
                $("#loginModal").modal('hide');
                $("#btn-ac").attr("data-target", "#profileModal").attr("data-content",`Click me to edit your profile!`);

            } else {
                showErrorMsg("Your username or password is wrong!");
            }
            $(e.delegateTarget).removeClass("hide");
            $("#loginLoading").addClass("hide");
        }, 1000);
    }
});

export { activateFunc }










/**Old code */
// window.user = {};

// const get = () => {
//     return $.getJSON("../db/users.json").then((data) => {
//         return data;
//     });
// };

// const showErrorMsg = (msg) => {
//     $("#loginFailMsg").removeClass("hide");
//     $("#loginFailMsg").text(msg);
// }

// const adminFunc = () => {
//     if (user != null && user.type === "administrator") {
//         $(".admin").removeClass("hide");
//     } else {
//         $(".admin").addClass("hide");
//     }
// }
// const loadUser = () => {
//     window.user = JSON.parse(sessionStorage.getItem("user"));
//     adminFunc();
// };

// adminFunc();

// $("#username, #password").on("keydown", () => {
//     $("#loginFailMsg").addClass("hide");
// });

// $("#btn-login").on("click", (e) => {
//     var ac = {
//         "username": $("#username").val(),
//         "password": $("#password").val(),
//     }
//     if (ac.username === "") {
//         showErrorMsg("Your must enter your username!");
//     } else if (ac.password === "") {
//         showErrorMsg("Your must enter your password!");
//     } else {
//         $("#username, #password, #remember").attr("disabled", "disabled");
//         $(e.delegateTarget).addClass("hide");
//         $("#loginLoading").removeClass("hide");
//         /* Login function*/
//         var isValid = false;
//         // console.log(Login.login(ac.username, ac.password));
//         get().then((data) => {
//             $.each(data, (type, values) => {
//                 $.each(values, (id, userInfo) => {
//                     // console.log(`CHECK2:${id},${userInfo.username}`)
//                     if (ac.username === userInfo.username && ac.password === userInfo.password) {
//                         sessionStorage.setItem("user", JSON.stringify(userInfo));
//                         console.log(sessionStorage.getItem("user"));
//                         isValid = true;
//                         return false;
//                     };
//                 });
//                 if (isValid) {
//                     return false;
//                 }
//             });
//         });
//         setTimeout(() => {
//             $("#username, #password, #remember").removeAttr("disabled");
//             if (isValid) {
//                 user = JSON.parse(sessionStorage.getItem("user"));
//                 adminFunc();
//                 $("#loginModal").modal('hide');
//                 $("#btn-ac").attr("data-target", "#profileModal");

//             } else {
//                 showErrorMsg("Your username or password is wrong!");
//             }
//             $(e.delegateTarget).removeClass("hide");
//             $("#loginLoading").addClass("hide");
//         }, 1000);
//         /* Login function*/
//     }
// });

// export { loadUser };
/**old code */