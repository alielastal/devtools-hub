# DevTools Hub — خطة العمل التفصيلية

## نظرة عامة

منصة ويب تجمع أدوات تطوير ذكية في مكان واحد — بعضها يعمل بالكامل في المتصفح وبعضها مدعوم بالذكاء الاصطناعي.

---

## الأدوات المختارة للإطلاق الأولي

| # | الأداة | نوعها | تحتاج Backend؟ |
|---|--------|-------|----------------|
| 1 | JSON/YAML Formatter & Converter | Frontend فقط | ❌ لا |
| 2 | Env Generator (Docker Compose) | Frontend فقط | ❌ لا |
| 3 | Error Explainer | AI | ✅ نعم |
| 4 | Log Analyzer | AI | ✅ نعم |

---

## التقنيات المستخدمة (Tech Stack)

### Frontend
- **React 18** + **Vite** (سرعة بناء وتطوير)
- **Tailwind CSS** (تصميم سريع ومتجاوب)
- **Zustand** (إدارة الحالة — أخف من Redux)
- **React Router v6** (التنقل بين الأدوات)
- **Monaco Editor** (محرر أكواد احترافي — نفس محرر VS Code)
- **Recharts** (رسوم بيانية لأداة Log Analyzer)

### Backend
- **Node.js 20+** + **Express** (أو Fastify)
- **express-rate-limit** (حماية من الاستخدام الزائد)
- **Groq SDK** (للتواصل مع نماذج AI المجانية)
- **helmet + cors** (أمان أساسي)
- **PM2** (إدارة العمليات على السيرفر)

### البنية التحتية
- **VPS** (4 vCPU, 8GB RAM, 75GB NVMe)
- **Nginx** (reverse proxy + static files)
- **Let's Encrypt / Certbot** (SSL مجاني)
- **GitHub Actions** (CI/CD — نشر تلقائي)
- **Cloudflare** (DNS + دومين)

---

## هيكل المشروع (Project Structure)

```
devtools-hub/
├── client/                    # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── Navbar.jsx
│   │   │   │   ├── Sidebar.jsx
│   │   │   │   └── Footer.jsx
│   │   │   ├── shared/
│   │   │   │   ├── CodeEditor.jsx      # Monaco wrapper
│   │   │   │   ├── OutputPanel.jsx
│   │   │   │   ├── CopyButton.jsx
│   │   │   │   └── LoadingSpinner.jsx
│   │   │   └── tools/
│   │   │       ├── json-formatter/
│   │   │       │   ├── JsonFormatter.jsx
│   │   │       │   └── useJsonFormatter.js
│   │   │       ├── env-generator/
│   │   │       │   ├── EnvGenerator.jsx
│   │   │       │   ├── StackSelector.jsx
│   │   │       │   └── useEnvGenerator.js
│   │   │       ├── error-explainer/
│   │   │       │   ├── ErrorExplainer.jsx
│   │   │       │   └── useErrorExplainer.js
│   │   │       └── log-analyzer/
│   │   │           ├── LogAnalyzer.jsx
│   │   │           ├── LogChart.jsx
│   │   │           └── useLogAnalyzer.js
│   │   ├── pages/
│   │   │   ├── Home.jsx           # Landing page
│   │   │   ├── ToolPage.jsx       # Wrapper لكل أداة
│   │   │   └── NotFound.jsx
│   │   ├── store/
│   │   │   └── useAppStore.js     # Zustand store
│   │   ├── utils/
│   │   │   ├── api.js             # Axios instance
│   │   │   └── formatters.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── public/
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
│
├── server/                    # Node.js Backend
│   ├── src/
│   │   ├── routes/
│   │   │   ├── errorExplainer.js
│   │   │   └── logAnalyzer.js
│   │   ├── services/
│   │   │   ├── ai.js              # Groq API wrapper
│   │   │   └── logParser.js
│   │   ├── middleware/
│   │   │   ├── rateLimiter.js
│   │   │   └── auth.js            # (مستقبلاً)
│   │   ├── prompts/
│   │   │   ├── errorExplainer.txt
│   │   │   └── logAnalyzer.txt
│   │   ├── utils/
│   │   │   └── logger.js
│   │   └── app.js
│   ├── package.json
│   └── ecosystem.config.js    # PM2 config
│
├── nginx/
│   └── devtools.conf          # Nginx configuration
│
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Actions CI/CD
│
├── docker-compose.yml         # (اختياري — للتطوير المحلي)
└── README.md
```

---

## الخطة الزمنية التفصيلية (4 أسابيع — Full-time)

---

### 📅 الأسبوع 1: البنية التحتية + أداة JSON/YAML Formatter

#### اليوم 1-2: إعداد المشروع
- [ ] إنشاء GitHub repo (monorepo)
- [ ] إعداد React + Vite + Tailwind
- [ ] إعداد Node.js + Express backend
- [ ] إعداد هيكل المجلدات كاملاً
- [ ] إعداد ESLint + Prettier
- [ ] أول commit وتجربة أن كل شي يشتغل محلياً

#### اليوم 3: تصميم Layout الأساسي
- [ ] Navbar (شعار + روابط الأدوات)
- [ ] Sidebar (قائمة الأدوات مع أيقونات)
- [ ] الصفحة الرئيسية (Landing) — تصميم بسيط وجذاب
- [ ] Routing بين الصفحات
- [ ] Dark/Light mode toggle

#### اليوم 4-5: أداة JSON/YAML Formatter
- [ ] محرر كود (Monaco Editor) للإدخال
- [ ] خيارات: Format / Minify / Convert JSON↔YAML
- [ ] عرض النتيجة مع syntax highlighting
- [ ] زر نسخ النتيجة
- [ ] التحقق من صحة JSON مع رسائل خطأ واضحة
- [ ] عرض حجم الملف وعدد المفاتيح
- [ ] اختبار يدوي شامل

#### اليوم 6: إعداد السيرفر (VPS)
- [ ] تثبيت Node.js 20, Nginx, PM2, Certbot
- [ ] إعداد Nginx كـ reverse proxy
- [ ] إعداد SSL بـ Let's Encrypt
- [ ] إعداد GitHub Actions للنشر التلقائي
- [ ] أول deploy — الموقع يعمل على الإنترنت!

---

### 📅 الأسبوع 2: أداة Env Generator + إعداد Backend

#### اليوم 1-3: أداة Env Generator
- [ ] واجهة اختيار الـ Stack:
  - اللغة: Node.js / Python / Go / Java / PHP
  - قاعدة البيانات: PostgreSQL / MySQL / MongoDB / Redis
  - خدمات إضافية: Redis / RabbitMQ / Elasticsearch / Nginx
- [ ] توليد Docker Compose تلقائي بناءً على الاختيارات
- [ ] توليد ملف .env مع المتغيرات المطلوبة
- [ ] توليد .dockerignore
- [ ] معاينة الملفات مع syntax highlighting
- [ ] زر تحميل الملفات كـ ZIP
- [ ] خيار "Copy to clipboard" لكل ملف

#### اليوم 4-5: إعداد Backend لأدوات AI
- [ ] إعداد Express مع middleware أساسي (cors, helmet, compression)
- [ ] إعداد Groq SDK واختبار الاتصال
- [ ] بناء AI service wrapper (يسهّل تبديل الـ provider لاحقاً)
- [ ] إعداد Rate Limiting:
  ```
  بدون تسجيل:  5 طلبات AI / ساعة
  مسجّل مجاني: 20 طلب AI / ساعة
  Pro:          200 طلب AI / ساعة
  ```
- [ ] إعداد Error handling middleware
- [ ] إعداد logging (winston أو pino)

#### اليوم 6: ربط Frontend بـ Backend
- [ ] إعداد Axios instance مع base URL
- [ ] إعداد interceptors للـ errors
- [ ] اختبار الاتصال end-to-end
- [ ] Deploy الـ backend على VPS مع PM2

---

### 📅 الأسبوع 3: Error Explainer + Log Analyzer

#### اليوم 1-3: أداة Error Explainer (AI)
- [ ] واجهة إدخال الـ error (textarea أو Monaco)
- [ ] اختيار اللغة/البيئة (JavaScript, Python, Java, إلخ)
- [ ] Backend endpoint: POST /api/errors/explain
- [ ] Prompt engineering — النموذج يرد بـ:
  - ما هو الخطأ (شرح بسيط)
  - لماذا يحصل (الأسباب الشائعة)
  - كيف تحله (خطوات عملية مع أمثلة كود)
  - روابط مفيدة
- [ ] عرض النتيجة بتنسيق جميل (Markdown rendered)
- [ ] زر "Copy Solution"
- [ ] حالة التحميل (loading state) مع skeleton
- [ ] عرض رسالة واضحة عند تجاوز Rate Limit
- [ ] اختبار مع أنواع مختلفة من الأخطاء

#### اليوم 4-6: أداة Log Analyzer (AI)
- [ ] رفع ملف log أو لصق محتوى مباشرة
- [ ] Backend: تقسيم الملف الكبير لأجزاء قبل إرساله للـ AI
- [ ] Endpoint: POST /api/logs/analyze
- [ ] التحليل يشمل:
  - ملخص عام (عدد الأخطاء، التحذيرات، إلخ)
  - أكثر الأخطاء تكراراً (مع العدد)
  - الأنماط المكتشفة (مثل: أخطاء تزيد كل يوم جمعة)
  - توصيات عملية
- [ ] رسم بياني: توزيع مستويات اللوق (Error/Warn/Info) — Recharts
- [ ] رسم بياني: الأخطاء عبر الزمن (Timeline)
- [ ] جدول بأهم الأخطاء مع عدد التكرار
- [ ] تحديد حجم أقصى للملف (مثلاً 5MB للمجاني)

---

### 📅 الأسبوع 4: التحسين والإطلاق

#### اليوم 1-2: التحسينات العامة
- [ ] تحسين الأداء (lazy loading للأدوات)
- [ ] إضافة SEO أساسي (meta tags, Open Graph)
- [ ] صفحة 404 جميلة
- [ ] رسائل خطأ واضحة وودية للمستخدم
- [ ] Responsive design — اختبار على الموبايل
- [ ] إضافة Plausible أو Umami analytics (مجاني وself-hosted)

#### اليوم 3: الصفحة الرئيسية (Landing Page)
- [ ] Hero section: عنوان جذاب + وصف المنصة
- [ ] عرض الأدوات المتوفرة كـ cards
- [ ] قسم "لماذا هذه المنصة؟" (سريعة، مجانية، بدون تسجيل)
- [ ] قسم "قريباً" (أدوات مستقبلية)
- [ ] Footer مع روابط GitHub و Twitter

#### اليوم 4: التوثيق والـ README
- [ ] كتابة README.md احترافي على GitHub
- [ ] توثيق الـ API endpoints
- [ ] إضافة screenshots للأدوات
- [ ] إضافة Contributing guide (لو تبي open source جزئي)
- [ ] LICENSE file

#### اليوم 5-6: الاختبار النهائي والإطلاق
- [ ] اختبار كامل لكل الأدوات
- [ ] اختبار Rate Limiting
- [ ] اختبار على متصفحات مختلفة
- [ ] تأكد من SSL وأمان Nginx
- [ ] إطلاق! 🚀
- [ ] نشر على:
  - Hacker News (Show HN)
  - Reddit (r/webdev, r/programming)
  - Twitter/X
  - Dev.to (مقال عن بناء المشروع)

---

## تفاصيل إضافية مهمة

### إعداد Nginx

```nginx
server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /etc/letsencrypt/live/yourdomain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/yourdomain.com/privkey.pem;

    # Frontend — ملفات React الثابتة
    location / {
        root /var/www/devtools/client/dist;
        try_files $uri $uri/ /index.html;

        # Cache للملفات الثابتة
        location ~* \.(js|css|png|jpg|svg|ico|woff2)$ {
            expires 30d;
            add_header Cache-Control "public, immutable";
        }
    }

    # Backend API
    location /api/ {
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_cache_bypass $http_upgrade;

        # Rate limiting عام من Nginx
        limit_req zone=api burst=20 nodelay;
    }
}

# Rate limit zone
limit_req_zone $binary_remote_addr zone=api:10m rate=30r/m;
```

### إعداد GitHub Actions (CI/CD)

```yaml
# .github/workflows/deploy.yml
name: Deploy to VPS

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '20'

      - name: Build Frontend
        run: |
          cd client
          npm ci
          npm run build

      - name: Deploy to Server
        uses: appleboy/ssh-action@v1
        with:
          host: ${{ secrets.SERVER_IP }}
          username: ${{ secrets.SERVER_USER }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /var/www/devtools
            git pull origin main
            cd client && npm ci && npm run build
            cd ../server && npm ci
            pm2 restart devtools-api
```

### إعداد Rate Limiting (Express)

```javascript
// server/src/middleware/rateLimiter.js
import rateLimit from 'express-rate-limit';

// للأدوات العادية
export const generalLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,  // 1 ساعة
  max: 60,
  message: { error: 'Too many requests. Please try again later.' }
});

// لأدوات AI — بدون تسجيل
export const aiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: {
    error: 'AI request limit reached.',
    hint: 'Sign up for free to get 20 requests/hour.'
  }
});
```

### إعداد Groq AI Service

```javascript
// server/src/services/ai.js
import Groq from 'groq-sdk';

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

export async function askAI(systemPrompt, userMessage) {
  const response = await groq.chat.completions.create({
    model: 'llama-3.1-70b-versatile',
    messages: [
      { role: 'system', content: systemPrompt },
      { role: 'user', content: userMessage }
    ],
    temperature: 0.3,
    max_tokens: 2000
  });

  return response.choices[0].message.content;
}
```

---

## نموذج الدخل

| الخطة | السعر | المميزات |
|-------|-------|----------|
| مجاني | $0 | كل الأدوات الأساسية + 5 طلبات AI/ساعة |
| Pro | $5/شهر | طلبات AI غير محدودة + حفظ النتائج + بدون إعلانات + API access |
| Team | $15/شهر | كل شي في Pro + مشاركة النتائج + أولوية دعم |

---

## أدوات مستقبلية (بعد الإطلاق)

- Regex Builder (AI-assisted)
- API Tester (مثل Postman مبسط)
- Color Palette Generator
- Cron Expression Builder
- JWT Debugger
- Base64 Encoder/Decoder
- SQL Formatter
- Markdown Preview
- Git Command Builder
- SSH Key Generator

---

## مؤشرات النجاح (KPIs)

| المؤشر | الهدف — شهر 1 | الهدف — شهر 3 |
|--------|---------------|---------------|
| زوار شهريين | 500 | 5,000 |
| مستخدمين مسجلين | 50 | 500 |
| GitHub Stars | 20 | 200 |
| مشتركين Pro | — | 10-20 |
