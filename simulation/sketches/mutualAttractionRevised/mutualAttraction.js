import Mover from './Particle.js';

const mutualAttraction = (p) => {
    let movers = [];
    let sun;
    let previousMillis;

    p.setup = function() {
      p.createCanvas(600, 600);
      // p.camera(0, 0, 800, 0, 0, 0, 0, 1, 0);
      reset();
      p.background('#1B1B3A');
      p.createP('Enhanced version by <a target="_blanc" href="https://www.robsaunders.net/">Rob Saunders (Associate Professor LIACS)</a>')
    }

    function reset() {
      const config = [
        [p.width/2 + p.random(-30, -10), p.height/2 + p.random(-30, -10), 0, p.random(0, 1), p.random(0, 1)],
        [p.width/2 + p.random(10, 30), p.height/2 + p.random(10, 30), 0, p.random(-1, 0), p.random(-1, 0)],
        [p.width/2 + p.random(-30, -10), p.height/2 + p.random(10, 30), 0, p.random(0, 1), p.random(-1, 0)],
        [p.width/2 + p.random(10, 30), p.height/2 + p.random(-30, -10), 0, p.random(-1, 0), p.random(0, 1)]
      ];
      movers = config.map(elem => new Mover(...elem));
      sun = new Mover(p, p.width/2, p.height/2, 0, 0, 20);
      previousMillis = p.millis();
    }

    function update() {
      for (let n = 0; n < 20; n++) {
        sun.update();
        for (let mover of movers) {
          mover.update();
        }
      }
    }

    p.draw = function() {
      const elapsedMillis = p.millis() - previousMillis;
      if (elapsedMillis < 1000) {
        p.push();
        p.noStroke();
        p.fill(27,27,58, p.map(elapsedMillis, 0, 1000, 0, 255));
        p.rect(0, 0, p.width, p.height);
        p.pop();
        p.filter(p.BLUR, p.map(elapsedMillis, 0, 1000, 1, 4));
      }
      if (elapsedMillis >= 20000) {
        reset();
      }
      update();
      sun.show(p);
      for (let mover of movers) {
        mover.show(p);
        for (let other of movers) {
          if (mover !== other) {
            mover.attract(p, other);
            p.stroke(255, 255, 255, 10);
            p.noFill();
            p.line(mover.pos.x, mover.pos.y, other.pos.x, other.pos.y);
          }
        }
      }
    }

}

export default mutualAttraction;