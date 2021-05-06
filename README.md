# krikeyChallenge

Part 1: SQL Challenge
Write statements to answer each of the following questions.
1. Who are the first 10 authors ordered by date_of_birth?

SELECT
*
FROM (SELECT
  *
  FROM authors
  LIMIT 10)
ORDER BY date_of_birth;

2. What is the sales total for the author named “Lorelai Gilmore”?
SELECT
SUM(sale_items.item_price * sale_items.quantity) as sale_total
FROM authors
LEFT JOIN books on books.author_id = authors.id
LEFT JOIN sale_items on sale_items.book_id = books.id
WHERE authors.name LIKE 'Lorelai Gilmore';


3. What are the top 10 performing authors, ranked by sales revenue?
SELECT
authors.id,
authors.name,
SUM(sale_items.item_price * sale_items.quantity) as sale_total
FROM authors
LEFT JOIN books on books.author_id = authors.id
LEFT JOIN sale_items on sale_items.book_id = books.id
GROUP BY authors.id
ORDER BY sale_total DESC
LIMIT 10;

Part 2A: Write an API Endpoint

Part 2B: API Performance