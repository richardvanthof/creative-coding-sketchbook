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
        this.maskedImage = null;
        this.ensureBuffers(this.targetCanvas.width, this.targetCanvas.height);
    }

    ensureBuffers(width, height) {
        const needsResize = (buf) => !buf || buf.width !== width || buf.height !== height;
        if (needsResize(this.maskBuffer)) {
            this.maskBuffer = this.p.createGraphics(width, height);
            this.maskBuffer.pixelDensity(1);
        }
        if (needsResize(this.maskedImage)) {
            this.maskedImage = null; // will refresh on next dirty pass
        }
    }

    display(dirty = true, offsetX = 0, offsetY = 0) {
        this.ensureBuffers(this.targetCanvas.width, this.targetCanvas.height);

        if (dirty) {
            this.maskBuffer.clear();
            this.maskBuffer.noStroke();
            this.maskBuffer.fill(155);
            this.maskBuffer.ellipse(this.x, this.y, this.r * 2, this.r * 2);
            this.maskBuffer.erase();
            this.maskBuffer.ellipse(this.x, this.y, this.ri * 2 , this.ri * 2);
            this.maskBuffer.noErase();

            // use a p5.Image because mask() is only available there
            this.maskedImage = this.sourceGraphic.get();
            const maskImage = this.maskBuffer.get();
            this.maskedImage.mask(maskImage);
        }

        this.targetCanvas.push();
            this.targetCanvas.translate(offsetX + this.x, offsetY + this.y);
            this.targetCanvas.rotate(this.a);
            this.targetCanvas.imageMode(this.targetCanvas.CENTER);
            if (this.maskedImage) {
                this.targetCanvas.image(this.maskedImage, 0, 0);
            }
            this.targetCanvas.imageMode(this.targetCanvas.CORNER);
        this.targetCanvas.pop();
    }
}

export default Mask;