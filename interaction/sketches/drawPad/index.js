// How to code a spirograph - https://www.youtube.com/watch?v=bqRvLR3PLf0

const drawPad = (p) => {
    /**
     * @param {*} x x-position 
     * @param {*} y y-position
     * @param {*} r radius
     * @param {*} res how many points should the circle have?
     */
    const createSpiral = (x = 0, y = 0, r = 50, res = 100) => {
        for(let a = 0; a < p.TWO_PI; a += p.TWO_PI/res) {
            p.push();
                p.translate(x, y);
                const circleX = r * p.cos(a);
                const circleY = r * p.sin(a);
                p.stroke(0);
                p.strokeWeight(2);
                p.circle(0,0,10)
                p.point(circleX, circleY);
                
            p.pop();
        }
    }

    p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight);
        p.background(250);
    };

    p.draw = () => {
        createSpiral(p.width / 2, p.height / 2, 100);
    }
}

export default drawPad;