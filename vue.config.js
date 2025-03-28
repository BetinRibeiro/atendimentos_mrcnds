module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/atendimentos_mrcnds/'
    : '/',

  // Configurações do PWA
  pwa: {
    name: 'Atendimento Clientes',
    themeColor: '#4DBA87',
    msTileColor: '#000000',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',

    // Configuração do Service Worker
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('^https://betinribeiro.github.io/atendimentos_mrcnds/'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'my-cache',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 30 * 24 * 60 * 60, // Cache por 30 dias
            },
          },
        },
        {
          urlPattern: new RegExp('https://fonts.googleapis.com/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-stylesheets',
          },
        },
        {
          urlPattern: new RegExp('https://fonts.gstatic.com/'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'google-fonts-webfonts',
            expiration: {
              maxEntries: 30,
              maxAgeSeconds: 60 * 60 * 24 * 365, // Cache por um ano
            },
          },
        },
      ],
    },
  },
};
