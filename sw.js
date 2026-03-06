// Service Worker - Rutina App
const ALARMS = [
  {h:6,  m:0,  title:"🌅 ¡Buenos días!",          body:"Hora de despertar. Sin pantalla los primeros 10 min."},
  {h:6,  m:10, title:"💧 Agua + Skincare",          body:"Hidratación y rutina de mañana."},
  {h:6,  m:25, title:"🧘 Meditación",               body:"20 minutos. Comienza ahora."},
  {h:6,  m:43, title:"⏱ Meditación termina en 2min",body:"Prepárate para Inglés a las 6:50."},
  {h:6,  m:50, title:"🇬🇧 Inglés — Shadowing/Anki", body:"Sesión matutina de inglés."},
  {h:7,  m:8,  title:"⏱ Inglés termina en 2min",   body:"Prepárate para el desayuno."},
  {h:7,  m:10, title:"🍳 Desayuno consciente",       body:"Sin celular. Come despacio."},
  {h:7,  m:40, title:"🐾 Paseo con Bow",             body:"35 minutos. Sal ahora."},
  {h:8,  m:13, title:"⏱ Paseo termina en 2min",     body:"Prepárate para Dicción."},
  {h:8,  m:15, title:"🎤 Dicción y oratoria",        body:"30 minutos. Comienza ahora."},
  {h:8,  m:43, title:"⏱ Oratoria termina en 2min",  body:"Prepara el trabajo."},
  {h:13, m:0,  title:"🍽 Almuerzo",                  body:"45 minutos. Come conscientemente."},
  {h:13, m:43, title:"⏱ Almuerzo termina en 2min",  body:"Prepárate para el descanso."},
  {h:13, m:45, title:"☁️ 15 min sin hacer nada",     body:"Descanso real. Sin celular."},
  {h:14, m:0,  title:"🇬🇧 Inglés — Gramática",       body:"35 minutos de estudio."},
  {h:14, m:33, title:"⏱ Inglés termina en 2min",    body:"Prepárate para lectura."},
  {h:14, m:35, title:"📚 Lectura",                   body:"1 hora. Apaga notificaciones."},
  {h:15, m:33, title:"⏱ Lectura termina en 2min",   body:"Prepárate para el ejercicio."},
  {h:17, m:0,  title:"💪 Ejercicio",                 body:"1 hora. ¡Tú puedes!"},
  {h:17, m:58, title:"⏱ Ejercicio termina en 2min", body:"Prepárate para la ducha."},
  {h:18, m:0,  title:"🚿 Ducha + recuperación",      body:"Recuperación post-entreno."},
  {h:19, m:30, title:"🇬🇧 Inglés — Series/Podcast",  body:"45 minutos de inmersión."},
  {h:20, m:13, title:"⏱ Inglés nocturno en 2min",   body:"Prepara skincare de noche."},
  {h:20, m:15, title:"✨ Skincare de noche",          body:"Tu ritual nocturno."},
  {h:20, m:35, title:"🌙 Descompresión nocturna",    body:"Prepara el sueño profundo."},
  {h:22, m:0,  title:"😴 Hora de dormir",            body:"Apaga pantallas. Las 22-02h son el sueño más reparador."},
];

self.addEventListener('install', e => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil(self.clients.claim()));

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SCHEDULE') {
    scheduleAll();
  }
});

function scheduleAll() {
  const now = new Date();
  ALARMS.forEach(al => {
    const t = new Date(now.getFullYear(), now.getMonth(), now.getDate(), al.h, al.m, 0);
    const diff = t - now;
    if (diff > 0 && diff < 86400000) {
      setTimeout(() => {
        self.registration.showNotification(al.title, {
          body: al.body,
          icon: '/icon-192.png',
          badge: '/icon-192.png',
          vibrate: al.h === 6 && al.m === 0 ? [300,100,300,100,500] : [200,100,200],
          tag: al.h + ':' + al.m,
          requireInteraction: false
        });
      }, diff);
    }
  });
  console.log('[SW] Alarms scheduled for today');
}
