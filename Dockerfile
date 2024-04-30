# Use a base image
FROM node:14-alpine

ENV NODE_ENV=production
ARG domain

# Set the working directory
WORKDIR /app

# Install dependencies (screen)
RUN apk add screen

# Copy the contents of the current directory to the container
COPY . .

# Run the build script
RUN sh build.sh $domain

# Set the default command to serve the website
CMD ["sh", "-c", "cd /app/dist && npx http-server -p 80"]
