class Bomb{
     constructor(x, y) {
        this.x = x;
        this.y = y;
        this.length = 48;
        this.sprite = new Animation(this.x, this.y,"bomb", 28, 28, 0, 5, 17, 48, 48);
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
        for (var i = this.x - this.length; i <= this.x + this.length; i+=48) {
            var fire = new Fire(i, this.y);
            fireArray.push(fire);
        }
        for (var i = this.y - this.length; i < this.y; i+=48) {
            var fire = new Fire(this.x, i);
            fireArray.push(fire);
        }
        for (var i = this.y + 48; i <= this.y + this.length; i+=48) {
            var fire = new Fire(this.x, i);
            fireArray.push(fire);
        }
    }
}