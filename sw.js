const cacheName = 'shell-content';
const fileToCache = [
    '/',
    'index.html',
    'js/app.js',
    'css/bootstrap.min.css',
    'js/bootstrap.bundle.min.js',
    'js/ecommerce.js',
    'img/Products/canon.PNG',
    'img/Products/sony.PNG',
    'img/Products/canon2.PNG',
    'https://code.jquery.com/jquery-3.6.0.min.js',
    'https://kit.fontawesome.com/87f8d9e4cd.js',
    'https://ka-f.fontawesome.com/releases/v5.15.4/webfonts/free-fa-solid-900.woff2',
    'https://ka-f.fontawesome.com/releases/v5.15.4/css/free.min.css?token=87f8d9e4cd',
    'https://ka-f.fontawesome.com/releases/v5.15.4/css/free-v4-shims.min.css?token=87f8d9e4cd',
    'https://ka-f.fontawesome.com/releases/v5.15.4/css/free-v4-font-face.min.css?token=87f8d9e4cd'
];

self.addEventListener('install', event => {
    console.log("Se instaló el Service Worker");
    event.waitUntil(
        caches.open(cacheName).then(function (cache) {
            console.log("Caching app shell");
            return cache.addAll(fileToCache);
        }));
});

self.addEventListener('activate', event => {
    console.log("Se activó el SW");
});

self.addEventListener('fetch', event => {
    event.respondWith(async function () {
        const cache = await caches.open(cacheName);
        const cachedResponse = await cache.match(event.request);

        if (cachedResponse) {
            console.log('info encontrada en cache ' + event.request.url);
            return cachedResponse;
        }
        var fetchRequest = event.request.clone();
        return fetch(fetchRequest).then(
            function (response) {
                var responseToCache = response.clone();
                caches.open(cacheName).then(function (cache) {
                    cache.put(event.request, responseToCache);
                });
                console.log("info no encontrada: " + event.request.url);
                return response;
            }
        );
    }());
});