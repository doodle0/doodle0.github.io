const NUM_CELLS = 25;
const CELL_SIZE = 24;

const RIGHT = 0;
const UP = 1;
const LEFT = 2;
const DOWN = 3;

var snakePos = [
    [11, 12],
    [12, 12],
    [13, 12]
];
var snakeDirection = RIGHT;

var itemPos = newItemPos();

var gotItem = false;
var dead = false;

var draw;

var sounds = {
    coin: new Audio("coin.wav"),
    lose: new Audio("lose.wav"),
};

function reset() {
    draw = setInterval(onDraw, 150);

    snakePos = [
        [11, 12],
        [12, 12],
        [13, 12]
    ];
    snakeDirection = RIGHT;
    
    itemPos = newItemPos();
    
    gotItem = false;
    dead = false;

    document.getElementById("title").innerHTML = "Snake Game";
    document.getElementById("txtScore").innerHTML = "Score: ";
}

function newItemPos() {
    var res;

    while (true) {
        var overlapped = false;
        res = [Math.floor(Math.random() * NUM_CELLS), Math.floor(Math.random() * NUM_CELLS)];
        for (var i = 0; i < snakePos.length; i++) {
            if (res[0] == snakePos[i][0] && res[1] == snakePos[i][1]) {
                overlapped = true;
                break;
            }
        }
        if (!overlapped) break;
    }
    return res;
}

function onDraw() {
    //update

    var newPos = snakePos[snakePos.length - 1].slice(0);

    switch (snakeDirection) {
        case RIGHT:
        newPos[0]++;
        break;
        case UP:
        newPos[1]--;
        break;
        case LEFT:
        newPos[0]--;
        break;
        case DOWN:
        newPos[1]++;
        break;
    }

    if (newPos[0] == itemPos[0] && newPos[1] == itemPos[1]) {
        gotItem = true;
        sounds.coins.play();
    }
    for (var i = 0; i < snakePos.length; i++) {
        if (newPos[0] == snakePos[i][0] && newPos[1] == snakePos[i][1]) {
            dead = true;
        }
    }
    if (newPos[0] < 0 || newPos[0] >= NUM_CELLS || newPos[1] < 0 || newPos[1] >= NUM_CELLS) {
        dead = true;
    }

    snakePos.push(newPos);
    if (!gotItem) {
        snakePos.splice(0, 1);
    }
    else {
        itemPos = newItemPos();
    }

    if (dead) {
        clearInterval(draw);
        sounds.lose.play();
    }

    gotItem = false;


    // draw

    var canvas = document.getElementById("mainCanvas");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "white";
    for (var i = 0; i < snakePos.length - 1; i++) {
        ctx.fillRect(snakePos[i][0] * CELL_SIZE, snakePos[i][1] * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    }
    ctx.fillStyle = "lightgrey";
    ctx.fillRect(snakePos[i][0] * CELL_SIZE, snakePos[i][1] * CELL_SIZE, CELL_SIZE, CELL_SIZE);
    
    ctx.fillStyle = "red";
    ctx.fillRect((itemPos[0] + 0.2) * CELL_SIZE, (itemPos[1] + 0.2) * CELL_SIZE, 0.6 * CELL_SIZE, 0.6 * CELL_SIZE);

    if (dead) {
        document.getElementById("title").innerHTML = "You died...";
    }
    document.getElementById("txtScore").innerHTML = `Score : ${snakePos.length}`;
}

document.onkeydown = (e) => {
    switch (e.code) {
        case "KeyD":
        if (snakeDirection != LEFT) snakeDirection = RIGHT;
        break;

        case 'KeyW':
        if (snakeDirection != DOWN) snakeDirection = UP;
        break;

        case 'KeyA':
        if (snakeDirection != RIGHT) snakeDirection = LEFT;
        break;

        case 'KeyS':
        if (snakeDirection != UP) snakeDirection = DOWN;
        break;
    }

    if (dead) {
        dead = false;
        reset();
    }
};

function onCanvasClick(e) {

}