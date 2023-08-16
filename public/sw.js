const CACHE_NAME = `ntab-1`;
const images = localStorage.getItem("images") ? JSON.parse(localStorage.getItem("images")) : [];
const urlsToCache = ["index.html", ...images.map(image => image.url)];

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
    event.respondWith(
        caches.match(event.request).then(() => {
            return fetch(event.request).catch(() => caches.match("index.html"));
        })
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
