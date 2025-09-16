// Wave pattern

const dotGrid = (p) => {
    // 3. Weird rotating rectangle glitch thing.
    let rows = 30;
    let cols = 20;
    const noiseScale = 0.03;
    let offset = 0;
    p.setup = function() {
      p.createCanvas(400, 400, p.WEBGL);
      p.angleMode(p.DEGREES);
      //p.noLoop();
    };

    p.draw = function() {
      p.background(30,30,30);
      p.rectMode(p.CENTER);
      p.strokeWeight(1);

      const offsetX = p.width / cols / 2;
      const offsetY = p.height / rows / 2;
      for (let x = -p.width/2 - offsetX; x < p.width; x += p.width / cols) {
        for (let y = -p.height/2 - offsetY; y < p.height; y += p.height / rows) {
          const r = p.random(0, 1);
          
          const noiseVal = p.noise(
            x, 
            y,
            p.frameCount
          )
          const d = p.map(p.sin(p.frameCount+x+y), -1, 1, 0, 90)
          p.strokeWeight(3);
          p.stroke(255)
          p.push();
            p.translate(x, y, d*2);
            p.rotate(d);
            p.line(0,5, 0, -5)
          p.pop(p.CLOSE);
        }
      }
      offset += 0.1;
    };
};