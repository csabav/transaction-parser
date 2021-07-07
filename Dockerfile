FROM node:16-alpine

# Create app dicrectory
RUN mkdir /src

# Change dir context
WORKDIR /src

# Copy source code into the container
COPY src/ .

# Install app dependencies
RUN npm install

# Start the application
CMD ["npm", "run", "start"]