# Contributing to QIA

Thank you for your interest in contributing! Here's how to get started and help make QIA better.

## 🚀 Local Setup

```bash
# 1. Clone the repository
git clone https://github.com/Sarthak6279/qia-intent-engine.git
cd qia-intent-engine/backend

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Edit .env with your credentials

# 4. Start the server
node server.js
```

## 📋 Branch Naming Convention

Use descriptive branch names to organize your work:

```
feature/your-feature-name       # New features
fix/bug-description             # Bug fixes
docs/what-you-updated           # Documentation updates
chore/task-description          # Maintenance tasks
```

## 📝 Commit Message Style

Follow conventional commit format for clear commit history:

```
feat: add Redis caching for intent scores
fix: correct scroll depth calculation above 100%
docs: update API reference with batch endpoint
chore: upgrade ethers.js to v6.8
perf: optimize key validation to O(1) lookup
test: add unit tests for scoring algorithm
```

**Good practices:**
- Start with verb (add, fix, update, remove)
- Be specific about what changed
- Reference issue numbers when applicable: `fix: #123 resolve API key validation`

## 🔧 Adding New Intent Signals

All signal logic lives in `intentEngine.js` inside the `calculateIntentScore()` function.

### Step 1: Add configuration
```javascript
const SCORING_CONFIG = {
  // existing...
  YOUR_SIGNAL_THRESHOLD: 10,  // When signal triggers
  YOUR_SIGNAL_POINTS: 20,     // Points awarded
};
```

### Step 2: Implement signal logic
```javascript
// Add your new signal here
if (eventData.yourSignal && eventData.yourSignal > SCORING_CONFIG.YOUR_SIGNAL_THRESHOLD) {
  score += SCORING_CONFIG.YOUR_SIGNAL_POINTS;
  signals.push({
    type:   'your_signal',
    value:  eventData.yourSignal,
    points: SCORING_CONFIG.YOUR_SIGNAL_POINTS,
    reason: 'Explain why this signal indicates user intent'
  });
  breakdown.yourSignal = SCORING_CONFIG.YOUR_SIGNAL_POINTS;
}
```

### Step 3: Add event weight modifier (if needed)
```javascript
const EVENT_WEIGHTS = {
  // existing...
  'your_event': 1.1,  // Weight multiplier
};
```

### Step 4: Test it
```bash
npm test -- --grep "your_signal"
```

## 🧪 Testing Checklist

Before submitting a pull request, ensure:

### Manual Testing
```bash
# Test new endpoint with cURL
curl -X POST http://localhost:3000/track \
  -H "Content-Type: application/json" \
  -H "x-api-key: qia_demo123456789" \
  -d '{"event": "your_event", "yourSignal": 15}'

# Expected: Score calculated correctly, signals array includes your signal
```

### Code Quality
- [ ] Tested with cURL against `/track` endpoint
- [ ] No hardcoded secrets or API keys
- [ ] `.env` file not committed
- [ ] README updated if API changed
- [ ] Code follows existing style (consistent indentation, naming)
- [ ] No framework dependencies in SDK (`qia-sdk.js`)
- [ ] Comments explain "why", not "what"
- [ ] Performance impact considered (O(n) or better)

### Git Practices
- [ ] Branch created from latest `main`
- [ ] Commits are atomic (one feature per commit)
- [ ] Commit messages follow convention
- [ ] No merge commits (rebase if needed)
- [ ] Branch cleaned up after merge

## 📦 Modifying Core Modules

### `server.js` — Express API & Routes
- Add new endpoints for new functionality
- Keep middleware stack at the top
- Validate all inputs before passing to services

### `apiKey.js` — Key Management
- Both maps must stay synchronized
- Always use O(1) hash lookups, never O(n) loops
- Test key generation for entropy (12 bytes minimum)

### `blockchain.js` — Smart Contract Interface
- Mock mode must behave like production
- Always return proper error handling
- Log all blockchain calls to console

### `qia-sdk.js` — Frontend SDK
- Must remain framework-agnostic (zero dependencies)
- Keep bundle size under 5KB minified
- Graceful error handling for network failures

## 🔐 Security Guidelines

When adding new features:

1. **Input Validation**: Use `express-validator` for all inputs
2. **API Key Handling**: Never log or expose keys in responses
3. **Error Messages**: Don't leak internal details (use generic messages)
4. **Environment Variables**: Use `.env` for all secrets
5. **Rate Limiting**: Add to endpoints that modify state
6. **HTTPS**: Always use HTTPS in production (enforce in middleware)

## 🚨 Common Mistakes to Avoid

❌ **Don't:**
- Add dependencies to `qia-sdk.js`
- Commit `.env` files
- Use `var` (use `const` or `let`)
- Hardcode API keys or secrets
- Remove error handling from async functions
- Change API response format without versioning
- Add blocking operations in hot code paths

✅ **Do:**
- Keep the SDK lightweight and portable
- Use environment variables for configuration
- Write meaningful error messages
- Add comments for complex logic
- Test edge cases (null values, empty arrays, etc.)
- Maintain backward compatibility
- Profile before optimizing

## 📖 Documentation

When adding features, document:

1. **Code comments**: Why the code exists, not what it does
2. **README.md**: Add your feature to the overview
3. **API Reference**: Document new endpoints (request, response, errors)
4. **Environment Variables**: Add to `.env.example` with comments
5. **CONTRIBUTING.md**: Update this file if contribution process changes

### Documentation Format
```markdown
### POST /your-new-endpoint
Short description of what this does.

**Headers:**
- `x-api-key`: Your QIA API key

**Request:**
\`\`\`json
{
  "field1": "value1"
}
\`\`\`

**Response:**
\`\`\`json
{
  "success": true,
  "data": {}
}
\`\`\`

**Error Codes:**
| HTTP | Error | Cause |
|------|-------|-------|
| 400 | Missing field | field1 not provided |
```

## 🔍 Code Review Process

1. **Submit PR** with descriptive title and description
2. **Automated checks**: Linting, tests must pass
3. **Manual review**: Core team reviews code
4. **Changes requested**: Address feedback with new commits
5. **Approval & merge**: Squash merge to main branch

## ❓ Questions or Issues?

- **Questions about contributing**: Open a GitHub Discussion
- **Bug reports**: Open an issue with reproduction steps
- **Feature requests**: Open an issue with use case and design proposal
- **Security concerns**: Email maintainers privately (do not open public issue)

## 📚 Useful Resources

- [Express.js Docs](https://expressjs.com/)
- [ethers.js Documentation](https://docs.ethers.org/)
- [Solidity Documentation](https://docs.soliditylang.org/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)

---

**Thank you for contributing to QIA! Every contribution makes the platform better.** 🎉
