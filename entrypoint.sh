#!/bin/sh
set -e

# Run Prisma migrations and database synchronization
echo "Running database migrations..."
npm run db:migrate

# Now, execute the command passed to the script.
# This will be the CMD from your Dockerfile (e.g., "npm run start:server").
exec "$@"
