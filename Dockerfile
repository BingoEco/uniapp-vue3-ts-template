# 构建阶段 - 使用Node.js 20和pnpm
FROM node:20-alpine AS build-stage

# 安装pnpm
RUN npm install -g pnpm

# 设置工作目录
WORKDIR /app

# 复制包管理相关文件
COPY package.json pnpm-lock.yaml .npmrc ./

# 使用pnpm安装依赖
RUN pnpm install --frozen-lockfile

# 复制项目源代码
COPY . .

# 构建H5版本
RUN pnpm run build:h5

# 生产阶段 - 使用nginx提供静态文件服务
FROM nginx:alpine

# 从构建阶段复制生成的文件
COPY --from=build-stage /app/dist/build/h5/ /usr/share/nginx/html/

# 添加默认的nginx配置以支持SPA路由
RUN cat > /etc/nginx/conf.d/default.conf <<'EOF'
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }

    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg|woff|woff2|ttf)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
EOF

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
