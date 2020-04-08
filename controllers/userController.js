const {generateToken} = require("../helpers/jwt.js")
const { decryptPassword } = require("../helpers/bcrypt.js")
const { User } = require("../models/index.js")

class UserController {
    static register(req,res){
        //baca dulu req.body (email/password) -- hash password using helpers bcryptjs 
        //-- store datanya dengan create -- handle sisa error-nya
        let { password, email } = req.body
        let payload = {
            password, email
        }
        User.create(payload)
        .then(result => {
            let user = {
                id : result.id,
                password : result.password
            }
            let token = generateToken(user)
            res.status(201).json({
                access_token:token
            })
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                message:"InternalServerError",
                error:error
            })
        })
    }
    static login(req,res){
        //baca dulu req.body (email/password) -- cari berdasarkan email -- compare password -- kalau ketemu buatin token masuk -- handle sisa error-nya
        let payload = {
            email: req.body.email,
            password: req.body.password
        }
        User.findOne({where:{
            email : payload.email
        }})
        .then(result => {
            if(result){
                //compare the passwords directly
                let compare = decryptPassword(payload.password, result.password)
                if(compare){
                    let user = {
                        id: result.id,
                        email: result.email
                    }
                    let token = generateToken(user)
                    res.status(200).json({
                        id : user.id,
                        email : user.email,
                        access_token : token
                    })
                } else {
                    return res.status(400).json({
                        name:"BadRequest", 
                        errors: [{
                            message: "Invalid email/password"
                        }]    
                    })
                }
            } else {
                return res.status(400).json({
                    name:"BadRequest", 
                    errors: [{
                        message: "Invalid email/password"
                    }]    
                })
            }
        })
        .catch(err =>{
            console.log(err)
            return res.status(500).json({
                name:"InternalServerError", 
                errors: [{
                    message: "InternalServerError",
                    errors:err
                }]    
            })
        })
    }
}

module.exports = UserController