const mongoose = require ("mongoose")

//this package is specifically to omit the __v field and rename _id as id
const normalize = require("normalize-mongoose") 

const memeSchema = new mongoose.Schema({
    //creating schema for 
    name : {
        type : String,//name is in string format
        unique:true,//it has to be unique
        required:true,
    },

    caption: {
        type : String,//name is in string format
        unique:true,//it has to be unique
        required:true,
    },
    url :{
        type : String,//name is in string format
        unique:true,//it has to be unique
        required:true,
    }
})
memeSchema.plugin(normalize)

//creating model for database entry
const memeModel = mongoose.model("Meme",memeSchema)
module.exports = memeModel