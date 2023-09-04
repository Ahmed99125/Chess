import { board } from "./startgame.js"

const isValid = (x, y) => {
    if (x >= 0 && x < 8 && y >= 0 && y < 8) return true;
    return false;
}

const rookMove = (x, y) => {
    let canMove = [];
    let state = board[x][y][0];
    let pos1 = x
    let pos2 = y
    while (isValid(pos1 - 1, pos2) && board[pos1 - 1][pos2][0] != state) {
        canMove.push([pos1 - 1, pos2]);
        if (board[pos1 - 1][pos2] != '.')
            break;
        pos1--;
    }
    pos1 = x
    pos2 = y
    while (isValid(pos1 + 1, pos2) && board[pos1 + 1][pos2][0] != state) {
        canMove.push([pos1 + 1, pos2]);
        if (board[pos1 + 1][pos2] != '.')
            break;
        pos1++;
    }
    pos1 = x
    pos2 = y
    while (isValid(pos1, pos2 + 1) && board[pos1][pos2 + 1][0] != state) {
        canMove.push([pos1, pos2 + 1]);
        if (board[pos1][pos2 + 1] != '.')
            break;
        pos2++;
    }
    pos1 = x
    pos2 = y
    while (isValid(pos1, pos2 - 1) && board[pos1][pos2 - 1][0] != state) {
        canMove.push([pos1, pos2 - 1]);
        if (board[pos1][pos2 - 1] != '.')
            break;
        pos2--;
    }
    return canMove;
}


const bishopMove = (x, y) => {
    let canMove = [];
    let piece = board[x][y]
    let pos1 = x
    let pos2 = y
    while (isValid(pos1 + 1, pos2 + 1)) {
        if (board[pos1 + 1][pos2 + 1] == ".") {
            canMove.push([pos1 + 1, pos2 + 1])
        }
        else if (board[pos1 + 1][pos2 + 1][0] == piece[0]) break
        else {
            canMove.push([pos1 + 1, pos2 + 1])
            break
        }
        pos1++;
        pos2++;
    }
    pos1 = x
    pos2 = y
    while (isValid(pos1 - 1, pos2 - 1)) {
        if (board[pos1 - 1][pos2 - 1] == ".") {
            canMove.push([pos1 - 1, pos2 - 1])
        }
        else if (board[pos1 - 1][pos2 - 1][0] == piece[0]) break
        else {
            canMove.push([pos1 - 1, pos2 - 1])
            break
        }
        pos1--;
        pos2--;
    }
    pos1 = x
    pos2 = y
    while (isValid(pos1 + 1, pos2 - 1)) {
        if (board[pos1 + 1][pos2 - 1] == ".") {
            canMove.push([pos1 + 1, pos2 - 1])
        }
        else if (board[pos1 + 1][pos2 - 1][0] == piece[0]) break
        else {
            canMove.push([pos1 + 1, pos2 - 1])
            break
        }
        pos1++;
        pos2--;
    }
    pos1 = x
    pos2 = y
    while (isValid(pos1 - 1, pos2 + 1)) {
        if (board[pos1 - 1][pos2 + 1] == ".") {
            canMove.push([pos1 - 1, pos2 + 1])
        }
        else if (board[pos1 - 1][pos2 + 1][0] == piece[0]) break
        else {
            canMove.push([pos1 - 1, pos2 + 1])
            break
        }
        pos1--;
        pos2++;
    }
    return canMove
}

const pawnMove = (x, y) => {
    let state = board[x][y][0];
    let moved = x == 6;
    let canMove = [];
    if (isValid(x - 1, y + 1) && board[x - 1][y + 1][0] != state && board[x - 1][y + 1][0] != '.') {
        canMove.push([x - 1, y + 1]);
    }

    if (isValid(x - 1, y - 1) && board[x - 1][y - 1][0] != state && board[x - 1][y - 1][0] != '.') {
        canMove.push([x - 1, y - 1]);
    }

    if (isValid(x - 1, y) && board[x - 1][y] == '.') {
        canMove.push([x - 1, y]);
    }

    if (isValid(x - 2, y) && x == 6 && board[x - 2][y] == '.' && board[x - 1][y] == '.') {
        canMove.push([x - 2, y]);
    }

    return canMove;
}

const queenMove = (x, y) => {
    let canMove = [...bishopMove(x, y), ...rookMove(x, y)]
    return canMove
}

const kingMove = (x, y) => {
    let piece = board[x][y]
    let canMove = []
    if (isValid(x + 1, y + 1) && (board[x + 1][y + 1] == "." || board[x + 1][y + 1][0] != piece[0])) canMove.push([x + 1, y + 1])
    if (isValid(x + 1, y - 1) && (board[x + 1][y - 1] == "." || board[x + 1][y - 1][0] != piece[0])) canMove.push([x + 1, y - 1])
    if (isValid(x - 1, y + 1) && (board[x - 1][y + 1] == "." || board[x - 1][y + 1][0] != piece[0])) canMove.push([x - 1, y + 1])
    if (isValid(x - 1, y - 1) && (board[x - 1][y - 1] == "." || board[x - 1][y - 1][0] != piece[0])) canMove.push([x - 1, y - 1])
    if (isValid(x, y + 1) && (board[x][y + 1] == "." || board[x][y + 1][0] != piece[0])) canMove.push([x, y + 1])
    if (isValid(x, y - 1) && (board[x][y - 1] == "." || board[x][y - 1][0] != piece[0])) canMove.push([x, y - 1])
    if (isValid(x + 1, y) && (board[x + 1][y] == "." || board[x + 1][y][0] != piece[0])) canMove.push([x + 1, y])
    if (isValid(x - 1, y) && (board[x - 1][y] == "." || board[x - 1][y][0] != piece[0])) canMove.push([x - 1, y])
    return canMove;
}


const knightMove = (x, y) => {
    let piece = board[x][y];
    let canMove = [];
    if (isValid(x + 2, y + 1) && (board[x + 2][y + 1] == "." || board[x + 2][y + 1][0] != piece[0])) canMove.push([x + 2, y + 1])
    if (isValid(x + 2, y - 1) && (board[x + 2][y - 1] == '.' || board[x + 2][y - 1][0] != piece[0])) canMove.push([x + 2, y - 1])
    if (isValid(x - 2, y + 1) && (board[x - 2][y + 1] == "." || board[x - 2][y + 1][0] != piece[0])) canMove.push([x - 2, y + 1])
    if (isValid(x - 2, y - 1) && (board[x - 2][y - 1] == "." || board[x - 2][y - 1][0] != piece[0])) canMove.push([x - 2, y - 1])
    if (isValid(x + 1, y + 2) && (board[x + 1][y + 2] == "." || board[x + 1][y + 2][0] != piece[0])) canMove.push([x + 1, y + 2])
    if (isValid(x + 1, y - 2) && (board[x + 1][y - 2] == "." || board[x + 1][y - 2][0] != piece[0])) canMove.push([x + 1, y - 2])
    if (isValid(x - 1, y + 2) && (board[x - 1][y + 2] == "." || board[x - 1][y + 2][0] != piece[0])) canMove.push([x - 1, y + 2])
    if (isValid(x - 1, y - 2) && (board[x - 1][y - 2] == "." || board[x - 1][y - 2][0] != piece[0])) canMove.push([x - 1, y - 2])
    return canMove;
}

export { isValid, rookMove, bishopMove, pawnMove, queenMove, kingMove, knightMove }