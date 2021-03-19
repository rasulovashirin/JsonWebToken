const jwt = require("jsonwebtoken")

const info = { message: "Hello world" }
const KEY = "1000"

const token = jwt.sign(info, KEY)

console.log(jwt.verify(token, "1000"))
