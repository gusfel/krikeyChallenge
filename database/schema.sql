DROP DATABASE IF EXISTS author_sales;

CREATE DATABASE author_sales;

\c author_sales;

CREATE TABLE authors (
  id serial PRIMARY KEY,
  name text,
  date_of_birth timestamp
);

CREATE TABLE books (
  id serial PRIMARY KEY,
  author_id integer REFERENCES authors (id),
  isbn text
);

CREATE TABLE sale_items (
  id serial PRIMARY KEY,
  book_id integer REFERENCES books (id),
  customer_name text,
  item_price money,
  quantity integer
);

\copy authors(name, date_of_birth) FROM '/var/lib/postgresql/newdata/pgdata/authors.csv' DELIMITER ',' CSV HEADER;

\copy books(author_id, isbn) FROM '/var/lib/postgresql/newdata/pgdata/books.csv' DELIMITER ',' CSV HEADER;

\copy sale_items(book_id, customer_name, item_price, quantity) FROM '/var/lib/postgresql/newdata/pgdata/sale_items.csv' DELIMITER ',' CSV HEADER;

CREATE INDEX author_index ON authors (name);
CREATE INDEX book_index ON books (author_id);
CREATE INDEX sale_index ON sale_items (book_id);