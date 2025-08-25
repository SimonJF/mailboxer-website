#!/bin/bash

echo "Starting Mailboxer Website with Docker..."

# Change to the docker directory
cd "$(dirname "$0")"

# Build and start the containers
echo "Building and starting containers..."
docker-compose up --build -d

# Wait for containers to be ready
echo "Waiting for containers to be ready..."
sleep 10

# Check if containers are running
echo "Checking container status..."
docker-compose ps

echo ""
echo "Mailboxer Website is running!"
echo "Open http://localhost:3000 in your browser"
echo ""
echo "Examples are available in the ./examples directory"
echo "Paterl container is ready for Mailboxer analysis commands"
echo ""
echo "Useful commands:"
echo "  - View logs: docker-compose logs -f"
echo "  - Stop: docker-compose down"
echo "  - Restart: docker-compose restart"
echo "  - Execute paterl manually: docker exec -it paterl bash"
