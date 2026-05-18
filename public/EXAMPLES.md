# QIA SDK Examples

Real-world code examples for common use cases.

---

## 1️⃣ NFT Minting Platform

Track user intent before they mint an NFT:

```javascript
// Initialize once on page load
QIA.init({
  apiKey: 'qia_your_key_here',
  appName: 'nft-mint-platform'
});

// Track wallet connection delay
document.getElementById('connect-btn').addEventListener('click', async () => {
  const start = Date.now();
  await connectWallet();
  const delay = (Date.now() - start) / 1000;
  
  const result = await QIA.trackWalletConnect('/mint', delay);
  console.log('Intent score:', result.intentScore);
});

// Track scroll depth
let scrollTimer;
window.addEventListener('scroll', () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    QIA.trackScrollDepth('/mint');
  }, 300);
});

// Track button hesitation (hover on mint button)
let hoverTimer;
const mintBtn = document.getElementById('mint-btn');

mintBtn.addEventListener('mouseenter', () => {
  hoverTimer = setTimeout(() => {
    QIA.trackHesitation('/mint').then(result => {
      if (result.trigger) {
        showOffer('🎁 Get 15% off this NFT - Valid for 10 minutes!');
      }
    });
  }, 2000);
});

mintBtn.addEventListener('mouseleave', () => {
  clearTimeout(hoverTimer);
});
```

---

## 2️⃣ Crypto Exchange (Token Purchase)

```javascript
QIA.init({
  apiKey: 'qia_exchange_key',
  appName: 'crypto-exchange'
});

// Track buy button interaction
document.getElementById('buy-btn').addEventListener('click', async () => {
  const start = Date.now();
  
  // User is in the purchase flow
  const result = await QIA.track({
    event: 'confirm_hesitation',
    page: '/buy/ETH',
    delay: (Date.now() - start) / 1000
  });

  if (result.trigger) {
    // High intent user - offer bonus tokens
    showOffer('💰 Bonus: Get 5% extra tokens on this purchase!');
  } else if (result.intentScore >= 50) {
    // Moderate interest - show discount
    showOffer('💎 Limited time: 2% discount on ETH purchases');
  }
});

// Track form completion
const buyForm = document.getElementById('buy-form');
buyForm.addEventListener('change', () => {
  QIA.track({
    event: 'scroll_depth',
    page: '/buy/ETH',
    scrollDepth: 75  // Assumes form is at 75% scroll
  });
});
```

---

## 3️⃣ SaaS Free-to-Paid Conversion

```javascript
QIA.init({
  apiKey: 'qia_saas_key',
  appName: 'saas-platform'
});

// Track pricing page interest
window.addEventListener('load', () => {
  QIA.track({
    event: 'page_view',
    page: '/pricing'
  });
});

// Track subscribe button hover
const subscribeBtn = document.getElementById('subscribe-btn');
let hoverTime = 0;

subscribeBtn.addEventListener('mouseenter', () => {
  hoverTime = Date.now();
});

subscribeBtn.addEventListener('mouseleave', () => {
  const hoverDuration = (Date.now() - hoverTime) / 1000;
  
  if (hoverDuration >= 2) {
    QIA.track({
      event: 'confirm_hesitation',
      page: '/pricing'
    }).then(result => {
      if (result.trigger) {
        showOffer('🎯 Upgrade now and get 1 month free!');
      }
    });
  }
});

// Track checkout hesitation
document.getElementById('checkout-btn').addEventListener('click', async () => {
  const checkoutStart = Date.now();
  
  // Simulate checkout flow
  await openCheckout();
  
  const checkoutTime = (Date.now() - checkoutStart) / 1000;
  
  const result = await QIA.track({
    event: 'wallet_connect',  // Reuse for payment connection
    page: '/checkout',
    delay: checkoutTime
  });

  if (result.trigger) {
    showOffer('✨ Complete your upgrade and save 25% with code SAVE25');
  }
});
```

---

## 4️⃣ E-Commerce (General)

```javascript
QIA.init({
  apiKey: 'qia_ecommerce_key',
  appName: 'online-store'
});

// Track product page scroll
function trackProductEngagement() {
  let scrollTimer;
  
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(() => {
      const scrollDepth = Math.round(
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
      );
      
      QIA.track({
        event: 'scroll_depth',
        page: window.location.pathname,
        scrollDepth: scrollDepth
      }).then(result => {
        if (result.trigger && scrollDepth > 70) {
          showPopup('🛍️ You\'re interested! Use code SAVE10 for 10% off');
        }
      });
    }, 300);
  });
}

// Track add-to-cart hesitation
document.getElementById('add-to-cart').addEventListener('click', async () => {
  const start = Date.now();
  
  // Simulate adding to cart
  await addToCart();
  
  const delay = (Date.now() - start) / 1000;
  
  const result = await QIA.track({
    event: 'wallet_connect',  // User is "connecting" to payment
    page: '/product/' + productId,
    delay: delay
  });

  if (result.trigger) {
    showOffer('🚀 Free shipping on orders over $50 - You\'re so close!');
  }
});

// Track checkout flow
document.getElementById('checkout-btn').addEventListener('click', async () => {
  const result = await QIA.track({
    event: 'confirm_hesitation',
    page: '/checkout'
  });

  if (result.trigger) {
    showModal('💳 Secure checkout - 30-day money-back guarantee!');
  }
});

trackProductEngagement();
```

---

## 5️⃣ React Component Example

```jsx
import { useEffect, useState } from 'react';

export function NFTMint() {
  useEffect(() => {
    // Initialize SDK
    if (window.QIA) {
      window.QIA.init({
        apiKey: 'qia_your_key',
        appName: 'nft-react-app'
      });
    }
  }, []);

  const handleWalletConnect = async () => {
    const start = Date.now();
    
    try {
      // Connect wallet
      const provider = await connectWallet();
      
      const delay = (Date.now() - start) / 1000;
      
      // Track with QIA
      const result = await window.QIA.track({
        event: 'wallet_connect',
        page: '/mint',
        delay: delay
      });

      if (result.trigger) {
        setShowOffer(true);
      }
    } catch (error) {
      console.error('Connection failed', error);
    }
  };

  const handleMintClick = async () => {
    const result = await window.QIA.track({
      event: 'confirm_hesitation',
      page: '/mint'
    });

    if (result.trigger) {
      setDiscountCode('MINT15');  // Show 15% discount
    }
  };

  return (
    <div className="mint-container">
      <button onClick={handleWalletConnect}>Connect Wallet</button>
      <button onClick={handleMintClick} className="mint-btn">
        Mint NFT
      </button>
      
      {showOffer && (
        <div className="offer">
          🎁 Get 15% off this NFT - Use code: {discountCode}
        </div>
      )}
    </div>
  );
}
```

---

## 6️⃣ Error Handling

```javascript
QIA.init({
  apiKey: 'qia_your_key',
  appName: 'error-safe-app'
});

// Wrap track calls in error handling
async function safeTrack(eventData) {
  try {
    const result = await QIA.track(eventData);
    
    if (!result.success && result.error) {
      console.warn('[QIA] Error:', result.error);
      // Continue without breaking user experience
    }
    
    return result;
  } catch (error) {
    // Network error - log but don't break UI
    console.error('[QIA] Network error:', error);
    return { error: 'Network error' };
  }
}

// Use it like this
document.getElementById('btn').addEventListener('click', () => {
  safeTrack({
    event: 'button_click',
    page: '/page'
  }).then(result => {
    if (result.trigger) {
      showOffer();
    }
  });
});
```

---

## 📊 Testing Locally

Test with different scores:

```javascript
// Test score 0 (no signals)
QIA.track({ event: 'page_view' });

// Test score 25 (low engagement)
QIA.track({ event: 'scroll_depth', scrollDepth: 80 });

// Test score 30 (wallet delay)
QIA.track({ event: 'wallet_connect', delay: 5 });

// Test score 55 (multiple signals)
QIA.track({ 
  event: 'wallet_connect', 
  delay: 5, 
  scrollDepth: 80 
});

// Test score 85 (high intent - trigger!)
QIA.track({ 
  event: 'confirm_hesitation',
  delay: 5,
  scrollDepth: 85
});
```

---

## 🎯 Best Practices

1. **Handle errors gracefully** - QIA should never break user experience
2. **Throttle events** - Don't track on every action (scroll uses 300ms debounce)
3. **Initialize once** - Call `QIA.init()` once on page load
4. **Use meaningful pages** - Use `/mint`, `/checkout`, not `/page1`
5. **Test before deploy** - Verify tracking works locally first

---

## 📞 Support

Found a bug or need help? 
- Email: support@qia-analytics.com
- Docs: https://docs.qia-analytics.com
- GitHub Issues: https://github.com/qia-analytics/qia-intent-engine/issues
