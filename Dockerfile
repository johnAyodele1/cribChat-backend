# Use official Node.js LTS image
FROM node:18

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install --production

# Install resend package separately to avoid version issues
# Removed resend install as it was causing issues and is no longer in package.json

# Bundle app source
COPY . .

# Expose port (adjust if your app uses a different port)
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
