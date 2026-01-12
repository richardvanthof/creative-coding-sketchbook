let gradients = (p) => {
  let rows = 50;
  let angle;
  let lastMillis = 0;
  let motionReversed = false;
  const speed = 10;
  p.setup = () => {
    p.createCanvas(p.windowWidth -10, p.windowHeight-10);
    p.colorMode(p.HSL);
    p.angleMode(p.DEGREES);
    angle = 0;
  };

  p.draw = () => {
    p.background(255); // Optional: clear canvas each frame

    const time = p.millis();

    if (time - lastMillis > 10) {
      if(rows >= 100 || rows <= 10) {
        motionReversed = !motionReversed;
      }
      rows += motionReversed ? -speed : speed;

      lastMillis = time;
    }

    let c1 = p.color(10, 82, 54);
    let c2 = p.color(335, 67, 77);

    const createGradient = (x, y, w, h, c1, c2) => {
      p.push(); // Save transformation state
      p.translate(x + w / 2, y + h / 2); // Move to center of gradient
      
      p.translate(-w / 2, -h / 2); // Shift origin to top-left of gradient

      for (let i = 0; i < w; i++) {
        let progress = i / w;
        let c = p.lerpColor(c1, c2, progress);
        p.noStroke();
        p.fill(c);
        p.rect(i, 0, 1, h);
      }

      p.pop(); // Restore transformation state
    };

    let rowHeight = p.height / rows;

    for (let row = 0; row < rows; row++) {
      let colAmount = row * 2 || 1; // avoid 0 cols
      let colWidth = p.width / colAmount;

      for (let col = 0; col < colAmount; col++) {
        createGradient(
          col * colWidth,
          row * rowHeight,
          colWidth,
          rowHeight,
          col % 2 === 0 ? c1 : c2,
          col % 2 === 0 ? c2 : c1
        );
      }
    }
  };

  p.windowResized = () => {
    p.resizeCanvas(p.windowWidth -5, p.windowHeight -5);
  };
};

export default gradients;