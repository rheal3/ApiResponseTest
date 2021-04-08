CREATE TABLE access_token (
    id SERIAL PRIMARY KEY,
    response_ok BOOLEAN,
    time NUMERIC,
    num_items_retrieved INTEGER,
    date_time VARCHAR(30)
);
CREATE TABLE groups (
    id SERIAL PRIMARY KEY,
    response_ok BOOLEAN,
    time NUMERIC,
    num_items_retrieved INTEGER,
    date_time VARCHAR(30)
);
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    response_ok BOOLEAN,
    time NUMERIC,
    num_items_retrieved INTEGER,
    date_time VARCHAR(30)
);
CREATE TABLE templates (
    id SERIAL PRIMARY KEY,
    response_ok BOOLEAN,
    time NUMERIC,
    num_items_retrieved INTEGER,
    date_time VARCHAR(30)
);
CREATE TABLE inspections (
    id SERIAL PRIMARY KEY,
    response_ok BOOLEAN,
    time NUMERIC,
    num_items_retrieved INTEGER,
    date_time VARCHAR(30)
);