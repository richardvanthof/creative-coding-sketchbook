// triangle grid pattern
class Triangle {
    constructor({
        x, y, // absolute position in pixels
        s, // Size of cell
        type, // 0 = pointing up, 1 = pointing down
        color
    }) {
        this.x = x;
        this.y = y;
        this.s = s;
        this.type = type;
        this.color = 'green';
    }

    setColor(color) {
        this.color = color;
    }

    show(p) {
        let offset = this.s / 2;
        let x = this.x * this.s/2 - offset;
        let y = this.y * this.s;
        
        p.fill(this.color);
        
        // alternate triangle orientation based on row number
        // every second row is rotated 180 deg. to make the triangles fit together.
        p.push();
            p.translate(x, y);
            if(this.type === 0) {
                // upward triangle
                p.triangle(
                    offset, 0,
                    0, this.s,
                    this.s, this.s
                )
            } else {
                // downward triangle
                p.triangle(
                    offset, this.s,
                    this.s, 0,
                    0, 0
                )
            }
        p.pop();
    }
}

const sketch2 = (p) => {
    let scaleSlider;
    let trigangleCells = [];

    // 6. trigangle grid
    const res = 20;

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
                    type: x % 2, // alternate type based on position
                }));
            };
        }
        console.log(trigangleCells);
    };

    p.draw = function() {
        p.background(255);
        trigangleCells[1][0].setColor('#ff00ff');
        trigangleCells.flat().forEach(cell => {
            cell.show(p); 
        });
    };
};