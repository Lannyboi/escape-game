/* Importing components */
import Character from "./components/Character.js"
import Map from "./components/Map.js"

/* Grabbing the canvas */
const canvas = document.getElementById("canvas")
const context = canvas.getContext("2d")

/* Setting the canvas width and height */
const canvasHeight = 460
const canvasWidth = 460
canvas.height = canvasHeight
canvas.width = canvasWidth

/* Creating player here */
const player = new Character(210, 210, 40, 40, "red")
const p = player

/* Creating the map */
const map = new Map

/* Drawing the game */
function draw() {
    /* Refreshing page */
    context.clearRect(0, 0, canvas.width, canvas.height)

    /* Adding player */
    context.fillStyle = p.fillStyle 
    context.fillRect(p.xpos, p.ypos, p.width, p.height)
    
    /* Adding the map */
    for (let i = 0; i < map.length; i++ ) {
        context.fillStyle = map[i].color
        context.fillRect(map[i].xpos, map[i].ypos, map[i].width, map[i].height)
    }
    
    /* Drawing the border */
    context.strokeStyle = "purple"
    context.lineWidth = 20;
    context.strokeRect(0, 0, canvasWidth, canvasHeight)
}

draw()

/* For internet explorer */
document.onkeydown = checkKey;

function checkKey(e) {

    const key = e.keyCode

    /* Players positions */
    const p_x1 = p.xpos
    const p_x2 = p.xpos + p.width
    const p_y1 = p.ypos
    const p_y2 = p.ypos + p.height

    /* Walls positions */
    const w_x1 = map[0].xpos
    const w_x2 = map[0].xpos + map[0].width
    const w_y1 = map[0].ypos
    const w_y2 = map[0].ypos + map[0].height

    /* Movement */

    switch(key) {
        /* Moving Up */
        case 38:
        if ( checkWall(p_y1, p_y2, p_x1, p_x2, p.height, p.width, "UP") ) {
            p.ypos = p.ypos - 40
        } 
        break
        /* Moving Down */
        case 40: 
        if ( checkWall(p_y1, p_y2, p_x1, p_x2, p.height, p.width, "DOWN") ) {
            p.ypos = p.ypos + 40
        } 
        break
        /* Moving Left */
        case 37:
        if ( checkWall(p_y1, p_y2, p_x1, p_x2, p.height, p.width, "LEFT") ) {
            p.xpos = p.xpos - 40
        }
        break
        /* Moving Right */
        case 39:
        if ( checkWall(p_y1, p_y2, p_x1, p_x2, p.height, p.width, "RIGHT") ) {
            p.xpos = p.xpos + 40
        }
        break
    }
    draw()
}

function checkWall(p_y1, p_y2, p_x1, p_x2, p_height, p_width, direction) {
    let canMove = true
    for (let i = 0; i < map.length; i++) {
        /* Walls values */
        const w_x1 = map[i].xpos
        const w_x2 = map[i].xpos + map[i].width
        const w_y1 = map[i].ypos
        const w_y2 = map[i].ypos + map[i].height

        switch(direction) {
            case "UP": 
            if ( (p_y1 - 10) === 0 || ((p_y1 - p_height >= w_y1 && p_y2 - p_height <= w_y2) && (p_x1 >= w_x1 && p_x2 <= w_x2) ) ) {
                canMove = false
            }
            break
            case "DOWN":
            if ( (p_y2 + 10) === 460 || ( (p_y1 + p_height >= w_y1 && p_y2 + p_height <= w_y2) && (p_x1 >= w_x1 && p_x2 <= w_x2) ) ) {
                canMove = false
            }
            break
            case "LEFT":
            if ( (p_x1 - 10) === 0 || ( (p_x1 - p_width >= w_x1 && p_x2 - p_width <= w_x2) && (p_y1 >= w_y1 && p_y2 <= w_y2) ) ) {
                canMove = false
            }
            break
            case "RIGHT":
            if ( (p_x2 + 10) === 460 || ( (p_x1 + p_width >= w_x1 && p_x2 + p_width <= w_x2) && (p_y1 >= w_y1 && p_y2 <= w_y2) ) ) {
                canMove = false
            }
            break
        }
    }
    return canMove
}
