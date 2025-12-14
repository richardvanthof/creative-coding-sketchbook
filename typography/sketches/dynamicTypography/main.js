//import CanvasControls from "./helpers/canvasControls";
import CanvasControls from "./helpers/canvasControls.js";
import addSideBar, {PARAMS} from "./helpers/sideBar.js";

export let canvasControls;

const dynamicTypographyEditor = (p) => {

    // Editor theming
    const editorBackground = p.color(30);
    
    // Main variables
    let sideBar;
    let canvas;
    

    p.setup = () => {
        // Create background canvas
        p.createCanvas(innerWidth, innerHeight, p.WEBGL);
        
        // Create drawing canvas
        canvas = p.createGraphics(PARAMS.width, PARAMS.height);
        // Editor controls
        canvasControls = new CanvasControls(p);
        sideBar = addSideBar(p, canvas, (updatedCanvas) => {
            canvas = updatedCanvas;
        });
        // controls = new CanvasControls(p);
    }

    p.draw = () => {
        p.background(editorBackground);

        canvas.background(PARAMS.background.r, PARAMS.background.g, PARAMS.background.b);
        canvasControls.update(p);
        // Draw the drawing canvas in the center
        p.image(canvas, -PARAMS.width / 2, -PARAMS.height / 2);
    };

    p.windowResized = () => {
        p.resizeCanvas(innerWidth, innerHeight); 
    };
};

export default dynamicTypographyEditor;