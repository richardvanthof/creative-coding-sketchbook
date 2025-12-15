import CanvasControls from "./helpers/canvasControls.js";
import addSideBar, {PARAMS} from "./helpers/sideBar.js";
import Rotate from "./styles/slicedText/slicedText.js";



export let canvasControls;

const dynamicTypographyEditor = (p) => {

    // Editor theming
    const editorBackground = p.color(30);
    
    // Main variables
    let sideBar;
    let canvas;
    
    // Store all text assets
    let layers = [];

    p.setup = () => {
        // Create background canvas
        p.createCanvas(innerWidth, innerHeight, p.WEBGL);
        
        // Create drawing canvas
        canvas = p.createGraphics(PARAMS.width, PARAMS.height);
        
        canvas.rectMode(p.CENTER);
        // Editor controls
        canvasControls = new CanvasControls(p, PARAMS.width, PARAMS.height);
        
        sideBar = addSideBar(p, canvas, (updatedCanvas) => {
            canvas = updatedCanvas;
            for( let layer of layers) {
                layer.updateCanvas(canvas);
            }
            // for(let layer of layers) {
            //     layer.update();
            // }
        });

        layers.push(new Rotate(p, canvas));
        // controls = new CanvasControls(p);

        // show effect controls for text layers that are currently added.
        // for (let layer of layers) {
        //     layer.showControls();
        // }
    }

    p.draw = () => {
        p.background(editorBackground);

        canvas.background(PARAMS.background.r, PARAMS.background.g, PARAMS.background.b);
        canvasControls.update(p);

        for (let layer of layers) {
            layer.display();
        }

        // Draw the drawing canvas in the center
        p.image(canvas, -PARAMS.width / 2, -PARAMS.height / 2);
    };

    p.windowResized = () => {
        p.resizeCanvas(innerWidth, innerHeight); 
    };
};

export default dynamicTypographyEditor;