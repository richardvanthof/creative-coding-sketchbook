// Wave pattern
// inspiration: https://i.pinimg.com/1200x/f8/40/a5/f840a5d2f8391ca115514568a87ba66f.jpg
const dotGrid = (p) => {
    let rows = 30;
    let cols = 20;
    const noiseScale = 0.03;
    let offset = 0;
    const randomizeTime = p.random(0,1000);
    
    p.setup = function() {
      p.createCanvas(400, 400, p.WEBGL);
      p.angleMode(p.DEGREES);
    };

    p.draw = function() {
      p.background(30,30,30);
      p.rectMode(p.CENTER);
      p.strokeWeight(1);

      const offsetX = p.width / cols / 2;
      const offsetY = p.height / rows / 2;

      for (let x = -p.width/2 - offsetX; x < p.width; x += p.width / cols) {
        for (let y = -p.height/2 - offsetY; y < p.height; y += p.height / rows) {
          const val = p.sin(p.frameCount+x+y+randomizeTime)
          const d = p.map(val, -1, 1, 0, 90)
          p.strokeWeight(3);
          p.stroke(0,p.map(val, -1,1,175,255),255)
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