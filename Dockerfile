FROM node:22-alpine AS build

# Set our working directory
WORKDIR /app

# Copy package files to install node modules
COPY package.json package-lock.json ./

# Install node modules including dev-dependencies
RUN npm ci

# Copy our source code files
COPY . .

# Build app
RUN npm run build

FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]