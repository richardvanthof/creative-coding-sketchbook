class Mover {
  constructor(x, y, vx, vy, m, p) {
    this.pos = p.createVector(x, y);
    this.vel = p.createVector(vx, vy);
    this.vel.mult(0.1)
    this.acc = p.createVector(0,0);
    this.mass = m | 1;
    this.radius = p.sqrt(this.mass) * 2; //why this again
  }
  
  applyForce(force) {
    let f = p5.Vector.div(force, this.mass);
    this.acc.add(f)
  }

  update(p) {  
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.vel.limit(10);
    this.acc.set(0, 0);
  }
  
  attract(object, p) {
    const G = 3
    let force = p5.Vector.sub(this.pos, object.pos)
    const distanceSq = p.constrain(force.magSq(), 5**2, 50**2)
    const magnitude = G * (this.mass * object.mass) / distanceSq
    force.setMag(magnitude)
    object.applyForce(force)
  }

  show(p) {
    const trailLength = 100
    p.noStroke();
    p.fill(255, 100, 50, 200);
    // p.ellipse(this.pos.x, this.pos.y, 32);
  }
}

export default Mover;