;
//asignar un nombre y versión al cache
const CACHE_NAME = 'v1_cache_jhardsystex',
    urlsToCache = [
        './',
        './vendor/bootstrap/css/bootstrap.min.css',
        './css/all.css',
        './css/owl.carousel.min.css',
        './css/jquery.fancybox.min.css',
        './css/style.css',
        './script.js',
        './popup.js',
        './load.js',
        './exa.js',
        './popu.css',
        './plugins/particles/css/style.css',
        './load.scss',
        'https://code.jquery.com/jquery-3.5.1.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/graingert-wow/1.2.2/wow.min.js',
        'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.min.css',
        './vendor/jquery/jquery.min.js',
        './vendor/bootstrap/js/bootstrap.bundle.min.js',
        './js/imagesloaded.pkgd.min.js',
        './js/isotope.pkgd.min.js',
        './js/filter.js',
        './js/jquery.appear.js',
        './js/owl.carousel.min.js',
        './js/jquery.fancybox.min.js',
        './js/script.js',
        './js/fade.js',
        ' https://code.jquery.com/jquery-3.5.1.min.js'

    ]

//durante la fase de instalación, generalmente se almacena en caché los activos estáticos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
        .then(cache => {
            return cache.addAll(urlsToCache)
                .then(() => self.skipWaiting())
        })
        .catch(err => console.log('Falló registro de cache', err))
    )
})

//una vez que se instala el SW, se activa y busca los recursos para hacer que funcione sin conexión
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME]

    e.waitUntil(
        caches.keys()
        .then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    //Eliminamos lo que ya no se necesita en cache
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName)
                    }
                })
            )
        })
        // Le indica al SW activar el cache actual
        .then(() => self.clients.claim())
    )
})

//cuando el navegador recupera una url
self.addEventListener('fetch', e => {
    //Responder ya sea con el objeto en caché o continuar y buscar la url real
    e.respondWith(
        caches.match(e.request)
        .then(res => {
            if (res) {
                //recuperar del cache
                return res
            }
            //recuperar de la petición a la url
            return fetch(e.request)
        })
    )
})