//using mongoose npm package which is one layer above mongoDB
const mongoose = require("mongoose")
const {MONGO_URI}=require("../config/keys")

mongoose.connect(MONGO_URI,{
    //connecting mongoDB locally
    //keeping connection alive
    keepAlive:true,
    useNewUrlParser:true,
    useUnifiedTopology:true,
})


mongoose.set("debug",true)

mongoose.Promise = Promise

//exporting schema created in schema.js file
module.exports.Meme = require("./schema")