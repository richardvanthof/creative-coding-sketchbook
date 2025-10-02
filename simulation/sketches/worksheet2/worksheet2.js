import {VerletParticle, Spring, Muscle, ConstantForce, BoundingBox} from "../lib/PhysicsClasses.js";

const worksheet2 = (p) => {
    let particles = [];
    let springs = [];
    let muscles = [];
    let forces = [];
    let previousMillis;

    p.setup = function() {
        p.createCanvas(500, 400);

        // Create your dynamic structure here
        // Ideas:
        // - Breathing creature (expanding/contracting body)
        // - Walking creature (alternating leg muscles)
        // - Pulsing heart shape
        // - Flower that opens and closes
        // - Dancing figure with rhythmic movements

        previousMillis = p.millis();
    };

    p.draw = function() {
        p.background(20, 30, 50);

        let delta = (p.millis() - previousMillis) / 1000;
        delta = p.constrain(delta, 0, 0.02);

        // Apply forces, springs, muscles, update particles, display

        previousMillis = p.millis();
    };
}

export default worksheet2;