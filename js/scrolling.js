$(window).scroll(() => {
    if (window.home) {
        if ($(window).scrollTop() > 50) { //if the scroll axis Y is more than 100
            lightStyle();
        } else {
            darkStyle();
        }
    }
});

const lightStyle = () => {
    $("#navbar").addClass("bg-light navbar-light");
    $("#navbar").removeClass("navbar-dark absolute-top")
    $("#navbar").css("top", "0px");
    $("#navbar button").removeClass("btn-outline-light");
    $("#navbar button").addClass("btn-outline-dark");
    // $("#btn-ac").removeClass("btn-outline-dark");
    // $("#btn-ac").addClass("btn-outline-light");
    // $("#user-icon").addClass("text-dark");
    // $("#user-icon").removeClass("text-light")
};

const darkStyle = () => {
    $("#navbar").addClass("navbar-dark absolute-top");
    $("#navbar").removeClass("bg-light navbar-light ");
    $("#navbar").css("top", "-6px");
    $("#navbar button").removeClass("btn-outline-dark");
    $("#navbar button").addClass("btn-outline-light");
    // $("#btn-ac").removeClass("btn-outline-light");
    // $("#btn-ac").addClass("btn-outline-dark");
    // $("#user-icon").addClass("text-light");
    // $("#user-icon").removeClass("text-dark")
};

export { lightStyle, darkStyle };