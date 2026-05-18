/**
 * ============================================
 * QIA SDK — Intent Analytics
 * ============================================
 * This SDK talks to your Node.js backend.
 * It wraps all the fetch() calls so the
 * developer only needs 2 simple functions:
 *   → QIA.init()
 *   → QIA.track()
 * ============================================
 */

class QIAClient {

  constructor() {
    // These are set when developer calls QIA.init()
    this.apiKey      = null;
    this.appName     = null;
    this.baseUrl     = null;
    this.initialized = false;

    // Store last result so developer can access it anytime
    this.lastResult  = null;
  }

  // ============================================
  // STEP 1: init()
  // Developer calls this ONCE at app startup
  // ============================================

  init({ apiKey, appName, baseUrl }) {

    // Validate API key exists
    if (!apiKey) {
      console.error('[QIA] ❌ apiKey is required');
      return false;
    }

    // Validate API key format (must start with qia_)
    if (!apiKey.startsWith('qia_')) {
      console.warn('[QIA] ⚠️  API key should start with qia_');
    }

    // Set the backend URL
    // Default: your local backend running on port 3000
    this.baseUrl     = baseUrl || 'http://localhost:3000';
    this.apiKey      = apiKey;
    this.appName     = appName || 'unnamed-app';
    this.initialized = true;

    console.log(`[QIA] ✅ Initialized`);
    console.log(`[QIA]    App:     ${this.appName}`);
    console.log(`[QIA]    Backend: ${this.baseUrl}`);

    return true;
  }

  // ============================================
  // STEP 2: track()
  // Developer calls this when something happens
  // This is the main function that hits POST /track
  // ============================================

  async track({ event, page, delay, scrollDepth, userAddress }) {

    // Guard: must call init() first
    if (!this.initialized) {
      console.error('[QIA] ❌ Call QIA.init() before QIA.track()');
      return { error: 'SDK not initialized' };
    }

    // Guard: event name is required
    if (!event) {
      console.error('[QIA] ❌ event name is required');
      return { error: 'Missing event name' };
    }

    // Build the request body
    // This matches exactly what your backend POST /track expects
    const body = {
      event,
      page:        page        || (typeof window !== 'undefined' ? window.location.pathname : '/'),
      delay:       delay       || null,
      scrollDepth: scrollDepth || null,
      userAddress: userAddress || null,
      appName:     this.appName,
      timestamp:   new Date().toISOString()
    };

    try {
      // Hit your backend POST /track endpoint
      // Passes apiKey in x-api-key header (required by your middleware)
      const response = await fetch(`${this.baseUrl}/track`, {
        method:  'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key':    this.apiKey        // ← your backend checks this
        },
        body: JSON.stringify(body)
      });

      // Parse the JSON response from your backend
      const data = await response.json();

      // Handle backend errors (401, 403, 400, 500)
      if (!response.ok) {
        console.error(`[QIA] ❌ Backend error ${response.status}:`, data.error);
        return { error: data.error, status: response.status };
      }

      // Store latest result
      this.lastResult = data;

      // Log intent score
      console.log(`[QIA] 📊 Event: ${event}`);
      console.log(`[QIA]    Score: ${data.intentScore}/100`);
      console.log(`[QIA]    Trigger: ${data.trigger}`);

      // If blockchain was triggered, log the TX hash
      if (data.trigger && data.blockchain) {
        console.log(`[QIA] 🔗 Blockchain TX: ${data.blockchain.txHash}`);
        console.log(`[QIA] ⛽ Gas used: ${data.blockchain.gasUsed}`);
      }

      return data;

    } catch (err) {
      // Network error — backend not running, CORS issue, etc.
      console.error('[QIA] ❌ Network error:', err.message);
      console.error('[QIA]    Is your backend running at', this.baseUrl, '?');
      return { error: 'Network request failed', details: err.message };
    }
  }

  // ============================================
  // HELPER METHODS
  // These are just shortcuts around track()
  // so developers don't have to remember event names
  // ============================================

  // Helper 1: Track wallet connection
  // Pass the delay in seconds (how long user took to connect)
  async trackWalletConnect(page, delaySeconds) {
    return this.track({
      event: 'wallet_connect',
      page,
      delay: delaySeconds
    });
  }

  // Helper 2: Track scroll depth
  // Automatically reads window.scrollY to get percentage
  async trackScrollDepth(page) {
    // Calculate how far user has scrolled (0-100%)
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    const pct      = total > 0 ? Math.round((scrolled / total) * 100) : 0;

    return this.track({
      event:       'scroll_depth',
      page,
      scrollDepth: pct
    });
  }

  // Helper 3: Track hesitation (hover on button)
  // Call this after user hovers 2+ seconds on action button
  async trackHesitation(page) {
    return this.track({
      event: 'confirm_hesitation',
      page
    });
  }

  // Helper 4: Generate a new API key
  // Hits POST /generate-key on your backend
  async generateApiKey(companyName) {
    if (!companyName) {
      return { error: 'companyName is required' };
    }

    try {
      const response = await fetch(`${this.baseUrl}/generate-key`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ companyName })
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.error };
      }

      console.log(`[QIA] 🔑 New API key: ${data.apiKey}`);
      return data;

    } catch (err) {
      return { error: 'Network request failed' };
    }
  }

  // Helper 5: Check if backend is alive
  async healthCheck() {
    try {
      const response = await fetch(`${this.baseUrl}/health`);
      const data     = await response.json();
      console.log('[QIA] ✅ Backend healthy:', data.status);
      return data;
    } catch (err) {
      console.error('[QIA] ❌ Backend unreachable at', this.baseUrl);
      return { error: 'Backend unreachable' };
    }
  }

  // Helper 6: Get last response (no network call)
  getLastResult() {
    return this.lastResult;
  }
}

// ============================================
// EXPORT
// Create a single instance so everyone
// shares the same initialized SDK
// ============================================

const QIA = new QIAClient();

// Browser (script tag)
if (typeof window !== 'undefined') {
  window.QIA = QIA;
}

// Node.js (require)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = QIA;
}
