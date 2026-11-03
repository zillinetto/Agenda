const CACHE = 'agenda-v2';
const ARQUIVOS = [
  './', 'index.html', 'contatos.html', 'css/style.css',
  'js/storage.js', 'js/cadastro.js', 'js/contatos.js', 'js/pwa.js',
  'manifest.json', 'icons/icon-192.png', 'icons/icon-512.png'
];

async function semRedirecionamento(resposta) {
  if (!resposta.redirected) return resposta;
  const corpo = await resposta.blob();
  return new Response(corpo, {
    status: resposta.status,
    statusText: resposta.statusText,
    headers: resposta.headers
  });
}

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE).then(async (cache) => {
      for (const arquivo of ARQUIVOS) {
const resposta = await fetch(arquivo);
        if (!resposta.ok) throw new Error('Falha ao baixar ' + arquivo);
        await cache.put(arquivo, await semRedirecionamento(resposta));
      }
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((chaves) =>
      Promise.all(chaves.filter((c) => c !== CACHE).map((c) => caches.delete(c)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
caches.match(event.request).then((emCache) =>
      emCache || fetch(event.request).then(semRedirecionamento)
    )
  );
});
