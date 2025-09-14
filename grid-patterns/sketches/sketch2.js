// triangle grid pattern
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
        const sy = p.height / resY; // Height of each cell
        for (let x = 0; x <= p.width; x += sx) {
            let row = 0;
            for (let y = 0; y <= p.height; y += sy) {
                p.fill('green');
                
                // alternate triangle orientation based on row number
                if(row % 2 === 0) {
                    p.triangle(x, y + sy, x + sx, y + sy, x + sx / 2, y); //upward triangle
                    p.triangle(x - sx / 2, y, x + sx / 2, y, x, y + sy); //downward triangle
                } else {
                    p.triangle(x - sx / 2, y + sy, x + sx / 2, y + sy, x, y); //upward trangle
                    p.triangle(x, y, x + sx, y, x + sx / 2, y + sy); //downward triangle
                }
                row++;
            }
        }
    };
};