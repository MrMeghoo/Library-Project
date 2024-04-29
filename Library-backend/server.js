
const { kMaxLength } = require('buffer');
const express = require('express')
const path = require('path');
const pgp = require('pg-promise')();
const winston = require('winston')
const cors = require('cors');const swaggerUI=require('swagger-ui-express');
const app = express()
const db = pgp('postgres://avdxxhsq:Ngu7xpaEW3m4SGx0lWBeOln7iq_WErpE@ziggy.db.elephantsql.com/avdxxhsq')
const bcrypt = require('bcrypt');
const { name } = require('ejs');
const initializePassport = require('./passport-config')
const flash =require('express-flash')
const session = require('express-session')
const passport = require('passport')
bodyParser = require("body-parser"),
swaggerJsdoc = require("swagger-jsdoc"),
swaggerUi = require("swagger-ui-express");




initializePassport(
    passport,
    email => db.oneOrNone('SELECT * FROM users WHERE email = $1',email),
    id => db.oneOrNone('SELECT * FROM users WHERE id = $1', id)
);




app.use(express.static(path.join(__dirname,'../Library-frontend')))
app.use(flash())
app.use(session({
    secret:
     'mysecret',
    resave: false, // We wont resave the session variable if nothing is changed
    saveUninitialized: false,
    cookie: {
        maxAge: 60000 * 60
    }
}));
app.use(passport.initialize())
app.use(passport.session())

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

app.use(express.json());
app.use(cors());


const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
      // - Write all logs with importance level of `error` or less to `error.log`
      // - Write all logs with importance level of `info` or less to `combined.log`
      new winston.transports.File({ filename: 'error.log', level: 'error' }),
      new winston.transports.File({ filename: 'combined.log' }),
    ],
});


function clientError(req, message, errorCode){
    logger.log({
        level: 'info',
        endpoint: req.path,
        method: req.method,
        query: req.query,
        path_parameters: req.params,
        body: req.body,
        ip: req.ip,
        error: errorCode,
        message: message,
        timestamp: new Date()
    })
}

app.all('/*', (req, res, next)=>{
    logger.log({
        level: 'info',
        endpoint: req.path,
        method: req.method,
        query: req.query,
        path_parameters: req.params,
        body: req.body,
        ip: req.ip,
        timestamp: new Date()
    });
    next()
})

// ___________________________________________________________________________________________

// endpoint to get all books 
app.get('/library', async (req,res) =>{
    console.log(req.session)
    // Check to makes sure theres nothing in the body
    if(Object.keys(req.body).length != 0) {
        clientError(req, "Request body is not permitted", 400)
        res.status(400).json({error: "Request body is not permitted"});
    } 
    // check to make sure theres queries 
    else if(Object.keys(req.query).length != 0){ 
        clientError(req, "Query Parameters do not meet requirements", 400);
        res.status(400).json({error: "Query Parameters do not meet requirements"});
    } else {
        let allBooks = await db.any('SELECT * FROM bookInventory');
        res.json(allBooks); 
    }
})

// endpoint to get trending books
app.get('/library/trending', async (req,res) =>{
    
    if(Object.keys(req.body).length != 0) {
        clientError(req, "Request body is not permitted", 400)
        res.status(400).json({error: "Request body is not permitted"});
    } 
    // check to make sure theres queries 
    else if(Object.keys(req.query).length != 0){ 
        clientError(req, "Query Parameters do not meet requirements", 400);
        res.status(400).json({error: "Query Parameters do not meet requirements"});
    } else {
    let allBooks = await db.any('SELECT * FROM bookInventory WHERE bookInventory.trending = true ORDER BY RANDOM() LIMIT 9');
    res.json(allBooks); 
    } 
})

// endpoint to get rando staff picks 
app.get('/library/staffPick', async (req,res) =>{
    if(Object.keys(req.body).length != 0) {
        clientError(req, "Request body is not permitted", 400)
        res.status(400).json({error: "Request body is not permitted"});
    } 
    // check to make sure theres queries 
    else if(Object.keys(req.query).length != 0){ 
        clientError(req, "Query Parameters do not meet requirements", 400);
        res.status(400).json({error: "Query Parameters do not meet requirements"});
    } else {
    let allBooks = await db.any('SELECT * FROM bookInventory WHERE bookInventory.staffPick = true ORDER BY RANDOM() LIMIT 9');
    res.json(allBooks);  
    }
})

// endpoint to get users
app.get('/users', async function(req,res){
    if(Object.keys(req.body).length != 0) {
        clientError(req, "Request body is not permitted", 400)
        res.status(400).json({error: "Request body is not permitted"});
    } 
    // check to make sure theres queries 
    else if(Object.keys(req.query).length != 0){ 
        clientError(req, "Query Parameters do not meet requirements", 400);
        res.status(400).json({error: "Query Parameters do not meet requirements"});
    } else {
    let allUsers = await db.many('SELECT * FROM users');
    res.json(allUsers);
    }
})

// endpoint to get quotes
app.get('/quotes', async function(req,res){
    if(Object.keys(req.body).length != 0) {
        clientError(req, "Request body is not permitted", 400)
        res.status(400).json({error: "Request body is not permitted"});
    } 
    // check to make sure theres queries 
    else if(Object.keys(req.query).length != 0){ 
        clientError(req, "Query Parameters do not meet requirements", 400);
        res.status(400).json({error: "Query Parameters do not meet requirements"});
    } else {
    let allQuotes = await db.many('SELECT * FROM quotes');
    res.json(allQuotes);
    }
})

app.get('/library/login', async function(req,res){
    if(Object.keys(req.body).length > 0){
        res.status(400).json({message:"Body not permitted"})
    }
        try{
    res.render("login.ejs")
        }catch(e){
            console.log(e)
            res.status(500).json({msg:'Internal Server error'})
        }

})
// End point used to render signup page
app.get('/library/signup', async function(req,res){
    if(Object.keys(req.body).length > 0){
        res.status(400).json({message:"Body not permitted"})
    }
    try{
    res.render("signup.ejs")
    }catch(e){
        console.log(e)
        res.status(500).json({msg:'Internal Server error'})
    }
})
// app.get('/home', async function(req,res){
//     res.render("/")
// })

// ______________________________________________________________________________________________________/*
// Endpoint: 
//     POST: Creates a new account for a user
// Body:
// {
//     "email":"",
//     "firstName":"",
//     "lastName":"",
//     "password":""
// }
// All fields required.
// */
app.post('/library/signup', async function(req,res){
    const regex = /^[a-zA-Z0-9/,:.@ ]+$/;
    let obj = req.body;
    console.log(obj)
    let arr = [...Object.values(obj)];
    if (!arr.every((item) => regex.test(item))) {
      // checks if any special characters were used
      clientError(req, "Body does not meet requirements", 400);
      return res.status(400).json({ msg: "Body Does not meet requirements" });
    }
    else if(!req.body.email.includes("@")){
        clientError(req,"incorrect email format",400)
        res.status(400).json({message:'incorrect email format'})
    }
    const hashtedPassword = await bcrypt.hash(req.body.password,10)
let {email, firstName, lastName, password} = req.body;
if(!email||!firstName||!lastName||!password){
    clientError(req,"Invaled fields",400)
    res.status(400).json({msg:'Invalid fields'})
}
try{
await db.none("INSERT INTO users (email, firstName, lastName, password) VALUES ($1, $2, $3, $4)",
[email, firstName, lastName, hashtedPassword])
res.redirect("/library/login")
}catch(error){
if(error.code === "23505"){
    clientError(req, "Email already exist", 400);
    res.redirect('/library/signup')
}
}
})
// Endpoint used to authenticate users at the login page
app.post('/library/login', passport.authenticate("local",{
    successRedirect: "/",
    failureRedirect: "/library/login",
    failureFlash: true
}))

// app.post('/library/login', async function(req, res) {
//     const regex = /^[a-zA-Z0-9/,:.@ ]+$/;
//     let obj = req.body;
//     console.log(obj)
//     let arr = [...Object.values(obj)];
//     console.log(arr)
//     if (!arr.every((item) => regex.test(item))) {
//       // checks if any special characters were used
//       clientError(req, "Body does not meet requirements", 400);
//       return res.status(400).json({ msg: "Body Does not meet requirements" });
//     }
//     const { email, password } = req.body;
//     try {
//         const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
//         if (user) {
//             const match = await bcrypt.compare(password, user.password);
//             if (match) {
//                 res.send('Login Successful');
//             } else {
//                 clientError(req,"Invalid password",400)
//                 res.status(400).send('Invalid password');
//             }
//         } else {
//             clientError(req,"Invalid Credentials",400)
//             res.status(400).send('Invalid Credentials');
//         }
//     } catch (error) {
//         clientError(req,"Internal Server error",500)
//         console.error('Login error:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });



//User info Account creation Post
app.post('/library', async function(req,res){
    //take reference from todo and pokemon project CRUD API's.
    //Check if there is not anything in the body of the request.
    //Check to see if the inputed tex in the requests body is not a object.
    //Check if email, firstName, lastName, age, administrator, blackList, image are in the body.
    //Check to see if email, First name, Last name, are a string, if age is a number, if blacklist and administrator is a boolean and if image is a string which will allow it to be null as well.
    //if nothing is in the req.body or if type of request in the body is not a object or if email is not in the body and if  email is not a string 
    console.log(req.body)
    if(!req.body||typeof req.body !== 'object'||!('email' in req.body||!(typeof req.body.email !== 'string'||!('firstName' in req.body||!(typeof req.body.firstName !== 'string'||!('lastName' in req.body|| !(typeof req.body.lastName !== 'string'||!('age' in req.body||!(typeof req.body.age !== 'number'||!('administrator' in req.body|| !(typeof req.body.administrator !== 'boolean'||!('blackList' in req.body||!(typeof req.body.blackList !== 'boolean'||!('image' in req.body||!(typeof req.body.image !== 'string'))))))))))))))){
        console.log(req.body)
        clientError(req, "Missing Sign up Information", 400)
        res.statusCode = 400
        res.json({error: "Missing Sign up Information"})
    }else{
        //define  2 regex to check to check if one eamil is letters numbers and a @ symbol. Two if first name and last name are letters. 
        // Error check image to ensure that only image can be inserted.
        //reg ex to validate first and last Names
        let regexName = /^[a-zA-Z\s]+$/ ;
        //regex expression to validate user email
        let regexeamil = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
        //validate image to with a limit to a min and max amount of characters
        // let image = req.body.image.substring(10,200);
        //This is the error checking that checks all requrired body parameters in the request for the correct format
        //Error check for null if any required value is null send back a 400 in responce
        if(req.body.email === null){
            clientError(req, "Email must be provided", 400)
            res.statusCode = 400
            res.json({error: "Email must be provided"})
        }else if(!regexeamil.test(req.body.email)){
            clientError(req, "Incorrect email format", 400)
            res.statusCode = 400
            res.json({error: "Incorrect email format"})
        }else if(req.body.firstName === null){
            clientError(req, "Please provide First Name", 400)
            res.statusCode = 400
            res.json({error: "Please provide First Name"})
        }else if(!regexName.test(req.body.firstName)){
            clientError(req, "Please Insert First Name", 400)
            res.statusCode = 400
            res.json({error: "Please insert First Name"})
        }else if(req.body.lastName === null){
            clientError(req, "Please Insert Last Name", 400)
            res.statusCode = 400
            res.json({error: "Please Insert Last Name"})
        }else if(!regexName.test(req.body.lastName)){
            clientError(req, "Please Insert Last Name", 400)
            res.statusCode = 400
            res.json({error: "Please insert Last Name"})
        }else if(req.body.age === null){
            clientError(req, "Please provide age", 400)
            res.statusCode = 400
            res.json({error: "Please provide Age"})
        }else if(req.body.administrator === null){
            clientError(req, "Please specify role", 400)
            res.statusCode = 400
            res.json({error: "Please specify role"})
        }else if(req.body.blackList === null){
            clientError(req, "Blacklist error has occured", 400)
            res.statusCode = 400
            res.json({error: "Blacklist error has occured"})
        }else{
            // if no errors are found This is where the code to post the information will be go.
            console.log(req.body)
            //Define a object with all required fields for the req.body
            const  {
                email,
                firstName,
                lastName,
                age,
                administrator,
                blackList,
                image
            } = req.body

            let userInfo = await db.query('INSERT INTO users(email,firstName,lastName,age,administrator,blackList,image) VALUES($1,$2,$3,$4,$5,$6,$7) RETURNING *', [email,firstName,lastName,age,administrator,blackList,image]);
            res.json(userInfo)
        }
    
    }
    
    
    



})

//New Book post
app.post('/books',async function(req,res){
    res.set('Access-Control-Allow-Origin', '*');
    //take reference from todo and pokemon project CRUD API's.
    //Check if there is not anything in the body of the request.
    //Check to see if the inputed tex in the requests body is not a object.
    //Check if the name, author, yearPublished, genre, checkedout, and image are in the requested body thats being posted.
    //Check to ensure name, author, and genre and image are a string which will allow image to be null as well. Chech if checkedout is a boolean and that year published is a number.
    if(!req.body||typeof req.body !== 'object'||!('name' in req.body||!(typeof req.body.name !== 'string'||!('author' in req.body||!(typeof req.body.author !== 'string'||!('yearPublished' in req.body||!(typeof req.body.yearPublished !== 'number'||!('genre' in req.body||!(typeof req.body.genre !== 'string'||!('checkedOut' in req.body||(!typeof req.body.checkedOut !== 'boolean'||!('image' in req.body||!(typeof req.body.image !=='string'))))))))))))){
        console.log(req.body)
        clientError(req, "Missing Book Information", 400)
        res.statusCode = 400
        res.json({error: "Missing Book Information"})
    }else{
        //Define a regex to ensure name, author, and genre and image are letters only.
        let regexbookName = /^[a-zA-Z0-9:{}\[\],.-\s]+$/
        //Error check for null if any required value is null send back a 400 in responce
        if(req.body.name === null){
        clientError(req, "Book name required", 400)
        res.statusCode = 400
        res.json({error: "Book name required"})
        }else if(!regexbookName.test(req.body.name)){
        clientError(req, "Book name required", 400)
        res.statusCode = 400
        res.json({error: "Book name required"})
        }else if(req.body.author === null){
            clientError(req, "Author name required", 400)
            res.statusCode = 400
            res.json({error: "Author name required"})
        }else if(!regexbookName.test(req.body.author)){
            clientError(req, "Author name required", 400)
            res.statusCode = 400
            res.json({error: "Author name required"})
        }else if(req.body.yearPublished === null){
            clientError(req, "Year published required", 400)
            res.statusCode = 400
            res.json({error: "Year published required"})
        }else if(req.body.genre === null){
            clientError(req, "Genre is required", 400)
            res.statusCode = 400
            res.json({error: "Genre is required"})
        }else if(!regexbookName.test(req.body.genre)){
            clientError(req, "Genre is required", 400)
            res.statusCode = 400
            res.json({error: "Genre is required"})
        }else{
            // if no errors are found the post code to post to the database will go here.
            console.log(req.body)
            let {
                name,
                author,
                yearPublished,
                genre
                
            } = req.body
            genre = [genre]

            let bookRequest = await db.query('INSERT INTO bookInventory(name,author,yearPublished,genre) VALUES($1,$2,$3,$4) RETURNING *', [name,author,yearPublished,genre]);
            res.json(bookRequest)
            
        }
        
    }
    
})

//Book request post
app.post('/request',async function(req,res){
    //take reference from todo and pokemon project CRUD API's.
    //Check if there is not anything in the body of the request.
    //Check to see if the inputed tex in the requests body is not a object.
    //Check if the name, author, yearPublished, genre, checkedout, and image are in the requested body thats being posted.
    //Check to ensure name, author, and genre and image are a string which will allow image to be null as well. Chech if checkedout is a boolean and that year published is a number.
    if(!req.body||typeof req.body !== 'object'||!('name' in req.body||!(typeof req.body.name !== 'string'||!('author' in req.body||!(typeof req.body.author !== 'string'||!('yearPublished' in req.body||!(typeof req.body.yearPublished !== 'number'||!('genre' in req.body||!(typeof req.body.genre !== 'string'||!('checkedOut' in req.body||(!typeof req.body.checkedOut !== 'boolean'||!('image' in req.body||!(typeof req.body.image !=='string'))))))))))))){
        console.log(req.body)
        clientError(req, "Missing Book request Information", 400)
        res.statusCode = 400
        res.json({error: "Missing Book request Information"})
    }else{
        //Define a regex to ensure name, author, and genre and image are letters only.
        let regexbookName = /^[a-zA-Z0-9:{}\[\],.-\s]+$/
        //Error check for null if any required value is null send back a 400 in responce
        if(req.body.name === null){
        clientError(req, "Book name required", 400)
        res.statusCode = 400
        res.json({error: "Book name required"})
        }else if(!regexbookName.test(req.body.name)){
        clientError(req, "Book name required", 400)
        res.statusCode = 400
        res.json({error: "Book name required"})
        }else if(req.body.author === null){
            clientError(req, "Author name required", 400)
            res.statusCode = 400
            res.json({error: "Author name required"})
        }else if(!regexbookName.test(req.body.author)){
            clientError(req, "Author name required", 400)
            res.statusCode = 400
            res.json({error: "Author name required"})
        }else if(req.body.yearPublished === null){
            clientError(req, "Year published required", 400)
            res.statusCode = 400
            res.json({error: "Year published required"})
        }else if(req.body.genre === null){
            clientError(req, "Genre is required", 400)
            res.statusCode = 400
            res.json({error: "Genre is required"})
        }else if(!regexbookName.test(req.body.genre)){
            clientError(req, "Genre is required", 400)
            res.statusCode = 400
            res.json({error: "Genre is required"})
        }else if(req.body.checkedOut === null){
            clientError(req, "Book has not been checked out", 400)
            res.statusCode = 400
            res.json({error: "Book has not been checked out"})
        }else{
            // if no errors are found the post code to post to the database will go here.
            console.log(req.body)
            const {
                name,
                author,
                yearPublished,
                genre,
                checkedOut,
                image
            } = req.body

            let bookRequest = await db.query('INSERT INTO bookRequest(name,author,yearPublished,genre,checkedOut,image) VALUES($1,$2,$3,$4,$5,$6) RETURNING *', [name,author,yearPublished,genre,checkedOut,image]);
            res.json(bookRequest)
            
        }
        
    }
    
})

app.post('/quotes', async function(req,res){
    //take reference from todo and pokemon project CRUD API's.
    //Check if there is not anything in the body of the request.
    //Check to see if the inputed tex in the requests body is not a object.
    //Check if quote, auther, and book are in the requested body thats being posted.
    //Check to quote, author, and book are a string which will allow image to be null as well. Chech if checkedout is a boolean and that year published is a number.
    if(!req.body||typeof req.body !== 'object'||!('quote' in req.body||!(typeof req.body.quote !== 'string'||!('author' in req.body||!(typeof req.body.author !== 'string'||!('book' in req.body||!(typeof req.body.book !== 'string'))))))){
        console.log(req.body)
        clientError(req, "Missing quote requirements", 400)
        res.statusCode = 400
        res.json({error: "Missing quote requirements"})
    }else{
     //Define a regex to ensure quote, author, and book are letters required puctiation and punctuation junctions.
     let regexQuote = /^['":a-zA-Z0-9.,{}!\-\s]+$/

     //Error check for null if any required value is null send back a 400 in response
     if(req.body.quote === null){
        clientError(req, "Quote is required", 400)
        res.statusCode = 400
        res.json({error: "Quote is required"})
     }else if(!regexQuote.test(req.body.quote)){
        clientError(req, "Quote is required", 400)
        res.statusCode = 400
        res.json({error: "Quote is required"})
     }else if(req.body.author === null){
        clientError(req, "Author is required", 400)
        res.statusCode = 400
        res.json({error: "Author is required"})
     }else if(!regexQuote.test(req.body.author)){
        clientError(req, "Author is required", 400)
        res.statusCode = 400
        res.json({error: "Author is required"})
     }else if(req.body.book === null){
        clientError(req, "Book is required", 400)
        res.statusCode = 400
        res.json({error: "Book is required"})
     }else if(!regexQuote.test(req.body.book)){
     clientError(req, "Book is required", 400)
        res.statusCode = 400
        res.json({error: "Book is required"})
    }else{
        // if no errors are found the post code to post to the database will go here.
        console.log(req.body)
        const {
            quote,
            author,
            book
        } = req.body
        let postaQuote = await db.query('INSERT INTO quotes(quote,author,book) VALUES($1,$2,$3) RETURNING *', [quote,author,book]);
        res.json(postaQuote)
    }


}

    

    

    
})

//Did not work Properly
    //Define a variable to hold all of the valid fields in a array that can be used in the body of the patch request.
    // const validfields = [blackList];
    //Define another varible that will filter for invalid feilds using the Defined valid fields variable defined before look at todo CRUD for reference.
    // const invalidFields = Object.keys(req.body).filter(field => !validfields.includes(field));

    //Check to ensure that there are no more than 0 invalid fields in the body of the request if todo reference is used you can use the ivalid fields varaible to do this.
    // if(invalidFields > 0){
         //if a invalid field is found send back a 400 in response 
        // clientError(req, "Invalid field detected", 400)
        // res.statusCode = 400
        // res.json({error: "Invalid fields detected"})
    // }else{
    //     if(!blackList && typeof blackList !== 'boolean'){
    //         clientError(req, "Error has occured defining user blacklist", 400)
    //         res.statusCode = 400
    //         res.json({error: "Error has occured defining user blacklist"})

//User info update endpoint
app.patch('/library/:id', async function(req,res){
    //take reference from both todo and pokemon project CRUD API's
    //I used parseInt to parse the req.params.id from what I've read is reading as astring and is rturning it as a integer
    const id = parseInt(req.params.id)
    //Create a const object that will hold all the accepted params that can be inserted into the requests body.
    const {blackList} = req.body
    console.log([blackList])
    //determine if blacklist is a boolean
    if(typeof blackList !== 'boolean'){
        clientError(req, "Blacklist error has occured", 400);
        res.statusCode = 400;
        res.json({error: "Error occured Defining user Blacklist status"});
        //try with catch allows the code to be tested without crashing by running it with try and catching any errors before they crash the server
    }try{
            //if no errors were found continue with the code that will update the database with the correct fields.
            let updateBlacklist = await db.query('UPDATE users SET blackList = $1 WHERE id = $2 RETURNING *', [blackList, id]);
            res.json(updateBlacklist);

            
    }catch (error){
        console.error("Error updating Blacklist", error);
        clientError(req, "Blacklist error has occured", 400);
        res.statusCode = 400;
        res.json({error: "Error occured Defining user Blacklist status"});
    }
})

//Book info update endpoint by 
app.patch('/books/:name', async function(req,res){
    //take reference from both todo and pokemon project CRUD API's.
    //Create a const object with valid feilds to check if their in the requests body.
    //define a variable to hold the req.params.name
    const bookName = req.params.name

    //Define a variable to hold all of the valid fields in a array that can be used in the body of the patch request.
    const {checkedOut} = req.body
    console.log({checkedOut})
//Check to ensure that there are no more than 0 invalid fields in the body of the request if todo reference is used you can use the ivalid fields varaible to do this.
    //if a invalid field is found send back a 400 in response 
    //if there are no invalid fields check the fields one of which will be checkedout ensure that its its not undefined and if it is not undefined ensure that it is a boolean look at todo CRUD for reference.
    //Determine if the checked out inside the req.body is a boolean and if its not send a 400 in response
    let bookinventory = await db.many('SELECT name from bookinventory')
    let foundBook = bookinventory.find((title) => title.name === bookName)
    console.log(bookName)
   

    console.log(bookinventory)
    if(typeof checkedOut !== 'boolean'){
        clientError(req, "Error has occured whlie Checking Out designated Book", 400);
        res.statusCode = 400;
        res.json({error: "Error has occured whlie Checking Out designated Book"});
    }
        
       if(foundBook == undefined){
            res.status(400).json({message:'Book not in inventory'})
        }
    else{
        //if no errors were found continue with the code that will update the database with the correct fields.
        let checkoutBook = await db.query('UPDATE bookInventory SET checkedOut = $1 WHERE name = $2 RETURNING *', [checkedOut,bookName]);
        res.json(checkoutBook)
    }
})

    
    app.delete('/books/:param', async function(req, res){
        let param = req.params.param;
        
        if (!param) {
            return res.status(400).json({ message: 'Parameter is required' });
        }
        
        // Check if request body exists and is not null
        if (req.body && Object.keys(req.body).length !== 0) {
            return res.status(400).json({ message: 'Request body not permitted' });
        }
        
        // Check for special characters in param
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(param)) {
            return res.status(400).json({ message: 'Invalid characters in parameter' });
        }
        
        try {
            if (!isNaN(param)) {  // Check if the parameter is a number (ID)
                const bookId = parseInt(param);
                // Check if the ID exists in the database
                const book = await db.oneOrNone('SELECT * FROM bookInventory WHERE id = $1', [bookId]);
            if (!book) {
                    return res.status(404).json({ message: 'Book ID not found' });
            }
                await db.result('DELETE FROM bookInventory WHERE id = $1', [bookId]);
                } else {
            // Check if the name exists in the database
            const book = await db.oneOrNone('SELECT * FROM bookInventory WHERE name = $1', [param]);
            if (!book) {
                return res.status(404).json({ message: 'Book name not found' });
            }
                await db.result('DELETE FROM bookInventory WHERE name = $1', [param]);
            }
                res.status(200).json({ message: 'Book deleted successfully' });
            } catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal Server Error' });
            }
        });
        
         
    
    // User info delete endpoint by ID or email
    app.delete('/users/:param', async function(req, res){
        const param = req.params.param;
    
        // if (!param) {
        //     return res.status(400).json({ message: 'Parameter is required' });
        // }
        if (req.body && Object.keys(req.body).length !== 0) {
            return res.status(400).json({ message: 'Request body not permitted' });
        }
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(param)) {
            return res.status(400).json({ message: 'Invalid characters in parameter' });
        }
    
        try {
            let deleteUserQuery;
            let deleteUserParam;
    
            // Checks for if param is a number ex: (ID)
            if (!isNaN(param)) {
                deleteUserQuery = 'DELETE FROM users WHERE id = $1';
                deleteUserParam = parseInt(param);
            } else {
                deleteUserQuery = 'DELETE FROM users WHERE email = $1';
                deleteUserParam = param;
            }
            // Checking for user in our database
            const checkUser = await db.oneOrNone('SELECT id FROM users WHERE id = $1 OR email = $2', [deleteUserParam, deleteUserParam]);
    
            
            if (!checkUser) {
                return res.status(404).json({ message: 'User not found' });
            }
            // Delete user
            await db.result('DELETE FROM users WHERE id = $1', [userId]);
            
            await db.result(deleteUserQuery, [deleteUserParam]);
            
            res.status(200).json({ message: 'User deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
    
    
    // Quote delete endpoint
    app.delete('/quotes/:id', async function(req, res){
        const quoteId = req.params.id;
    
        // Check if ID parameter exists
        if (!quoteId) {
            return res.status(400).json({ message: 'ID parameter is required' });
        }
    
        // Check if ID contains special characters
        const specialCharsRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharsRegex.test(quoteId)) {
            return res.status(400).json({ message: 'Invalid characters in ID' });
        }
    
        // Check if request body exists and is not null
        if (req.body && Object.keys(req.body).length !== 0) {
            return res.status(400).json({ message: 'Request body not permitted' });
        }
    
        try {
            // Check if quote with the given ID exists
            const checkQuote = await db.oneOrNone('SELECT id FROM quotes WHERE id = $1', [quoteId]);
            
            if (!checkQuote) {
                return res.status(404).json({ message: 'Quote not found' });
            }
    
            // Delete quote
            await db.result('DELETE FROM quotes WHERE id = $1', [quoteId]);
    
            res.status(200).json({ message: 'Quote deleted successfully' });
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    });
    

//FOR SWAGGER DOCUMENTATION
const options = {
    definition: {
      openapi: "3.1.0",
      info: {
        title: "House of Cards",
        version: "0.1.0",
        description:
          "Library API",
      },
      servers: [
        {
          url: "http://localhost:3000",
        },
      ],
    },
    apis: ["./routes/*.js"],
  };
  
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs, { explorer: true })
  );


app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})