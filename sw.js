const cacheStaticName = 'shell-static-content-v7';
const cacheDinamicName = 'shell-Dinamic-content-v7';
const fileToCache = [
    '/',
    'index.html',
    'js/app.js',
    'css/bootstrap.min.css',
    'js/bootstrap.bundle.min.js',
    'js/ecommerce.js',
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
        caches.open(cacheStaticName).then(function (cache) {
            console.log("Caching app shell");
            return cache.addAll(fileToCache);
        }));
});

self.addEventListener('activate', event => {
    console.log("Se activó el SW");
    event.waitUntil(
        caches.keys()
            .then(function (keyList) {
                return Promise.all(keyList.map(function (key) {
                    if (key !== cacheStaticName && key !== cacheDinamicName) {
                        console.log('Eliminando old cache.', key);
                        return caches.delete(key);
                    }
                }));
            })
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        // Intentando obtener el recurso de la red
        fetch(event.request)
            .then(function (res) {
                return caches.open(cacheDinamicName)
                    .then(function (cache) {
                        // si la solicitud es exitosa la actualizo de la cache
                        cache.put(event.request, res.clone());
                        return res;
                    })
            }).catch(function (err) {
            // si no responde la red respondo desde la cache
            return caches.match(event.request);
        })
    );
});