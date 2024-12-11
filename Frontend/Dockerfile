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

# Expose port 3000
EXPOSE 5173

# Serve the React application
CMD [ "npm", "run", "dev" ]
