import {VerletParticle, Spring, Muscle, ConstantForce, BoundingBox} from "../lib/PhysicsClasses.js";
// Inspiration: 
// Coding Challenge #24: Perlin Noise Flow Field
// https://www.youtube.com/watch?v=BjoM9oKOAKY


const flowField = (p) => {
    let particles = [];
    let springs = [];
    let forces = [];
    let constraints = [];
    let previousMillis;
    const scale = 20;

    
    p.setup = () => {
        p.createCanvas(200, 200);
        // create 
        // Create your structure here
        // Example starting points:
        // - Grid of particles connected by springs
        // - Circular arrangement with center connections
        // - Linear chain with anchor points
        // - Tree-like branching structure
        

        // previousMillis = p.millis();
    }

    p.draw = () => {
        const size = p.width/scale;
        const increment = 0.1;
        p.background(40);
        let yOff = 0;
        for(let y = 0; y < p.width; y += size) {
            let xOff = 0;
            for(let x = 0; x < p.width; x += size) {
                const r = p.noise(xOff, yOff) * 255;
                const v = p5.Vector.fromAngle(r);
                console.log(v);
                p.stroke(0);
                p.push();
                    p.translate(x,y);
                    p.line(x,y,x+size, y+size);


                    
                p.pop();
                xOff += increment;
            }
            yOff += increment;
        }
       
    }
}

export default flowField;