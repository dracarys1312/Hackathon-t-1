class Fire{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.sprite = new Animation(this.x, this.y,"fire", 38, 38, 0, 10, 17, 48, 48);
        this.count = 17*6;
    }
    update() {
        this.sprite.update(this.x, this.y, 0);
        this.count--;
    }
    checkDone() {
        if (this.count < 0) return true;
        else return false;
    }
    draw(context) {
        this.sprite.draw(context);
    }
}