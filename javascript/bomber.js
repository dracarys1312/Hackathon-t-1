/**
 * Created by Son Nui on 5/18/2016.
 */
class Bomber{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.id = -1;
        this.speedX = 0;
        this.speedY = 0;
        this.sprite = new Animation();
        this.sprite = new Animation(this.x, this.y,"george", 48, 48, 0, 4, 17);
        this.direction = 0;
    }
    checkCollision(rect1, rect2) {
        if (rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.height + rect1.y > rect2.y) {
            return true;
        }
        return false;
    }
    update() {
        var isMove = true;
        var rect1 = {x:this.x+8 + this.speedX, y:this.y+8 + this.speedY, width:32, height:32};
        for (var i = 0; i < wallBrick.length; i++) {
            var rect2 = {x:wallBrick[i].x, y:wallBrick[i].y, width:32, height:32};
            if (this.checkCollision(rect1, rect2) == true) {
                isMove = false;
                break;
            }
        }
        for (var i = 0; i < wallWood.length; i++) {
            var rect2 = {x:wallWood[i].x , y:wallWood[i].y, width:32, height:32};
            if (this.checkCollision(rect1, rect2) == true) {
                isMove = false;
                break;
            }
        }
        // for (var i = 0; i < woodArray.length; i++) {
        //     var rect2 = {x:woodArray[i].x, y:woodArray[i].y, width:48, height:48};
        //     if (this.checkCollision(rect1, rect2) == true) {
        //         isMove = false;
        //         break;
        //     }
        // }
        if (isMove) {
            this.x += this.speedX;
            this.y += this.speedY;
        }
        if (this.speedX != 0 || this.speedY != 0) {
            this.sprite.update(this.x, this.y, this.direction);
        }
    }
    draw(context) {
        this.sprite.draw(context);
    }
    move(direction){
        switch (direction){
            case 1://up
                this.speedY = -4;
                this.speedX = 0;
                this.direction = 2;
                break;
            case 2://down
                this.speedY = 4;
                this.speedX = 0;
                this.direction = 0;
                break;
            case 3://left
                this.speedX = -4;
                this.speedY = 0;
                this.direction = 1;
                break;
            case 4://right
                this.speedX = 4;
                this.speedY = 0;
                this.direction = 3;
                break;
        }
    }
    // shot() {
    //     var bullet = new Bullet(this.x + 12, this.y + 12, this.direction);
    //     this.bulletArray.push(bullet);
    // }
}