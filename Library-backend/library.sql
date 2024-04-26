
CREATE TABLE bookInventory (
    id SERIAL PRIMARY KEY,
    name VARCHAR (50),
    author VARCHAR (50),
    yearPublished INTEGER,
    genre TEXT [],
    checkedOut BOOLEAN,
    image VARCHAR(200));


INSERT INTO bookInventory (
    name,
    author,
    yearPublished,
    genre,
    checkedOut,
    image);


VALUES 
('Atomic Habits: An Easy and Proven Way to Build Good Habits and Break Bad Ones', 'James Clear', 2018, '{"Self-help book"}', FALSE, 'https://upload.wikimedia.org/wikipedia/commons/0/06/Atomic_habits.jpg'),
("Harry Potter and the Sorcerer's Stone", 'J. K. Rowling', 1997, '{"Novel", "Fantasy Fiction", "High fantasy"}', FALSE, 'https://media.harrypotterfanzone.com/sorcerers-stone-us-childrens-edition.jpg'),
("Bud, Not Buddy", 'Paul Curtis', 1999, '{"Historical Fiction", "Young Adult Literature", ", "Historical Novel"}', FALSE, 'https://m.media-amazon.com/images/I/81iq-CvU+yL._SL1500_.jpg'),
("Hardy Boys 01: the Tower Tresasure", 'Franklin W. Dixon', 1959, '{"Mystery", "Adventure Fiction"}', FALSE, 'https://m.media-amazon.com/images/I/61UcIuu5CWL._SL1200_.jpg'),
("Can't Hurt Me: Master Your Mind and Defy the Odds", 'David Goggins ', 2018, '{"Self-help book"}', FALSE, 'https://m.media-amazon.com/images/I/61pDNU9qEGL._SL1360_.jpg');
("48 Laws of Power",'Robert Greene',1998, '{"Self-help book"}', FALSE, 'Library-backend/images/48laws.jpg');
("The Art Thief",'Michael Finkel',2023, '{"True Crime", "Travel Literature", "Biography"}', FALSE, 'Library-backend/images/artthief.jpg');
("The Ballad of Songbirds and Snakes",'Suzanna Collins',2020,'{"Science Fiction"}',FALSE,'Library-backend/images/balladofsong.jpg')
("Between the World and Me",'Ta-Nehisi Coates',2015,'{"Autobiography", "American history"}', FALSE,'Library-backend/images/betweenworld.jpg')
("Black Panther",'Ta-Nehisi Coates',2016,'{"Fiction", "Comics"}', FALSE, 'Library-backend/images/blackpanther.jpg');
("Catching Fire", 'Suzanna Collins', 2009,'{"Science Fiction"}', FALSE, 'Library-backend/images/catchingfire.jpg');
("The Lord Of The Rings: The Fellowship of the Ring", 'J. R. R. Tolkien', 1954,'{"Fantasy"}',FALSE,'Library-backend/images/fellowshipofring.jpg');
("HAILE SELASSIE I KING OF KINGS - NEGUS NEGUST",'Faheem Judah-El D.D.', 2019,'{"Autobiography"}',FALSE,'Library-backend/images/haile.jpg');
("The Heaven and Earth Grocery Store",'James McBride',2023,'{"Historical Fiction"}', FALSE,'Library-backend/images/heaven.jpg');
("HOLLY", 'Stephen King',2023, '{"Horror Fiction"}', FALSE, 'Library-backend/images/holly.jpg');
("The Hunger Games", 'Suzanne Collins', 2008, '{"Science Fiction"}',FALSE, 'Library-backend/images/hungergames.jpg');
("Kebre Nagast", 'Nebure Id Ishaq of Aksum/E.A. Wallis Budge', 1317, '{"History"}', FALSE, 'Library-backend/images/kebranagast.jpg');
("To Kill a Mockingbird", 'Harper Lee', 1960, '{Domestic Fiction}', FALSE, 'Library-backend/images/killmocking.jpg');
("The Communist Manifesto", 'Karl Marx & Frederick Engels', 1848,'{"Philosophy"}', FALSE, 'Library-backend/images/manifesto.jpg');
("Adventure of Huckleberry Finn", 'Mark Twain',1884,'{"Adventure Fiction"}', FALSE, 'Library-backend/images/huck.jpg');
("Master and Commander", 'Patrick Obrian', 1969,'{"Sea Novel"}',FALSE,'Library-backend/images/mastercommander.jpg');
("Mockingjay",'Suzanne Collins', 2010, '{"Science Fiction"}', FALSE,'Library-backend/images/mockingjay.jpg');
("The Lord Of The Rings: Return Of The King",'J. R. R. Tolkien',1955,'{"Fantasy"}', FALSE,'Library-backend/images/returnofking.jpg');
("Rich Dad Poor Dad", 'Robert T. Kiyosaki',1997,'{"Non-Fiction"}', FALSE,'Library-backend/images/richdad.jpg');
("The Wager", 'David Grann',2023,'{"True Crime"}',FALSE,'Library-backend/images/thewager.jpg');
("The Lord Of The Rings: The Two Towers",'J. R. R. Tolkien',1954,'{Fantasy}',FALSE,'Library-backend/images/twotowers.jpg');
("The Water Dancer",'Ta-Nehisi Coates',2019,'{"Historical Fiction"}',FALSE,'Library-backend/images/waterdancer.jpg');
("Wellness", 'Nathan Hill',2023,'{"Urban Fiction"}', FALSE,'Library-backend/images/wellness.jpg');
("When The Game Was Ours",'Jackie MacMullan', 2009, '{"Biography"}', FALSE,'Library-backend/images/whenthegame.jpg');


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR (50),
    firstName VARCHAR (50),
    lastName VARCHAR (50),
    age INTEGER,
    administrator BOOLEAN,
    blackList BOOLEAN,
    image VARCHAR(200)
);
INSERT INTO users 
(email, firstName, lastName, age, administrator, blackList, image);
VALUES 
('estradagabe1996@gmail.com', 'Gabe', 'Estrada', 27, TRUE, FALSE, null), 
('diddy@gmail.com', 'Sean', 'Combs', 54, FALSE, TRUE, null);


CREATE TABLE quotes (
    id SERIAL PRIMARY KEY,
    quote VARCHAR (250),
    author VARCHAR (50),
    book VARCHAR (100)
)
INSERT INTO quotes (quotes, author, book)
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
