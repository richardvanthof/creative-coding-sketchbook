const sketch = (p) => {
    p.setup = () => {
        p.createCanvas(400, 400);
        p.background(220);
    };
    
    p.draw = () => {
        p.fill(100, 150, 250);
        p.ellipse(p.width / 2, p.height / 2, 50, 50);
    };
};

export default sketch;