FROM node:24.14.0

WORKDIR /app

# Copy package files first to leverage Docker layer caching
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the source code
COPY . . 

EXPOSE 5000

CMD ["npm", "run", "dev"]
