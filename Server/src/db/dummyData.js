const authors = [
    { id: 1, name: 'J.K. Rowling' },
    { id: 2, name: 'George R.R. Martin' },
    { id: 3, name: 'J.R.R. Tolkien' },
    { id: 4, name: 'Agatha Christie' },
    { id: 5, name: 'Stephen King' }
];

const books = [
    { id: 1, name: 'Harry Potter and the Philosopher\'s Stone', author_id: 1, published_date: '1997-06-26' },
    { id: 2, name: 'A Game of Thrones', author_id: 2, published_date: '1996-08-06' },
    { id: 3, name: 'The Hobbit', author_id: 3, published_date: '1937-09-21' },
    { id: 4, name: 'Murder on the Orient Express', author_id: 4, published_date: '1934-01-01' },
    { id: 5, name: 'The Shining', author_id: 5, published_date: '1977-01-28' }
];

const ratings = [
    { id: 1, book_id: 1, rating: 4.75, read_date: '2022-01-15' },
    { id: 2, book_id: 2, rating: 4.50, read_date: '2022-02-20' },
    { id: 3, book_id: 3, rating: 4.80, read_date: '2022-03-25' },
    { id: 4, book_id: 4, rating: 4.60, read_date: '2022-04-10' },
    { id: 5, book_id: 5, rating: 4.70, read_date: '2022-05-05' }
];

const reviews = [
    { id: 1, book_id: 1, review: 'A magical journey that begins with a boy discovering his wizard heritage.', notes: 'Loved the characters and the plot twists.' },
    { id: 2, book_id: 2, review: 'A complex tale of power, politics, and dragons.', notes: 'Great character development and world-building.' },
    { id: 3, book_id: 3, review: 'An adventurous journey of a hobbit on a quest.', notes: 'Timeless classic with a wonderful narrative.' },
    { id: 4, book_id: 4, review: 'A classic whodunit with an unexpected twist.', notes: 'Engaging and well-written mystery.' },
    { id: 5, book_id: 5, review: 'A gripping horror story set in a haunted hotel.', notes: 'Terrifying and compelling.' }
];

const links = [
    { id: 1, book_id: 1, amazon_link: 'https://www.amazon.com/dp/B0192CTMX2', cover_image_api: 'https://api.example.com/covers/harrypotter.jpg' },
    { id: 2, book_id: 2, amazon_link: 'https://www.amazon.com/dp/B000QCS8TW', cover_image_api: 'https://api.example.com/covers/got.jpg' },
    { id: 3, book_id: 3, amazon_link: 'https://www.amazon.com/dp/B002RI9ZY0', cover_image_api: 'https://api.example.com/covers/hobbit.jpg' },
    { id: 4, book_id: 4, amazon_link: 'https://www.amazon.com/dp/B000FC0R8Y', cover_image_api: 'https://api.example.com/covers/orientexpress.jpg' },
    { id: 5, book_id: 5, amazon_link: 'https://www.amazon.com/dp/B0019XK7XA', cover_image_api: 'https://api.example.com/covers/shining.jpg' }
];
