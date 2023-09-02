const socket = io("http://localhost:4000")
let userName = ""
if(localStorage.getItem("username") != null) userName = localStorage.getItem("username")
else {
    userName = prompt("Enter your name: ")
    localStorage.setItem("username", userName)
}

const userNameEle = document.querySelector(".user-name")
const gameTypes = document.querySelectorAll(".game")
const sameDeviceBtn = document.querySelector(".same-device")

userNameEle.innerText = userNameEle.innerText + " " + userName

gameTypes.forEach(one => {
    one.addEventListener("click", e => {
        let target = e.target
        if(e.target.tagName != "DIV") target = target.parentElement
        let data = target.getAttribute("data")
        socket.emit("chose-type", data)
    })
})

sameDeviceBtn.addEventListener("click", async() => {
    window.location.href = "http://localhost:4000/local"
})