if(!self.define){let e,n={};const s=(s,t)=>(s=new URL(s+".js",t).href,n[s]||new Promise((n=>{if("document"in self){const e=document.createElement("script");e.src=s,e.onload=n,document.head.appendChild(e)}else e=s,importScripts(s),n()})).then((()=>{let e=n[s];if(!e)throw new Error(`Module ${s} didn’t register its module`);return e})));self.define=(t,o)=>{const i=e||("document"in self?document.currentScript.src:"")||location.href;if(n[i])return;let c={};const r=e=>s(e,i),a={module:{uri:i},exports:c,require:r};n[i]=Promise.all(t.map((e=>a[e]||r(e)))).then((e=>(o(...e),c)))}}define(["./workbox-27363133"],(function(e){"use strict";e.setCacheNameDetails({prefix:"atendimento-clientes"}),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/atendimentos_mrcnds/css/app.9c53aa2f.css",revision:null},{url:"/atendimentos_mrcnds/index.html",revision:"512870a9da838d5d2435751b1b6feabf"},{url:"/atendimentos_mrcnds/js/app.6c4a9252.js",revision:null},{url:"/atendimentos_mrcnds/js/chunk-vendors.ca016c47.js",revision:null},{url:"/atendimentos_mrcnds/manifest.json",revision:"e41734953c8a41810ed9eb86f0522053"},{url:"/atendimentos_mrcnds/robots.txt",revision:"b6216d61c03e6ce0c9aea6ca7808f7ca"}],{}),e.registerRoute(/^https:\/\/betinribeiro.github.io\/atendimentos_mrcnds\//,new e.NetworkFirst({cacheName:"my-cache",plugins:[new e.ExpirationPlugin({maxEntries:30,maxAgeSeconds:2592e3})]}),"GET"),e.registerRoute(/https:\/\/fonts.googleapis.com\//,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[]}),"GET"),e.registerRoute(/https:\/\/fonts.gstatic.com\//,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:30,maxAgeSeconds:31536e3})]}),"GET")}));
//# sourceMappingURL=service-worker.js.map
