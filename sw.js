self.addEventListener("install",e => {
    e.waitUntil(
        caches.open("Takenotes").then(cache => {
            return cache.addAll(["./","./css/index.css","./js/index.js","./images/logo192.png","./images/logo.png"])
        })
    )
});

self.addEventListener("fetch", e=>{
    e.respondWith(
        caches.match(e.request).then(response=>{
            return response|| fetch(e.request);
        })
    );
})