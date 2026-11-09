/* PWA를 뺐다(3.1.18). 이 파일은 2026-11-06 ~ 3.1.18 사이에 이 사이트를 열어 이미 설치된 서비스 워커를 지우기 위해서만 남긴다.
   브라우저가 옛 워커를 갱신하려고 이 파일을 받으면 새 워커로 바로 넘어가, 이 사이트의 PWA 캐시(velvitty-pwa:efx:)만 지우고
   등록을 스스로 해제한다. fetch 처리기가 없어 어떤 요청도 가로채거나 내려받지 않는다. 다른 앱의 캐시 · 저장소는 건드리지 않는다. */
'use strict';
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name.startsWith('velvitty-pwa:efx:')).map(name => caches.delete(name)));
    await self.registration.unregister();
  })());
});
