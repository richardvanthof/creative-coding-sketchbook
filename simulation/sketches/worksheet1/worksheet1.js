import {VerletParticle, Spring, Muscle, ConstantForce, BoundingBox} from "../lib/PhysicsClasses.js";

const worksheet1 = (p) => {
    let particles = [];
    let springs = [];
    let forces = [];
    let constraints = [];
    let previousMillis;

    p.setup = () => {
        p.createCanvas(500, 300);

        // Create your structure here
        // Example starting points:
        // - Grid of particles connected by springs
        // - Circular arrangement with center connections
        // - Linear chain with anchor points
        // - Tree-like branching structure
        

        previousMillis = p.millis();
    }

    p.draw = () => {
        p.background(40);

        let delta = (p.millis() - previousMillis) / 1000;
        delta = p.constrain(delta, 0, 0.02);

        // Apply forces, springs, constraints, update particles, display
        // e.g.:
        // forces.forEach(f => f.apply(particles));
        // springs.forEach(s => s.apply());
        // particles.forEach(pt => { pt.integrate(delta); pt.display(p); });

        previousMillis = p.millis();
    }
}

export default worksheet1;