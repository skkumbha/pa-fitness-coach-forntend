# ---------- Build stage ----------
    FROM node:18-alpine AS builder
    WORKDIR /app
    
    
    COPY package*.json ./
    COPY .env .env
    COPY .env.docker .env.docker
    COPY . .
    
    RUN npm install
    RUN npm run build
    
    # ---------- Nginx serve stage ----------
    FROM nginx:alpine
    COPY --from=builder /app/dist /usr/share/nginx/html
    EXPOSE 80
    CMD ["nginx", "-g", "daemon off;"]