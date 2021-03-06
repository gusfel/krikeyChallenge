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
(as shown is ordered from youngest to oldest, update `LIMIT 10` to `LIMIT 10 ASC` for oldest to youngest)

2. What is the sales total for the author named “Lorelai Gilmore”?
```sql
SELECT
  SUM(sale_items.item_price * sale_items.quantity) as total_sales
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
  2. Run `docker-compose up`

You will then be able to query the server using `localhost:3000`.  
* Use `localhost:3000/author` for a list of the top 10 best selling authors and their total sales. 
* Use `localhost:3000/author?author_name=[author name]` for the total sales of an author.  Try using "Steven King" or "JK Rowling".

## Part 2B: API Performance
In order to optimize performance I added a Node Cache caching system and indexes to the database.  These indexes are in the [schema.sql](https://github.com/gusfel/krikeyChallenge/blob/main/database/schema.sql) file and are automatically added to the database when it is created in step 2 of Part 2A.  
* The cache brings the response time down from around 100ms on the initial request to less than 10ms on subsequent requests.  
* I didn't test response times before adding the indexes to know their effect, but in past projects indexing improved query times dramatically.

## Part 3: Build Docker Container and steps to deploy
Before this project I didn't know how to use Docker so this was a learning experience.  I wasn't able to create an image that could be shared or deployed, but I came pretty close.  I know that with more time I would have been able to create a proper docker image for this database and deploy it on an EC2 instance.
