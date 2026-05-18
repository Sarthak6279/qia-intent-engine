# QIA Intent Engine — GitHub Security Setup

## 📁 Public vs Private Structure

### What's PUBLIC (Visible on GitHub):
- ✅ README with overview
- ✅ CONTRIBUTING guidelines  
- ✅ Documentation
- ✅ License
- ✅ Public API reference
- ✅ Example integration code (no API keys)

### What's PRIVATE (Not in GitHub):
- ❌ API keys and secrets (.env files)
- ❌ Wallet private keys
- ❌ Full backend source code (backend/)
- ❌ Unobfuscated SDK
- ❌ Database credentials
- ❌ RPC endpoints
- ❌ Smart contract deployment details

### What Clients GET (Distribution):
- ✅ Minified/obfuscated SDK only
- ✅ API documentation (endpoint reference)
- ✅ Integration guide (how to use)
- ✅ API key (unique per company)
- ✅ CDN-hosted loader script

---

## 🔒 Security Rules

1. **Backend code stays private** → Not open-sourced
2. **SDK is minified** → Hard to read/reverse-engineer
3. **Domain validation** → Key only works for their domain
4. **Rate limiting** → Can't be shared/abused
5. **No .env in repo** → Only .env.example
6. **No private keys** → Never committed
7. **CDN delivery** → SDK hosted on your server, not GitHub

---

## 📋 GitHub Structure (What's Visible)

```
qia-intent-engine/
│
├── README.md                 ← Overview (public)
├── CONTRIBUTING.md           ← Contribution guide (public)
├── LICENSE                   ← MIT (public)
├── .gitignore                ← Hide secrets (private rules)
│
├── public/                   ← What clients see
│   ├── SDK_INTEGRATION.md    ← How to integrate
│   ├── API_REFERENCE.md      ← Endpoints they can call
│   ├── EXAMPLES.md           ← Code examples (no keys)
│   └── qia-sdk-public.min.js ← Minified SDK (obfuscated)
│
├── sdk/                      ← SDK source (private, not shown)
│   └── qia-sdk.js            ← Original source (ignored)
│
├── backend/                  ← Backend code (private)
│   ├── server.js             ← Source (ignored)
│   ├── intentEngine.js       ← Source (ignored)
│   ├── apiKey.js             ← Source (ignored)
│   └── blockchain.js         ← Source (ignored)
│
├── docs/                     ← Public documentation
│   ├── deployment.md         ← How to deploy (hidden env vars)
│   ├── pricing.md            ← Pricing info
│   └── faq.md                ← Frequently asked questions
│
├── .env.example              ← TEMPLATE ONLY (no real values)
├── .gitignore                ← Ignore .env, secrets, etc.
└── package.json              ← Dependencies (public)
```

---

## ✅ What Gets Pushed to GitHub

```
✅ Push to GitHub:
  - README.md
  - CONTRIBUTING.md
  - LICENSE
  - .gitignore
  - .env.example (template, no real values)
  - public/ folder
  - docs/ folder
  - sdk-test.html (local testing only)
  - This file (GITHUB_SECURITY.md)

❌ Do NOT push to GitHub:
  - backend/ (server code)
  - sdk/qia-sdk.js (original unobfuscated)
  - .env (actual credentials)
  - node_modules/
  - .git/config (with credentials)
  - Smart contract private keys
  - RPC endpoints with auth keys
```

---

## 🔐 What Clients See

**They go to GitHub and see:**

```
README.md
├─ What is QIA?
├─ Features
├─ Quick Start
└─ Link to: public/SDK_INTEGRATION.md

public/SDK_INTEGRATION.md
├─ Installation: How to add SDK to their page
├─ API Key: "Get your key from dashboard"
├─ Example: Code snippet (no real keys)
├─ Reference: Link to API_REFERENCE.md

public/API_REFERENCE.md
├─ POST /track endpoint
├─ POST /generate-key endpoint
├─ Response formats
├─ Error codes

public/qia-sdk-public.min.js
└─ Minified/obfuscated SDK (they download this)
```

**They DON'T see:**
- ❌ Backend code
- ❌ Unobfuscated SDK
- ❌ Database schemas
- ❌ Internal business logic
- ❌ API keys or secrets
- ❌ RPC endpoints

---

## 🛡️ Implementation Steps

1. **Create .gitignore** (below)
2. **Obfuscate SDK** (minify code)
3. **Create public/ folder** (docs for clients)
4. **Update README** (safer version)
5. **Push to GitHub** (only public files)

```
