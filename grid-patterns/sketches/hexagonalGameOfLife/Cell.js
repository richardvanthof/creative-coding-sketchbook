
class Cell {

    constructor(x,y,s,alive) {
        
        // Absolute position
        this.x = x;
        this.y = y;

        // Grid coordinates
        this.col = null;
        this.row = null;

        // Size
        this.sx = s;
        this.sy = s;

        // State
        this.alive = alive;
        this.nextAlive = null;
    }

    setGridPosition(c,r) {
        this.col = c;
        this.row = r;
    }

    intersects(others) {
        if(this.col === null || this.row === null) {
            throw new Error(`
                Cell grid coordinates undefined. 
                Please set them using 
                setGridPosition(col, row) method.
            `);
        }

        // Get coordinates of the 6 neighboring cells
        // Determine neighbor offsets based on column parity (staggered columns)
        const evenCol = this.col % 2 === 0;
        const neighbors = evenCol ? [
            { col: this.col + 1, row: this.row },     // Right
            { col: this.col - 1, row: this.row },     // Left
            { col: this.col, row: this.row + 1 },     // Bottom
            { col: this.col, row: this.row - 1 },     // Top
            { col: this.col + 1, row: this.row - 1 }, // Top-Right (even)
            { col: this.col - 1, row: this.row - 1 }  // Top-Left (even)
        ] : [
            { col: this.col + 1, row: this.row },     // Right
            { col: this.col - 1, row: this.row },     // Left
            { col: this.col, row: this.row + 1 },     // Bottom
            { col: this.col, row: this.row - 1 },     // Top
            { col: this.col + 1, row: this.row + 1 }, // Bottom-Right (odd)
            { col: this.col - 1, row: this.row + 1 }  // Bottom-Left (odd)
        ];

        // Count alive neighbors
        const liveNeighbors = neighbors.reduce((count, pos) => {
            if (others[pos.col] && others[pos.col][pos.row] && others[pos.col][pos.row].alive) {
                return count + 1;
            }
            return count;
        },0);

        // Compute next state without mutating current state (double buffering)
        let next;
        if(this.alive) {
            if(liveNeighbors < 2 || liveNeighbors > 3) next = false;
            else next = true; // 2 or 3 -> survives
        } else {
            next = (liveNeighbors === 3);
        }

        // store next state; don't apply it yet
        this.nextAlive = next;
        
    }

    update() {
        if(this.nextAlive !== null) {
            this.alive = this.nextAlive;
            this.nextAlive = null;
        }
    }

    show(p) {
        p.push();
            if (this.alive) {
                p.fill('#329fa0');
            } else {
                if(this.row % 2 === 0) {
                    p.fill(255);
                } else {
                    p.fill(230);
                }
            }
            p.noStroke();
            p.translate(this.x, this.y);
            p.beginShape();
                p.vertex(-this.sx / 4, -this.sy / 2);
                p.vertex(this.sx / 4, -this.sy / 2);
                p.vertex(this.sx / 2, 0);
                p.vertex(this.sx / 4, this.sy / 2);
                p.vertex(-this.sx / 4, this.sy / 2);
                p.vertex(-this.sx / 2, 0);
            p.endShape(p.CLOSE);
        p.pop();
    }
}

export default Cell;