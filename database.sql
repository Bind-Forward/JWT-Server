CREATE DATABASE jwttutorialdb;

-- necessary for using uuid
create extension if not exists "uuid-ossp";

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY NOT NULL,
    user_name VARCHAR(255) NOT NULL,
    user_email VARCHAR(255) NOT NULL,
    user_password VARCHAR(255) NOT NULL
);