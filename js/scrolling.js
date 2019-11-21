var hide = false;
$(window).scroll(() => {
    if (window.home) {
        if ($(window).scrollTop() > 50) { //if the scroll axis Y is more than 100
            if (!hide) {
                $("#navbar").css("top", "-100px");
                $("#navbar").css("transition", "top 0");
                hide = true;
            }
            if ($(window).scrollTop() > 200) {
                $("#navbar").css("transition", "top 0.5s");
                lightStyle();
            }
        } else {
            hide = false;
            $("#navbar").css("transition", "top 0.5s");
            darkStyle();
        }
    }
});

const lightStyle = () => {
    $("#navbar").removeClass("navbar-dark absolute-top bg-blue bg-red bg-green bg-orange ");
    $("#navbar").css("top", "0px");
    $("#navbar button").not(".btn-manage,#btn-logout").removeClass("btn-outline-light");

    switch (style) {
        case "blue":
            $("#navbar").addClass("navbar-dark bg-blue navbar-light");
            $("#navbar button").not(".btn-manage,#btn-logout").addClass("btn-outline-light");
            $("#sticky-footer").attr("class", "bg-blue py-4 text-white");
            break;
        case "red":
            $("#navbar").addClass("navbar-dark bg-red navbar-light");
            $("#navbar button").not(".btn-manage,#btn-logout").addClass("btn-outline-light");
            $("#sticky-footer").attr("class", "bg-red py-4 text-white");
            break;
        case "orange":
            $("#navbar").addClass("navbar-dark bg-orange navbar-light");
            $("#navbar button").not(".btn-manage,#btn-logout").addClass("btn-outline-light");
            $("#sticky-footer").attr("class", "bg-orange py-4 text-white");
            break;
        case "green":
            $("#navbar").addClass("navbar-dark bg-green navbar-light");
            $("#navbar button").not(".btn-manage,#btn-logout").addClass("btn-outline-light");
            $("#sticky-footer").attr("class", "bg-green py-4 text-white");
            break;
        default:
            $("#navbar button").not(".btn-manage,#btn-logout").addClass("btn-outline-dark");
            $("#navbar").addClass("bg-light navbar-light");
            $("#sticky-footer").attr("class", "py-4 bg-dark text-white-50");
            break;
    }
    // $("#btn-ac").removeClass("btn-outline-dark");
    // $("#btn-ac").addClass("btn-outline-light");
    // $("#user-icon").addClass("text-dark");
    // $("#user-icon").removeClass("text-light")
};

const darkStyle = () => {
    $("#navbar").addClass("navbar-dark absolute-top");
    $("#navbar").removeClass("bg-light bg-blue navbar-light bg-blue bg-red bg-green bg-orange");
    $("#navbar").css("top", "-10px");
    $("#navbar button").not(".btn-manage,#btn-logout").removeClass("btn-outline-dark");
    $("#navbar button").not(".btn-manage,#btn-logout").addClass("btn-outline-light");
    // $("#btn-ac").removeClass("btn-outline-light");
    // $("#btn-ac").addClass("btn-outline-dark");
    // $("#user-icon").addClass("text-light");
    // $("#user-icon").removeClass("text-dark")
};

export {
    lightStyle,
    darkStyle
};