#!/bin/bash

# Install curl
apk --no-cache add curl

# Run Prisma migrations and database synchronization
npm run db:migrate

# Function to check if the WebSocket server is running and close the connection
check_websocket() {
  echo "Checking if WebSocket server is running..."
  response=$(curl -i -N \
    -H "Connection: Upgrade" \
    -H "Upgrade: websocket" \
    -H "Host: websocket:${WSS_PORT}" \
    -H "Origin: http://nextjs-app:${PORT}" \
    -H "Sec-WebSocket-Key: x3JJHMbDL1EzLkh9GBhXDw==" \
    -H "Sec-WebSocket-Version: 13" \
    --max-time 5 \
    http://websocket:${WSS_PORT} 2>/dev/null)

  if echo "$response" | grep -q "101 Switching Protocols"; then
    echo "WebSocket server is running."
    return 0
  else
    echo "WebSocket server is not ready. Retrying in 5 seconds..."
    return 1
  fi
}

# Wait until the WebSocket server is running
until check_websocket; do
  sleep 5
done

# Start the Next.js production server
echo "Starting Next.js server in production mode..."
node server.js
