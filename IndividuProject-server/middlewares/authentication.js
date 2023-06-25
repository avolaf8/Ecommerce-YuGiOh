const { decode } = require("../helpers/jwt")
const { User } = require("../models")

async function authentication(req, res, next) {
  try {
    const { access_token } = req.headers
    if (!access_token) {
      throw { name: "Invalid token" }
    }
    const data = decode(access_token)
    console.log(data,`<<< ini apa`);
    const user = await User.findByPk(data.id)
    console.log(user);

    if (!user) {
      throw { name: "Invalid token" }
    }
    req.user = {
      id: user.id
    }
    next()
  }
  catch (error) {
    console.log(error);
    next(error)
  }
}


module.exports = authentication