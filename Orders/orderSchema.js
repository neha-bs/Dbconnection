const mongoose=require("mongoose")

const orderSchema = mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"product"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user"
    }
})


module.exports=mongoose.model("order",orderSchema)