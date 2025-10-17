import Cell from "./Cell.js";

// Hexagonal Game of Life
// rules: https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life

const hexGameOfLife = (p) => {
    let scale = 20;
    let cells = [];
    p.setup = () => {
        p.createCanvas(400, 400);
        
        let col = 0; // col position in grid

        // Calculate the size of each hexagonal cell.
        const sx = p.height / scale;
        const sy = p.height / scale;

        // Create a grid of hexagonal cells.
        for (let x = 0; x <= p.width; x += sx * 0.75) {
            let row = 0; // row position in grid

            // Create a new column in the cells array.
            cells.push([]);

            for (
                // Alternate starting y position for staggered rows.
                let y = col % 2 === 0 ? sy / 2 : 0;
                y <= p.height;
                y += sy
            ) {
                cells[col][row] = new Cell(x, y, scale, false);
                cells[col][row].setGridPosition(col, row);
                row++;
            }
            col++;
        }

        // Randomly set some cells to alive.
        for (let i = 0; i < 300; i++) {
            const randomX = Math.floor(p.random(0, cells.length));
            const randomY = Math.floor(p.random(0,cells[randomX].length - 1 ));
            cells[randomX][randomY].alive = true;
        }
    };

    p.draw = () => {
        p.background(255);
        let col = 0;
        //p.noStroke();
        cells.flat().forEach(cell => {
            cell.intersects(cells);
        })
        cells.flat().forEach(cell => {
            cell.update();
            cell.show(p);;
        })
    };
};

export default hexGameOfLife;