  class Mover {
    constructor(p, x, y, vx, vy, m) {
      
      // Use p5.Vector directly instead of p.createVector to avoid depending on the passed-in instance
      this.pos = new p5.Vector(x, y);
      this.vel = new p5.Vector(vx, vy);
      this.vel.mult(0.1);
      this.acc = new p5.Vector(0, 0);
      this.mass = (m || 1);
      this.radius = Math.sqrt(this.mass) * 2;
    }

    applyForce(force) {
      // Use the p5.Vector static div to get acceleration contribution
      const f = p5.Vector.div(force, this.mass);
      this.acc.add(f);
    }

    update() {
      this.vel.add(this.acc);
      this.pos.add(this.vel);

      this.vel.limit(10);
      this.acc.set(0, 0);
    }

    attract(p, object) {
      const G = 3;

      // direction from object to this
      const force = p5.Vector.sub(this.pos, object.pos);

      // limit squared distance
      const distanceSq = p.constrain(force.magSq(), 5 * 5, 50 * 50);

      const magnitude = (G * this.mass * object.mass) / distanceSq;

      force.setMag(magnitude);

      object.applyForce(force);
    }

    show(p) {
      const trailLength = 100;
      p.noStroke();
      p.fill(255, 100, 50, 10);
      // example draw:
      // p.ellipse(this.pos.x, this.pos.y, this.radius * 2);
    }
  }

  export default Mover;