import Mover from './Particle.js';

const mutualAttraction = (p) => {
  let movers = [];
  let sun;

  p.setup = () => {
    p.createCanvas(600, 600, p.WEBGL);

    const config = [
      [100, 100, 0, 5, 5],
      [500, 500, 0, -5, 5],
      [p.width / 2, p.height / 2, 0, p.floor(p.random(0, 5)), p.random(2, 10)],
      [p.width / 3, p.height / 3, 0, p.floor(p.random(0, 5)), p.random(2, 8)],
    ];

    movers = config.map(elem => new Mover(...elem, p));
    sun = new Mover(p.width / 2, p.height / 2, 0, 0, 20, p);

    p.background('#1B1B3A');
  };

  p.draw = () => {
    p.translate(-p.width / 2, -p.height / 2);

    sun.show(p);
    sun.update(p);

    for (let mover of movers) {
      mover.update(p);
      mover.show(p);

      for (let other of movers) {
        if (mover !== other) {
          mover.attract(other, p);
          p.stroke(255, 255, 255, 10);
          p.line(mover.pos.x, mover.pos.y, other.pos.x, other.pos.y);
        }
      }
    }
  };
};


export default mutualAttraction;