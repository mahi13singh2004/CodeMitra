# CodeMitra 🚀

An AI-powered Chrome Extension that assists developers during coding interviews on LeetCode. Get instant hints, debug help, code explanations, complexity analysis, and pattern detection - all powered by Google Gemini AI.

![CodeMitra](extension/public/logo.png)

## ✨ Features

### 🎯 Core AI Features
- **💡 Hint** - Get subtle hints without spoiling the solution (1-2 sentences)
- **🐞 Debug** - Identify bugs and logical errors in your code
- **📖 Explain** - Get concise explanations of algorithm logic
- **⚡ Complexity** - Analyze time and space complexity with reasoning
- **🧠 Pattern** - Detect DSA patterns (Two Pointers, Sliding Window, etc.)

### 🔧 Technical Features
- **Auto Problem Detection** - Automatically extracts problem details from LeetCode
- **Language Support** - Detects your coding language (JavaScript, Python, C++, Java, etc.)
- **Redis Caching** - 24-hour cache to reduce API calls and improve response times
- **Rate Limiting** - 20 requests per minute per IP to prevent abuse
- **Markdown Rendering** - Formatted AI responses with code highlighting

## 🏗️ Architecture

### Frontend (Chrome Extension)
```
extension/
├── src/
│   ├── App.jsx              # Main React component (360x300px popup)
│   ├── pages/               # Login, Signup, Home pages
│   ├── content/             # Content script for LeetCode page extraction
│   ├── background/          # Background service worker
│   └── services/            # API client
├── public/
│   └── manifest.json        # Chrome extension manifest
└── dist/                    # Production build
```

### Backend (Node.js + Express)
```
backend/
├── controllers/             # Request handlers
├── services/
│   ├── gemini.service.js   # Google Gemini AI integration
│   ├── ai.service.js       # AI processing with Redis cache
│   └── prompt.service.js   # Optimized prompt templates
├── utils/
│   ├── redis.js            # Redis client configuration
│   └── logger.js           # Pino logger
├── middlewares/
│   └── verifyToken.js      # JWT authentication
└── models/                  # MongoDB schemas
```

## 🔐 Security & Performance

### Authentication
- **JWT Tokens** with automatic rotation
- **Access Token**: 15 minutes expiry
- **Refresh Token**: 7 days expiry
- **HTTP-only cookies** for secure token storage

### Rate Limiting
- **20 requests/minute** per IP address
- Applied to all AI endpoints
- Clear error messages on limit exceeded

### Caching Strategy
- **Redis** caching with 24-hour expiry
- Cache key: `ai:{feature}:{hash(problem+code)}`
- Reduces Gemini API calls by ~80%
- Faster responses (cache: <50ms vs API: 2-5s)

### Security Headers
- **Helmet.js** for security headers
- **CORS** configured for Chrome extension origins
- **HTTPS** enforced in production

## 🛠️ Tech Stack

### Frontend
- React 18
- Vite (Build tool)
- Axios (HTTP client)
- Marked (Markdown rendering)
- Chrome Extension APIs

### Backend
- Node.js + Express
- Google Gemini AI (`@google/genai`)
- Redis (Caching)
- MongoDB + Mongoose (User data)
- Pino (Logging)
- JWT (Authentication)

### DevOps
- **Backend**: Render (Web Service)
- **Redis**: Render (Redis Instance)
- **Database**: MongoDB Atlas
- **Extension**: Chrome Web Store

## 🚀 Getting Started

### Prerequisites
```bash
node >= 18.x
npm >= 9.x
redis-server
```

### Backend Setup
```bash
cd backend
npm install

# Create .env file
PORT=5000
MONGO_URI=your_mongodb_uri
GOOGLE_API_KEY=your_gemini_api_key
REDIS_URL=redis://localhost:6379
ACCESS_TOKEN_SECRET=your_secret
REFRESH_TOKEN_SECRET=your_secret
NODE_ENV=development

# Start Redis
redis-server

# Start backend
npm run dev
```

### Extension Setup
```bash
cd extension
npm install

# Development build
npm run dev

# Production build
npm run build
```

### Load Extension in Chrome
1. Open Chrome → `chrome://extensions`
2. Enable "Developer mode"
3. Click "Load unpacked"
4. Select `extension/dist` folder
5. Pin the extension to toolbar

## 📊 Performance Metrics

### Response Times
- **Without Cache**: 2-5 seconds (Gemini API call)
- **With Cache**: <50ms (Redis)
- **Cache Hit Rate**: ~70-80% after warmup

### Rate Limits
- Gemini API: 60 requests/minute (free tier)
- Backend Rate Limit: 20 requests/minute per IP
- Redis: Sub-millisecond latency

## 🔄 API Endpoints

### AI Features
```
POST /api/ai/hint          # Get hints
POST /api/ai/debug         # Debug code
POST /api/ai/explain       # Explain code
POST /api/ai/complexity    # Analyze complexity
POST /api/ai/pattern       # Detect patterns
```

### Request Format
```json
{
  "title": "Two Sum",
  "description": "Given an array...",
  "code": "function twoSum(nums, target) {...}",
  "language": "javascript"
}
```

### Response Format
```json
{
  "success": true,
  "data": "AI response here"
}
```

## 🎨 UI Design

- **Theme**: Pure black (#000000) with zinc accents
- **Size**: 360x300px optimized popup
- **Font**: Inter
- **Style**: Minimal, developer-focused interface
- **Icons**: Emoji-based for quick recognition

## 📝 Environment Variables

### Backend (.env)
```env
PORT=5000
MONGO_URI=mongodb+srv://...
GOOGLE_API_KEY=your_key
REDIS_URL=redis://localhost:6379
ACCESS_TOKEN_SECRET=secret
REFRESH_TOKEN_SECRET=secret
NODE_ENV=development
```

### Extension (Vite)
```javascript
// Automatically uses:
// Dev: http://localhost:5000/api
// Prod: https://your-backend.onrender.com/api
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Google Gemini AI for powering the intelligence
- LeetCode for the platform
- Render for hosting infrastructure

## 📧 Contact

For issues and questions, please open an issue on GitHub.

---

**Made with ❤️ for developers preparing for coding interviews**
