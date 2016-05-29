/**
 * Created by Son Nui on 5/16/2016.
 */
var wallBrick= new Array();
var wallWood=new Array();
var context;
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
    //
    // initSocketClient();
    gameDrawer(context);
    setInterval(gameLoop, 17);

};
var player;
function gameStart() {
    player = new Bomber(32, 32);
    for (var i = 0; i < 20; i++) {
        for (var j = 0; j < 20; j++) {
            if (map[i][j] == 1) {
                // console.log("brick");
                var brick = new Brick(i, j);
                wallBrick.push(brick);
            }else if (map[i][j] == 2) {
                // console.log("steel");
                var wood = new Wood(i, j);
                wallWood.push(wood);
            }

        }
    }
}

var gameLoop = function () {
    gameUpdate();
    gameDrawer(context);
};

function gameDrawer(context) {
    context.fillRect(0, 0, window.innerWidth, window.innerHeight);
    context.fillStyle = 'white';

    for (var i = 0; i < wallBrick.length; i++) {
        wallBrick[i].draw(context);
    }
    for (var i = 0; i < wallWood.length; i++) {
        wallWood[i].draw(context);
    }
    player.draw(context)
};
function gameUpdate() {
    player.update();
    
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