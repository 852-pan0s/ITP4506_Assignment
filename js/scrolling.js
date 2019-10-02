var hide = false;
$(window).scroll(() => {
    if (window.home) {
        if ($(window).scrollTop() > 50) { //if the scroll axis Y is more than 100
            if(!hide){
                $("#navbar").css("top", "-100px");
                $("#navbar").css("transition", "top 0");
                hide = true;
            }
            if($(window).scrollTop() > 200){
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
    $("#navbar").addClass("bg-light navbar-light");
    $("#navbar").removeClass("navbar-dark absolute-top");
    $("#navbar").css("top", "0px");
    $("#navbar button").not(".btn-manage").removeClass("btn-outline-light");
    $("#navbar button").not(".btn-manage").addClass("btn-outline-dark");
    // $("#btn-ac").removeClass("btn-outline-dark");
    // $("#btn-ac").addClass("btn-outline-light");
    // $("#user-icon").addClass("text-dark");
    // $("#user-icon").removeClass("text-light")
};

const darkStyle = () => {
    $("#navbar").addClass("navbar-dark absolute-top");
    $("#navbar").removeClass("bg-light navbar-light ");
    $("#navbar").css("top", "-10px");
    $("#navbar button").not(".btn-manage").removeClass("btn-outline-dark");
    $("#navbar button").not(".btn-manage").addClass("btn-outline-light");
    // $("#btn-ac").removeClass("btn-outline-light");
    // $("#btn-ac").addClass("btn-outline-dark");
    // $("#user-icon").addClass("text-light");
    // $("#user-icon").removeClass("text-dark")
};

export { lightStyle, darkStyle };