CREATE TABLE Books (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    author_id INTEGER NOT NULL REFERENCES Authors(id),
    published_date DATE,
    cover_image TEXT,
    amazon_link TEXT
);
CREATE TABLE Authors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    bio TEXT
);
CREATE TABLE Reviews (
    id SERIAL PRIMARY KEY,
    book_id INTEGER NOT NULL REFERENCES Books(id) ON DELETE CASCADE,
    read_date DATE,
    rating SMALLINT CHECK (rating >= 1 AND rating <= 10),
    review_desc TEXT,
    notes TEXT
);
