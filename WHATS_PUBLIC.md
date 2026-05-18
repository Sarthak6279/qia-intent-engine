# What Companies See on GitHub

## 🔒 What's PROTECTED (Hidden from GitHub)

These files are in your local machine but **NOT pushed to GitHub**:

```
❌ NOT on GitHub:
backend/server.js              ← Backend source code (private)
backend/intentEngine.js        ← Scoring algorithm (private)
backend/apiKey.js              ← Key validation logic (private)
backend/blockchain.js          ← Blockchain integration (private)
sdk/qia-sdk.js                 ← Original unobfuscated SDK
.env                           ← Your secrets and API keys
.env.production                ← Production credentials
node_modules/                  ← Dependencies (ignored)
```

**Why hidden?**
- Your backend code is your IP (Intellectual Property)
- API keys could compromise your system
- Environment variables contain secrets
- SDK source could be reverse-engineered

---

## ✅ What's PUBLIC (Visible on GitHub)

When someone visits your GitHub repo, they see:

```
✅ ON GITHUB (Public):

README.md                      ← Project overview
CONTRIBUTING.md                ← How to contribute
LICENSE                        ← MIT license
GITHUB_SECURITY.md             ← This file!
.gitignore                     ← Git rules

public/
├── SDK_INTEGRATION.md          ← How to integrate the SDK
├── API_REFERENCE.md            ← API endpoints documentation
├── EXAMPLES.md                 ← Code examples for developers
└── qia-sdk-public.min.js       ← Minified/obfuscated SDK

docs/
├── pricing.md                  ← Pricing information
├── faq.md                      ← FAQ
└── deployment.md               ← General deployment info

sdk-test.html                  ← Local testing page (open source)
package.json                   ← Dependencies list
```

---

## 👥 What a Company Sees When They Visit GitHub

### Step 1: They land on the repo
```
README.md shows:
├─ What is QIA?
├─ Features & benefits
├─ Quick links to documentation
└─ Call to action: "Get API Key"
```

### Step 2: They look at the files
```
They see:
✅ README (overview)
✅ CONTRIBUTING (how we work)
✅ LICENSE (MIT - open)
✅ public/ folder (documentation)
❌ backend/ folder (not visible - .gitignore hides it)
❌ .env files (not visible - ignored)
❌ Original SDK (not visible - only minified version)
```

### Step 3: They read the documentation
```
public/SDK_INTEGRATION.md tells them:
├─ "Get your API key from dashboard"
├─ "Add this script tag to your page"
├─ "Initialize QIA with your key"
└─ "Start tracking user behavior"

public/API_REFERENCE.md shows:
├─ Endpoint: POST /track
├─ Parameters: event, delay, scrollDepth
├─ Response format: { intentScore, trigger }
└─ Error codes: 401, 403, 429

public/EXAMPLES.md has:
├─ NFT minting example
├─ E-commerce example
├─ React component example
└─ Error handling best practices
```

### Step 4: They can test locally
```
They can:
✅ Download sdk-test.html
✅ Run it locally to see how SDK works
✅ But can't see the backend code
✅ Can't copy and reuse the backend
```

---

## 📊 GitHub Visibility Breakdown

```
Total Files in Your Repo Locally:
├── README, LICENSE, docs         (visible ✅)
├── backend/ with 4 .js files    (hidden ❌)
├── sdk/ with qia-sdk.js         (hidden ❌)
├── .env files                   (hidden ❌)
└── public/ docs                 (visible ✅)

What Appears on GitHub: ~10 files
What's Hidden: ~10 files  
Visibility: 50% public, 50% private
```

---

## 🎯 What They CAN'T Do

Even if they clone your repo, they CAN'T:

```
❌ Can't see backend code
   └─ .gitignore blocks it

❌ Can't get API keys/secrets
   └─ .env is in .gitignore

❌ Can't use unobfuscated SDK
   └─ Only minified version available

❌ Can't reverse-engineer the system
   └─ No source code to analyze

❌ Can't self-host the backend
   └─ Code not provided

❌ Can't copy and sell as their own
   └─ No code to copy!
```

---

## 🔐 Security Layers

### Layer 1: Git (.gitignore)
```
.gitignore prevents sensitive files
from being committed to GitHub
```

### Layer 2: Obfuscation
```
SDK is minified/obfuscated
- Before: readable JavaScript
- After: qia-sdk.min.js
- Hard to reverse-engineer
```

### Layer 3: API Key Validation
```
Even if they get the SDK,
it needs a valid API key to work
```

### Layer 4: Domain Restriction
```
API key only works for their domain
Can't be shared with others
```

### Layer 5: Rate Limiting
```
Each key has request limits
Can't abuse the system
```

---

## 📝 Example: What GitHub Shows

Visit: https://github.com/Sarthak6279/qia-intent-engine

**File Structure (What They See):**
```
📁 qia-intent-engine
│
├─ 📄 README.md                    ← Overview
├─ 📄 CONTRIBUTING.md              ← Contribution guide
├─ 📄 LICENSE                      ← MIT license
├─ 📄 GITHUB_SECURITY.md           ← This document
├─ 📄 .gitignore                   ← Security config
│
├─ 📁 public/                      ← PUBLIC DOCS
│   ├─ SDK_INTEGRATION.md          ← "How to integrate"
│   ├─ API_REFERENCE.md            ← "API endpoints"
│   ├─ EXAMPLES.md                 ← "Code examples"
│   └─ qia-sdk-public.min.js       ← "Minified SDK"
│
├─ 📁 docs/                        ← MORE DOCS
│   ├─ pricing.md
│   ├─ faq.md
│   └─ deployment.md
│
└─ 📄 sdk-test.html               ← Testing page
└─ 📄 package.json                ← Dependencies


NOT VISIBLE (hidden by .gitignore):
❌ backend/ (server code hidden)
❌ sdk/qia-sdk.js (source hidden)
❌ .env files (secrets hidden)
```

---

## 🚀 Deployment Workflow

### Your Local Machine
```
Full source code here:
├─ backend/ (source code)
├─ sdk/ (unobfuscated)
└─ .env (real secrets)
```

### GitHub (Public)
```
Only safe to share:
├─ Documentation
├─ Minified SDK
└─ .env.example (template only)
```

### Production Server
```
What runs on your server:
├─ Compiled backend
├─ Obfuscated SDK
├─ Real .env secrets
└─ Database credentials
```

### Client's Website
```
What companies use:
├─ Minified SDK from CDN
├─ API key (unique to them)
└─ Documentation link
```

---

## ✅ Client Journey

```
Step 1: Company finds your GitHub
        ↓
Step 2: Reads README
        ↓
Step 3: Clicks "Integration Guide"
        ↓
Step 4: Reads public/SDK_INTEGRATION.md
        ↓
Step 5: Fills form to get API key
        ↓
Step 6: Adds SDK to their website
        ↓
Step 7: Starts tracking user intent
        ↓
Step 8: Sees increased conversions
        ↓
Step 9: Pays subscription fee 💰
```

**They never see your backend code!**

---

## 📊 What Gets Exposed vs Protected

| Item | Visible | Why |
|------|---------|-----|
| README | ✅ Yes | Overview for everyone |
| Documentation | ✅ Yes | Helps users integrate |
| Minified SDK | ✅ Yes | What they need to use |
| Examples | ✅ Yes | Shows how to use API |
| Backend code | ❌ No | Your competitive advantage |
| API keys | ❌ No | Security risk |
| Unobfuscated SDK | ❌ No | Prevents copying |
| Database schema | ❌ No | Your IP |
| RPC endpoints | ❌ No | Could get exploited |

---

## 🔄 Updating Your Repo

### When you push code:

```bash
# Public docs only
git add public/ docs/ README.md
git commit -m "docs: update integration guide"
git push origin main
```

### Backend updates stay LOCAL:

```bash
# These DON'T go to GitHub (blocked by .gitignore)
git add backend/server.js          ← Ignored ✓
git add .env                       ← Ignored ✓
git add sdk/qia-sdk.js            ← Ignored ✓

# These are automatically excluded
# No need to worry about committing them
```

---

## 🛡️ Double-Check: What's Exposed?

To verify nothing is exposed on GitHub:

```bash
# Check what Git would push
git diff --cached

# See what files are tracked
git ls-files

# Verify .gitignore is working
git status
```

You should NEVER see:
- ❌ backend files listed
- ❌ .env files listed
- ❌ API keys anywhere

---

## ✅ Summary

**You've successfully protected your IP:**

```
✅ Backend code hidden on GitHub
✅ API keys not exposed
✅ Only public documentation shared
✅ SDK is minified/obfuscated
✅ Clients can only see what they need
✅ Your competitive advantage protected

Result: Companies see enough to integrate,
        but not enough to copy!
```

---

## 🎯 Next Steps

1. ✅ GitHub is now secure
2. ⏭️ Ready to share with clients
3. ⏭️ Ready to deploy to production
4. ⏭️ Ready to start selling subscriptions

**Your GitHub repo is now ready for public use! 🚀**
