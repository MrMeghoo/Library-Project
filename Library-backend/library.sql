
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
('Read People Like a Book', 'S. E. Hinton', 1962, '{"Self-help book"}', FALSE, FALSE, TRUE, 'https://m.media-amazon.com/images/I/61BqxChoN2L._SL1500_.jpg'),
('48 Laws of Power' ,'Robert Greene',1998, '{"Self-help book"}', FALSE, FALSE, TRUE, 'https://m.media-amazon.com/images/I/611X8GI7hpL._SL1500_.jpg'),
('The Art Thief' ,'Michael Finkel',2023, '{"True Crime", "Travel Literature", "Biography"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/91sK3iM0erL._SL1500_.jpg'),
('The Ballad of Songbirds and Snakes','Suzanna Collins',2020,'{"Science Fiction"}', FALSE, FALSE, TRUE,'https://m.media-amazon.com/images/I/81VTcDINw-L._SL1500_.jpg'),
('Between the World and Me','Ta-Nehisi Coates',2015,'{"Autobiography", "American history"}', FALSE, TRUE, FALSE,'https://m.media-amazon.com/images/I/41HyQ8cWOQL.jpg'),
('Black Panther','Ta-Nehisi Coates',2016,'{"Fiction", "Comics"}', FALSE, FALSE, TRUE, 'https://m.media-amazon.com/images/I/91VAyi0CDNL._SL1500_.jpg'),
('Catching Fire', 'Suzanna Collins', 2009,'{"Science Fiction"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/61Gs9LIHu8L._SL1200_.jpg'),
('The Lord Of The Rings: The Fellowship of the Ring', 'J. R. R. Tolkien', 1954,'{"Fantasy"}',FALSE, FALSE, TRUE,'https://m.media-amazon.com/images/I/813UBZ-O8sL._SL1500_.jpg'),
('HAILE SELASSIE I KING OF KINGS - NEGUS NEGUST','Faheem Judah-El D.D.', 2019,'{"Autobiography"}', FALSE, TRUE, FALSE,'https://m.media-amazon.com/images/I/71yTo34afVL._SL1360_.jpg'),
('HOLLY', 'Stephen King',2023, '{"Horror Fiction"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/81ziAWos7cL._SL1500_.jpg'),
('The Hunger Games', 'Suzanne Collins', 2008, '{"Science Fiction"}',FALSE,  FALSE, TRUE,'https://m.media-amazon.com/images/I/917FQerThOL._SL1500_.jpg'),
('Kebre Nagast', 'Nebure Id Ishaq of Aksum/E.A. Wallis Budge', 1317, '{"History"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/71k9zlFpoDL._SL1500_.jpg'),
('To Kill a Mockingbird', 'Harper Lee', 1960, '{Domestic Fiction}', FALSE, FALSE, TRUE, 'https://m.media-amazon.com/images/I/71HZbA0WscL._SL1500_.jpg'),
('The Communist Manifesto', 'Karl Marx & Frederick Engels', 1848,'{"Philosophy"}', FALSE, TRUE, FALSE, 'https://m.media-amazon.com/images/I/81kYqQgK0sL._SL1500_.jpg'),
('Adventure of Huckleberry Finn', 'Mark Twain',1884,'{"Adventure Fiction"}', FALSE, FALSE, TRUE, 'https://m.media-amazon.com/images/I/91yLxd90MiL._SL1500_.jpg'),
('Master and Commander', 'Patrick Obrian', 1969,'{"Sea Novel"}', FALSE, TRUE, FALSE,'https://m.media-amazon.com/images/I/617fpGVAE-L._SL1498_.jpg'),
('Mockingjay','Suzanne Collins', 2010, '{"Science Fiction"}', FALSE, FALSE, TRUE,'https://m.media-amazon.com/images/I/71bTHNYrUEL._SL1500_.jpg'),
('The Lord Of The Rings: Return Of The King','J. R. R. Tolkien',1955,'{"Fantasy"}', FALSE, TRUE, FALSE,'https://m.media-amazon.com/images/I/61EfM8dbPiL._SL1500_.jpg'),
('Rich Dad Poor Dad', 'Robert T. Kiyosaki',1997,'{"Non-Fiction"}', FALSE, FALSE, TRUE,'https://m.media-amazon.com/images/I/61SKDSGrRbL._SL1000_.jpg'),
('The Wager', 'David Grann',2023,'{"True Crime"}', FALSE, TRUE,FALSE,'https://m.media-amazon.com/images/I/818st54PZhL._SL1500_.jpg'),
('The Lord Of The Rings: The Two Towers','J. R. R. Tolkien',1954,'{Fantasy}',FALSE, FALSE, TRUE,'https://m.media-amazon.com/images/I/712Itp2Zh7L._SL1360_.jpg'),
('The Water Dancer','Ta-Nehisi Coates',2019,'{"Historical Fiction"}', FALSE, TRUE, FALSE,'https://m.media-amazon.com/images/I/61AiILuAb9L._SL1200_.jpg'),
('Wellness', 'Nathan Hill',2023,'{"Urban Fiction"}', FALSE, FALSE, TRUE,'https://m.media-amazon.com/images/I/719fGkapMaS._SL1500_.jpg'),
('When The Game Was Ours','Jackie MacMullan', 2009, '{"Biography"}', FALSE, TRUE, FALSE,'https://m.media-amazon.com/images/I/812cG21+obL._SL1200_.jpg');

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR (100) UNIQUE,
    password VARCHAR (100),
    firstName VARCHAR (50),
    lastName VARCHAR (50),
    age INTEGER,
    password VARCHAR (250) UNIQUE,
    administrator BOOLEAN,
    blackList BOOLEAN,
    image VARCHAR(200)
);
INSERT INTO users 
(email, password, firstName, lastName, age, administrator, blackList, image)
VALUES 
('estradagabe1996@gmail.com', '123', 'Gabe', 'Estrada', 27, TRUE, FALSE, null), 
('diddy@gmail.com', '123', 'Sean', 'Combs', 54, FALSE, TRUE, null);

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

CREATE TABLE request (
    id SERIAL PRIMARY KEY,
    name VARCHAR (150),
    author VARCHAR (50)
);