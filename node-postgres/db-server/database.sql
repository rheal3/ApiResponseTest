CREATE DATABASE sc_database;

-- \c sc_database

CREATE TABLE ${tableName} (
    id SERIAL PRIMARY KEY,
    response_ok BOOLEAN,
    time VARCHAR(30),
    num_items_retrieved INTEGER,
    date_time VARCHAR(30)
);

/* tables: (\dt)
access_token
groups
users
templates
inspections */
