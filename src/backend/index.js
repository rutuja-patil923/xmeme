
//express server
const express = require("express")

//creation of app object
const app = express()
const swaggerApp = express()

//requiring body parser
const bodyParser = require("body-parser")

//port for server as well as swagger
const PORT = process.env.PORT || 8081
const swaggerPort=8080

//including database-mongoDB local
const db = require("./models/")
const cors = require("cors")

//requiring dependancies for swagger
const swaggerJSDoc = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")


app.use(cors())
swaggerApp.use(cors())

app.use(bodyParser.json())



swaggerApp.listen(swaggerPort,()=>{
  console.log('Swagger app running at '+swaggerPort)
})

//defining swagger options
const swaggerOptions={
  definition:{
      openapi:'3.0.0',
      info:
      {
          title:'X-meme API by Rutuja Patil',
          version:'1.0.0',
          description:'This CRUD API application created with MERN stack.',
          contact:
          {
              name:'Rutuja Patil',
              email:'rutuspatil923@gmail.com'
          },
          termsOfService: "http://swagger.io/terms/",
          license:{
            name: "Apache 2.0",
            url: "http://www.apache.org/licenses/LICENSE-2.0.html"
          }
    
      },
      servers:[{url:"http://localhost:8081"}],
      tags:{
        name: "memes",
        description: "Everything about memes"
      }
  },
  
  
  apis:["index.js"]

}
app.use(express.json())

const swaggerDocs=swaggerJSDoc(swaggerOptions)
swaggerApp.use('/swagger-ui',swaggerUI.serve,swaggerUI.setup(swaggerDocs))

//#############################   Swagger Implementation  ##########################################

/**
* @swagger
* definitions:
*  Meme:
*   type: object
*   properties:
*    name:
*     type: string
*     description: name of meme owner
*     example: 'Ashok Kumar'
*    caption:
*     type: string
*     description: caption of Meme 
*     example: 'This is caption'
*    url:
*     type: string
*     description: image url of meme 
*     example: 'Image url'
*  UpdatedMeme:
*   type: object
*   properties:
*    name:
*     type: string
*     description: name of meme owner
*     example: 'Aishwarya Kumar'
*    caption:
*     type: string
*     description: caption of Meme 
*     example: 'This is updated caption'
*    url:
*     type: string
*     description: image url of meme 
*     example: 'Updated url'
*    id:
*     type: string
*     description: unique id of meme 
*     example: '560khduihk8912'
*  UpdateMeme:
*   type: object
*   properties:
*    caption:
*     type: string
*     description: caption of updated meme 
*     example: 'This is updated caption'
*    url:
*     type: string
*     description: image url of meme 
*     example: 'Updated url'
*  PostMeme:
*   type: object
*   properties:
*    id:
*     type: string
*     description: id of meme 
*     example: '584dgjhjs566hsgshdj'
*/

/**
 * @swagger
 * /memes:
 *  post:
 *   summary: Post meme
 *   tags:
 *   - "memes"
 *   description: creating new meme in database
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: "#/definitions/Meme"
 *   responses:
 *    200:
 *     content:
 *      application/json:
 *       schema:
 *        $ref: "#/definitions/PostMeme"
 *    409:
 *     description: Post already exists!
 */

/**
* @swagger
* /memes:
*  get:
*   summary: Fetch memes
*   tags:
*   - "memes"
*   description: getting all memes from database
*   responses:
*    200:
*     description: Memes fetched successfully!
*    400:
*     description: failed in fetching Memes
*/

/**
 * @swagger
 * /memes/{id}:
 *  get:
 *    summary: get meme by id
 *    tags:
 *    - "memes"
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *       required: true
 *       description: meme id
 *    responses:
 *     200:
 *      description: Successful
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/Meme'
 *     404:
 *      description: Meme with given ID doesn't exist
 */

/**
 * @swagger
 * /memes/{id}:
 *  patch:
 *    summary: update element by id
 *    tags:
 *    - "memes"
 *    description: update meme url and caption
 *    consumes:
 *     - application/json
 *    produces:
 *     - application/json
 *    parameters:
 *     - in: path
 *       name: id
 *       schema:
 *        type: string
 *       required: true
 *       description: meme id
 *    requestBody:
*      content:
*       application/json:
*        schema:
*         $ref: '#/definitions/UpdateMeme'
 *    responses:
 *     200:
 *      description: Data updated Successfully!
 *      content:
 *       application/json:
 *        schema:
 *         $ref: '#/definitions/UpdatedMeme'
 *     404:
 *      description: Meme with provided id doesn't exist
 */
//********************************************************************************************** 





//function for message to be sent in response
function success(res, payload) {
  return res.status(200).json(payload)
}


//function for message to be print on POST request
function postResponse(res, payload) {
  return res.status(200).send({ "id": payload.id })
}


//GET request-all memes from database
app.get("/memes", async (req, res, next) => {
  try {
    const todos = await db.Meme.find({}).sort({$natural:-1}).limit(100)
    return success(res, todos)
  } catch (err) {
    next({ status: 400, message: "failed to get meme" })
  }
})

//GET request-meme with given id
app.get("/memes/:id", function (req, res) {
  db.Meme.findById(req.params.id).
    then(doc => {
      if (!doc) { return res.status(404).end() }
      return res.status(200).json(doc)
    })
    .catch(err => next({status:404,message:"Meme with given ID doesn't exist"}))
})


//POST request-creating meme in database
app.post("/memes", async (req, res, next) => {
  try {
    const meme = await db.Meme.create(req.body)
    return postResponse(res, meme)
  } catch (err) {
    next({ status: 409, message: "Post already exists!" })
  }
})

//PATCH request-updating data of meme with given id
app.patch("/memes/:id",async function(req,res){
    // var id=req.params.id;
    // var updatedCaption=req.body.caption;
    // var updatedURL=req.body.url;

    // db.Meme.findById(id,function(err,data){

    //   data.caption=updatedCaption?updatedCaption:data.caption
    //   data.url=updatedURL?updatedURL:data.url
    //   data.save(function(err){
    //     if(err){
    //       next({status:404,message:"Meme with provided id doesn't exist"})
    //       return
    //     }
    //     res.send('Data updated Successfully!')
    //   })
    // })

    
    try {
      var id=req.params.id;
      await db.Meme.findByIdAndUpdate(id,req.body)
      res.send('Data updated successfully!')
    } catch (err) {
      res.status(404).send('Data updated successfully!')
    }

})



app.use((err, req, res, next) => {
  return res.status(err.status || 400).json({
    status: err.status || 400,
    message: err.message || "there was an error processing request",
  })
})





app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`)
})