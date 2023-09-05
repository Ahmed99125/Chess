let board = [[]];

const chessBoard = document.querySelector(".chess-board")
const dataPanel = document.querySelector(".data-panel")
const rows = document.querySelectorAll(".row")
const squares = document.querySelectorAll(".square")
const svgs = {
    "wk": "./images/Chess_klt45.svg",
    "wkn": "./images/Chess_nlt45.svg",
    "wb": "./images/Chess_blt45.svg",
    "wq": "./images/Chess_qlt45.svg",
    "wr": "./images/Chess_rlt45.svg",
    "wp": "./images/Chess_plt45.svg",
    "bk": "./images/Chess_kdt45.svg",
    "bkn": "./images/Chess_ndt45.svg",
    "bb": "./images/Chess_bdt45.svg",
    "bq": "./images/Chess_qdt45.svg",
    "br": "./images/Chess_rdt45.svg",
    "bp": "./images/Chess_pdt45.svg"
}

let d = Math.min(document.documentElement.clientHeight * 7.5/10, (document.documentElement.clientWidth) * 8/10)
if (document.documentElement.clientWidth >= 1000) {
    d = Math.min(document.documentElement.clientHeight * 7.5/10, (document.documentElement.clientWidth - dataPanel.clientWidth) * 8/10)
}
chessBoard.style.height = `${d}px`
chessBoard.style.width = chessBoard.style.height
if (document.documentElement.clientWidth >= 1000) {
    dataPanel.style.height = chessBoard.style.height
    dataPanel.style.width = ""
}
else {
    dataPanel.style.width = chessBoard.style.width
    dataPanel.style.height = ""
}

window.addEventListener("resize", e => {
    let d = Math.min(document.documentElement.clientHeight * 7.5/10, (document.documentElement.clientWidth) * 8/10)
    if (document.documentElement.clientWidth >= 1000) {
        d = Math.min(document.documentElement.clientHeight * 7.5/10, (document.documentElement.clientWidth - dataPanel.clientWidth) * 8/10)
    }
    chessBoard.style.height = `${d}px`
    chessBoard.style.width = chessBoard.style.height
    if (document.documentElement.clientWidth >= 1000) {
        dataPanel.style.height = chessBoard.style.height
        dataPanel.style.width = ""
    }
    else {
        dataPanel.style.width = chessBoard.style.width
        dataPanel.style.height = ""
    }
})


const setBoard = (p) => {
    if (p == 1) {
        board = [
            ["br", "bkn", "bb", "bq", "bk", "bb", "bkn", "br"],
            ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
            [".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", "."],
            [".", ".", ".", ".", ".", ".", ".", "."],
            ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
            ["wr", "wkn", "wb", "wq", "wk", "wb", "wkn", "wr"]
        ]
    }
    else {
        board = [["wr", "wkn", "wb", "wq", "wk", "wb", "wkn", "wr"],
        ["wp", "wp", "wp", "wp", "wp", "wp", "wp", "wp"],
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."],
        [".", ".", ".", ".", ".", ".", ".", "."],
        ["bp", "bp", "bp", "bp", "bp", "bp", "bp", "bp"],
        ["br", "bkn", "bb", "bq", "bk", "bb", "bkn", "br"]
        ]
    }
}

setBoard(2)

const drawBoard = (p) => {

    if (p == 1) {
        chessBoard.innerHTML = `
        <div class="board-row" data="1">
        <div class="square light" data="1">
            <div class="couldMove hidden"></div>
            <div class="r dark">8</div>
        </div>
        <div class="square dark" data="2">
            <div class="couldMove hidden"></div>
        </div>
        <div class="square light" data="3">
            <div class="couldMove hidden"></div>
        </div>
        <div class="square dark" data="4">
            <div class="couldMove hidden"></div>
        </div>
        <div class="square light" data="5">
            <div class="couldMove hidden"></div>
        </div>
        <div class="square dark" data="6">
            <div class="couldMove hidden"></div>
        </div>
        <div class="square light" data="7">
            <div class="couldMove hidden"></div>
        </div>
        <div class="square dark" data="8">
            <div class="couldMove hidden"></div>
        </div>
      </div>
      <div class="board-row" data="2">
          <div class="square dark" data="1">
            <div class="couldMove hidden"></div>
            <div class="r light">7</div>
          </div>
          <div class="square light" data="2">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="3">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="4">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="5">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="6">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="7">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="8">
          <div class="couldMove hidden"></div>
          </div>
      </div>
      <div class="board-row" data="3">
          <div class="square light" data="1">
          <div class="couldMove hidden"></div>
            <div class="r dark">6</div>
          </div>
          <div class="square dark" data="2">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="3">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="4">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="5">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="6">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="7">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="8">
          <div class="couldMove hidden"></div>
          </div>
      </div>
      <div class="board-row" data="4">
          <div class="square dark" data="1">
          <div class="couldMove hidden"></div>
          <div class="r light">5</div>
          </div>
          <div class="square light" data="2">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="3">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="4">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="5">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="6">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="7">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="8">
          <div class="couldMove hidden"></div>
          </div>
      </div>
      <div class="board-row" data="5">
          <div class="square light" data="1">
          <div class="couldMove hidden"></div>
          <div class="r dark">4</div>
          </div>
          <div class="square dark" data="2">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="3">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="4">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="5">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="6">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="7">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="8">
          <div class="couldMove hidden"></div>
          </div>
      </div>
      <div class="board-row" data="6">
          <div class="square dark" data="1">
          <div class="couldMove hidden"></div>
          <div class="r light">3</div>
          </div>
          <div class="square light" data="2">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="3">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="4">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="5">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="6">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="7">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="8">
          <div class="couldMove hidden"></div>
          </div>
      </div>
      <div class="board-row" data="7">
          <div class="square light" data="1">
          <div class="couldMove hidden"></div>
              <div class="r dark">2</div>
          </div>
          <div class="square dark" data="2">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="3">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="4">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="5">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="6">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="7">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="8">
          <div class="couldMove hidden"></div>
          </div>
      </div>
      <div class="board-row" data="8">
          <div class="square dark" data="1">
          <div class="couldMove hidden"></div>
              <div class="r light">1</div><div class="c light">a</div>
          </div>
          <div class="square light" data="2">
          <div class="couldMove hidden"></div>
          <div class="c dark">b</div>
          </div>
          <div class="square dark" data="3">
          <div class="couldMove hidden"></div>
              <div class="c light">c</div>
          </div>
          <div class="square light" data="4">
          <div class="couldMove hidden"></div>
              <div class="c dark">d</div>
          </div>
          <div class="square dark" data="5">
          <div class="couldMove hidden"></div>
              <div class="c light">e</div>
          </div>
          <div class="square light" data="6">
          <div class="couldMove hidden"></div>
              <div class="c dark">f</div>
          </div>
          <div class="square dark" data="7">
          <div class="couldMove hidden"></div>
              <div class="c light">g</div>
          </div>
          <div class="square light" data="8">
          <div class="couldMove hidden"></div>
              <div class="c dark">h</div>
          </div>
      </div>
          `
        setBoard(1)
    }
    else if (p == 2) {
        chessBoard.innerHTML = `
        <div class="board-row" data="1">
        <div class="square light" data="1">
        <div class="couldMove hidden"></div>
        <div class="r dark">1</div>
        </div>
        <div class="square dark" data="2">
        <div class="couldMove hidden"></div>
        </div>
        <div class="square light" data="3">
        <div class="couldMove hidden"></div>
        </div>
        <div class="square dark" data="4">
        <div class="couldMove hidden"></div>
        </div>
        <div class="square light" data="5">
        <div class="couldMove hidden"></div>
        </div>
        <div class="square dark" data="6">
        <div class="couldMove hidden"></div>
        </div>
        <div class="square light" data="7">
        <div class="couldMove hidden"></div>
        </div>
        <div class="square dark" data="8">
        <div class="couldMove hidden"></div>
        </div>
      </div>
      <div class="board-row" data="2">
          <div class="square dark" data="1">
          <div class="couldMove hidden"></div>
              <div class="r light">2</div>
          </div>
          <div class="square light" data="2">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="3">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="4">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="5">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="6">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="7">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="8">
          <div class="couldMove hidden"></div>
          </div>
      </div>
      <div class="board-row" data="3">
      <div class="square light" data="1">
      <div class="couldMove hidden"></div>
      <div class="r dark">3</div>
          </div>
          <div class="square dark" data="2">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="3">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="4">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="5">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="6">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="7">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="8">
          <div class="couldMove hidden"></div>
          </div>
      </div>
      <div class="board-row" data="4">
          <div class="square dark" data="1">
          <div class="couldMove hidden"></div>
          <div class="r light">4</div>
          </div>
          <div class="square light" data="2">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="3">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="4">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="5">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="6">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="7">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="8">
          <div class="couldMove hidden"></div>
          </div>
      </div>
      <div class="board-row" data="5">
          <div class="square light" data="1">
          <div class="couldMove hidden"></div>
          <div class="r dark">5</div>
          </div>
          <div class="square dark" data="2">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="3">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="4">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="5">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="6">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="7">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="8">
          <div class="couldMove hidden"></div>
          </div>
      </div>
      <div class="board-row" data="6">
          <div class="square dark" data="1">
          <div class="couldMove hidden"></div>
          <div class="r light">6</div>
          </div>
          <div class="square light" data="2">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="3">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="4">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="5">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="6">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="7">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="8">
          <div class="couldMove hidden"></div>
          </div>
      </div>
      <div class="board-row" data="7">
          <div class="square light" data="1">
          <div class="couldMove hidden"></div>
          <div class="r dark">7</div>
          </div>
          <div class="square dark" data="2">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="3">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="4">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="5">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="6">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square light" data="7">
          <div class="couldMove hidden"></div>
          </div>
          <div class="square dark" data="8">
          <div class="couldMove hidden"></div>
          </div>
      </div>
      <div class="board-row" data="8">
          <div class="square dark" data="1">
          <div class="couldMove hidden"></div>
              <div class="r light">8</div><div class="c light">h</div>
          </div>
          <div class="square light" data="2">
          <div class="couldMove hidden"></div>
              <div class="c dark">g</div>
          </div>
          <div class="square dark" data="3">
          <div class="couldMove hidden"></div>
              <div class="c light">f</div>
          </div>
          <div class="square light" data="4">
          <div class="couldMove hidden"></div>
              <div class="c dark">e</div>
          </div>
          <div class="square dark" data="5">
          <div class="couldMove hidden"></div>
              <div class="c light">d</div>
          </div>
          <div class="square light" data="6">
          <div class="couldMove hidden"></div>
              <div class="c dark">c</div>
          </div>
          <div class="square dark" data="7">
          <div class="couldMove hidden"></div>
              <div class="c light">b</div>
          </div>
          <div class="square light" data="8">
          <div class="couldMove hidden"></div>
              <div class="c dark">a</div>
          </div>
      </div>
          `
    }
    drawPieces()
}

let first = true

const drawPieces = () => {
    setTimeout(() => {
        board.reverse()
        if (!first) {
            for (let row of board) {
                row.reverse()
            }
        }
        first = false

        const letters = document.querySelectorAll(".c")

        for (let i = 0; i < 4; i++) {
            let tmp = letters[i].innerHTML
            letters[i].innerHTML = letters[letters.length-1-i].innerHTML
            letters[letters.length-1-i].innerHTML = tmp
        }

        for (let i = 0; i < 8; ++i) {
            for (let j = 0; j < 8; ++j) {
                let piece = board[7 - i][7 - j]
                let childs = chessBoard.children[7 - i].children[7 - j].children
                if (childs[childs.length - 1].tagName == "IMG") {
                    childs[childs.length - 1].remove()
                }
                chessBoard.children[7 - i].children[7 - j].classList.remove("prev")
                chessBoard.children[7 - i].children[7 - j].classList.remove("prev2")
                if (piece != ".") {
                    let img = document.createElement("img")
                    img.src = svgs[piece]
                    img.draggable = true
                    img.classList.add("piece")
                    let div = chessBoard.children[7 - i].children[7 - j].append(img)
                }
            }
        }
        }, 60)
}

export { board, drawBoard, chessBoard, rows, squares, drawPieces, setBoard };