
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
('Atomic Habits: An Easy and Proven Way to Build Good Habits and Break Bad Ones', 'James Clear', 2018, '{"Self-help book"}', FALSE, TRUE, FALSE, 'https://upload.wikimedia.org/wikipedia/commons/0/06/Atomic_habits.jpg'),
('Harry Potter and the Sorcerer''s Stone', 'J. K. Rowling', 1997, '{"Novel", "Fantasy Fiction", "High fantasy"}', FALSE, TRUE, FALSE, 'https://media.harrypotterfanzone.com/sorcerers-stone-us-childrens-edition.jpg'),
('Bud, Not Buddy', 'Paul Curtis', 1999, '{"Historical Fiction", "Young Adult Literature", "Historical Novel"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/81iq-CvU+yL._SL1500_.jpg'),
('Hardy Boys 01: the Tower Tresasure', 'Franklin W. Dixon', 1959, '{"Mystery", "Adventure Fiction"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/61UcIuu5CWL._SL1200_.jpg'),
('Can''t Hurt Me: Master Your Mind and Defy the Odds', 'David Goggins ', 2018, '{"Self-help book"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/61pDNU9qEGL._SL1360_.jpg'),
('The Abolition of Man', 'C.S. Lewis', 1947, '{"Action"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/81gdfu+4eSL._SL1500_.jpg'),
('Dark State (Jason Trapp Thriller Book 1)', 'Jack Slater', 2018, '{"Novel", "Fantasy Fiction", "High fantasy"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/813+6qFA5pL._SL1500_.jpg'),
('These Things Happen: A Novel', 'Michael Eon', 2020, '{"Historical Fiction", "Young Adult Literature", "Historical Novel"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/61HC4YG3gkL._SL1500_.jpg'),
('Why the Bible Began: An Alternative History of Scripture and its Origins', 'Jacob L. Wright', 2023, '{"Mystery", "Adventure Fiction"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/518OlZG8iLL.jpg'),
('The Heaven & Earth Grocery Store: A Novel', 'James Mcbride', 2021, '{"Self-help book"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/81iJhMIo2lL._SL1500_.jpg'),
('The Boy From Block 66: A WW2 Jewish Holocaust Survival True Story (Heroic Children of World War II)', 'Limor Regev ', 2023, '{"Self-help book"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/713su0FjhUL._SL1500_.jpg'),
('The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', 2018, '{"Self-help book"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/71sIVAqjlfL._SL1500_.jpg'),
('Familiaris', 'David Wroblewski', 2008, '{"Self-help book"}', FALSE, FALSE, TRUE, 'https://m.media-amazon.com/images/I/81kLU-c9UhL._SL1500_.jpg'),
('Then She Was Gone', 'Lisa Jewell', 2010, '{"Self-help book"}', FALSE, FALSE, TRUE, 'https://m.media-amazon.com/images/I/910nluQF9+L._SL1500_.jpg'),
('The Outsiders', 'S. E. Hinton', 1962, '{"Self-help book"}', FALSE, FALSE, TRUE, 'https://m.media-amazon.com/images/I/71Bg39CmhoL._SL1500_.jpg'),
('The Psychology of Money: Timeless lessons on wealth, greed, and happiness', 'Morgan Housel', 1962, '{"Self-help book"}', FALSE, FALSE, TRUE, 'https://m.media-amazon.com/images/I/71aG0m9XRcL._SL1500_.jpg'),
('Rich Dad Poor Dad', 'Robert T. Kiyosaki ', 2010, '{"Self-help book"}', FALSE, FALSE, TRUE, 'https://m.media-amazon.com/images/I/81BE7eeKzAL._SL1500_.jpg'),
('The Laws of Human Nature', 'Robert Greene', 1962, '{"Self-help book"}', FALSE, FALSE, TRUE, 'https://m.media-amazon.com/images/I/61qfSP-nlXL._SL1500_.jpg'),
('The Power of Discipline', 'S. E. Hinton', 1962, '{"Self-help book"}', FALSE, FALSE, TRUE, 'https://m.media-amazon.com/images/I/6171C0fKEbL._SL1500_.jpg'),
('Read People Like a Book', 'S. E. Hinton', 1962, '{"Self-help book"}', FALSE, FALSE, TRUE, 'https://m.media-amazon.com/images/I/61BqxChoN2L._SL1500_.jpg');

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
('There is some good in this world, and it''s worth fighting for.', 'J.R.R. Tolkien', 'The Two Towers'),
('Beware; for I am fearless, and therefore powerful.', 'Mary Shelley', 'Frankenstein'),
('"Why did you do all this for me?" he asked. "I don''t deserve it. I''ve never done anything for you." "You have been my friend," replied Charlotte. "That in itself is a tremendous thing, Mary Shelley"', 'E.B. White', 'Charlotte''s Web'),
('CIVIL WAR out now! Go watch.', 'A really cool guy', 'A24'),
('Emancipate yourselves from mental slavery, none but ourselves can free our minds.', 'Marcus Garvey', 'The Bible');

CREATE TABLE request (
    id SERIAL PRIMARY KEY,
    book VARCHAR (100)
    author VARCHAR (50),
);


