const mongo=require("mongoose");
const postshema=mongo.Schema({
        mediaUrl:String,
        mediaType:String,
        username:String
})
module.exports=mongo.model("posts",postshema);