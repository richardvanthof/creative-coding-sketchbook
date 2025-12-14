import Mask from './mask.js';
import {Pane} from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js';
import {sidePanel} from '../../helpers/sideBar.js';
class slicedText {
    constructor(p, width = 400, height = 400) {
        // General properties
        this.p = p;
        this.pos = p.createVector(0, 0);
        this.text = 'Text';
        this.width = width;
        this.height = height;
        // Style properties
        this.font = 'Arial';
        this.fontSize = 300;
        this.fillColor = {r: 0, g: 0, b: 0};
        this.strokeColor = {r: 255, g: 255, b: 255};
        this.strokeWeight = 0;
        this.rings = 30;
        this.offset = 0;
        this.delay = 0.2;
        this.textGraphic = p.createGraphics(this.width, this.height);

        this.masks = [];
        this.generateRings(this.rings);
    }

    generateRings(amount) {
        this.masks = [];
        
        for(let i = 0; i < this.rings; i++) {
            this.masks.push(
                new Mask(
                    this.p,
                    this.width / 2,
                    this.height / 2,
                    (i + 1) * (this.height / this.rings),
                    (i) * (this.height / this.rings),
                )
            );
        }
        

        //this.masks = this.masks.reverse();
    }

    display(parentCanvas) {
        //this.textGraphic.background('white');
        this.textGraphic.rectMode(this.p.CENTER);
        this.textGraphic.textAlign(this.p.CENTER, this.p.CENTER);
        this.textGraphic.textSize(this.fontSize);
        this.textGraphic.fill(this.fillColor.r, this.fillColor.g, this.fillColor.b);
        this.textGraphic.stroke(this.strokeColor.r, this.strokeColor.g, this.strokeColor.b);
        this.textGraphic.strokeWeight(this.strokeWeight);
        this.textGraphic.textFont(this.font);
        this.textGraphic.text(
            this.text, 
            this.pos.x + this.textGraphic.width / 2, 
            this.pos.y + this.textGraphic.height / 2
        );
        
        this.masks.forEach((mask, idx) => {
            mask.a = idx * this.offset;
            mask.display(parentCanvas, this.textGraphic, this.pos.x, this.pos.y)
        });

        // display the outer layer (what's left after masking)
        // const textGraphic = this.textGraphic.get();
        // const maskGraphic = this.p.createGraphics(this.width, this.height);
        // maskGraphic.pixelDensity(1);

        // maskGraphic.background(255);
        // maskGraphic.noStroke();
        // maskGraphic.fill(0);
        // maskGraphic.ellipse(this.width / 2, this.height / 2, this.height, this.height);
        // const m = maskGraphic.get();
        // textGraphic.mask(m);
        // parentCanvas.image(textGraphic, this.pos.x, this.pos.y);
    };

    showControls() {
        const folder = sidePanel.addFolder({title: 'Sliced Text'});
        folder.addBinding(this, 'text').on('change', (e) => {
            this.textGraphic.clear();
            this.text = e.value;
        });
        folder.addBinding(this, 'font');
        folder.addBinding(this, 'fontSize', {min: 10, max: 1000, step: 1}).on('change', () => {
            this.textGraphic.clear();
            this.fontSize = this.fontSize;
        });
        folder.addBinding(this, 'fillColor');
        folder.addBinding(this, 'strokeColor');
        folder.addBinding(this, 'strokeWeight', {min: 0, max: 20, step: 1}).on('change', () => {
            this.textGraphic.clear();
            this.strokeWeight = this.strokeWeight;
        });
        folder.addBinding(this, 'rings', {min: 1, max: 100, step: 1}).on('change', (e) => {
            this.rings = e.value;
            this.generateRings(this.rings);
        });
        folder.addBinding(this, 'offset', {min: -Math.PI/20, max: Math.PI/20, step: 0.001});
    }
}

export default slicedText;