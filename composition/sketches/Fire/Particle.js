class Particle {
  constructor(p, x, y, lifeTime, decay, color) {
    this.p = p; // Store the instance reference
    this.pos = p.createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.vel.mult(p.random(-5, -1));
    this.acc = p.createVector(0, 0);
    this.r = 2;
    this.m = 1;
    this.lifeTime = lifeTime || -1;
    this.decaySpeed = decay || 1;
  }

  show() {
    const p = this.p;

    p.push();
    p.noStroke();
    p.fill(255, 150, 0, this.lifeTime);
    p.circle(this.pos.x, this.pos.y, this.r * 2);

    p.pop();
  }

  update() {
    const p = this.p;
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.set(0);
    if (this.lifeTime !== -1) {
      this.lifeTime -= this.decaySpeed;
    }
  }

  applyForce(_force) {
    const p = this.p;
    if (isFinite(this.m) && this.m !== 0) {
      const force = _force.copy().mult(1 / this.m);
      this.acc.add(force);
    } else {
      console.warn("Invalid mass or zero mass!");
    }
  }

  edges() {
    const p = this.p;
    // Bounce off the left and right edges
    if (this.pos.x >= p.width - this.r || this.pos.x <= this.r) {
      this.vel.x *= -1;
    }

    // Bounce off the top and bottom edges
    if (this.pos.y >= p.height - this.r || this.pos.y <= this.r) {
      this.vel.y *= -1;
    }
  }

  friction() {
    const p = this.p;
    let diff = p.height - (this.pos.y + this.r);

    if (diff <= 1) {
      // Friction direction
      let f = this.vel.copy();
      f.normalize();
      f.mult(-1);

      // Friction magnitude
      let mu = 0.1;
      let normal = this.m;
      f.setMag(mu * normal);

      this.applyForce(f);
    }
  }
}

export default Particle;