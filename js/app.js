if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js');
    console.log("compatible con Service Worder");
} else {
    console.log("No es compatible para trabajar con service worker");
}