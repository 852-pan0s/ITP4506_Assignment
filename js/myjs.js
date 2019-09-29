import './users.js';
import './profile.js';
import { darkStyle, lightStyle } from "./scrolling.js"

$(document).ready(() => {
  if(sessionStorage.getItem("user") !== null){
    $("#btn-ac").attr("data-target","#profileModal");
  }else{
    $("#btn-ac").attr("data-target","#loginModal");
  }
  $("#btn-menu").on("click", () => {
    lightStyle();
  });
  $("#btn-home").on("click", () => {
    darkStyle();
  });
});