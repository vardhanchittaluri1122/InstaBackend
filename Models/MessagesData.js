const mongo=require("mongoose");
const mongodb=mongo.Schema({
    from: String,
    to: String,
    message: String,
    createdAt: {
        type: Date,
        default: Date.now
    }
})
module.exports=mongo.model("message",mongodb);