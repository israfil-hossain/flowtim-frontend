# ---------- Build Stage ----------
FROM node:18-alpine as build

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./
COPY yarn.lock ./

# Install yarn
RUN npm install -g yarn

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy all project files
COPY . .

# Build arguments for environment variables
ARG VITE_API_BASE_URL
ARG VITE_GA_MEASUREMENT_ID
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_GA_MEASUREMENT_ID=$VITE_GA_MEASUREMENT_ID

# Build the application
RUN yarn build


# ---------- Production Stage ----------
FROM nginx:alpine

# Set working dir inside container
WORKDIR /usr/share/nginx/html

# Copy build output
COPY --from=build /app/dist .

# Copy nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 5173
EXPOSE 5173

# Update nginx default config to listen on 5173 instead of 80
RUN sed -i 's/listen 80;/listen 5173;/' /etc/nginx/conf.d/default.conf

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
