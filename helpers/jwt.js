const jwt = require("jsonwebtoken")

function generateToken(payload){
    // Di sini terjadi proses pembuatan token
    //var token = jwt.sign({ foo: 'bar' }, 'shhhhh')
    return jwt.sign(payload, process.env.SECRET) // kembalikan token
}

function verifyToken(token){
    // verify a token symmetric - synchronous
     return jwt.verify(token, process.env.SECRET)
}

module.exports = { generateToken, verifyToken }