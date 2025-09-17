// Weird glitch pattern i found interesting

const rotatingGlitches = (p) => {
    // 3. Weird rotating rectangle glitch thing.
    let rows = 20;
    let cols = 20;

    p.setup = function() {
      p.createCanvas(400, 400);
      p.angleMode(p.DEGREES);
      //p.noLoop();
    };

    p.draw = function() {
      p.background(0);
      p.rectMode(p.CENTER);
      p.strokeWeight(0.3);

      const offsetX = (p.width / cols)*2 ;
      const offsetY = p.height / rows / 2;
      for (let x = offsetX; x < p.width; x += p.width / cols) {
        for (let y = offsetY; y < p.height; y += p.height / rows) {
          const r = p.random(0, 1);
          p.push();
            p.translate(x, y);
            p.rotate(p.frameCount+(y*.3));
            p.scale(p.map(p.noise(p.frameCount/100) * 100, -1, 1, 0.9, 1.2));
            p.rect(0, 0, p.width / cols, p.height / rows);
          p.pop();
        }
      }
    };
};