const express = require("express")
const app = express()
const server = require("http").Server(app)
const io = require("socket.io")(server)
const uuid = require("uuid4")

const gameTypes = {
    1: [0, 1, 0],
    2: [0, 2, 0],
    3: [0, 3, 0],
    4: [0, 5, 0],
    5: [0, 7, 0],
    6: [0, 8, 0],
    7: [0, 10, 0],
    8: [0, 15, 0],
    9: [0, 25, 0],
    10: [0, 30, 0],
    11: [1, 0, 0],
    12: [1, 30, 0],
}

app.set("views", "./static")
app.set("view engine", "ejs")
app.use(express.static("static"))
app.use(express.urlencoded({ extended:false }))

const rooms = {}

app.get("/", (req, res) => {
    res.render("index", {rooms:rooms})
})

app.get("/local", (req, res) => {
    res.render("room", {room: "local"})
})

app.get("/:room", (req, res) => {
    res.render("room", {room: rooms})
    
})


io.on("connection", socket => {
    //TODO: This case should be handled at the end.

    socket.on("chose-type", data => {
        console.log(data)
    })

})

server.listen(4000, () => {
    console.log("Server started at port 4000.")
})