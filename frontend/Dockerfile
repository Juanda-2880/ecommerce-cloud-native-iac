FROM node:24.14.0 AS build

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies (this includes vite)
RUN npm install

# Copy the rest of the source code
COPY . .

# Now run the build
RUN npm run build

# Second stage: serve with nginx
FROM nginx:alpine

# Vite builds to 'dist' by default, not 'build'
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
