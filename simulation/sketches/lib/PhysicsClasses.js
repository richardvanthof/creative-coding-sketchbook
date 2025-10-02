// Complete physics classes for the worksheet assignments - 
// focus on the sturucture and implementation of the classes

class VerletParticle {
  constructor(x, y, fixed = false) {
    this.position = createVector(x, y);
    this.pposition = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.force = createVector(0, 0);
    this.mass = 1;
    this.fixed = fixed;
  }

  update(delta) {
    if (this.fixed) return;
    this.acceleration.set(this.force).div(this.mass);
    this.velocity.set(this.position).sub(this.pposition);
    this.pposition.set(this.position);
    this.position.add(this.velocity);
    this.position.add(this.acceleration.mult(delta * delta));
    this.force.mult(0);
  }

  addForce(force) {
    if (!this.fixed) this.force.add(force);
  }

  display() {
    fill(this.fixed ? color(255, 100, 100) : color(100, 150, 255));
    stroke(255);
    strokeWeight(1);
    ellipse(this.position.x, this.position.y, 6, 6);
  }
}

class Spring {
  constructor(a, b, length, strength, damping) {
    this.a = a; this.b = b; this.restLength = length;
    this.strength = strength; this.damping = damping;
  }

  apply() {
    let springVector = p5.Vector.sub(this.b.position, this.a.position);
    let currentLength = springVector.mag();
    if (currentLength > 0) {
      springVector.div(currentLength);
      let extension = currentLength - this.restLength;
      let springForce = -this.strength * extension;
      let relativeVelocity = p5.Vector.sub(this.b.velocity, this.a.velocity);
      let dampingForce = -this.damping * springVector.dot(relativeVelocity);
      springVector.mult(springForce + dampingForce);
      this.a.addForce(springVector.copy().mult(-1));
      this.b.addForce(springVector);
    }
  }

  display() {
    stroke(100, 255, 150, 150);
    strokeWeight(1);
    line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y);
  }
}

class BoundingBox {
  constructor(particles, lower, upper) {
    this.particles = particles; this.lower = lower; this.upper = upper;
  }
  apply() {
    for (let p of this.particles) {
      p.position.x = constrain(p.position.x, this.lower.x, this.upper.x);
      p.position.y = constrain(p.position.y, this.lower.y, this.upper.y);
    }
  }
}

class Muscle {
  constructor(a, b, baseLength, strength, damping, amplitude, frequency, phase) {
    this.a = a; this.b = b; this.baseLength = baseLength;
    this.strength = strength; this.damping = damping;
    this.amplitude = amplitude; this.frequency = frequency; this.phase = phase;
  }

  apply() {
    let time = millis() * 0.001;
    let currentRestLength = this.baseLength + this.amplitude * sin(time * this.frequency + this.phase);
    
    let springVector = p5.Vector.sub(this.b.position, this.a.position);
    let currentLength = springVector.mag();
    if (currentLength > 0) {
      springVector.div(currentLength);
      let extension = currentLength - currentRestLength;
      let springForce = -this.strength * extension;
      let relativeVelocity = p5.Vector.sub(this.b.velocity, this.a.velocity);
      let dampingForce = -this.damping * springVector.dot(relativeVelocity);
      springVector.mult(springForce + dampingForce);
      this.a.addForce(springVector.copy().mult(-1));
      this.b.addForce(springVector);
    }
  }

  display() {
    stroke(255, 100, 100, 200);
    strokeWeight(2);
    line(this.a.position.x, this.a.position.y, this.b.position.x, this.b.position.y);
  }
}

class ConstantForce {
  constructor(particles, force) {
    this.particles = particles; this.force = force;
  }
  apply() {
    for (let p of this.particles) p.addForce(this.force);
  }
}

export { VerletParticle, Spring, Muscle, ConstantForce, BoundingBox };