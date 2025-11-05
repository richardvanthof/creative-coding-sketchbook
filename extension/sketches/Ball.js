class Ball {
    constructor(p, x, y, s) {
        this.p = p;
        this.pos = p.createVector(x, y);
        this.vel = p.createVector(5, 3);
        this.acc = p.createVector(0, 0);
        this.s = s;
        this.lives;
    }

    reset(){
        this.lives = 5;
        this.pos.set(this.p.width/2, this.p.height/2);
        this.vel.set(5,3);
    }

    checkEdges() {
        if (this.pos.x <= 0 || this.pos.x >= this.p.width - this.s) {
            this.vel.x *= -1;
        }
        if (this.pos.y <= 0 || this.pos.y >= this.p.height - this.s) {
            this.vel.y *= -1;
        }
    }

    detectBottom() {
        if (this.pos.y >= this.p.height - this.s) {
            this.lives -= 1;
            return this.lives;
        } else {
            return this.lives;
        }
    }

    update(player) {
        this.checkEdges();
        this.pos.add(this.vel);
        this.vel.add(this.acc);
    }

    display() {
        this.p.push();
            this.p.fill(255);
            this.p.rect(this.pos.x, this.pos.y, this.s, this.s);
        this.p.pop();
    }
}

export default Ball;