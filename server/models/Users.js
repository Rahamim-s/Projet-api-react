const mongoose = require ('mongoose')

const UserSchema = new mongoose.Schema({ // create mongoose schema  
   name : String,
   email : String, 
   numberrange : Number
});

const UserModel = mongoose.model("Users",UserSchema)
module.exports = UserModel