class Bomb{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.length = 32;
        this.sprite = new Animation(this.x, this.y,"bomb", 28, 28, 0, 5, 17, 32, 32);
        this.count = 180;
    }
    update() {
        this.sprite.update(this.x, this.y, 0);
        this.count--;
        // console.log(this.count);
    }
    draw(context) {
        this.sprite.draw(context);
    }
    checkBlowUp() {
        if (this.count < 0) return true;
        else return false;
    }
    blowUp() {

        for (var i = this.x - this.length; i <= this.x + this.length; i+=32) {
            var fire = new Fire(i, this.y);
            fireArray.push(fire);
            for (var j = 0; j < wallWood.length; j++) {
                if (wallWood[j].x == i && wallWood[j].y == this.y) {

                    wallWood.splice(j, 1);
                }
            }
        }
        for (var i = this.y - this.length; i < this.y; i+=32) {
            var fire = new Fire(this.x, i);
            fireArray.push(fire);

            for (var j = 0; j < wallWood.length; j++) {
                if (wallWood[j].x == this.x && wallWood[j].y == i) {
                    wallWood.splice(j, 1);
                }
            }
        }

        for (var i = this.y + 32; i <= this.y + this.length; i+=32) {
            var fire = new Fire(this.x, i);
            fireArray.push(fire);
            for (var j = 0; j < wallWood.length; j++) {
                if (wallWood[j].x == this.x && wallWood[j].y == i) {
                    
                    wallWood.splice(j, 1);
                }
            }
        }
    }
}