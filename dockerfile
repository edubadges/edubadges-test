# Use Microsoft's Playwright image with Node.js
FROM mcr.microsoft.com/playwright:v1.50.1-noble

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy the rest of the application
COPY . .

# Create directories for test results and screenshots
RUN mkdir -p test-results playwright-report

# Set environment variable to indicate we're in CI
ENV CI=true

# Default command runs the tests
CMD ["npm", "run", "snapshot"]
