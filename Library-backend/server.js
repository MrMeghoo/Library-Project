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


app.post('/library', async function(req,res){
    })

app.patch('/library/:id', async function(req,res){
    })

//Book info update endpoint by 
app.patch('library/:name', async function(req,res){
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

    if (!param) {
        return res.status(400).json({ message: 'Parameter is required' });
    }
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


app.listen(3000, ()=> {
    console.log("Server is running on port 3000");
})

