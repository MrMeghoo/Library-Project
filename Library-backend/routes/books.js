
/**
 * @swagger
 * /library:
 *   get:
 *     summary: Retrieves all books in inventory

 *     responses:
 *       200:
 *         description: Retrieved all books
 *        
 *       400:
 *         description: bad request
 *
 */

/**
 * @swagger
 * /library/trending:
 *   get:
 *     summary: Retrieves trending books

 *     responses:
 *       200:
 *         description: retrieved trending books
 *        
 *       400:
 *         description: bad request
 *
 */

/**
 * @swagger
 * /library/staffPick:
 *   get:
 *     summary: Retrieves staff picks

 *     responses:
 *       200:
 *         description: retrieved staff picks
 *        
 *       400:
 *         description: bad request
 *
 */
/**
 * /**
 * @swagger
 * /users:
 *   get:
 *     summary: Retrieves users

 *     responses:
 *       200:
 *         description: retrieved all users
 *        
 *       400:
 *         description: bad request
 *
 */
/**
 * @swagger
 * /quotes:
 *   get:
 *     summary: Retrieves all quotes

 *     responses:
 *       200:
 *         description: retrieved all users
 *        
 *       400:
 *         description: bad request
 *
 */
/**
 * @swagger
 * /library/signup:
 *   post:
 *     summary: Registers a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              email:
 *               type:string
 *              firstName:
 *               type:string
 *              lastName:
 *               type:string
 *              password:
 *               type:string
 *              
 *     responses:
 *       200:
 *         description: User Account made
 *        
 *       400:
 *         description: bad request
 *
 */

/**
 * @swagger
 * /library:
 *   post:
 *     summary: Adds new user to system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              email:
 *               type: string
 *              firstName:
 *               type: string
 *              lastName:
 *               type: string
 *              age:
 *               type: integer
 *              administrator:
 *               type: boolean
 *              blackList:
 *               type: boolean
 *              image:
 *               type: string
 *             
 *              
 *     responses:
 *       200:
 *         description: Logged in succesfully
 *        
 *       400:
 *         description: bad request
 *
 */

/**
 * @swagger
 * /books:
 *   post:
 *     summary: Adds new book to system
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name:
 *               type: string
 *              author:
 *               type: string
 *              yearPublished:
 *               type: string
 *              genre:
 *               type: string
 *              administrator:
 *               
 *             
 *              
 *     responses:
 *       200:
 *         description: posted new book
 *        
 *       400:
 *         description: bad request
 */

/**
* @swagger
* /request:
*   post:
*     summary: Places a request for a book
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*              name:
*               type: string
*              author:
*               type: string
*              yearPublished:
*               type: string
*              genre:
*               type: string
*              checkedOut:
*               type: string
*              image:
*               type: string
*     responses:
*       200:
*         description: Request made successfully
*        
*       400:
*         description: bad request
*/

/**
* @swagger
* /quotes:
*   post:
*     summary: Places new quote from a book into the database
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*              quote:
*               type: string
*              author:
*               type: string
*              book:
*               type: string
*     responses:
*       200:
*         description: posted new quote
*        
*       400:
*         description: bad request
*/

/**
* @swagger
* /library/{id}:
*   patch:
*     summary: Blacklist a user
*     parameters:
*      - name: id
*        in: path
*        required: true
*        description: the id of the user
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*              blackList:
*               type: boolean
*     responses:
*       200:
*         description: Updated blacklist status
*        
*       400:
*         description: bad request
*/

/**
* @swagger
* /books/{name}:
*   patch:
*     summary: Checks out a book
*     parameters:
*      - name: name
*        in: path
*        required: true
*        description: the title of the book
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             type: object
*             properties:
*              checkedOut:
*               type: boolean
*     responses:
*       200:
*         description: Updated checkout status
*        
*       400:
*         description: bad request
*/

/**
* @swagger
* /quotes/{id}:
*   delete:
*     summary: Deletes a quote
*     parameters:
*      - name: id
*        in: path
*        required: true
*        description: the title of the book
*     responses:
*       200:
*         description: Updated checkout status
*        
*       400:
*         description: bad request
*/
