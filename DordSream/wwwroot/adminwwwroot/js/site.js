// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.



// Write your JavaScript code.
let height = $(window).height();
let rightHeight = height - 170;
let leftHeight = height - 100;
$(".right-over-flow").css("height", rightHeight + "px");
$(".left-over-flow").css("height", leftHeight + "px");
$(".right-over-flow-f").css("height", leftHeight + "px");

