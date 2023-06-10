const express = require("express")                                                          //ESM EcmaScript modules

//create instance of express
const app = express()
app.use(express.json())



//common js syntax
const users = require("./users")

app.use(express.json())

//base route
app.get("/", (req, res) => {
    res.json({
        message: "Welcome to Express!!!",
    })
})

//Users - CRUD operation
//getALL
app.get("/users", (req, res) => {
    res.json(users)
})

//getByID
app.get("/users/:id", (req, res) => {
    const id = req.params.id
    const user = users.find(user => user.id === Number(id))
    res.json(user)
})

//CreateUser
app.post("/users", (req, res) => {
    const user = req.body
    users.push(user)
    res.json(user)
})

//update Existing User
app.put("/users/:id", (req, res) => {
    //get id from URL
    const id = req.params.id
    //get desired updates from request body
    const updates = req.body

    //find user by ID
    const user = users.find(user => user.id === Number(id))
    //find users position in array by ID from URL
    const userIndex = users.findIndex(user => user.id === Number(id))

    //create new object with original user data 
    //then overwrite with our updates
const updatedUser = {
    ...user,
    ...updates,
}

    users.splice(userIndex,1, updatedUser)
    console.log(updatedUser)
    console.log(userIndex)


    res.json(users)

})

//delete existing user
app.delete("/users/:id", (req, res) => {
    //get id from URL
    const id = req.params.id
    const updates = req.body
    //find user by ID
    const user = users.find(user => user.id === Number(id))
    //find users position in array by ID from URL
    const userIndex = users.findIndex(user => user.id === Number(id))
    //create new object with original user data 
    //then overwrite with our updates
const updatedUser = {
    ...user,
    ...updates,
}

    users.splice(userIndex,1)
    console.log(updatedUser)
    console.log(userIndex)
    res.json(users)
})

//Creat a variable for PORT
const PORT = process.env.PORT || 8888

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})