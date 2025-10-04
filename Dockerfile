# 构建阶段 - 使用Node.js 20和pnpm
FROM node:20-alpine as build-stage

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
RUN echo "server {" > /etc/nginx/conf.d/default.conf && \
    echo "    listen 80;" >> /etc/nginx/conf.d/default.conf && \
    echo "    server_name localhost;" >> /etc/nginx/conf.d/default.conf && \
    echo "    location / {" >> /etc/nginx/conf.d/default.conf && \
    echo "        root /usr/share/nginx/html;" >> /etc/nginx/conf.d/default.conf && \
    echo "        index index.html;" >> /etc/nginx/conf.d/default.conf && \
    echo "        try_files \$uri \$uri/ /index.html;" >> /etc/nginx/conf.d/default.conf && \
    echo "    }" >> /etc/nginx/conf.d/default.conf && \
    echo "    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {" >> /etc/nginx/conf.d/default.conf && \
    echo "        root /usr/share/nginx/html;" >> /etc/nginx/conf.d/default.conf && \
    echo "        expires 1y;" >> /etc/nginx/conf.d/default.conf && \
    echo "        add_header Cache-Control \"public, immutable\";" >> /etc/nginx/conf.d/default.conf && \
    echo "    }" >> /etc/nginx/conf.d/default.conf && \
    echo "}" >> /etc/nginx/conf.d/default.conf

# 暴露端口
EXPOSE 80

# 启动nginx
CMD ["nginx", "-g", "daemon off;"]
