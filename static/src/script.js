import * as moves from "./moves.js"
import * as startGame from "./startgame.js"

startGame.drawBoard(2)

const windowWidth = window.innerWidth
const windowHeight = window.innerHeight
let board = startGame.board
let player = 1
let checked = false
let checkMate = false
let moveState = false
let flip = true
const promotionPanel = document.querySelector(".promotion-panel")
let enpassant = []
let imgs = document.querySelectorAll(".piece")
let threatBoardWhite = [
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    ["w", "w", "w", "w", "w", "w", "w", "w"],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."]
]
let threatBoardBlack = [
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    ["b", "b", "b", "b", "b", "b", "b", "b"],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."]
]
let checkedSquares = [[]]
let possibleSquares = [[]]
let prevPosition = []
let prevPlays = []
const chessBoard = document.querySelector(".chess-board")
let rows = document.querySelectorAll(".row")
let squares = document.querySelectorAll(".square")
const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext('2d')
const pieceMoveAudio = document.querySelector(".piece-move")
const pieceCaptureAudio = document.querySelector(".piece-capture")
let whiteCastle = [false, false, false]     //? King moved, right rook moved, left rook moved
let blackCastle = [false, false, false]
const checkMatePanel = document.querySelector(".checkmate-panel")
const drawPanel = document.querySelector(".draw-panel")
const replayButton = document.querySelector(".replay")
let hours1 = 0
let hours2 = 0
let minutes1 = 1
let minutes2 = 0
let seconds1 = 0
let seconds2 = 1
let whiteTime = document.querySelector(".white").querySelector(".time")
let blackTime = document.querySelector(".black").querySelector(".time")
let totalSecs1 = hours1 * 3600 + minutes1 * 60 + seconds1
let totalSecs2 = hours2 * 3600 + minutes2 * 60 + seconds2
let interval1 = null;
let interval2 = null;

//! Add the canvas functionality to draw arrows.

let hoverListener = false
let arrows = []

canvas.setAttribute("width", windowHeight * (7 / 10))
canvas.setAttribute("height", windowHeight * (7 / 10))

let canvasRect = canvas.getBoundingClientRect()
let start = null
let end = null
let arrowColor = 1

document.onkeydown = function (e) {
    if (e.keyCode == 90) arrowColor = 1
    else if (e.keyCode == 88) arrowColor = 2
    else if (e.keyCode == 67) arrowColor = 3
};

//! Uncomment this when finish developing.
// document.addEventListener("contextmenu", e => {
//     e.preventDefault()
// })

document.onkeyup = function (e) {
    arrowColor = 1
}

function canvas_arrow(fromx, fromy, tox, toy, color) {
    var headlen = 30;
    var dx = tox - fromx;
    var dy = toy - fromy;
    var angle = Math.atan2(dy, dx);
    if (color == 1) ctx.strokeStyle = "rgba(255,166,0, 0.5)"
    else if (color == 2) ctx.strokeStyle = "rgba(0, 0, 255, 0.5)"
    else if (color == 3) ctx.strokeStyle = "rgba(86, 6, 102, 0.5)"
    ctx.lineWidth = "10"
    ctx.moveTo(fromx, fromy);
    ctx.lineTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle - Math.PI / 6), toy - headlen * Math.sin(angle - Math.PI / 6));
    ctx.moveTo(tox, toy);
    ctx.lineTo(tox - headlen * Math.cos(angle + Math.PI / 6), toy - headlen * Math.sin(angle + Math.PI / 6));
}

squares.forEach(one => {
    one.addEventListener("mousedown", (e) => {
        if (e.button == 2) {
            let startRect = e.target.getBoundingClientRect()
            start = [startRect.x + 0.5 * startRect.width, startRect.y + 0.5 * startRect.height]
            hoverListener = true
            squares.forEach(onee => {
                onee.addEventListener("mouseover", e2 => {
                    if (hoverListener) {
                        let endRect = e2.target.getBoundingClientRect()
                        end = [endRect.x + 0.5 * endRect.width, endRect.y + 0.5 * endRect.height]
                        if (startRect.x != endRect.x || startRect.y != endRect.y) {
                            ctx.clearRect(0, 0, canvas.width, canvas.height)
                            if (arrows.length > 0) arrows.pop()
                            for (let i = 0; i < arrows.length; ++i) {
                                let start = arrows[i][0]
                                let end = arrows[i][1]
                                let color = arrows[i][2]
                                ctx.beginPath()
                                canvas_arrow(start[0] - canvasRect.x, start[1] - canvasRect.y, end[0] - canvasRect.x, end[1] - canvasRect.y + 10, color)
                                ctx.stroke()
                                ctx.closePath()
                            }
                            arrows.push([[start[0], start[1]], [end[0], end[1]], arrowColor])
                            ctx.beginPath()
                            canvas_arrow(start[0] - canvasRect.x, start[1] - canvasRect.y, end[0] - canvasRect.x, end[1] - canvasRect.y + 10, arrowColor)
                            ctx.stroke()
                            ctx.closePath()
                        }
                    }
                })
            })
        }
    })
})

squares.forEach((one) => {
    one.addEventListener("mouseup", (e) => {
        if (e.button == 2) {
            hoverListener = false
            if (start != null && end != null) arrows.push([start, end])
            start = null
            end = null
        }
    })
})

//! End of the feature.

const canMoveTo = (x, y) => {
    for (let i = 0; i < possibleSquares.length; i++) {
        if (y == possibleSquares[i][0] && x == possibleSquares[i][1]) {
            return true
        }
    }
    return false
}

window.addEventListener("click", async (e) => {
    try {
        if (!e.target.classList.contains("square") && !e.target.parentElement.classList.contains("square")) {
            for (let i = 0; i < 8; i++) {
                for (let j = 0; j < 8; j++) {
                    chessBoard.children[i].children[j].children[0].classList.add("hidden")
                    chessBoard.children[i].children[j].classList.remove("highlight")
                    chessBoard.children[i].children[j].classList.remove("highlight2")
                    ctx.clearRect(0, 0, canvas.width, canvas.height)
                    arrows = []
                }
            }
        }
    }
    catch (err) {
        return
    }
})

const addEffects = () => {
    for (let p of possibleSquares) {
        let y = p[0]
        let x = p[1]
        chessBoard.children[y].children[x].children[0].classList.remove("hidden")
    }
}

const clearEffects = () => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            chessBoard.children[i].children[j].children[0].classList.add("hidden")
            chessBoard.children[i].children[j].classList.remove("highlight")
            chessBoard.children[i].children[j].classList.remove("highlight2")
        }
    }
}

squares.forEach((one) => {
    one.addEventListener("click", (e) => {
        let x, y;
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        arrows = []

        clearEffects()

        if (e.target.tagName == 'IMG') {
            y = parseInt(e.target.parentElement.parentElement.getAttribute("data")) - 1
            x = parseInt(e.target.parentElement.getAttribute("data")) - 1
        }
        else {
            y = parseInt(e.target.parentElement.getAttribute("data")) - 1
            x = parseInt(e.target.getAttribute("data")) - 1
        }
        if (e.target.tagName == 'IMG') {
            initiateMoves(x, y)
        }

        //! move process

        if (moveState == true && canMoveTo(x, y)) {
            makeMove(e, x, y)

            if (flip == true) resetBoard()
        }
    })
})

const initiateMoves = (x, y) => {
    let piece = board[y][x]
    if ((player == 1 && piece[0] == "w") || (player == 2 && piece[0] == "b")) {
        moveState = true
        if (piece.length == 3) piece = "kn"
        else {
            piece = piece[1]
        }
        prevPosition = [y, x]

        possibleSquares = callMoves(piece, x, y)
        if (y == 3 && piece == "p") {
            if (enpassant.length > 0) {
                for (let i = 0; i < enpassant.length; ++i) {
                    if (Math.abs(enpassant[i][1] - x) == 1 && player != enpassant[i][2]) {
                        if (enpassant[i][1] > x && moves.isValid(y - 1, x + 1)) possibleSquares.push([y - 1, x + 1])
                        if (enpassant[i][1] < x && moves.isValid(y - 1, x - 1)) possibleSquares.push([y - 1, x - 1])
                    }
                }

            }
        }

        if (piece == 'k') {
            checkCastling()
        }

        validateMove(x, y, possibleSquares)

        addEffects()
    }
}

const isEndGame = () => {
    let arr = []
    let numberOfMoves = 0
    let kingPos = null
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let piece = board[i][j]
            if ((piece[0] == 'w' && player == 1) || (piece[0] == 'b' && player == 2)) {
                piece = piece.substring(1)
                let a = i
                let b = j
                if (piece == 'p') {
                    a = 7 - i
                    b = 7 - j
                }
                arr = callMoves(piece, b, a)
                validateMove(j, i, arr)
                if (piece == 'k') kingPos = [i, j]
                numberOfMoves += arr.length
            }
        }
    }

    if (numberOfMoves == 0) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (player == 1) {
                    if (threatBoardBlack[kingPos[0]][kingPos[1]] != '.') {
                        return 1
                    }
                    else {
                        return 2
                    }
                }
                else {
                    if (threatBoardWhite[kingPos[0]][kingPos[1]] != '.') {
                        return 1
                    }
                    else {
                        return 2
                    }
                }
            }
        }
    }
    else {
        return 0
    }
}

const checkCastling = () => {
    let castleInfo = []
    let threatBoard = []
    let kingPos = null
    let rightCastle = true
    let leftCastle = true
    if (player == 1) {
        castleInfo = whiteCastle
        kingPos = [7, 4]
        threatBoard = threatBoardBlack
    }
    else {
        castleInfo = blackCastle
        kingPos = [7, 3]
        threatBoard = threatBoardWhite
    }

    let x = kingPos[0]
    let y = kingPos[1]

    for (let i = 0; i < 2; i++, y--) {
        if ((board[x][y] != '.' && board[x][y][1] != 'k') || threatBoard[x][y] != '.') {
            console.log(threatBoard)
            console.log("no leftCastle")
            leftCastle = false
            break
        }
    }

    y = kingPos[1]

    for (let i = 0; i < 2; i++, y++) {
        if ((board[x][y] != '.' && board[x][y][1] != 'k') || threatBoard[x][y] != '.') {
            console.log(threatBoard)
            console.log(x, y)
            console.log("no rightCastle")
            rightCastle = false
            break
        }
    }

    y = kingPos[1]

    if (!castleInfo[0]) {
        if (!castleInfo[1] && rightCastle) {
            possibleSquares.push([x, y + 2])
        }
        if (!castleInfo[2] && leftCastle) {
            possibleSquares.push([x, y - 2])
        }
    }
}

const makeMove = (e, x, y) => {
    let a = prevPosition[0]
    let b = prevPosition[1]
    for (let p of prevPlays) {
        let div = chessBoard.children[p[0]].children[p[1]]
        div.classList.remove("prev")
        div.classList.remove("prev2")
    }
    let cell = e.target;

    if (e.target.tagName == "IMG") cell = cell.parentElement
    if (board[y][x] != '.') {
        pieceCaptureAudio.play()
    } else pieceMoveAudio.play()
    prevPlays = []


    board[y][x] = board[a][b]
    board[a][b] = '.'
    prevPlays.push([y, x])
    prevPlays.push([a, b])

    let piece = board[y][x]

    if ((piece == "wk" || piece == "bk") && Math.abs(x - b) == 2) {
        if (x < b) {
            board[7][x + 1] = board[7][0]
            board[7][0] = '.'
        }
        else {
            board[7][x - 1] = board[7][7]
            board[7][7] = '.'
        }
    }

    if (piece == "wr") {
        if (x == 0) whiteCastle[2] = true
        else if (x == 7) whiteCastle[1] = true
    }
    else if (piece == "br") {
        if (x == 0) blackCastle[2] = true
        else if (x == 7) blackCastle[1] = true
    }
    else if (piece == "wk") {
        whiteCastle[0] = true
    }
    else if (piece == "bk") {
        blackCastle[0] = true
    }

    //TODO: We should add the code to check if castling necessary pieces moved here

    if (piece[1] == "p" && y == 4 && a == 6) {
        enpassant.push([7 - y, 7 - x, player])
    }
    for (let i = 0; i < enpassant.length; ++i) {
        if (board[3][enpassant[i][1]][0] != board[2][enpassant[i][1]][0] && board[2][enpassant[i][1]] != "." && board[2][enpassant[i][1]][1] == "p") {
            board[3][enpassant[i][1]] = "."
        }
    }
    checkPromote()
}

const resetBoard = () => {
    checkThreat()
    moveState = false
    prevPosition = []
    possibleSquares = [[]]
    flip = true

    if (player == 1) {
        player = 2
        clearInterval(interval1)
        interval2 = setInterval(() => {
            blackTime.children[0].innerText = Math.floor(totalSecs2 / 3600).toString() + ":"
            let rem = totalSecs2 - Math.floor(totalSecs2 / 3600) * 3600
            blackTime.children[1].innerText = Math.floor(rem / 60).toString() + ":"
            rem = rem - Math.floor(rem / 60) * 60
            blackTime.children[2].innerText = Math.floor(rem)
            if (totalSecs2 == 0) {
                clearInterval(interval1)
                clearInterval(interval2)
                let text = "White won"
                checkMatePanel.children[0].children[0].innerText = text
                checkMatePanel.children[1].children[0].innerText = "By Time"
                checkMatePanel.style.display = "flex"
                checkMatePanel.showModal();
                checkMatePanel.style.opacity = "1"
                chessBoard.style.filter = "blur(.5rem)"
            }
            totalSecs2 -= 1
        }, 1000)
        startGame.drawPieces()
    }
    else {
        player = 1
        clearInterval(interval2)
        interval1 = setInterval(() => {
            whiteTime.children[0].innerText = Math.floor(totalSecs1 / 3600).toString() + ":"
            let rem = totalSecs1 - Math.floor(totalSecs1 / 3600) * 3600
            whiteTime.children[1].innerText = Math.floor(rem / 60).toString() + ":"
            rem = rem - Math.floor(rem / 60) * 60
            whiteTime.children[2].innerText = Math.floor(rem)
            if (totalSecs1 == 0) {
                clearInterval(interval1)
                clearInterval(interval2)
                let text = "Black won"
                checkMatePanel.children[0].children[0].innerText = text
                checkMatePanel.children[1].children[0].innerText = "By Time"
                checkMatePanel.style.display = "flex"
                checkMatePanel.showModal();
                checkMatePanel.style.opacity = "1"
                chessBoard.style.filter = "blur(.5rem)"
            }
            totalSecs1 -= 1
        }, 1000)
        startGame.drawPieces()
    }

    console.log(threatBoardBlack)
    console.log(threatBoardWhite)

    let endGame = isEndGame()
    if (endGame == 1) {
        let text = ""
        if (player == 1) text = "Black won"
        else text = "White won"
        checkMatePanel.children[0].children[0].innerText = text
        checkMatePanel.style.display = "flex"
        checkMatePanel.showModal();
        checkMatePanel.style.opacity = "1"
        chessBoard.style.filter = "blur(.5rem)"

    }
    else if (endGame == 2) {
        drawPanel.style.display = "flex"
        drawMatePanel.showModal();
        checkMatePanel.style.opacity = "1"
        chessBoard.style.filter = "blur(.5rem)"
    }
    else if (endGame == 0) {
        console.log("game is on")
    }

    if (enpassant.length > 0) {
        for (let i = 0; i < enpassant.length; ++i) {
            if (enpassant[i][2] == player) {
                enpassant.splice(i, 1)
                break
            }
        }
    }

    setTimeout(() => {
        for (let p of prevPlays) {
            let div = chessBoard.children[7 - p[0]].children[7 - p[1]]
            if (div.classList.contains("light")) {
                div.classList.add("prev")
            }
            else {
                div.classList.add("prev2")
            }
        }
    }, 60)
}

squares.forEach(one => {
    one.addEventListener("contextmenu", (e) => {
        e.preventDefault()
        let cell = e.target
        if (cell.tagName == 'IMG') {
            cell = cell.parentElement
        }
        if (cell.classList.contains("light")) cell.classList.toggle("highlight")
        else cell.classList.toggle("highlight2")
    })
})

const checkThreat = () => {
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            threatBoardBlack[i][j] = '.'
            threatBoardWhite[i][j] = '.'
        }
    }
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            let cur = board[i][j]
            let piece = ""
            if (cur.length == 3) piece = "kn"
            else piece = cur[1]

            let pieceMoves = []

            if (piece != 'p') {
                pieceMoves = callMoves(piece, j, i)
            }
            else {
                if (player == 1) {
                    if (cur[0] == 'b' && i - 1 >= 0) {
                        if (j + 1 < 8) pieceMoves.push([i - 1, j + 1])
                        if (j - 1 >= 0) pieceMoves.push([i - 1, j - 1])
                    }
                    else if (cur[0] == 'w' && i + 1 < 8) {
                        if (j + 1 < 8) pieceMoves.push([i + 1, j + 1])
                        if (j - 1 >= 0) pieceMoves.push([i + 1, j - 1])
                    }
                }
                else {
                    if (cur[0] == 'w' && i - 1 >= 0) {
                        if (j + 1 < 8) pieceMoves.push([i - 1, j + 1])
                        if (j - 1 >= 0) pieceMoves.push([i - 1, j - 1])
                    }
                    else if (cur[0] == 'b' && i + 1 < 8) {
                        if (j + 1 < 8) pieceMoves.push([i + 1, j + 1])
                        if (j - 1 >= 0) pieceMoves.push([i + 1, j - 1])
                    }
                }
            }
            for (let i of pieceMoves) {
                if (i.length > 0) {
                    if (cur[0] == 'w') {
                        threatBoardWhite[i[0]][i[1]] = 'w'
                    }
                    else {
                        threatBoardBlack[i[0]][i[1]] = 'b'
                    }
                }
            }
        }
    }
}

const callMoves = (piece, x, y) => {
    let arr = []
    if (piece == 'p') {
        arr = moves.pawnMove(y, x)
    }
    else if (piece == 'r') {
        arr = moves.rookMove(y, x)
    }
    else if (piece == "kn") {
        arr = moves.knightMove(y, x)
    }
    else if (piece == 'b') {
        arr = moves.bishopMove(y, x)
    }
    else if (piece == 'k') {
        arr = moves.kingMove(y, x)
    }
    else if (piece == 'q') {
        arr = moves.queenMove(y, x)
    }
    return arr
}

//! Promotion handling

function checkPromote() {
    if (player == 1) {
        for (let i = 0; i < 8; ++i) {
            if (board[0][i] == "wp") {
                flip = false
                promotionPanel.style.background = "#444"
                let cell = chessBoard.children[0].children[i]
                let rect = cell.getBoundingClientRect()
                promotionPanel.style.left = `${rect.x}px`
                promotionPanel.style.top = `${rect.y + 100}px`
                promotionPanel.children[0].classList.add("active")
                promotionPanel.classList.add("active")
                promotionPanel.showModal()
                let imgs = promotionPanel.children[0].querySelectorAll("img")
                imgs.forEach(one => {
                    one.style.background = "#333"
                    one.addEventListener("click", e => {
                        let ele = e.target
                        let data = ele.getAttribute("data")
                        for (let p of cell.children) {
                            if (p.tagName == "IMG") {
                                p.remove()
                                break
                            }
                        }
                        let img = document.createElement("img")
                        if (data == "q") {
                            board[0][i] = "wq"
                            img.src = "./images/Chess_qlt45.svg"
                            cell.append(img)
                        } else if (data == "r") {
                            board[0][i] = "wr"
                            img.src = "./images/Chess_rlt45.svg"
                            cell.append(img)
                        } else if (data == "k") {
                            board[0][i] = "wkn"
                            img.src = "./images/Chess_klt45.svg"
                            cell.append(img)
                        } else if (data == "b") {
                            board[0][i] = "wb"
                            img.src = "./images/Chess_blt45.svg"
                            cell.append(img)
                        }
                        promotionPanel.classList.remove("active")
                        promotionPanel.children[0].classList.remove("active")
                        promotionPanel.close()
                        resetBoard()
                    })
                })
            }
        }
    } else {
        for (let i = 0; i < 8; ++i) {
            if (board[0][i] == "bp") {
                flip = false
                promotionPanel.style.background = "#ccc"
                let cell = chessBoard.children[0].children[i]
                let rect = cell.getBoundingClientRect()
                promotionPanel.style.left = `${rect.x}px`
                promotionPanel.style.top = `${rect.y + 100}px`
                promotionPanel.children[1].classList.add("active")
                promotionPanel.classList.add("active")
                promotionPanel.showModal()
                let imgs = promotionPanel.children[1].querySelectorAll("img")
                imgs.forEach(one => {
                    one.style.background = "#aaa"
                    one.addEventListener("click", e => {
                        let ele = e.target
                        let data = ele.getAttribute("data")
                        for (let p of cell.children) {
                            if (p.tagName == "IMG") {
                                p.remove()
                                break
                            }
                        }
                        let img = document.createElement("img")
                        if (data == "q") {
                            board[0][i] = "bq"
                            img.src = "./images/Chess_qdt45.svg"
                            cell.append(img)
                        } else if (data == "r") {
                            board[0][i] = "br"
                            img.src = "./images/Chess_rdt45.svg"
                            cell.append(img)
                        } else if (data == "k") {
                            board[0][i] = "bkn"
                            img.src = "./images/Chess_kdt45.svg"
                            cell.append(img)
                        } else if (data == "b") {
                            board[0][i] = "bb"
                            img.src = "./images/Chess_bdt45.svg"
                            cell.append(img)
                        }
                        promotionPanel.classList.remove("active")
                        promotionPanel.children[1].classList.remove("active")
                        promotionPanel.close()
                        resetBoard()
                    })
                })
            }
        }
    }
}

const validateMove = (x, y, array) => {
    let arr = []
    let prevThreatWhite = threatBoardWhite
    let prevThreatBlack = threatBoardBlack
    for (let q = 0; q < array.length; q++) {
        let a = array[q][0]
        let b = array[q][1]
        let prevPos1 = board[y][x]
        let prevPos2 = board[a][b]
        board[a][b] = board[y][x]
        board[y][x] = '.'
        checkThreat()
        let kingPos = null
        let kingName
        if (player == 1) kingName = "wk"
        else kingName = "bk"
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {
                if (board[i][j] == kingName) {
                    kingPos = [i, j]
                    break
                }
            }
            if (kingPos != null) break
        }
        if (player == 1) {
            if (threatBoardBlack[kingPos[0]][kingPos[1]] != '.') {
                arr.push(q)
            }
        }
        else {
            if (threatBoardWhite[kingPos[0]][kingPos[1]] != '.') {
                arr.push(q)
            }
        }
        board[y][x] = prevPos1
        board[a][b] = prevPos2
    }
    for (let i = 0; i < arr.length; i++) {
        array.splice(arr[i] - i, 1)
    }
    threatBoardWhite = prevThreatWhite
    threatBoardBlack = prevThreatBlack
}

//! Dragging pieces feature

let draggingCan = []

squares.forEach(one => {
    one.addEventListener("dragover", e => {
        e.preventDefault()
    })
    one.addEventListener("drop", e => {
        let x = parseInt(e.target.getAttribute("data")) - 1
        let y = parseInt(e.target.parentElement.getAttribute("data")) - 1
        if (e.target.tagName == "IMG") {
            x = parseInt(e.target.parentElement.getAttribute("data")) - 1
            y = parseInt(e.target.parentElement.parentElement.getAttribute("data")) - 1
        }

        clearEffects()

        //! move process

        if (moveState == true && canMoveTo(x, y)) {
            makeMove(e, x, y)
            if (flip == true) resetBoard()
        }
    })
})

document.addEventListener("mousedown", e => {
    imgs = chessBoard.querySelectorAll(".piece")
    imgs.forEach(one => {
        one.addEventListener("dragstart", e => {
            let draggingX = e.target.parentElement.getAttribute("data") - 1
            let draggingY = e.target.parentElement.parentElement.getAttribute("data") - 1
            initiateMoves(draggingX, draggingY)
        })
    })
})

replayButton.addEventListener("click", () => {
    checkMatePanel.children[0].children[0].innerText = text
    checkMatePanel.style.display = "none"
    checkMatePanel.style.opacity = "0"
    chessBoard.style.filter = "blur(0px)"
    player = 1
    board = [["wr", "wkn", "wb", "wq", "wk", "wb", "wkn", "wr"],
    ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    [".", ".", ".", ".", ".", ".", ".", "."],
    ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
    ["br", "bkn", "bb", "bq", "bk", "bb", "bkn", "br"]
    ]
    startGame.setBoard(2)
    startGame.drawBoard(2)
})

whiteTime.children[0].innerText = hours1.toString() + ":"
whiteTime.children[1].innerText = minutes1.toString() + ":"
whiteTime.children[2].innerText = seconds1.toString()
blackTime.children[0].innerText = hours2.toString() + ":"
blackTime.children[1].innerText = minutes2.toString() + ":"
blackTime.children[2].innerText = seconds2.toString()
totalSecs2 -= 1

interval1 = setInterval(() => {
    totalSecs1 -= 1
    whiteTime.children[0].innerText = Math.floor(totalSecs1 / 3600).toString() + ":"
    let rem = totalSecs1 - Math.floor(totalSecs1 / 3600) * 3600
    whiteTime.children[1].innerText = Math.floor(rem / 60).toString() + ":"
    rem = rem - Math.floor(rem / 60) * 60
    whiteTime.children[2].innerText = Math.floor(rem)
    if (totalSecs1 == 0) {
        clearInterval(interval1)
        clearInterval(interval2)
        let text = "Black won"
        checkMatePanel.children[0].children[0].innerText = text
        checkMatePanel.children[1].children[0].innerText = "By Time"
        checkMatePanel.style.display = "flex"
        checkMatePanel.showModal();
        checkMatePanel.style.opacity = "1"
        chessBoard.style.filter = "blur(.5rem)"
    }
}, 1000)
