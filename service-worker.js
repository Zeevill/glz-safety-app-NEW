const CACHE_NAME="glz-safety-no-dead-login-v1";
const APP_SHELL=["./","./index.html","./manifest.webmanifest","./icon.svg"];
self.addEventListener("install",e=>{e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(APP_SHELL)));self.skipWaiting()});
self.addEventListener("activate",e=>{e.waitUntil(caches.keys().then(keys=>Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))));self.clients.claim()});
self.addEventListener("fetch",e=>{
 const u=new URL(e.request.url);
 if(u.hostname.includes("firebase")||u.hostname.includes("gstatic")||u.hostname.includes("googleapis")){e.respondWith(fetch(e.request));return}
 if(e.request.mode==="navigate"||u.pathname.endsWith(".html")||u.pathname==="/"){e.respondWith(fetch(e.request).then(r=>{const copy=r.clone();caches.open(CACHE_NAME).then(c=>c.put("./index.html",copy));return r}).catch(()=>caches.match("./index.html")));return}
 e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request)));
});