CREATE TABLE access_token (
    id SERIAL PRIMARY KEY,
    response_ok BOOLEAN,
    time NUMERIC,
    num_items_retrieved INTEGER,
    date_time TIMESTAMP
);
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    response_ok BOOLEAN,
    time NUMERIC,
    num_items_retrieved INTEGER,
    date_time TIMESTAMP
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    response_ok BOOLEAN,
    time NUMERIC,
    num_items_retrieved INTEGER,
    date_time TIMESTAMP
);
CREATE TABLE templates (
    id SERIAL PRIMARY KEY,
    response_ok BOOLEAN,
    time NUMERIC,
    num_items_retrieved INTEGER,
    date_time TIMESTAMP
);
CREATE TABLE inspections (
    id SERIAL PRIMARY KEY,
    response_ok BOOLEAN,
    time NUMERIC,
    num_items_retrieved INTEGER,
    date_time TIMESTAMP
);