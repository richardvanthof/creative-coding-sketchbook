import Particle from "./Particle.js";

// Emitter class for p5.js instance mode
class Emitter {
  constructor(p, x, y, lifeTime, decay, useEdges) {
    this.p = p; // store reference to the p5 instance
    this.pos = p.createVector(x, y);
    this.particles = [];
    this.lifeTime = lifeTime || -1;
    this.decay = decay || 1;
    this.useEdges = useEdges || false;
  }
  
  emit() {
    for (let i = 0; i <= 1; i++) {
      this.particles.push(new Particle(this.p, this.pos.x, this.pos.y, this.lifeTime, this.decay));
    }
  }
  
  show() {
    const p = this.p;
    const force = p.createVector(0, -1);
    this.particles.forEach((particle, index) => {
      particle.show();
      particle.applyForce(force);
      if (this.useEdges) particle.edges();
      particle.friction();
      particle.update();
      if (particle.lifeTime <= 0 && particle.lifeTime !== -1) {
        this.particles.splice(index, 1);
      }
    });
  }
  
  applyForce(force) {
    this.particles.forEach(particle => {
      particle.applyForce(force);
    });
  }
}


export default Emitter;