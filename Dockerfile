# ==========================================
# Stage 1: Build Frontend (Vue 3 + Vite)
# ==========================================
FROM node:22-alpine AS build

WORKDIR /app

# Salin manifest dependencies
COPY package.json package-lock.json ./

# Instal dependensi secara clean dan deterministik
RUN npm ci

# Salin seluruh kode sumber proyek
COPY . .

# Jalankan type-check dan build production
RUN npm run build

# ==========================================
# Stage 2: Production Server (Nginx Alpine)
# ==========================================
FROM nginx:alpine AS runner

WORKDIR /usr/share/nginx/html

# Bersihkan file default nginx
RUN rm -rf ./*

# Salin hasil build dist dari build stage
COPY --from=build /app/dist ./

# Konfigurasi Nginx untuk SPA Fallback (mendukung routing /maintenance, /404, dll) serta kompresi Gzip
RUN printf 'server {\n\
    listen 80;\n\
    server_name _;\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    # Gzip Compression\n\
    gzip on;\n\
    gzip_vary on;\n\
    gzip_min_length 1024;\n\
    gzip_proxied any;\n\
    gzip_types text/plain text/css text/xml text/javascript application/x-javascript application/xml application/javascript application/json image/svg+xml;\n\
\n\
    # Cache optimal untuk asset Vite (berisi konten hash)\n\
    location /assets/ {\n\
        expires 1y;\n\
        add_header Cache-Control "public, immutable";\n\
    }\n\
\n\
    # SPA Routing Fallback (mengizinkan akses langsung path seperti /maintenance)\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
\n\
    # Error Page Handling\n\
    error_page 500 502 503 504 /index.html;\n\
}\n' > /etc/nginx/conf.d/default.conf

# Port HTTP
EXPOSE 80

# Jalankan Nginx di foreground
CMD ["nginx", "-g", "daemon off;"]
