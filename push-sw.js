/* Takım Panosu — push only.
   No fetch handler and no caching on purpose: the board is a single HTML file
   served fresh from GitHub Pages, and a caching worker is exactly the stale
   build problem that got the old service worker retired on 12 Sep. This one
   exists so a notification can arrive while the app is closed. */

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = {}; }
  e.waitUntil((async () => {
    await self.registration.showNotification(d.title || "Takım Panosu", {
      body: d.body || "Sana yeni bir iş atandı.",
      icon: "icon-192.png",
      badge: "icon-192.png",
      tag: d.tag || "pano-yeni",
      renotify: true,
      data: { url: d.url || "./" }
    });
    try {
      if (typeof d.count === "number" && navigator.setAppBadge) {
        if (d.count > 0) await navigator.setAppBadge(d.count);
        else await navigator.clearAppBadge();
      }
    } catch (err) {}
  })());
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || "./";
  e.waitUntil((async () => {
    const all = await self.clients.matchAll({ type: "window", includeUncontrolled: true });
    for (const c of all) { if ("focus" in c) return c.focus(); }
    if (self.clients.openWindow) return self.clients.openWindow(url);
  })());
});
