import Emitter from "./Emitter.js";

const sketch = (p) => {
  let emitters = [];

  p.setup = () => {
    p.createCanvas(400, 400);
    p.createP('Used offscreen graphics to put all the imitters in <br/>separate layers to make the invert filter work.')
  };

  p.draw = () => {
    p.background(0);
    p.text('Click the canvas to add a particle emitter', 10, 20);

    emitters.forEach((emitter) => {
      emitter.emit();
      emitter.show();

      if (p.keyIsDown(p.ENTER)) {
        const force = p.createVector(0, -1);
        emitter.applyForce(force);
      }
    });
  };

  p.mousePressed = () => {
    const g = p.createGraphics(p.width, p.height);
    const offEmitter = new Emitter(g, p.mouseX, p.mouseY, 200, 10);

    // push a proxy that renders the emitter into the offscreen graphics then blits it to the main canvas
    emitters.push({
      emit: () => offEmitter.emit(),
      show: () => {
        offEmitter.show();
        p.filter(p.INVERT)
        p.image(g, 0, 0);
      },
      applyForce: (force) => {
        if (typeof offEmitter.applyForce === 'function') offEmitter.applyForce(force);
      }
    });
  };
};
 export default sketch;
