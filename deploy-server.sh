#!/bin/bash

# Load environment variables from .env file if it exists
if [ -f .env ]; then
    echo "Loading environment variables from .env file"
    source .env
else
    echo ".env file not found, skipping"
fi

# This is the internal port
export POSTGRES_PORT="5432"
echo "Exporting POSTGRES_PORT to $POSTGRES_PORT"

# Set PostgreSQL host
export POSTGRES_HOST="db"
echo "PostgreSQL host set to $POSTGRES_HOST"

# Set the PostgreSQL DATABASE_URL
export DATABASE_URL="postgresql://$POSTGRES_USER:$POSTGRES_PASSWORD@$POSTGRES_HOST:$POSTGRES_PORT/$POSTGRES_DB"
echo "Database URL set to $DATABASE_URL"

export PORT=${PORT:-3000}
# Wait for PostgreSQL to be ready
echo "Waiting for `$POSTGRES_HOST` to come up..."
until nc -z $POSTGRES_HOST 5432; do
    echo "Waiting for database connection..."
    sleep 1
done
echo "Database is up, proceeding with setup..."

# Run Prisma migrations and database synchronization
npx prisma migrate deploy
npx prisma db push --skip-generate

# Start the Next.js production server
echo "Starting Next.js server in production mode..."
node server.js
