# Get the official Node.js image from the Docker Hub with the same version as the one we used locally
FROM node:20.9.0

# Set the working directory in the container to /app
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the dependencies
RUN npm install --only=production

# Copy the rest of the application code to the container
COPY . .

# Build the application from TypeScript to JavaScript
RUN npm run build

# Expose the port the app runs in
EXPOSE 3000

# Comando por defecto para correr la app
CMD ["npm", "run", "start:prod"]
