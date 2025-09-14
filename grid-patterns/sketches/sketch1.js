// Hexagonal Grid Pattern with Adjustable Scale
const sketch1 = (p) => {
    let scaleSlider;

    p.setup = () => {
        p.createCanvas(400, 400);
        scaleSlider = p.createSlider(10, 50, 30, 1);
    };

    p.draw = () => {
        p.background(255);

        const sx = p.width / scaleSlider.value(); // Width of each cell
        const sy = p.height / scaleSlider.value(); // Height of each cell
        let col = 0;

        for (let x = 0; x <= p.width; x += sx * 0.75) {
            for (
                // Alternate starting y position for staggered rows.
                let y = col % 2 === 0 ? sy / 2 : 0;
                y <= p.height;
                y += sy
            ) {
                p.fill('green');
                p.push();
                    p.translate(x, y);
                    p.beginShape();
                        p.vertex(-sx / 4, -sy / 2);
                        p.vertex(sx / 4, -sy / 2);
                        p.vertex(sx / 2, 0);
                        p.vertex(sx / 4, sy / 2);
                        p.vertex(-sx / 4, sy / 2);
                        p.vertex(-sx / 2, 0);
                    p.endShape(p.CLOSE);
                p.pop();
            }
            col++;
        }
    };
};