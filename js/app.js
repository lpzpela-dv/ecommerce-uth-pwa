if (navigator.serviceWorker) {
    navigator.serviceWorker.register('sw.js');
    console.log("compatible con Service Worker");
} else {
    console.log("No es compatible para trabajar con service worker");
}