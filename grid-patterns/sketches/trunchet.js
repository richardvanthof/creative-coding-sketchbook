// 5. Interactive Truchet Tiles
// Based on https://www.youtube.com/watch?v=Vpx2OeFc26o

const trunchet = (p) => {
    let tiles = [];

    class Tile {
        constructor(x, y, size) {
            this.x = x;
            this.y = y;
            this.angle = 0;
            this.size = size;
            this.type = p.floor(p.random(0, 2));
        }

        show() {
            p.rectMode(p.CENTER);
            p.push();
            p.strokeWeight(0.3);
            p.translate(this.x, this.y);
            p.stroke(0);
            p.rotate(this.angle);
            p.noStroke();
            p.rect(0, 0, this.size, this.size);
            p.stroke(3);
            if (this.type === 0) {
                p.arc(-this.size / 2, -this.size / 2, this.size, this.size, 0, p.PI / 2);
                p.arc(this.size / 2, this.size / 2, this.size, this.size, p.PI, 3 * p.PI / 2);
            } else {
                p.arc(-this.size / 2, this.size / 2, this.size, this.size, p.TWO_PI * 0.75, p.TWO_PI);
                p.arc(this.size / 2, -this.size / 2, this.size, this.size, p.PI / 2, p.PI);
            }
            p.pop();
        }

        update() {
            // this.angle += 0.01;
        }

        detectCursor(x, y) {
            if (
                x > this.x - this.size / 2 &&
                x < this.x + this.size / 2 &&
                y > this.y - this.size / 2 &&
                y < this.y + this.size / 2
            ) {
                this.angle += p.PI / 2;
            }
        }
    }

    p.setup = function () {
        p.createCanvas(400, 400);
        const amount = 20; // Amount of tiles
        const size = p.width / amount;
        for (let x = size / 2; x < p.width; x += size) {
            for (let y = size / 2; y < p.height; y += size) {
                tiles.push(new Tile(x, y, size));
            }
        }
        // p.noLoop();
    };

    p.draw = function () {
        // p.background(0);
        tiles.forEach((tile) => {
            tile.update();
            tile.detectCursor(p.mouseX, p.mouseY);
            tile.show();
        });
    };
};