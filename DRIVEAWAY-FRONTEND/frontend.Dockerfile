# Stage 1: Build
FROM node:22-alpine AS build
WORKDIR /app

# Accept build arguments
ARG VITE_API_URL
ARG VITE_RAZORPAY_KEY

# Set them as env so React can read during build
ENV VITE_API_URL=$VITE_API_URL
ENV VITE_RAZORPAY_KEY=$VITE_RAZORPAY_KEY

COPY package*.json ./
RUN npm install --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Serve production
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
