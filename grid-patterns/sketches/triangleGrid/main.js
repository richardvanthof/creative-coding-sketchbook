// triangle grid pattern
import Triangle from "./Triangle.js";

const triangleGrid = (p) => {
    let scaleSlider;
    let trigangleCells = [];

    // 6. trigangle grid
    const res = 7;

    p.setup = function() {
        p.createCanvas(400, 400);
        const triangleSize = p.width / res; // Width of each cell
        for( 
            let x = 0; 
            x <= res * 2; // each row has twice the amount of triangles as there are columns;
            x++
        ) {
            trigangleCells[x] = []; // create new column
            for(let y = 0; y <= res; y++) {
                trigangleCells[x].push(new Triangle({
                    x: x,
                    y: y,
                    s: triangleSize,
                    type: x % 2,
                }));
            };
        }
        console.log(trigangleCells);
    };

    p.draw = function() {
        p.background(255);
        trigangleCells[0][0].setColor('#ff00ff');
        trigangleCells.flat().forEach(cell => {
            cell.show(p); 
        });
    };
};

export default triangleGrid;

