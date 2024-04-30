# Use a base image
FROM node:14-alpine

ENV NODE_ENV=production
ARG domain

# Set the working directory
WORKDIR /app

# Install dependencies
RUN apk add screen nginx

# Copy the contents of the current directory to the container
COPY . .

# Run the build script
RUN sh build.sh $domain

# Copy dist to nginx
RUN cp -r dist/* /usr/share/nginx/html

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
