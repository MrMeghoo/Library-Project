
CREATE TABLE bookInventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR (150),
    author VARCHAR (50),
    yearPublished INTEGER,
    genre TEXT [],
    checkedOut BOOLEAN,
    trending BOOLEAN,
    staffPick BOOLEAN,
    image VARCHAR(200));



INSERT INTO bookInventory (
    name,
    author,
    yearPublished,
    genre,
    checkedOut,
    trending, 
    staffPick,
    image)
VALUES 

('Atomic Habits: An Easy and Proven Way to Build Good Habits and Break Bad Ones', 'James Clear', 2018, '{"Self-help book"}', FALSE, 'https://upload.wikimedia.org/wikipedia/commons/0/06/Atomic_habits.jpg'),
('Harry Potter and the Sorcerer''s Stone', 'J. K. Rowling', 1997, '{"Novel", "Fantasy Fiction", "High fantasy"}', FALSE, 'https://media.harrypotterfanzone.com/sorcerers-stone-us-childrens-edition.jpg'),
('Bud, Not Buddy', 'Paul Curtis', 1999, '{"Historical Fiction", "Young Adult Literature", "Historical Novel"}', FALSE, 'https://m.media-amazon.com/images/I/81iq-CvU+yL._SL1500_.jpg'),
('Hardy Boys 01: the Tower Tresasure', 'Franklin W. Dixon', 1959, '{"Mystery", "Adventure Fiction"}', FALSE, 'https://m.media-amazon.com/images/I/61UcIuu5CWL._SL1200_.jpg'),
('Can''t Hurt Me: Master Your Mind and Defy the Odds', 'David Goggins ', 2018, '{"Self-help book"}', FALSE, 'https://m.media-amazon.com/images/I/61pDNU9qEGL._SL1360_.jpg'),
('Test book 1', 'James Clear', 2018, '{"Self-help book"}', FALSE, 'https://upload.wikimedia.org/wikipedia/commons/0/06/Atomic_habits.jpg'),
('test book 2', 'Gabe Estrada', 1997, '{"Novel", "Fantasy Fiction", "High fantasy"}', FALSE, 'https://media.harrypotterfanzone.com/sorcerers-stone-us-childrens-edition.jpg'),
('test book 3', 'Paul Curtis', 1999, '{"Historical Fiction", "Young Adult Literature", "Historical Novel"}', FALSE, 'https://m.media-amazon.com/images/I/81iq-CvU+yL._SL1500_.jpg'),
('test book 4', 'Franklin W. Dixon', 1959, '{"Mystery", "Adventure Fiction"}', FALSE, 'https://m.media-amazon.com/images/I/61UcIuu5CWL._SL1200_.jpg'),
('test book 5', 'David Goggins ', 2018, '{"Self-help book"}', FALSE, 'https://m.media-amazon.com/images/I/61pDNU9qEGL._SL1360_.jpg');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email UNIQUE VARCHAR (100),
    firstName VARCHAR (50),
    lastName VARCHAR (50),
    age INTEGER,
    administrator BOOLEAN,
    blackList BOOLEAN,
    image VARCHAR(200)
);
INSERT INTO users 
(email, firstName, lastName, age, administrator, blackList, image)
VALUES 
('estradagabe1996@gmail.com', 'Gabe', 'Estrada', 27, TRUE, FALSE, null), 
('diddy@gmail.com', 'Sean', 'Combs', 54, FALSE, TRUE, null);

CREATE TABLE quotes (
    id SERIAL PRIMARY KEY,
    quote VARCHAR (250),
    author VARCHAR (50),
    book VARCHAR (100)
);

INSERT INTO quotes (quote, author, book)
VALUES

("There is some good in this world, and it’s worth fighting for.", 'J.R.R. Tolkien', 'The Two Towers'),
("Beware; for I am fearless, and therefore powerful.", "Mary Shelley", "Frankenstein"),
(`Why did you do all this for me?’ he asked. ‘I don’t deserve it. I’ve never done anything for you.’ ‘You have been my friend,’ replied Charlotte. ‘That in itself is a tremendous thing", "Mary Shelley"`, "E.B. White", "Charlotte’s Web");




CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email UNIQUE VARCHAR (100),
    firstName VARCHAR (50),
    lastName VARCHAR (50),
    password VARCHAR (250),
    age INTEGER,
    administrator BOOLEAN,
    blackList BOOLEAN,
    image VARCHAR(200)
);
