// Service Worker for PWA offline support
const CACHE_NAME = 'kidsenglish-v1';
const urlsToCache = [
    './',
    './index.html',
    './css/main.css',
    './css/animations.css',
    './css/games.css',
    './css/phonetics.css',
    './css/celebration.css',
    './css/effects.css',
    './css/mobile.css',
    './js/app.js',
    './js/audio.js',
    './js/data.js',
    './js/storage.js',
    './js/celebration.js',
    './js/imageLoader.js',
    './pages/alphabet.html',
    './pages/phonetics.html',
    './pages/words.html',
    './pages/grammar.html',
    './pages/games.html',
    './pages/progress.html',
    './pages/wordbook.html',
    './pages/letter-tracing.html'
];

// 安装事件：缓存资源
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

// 激活事件：清理旧缓存
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

// 拦截请求：优先使用缓存
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // 如果缓存中有，返回缓存
                if (response) {
                    return response;
                }

                // 否则从网络获取
                return fetch(event.request).then(response => {
                    // 检查是否有效响应
                    if (!response || response.status !== 200 || response.type !== 'basic') {
                        return response;
                    }

                    // 克隆响应并缓存
                    const responseToCache = response.clone();
                    caches.open(CACHE_NAME)
                        .then(cache => {
                            cache.put(event.request, responseToCache);
                        });

                    return response;
                });
            })
    );
});
