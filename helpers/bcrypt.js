const bcrypt = require('bcryptjs');

function encryptPassword(password){
    const salt = bcrypt.genSaltSync(10)
    return bcrypt.hashSync(password, salt)
}

function decryptPassword(password, hash){
    return bcrypt.compareSync(password, hash)
}

module.exports = { encryptPassword, decryptPassword}
