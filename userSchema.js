const mongoose=require('mongoose')

const userSchema= mongoose.Schema({
  userName:{
    type:String
  },
  userEmail:{
    type:String
  },
  contact:{
    type:Number
  },
  age:{
    type:Number
  },
  password:{
    type:String
  }

})

module.exports=mongoose.model('user',userSchema)