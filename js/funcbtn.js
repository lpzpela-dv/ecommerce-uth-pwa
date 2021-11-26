var contC = 0
var cantF = 0

function addToCar(event) {
    contC = contC + 1
    $("#cantCar").text(contC);
    showNotification("Se agregó articulo al carrito", "img/icons/icon-128x128.png");
}

function addToFav(event) {
    cantF = cantF + 1
    $("#cantFav").text(cantF);
    showNotification("Se agregó articulo al favoritos", "img/icons/icon-128x128.png");
}

function showNotification(_body, _icon) {
    if (Notification.permission === "granted") {
        let options = {
            body: _body,
            icon: _icon
        }
        let n = new Notification("CamStore", options);
        setTimeout(n.close.bind(n), 3000);
    }else{
        console.log("Notificaciónes deshabilitadas");
    }

}