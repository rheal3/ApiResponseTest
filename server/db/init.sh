#!/bin/bash
set -e
psql -h localhost -v ON_ERROR_STOP=1 --username "postgres" <<-EOSQL
    CREATE USER admin WITH PASSWORD 'purplelobstermountain';
    ALTER USER admin WITH SUPERUSER;
    CREATE DATABASE sc_database;
    GRANT ALL PRIVILEGES ON DATABASE sc_database TO postgres;
EOSQL