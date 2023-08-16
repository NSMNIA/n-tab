const CACHE_NAME = `ntab-1`;
const urlsToCache = ["index.html"];

// eslint-disable-next-line @typescript-eslint/no-this-alias
const self = this;

// Install a service worker
self.addEventListener("install", event => {
    event.waitUntil(
        caches
            .open(CACHE_NAME)
            .then(cache => {
                console.info(`[${new Date().toISOString()}] [Service Worker]`, "Opened cache");
                return cache.addAll(urlsToCache);
            })
            .catch(err => {
                console.error("Error opening cache", err);
            })
    );
});

// Listen for request
self.addEventListener("fetch", event => {
    let request = event.request;
    const CACHE_DATE = new Date().getDate().toString();
    if (request.url.indexOf("images.unsplash.com") > -1 || request.url.indexOf("api.unsplash.com") > -1) {
        event.respondWith(
            fetch(event.request)
                .then(response => {
                    return caches.open(CACHE_DATE).then(function (cache) {
                        cache.put(event.request.url, response.clone());
                        return response;
                    });
                })
                .catch(function () {})
        );
    }
    event.waitUntil(
        caches.keys().then(keyList =>
            Promise.all(
                keyList.map(key => {
                    if (key === CACHE_NAME) return;
                    if (CACHE_DATE !== key) {
                        return caches.delete(key);
                    }
                })
            )
        )
    );
});

// Activate service worker
self.addEventListener("activate", event => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);
    console.info(`[${new Date().toISOString()}] [Service Worker]`, "Activated");
    event.waitUntil(
        caches.keys().then(cacheNames =>
            Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhiteList.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            )
        )
    );
});
