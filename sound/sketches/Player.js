class Player {
    constructor(p, x,w,h, v) {
        this.p = p;
        this.x = x;
        this.w = w;
        this.h = h;
        this.v = v; //velocity
        this.sound = true;
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
                ball.pos.y = this.p.height - this.h - ball.s;

                if (this.sound) {
                    if (!this.hitOsc) {
                        this.hitOsc = new p5.Oscillator('sine');
                        this.hitOsc.start();
                        this.hitOsc.amp(0);
                    }
                    this.hitOsc.freq(80);
                    this.hitOsc.amp(0.25, 0.02);
                    this.hitOsc.amp(0, 0.3);
                }
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