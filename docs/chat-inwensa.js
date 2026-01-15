<!-- ============================================
     WINDCHAT WIDGET - COMPLETE CODE FOR WIX
     Skopiuj całość do Custom Code Element na Wix
     ============================================ -->

<div id="windchat-root" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; position: fixed; bottom: 0; right: 0; z-index: 9999;">
  
  <!-- FLOATING ACTION BUTTONS -->
  <div class="floating-actions">
    <button class="floating-action-btn" id="windchat-btn-chat" data-action="chat" aria-label="Czat z doradcą turbin wiatrowych">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span class="floating-action-label">Czat</span>
    </button>

    <button class="floating-action-btn" id="windchat-btn-spec" data-action="spec" aria-label="Pobierz specyfikację turbiny wiatrowej">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="12" y1="11" x2="12" y2="17"></line>
        <line x1="9" y1="14" x2="15" y2="14"></line>
      </svg>
      <span class="floating-action-label">Specyfikacja</span>
    </button>

    <button class="floating-action-btn" id="windchat-btn-offer" data-action="offer" aria-label="Pobierz spersonalizowaną ofertę">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
        <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
      </svg>
      <span class="floating-action-label">Oferta</span>
    </button>
  </div>

  <!-- MAIN WIDGET PANEL -->
  <div id="windchat-panel" class="windchat-hidden">
    
    <!-- HEADER -->
    <div id="windchat-header">
      <div>
        <div class="windchat-header-brand">Doradca Turbin Wiatrowych</div>
        <div class="windchat-header-subtitle">INWENSA</div>
      </div>
      <button id="windchat-close" aria-label="Zamknij czat">✕</button>
    </div>

    <!-- TABS -->
    <div id="windchat-tabs">
      <button class="windchat-tab windchat-tab-active" data-tab="chat">Czat</button>
      <button class="windchat-tab" data-tab="spec">Spec</button>
      <button class="windchat-tab" data-tab="offer">Oferta</button>
    </div>

    <!-- TAB 1: CHAT -->
    <div id="windchat-chat-content" class="windchat-tab-content windchat-tab-active">
      <div id="windchat-messages"></div>
      <div id="windchat-composer">
        <textarea id="windchat-input" rows="1" placeholder="Napisz wiadomość…"></textarea>
        <button id="windchat-send">Wyślij</button>
      </div>
    </div>

    <!-- TAB 2: SPECIFICATION -->
    <div id="windchat-spec-content" class="windchat-tab-content">
      <div class="windchat-form-head">
        <div class="windchat-form-title">Pobierz Specyfikację Techniczną</div>
        <div class="windchat-form-help">Otrzymaj szczegółowe specyfikacje techniczne dla Twojego projektu turbiny wiatrowej</div>
      </div>
      <div class="windchat-lead-grid">
        <input id="windchat-spec-name" placeholder="Twoje Imię" />
        <input id="windchat-spec-phone" placeholder="Telefon (wymagane)" required />
        <input id="windchat-spec-email" placeholder="Email (wymagane)" required />
      </div>
      <label class="windchat-consent">
        <input id="windchat-spec-consent" type="checkbox" required />
        <span>Wyrażam zgodę na otrzymanie specyfikacji na moją skrzynkę email i akceptuję <a href="https://inwensa.pl/privacy" class="windchat-link" target="_blank" rel="noopener noreferrer">politykę prywatności</a></span>
      </label>
      <button id="windchat-spec-submit" type="button" class="windchat-form-submit">Pobierz Specyfikację</button>
    </div>

    <!-- TAB 3: OFFER -->
    <div id="windchat-offer-content" class="windchat-tab-content">
      <div class="windchat-form-head">
        <div class="windchat-form-title">Poproś o Spersonalizowaną Ofertę</div>
        <div class="windchat-form-help">Opowiedz nam o swoim projekcie, otrzymaj spersonalizowaną ofertę</div>
      </div>
      <div class="windchat-lead-grid">
        <input id="windchat-offer-name" placeholder="Twoje Imię" />
        <input id="windchat-offer-phone" placeholder="Telefon (wymagane)" required />
        <input id="windchat-offer-email" placeholder="Email (wymagane)" required />
      </div>
      <label class="windchat-consent">
        <input id="windchat-offer-consent" type="checkbox" required />
        <span>Wyrażam zgodę na kontakt w sprawie mojej oferty i akceptuję <a href="https://inwensa.pl/privacy" class="windchat-link" target="_blank" rel="noopener noreferrer">politykę prywatności</a></span>
      </label>
      <button id="windchat-offer-submit" type="button" class="windchat-form-submit">Poproś o Ofertę</button>
    </div>

  </div>

</div>

<!-- ============================================ 
     STYLES - GLASSMORPHISM DESIGN
     ============================================ -->
<style>
#windchat-root {
  --primary-color: #B6FF2E;
  --bg-dark: rgba(10, 10, 15, 0.95);
  --border-light: rgba(255, 255, 255, 0.1);
  --text-light: #FFFFFF;
  --text-secondary: #B0B0B0;
}

/* FLOATING ACTION BUTTONS */
.floating-actions {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
}

.floating-action-btn {
  all: unset;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
  width: 52px;
  height: 52px;
  border-radius: 999px;
  background: rgba(10, 14, 20, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: #EAF7E6;
  cursor: pointer;
  font-size: 22px;
  transition: all 160ms ease;
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  font-weight: 500;
}

.floating-action-btn:hover {
  background: rgba(10, 14, 20, 0.72);
  border-color: rgba(182, 255, 46, 0.65);
  box-shadow: 0 0 0 2px rgba(182, 255, 46, 0.35), 0 0 22px rgba(182, 255, 46, 0.28);
  color: #B6FF2E;
  transform: translateX(-4px) scale(1.03);
}

.floating-action-btn:active {
  transform: translateX(-4px) scale(0.98);
}

.floating-action-btn:focus-visible {
  outline: none;
  border-color: rgba(182, 255, 46, 0.65);
  box-shadow: 0 0 0 2px rgba(182, 255, 46, 0.35), 0 0 22px rgba(182, 255, 46, 0.28);
}

.floating-action-btn.is-active {
  background: rgba(10, 14, 20, 0.72);
  border-color: rgba(182, 255, 46, 0.65);
  color: #B6FF2E;
  box-shadow: 0 0 0 2px rgba(182, 255, 46, 0.35), 0 0 22px rgba(182, 255, 46, 0.28);
}

.floating-action-label {
  position: absolute;
  right: 100%;
  top: 50%;
  transform: translateY(-50%) translateX(6px);
  display: none;
  margin-right: 12px;
  padding: 10px 12px;
  background: rgba(10, 14, 20, 0.70);
  border: 1px solid rgba(255, 255, 255, 0.12);
  border-radius: 12px;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  font-size: 12px;
  font-weight: 600;
  white-space: nowrap;
  color: #FFFFFF;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease, transform 200ms ease;
}

@media (prefers-reduced-motion: reduce) {
  .floating-action-btn {
    transition: none;
  }
  .floating-action-label {
    transition: none;
  }
}

@media (min-width: 641px) {
  .floating-action-btn:hover .floating-action-label {
    display: block;
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
  
  .floating-action-btn:focus-visible .floating-action-label {
    display: block;
    opacity: 1;
    transform: translateY(-50%) translateX(0);
  }
}

@media (max-width: 640px) {
  .floating-action-btn {
    width: 48px;
    height: 48px;
    font-size: 18px;
  }
  
  .floating-actions {
    bottom: 16px;
    right: 16px;
    gap: 10px;
  }
  
  .floating-action-label {
    display: none !important;
  }
}

/* PANEL */
#windchat-panel {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 400px;
  max-height: 600px;
  background: rgba(10, 14, 20, 0.72);
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 18px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(182, 255, 46, 0.10) inset, 0 0 24px rgba(182, 255, 46, 0.16);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 9999;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

#windchat-panel.windchat-hidden {
  opacity: 0;
  pointer-events: none;
  transform: scale(0.9) translateY(20px);
}

#windchat-panel.open {
  opacity: 1;
  pointer-events: all;
  transform: scale(1) translateY(0);
}

@media (max-width: 768px) {
  #windchat-panel {
    width: calc(100vw - 40px);
    max-height: calc(100vh - 140px);
    bottom: 90px;
    right: 20px;
  }
}

@media (max-width: 480px) {
  #windchat-panel {
    width: calc(100vw - 32px);
    max-height: calc(100vh - 110px);
    bottom: 80px;
    right: 16px;
    border-radius: 12px;
  }
}

/* HEADER */
#windchat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: rgba(14, 18, 26, 0.70);
  border-bottom: 1px solid rgba(255, 255, 255, 0.10);
}

.windchat-header-brand {
  font-size: 16px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.90);
  letter-spacing: 0.3px;
}

.windchat-header-subtitle {
  font-size: 11px;
  color: rgba(255, 255, 255, 0.65);
  text-transform: uppercase;
  font-weight: 700;
  letter-spacing: 1px;
  margin-top: 2px;
}

#windchat-close {
  all: unset;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.12);
  color: rgba(255, 255, 255, 0.70);
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 150ms ease;
}

#windchat-close:hover {
  border-color: rgba(182, 255, 46, 0.50);
  color: rgba(255, 255, 255, 0.90);
  box-shadow: 0 0 12px rgba(182, 255, 46, 0.20);
}

/* TABS */
#windchat-tabs {
  display: flex;
  background: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid var(--border-light);
  gap: 0;
}

.windchat-tab {
  all: unset;
  flex: 1;
  padding: 12px;
  text-align: center;
  color: var(--text-secondary);
  font-size: 13px;
  font-weight: 600;
  cursor: pointer;
  background: transparent;
  border-bottom: 2px solid transparent;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.windchat-tab:hover {
  color: var(--text-light);
  background: rgba(255, 255, 255, 0.02);
}

.windchat-tab.windchat-tab-active {
  color: var(--primary-color);
  border-bottom-color: var(--primary-color);
  background: rgba(182, 255, 46, 0.05);
}

/* TAB CONTENT */
.windchat-tab-content {
  display: none;
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.windchat-tab-content.windchat-tab-active {
  display: flex;
  flex-direction: column;
}

#windchat-chat-content {
  flex-direction: column;
  gap: 12px;
}

/* MESSAGES */
#windchat-messages {
  flex: 1;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
  padding-right: 4px;
}

#windchat-messages::-webkit-scrollbar {
  width: 6px;
}

#windchat-messages::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.02);
  border-radius: 3px;
}

#windchat-messages::-webkit-scrollbar-thumb {
  background: rgba(182, 255, 46, 0.2);
  border-radius: 3px;
}

#windchat-messages::-webkit-scrollbar-thumb:hover {
  background: rgba(182, 255, 46, 0.3);
}

.windchat-msg {
  display: flex;
  animation: slideIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.windchat-msg.windchat-user {
  justify-content: flex-end;
}

.windchat-bubble {
  max-width: 85%;
  padding: 12px 16px;
  border-radius: 12px;
  font-size: 13px;
  line-height: 1.5;
  word-wrap: break-word;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.windchat-user .windchat-bubble {
  background: linear-gradient(135deg, rgba(182, 255, 46, 0.2), rgba(182, 255, 46, 0.1));
  border: 1px solid rgba(182, 255, 46, 0.2);
  color: var(--text-light);
  text-align: right;
}

.windchat-assistant .windchat-bubble {
  background: rgba(50, 50, 65, 0.5);
  border: 1px solid rgba(182, 255, 46, 0.1);
  color: var(--text-light);
}

.windchat-typing {
  background: rgba(50, 50, 65, 0.5) !important;
  min-height: 44px;
}

.windchat-dots {
  display: inline-flex;
  gap: 4px;
}

.windchat-dots span {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--primary-color);
  animation: bounce 1.2s infinite;
}

.windchat-dots span:nth-child(2) {
  animation-delay: 0.2s;
}

.windchat-dots span:nth-child(3) {
  animation-delay: 0.4s;
}

@keyframes bounce {
  0%, 80%, 100% {
    opacity: 0.3;
    transform: translateY(0);
  }
  40% {
    opacity: 1;
    transform: translateY(-8px);
  }
}

/* COMPOSER */
#windchat-composer {
  display: flex;
  gap: 8px;
  padding-top: 12px;
  border-top: 1px solid var(--border-light);
}

#windchat-input {
  all: unset;
  flex: 1;
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  color: var(--text-light);
  font-size: 13px;
  font-family: inherit;
  resize: none;
  max-height: 80px;
  transition: all 0.2s ease;
}

#windchat-input::placeholder {
  color: var(--text-secondary);
}

#windchat-input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(182, 255, 46, 0.3);
  box-shadow: 0 0 12px rgba(182, 255, 46, 0.1);
}

#windchat-send {
  all: unset;
  padding: 10px 16px;
  background: linear-gradient(180deg, rgba(182, 255, 46, 0.25), rgba(182, 255, 46, 0.10));
  border: 1px solid rgba(182, 255, 46, 0.45);
  border-radius: 12px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 150ms ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

#windchat-send:hover:not(:disabled) {
  background: linear-gradient(180deg, rgba(182, 255, 46, 0.30), rgba(182, 255, 46, 0.15));
  border-color: rgba(182, 255, 46, 0.65);
  box-shadow: 0 0 20px rgba(182, 255, 46, 0.20);
  transform: translateY(-1px);
}

#windchat-send:active:not(:disabled) {
  transform: scale(0.98);
}

#windchat-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* FORMS */
.windchat-form-head {
  margin-bottom: 16px;
  padding-bottom: 12px;
  border-bottom: 1px solid var(--border-light);
}

.windchat-form-title {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-light);
  margin-bottom: 4px;
}

.windchat-form-help {
  font-size: 12px;
  color: var(--text-secondary);
  line-height: 1.4;
}

.windchat-lead-grid {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 12px;
}

.windchat-lead-grid input {
  all: unset;
  padding: 12px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.10);
  border-radius: 14px;
  color: rgba(255, 255, 255, 0.90);
  font-size: 13px;
  font-family: inherit;
  transition: all 150ms ease;
}

.windchat-lead-grid input::placeholder {
  color: rgba(255, 255, 255, 0.45);
}

.windchat-lead-grid input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(182, 255, 46, 0.55);
  box-shadow: 0 0 0 3px rgba(182, 255, 46, 0.18);
}

.windchat-consent {
  all: unset;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 12px;
  transition: color 0.2s ease;
}

.windchat-consent:hover {
  color: var(--text-light);
}

.windchat-consent input[type="checkbox"] {
  all: unset;
  width: 16px;
  height: 16px;
  border: 1.5px solid rgba(182, 255, 46, 0.3);
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.02);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  flex-shrink: 0;
}

.windchat-consent input[type="checkbox"]:hover {
  border-color: rgba(182, 255, 46, 0.5);
  background: rgba(182, 255, 46, 0.1);
}

.windchat-consent input[type="checkbox"]:checked {
  background: linear-gradient(135deg, rgba(182, 255, 46, 0.3), rgba(182, 255, 46, 0.2));
  border-color: var(--primary-color);
}

.windchat-consent input[type="checkbox"]:checked::after {
  content: '✓';
  color: var(--primary-color);
  font-weight: bold;
  font-size: 12px;
}

.windchat-link {
  color: var(--primary-color);
  text-decoration: underline;
}

.windchat-link:hover {
  opacity: 0.8;
}

.windchat-form-submit {
  all: unset;
  padding: 12px 18px;
  background: linear-gradient(180deg, rgba(182, 255, 46, 0.25), rgba(182, 255, 46, 0.10));
  border: 1px solid rgba(182, 255, 46, 0.45);
  border-radius: 16px;
  color: rgba(255, 255, 255, 0.92);
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 150ms ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 100%;
  text-align: center;
}

.windchat-form-submit:hover:not(:disabled) {
  background: linear-gradient(180deg, rgba(182, 255, 46, 0.30), rgba(182, 255, 46, 0.15));
  border-color: rgba(182, 255, 46, 0.65);
  box-shadow: 0 0 28px rgba(182, 255, 46, 0.22);
  transform: translateY(-1px);
}

.windchat-form-submit:active:not(:disabled) {
  transform: scale(0.98);
}

.windchat-form-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>

<!-- ============================================ 
     JAVASCRIPT - WIDGET LOGIC
     ============================================ -->
<script>
(function() {
  // Configuration
  var apiBaseUrl = 'https://asia-travelers-priorities-blogs.trycloudflare.com';
  var minResponseDelayMs = 5000;
  
  var opened = false;
  var engaged = false;
  var hasWelcomed = false;
  var currentTab = 'chat';

  // Get Session ID
  var sessionId = window.localStorage.getItem('windchat_sessionId');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).slice(2) + '_' + Date.now();
    window.localStorage.setItem('windchat_sessionId', sessionId);
  }

  // Helper Functions
  function isEmail(s) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s || '').trim());
  }

  function isPhoneLikely(s) {
    var v = String(s || '').replace(/\s+/g, '').replace(/[-()]/g, '');
    return v.length >= 7;
  }

  function postJson(url, payload) {
    return fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    }).then(function (r) {
      return r.json().then(function (j) {
        if (!r.ok) {
          var msg = (j && (j.error || j.message)) || ('HTTP ' + r.status);
          throw new Error(msg);
        }
        return j;
      });
    });
  }

  // DOM Elements
  var btnChat = document.getElementById('windchat-btn-chat');
  var btnSpec = document.getElementById('windchat-btn-spec');
  var btnOffer = document.getElementById('windchat-btn-offer');
  var panel = document.getElementById('windchat-panel');
  var close = document.getElementById('windchat-close');
  var messages = document.getElementById('windchat-messages');
  var input = document.getElementById('windchat-input');
  var send = document.getElementById('windchat-send');

  // Tab Switching
  function switchTab(tabName) {
    currentTab = tabName;
    
    document.querySelectorAll('.windchat-tab').forEach(function (t) {
      t.classList.remove('windchat-tab-active');
      if (t.getAttribute('data-tab') === tabName) {
        t.classList.add('windchat-tab-active');
      }
    });

    var chatContent = document.getElementById('windchat-chat-content');
    var specContent = document.getElementById('windchat-spec-content');
    var offerContent = document.getElementById('windchat-offer-content');

    [chatContent, specContent, offerContent].forEach(function (el) {
      el.classList.remove('windchat-tab-active');
    });

    if (tabName === 'chat') chatContent.classList.add('windchat-tab-active');
    else if (tabName === 'spec') specContent.classList.add('windchat-tab-active');
    else if (tabName === 'offer') offerContent.classList.add('windchat-tab-active');

    document.querySelectorAll('.floating-action-btn').forEach(function (btn) {
      btn.classList.remove('is-active');
      if (btn.getAttribute('data-action') === tabName) {
        btn.classList.add('is-active');
      }
    });
  }

  function openPanel() {
    opened = true;
    panel.classList.remove('windchat-hidden');
    panel.classList.add('open');
    
    if (!engaged) {
      engaged = true;
      if (!hasWelcomed) {
        addMsg('assistant', 'Dzień dobry! Jak mogę pomóc w temacie turbin wiatrowych?');
        hasWelcomed = true;
      }
    }
  }

  function closePanel() {
    opened = false;
    panel.classList.remove('open');
    panel.classList.add('windchat-hidden');
  }

  // Button Listeners
  btnChat.addEventListener('click', function () {
    switchTab('chat');
    openPanel();
  });

  btnSpec.addEventListener('click', function () {
    switchTab('spec');
    openPanel();
  });

  btnOffer.addEventListener('click', function () {
    switchTab('offer');
    openPanel();
  });

  document.querySelectorAll('.windchat-tab').forEach(function (tabBtn) {
    tabBtn.addEventListener('click', function () {
      switchTab(this.getAttribute('data-tab'));
    });
  });

  close.addEventListener('click', closePanel);

  // Messages
  function addMsg(role, text, meta) {
    var row = document.createElement('div');
    row.className = 'windchat-msg windchat-' + role;
    
    var bubble = document.createElement('div');
    bubble.className = 'windchat-bubble';
    
    if (meta && meta.typing) {
      bubble.classList.add('windchat-typing');
      bubble.innerHTML = '<span class="windchat-dots"><span></span><span></span><span></span></span>';
    } else {
      bubble.textContent = text;
    }
    
    row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
    return { row: row, bubble: bubble };
  }

  function sendMessage(text) {
    if (!text) return;
    engaged = true;
    addMsg('user', text);

    var typing = addMsg('assistant', '', { typing: true });
    var sentAt = Date.now();

    send.disabled = true;
    postJson(apiBaseUrl + '/api/chat', {
      sessionId: sessionId,
      message: text,
      pageUrl: window.location.href
    })
      .then(function (r) {
        var elapsed = Date.now() - sentAt;
        var waitMs = Math.max(0, minResponseDelayMs - elapsed);
        window.setTimeout(function () {
          if (typing && typing.bubble) {
            typing.bubble.classList.remove('windchat-typing');
            typing.bubble.textContent = r.message;
          } else {
            addMsg('assistant', r.message);
          }
          send.disabled = false;
        }, waitMs);
      })
      .catch(function (err) {
        var elapsed = Date.now() - sentAt;
        var waitMs = Math.max(0, minResponseDelayMs - elapsed);
        window.setTimeout(function () {
          if (typing && typing.bubble) {
            typing.bubble.classList.remove('windchat-typing');
            typing.bubble.textContent = 'Błąd: ' + err.message;
          } else {
            addMsg('assistant', 'Błąd: ' + err.message);
          }
          send.disabled = false;
        }, waitMs);
      });
  }

  send.addEventListener('click', function () {
    var text = input.value.trim();
    input.value = '';
    sendMessage(text);
  });

  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      var text = input.value.trim();
      input.value = '';
      sendMessage(text);
    }
  });

  // SPEC FORM
  var specSubmit = document.getElementById('windchat-spec-submit');
  if (specSubmit) {
    specSubmit.addEventListener('click', function () {
      var name = document.getElementById('windchat-spec-name').value.trim();
      var phone = document.getElementById('windchat-spec-phone').value.trim();
      var email = document.getElementById('windchat-spec-email').value.trim();
      var consent = document.getElementById('windchat-spec-consent').checked;

      if (!email) {
        addMsg('assistant', 'Email jest wymagany do wysłania specyfikacji.');
        switchTab('chat');
        return;
      }
      if (!isEmail(email)) {
        addMsg('assistant', 'Format emaila wygląda na niepoprawny.');
        switchTab('chat');
        return;
      }
      if (!consent) {
        addMsg('assistant', 'Musisz wyrazić zgodę na politykę prywatności aby kontynuować.');
        switchTab('chat');
        return;
      }

      specSubmit.disabled = true;
      specSubmit.textContent = 'Wysyłam…';

      postJson(apiBaseUrl + '/api/send-spec', {
        email: email,
        name: name || undefined,
        phone: phone || undefined,
        sessionId: sessionId
      })
        .then(function () {
          addMsg('assistant', 'Gotowe! Specyfikacja techniczna powinna dotrzeć na Twój email (sprawdź też folder SPAM).');
          switchTab('chat');
          document.getElementById('windchat-spec-name').value = '';
          document.getElementById('windchat-spec-phone').value = '';
          document.getElementById('windchat-spec-email').value = '';
          document.getElementById('windchat-spec-consent').checked = false;
        })
        .catch(function (err) {
          addMsg('assistant', 'Nie udało się wysłać: ' + err.message);
          switchTab('chat');
        })
        .finally(function () {
          specSubmit.disabled = false;
          specSubmit.textContent = 'Pobierz Specyfikację';
        });
    });
  }

  // OFFER FORM
  var offerSubmit = document.getElementById('windchat-offer-submit');
  if (offerSubmit) {
    offerSubmit.addEventListener('click', function () {
      var name = document.getElementById('windchat-offer-name').value.trim();
      var phone = document.getElementById('windchat-offer-phone').value.trim();
      var email = document.getElementById('windchat-offer-email').value.trim();
      var consent = document.getElementById('windchat-offer-consent').checked;

      if (!consent) {
        addMsg('assistant', 'Musisz wyrazić zgodę na kontakt aby kontynuować żądanie oferty.');
        switchTab('chat');
        return;
      }

      if (!phone || !email) {
        addMsg('assistant', 'Podaj telefon i email – oba są wymagane.');
        switchTab('chat');
        return;
      }

      if (!isEmail(email)) {
        addMsg('assistant', 'Format emaila wygląda na niepoprawny.');
        switchTab('chat');
        return;
      }

      if (!isPhoneLikely(phone)) {
        addMsg('assistant', 'Podaj proszę pełny numer telefonu.');
        switchTab('chat');
        return;
      }

      offerSubmit.disabled = true;
      offerSubmit.textContent = 'Wysyłam…';

      postJson(apiBaseUrl + '/api/leads', {
        sessionId: sessionId,
        name: name || undefined,
        phone: phone,
        email: email,
        wantsAdvisorContact: true,
        pageUrl: window.location.href
      })
        .then(function () {
          addMsg('assistant', 'Dziękuję! Doradca skontaktuje się z Tobą wkrótce.');
          switchTab('chat');
          document.getElementById('windchat-offer-name').value = '';
          document.getElementById('windchat-offer-phone').value = '';
          document.getElementById('windchat-offer-email').value = '';
          document.getElementById('windchat-offer-consent').checked = false;
        })
        .catch(function (err) {
          addMsg('assistant', 'Nie udało się wysłać: ' + err.message);
          switchTab('chat');
        })
        .finally(function () {
          offerSubmit.disabled = false;
          offerSubmit.textContent = 'Poproś o Ofertę';
        });
    });
  }
})();
</script>
