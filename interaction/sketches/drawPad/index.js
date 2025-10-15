// export a mutable variable to hold the p5 instance
export let p5Instance = null;


const drawPad = (p) => {
    let fixedCircleRadius = 150; // Fixed circle radius
    let radius;  // Rolling circle radius
    let offset = 90;  // Pen offset from rolling circle center
    let theta = 0; // Angle
    let angle = 0;
    let strokeSize;

    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight*.7);
        fixedCircleRadius = p.createSlider(10, 300, 150);
        offset = p.createSlider(10, 300, 90);
        radius = p.createSlider(10, 100, 30);
        strokeSize = p.createSlider(0, 40, 5);
    };2

    p.draw = () => {
        //p.background(250);
        p.stroke(0,0,0,30);
        // Calculate new point on hypotrochoid
        p.translate(p.width / 2, p.height / 2); // Center the drawing
        p.rotate(angle);
        let x;
        let y;
        let r = radius.value();
        let R = fixedCircleRadius.value();
        let d = offset.value();
        // p.noFill();
        //p.circle(0,0,5)
        //
      
        // // Hypotrochoid
        x = (R - r) * p.cos(theta) + d * p.cos(((R - r) / r) * theta);
        y = (R - r) * p.sin(theta) - d * p.sin(((R - r) / r) * theta);
        // p.point(x,y);
        // // Epitrochoid
        // x = (R + r) * p.cos(theta) - d * p.cos(((R + r) / r) * theta);
        // y = (R + r) * p.sin(theta) - d * p.sin(((R + r) / r) * theta);
        p.strokeWeight(strokeSize.value());
        p.point(x,y);
        theta += 0.005; // Increment angle
        angle += 0.0001;
    }

    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
    }

    p.kepPressed = () => {

    }
    
}

export default drawPad;


/**
 * Julia
Prototype: geometry

A three-dimensional rendering of the Julia set of a quaternion function.

Properties
Julia.fold
float default: 2, range: 0.01-5. Controls a coefficient in the equation for the Julia set.

Mandelbulb
Prototype: geometry

Properties
Mandelbulb.c0
float default: 8, range: 0.5-20. A coefficient that affects variouus exponents in the Mandulbulb equation. Higher values yield the appearance of greater recursion / complexity.
 */
