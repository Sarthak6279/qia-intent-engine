# QIA API Reference

All endpoints require the `x-api-key` header with your API key.

---

## POST /track

Track a single user behavior event and receive an intent score.

### Request

```bash
curl -X POST https://api.qia-analytics.com/track \
  -H "Content-Type: application/json" \
  -H "x-api-key: qia_your_key" \
  -d '{
    "event": "wallet_connect",
    "page": "/mint",
    "delay": 4.5,
    "scrollDepth": 85
  }'
```

### Request Body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| event | string | ✅ | Event name (wallet_connect, scroll_depth, confirm_hesitation) |
| page | string | ❌ | Current page/route |
| delay | number | ❌ | Delay in seconds |
| scrollDepth | number | ❌ | Scroll percentage (0-100) |
| userAddress | string | ❌ | User's wallet address (optional) |

### Response

```json
{
  "success": true,
  "company": "your-company",
  "event": "wallet_connect",
  "page": "/mint",
  "intentScore": 85,
  "trigger": true,
  "confidence": "high",
  "signals": [
    { "type": "delay", "value": 4.5, "points": 30 },
    { "type": "scroll", "value": 85, "points": 25 },
    { "type": "hesitation", "value": true, "points": 30 }
  ],
  "recommendation": "High intent — offer incentive",
  "blockchain": {
    "triggered": true,
    "txHash": "0x3a9fbc7d2e14c8f0b5a1d6e9...",
    "network": "ethereum-mainnet",
    "gasUsed": 44321,
    "blockNumber": 15000042
  },
  "timestamp": "2026-06-06T10:23:58.000Z"
}
```

---

## POST /track/batch

Track multiple events in one request. Returns aggregate analysis.

### Request

```bash
curl -X POST https://api.qia-analytics.com/track/batch \
  -H "Content-Type: application/json" \
  -H "x-api-key: qia_your_key" \
  -d '{
    "events": [
      { "event": "page_view", "scrollDepth": 30 },
      { "event": "wallet_connect", "delay": 5 },
      { "event": "confirm_hesitation", "page": "/mint" }
    ]
  }'
```

### Response

```json
{
  "success": true,
  "company": "your-company",
  "eventCount": 3,
  "results": [
    { "event": "page_view", "score": 0, "trigger": false },
    { "event": "wallet_connect", "score": 30, "trigger": false },
    { "event": "confirm_hesitation", "score": 36, "trigger": false }
  ],
  "streamAnalysis": {
    "aggregateScore": 22,
    "pattern": "curious",
    "recommendation": "Low intent — nurture with content"
  }
}
```

---

## GET /health

Check if the API is running and healthy.

### Request

```bash
curl https://api.qia-analytics.com/health
```

### Response

```json
{
  "status": "healthy",
  "service": "QIA Analytics",
  "version": "1.0.0",
  "modules": {
    "apiKey": "loaded",
    "intentEngine": "loaded",
    "blockchain": "loaded"
  }
}
```

---

## POST /generate-key

Generate a new API key for a company. (Admin only)

### Request

```bash
curl -X POST https://api.qia-analytics.com/generate-key \
  -H "Content-Type: application/json" \
  -d '{ "companyName": "acme-corp" }'
```

### Response

```json
{
  "success": true,
  "companyName": "acme-corp",
  "apiKey": "qia_3a9fbc7d2e14c8f0b5a1d6e9",
  "message": "Store this key securely!"
}
```

---

## GET /stats/scoring

Get current scoring configuration.

### Request

```bash
curl https://api.qia-analytics.com/stats/scoring
```

### Response

```json
{
  "config": {
    "DELAY_THRESHOLD": 3,
    "DELAY_POINTS": 30,
    "SCROLL_THRESHOLD": 70,
    "SCROLL_POINTS": 25,
    "HESITATION_POINTS": 30,
    "MAX_SCORE": 100,
    "TRIGGER_THRESHOLD": 75
  }
}
```

---

## Error Codes

| HTTP | Error | Cause |
|------|-------|-------|
| 400 | Missing event name | event field not provided |
| 400 | Missing companyName | companyName field not provided |
| 401 | Missing API key | x-api-key header not provided |
| 403 | Invalid API key | API key not found or invalid for domain |
| 404 | Not found | Endpoint does not exist |
| 429 | Rate limit exceeded | Too many requests (check retry-after header) |
| 500 | Internal server error | Something went wrong on our end |

---

## Response Codes Explained

### Intent Score (0-100)

```
0-24:   Browsing       (No immediate action needed)
25-49:  Interested     (User is exploring)
50-74:  Considering    (User is close to deciding)
75-100: HIGH INTENT    (User likely to convert - show offer!)
```

### Trigger

```
trigger: false  →  Score < 75, no action needed
trigger: true   →  Score >= 75, show incentive!
```

### Confidence

```
"low"     →  Based on 0-1 signals, low reliability
"medium"  →  Based on 2 signals, moderate reliability
"high"    →  Based on 3+ signals, high reliability
```

---

## Rate Limits

Your plan includes:

| Plan | Requests/Month | Limit |
|------|----------------|-------|
| Starter | 100K | 3,333/day |
| Business | 1M | 33,333/day |
| Enterprise | Unlimited | Custom |

**Rate Limit Headers:**
```
X-RateLimit-Limit: 10000
X-RateLimit-Remaining: 9500
X-RateLimit-Reset: 1623456789
```

---

## Webhooks (Coming Soon)

Subscribe to events via webhooks:
- `intent.high` - When user reaches high intent
- `track.received` - When event is tracked
- `key.revoked` - When API key is revoked

---

## Status & Monitoring

Check our service status:
- **Status Page:** https://status.qia-analytics.com
- **Uptime:** 99.9% SLA (Enterprise)
- **Response Time:** <100ms P99

---

## Support

- **Email:** support@qia-analytics.com
- **Documentation:** https://docs.qia-analytics.com
- **Slack:** Contact support for channel invite
