$(document).ready(function (){
    Notification.requestPermission().then(function(result) {
        console.log(result);
    });

    $("#login").on("click",function () {
        window.location.href="http://localhost:8080/ecommerce-uth-pwa/login.html";
    });
});
