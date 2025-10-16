let tunnel = (p) => {

  const drawBlob = (x, y, r, res = 100) => {
    p.noFill();
    p.stroke(p.random(0, 200), 100, p.map(r, 0, p.width, 255, 0));
    p.strokeWeight(1);
    p.push();
      p.translate(x, y);
      p.rotate(x * 0.01);
      p.beginShape();
        for (let a = 0; a < p.TWO_PI; a += p.TWO_PI / res) {
          const offset = p.map(p.noise(a + 1), -1, 1, 0, 70);
          const px = offset + r * p.sin(a);
          const py = offset + r * p.cos(a);
          p.vertex(px, py);
        }
      p.endShape(p.CLOSE);
    p.pop();
  };

  const drawCircles = (x, y, r = 300) => {
    p.stroke(255, 0, p.map(r, 0, p.width, 255, 0));
    drawBlob(x, y, r);
    const offset = r / 5;
    if (r < p.width * 1.3) {
      drawCircles(x, y + offset, r * 1.3);
      drawCircles(x + offset / 2, y + offset, r * 1.3);
    }
  };

  p.setup = () => {
    p.createCanvas(400, 400);
    p.background(0);
    p.translate(p.width / 2, p.height / 3);
    p.rotate(0.01);
    drawCircles(0, -10, p.width * 0.05);
  };
};

export default tunnel;