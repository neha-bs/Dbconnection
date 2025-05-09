const mongoose=require("mongoose")

const productScheme=mongoose.Schema({
    productName:{
        type:String
    },
    productId:{
        type:Number
    },
    productPrice:{
        type:String
    },
    productDetails:{
        type:String
    }
})

module.exports=mongoose.model("product",productScheme)