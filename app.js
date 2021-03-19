const express = require("express")
const jwt = require("jsonwebtoken")
const { v4 } = require("uuid")

const app = express()
const KEY = "1000"

const data = [
    {
        "id": "76d5cf1a-22bb-404f-8f30-d5ae8e6cae46",
        "fullName": "John Doe",
        "username": "john",
        "role": "admin",
        "password": "123456"
    },
    {
        "id": "10264cf5-23ea-4af7-a6a8-7ff8b3aa3142",
        "fullName": "Jane Doe",
        "username": "jane",
        "role": "user",
        "password": "123456"
    },

]

app.use(express.json())


app.get("/users", (req, res) => {
    try {
        const verified = jwt.verify(req.headers.access_token, KEY)
        const found = data.find(user => user.username === verified.username)
        if(found && verified.role === "admin" || verified.role === "manager"){
            res.send(data)
        }
        else{
            res.send([])
        }
    }
    catch(error) {
        res.send(error)
    }
})

app.post("/signup", (req, res) => {
    const newUser = {
        id: v4(),
        fullName: req.body.fullName,
        username: req.body.username,
        role: req.body.role,
        password: req.body.password,
    }
    const checkUsername = data.find(user => user.username === newUser.username)
    if(!checkUsername){
        data.push(newUser)
        res.send(newUser)
    }
    else {
        res.send("This username is used, please change it!")
    }
})

app.post("/login", (req, res) => {
    const { username, password, role } = req.query
    const checkUser = data.find(user => user.username === username)
    const info = {
        username,
        password,
        role
    }

    if(checkUser.role !== role) {
        res.send("Make your role correct!")
    }
    else if(checkUser) {
        const newToken = jwt.sign(info, KEY)
        res.send(newToken)
    }
    else {
       res.send("Sign up first!")
    }
})



app.listen(1000, console.log(1000))