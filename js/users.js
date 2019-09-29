// the file needs to run with jQuery.
const get = (username, password) => {
    return $.getJSON("../db/users.json").then((data) => {
        return data;
    });
};

const showErrorMsg = (msg) => {
    $("#loginFailMsg").removeClass("hide");
    $("#loginFailMsg").text(msg);
}

$("#username, #password").on("keydown", () => {
    $("#loginFailMsg").addClass("hide");
});

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
        get().then((data) => {
            $.each(data, (type, values) => {
                $.each(values, (id, userInfo) => {
                    // console.log(`CHECK2:${id},${userInfo.username}`)
                    if (ac.username === userInfo.username && ac.password === userInfo.password) {
                        sessionStorage.setItem("user", JSON.stringify(userInfo));
                        console.log(sessionStorage.getItem("user"));
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
            $("#username, #password, #remember").removeAttr("disabled");
            if (isValid) {
                $("#loginModal").modal('hide');
                $("#btn-ac").attr("data-target","#profileModal");
            } else {
                showErrorMsg("Your username or password is wrong!");
            }
            $(e.delegateTarget).removeClass("hide");
            $("#loginLoading").addClass("hide");
        }, 1000);
        /* Login function*/
    }
});