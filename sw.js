const CACHE='tomato-field-map-v5-20261021';
const ASSETS=['./','./index.html','./manifest.webmanifest','./icon.svg'];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(ASSETS)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(Promise.all([caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))),self.clients.claim()])));
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith((async()=>{const cache=await caches.open(CACHE);if(e.request.mode==='navigate'){try{const response=await fetch(e.request);if(response.ok)await cache.put(e.request,response.clone());return response}catch{return (await cache.match('./index.html'))||(await cache.match(e.request))||Response.error()}}const hit=await cache.match(e.request);if(hit)return hit;const response=await fetch(e.request);if(response.ok||response.type==='opaque')cache.put(e.request,response.clone()).catch(()=>{});return response})());
});
