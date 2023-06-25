const jwt = require('jsonwebtoken')

// const secret = "CREDENTIAL"
module.exports = {
  sign: (data) => {
    return jwt.sign(data, "CREDENTIAL")
  },
  decode: (token) => {
   return jwt.verify(token, "CREDENTIAL")
  }
  
}