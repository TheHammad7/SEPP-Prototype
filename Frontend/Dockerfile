# Use the Node.js image
FROM node:18

# Set the working directory
WORKDIR /usr/src/app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY . .

# Build the React application
RUN npm run build

# Expose port 3000
EXPOSE 3000

# Serve the React application
CMD ["npx", "serve", "-s", "build", "-l", "3000"]
