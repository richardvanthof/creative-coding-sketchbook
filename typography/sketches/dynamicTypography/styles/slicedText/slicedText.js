import Mask from './mask.js';
import {sidePanel} from '../../helpers/sideBar.js';
class slicedText {
    /**
     * 
     * @param {p5 object} p 
     * @param {p5 graphic} targetGraphic 
     */
    constructor(p, parentGraphic) {
        // General properties
        this.p = p;
        this.canvas = parentGraphic;
        this.text = 'Text';

        // Canvas properties
        this.pos = p.createVector(0, 0);

        // Style properties
        this.font = 'Arial';
        this.fontSize = 300;
        this.fillColor = {r: 0, g: 0, b: 0};
        this.strokeColor = {r: 255, g: 255, b: 255};
        this.strokeWeight = 0;
        this.rings = 5;
        this.offset = 0;
        this.delay = 0.2;
        this.textGraphic = p.createGraphics(this.canvas.width, this.canvas.height);
        this.needsRedraw = true;
        this.center = {x: 0, y: 0};
        this.masks = [];

        
        this.generateRings(this.rings);
    }

    generateRings(amount) {
        this.masks = [];
        
        for(let i = 0; i < this.rings; i++) {
            this.masks.push(
                new Mask(
                    this.p,
                    this.canvas,
                    this.textGraphic,
                    this.canvas.width / 2,
                    this.canvas.height / 2,
                    (i + 1) * (this.canvas.height / this.rings),
                    (i) * (this.canvas.height / this.rings),
                )
            );
        }
        this.masks = this.masks.reverse();
    }

    generateText() {
        if (!this.needsRedraw) return;
        this.textGraphic.clear();
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
        this.needsRedraw = false;
    }

    display() {
        const dirty = this.needsRedraw;
        this.generateText();
        this.masks.forEach((mask, idx) => {
            mask.a = idx * this.offset;
            mask.display(dirty, this.center.x, this.center.y);
        });

    };

    updateCanvas(newCanvas) {
        // Update the canvas reference and regenerate text graphic
        this.canvas = newCanvas;
        this.textGraphic = this.p.createGraphics(this.canvas.width, this.canvas.height);
        this.needsRedraw = true;
        this.generateRings(this.rings);
    }

    showControls() {
        const updateTextGraphicSize = () => {
            this.textGraphic = this.p.createGraphics(this.width, this.height);
            if (typeof this.p.pixelDensity === 'function') {
                this.textGraphic.pixelDensity(this.p.pixelDensity());
            }
            this.generateRings(this.rings);
        };

        const getCanvasWidth = () =>
            typeof this.p?.width === 'number' && this.p.width > 0 ? this.p.width : this.width;

        const getCanvasHeight = () =>
            typeof this.p?.height === 'number' && this.p.height > 0 ? this.p.height : this.height;

        const injectSizeControls = (folder) => {
            const widthBinding = folder.addBinding(this, 'width', {
                min: 10,
                
                step: 1,
            });
            widthBinding.on('change', (e) => {
                this.width = e.value;
                updateTextGraphicSize();
            });

            const heightBinding = folder.addBinding(this, 'height', {
                min: 10,
               
                step: 1,
            });
            heightBinding.on('change', (e) => {
                this.height = e.value;
                updateTextGraphicSize();
            });

            const sizeButton = folder.addButton({title: 'Use Canvas Size'});
            sizeButton.on('click', () => {
                this.width = getCanvasWidth();
                this.height = getCanvasHeight();
                updateTextGraphicSize();
                widthBinding.refresh();
                heightBinding.refresh();
            });
        };

        const originalAddFolder = sidePanel.addFolder.bind(sidePanel);

        sidePanel.addFolder = (params) => {
            const folder = originalAddFolder(params);
            // if (params?.title === 'Sliced Text') {
            //     injectSizeControls(folder);
            // }
            sidePanel.addFolder = originalAddFolder;
            return folder;
        };

        const folder = sidePanel.addFolder({title: 'Sliced Text'});
        folder.addBinding(this, 'text').on('change', (e) => {
            this.textGraphic.clear();
            this.text = e.value;
            this.needsRedraw = true;
        });
        folder.addBinding(this, 'font');
        folder.addBinding(this, 'fontSize', {min: 10, step: 1}).on('change', () => {
            this.textGraphic.clear();
            this.fontSize = this.fontSize;
            this.needsRedraw = true;
        });
        folder.addBinding(this, 'fillColor').on('change', () => {
            this.needsRedraw = true;
        });
        folder.addBinding(this, 'strokeColor').on('change', () => {
            this.needsRedraw = true;
        });
        folder.addBinding(this, 'strokeWeight', {min: 0, max: 20, step: 1}).on('change', () => {
            this.textGraphic.clear();
            this.strokeWeight = this.strokeWeight;
            this.needsRedraw = true;
        });
        folder.addBinding(this, 'rings', {min: 1, max: 100, step: 1}).on('change', (e) => {
            this.rings = e.value;
            this.generateRings(this.rings);
            this.needsRedraw = true;
        });
        folder.addBinding(this, 'offset', {min: -Math.PI/4, max: Math.PI/4, step: 0.01});
        //folder.addBinding(this, 'center', {step: 10});
    }
}

export default slicedText;