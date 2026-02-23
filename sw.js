// Service Worker for QUARTRIX PWA
const CACHE_NAME = 'quartrix-v2';
const BASE_URL = 'https://quartrix.xyz';

const urlsToCache = [
  BASE_URL + '/',
  BASE_URL + '/index.html',
  BASE_URL + '/splash.html',
  BASE_URL + '/login.html',
  BASE_URL + '/dashboard.html',
  BASE_URL + '/profile.html',
  BASE_URL + '/jadwal.html',
  BASE_URL + '/foto.html',
  BASE_URL + '/siswa.html',
  BASE_URL + '/struktur.html',
  BASE_URL + '/style.css',
  BASE_URL + '/login.js',
  BASE_URL + '/dashboard.js',
  BASE_URL + '/profile.js',
  'https://i.ibb.co.com/7xxVWwH7/IMG-8428.png'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cache if found, otherwise fetch from network
        if (response) {
          return response;
        }
        return fetch(event.request);
      })
  );
});

// Activate event
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
