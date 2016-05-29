/**
 * Created by Son Nui on 5/16/2016.
 */
var context;
var brickArray = [];
var steelArray = [];
var player;
var socket;
var tanks = [];
var newTank;
window.onload = function () {
    var canvas = document.createElement("canvas");
    context = canvas.getContext("2d");
    // context.fillStyle = "#FFFFFF";
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    document.body.appendChild(canvas);
    // // gameDrawer(context);
    gameStart();
    // drawMap(context);

    initSocketClient();
    gameDrawer(context);
    setInterval(gameLoop, 17);

};

function initSocketClient() {
    socket.emit("player_created",{x:player.x, y:player.y});
    socket.on('list_tanks', function (data) {
        player.id = data.id;
        for (var i = 0; i < data.tanks.length; i++) {
            var tank = new EnemyTank(data.tanks[i].x, data.tanks[i].y, data.tanks[i].id);
            tanks.push(tank);
        }
        tanks.push(player);
        // console.log(player.id);
    })
    socket.on("new_player_created", function (data) {
        var tank = new EnemyTank(data.x, data.y, data.id);
        tanks.push(tank);
    })
    socket.on('update_tank', function (data) {
        // var tank = new Tank(data.x, data.y);
        // tank.id = data.id;
        // tank.direction = data.direction;
        // tank.update();
        tanks[data.id].x = data.x;
        tanks[data.id].y = data.y;
        tanks[data.id].direction = data.direction;
        tanks[data.id].update();
    })
}

function updateSocketClient() {
    socket.emit("player_update",{id:player.id, x:player.x, y:player.y, direction:player.direction});
}

function gameStart() {

    socket = io.connect();
    player = new Tank(0, 0);
    for (var i = 0; i < 26; i++) {
        for (var j = 0; j < 26; j++) {
            if (map[i][j] == 1) {
                // console.log("brick");
                var brick = new Brick(i, j);
                brickArray.push(brick);
            }else if (map[i][j] == 2) {
                // console.log("steel");
                var steel = new wood(i, j);
                steelArray.push(steel);
            }
            
        }
    }
}

var gameLoop = function () {

    // console.log(tanks.length);
    gameUpdate();
    gameDrawer(context);
}

function gameDrawer(context) {
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = 'black';
    for (var i = 0; i < brickArray.length; i++) {
        brickArray[i].draw(context);
    }
    for (var i = 0; i < steelArray.length; i++) {
        steelArray[i].draw(context);
    }

    player.draw(context);
    for (var i = 0; i < tanks.length; i++) {
        if (i != player.id) tanks[i].draw(context);
    }
    for (var i = 0; i < treeArray.length; i++) {
        treeArray[i].draw(context);
    }
}

function gameUpdate() {

    player.update();
    var id = player.id;

    if (id < tanks.length && id >= 0) {
        if (player.speedX + player.speedY != 0) {
            tanks[id] = player;
            updateSocketClient();
        }
    }


    // for (var i = 0; i < enemyTanks.length; i++) {
    //     tanks[i].update();
    // }

}

window.onkeydown = function (e) {
    switch (e.keyCode) {
        case 65:
            player.move(3);
            break;
        case 68:
            player.move(4);
            break;
        case 87:
            player.move(1);
            break;
        case 83:
            player.move(2);
            break;
        case 32:
            player.shot();
            break;
    }
};

window.onkeyup = function (e) {
    switch (e.keyCode){
        case 65://a
            if(player.speedX < 0){
                player.speedX = 0;
            }
            break;
        case 68://d
            if(player.speedX > 0){
                player.speedX = 0;
            }
            break;
        case 83://s
            if(player.speedY > 0){
                player.speedY = 0;
            }
            break;
        case 87://w
            if(player.speedY < 0){
                player.speedY = 0;
            }
            break;
    }
};