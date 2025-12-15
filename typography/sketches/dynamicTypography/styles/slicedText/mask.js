class Mask {
    constructor(p, targetCanvas, sourceGraphic, x, y, r, ri) {
        this.p = p;
        this.targetCanvas = targetCanvas;
        this.sourceGraphic = sourceGraphic;
        this.x = x;
        this.y = y;
        this.r = r;
        this.ri = ri;
        this.a = 0;
        this.maskBuffer = null;
        //console.log(this.x, this.y);
    }

    ensureMaskBuffer(width, height) {
        if (!this.maskBuffer || this.maskBuffer.width !== width || this.maskBuffer.height !== height) {
            this.maskBuffer = this.p.createGraphics(width, height);
            this.maskBuffer.pixelDensity(1);
        }
    }

    display(offsetX = 0, offsetY = 0) {
        this.ensureMaskBuffer(this.targetCanvas.width, this.targetCanvas.height);

        this.maskBuffer.clear();
        this.maskBuffer.noStroke();
        this.maskBuffer.fill(155);
        this.maskBuffer.ellipse(this.x, this.y, this.r * 2, this.r * 2);
        this.maskBuffer.erase();
        this.maskBuffer.ellipse(this.x, this.y, this.ri * 2 , this.ri * 2);
        this.maskBuffer.noErase();

        const masked = this.sourceGraphic.get();

        masked.mask(this.maskBuffer);

        this.targetCanvas.push();
            //console.log(offsetX, this.x, offsetY , this.y);
            this.targetCanvas.translate(offsetX + this.x, offsetY + this.y);
            this.targetCanvas.rotate(this.a);
            this.targetCanvas.imageMode(this.targetCanvas.CENTER);
            
            //this.targetCanvas.image(masked, 0, 0);
            this.targetCanvas.image(this.maskBuffer, 0, 0); //DEBUG
            this.targetCanvas.imageMode(this.targetCanvas.CORNER);
        this.targetCanvas.pop();
    }
}

export default Mask;