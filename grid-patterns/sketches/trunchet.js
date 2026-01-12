// 5. Interactive Truchet Tiles
// Based on https://www.youtube.com/watch?v=Vpx2OeFc26o
const colors = ['#0D3B66', '#FAF0CA', '#F4D35E', '#EE964B', '#F95738'];
const bg = '#020423';
const trunchet = (p) => {
    let tiles = [];
    let counter = 0;
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
                p.noFill()
                p.rect(0, 0, this.size, this.size);
                for(let i = 5; i > 0; i--) {
                    p.strokeWeight(i*3);
                    const offset = i;
                    p.stroke(colors[i - 1]);
                    p.scale(
                        p.map(p.sin(p.frameCount * 0.005 + (this.x+this.y)), -1, 1, .95, 1));
                    p.rotate(i*.1);
                    if (this.type === 0) {
                        p.arc(
                            -this.size / 2 + offset, 
                            -this.size / 2+ offset , 
                            this.size + offset, this.size, 0, p.PI / 2
                        );
                        p.arc(
                            this.size / 2, this.size / 2, 
                            this.size, this.size, 
                            p.PI, 3 * p.PI / 2
                        );
                    } else {
                        p.arc(
                            -this.size / 2 + offset, 
                            this.size / 2, this.size + offset, 
                            this.size, p.TWO_PI * 0.75, p.TWO_PI
                        );
                        p.arc(
                            this.size / 2, -this.size / 2, 
                            this.size, this.size, 
                            p.PI / 2, p.PI
                        );
                    }
                }
            p.pop();
        }

        update() {
            this.angle += 0.0001;
        }

        detectCursor(x, y) {
            if (
                x > this.x - this.size / 2 &&
                x < this.x + this.size / 2 &&
                y > this.y - this.size / 2 &&
                y < this.y + this.size / 2
            ) {
                this.angle += .001;
            }
        }
    }

    const setTiles = () => {
        tiles = [];
        const size = 110;
        for (let x = size / 2; x < p.width; x += size) {
            for (let y = size / 2; y < p.height; y += size) {
                tiles.push(new Tile(x, y, size));
            }
        }
    }

    p.setup = function () {
        p.createCanvas(p.windowWidth -10, p.windowHeight -10);
        setTiles();
        // p.noLoop();
    };

    p.draw = function () {
        p.background(bg);
        counter++;
        if(counter > 1000) {
            counter = 0;
            setTiles();
        }
        tiles.forEach((tile) => {
            tile.detectCursor(p.mouseX, p.mouseY);
            tile.show();
        });
       
    };

    p.windowResized = () => {
        setTiles();
        p.resizeCanvas(p.windowWidth -10, p.windowHeight -10);
    };
};

export default trunchet;