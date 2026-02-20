export const languages = [
  {
    id: 'node',
    name: 'Node.js',
    icon: '🟢',
    defaultPort: 3000,
    dockerfile: `FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]`,
    dockerignore: ['node_modules', 'npm-debug.log', '.env', 'dist', '.git'],
    envVars: { NODE_ENV: 'production', PORT: '3000' },
  },
  {
    id: 'python',
    name: 'Python',
    icon: '🐍',
    defaultPort: 8000,
    dockerfile: `FROM python:3.12-slim
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
EXPOSE 8000
CMD ["python", "main.py"]`,
    dockerignore: ['__pycache__', '*.pyc', '.env', 'venv', '.git'],
    envVars: { PYTHONUNBUFFERED: '1', PORT: '8000' },
  },
  {
    id: 'go',
    name: 'Go',
    icon: '🔵',
    defaultPort: 8080,
    dockerfile: `FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 go build -o main .

FROM alpine:3.19
WORKDIR /app
COPY --from=builder /app/main .
EXPOSE 8080
CMD ["./main"]`,
    dockerignore: ['*.exe', '*.test', '.env', '.git'],
    envVars: { PORT: '8080' },
  },
  {
    id: 'java',
    name: 'Java (Spring)',
    icon: '☕',
    defaultPort: 8080,
    dockerfile: `FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY . .
RUN ./mvnw package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
COPY --from=builder /app/target/*.jar app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]`,
    dockerignore: ['target', '.git', '.env', '*.iml', '.idea'],
    envVars: { SPRING_PROFILES_ACTIVE: 'production', SERVER_PORT: '8080' },
  },
  {
    id: 'php',
    name: 'PHP (Laravel)',
    icon: '🐘',
    defaultPort: 8000,
    dockerfile: `FROM php:8.3-fpm-alpine
WORKDIR /var/www
RUN docker-php-ext-install pdo pdo_mysql
COPY . .
RUN composer install --no-dev --optimize-autoloader
EXPOSE 8000
CMD ["php", "artisan", "serve", "--host=0.0.0.0"]`,
    dockerignore: ['vendor', 'node_modules', '.env', '.git', 'storage/logs'],
    envVars: { APP_ENV: 'production', APP_DEBUG: 'false', APP_PORT: '8000' },
  },
]

export const databases = [
  {
    id: 'postgres',
    name: 'PostgreSQL',
    icon: '🐘',
    image: 'postgres:16-alpine',
    port: '5432:5432',
    envVars: {
      POSTGRES_DB: 'myapp',
      POSTGRES_USER: 'admin',
      POSTGRES_PASSWORD: 'changeme',
    },
    appEnv: {
      DATABASE_URL: 'postgresql://admin:changeme@postgres:5432/myapp',
    },
    volumes: ['postgres_data:/var/lib/postgresql/data'],
    healthcheck: {
      test: ['CMD-SHELL', 'pg_isready -U admin'],
      interval: '10s',
      timeout: '5s',
      retries: 5,
    },
  },
  {
    id: 'mysql',
    name: 'MySQL',
    icon: '🐬',
    image: 'mysql:8.0',
    port: '3306:3306',
    envVars: {
      MYSQL_DATABASE: 'myapp',
      MYSQL_ROOT_PASSWORD: 'rootpass',
      MYSQL_USER: 'admin',
      MYSQL_PASSWORD: 'changeme',
    },
    appEnv: {
      DATABASE_URL: 'mysql://admin:changeme@mysql:3306/myapp',
    },
    volumes: ['mysql_data:/var/lib/mysql'],
    healthcheck: {
      test: ['CMD', 'mysqladmin', 'ping', '-h', 'localhost'],
      interval: '10s',
      timeout: '5s',
      retries: 5,
    },
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: '🍃',
    image: 'mongo:7',
    port: '27017:27017',
    envVars: {
      MONGO_INITDB_ROOT_USERNAME: 'admin',
      MONGO_INITDB_ROOT_PASSWORD: 'changeme',
      MONGO_INITDB_DATABASE: 'myapp',
    },
    appEnv: {
      MONGODB_URI: 'mongodb://admin:changeme@mongo:27017/myapp?authSource=admin',
    },
    volumes: ['mongo_data:/data/db'],
    healthcheck: {
      test: ['CMD', 'mongosh', '--eval', "db.adminCommand('ping')"],
      interval: '10s',
      timeout: '5s',
      retries: 5,
    },
  },
]

export const services = [
  {
    id: 'redis',
    name: 'Redis',
    icon: '🔴',
    image: 'redis:7-alpine',
    port: '6379:6379',
    envVars: {},
    appEnv: { REDIS_URL: 'redis://redis:6379' },
    volumes: ['redis_data:/data'],
    command: 'redis-server --appendonly yes',
    healthcheck: {
      test: ['CMD', 'redis-cli', 'ping'],
      interval: '10s',
      timeout: '5s',
      retries: 5,
    },
  },
  {
    id: 'rabbitmq',
    name: 'RabbitMQ',
    icon: '🐰',
    image: 'rabbitmq:3-management-alpine',
    port: '5672:5672',
    extraPorts: ['15672:15672'],
    envVars: {
      RABBITMQ_DEFAULT_USER: 'admin',
      RABBITMQ_DEFAULT_PASS: 'changeme',
    },
    appEnv: { AMQP_URL: 'amqp://admin:changeme@rabbitmq:5672' },
    volumes: ['rabbitmq_data:/var/lib/rabbitmq'],
    healthcheck: {
      test: ['CMD', 'rabbitmq-diagnostics', '-q', 'ping'],
      interval: '15s',
      timeout: '10s',
      retries: 5,
    },
  },
  {
    id: 'elasticsearch',
    name: 'Elasticsearch',
    icon: '🔍',
    image: 'elasticsearch:8.12.0',
    port: '9200:9200',
    envVars: {
      'discovery.type': 'single-node',
      'xpack.security.enabled': 'false',
      'ES_JAVA_OPTS': '-Xms512m -Xmx512m',
    },
    appEnv: { ELASTICSEARCH_URL: 'http://elasticsearch:9200' },
    volumes: ['es_data:/usr/share/elasticsearch/data'],
    healthcheck: {
      test: ['CMD-SHELL', 'curl -f http://localhost:9200/_cluster/health || exit 1'],
      interval: '15s',
      timeout: '10s',
      retries: 5,
    },
  },
  {
    id: 'nginx',
    name: 'Nginx',
    icon: '🌐',
    image: 'nginx:alpine',
    port: '80:80',
    extraPorts: ['443:443'],
    envVars: {},
    appEnv: {},
    volumes: ['./nginx/nginx.conf:/etc/nginx/nginx.conf:ro'],
    namedVolumes: false,
  },
]
