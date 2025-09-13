// triangkle grid pattern
const sketch2 = (p) => {
    let scaleSlider;

    // 6. trigangle grid
    const resX = 20, resY = resX;

    p.setup = function() {
        p.createCanvas(400, 400);
        p.noLoop();
    };

    p.draw = function() {
        const sx = p.width / resX; // Width of each cell
        const sy = p.height / resY; // height of each cell
        for (let x = 0; x <= p.width; x += sx) {
            for (let y = 0; y <= p.height; y += sy) {
                p.fill('green');
                p.triangle(x - sx / 2, y + sy, x + sx / 2, y + sy, x, y);
                p.triangle(x, y, x + sx, y, x + sx / 2, y + sy);
            }
        }
    };
};