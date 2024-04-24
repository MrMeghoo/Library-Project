const express = require('express')
const pgp = require('pg-promise')();
const winston = require('winston')


const app = express()
const db = pgp('postgres://avdxxhsq:Ngu7xpaEW3m4SGx0lWBeOln7iq_WErpE@ziggy.db.elephantsql.com/avdxxhsq')
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


app.get('/library', async function(req,res){
    console.log(req.query)

    const getkeys = Object.keys(req.query)

    //Check to make sure that only eamil or first and last name can be used as a query here. If anything other than that is inputed send back a 400 error code.
    
    
    //Check to see if there is a body being inputed. If there is send back a 400 error. 
    //Then if there is not a body check the length of the query to ensure that only one query can be used at a time.
    
    //then if neither email or first and last name are used and the query is undefined in the query return all users in the library in json format.
    //then check to ensure that the query being put in is not a number or any dashes or slashes or any of the other puctuation junctions other than an @ and a period. 
    //using Regex expression

    //define a varible with a empty object to hold the responce if nothing is found it wil stay a empty object.

    //This is where the SQL commands will go to get the information from the database that is specified in the query after the error checking.

    
})

app.get('/library', async function(req,res){
    console.log(req.query)

    const getkeys = Object.keys(req.query)

    //Check to make sure that only name and catagory can be used as a query here. If anything other than that is inputed send back a 400 error code.
    
    
    //Check to see if there is a body being inputed. If there is send back a 400 error. 
    //Then if there is not a body check the length of the query to ensure that only one query can be used at a time.
    
    //then if neither name or catagory and query is undefined in the query return all books in the library in json format.
    //then check to ensure that the query being put in is not a number or any dashes or slashes or any of the other puctuation junctions.
    //using Regex expression

    //define a varible with a empty object to hold the responce if nothing is found it wil stay a empty object.

    //This is where the SQL commands will go to get the information from the database that is specified in the query after the error checking.


    
})



//User info Account creation Post
app.post('/library', async function(req,res){
    //take reference from todo and pokemon project CRUD API's.
    //Check if there is not anything in the body of the request.
    //Check to see if the inputed tex in the requests body is not a object.
    // Check if email, firstName, lastName, age, administrator, blackList, image are in the body.
    //Check to see if email, First name, Last name, are a string, if age is a number, if blacklist and administrator is a boolean and if image is a string which will allow it to be null as well.
    
    
    
    //define  2 regex to check to check if one eamil is letters numbers and a @ symbol. Two if first name and last name are letters. 
    // Error check image to ensure that only image can be inserted.

    // if no errors are found This is where the code to post the information will be go.
    




})

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

//User info delete endpoint
app.delete('/library/:id', async function(req,res){
    //take reference from both todo and pokemon project CRUD API's.
    //Check to ensure a body is not in the request.

    //if a id that does not yet exist is inserted as a query send back a 400 in responce.

    //if no errors are found continue with the code to delete a users account from the database.
    
})

app.delete('/library/:name', async function(req,res){
    //take reference from both todo and pokemon project CRUD API's.
    //Check to ensure a body is not in the request.

    //if a name of a book is inserted that is not yet in the database send back a 400 in responce.

    //if no errors are found continue with the code to delete a book from the database.

})


app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})