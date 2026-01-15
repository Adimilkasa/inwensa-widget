/**
 * INWENSA Wind Turbine Advisor Widget
 * Self-contained chat widget for Wix integration
 * Load this file from GitHub Pages on Wix
 * 
 * Usage: Add to Wix Custom Code (Head):
 * <script src="https://adimilkasa.github.io/inwensa-widget/chat-inwensa.js"></script>
 */

(function() {
  // ============================================
  // CONFIGURATION
  // ============================================
  var apiBaseUrl = 'https://asia-travelers-priorities-blogs.trycloudflare.com';
  var minResponseDelayMs = 5000;
  var brandName = 'Doradca Turbin Wiatrowych';
  var brandSubtitle = 'INWENSA';
  var privacyUrl = 'https://inwensa.pl/privacy';

  // ============================================
  // STATE VARIABLES
  // ============================================
  var opened = false;
  var engaged = false;
  var hasWelcomed = false;
  var currentTab = 'chat';

  // Get or create session ID
  var sessionId = window.localStorage.getItem('windchat_sessionId');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).slice(2) + '_' + Date.now();
    window.localStorage.setItem('windchat_sessionId', sessionId);
  }

  // ============================================
  // HELPER FUNCTIONS
  // ============================================
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

  // ============================================
  // DOM CREATION FUNCTIONS
  // ============================================

  function createSVG(pathD) {
    var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('width', '24');
    svg.setAttribute('height', '24');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '2');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');
    
    var path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', pathD);
    svg.appendChild(path);
    return svg;
  }

  function injectStyles() {
    var style = document.createElement('style');
    style.textContent = `
#windchat-root {
  --primary-color: #B6FF2E;
  --bg-dark: rgba(10, 10, 15, 0.95);
  --border-light: rgba(255, 255, 255, 0.1);
  --text-light: #FFFFFF;
  --text-secondary: #B0B0B0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
}

.floating-actions {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9998;
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
}

.floating-action-btn {
  all: unset;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 0;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(182, 255, 46, 0.15), rgba(182, 255, 46, 0.05));
  border: 1.5px solid rgba(182, 255, 46, 0.3);
  color: var(--primary-color);
  cursor: pointer;
  font-size: 22px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  font-weight: 500;
}

.floating-action-btn:hover {
  background: linear-gradient(135deg, rgba(182, 255, 46, 0.25), rgba(182, 255, 46, 0.1));
  border-color: rgba(182, 255, 46, 0.5);
  box-shadow: 0 12px 48px rgba(182, 255, 46, 0.2);
  transform: translateY(-4px);
}

.floating-action-btn:active {
  transform: translateY(-2px);
}

.floating-action-btn.is-active {
  background: linear-gradient(135deg, rgba(182, 255, 46, 0.25), rgba(182, 255, 46, 0.15));
  border-color: var(--primary-color);
  color: var(--primary-color);
  box-shadow: 0 12px 48px rgba(182, 255, 46, 0.25);
}

.floating-action-label {
  display: none;
  font-size: 12px;
  white-space: nowrap;
  font-weight: 500;
  color: var(--text-light);
}

@media (min-width: 768px) {
  .floating-action-btn:hover .floating-action-label {
    display: inline;
  }
}

@media (max-width: 480px) {
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
}

#windchat-panel {
  position: fixed;
  bottom: 90px;
  right: 20px;
  width: 400px;
  max-height: 600px;
  background: var(--bg-dark);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
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

#windchat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: linear-gradient(135deg, rgba(182, 255, 46, 0.05), rgba(76, 175, 80, 0.05));
  border-bottom: 1px solid var(--border-light);
}

.windchat-header-brand {
  font-size: 16px;
  font-weight: 600;
  color: var(--text-light);
  letter-spacing: 0.3px;
}

.windchat-header-subtitle {
  font-size: 11px;
  color: var(--primary-color);
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
  background: rgba(255, 255, 255, 0.05);
  color: var(--text-secondary);
  cursor: pointer;
  font-size: 18px;
  font-weight: bold;
  transition: all 0.2s ease;
}

#windchat-close:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--text-light);
}

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
  background: linear-gradient(135deg, rgba(182, 255, 46, 0.15), rgba(182, 255, 46, 0.05));
  border: 1px solid rgba(182, 255, 46, 0.3);
  border-radius: 8px;
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

#windchat-send:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(182, 255, 46, 0.25), rgba(182, 255, 46, 0.1));
  border-color: var(--primary-color);
  box-shadow: 0 4px 16px rgba(182, 255, 46, 0.2);
}

#windchat-send:active:not(:disabled) {
  transform: scale(0.98);
}

#windchat-send:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

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
  padding: 10px 12px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--border-light);
  border-radius: 8px;
  color: var(--text-light);
  font-size: 13px;
  font-family: inherit;
  transition: all 0.2s ease;
}

.windchat-lead-grid input::placeholder {
  color: var(--text-secondary);
}

.windchat-lead-grid input:focus {
  outline: none;
  background: rgba(255, 255, 255, 0.08);
  border-color: rgba(182, 255, 46, 0.3);
  box-shadow: 0 0 12px rgba(182, 255, 46, 0.1);
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
  padding: 10px 16px;
  background: linear-gradient(135deg, rgba(182, 255, 46, 0.2), rgba(182, 255, 46, 0.1));
  border: 1px solid rgba(182, 255, 46, 0.3);
  border-radius: 8px;
  color: var(--primary-color);
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  width: 100%;
  text-align: center;
}

.windchat-form-submit:hover:not(:disabled) {
  background: linear-gradient(135deg, rgba(182, 255, 46, 0.3), rgba(182, 255, 46, 0.15));
  border-color: var(--primary-color);
  box-shadow: 0 4px 16px rgba(182, 255, 46, 0.15);
}

.windchat-form-submit:active:not(:disabled) {
  transform: scale(0.98);
}

.windchat-form-submit:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
    `;
    document.head.appendChild(style);
  }

  function createDOM() {
    // Create root container
    var root = document.createElement('div');
    root.id = 'windchat-root';

    // Floating actions container
    var floatingActions = document.createElement('div');
    floatingActions.className = 'floating-actions';

    // Chat button
    var btnChat = document.createElement('button');
    btnChat.className = 'floating-action-btn';
    btnChat.id = 'windchat-btn-chat';
    btnChat.setAttribute('data-action', 'chat');
    btnChat.setAttribute('aria-label', 'Czat z doradcą turbin wiatrowych');
    btnChat.appendChild(createSVG('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z'));
    var chatLabel = document.createElement('span');
    chatLabel.className = 'floating-action-label';
    chatLabel.textContent = 'Czat';
    btnChat.appendChild(chatLabel);

    // Spec button
    var btnSpec = document.createElement('button');
    btnSpec.className = 'floating-action-btn';
    btnSpec.id = 'windchat-btn-spec';
    btnSpec.setAttribute('data-action', 'spec');
    btnSpec.setAttribute('aria-label', 'Pobierz specyfikację turbiny wiatrowej');
    btnSpec.appendChild(createSVG('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'));
    var specSvg = document.createElementNS('http://www.w3.org/2000/svg', 'polyline');
    specSvg.setAttribute('points', '14 2 14 8 20 8');
    btnSpec.querySelector('svg').appendChild(specSvg);
    var specL1 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    specL1.setAttribute('x1', '12');
    specL1.setAttribute('y1', '11');
    specL1.setAttribute('x2', '12');
    specL1.setAttribute('y2', '17');
    btnSpec.querySelector('svg').appendChild(specL1);
    var specL2 = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    specL2.setAttribute('x1', '9');
    specL2.setAttribute('y1', '14');
    specL2.setAttribute('x2', '15');
    specL2.setAttribute('y2', '14');
    btnSpec.querySelector('svg').appendChild(specL2);
    var specLabel = document.createElement('span');
    specLabel.className = 'floating-action-label';
    specLabel.textContent = 'Specyfikacja';
    btnSpec.appendChild(specLabel);

    // Offer button
    var btnOffer = document.createElement('button');
    btnOffer.className = 'floating-action-btn';
    btnOffer.id = 'windchat-btn-offer';
    btnOffer.setAttribute('data-action', 'offer');
    btnOffer.setAttribute('aria-label', 'Pobierz spersonalizowaną ofertę');
    var offerSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    offerSvg.setAttribute('width', '24');
    offerSvg.setAttribute('height', '24');
    offerSvg.setAttribute('viewBox', '0 0 24 24');
    offerSvg.setAttribute('fill', 'none');
    offerSvg.setAttribute('stroke', 'currentColor');
    offerSvg.setAttribute('stroke-width', '2');
    offerSvg.setAttribute('stroke-linecap', 'round');
    offerSvg.setAttribute('stroke-linejoin', 'round');
    var offerRect = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    offerRect.setAttribute('x', '2');
    offerRect.setAttribute('y', '7');
    offerRect.setAttribute('width', '20');
    offerRect.setAttribute('height', '14');
    offerRect.setAttribute('rx', '2');
    offerRect.setAttribute('ry', '2');
    offerSvg.appendChild(offerRect);
    var offerPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    offerPath.setAttribute('d', 'M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16');
    offerSvg.appendChild(offerPath);
    btnOffer.appendChild(offerSvg);
    var offerLabel = document.createElement('span');
    offerLabel.className = 'floating-action-label';
    offerLabel.textContent = 'Oferta';
    btnOffer.appendChild(offerLabel);

    floatingActions.appendChild(btnChat);
    floatingActions.appendChild(btnSpec);
    floatingActions.appendChild(btnOffer);

    // Main panel
    var panel = document.createElement('div');
    panel.id = 'windchat-panel';
    panel.className = 'windchat-hidden';

    // Panel header
    var header = document.createElement('div');
    header.id = 'windchat-header';
    var headerText = document.createElement('div');
    var brandDiv = document.createElement('div');
    brandDiv.className = 'windchat-header-brand';
    brandDiv.textContent = brandName;
    var subtitleDiv = document.createElement('div');
    subtitleDiv.className = 'windchat-header-subtitle';
    subtitleDiv.textContent = brandSubtitle;
    headerText.appendChild(brandDiv);
    headerText.appendChild(subtitleDiv);
    var closeBtn = document.createElement('button');
    closeBtn.id = 'windchat-close';
    closeBtn.setAttribute('aria-label', 'Zamknij czat');
    closeBtn.textContent = '✕';
    header.appendChild(headerText);
    header.appendChild(closeBtn);

    // Tabs
    var tabs = document.createElement('div');
    tabs.id = 'windchat-tabs';
    var tabChat = document.createElement('button');
    tabChat.className = 'windchat-tab windchat-tab-active';
    tabChat.setAttribute('data-tab', 'chat');
    tabChat.textContent = 'Czat';
    var tabSpec = document.createElement('button');
    tabSpec.className = 'windchat-tab';
    tabSpec.setAttribute('data-tab', 'spec');
    tabSpec.textContent = 'Spec';
    var tabOffer = document.createElement('button');
    tabOffer.className = 'windchat-tab';
    tabOffer.setAttribute('data-tab', 'offer');
    tabOffer.textContent = 'Oferta';
    tabs.appendChild(tabChat);
    tabs.appendChild(tabSpec);
    tabs.appendChild(tabOffer);

    // Chat tab content
    var chatContent = document.createElement('div');
    chatContent.id = 'windchat-chat-content';
    chatContent.className = 'windchat-tab-content windchat-tab-active';
    var messages = document.createElement('div');
    messages.id = 'windchat-messages';
    var composer = document.createElement('div');
    composer.id = 'windchat-composer';
    var input = document.createElement('textarea');
    input.id = 'windchat-input';
    input.setAttribute('rows', '1');
    input.setAttribute('placeholder', 'Napisz wiadomość…');
    var sendBtn = document.createElement('button');
    sendBtn.id = 'windchat-send';
    sendBtn.textContent = 'Wyślij';
    composer.appendChild(input);
    composer.appendChild(sendBtn);
    chatContent.appendChild(messages);
    chatContent.appendChild(composer);

    // Spec tab content
    var specContent = document.createElement('div');
    specContent.id = 'windchat-spec-content';
    specContent.className = 'windchat-tab-content';
    var specHead = document.createElement('div');
    specHead.className = 'windchat-form-head';
    var specTitle = document.createElement('div');
    specTitle.className = 'windchat-form-title';
    specTitle.textContent = 'Pobierz Specyfikację Techniczną';
    var specHelp = document.createElement('div');
    specHelp.className = 'windchat-form-help';
    specHelp.textContent = 'Otrzymaj szczegółowe specyfikacje techniczne dla Twojego projektu turbiny wiatrowej';
    specHead.appendChild(specTitle);
    specHead.appendChild(specHelp);
    var specGrid = document.createElement('div');
    specGrid.className = 'windchat-lead-grid';
    var specName = document.createElement('input');
    specName.id = 'windchat-spec-name';
    specName.setAttribute('placeholder', 'Twoje Imię');
    var specPhone = document.createElement('input');
    specPhone.id = 'windchat-spec-phone';
    specPhone.setAttribute('placeholder', 'Telefon (wymagane)');
    specPhone.setAttribute('required', '');
    var specEmail = document.createElement('input');
    specEmail.id = 'windchat-spec-email';
    specEmail.setAttribute('placeholder', 'Email (wymagane)');
    specEmail.setAttribute('required', '');
    specGrid.appendChild(specName);
    specGrid.appendChild(specPhone);
    specGrid.appendChild(specEmail);
    var specConsent = document.createElement('label');
    specConsent.className = 'windchat-consent';
    var specConsChk = document.createElement('input');
    specConsChk.id = 'windchat-spec-consent';
    specConsChk.setAttribute('type', 'checkbox');
    specConsChk.setAttribute('required', '');
    var specConsText = document.createElement('span');
    specConsText.innerHTML = 'Wyrażam zgodę na otrzymanie specyfikacji na moją skrzynkę email i akceptuję <a href="' + privacyUrl + '" class="windchat-link" target="_blank" rel="noopener noreferrer">politykę prywatności</a>';
    specConsent.appendChild(specConsChk);
    specConsent.appendChild(specConsText);
    var specSubmit = document.createElement('button');
    specSubmit.id = 'windchat-spec-submit';
    specSubmit.className = 'windchat-form-submit';
    specSubmit.setAttribute('type', 'button');
    specSubmit.textContent = 'Pobierz Specyfikację';
    specContent.appendChild(specHead);
    specContent.appendChild(specGrid);
    specContent.appendChild(specConsent);
    specContent.appendChild(specSubmit);

    // Offer tab content
    var offerContent = document.createElement('div');
    offerContent.id = 'windchat-offer-content';
    offerContent.className = 'windchat-tab-content';
    var offerHead = document.createElement('div');
    offerHead.className = 'windchat-form-head';
    var offerTitle = document.createElement('div');
    offerTitle.className = 'windchat-form-title';
    offerTitle.textContent = 'Poproś o Spersonalizowaną Ofertę';
    var offerHelp = document.createElement('div');
    offerHelp.className = 'windchat-form-help';
    offerHelp.textContent = 'Opowiedz nam o swoim projekcie, otrzymaj spersonalizowaną ofertę';
    offerHead.appendChild(offerTitle);
    offerHead.appendChild(offerHelp);
    var offerGrid = document.createElement('div');
    offerGrid.className = 'windchat-lead-grid';
    var offerName = document.createElement('input');
    offerName.id = 'windchat-offer-name';
    offerName.setAttribute('placeholder', 'Twoje Imię');
    var offerPhone = document.createElement('input');
    offerPhone.id = 'windchat-offer-phone';
    offerPhone.setAttribute('placeholder', 'Telefon (wymagane)');
    offerPhone.setAttribute('required', '');
    var offerEmail = document.createElement('input');
    offerEmail.id = 'windchat-offer-email';
    offerEmail.setAttribute('placeholder', 'Email (wymagane)');
    offerEmail.setAttribute('required', '');
    offerGrid.appendChild(offerName);
    offerGrid.appendChild(offerPhone);
    offerGrid.appendChild(offerEmail);
    var offerConsent = document.createElement('label');
    offerConsent.className = 'windchat-consent';
    var offerConsChk = document.createElement('input');
    offerConsChk.id = 'windchat-offer-consent';
    offerConsChk.setAttribute('type', 'checkbox');
    offerConsChk.setAttribute('required', '');
    var offerConsText = document.createElement('span');
    offerConsText.innerHTML = 'Wyrażam zgodę na kontakt w sprawie mojej oferty i akceptuję <a href="' + privacyUrl + '" class="windchat-link" target="_blank" rel="noopener noreferrer">politykę prywatności</a>';
    offerConsent.appendChild(offerConsChk);
    offerConsent.appendChild(offerConsText);
    var offerSubmit = document.createElement('button');
    offerSubmit.id = 'windchat-offer-submit';
    offerSubmit.className = 'windchat-form-submit';
    offerSubmit.setAttribute('type', 'button');
    offerSubmit.textContent = 'Poproś o Ofertę';
    offerContent.appendChild(offerHead);
    offerContent.appendChild(offerGrid);
    offerContent.appendChild(offerConsent);
    offerContent.appendChild(offerSubmit);

    // Assemble panel
    panel.appendChild(header);
    panel.appendChild(tabs);
    panel.appendChild(chatContent);
    panel.appendChild(specContent);
    panel.appendChild(offerContent);

    // Assemble root
    root.appendChild(floatingActions);
    root.appendChild(panel);

    document.body.appendChild(root);
  }

  // ============================================
  // EVENT HANDLERS
  // ============================================

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
    var panel = document.getElementById('windchat-panel');
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
    var panel = document.getElementById('windchat-panel');
    panel.classList.remove('open');
    panel.classList.add('windchat-hidden');
  }

  function addMsg(role, text, meta) {
    var messages = document.getElementById('windchat-messages');
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

    var sendBtn = document.getElementById('windchat-send');
    sendBtn.disabled = true;
    
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
          sendBtn.disabled = false;
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
          sendBtn.disabled = false;
        }, waitMs);
      });
  }

  // ============================================
  // INITIALIZATION
  // ============================================

  function init() {
    // Inject styles
    injectStyles();

    // Create DOM
    createDOM();

    // Get references
    var btnChat = document.getElementById('windchat-btn-chat');
    var btnSpec = document.getElementById('windchat-btn-spec');
    var btnOffer = document.getElementById('windchat-btn-offer');
    var close = document.getElementById('windchat-close');
    var input = document.getElementById('windchat-input');
    var send = document.getElementById('windchat-send');

    // Button listeners
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

    // Chat input
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

    // Spec form
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

    // Offer form
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
  }

  // Start when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
