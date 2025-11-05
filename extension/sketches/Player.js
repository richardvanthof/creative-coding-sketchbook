class Player {
    constructor(p, x,w,h, v) {
        this.p = p;
        this.x = x;
        this.w = w;
        this.h = h;
        this.v = v; //velocity
    } 

    update() {
        if(this.p.keyIsDown(this.p.LEFT_ARROW)) {
            this.x -= this.x > 0 ? this.v : 0;
        }
        if(this.p.keyIsDown(this.p.RIGHT_ARROW)) {
            this.x += this.x + this.w < this.p.width ? this.v : 0;
        };
    }

    intersects(ball) {
        if (ball.pos.x + ball.s > this.x && 
            ball.pos.x < this.x + this.w &&
            ball.pos.y + ball.s > this.p.height - this.h &&
            ball.pos.y < this.p.height) {
                ball.vel.y *= -1;
                ball.pos.y = this.p.height - this.h - ball.s; // reposition ball above player
        }
    }

    display() {
        this.p.push();
            this.p.fill(255);
            this.p.rect(this.x, this.p.height - this.h, this.w, this.h)
        this.p.pop();
    }
}

export default Player;