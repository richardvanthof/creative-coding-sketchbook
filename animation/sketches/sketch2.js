// Telo = 

const sketch2 = (p) => {
    let font;
    p.preload = () => {
        font = p.loadFont('assets/SpaceMono/bold.ttf');
    }

    p.setup = () => {
        p.createCanvas(400, 400);
        p.background(0);
        p.textFont(font);
        p.textSize(60);
        p.fill(255);
        p.textAlign(p.CENTER, p.CENTER);
        
        // liquids e.g. water, gasoline, soda, lava, soup, oil, ink
        p.text("telo", p.width / 2, p.height / 2);
    }
}