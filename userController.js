const usercontroller = require("./userSchema")
const bcrypt=require("bcrypt")
const  jwt = require('jsonwebtoken')

const userRegistration = ((req, res) => {
    let password=req.body.password
   let hash = bcrypt.hashSync(password,10)
    let user = new usercontroller({
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        contact: req.body.contact,
        age: req.body.age,
        password:hash
    })
    user.save()
        .then((result) => {
            console.log(result);


            res.json({
                msg: "Registered Successfully",
                data: result
            })
        })
        .catch((err) => {
            res.json({
                err: err
            })
        })

})

const userlist = ((req, res) => {


    usercontroller.find().then((result) => {
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


const singleUser = ((req, res) => {
    let singleuser = req.params.singleuser
    usercontroller.find({
        userName: singleuser
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

 const userDelete = ((req, res) => {
    // console.log(req.headers.authorization);
    // let token = req.headers.authorization.slice(7)
    // console.log(token);
    // let decode = jwt.decode(token)
    // let userid=decode._id
    let userid =req.userid
    usercontroller.findByIdAndDelete(userid)
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

const userUpdate=((req,res)=>{
    console.log(req.headers.authorization);
    let token=req.headers.authorization.slice(7)
    console.log(token);
    let decode=jwt.decode(token)
    let update=decode._id
  
    // let update=req.params.update
    usercontroller.findByIdAndUpdate(update,{
        userName: req.body.userName,
        userEmail: req.body.userEmail,
        contact: req.body.contact,
        age: req.body.age
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

const userValue=((req,res)=>{
    let userfind=req.query.age;
    usercontroller.find({age:userfind})
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

const login=((req,res)=>{
    let email=req.body.userEmail
    usercontroller.findOne({userEmail:email})
    .then((result)=>{
        console.log(result); 
        if (!result){
            res.json({err:"email is wrong"})
          }
       let ismatching= bcrypt.compareSync(req.body.password,result.password)
       if(ismatching===true){
        console.log(true);
        
       let token = jwt.sign({
        _id:result._id,
        userEmail:result.userEmail
       },"77r0")
        res.json(token)
       }
       else{
        req.json({err:"password not matching"})
        
       }
    })
    .catch((err)=>{
        res.json({
            err:err
        })
    })

})





module.exports = { userRegistration, userlist, singleUser, userDelete ,userUpdate , userValue , login }