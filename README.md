# krikeyChallenge

## Part 1: SQL Challenge
### Write statements to answer each of the following questions using the following schema:
```sql
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
```
1. Who are the first 10 authors ordered by date_of_birth?
```sql
SELECT
  *  
FROM authors
ORDER BY date_of_birth
LIMIT 10;
```

2. What is the sales total for the author named “Lorelai Gilmore”?
```sql
SELECT
  SUM(sale_items.item_price * sale_items.quantity) as sale_total
FROM authors
LEFT JOIN books on books.author_id = authors.id
LEFT JOIN sale_items on sale_items.book_id = books.id
WHERE authors.name LIKE 'Lorelai Gilmore';
```

3. What are the top 10 performing authors, ranked by sales revenue?
```sql
SELECT
  authors.id,
  authors.name,
  SUM(sale_items.item_price * sale_items.quantity) as total_sales
FROM authors
LEFT JOIN books on books.author_id = authors.id
LEFT JOIN sale_items on sale_items.book_id = books.id
GROUP BY authors.id
ORDER BY sale_total DESC
LIMIT 10;
```
## Part 2A: Write an API Endpoint
In order to start the endpoint locally do the following
  1. Fork then clone the repo to your local computer
  2. Run `npm install`
  3. Run `psql -U [your postgres username] < schema.sql`
  4. Run `npm start`

You will then be able to query the server using `localhost:3000`.  
* Use `localhost:3000/author` for a list of the top 10 best selling authors and their total sales. 
* Use `localhost:3000/author?author_name=[author name]` for the total sales of an author.  Try using "Steven King" or "JK Rowling".

## Part 2B: API Performance
In order to optimize performance I added a Node Cache caching system and indexes to the database.  These indexes are in the [schema.sql](https://github.com/gusfel/krikeyChallenge/blob/main/database/schema.sql) file and are automatically added to the database when it is set up in step 3 of Part 2A.

## Part 3: Build Docker Container and steps to deploy
I currently don't know how to set up Docker images, but know that I could have figured it out if given more time.  I was going to attempt to set up a Dockerfile, but didn't want to give you an complete or incorrect product.
