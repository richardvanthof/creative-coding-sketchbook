/**
 * Enemies class to manage enemy entities and their position in the game.
 */
class Enemies {
    constructor(p, rows, cols, enemiesRows) {
        this.p = p;
        this.rows = rows;
        this.cols = cols;
        this.enemiesRows = enemiesRows - 1;
        this.enemiesCols = this.cols;
        this.size = p.width/this.cols;
        this.targets = [];
        
        
        this.reset();
        this.elapsed = 0;
        this.pos = this.p.createVector(0,0);

        console.log(this.enemies);
        
    }

    reset() {
        // value 0 = empty, 1 = filled
        this.enemies = Array.from({ length: this.rows }, () => Array(this.cols).fill(0));
        // set targets
        for(let row = 0; row <= this.enemiesRows; row++) {
            this.enemies[row] = Array(this.cols).fill(1);
        }
    }

    getTargets() {
        this.targets = [];

        this.enemies.forEach((row, rowIdx) => {
            row.forEach((enemy, colIdx) => {
                if(enemy !== 0) {
                    let sum = 0;
                    // If the enemy is fully surrounded 
                    // the sum of its neighbours should be 8.
                    const neightbours = [
                        [rowIdx-1, colIdx-1], 
                        [rowIdx-1, colIdx], 
                        [rowIdx-1, colIdx+1],
                        [rowIdx, colIdx-1],
                        [rowIdx, colIdx+1],
                        [rowIdx+1, colIdx-1], 
                        [rowIdx+1, colIdx], 
                        [rowIdx+1, colIdx+1],
                    ];
                    
                    neightbours.forEach(([nRow, nCol]) => {
                        const neighbourRow = this.enemies[nRow];
                        if (neighbourRow && neighbourRow[nCol] !== undefined) {
                            sum += neighbourRow[nCol];
                        } else {
                            sum += 0;
                        }
                    });

                    if(sum < 8) {

                        this.targets.push({
                            xStart: (colIdx) * this.size, // use +1 to calculate correct absolute positions.
                            yStart: (rowIdx) * this.size,
                            xEnd: (colIdx+1) * this.size,
                            yEnd: (rowIdx+1) * this.size,
                            row: rowIdx,
                            col: colIdx
                        });
                    }
                }
            })
        });
    }

    intersect(ball) {
        for (let i = 0; i < this.targets.length; i += 1) {
            const target = this.targets[i];
            // collision detection
            if (ball.pos.x < target.xEnd &&
                ball.pos.x + ball.s > target.xStart &&
                ball.pos.y < target.yEnd &&
                ball.pos.y + ball.s > target.yStart) {

                const overlapX = Math.min(target.xEnd - ball.pos.x, ball.pos.x + ball.s - target.xStart);
                const overlapY = Math.min(target.yEnd - ball.pos.y, ball.pos.y + ball.s - target.yStart);

                if (overlapX < overlapY) {
                    ball.vel.x *= -1;
                } else {
                    ball.vel.y *= -1;
                }

                this.enemies[target.row][target.col] = 0; // remove enemy
                this.getTargets();
                if(this.enemies.flat().every(value => value === 0)) {
                    console.log('all cleared!')
                    return true;
                }
                break;
            }
        }
    }

    display() {
        this.enemies.forEach((row, rowIndex) => {
            row.forEach((enemy, colIndex) => {
                if(enemy !== 0) {
                    this.p.fill(255, 255, 255, 255);
                    this.p.stroke(10);
                    this.p.rect(colIndex * this.size, rowIndex * this.size, this.size, this.size);
                }
            });
        });

        // Debug 
        //this.targets.forEach(target => {
        //     this.p.push();
        //         this.p.fill(230);
        //         this.p.rect(target.xStart, target.yStart, target.xEnd - target.xStart, target.yEnd - target.yStart);
        //     this.p.pop();
        // });
    }
}

export default Enemies;