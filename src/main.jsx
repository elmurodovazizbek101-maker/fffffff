import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Register Service Worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('✅ Service Worker registered successfully:', registration.scope);

        // Check for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          if (newWorker) {
            newWorker.addEventListener('statechange', () => {
              if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                // New content is available, show update notification
                if (confirm('Yangi versiya mavjud! Saytni yangilashni xohlaysizmi?')) {
                  window.location.reload();
                }
              }
            });
          }
        });
      })
      .catch((error) => {
        console.log('❌ Service Worker registration failed:', error);
      });
  });
}

// Add install prompt for PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  console.log('💡 PWA install prompt available');
  e.preventDefault();
  deferredPrompt = e;

  // Show custom install button after 3 seconds
  setTimeout(() => {
    showInstallPrompt();
  }, 3000);
});

function showInstallPrompt() {
  if (!deferredPrompt) return;

  const installBanner = document.createElement('div');
  installBanner.innerHTML = `
    <div style="
      position: fixed;
      bottom: 20px;
      left: 20px;
      right: 20px;
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 16px;
      border-radius: 12px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.2);
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: system-ui, -apple-system, sans-serif;
    ">
      <div>
        <div style="font-weight: 600; margin-bottom: 4px;">📱 Alisher Mobile ilovasini o'rnating</div>
        <div style="font-size: 14px; opacity: 0.9;">Tezroq kirish va offline ishlash uchun</div>
      </div>
      <div>
        <button id="install-btn" style="
          background: rgba(255,255,255,0.2);
          border: 1px solid rgba(255,255,255,0.3);
          color: white;
          padding: 8px 16px;
          border-radius: 8px;
          margin-right: 8px;
          cursor: pointer;
          font-weight: 500;
        ">O'rnatish</button>
        <button id="dismiss-btn" style="
          background: none;
          border: none;
          color: white;
          padding: 8px;
          cursor: pointer;
          opacity: 0.7;
        ">✕</button>
      </div>
    </div>
  `;

  document.body.appendChild(installBanner);

  // Install button click
  document.getElementById('install-btn').addEventListener('click', async () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      console.log(`PWA install outcome: ${outcome}`);
      deferredPrompt = null;
      document.body.removeChild(installBanner);
    }
  });

  // Dismiss button click
  document.getElementById('dismiss-btn').addEventListener('click', () => {
    document.body.removeChild(installBanner);
    deferredPrompt = null;
  });
}

// Handle app installed
window.addEventListener('appinstalled', () => {
  console.log('🎉 PWA installed successfully!');
  deferredPrompt = null;
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
