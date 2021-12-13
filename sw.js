self.addEventListener('install', (e) => {
    e.waitUntil(
        caches.open('big_water_melon').then((cache) => cache.addAll([
            '/big_water_melon/icon.png',
            '/big_water_melon/manifest.json',
            '/big_water_melon/index.html',
        ])),
    );
});

self.addEventListener('fetch', function (event) {
    event.respondWith(
        caches.match(event.request).then(function (result) {
            const request = event.request;
            const url = request.url;
            if (url.indexOf('wx.qq.com') !== -1 || url.indexOf('cdn.jsdelivr.net') !== -1) {
                return result || fetch(request).then(response => {
                    return caches.open('big_water_melon').then(cache => {
                        cache.put(request, response.clone());
                        return response;
                    });
                });
            } else {
                return fetch(request).then(response => {
                    return caches.open('big_water_melon').then(cache => {
                        cache.put(request, response.clone());
                        return response;
                    });
                }).catch(
                    () => {
                        return result
                    }
                );
            }
        }));
});