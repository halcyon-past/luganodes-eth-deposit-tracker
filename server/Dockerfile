# Use Node.js LTS as the base image
FROM node:18

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy the package.json and package-lock.json
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose the port that the backend server will run on
EXPOSE 5000

# Start the backend server
CMD ["npm", "start"]
