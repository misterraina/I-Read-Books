-- testing sql query 

SELECT 
    books.id AS book_id,
    books.name AS book_name,
    authors.name AS author_name,
    books.published_date,
    ratings.rating,
    ratings.read_date,
    reviews.review,
    reviews.notes,
    links.amazon_link,
    links.cover_image_api
FROM 
    books
JOIN 
    authors ON books.author_id = authors.id
LEFT JOIN 
    ratings ON books.id = ratings.book_id
LEFT JOIN 
    reviews ON books.id = reviews.book_id
LEFT JOIN 
    links ON books.id = links.book_id
ORDER BY 
    ratings.read_date ASC;



SELECT 
    books.id AS book_id,
    books.name AS book_name,
    authors.name AS author_name,
    books.published_date,
    ratings.rating,
    ratings.read_date,
    reviews.review,
    reviews.notes,
    links.amazon_link,
    links.cover_image_api
FROM 
    books
JOIN 
    authors ON books.author_id = authors.id
LEFT JOIN 
    ratings ON books.id = ratings.book_id
LEFT JOIN 
    reviews ON books.id = reviews.book_id
LEFT JOIN 
    links ON books.id = links.book_id
ORDER BY 
    ratings.rating DESC;



SELECT 
    books.id AS book_id,
    books.name AS book_name,
    authors.name AS author_name,
    books.published_date,
    ratings.rating,
    ratings.read_date,
    reviews.review,
    reviews.notes,
    links.amazon_link,
    links.cover_image_api
FROM 
    books
JOIN 
    authors ON books.author_id = authors.id
LEFT JOIN 
    ratings ON books.id = ratings.book_id
LEFT JOIN 
    reviews ON books.id = reviews.book_id
LEFT JOIN 
    links ON books.id = links.book_id
ORDER BY 
    books.name ASC;
