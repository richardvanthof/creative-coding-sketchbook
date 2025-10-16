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
        //p.noStroke();
        // alternate triangle orientation based on row number
        // every second row is rotated 180 deg. to make the triangles fit together.
        p.push();
            p.translate(x, y);
            if(
                (this.type === 0 && this.y % 2 === 0) || 
                (this.type === 1 && this.y % 2 === 1)
            ) {
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

export default Triangle;