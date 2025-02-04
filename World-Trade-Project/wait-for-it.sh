#!/bin/sh
set -e

host=$(echo $1 | cut -d : -f 1)
port=$(echo $1 | cut -d : -f 2)
shift
cmd="$@"

until PGPASSWORD=$DB_PASS psql -h "$host" -p "$port" -U "$DB_USER" -d "$DB_NAME" -c '\q'; do
  >&2 echo "Postgres is unavailable - sleeping"
  sleep 1
done

>&2 echo "Postgres is up - executing command"
exec $cmd