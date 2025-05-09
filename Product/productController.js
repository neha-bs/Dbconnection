const productController = require("./productScheme")

const productadd = ((req, res) => {
    let product = new productController({
        productName: req.body.productName,
        productId: req.body.productId,
        productPrice: req.body.productPrice,
        productDetails: req.body.productDetails
    })
    product.save()
        .then((result) => {
            console.log(result);
            res.json({
                msg: "product added",
                data: result
            })
        })
        .catch((err) => {
            res.json({

                err: err

            })
        })

})



const productlist = ((req, res) => {


    productController.find().then((result) => {
        console.log(result);
        res.json({
            msg: "successfull",
            data: result
        })

    })
        .catch((err) => {
            res.json({
                err: err
            })
        })
})

const singleproduct = ((req, res) => {
    let singleproduct = req.params.singleproduct
    productController.find({
        productName: singleproduct
    }).then((result) => {
        console.log(result);
        res.json({
            msg: "success",
            data: result
        })

    })

        .catch((err) => {
            res.json({
                err: err
            })
        })

})

const productDelete = ((req, res) => {
    let productid = req.params.productid
    productController.findByIdAndDelete(productid)
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

const productUpdate=((req,res)=>{
    let update=req.params.update
    productController.findByIdAndUpdate(update,{
        productName: req.body.productName,
        productId: req.body.productId,
        productPrice: req.body.productPrice,
        productDetails: req.body.productDetails
    })
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


const productValue=((req,res)=>{
    let productfind=req.query.productPrice;
    productController.find({productPrice:productfind})
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

module.exports = { productadd, productlist, singleproduct , productDelete , productUpdate , productValue}