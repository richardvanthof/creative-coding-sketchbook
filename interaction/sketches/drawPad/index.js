// export a mutable variable to hold the p5 instance
export let p5Instance = null;


const drawPad = (p) => {
    let fixedCircleRadius = 150; // Fixed circle radius
    let radius;  // Rolling circle radius
    let offset = 90;  // Pen offset from rolling circle center
    let theta = 0; // Angle
    let angle = 0;
    let strokeSize;

    let strokeColor, bgColor, shapeType, paused = false, graphic;
    const saveFrame = () => p.save(graphic, "pattern.jpg"); 
    p.setup = () => {
        
        const wrapper = p.createDiv().addClass('layout');
        
        graphic = p.createCanvas(800,800).addClass('p5Canvas').parent(wrapper);
        const controls = p.createDiv().addClass('controls-wrapper').parent(wrapper);
        shapeType = p.createSelect().parent(controls).addClass('form-select mb-3');
        shapeType.option('Hypotrochoid');
        shapeType.option('Epitrochoid');
        p.createP("Fixed Outer Circle Radius").parent(controls);
        fixedCircleRadius = p.createSlider(10, 300, 150).parent(controls);
        p.createP("Distance from inner cicle to tracing point").parent(controls);
        offset = p.createSlider(10, 300, 90).parent(controls);
        p.createP("Rolling Inner Circle Radius").parent(controls);
        radius = p.createSlider(10, 100, 30).parent(controls);
        p.createP("Stroke size").parent(controls);
        strokeSize = p.createSlider(0, 40, 5).parent(controls);
        p.createP("Color").parent(controls);
        strokeColor = p.createColorPicker("#000000").parent(controls);
        //bgColor = p.createColorPicker("whitesmoke").parent(controls);
        const canvasControls = p.createDiv().addClass('controls').parent(controls);
        // p.createButton("Play/Pause")
        //   .addClass("btn btn-light")
        //   .parent(canvasControls)
        //   .mousePressed(() => {});
        p.createButton("Save frame")
        .addClass("btn btn btn-outline-primary")
        .parent(canvasControls)
        .mousePressed(() => saveFrame());
        p.createButton("Play/Pause")
        .addClass("btn btn btn-outline-primary")
        .parent(canvasControls)
        .mousePressed(() => paused = !paused);
        p.createButton("Reset")
        .addClass("btn btn btn-outline-secondary")
        .parent(canvasControls)
        .mousePressed(() => p.clear());
        p.background('whitesmoke');
    };

    p.draw = () => {
        
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
        if(!paused){
            if(shapeType.value() === 'Hypotrochoid'){
                // Hypotrochoid
                x = (R - r) * p.cos(theta) + d * p.cos(((R - r) / r) * theta);
                y = (R - r) * p.sin(theta) - d * p.sin(((R - r) / r) * theta);
            } else {
                // Epitrochoid
                x = (R + r) * p.cos(theta) - d * p.cos(((R + r) / r) * theta);
                y = (R + r) * p.sin(theta) - d * p.sin(((R + r) / r) * theta);
            }
            // 
            
            // p.point(x,y);
            // 
            
            p.stroke(strokeColor.color())
            p.strokeWeight(strokeSize.value());
            p.point(x,y);
            theta += 0.005; // Increment angle
            angle += 0.0001;
        }
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
