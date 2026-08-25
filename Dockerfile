# Stage 1: Dependencies
FROM node:22-alpine AS dependencies

WORKDIR /app

# Chỉ copy các file package.json và package-lock.json
COPY package*.json ./

# không dùng npm install
# Dùng npm clean install vì bắt buộc cài đúng version trong lock file
# Tránh việc trong file package.json có dấu "^" khiến version mỗi lần build không cố định
RUN npm install

# Stage 2: Builder
FROM node:22-alpine AS builder

WORKDIR /app

ARG NEXT_PUBLIC_API_URL=https://api.naho.io.vn/api/v1
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

# Copy node modules từ stage trước
COPY --from=dependencies /app/node_modules ./node_modules

# Copy src code
# Nên có file .dockerignore để tránh copy các file thừa
COPY . .

# Sau khi build, nextjs sẽ tạo
#.next/
# ├── standalone
# ├── static
RUN npm run build

# Stage 3: Runner
FROM node:22-alpine AS runner

WORKDIR /app

# Tạo non-root user
RUN addgroup -S nextjs \
    && adduser -S nextjs -G nextjs

# Bật production
ENV NODE_ENV=production
ENV PORT=3000

# Copy src sang destination đồng thời đổi owner từ root -> user nextjs, group nextjs
COPY --from=builder --chown=nextjs:nextjs /app/public ./public
COPY --from=builder --chown=nextjs:nextjs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nextjs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3636

# Khi container start, chạy câu lệnh node server.js
CMD ["node", "server.js"]