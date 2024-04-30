FROM node:14-alpine
ENV NODE_ENV=production
ARG domain

# Set the working directory
WORKDIR /app

# Install dependencies
RUN apk add screen

# Copy the contents of the current directory to the container
COPY . .

# Run the build script
RUN sh build.sh $domain

# Serve static files
CMD ["npx", "serve", "-s", "dist", "-l", "80"]

# Expose the port
EXPOSE 80
