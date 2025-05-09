const orderController = require("./orderSchema")
const jwt = require('jsonwebtoken')

const ordercart = ((req, res) => {

    console.log(req.headers.authorization);
    let token = req.headers.authorization.slice(7)
    console.log(token);
    let decode = jwt.decode(token)
    let userId = decode._id

    const { productId} = req.body
    let cart = new orderController({

        productId,
        userId

    })
    cart.save()
        .then((result) => {
            console.log(result);

            res.json({
                msg: "order Successfully carted",
                data: result
            })

        })
        .catch((err) => {
            res.json({
                err: err
            })
        })
})

const usercart = ((req, res) => {
    console.log(req.headers.authorization);
    let token = req.headers.authorization.slice(7)
    console.log(token);
    let decode = jwt.decode(token)
    let userId = decode._id
    orderController.find({ userId: userId }).populate("productId").select("-userId")
        .then((result) => {
            console.log(result);
            res.json(result)
        })
        .catch((err) => {
            res.json({
                err: err
            })
        })
})




module.exports = { ordercart, usercart }