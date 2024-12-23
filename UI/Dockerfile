# Stage 1: Build the application
FROM node:18-alpine AS build

# Use ARG to accept the build-time variable
ARG SYNCFUSION_LICENSE

# Set the environment variable for use during the build
ENV SYNCFUSION_LICENSE=${SYNCFUSION_LICENSE}

# Set the working directory
WORKDIR /app

# Copy only the necessary files for dependency installation
COPY package.json package-lock.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Activate Syncfusion license
RUN npx syncfusion-license activate

# Unset the sensitive environment variable immediately after use
RUN export SYNCFUSION_LICENSE=""

# Build the application
RUN npm run build


# Stage 2: Runtime image
FROM node:18-alpine

# Set the working directory
WORKDIR /app

# Copy only the necessary build artifacts and files
COPY --from=build /app/package.json /app/package-lock.json ./
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public

# Expose the port
EXPOSE 3000

# Start the application
CMD ["npm", "start"]