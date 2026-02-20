# DevTools Hub

A collection of **14 developer tools** in one place — free, fast, and open source.

Built with React 18, Vite, Tailwind CSS v4, and Express 5.

## Tools

| Tool | Description | Type |
|------|-------------|------|
| **JSON / YAML Formatter** | Format, minify, and convert between JSON & YAML | Frontend |
| **Env Generator** | Generate Docker Compose, .env, and Dockerfile for your stack | Frontend |
| **Error Explainer** | Paste any error and get an AI-powered explanation with fix | AI |
| **Log Analyzer** | Upload logs for AI analysis, patterns, and charts | AI |
| **Regex Builder** | Build and test regex with real-time highlighting | Frontend |
| **API Health Checker** | Check endpoints — status, response time, headers, body | Backend |
| **Base64 Encoder/Decoder** | Encode text to Base64 or decode back | Frontend |
| **JWT Debugger** | Decode JWT tokens — header, payload, expiry status | Frontend |
| **Hash Generator** | Generate SHA-1, SHA-256, SHA-384, SHA-512 hashes | Frontend |
| **Color Converter** | Convert between HEX, RGB, HSL with live preview | Frontend |
| **Timestamp Converter** | Convert Unix timestamps to dates and vice versa | Frontend |
| **URL Encoder/Decoder** | Encode or decode URL components | Frontend |
| **Diff Viewer** | Compare two texts with highlighted differences | Frontend |
| **Markdown Preview** | Write Markdown with live side-by-side preview | Frontend |

## Tech Stack

**Client:**
- React 18 + Vite
- Tailwind CSS v4
- Zustand (state management)
- Monaco Editor (code editing)
- Recharts (charts)
- React Router v6

**Server:**
- Express 5
- OpenRouter AI (free model)
- SSE streaming for real-time AI responses
- Rate limiting with express-rate-limit

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/alielastal/devtools-hub.git
cd devtools-hub

# Install all dependencies
npm install
cd client && npm install && cd ..
cd server && npm install && cd ..
```

### Environment Variables

Create `server/.env`:

```env
PORT=3002
OPENROUTER_API_KEY=your_openrouter_api_key
NODE_ENV=development
```

Get a free API key from [OpenRouter](https://openrouter.ai/).

### Run

```bash
# Run both client and server
npm run dev

# Or run separately
npm run dev:client   # http://localhost:5173
npm run dev:server   # http://localhost:3002
```

## Project Structure

```
devtools-hub/
├── client/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/          # Navbar, Sidebar, Footer
│   │   │   ├── shared/          # CodeEditor, CopyButton, LoadingSpinner
│   │   │   └── tools/           # 14 tool components
│   │   ├── pages/               # Home, NotFound
│   │   ├── store/               # Zustand store
│   │   └── utils/               # API helpers, formatters
│   └── vite.config.js
├── server/
│   ├── src/
│   │   ├── routes/              # errorExplainer, logAnalyzer, apiChecker
│   │   ├── services/            # AI service (OpenRouter)
│   │   ├── middleware/          # Rate limiter
│   │   └── app.js
│   └── .env
└── package.json
```

## Features

- **Dark Mode** — Toggle between light and dark themes
- **Lazy Loading** — Each tool loads on demand for fast initial load
- **AI Streaming** — Real-time SSE streaming for AI responses
- **Responsive** — Works on desktop and mobile
- **No Tracking** — Privacy-friendly, no analytics or cookies

## License

MIT

## Author

**Ali Elastal** — [@alielastal](https://github.com/alielastal)
