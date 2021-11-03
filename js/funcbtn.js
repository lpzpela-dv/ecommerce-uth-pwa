var contC = 0
var cantF = 0
function addToCar(event){
    contC = contC + 1
    $("#cantCar").text(contC)
}

function addToFav(event){
    cantF = cantF + 1
    $("#cantFav").text(cantF)
}