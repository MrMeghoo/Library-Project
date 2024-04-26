const express = require('express')
const pgp = require('pg-promise')();
const winston = require('winston')


const app = express()
const db = pgp('postgres://avdxxhsq:Ngu7xpaEW3m4SGx0lWBeOln7iq_WErpE@ziggy.db.elephantsql.com/avdxxhsq')
const path = require('path');
const bcrypt = require('bcrypt');
const { name } = require('ejs');
app.use(express.static(path.join(__dirname,'../Library-frontend')))
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));
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
//Check to make sure that only name and catagory can be used as a query here. If anything other than that is inputed send back a 400 error code.


//Check to see if there is a body being inputed. If there is send back a 400 error. 
//Then if there is not a body check the length of the query to ensure that only one query can be used at a time.

//then if neither name or catagory and query is undefined in the query return all books in the library in json format.
//then check to ensure that the query being put in is not a number or any dashes or slashes or any of the other puctuation junctions.
//using Regex expression

//define a varible with a empty object to hold the responce if nothing is found it wil stay a empty object.

//This is where the SQL commands will go to get the information from the database that is specified in the query after the error checking.

app.get('/library', async function(req,res){
    let allBooks = await db.many('SELECT * FROM bookInventory');
    res.json(allBooks);
})
app.get('/users', async function(req,res){
    let allUsers = await db.many('SELECT * FROM users');
    res.json(allUsers);
})
app.get('/quotes', async function(req,res){
    let allQuotes = await db.many('SELECT * FROM quotes');
    res.json(allQuotes);
})

app.get('/library/login', async function(req,res){
    // if(Object.keys(req.body).length != 0) {
    //     clientError(req, "Request body is not permitted", 400);
    //     // check if a body was provided in the request
        // res.status(400).json({
        //     error: "Request body is not permitted"
        // });
        try{
    res.render("login.ejs")
        }catch(e){
            console.log(e)
            res.status(500).json({msg:'Internal Server error'})
        }
    // }

})

app.get('/library/signup', async function(req,res){
    res.render("signup.ejs")
})
//User info Account creation Post
app.post('/library/signup', async function(req,res){
    const regex = /^[a-zA-Z0-9/,:.@ ]+$/;
    let obj = req.body;
    console.log(obj)
    let arr = [...Object.values(obj)];
    console.log(arr)
    if (!arr.every((item) => regex.test(item))) {
      // checks if any special characters were used
      clientError(req, "Body does not meet requirements", 400);
      return res.status(400).json({ msg: "Body Does not meet requirements" });
    }
    const hashtedPassword = await bcrypt.hash(req.body.password,10)
let {email, firstName, lastName, password} = req.body;
if(!email||!firstName||!lastName||!password){
    res.status(400).json({msg:'Invalid fields'})
}
try{
await db.none("INSERT INTO users (email, firstName, lastName, password) VALUES ($1, $2, $3, $4)",
[email, firstName, lastName, hashtedPassword])
res.redirect("/library/login")
}catch(error){
if(error.code === "23505"){
    clientError(req, "Email already exist", 400);
    res.status(400).json({ msg: "Email already exist" })
}
}
})

app.post('/library/login', async function(req, res) {
    const regex = /^[a-zA-Z0-9/,:.@ ]+$/;
    let obj = req.body;
    console.log(obj)
    let arr = [...Object.values(obj)];
    console.log(arr)
    if (!arr.every((item) => regex.test(item))) {
      // checks if any special characters were used
      clientError(req, "Body does not meet requirements", 400);
      return res.status(400).json({ msg: "Body Does not meet requirements" });
    }
    const { email, password } = req.body;
    try {
        const user = await db.oneOrNone('SELECT * FROM users WHERE email = $1', [email]);
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (match) {
                res.send('Login Successful');
            } else {
                res.status(401).send('Invalid Credentials');
            }
        } else {
            res.status(401).send('Invalid Credentials');
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).send('Internal Server Error');
    }
});



//Book request post
app.post('/library',async function(req,res){
    //take reference from todo and pokemon project CRUD API's.
    //Check if there is not anything in the body of the request.
    //Check to see if the inputed tex in the requests body is not a object.
    //Check if the name, author, yearPublished, genre, checkedout, and image are in the requested body thats being posted.
    //Check to ensure name, author, and genre and image are a string which will allow image to be null as well. Chech if checkedout is a boolean and that year published is a number.

    //Define a regex to ensure name, author, and genre and image are letters only.
    //create error checking to ensure that only a image can be inserted into image.

    // if no errors are found the post code to post to the database will go here.


    
})
//User info update endpoint
app.patch('/library/:id', async function(req,res){
    //take reference from both todo and pokemon project CRUD API's
    //Create a const object that will hold all the accepted params that can be inserted into the requests body.

    //Define a variable to hold all of the valid fields in a array that can be used in the body of the patch request.
    //Define another varible that will filter for invalid feilds using the Defined valid fields variable defined before look at todo CRUD for reference.

    //Check to ensure that there are no more than 0 invalid fields in the body of the request if todo reference is used you can use the ivalid fields varaible to do this.
    //if a invalid field is found send back a 400 in response 
    //if there are no invalid fields check the fields one of which will be the blacklist and age ensure that its its not undefined and if it is not undefined ensure that it is a boolean look at todo CRUD for reference and that age is not undefined and that age is a number.

    //if no errors were found continue with the code that will update the database with the correct fields.


})

//Book info update endpoint by 
app.patch('library/:name', async function(req,res){
    //take reference from both todo and pokemon project CRUD API's.
    //Create a const object with valid feilds to check if their in the requests body.

    //Define a variable to hold all of the valid fields in a array that can be used in the body of the patch request.
    //Define another varible that will filter for invalid feilds using the Defined valid fields variable defined before look at todo CRUD for reference.

    //Check to ensure that there are no more than 0 invalid fields in the body of the request if todo reference is used you can use the ivalid fields varaible to do this.
    //if a invalid field is found send back a 400 in response 
    //if there are no invalid fields check the fields one of which will be checkedout ensure that its its not undefined and if it is not undefined ensure that it is a boolean look at todo CRUD for reference.

    //if no errors were found continue with the code that will update the database with the correct fields.

})
// Book deletion endpoint
app.delete('/books/:name', async function(req, res){
    const name = req.params.name;

    if (!name) {
        return res.status(400).json({ message: 'Name parameter is required' });
    }
    try {
        const result = await db.result('DELETE FROM bookInventory WHERE name LIKE $1', [name]);
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Book not found' });
        }
        
    res.status(200).json({ message: 'Book deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});


//User info delete endpoint by ID
app.delete('/users/:id', async function(req, res){
    const userId = req.params.id;

    if (!userId) {
        return res.status(400).json({ message: 'ID parameter is required' });
    }

    try {
        // Check if user exists
        const checkUser = await db.oneOrNone('SELECT id FROM users WHERE id = $1', [userId]);
        
        if (!checkUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Delete user
        await db.result('DELETE FROM users WHERE id = $1', [userId]);
        
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.delete('/quotes/:id', async function(req, res){
    const quoteId = req.params.id;

    if (!quoteId) {
        return res.status(400).json({ message: 'ID parameter is required' });
    }

    try {
        await db.result('DELETE FROM quotes WHERE id = $1', [quoteId]);
        
        res.status(200).json({ message: 'Quote deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})