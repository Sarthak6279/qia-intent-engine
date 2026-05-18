# SDK Integration Guide

## 🚀 Quick Start

### 1. Get Your API Key

Contact us or sign up on our dashboard to get your unique API key:
```
qia_your_company_unique_key_here
```

### 2. Add SDK to Your Website

In your HTML file, add the QIA SDK:

```html
<!-- Add this to your <head> or before closing </body> -->
<script src="https://cdn.qia-analytics.com/sdk?key=qia_your_key_here"></script>
```

### 3. Initialize the SDK

```javascript
// Call this once when your page loads
QIA.init({
  apiKey: 'qia_your_key_here',
  appName: 'your-app-name'
});
```

### 4. Start Tracking Events

```javascript
// Track wallet connection delay
const start = Date.now();
await connectWallet();
const delay = (Date.now() - start) / 1000;
await QIA.trackWalletConnect('/mint', delay);

// Track scroll depth (automatic)
window.addEventListener('scroll', () => {
  QIA.trackScrollDepth(window.location.pathname);
});

// Track button hesitation (2+ second hover)
button.addEventListener('mouseenter', () => {
  setTimeout(() => {
    QIA.trackHesitation('/checkout');
  }, 2000);
});
```

---

## 📊 Tracking Events

### Event Types

| Event | Trigger | Points | Use Case |
|-------|---------|--------|----------|
| `wallet_connect` | User connects wallet | +30 | Hesitation = consideration |
| `scroll_depth` | Scroll > 70% | +25 | Deep engagement |
| `confirm_hesitation` | Hover > 2 seconds | +30 | Decision threshold |
| `page_view` | Page load | - | Baseline |
| `video_watched` | Video completion | +20 | Content engagement |

### Score Ranges

```
0-24:   Browsing (low interest)
25-49:  Interested (moderate)
50-74:  Considering (high interest)
75-100: TRIGGER ZONE (show incentive!)
```

---

## 🎁 Responding to High Intent

When the SDK detects high intent (score ≥ 75):

```javascript
QIA.track({ event, delay, scrollDepth }).then(result => {
  if (result.trigger) {
    // User has high intent - show incentive!
    showOffer('🎁 Get 15% off your first purchase!');
  }
});
```

---

## 🔐 Security

- **API Key**: Keep it confidential, never commit to Git
- **Domain**: Your API key only works on your domain
- **Rate Limits**: Standard plans include 500K requests/month
- **HTTPS**: All data transmitted securely

---

## 📈 Best Practices

1. **Initialize once**: Call `QIA.init()` on page load
2. **Throttle tracking**: Don't track on every scroll (we do this automatically)
3. **Handle errors**: Wrap track calls in try/catch
4. **Test locally**: Use `http://localhost` during development
5. **Monitor dashboard**: Check your metrics weekly

---

## ❓ Need Help?

- Email: support@qia-analytics.com
- Docs: https://docs.qia-analytics.com
- Status: https://status.qia-analytics.com

---

## 📝 Complete Example

```html
<!DOCTYPE html>
<html>
<head>
  <title>My NFT Store</title>
</head>
<body>

  <h1>Mint Your NFT</h1>
  <button id="connect">Connect Wallet</button>
  <button id="mint">Mint NFT</button>

  <!-- Load QIA SDK -->
  <script src="https://cdn.qia-analytics.com/sdk?key=qia_your_key"></script>

  <script>
    // Initialize
    QIA.init({ apiKey: 'qia_your_key', appName: 'nft-mint' });

    // Track wallet connection
    document.getElementById('connect').addEventListener('click', async () => {
      const start = Date.now();
      await connectWallet();
      const delay = (Date.now() - start) / 1000;
      QIA.trackWalletConnect('/mint', delay);
    });

    // Track scroll
    window.addEventListener('scroll', () => {
      QIA.trackScrollDepth('/mint');
    });

    // Track hesitation
    let timer;
    const mintBtn = document.getElementById('mint');
    
    mintBtn.addEventListener('mouseenter', () => {
      timer = setTimeout(() => {
        QIA.trackHesitation('/mint').then(result => {
          if (result.trigger) {
            alert('🎁 Here\'s 15% off!');
          }
        });
      }, 2000);
    });

    mintBtn.addEventListener('mouseleave', () => clearTimeout(timer));
  </script>

</body>
</html>
```

---

## Next Steps

1. Get your API key from dashboard
2. Add the `<script>` tag to your page
3. Initialize QIA with your key
4. Start tracking events
5. Monitor your metrics
6. Enjoy increased conversions! 🚀
