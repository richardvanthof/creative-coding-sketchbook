import {Pane} from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js';
import {canvasControls} from '../main.js';

const PARAMS = {
    width: 2408,
    height: 3508,
    PPI: 72,
    scale: 1,
    background: {r: 255, g: 255, b: 255},
};

export const sidePanel = new Pane();
const addControls = (p, canvas, onCanvasChange = () => {}) => {
    
    const folder = sidePanel.addFolder({title: 'Page setup'}); 

    const updateCanvas = () => {
        let nextCanvas = canvas;

        if (nextCanvas && typeof nextCanvas.resizeCanvas === 'function') {
            nextCanvas.resizeCanvas(PARAMS.width, PARAMS.height);
        } else if (p && typeof p.resizeCanvas === 'function') {
            p.resizeCanvas(PARAMS.width, PARAMS.height);
            nextCanvas = p.canvas ?? p._renderer ?? nextCanvas;
        } else {
            nextCanvas = p.createGraphics(PARAMS.width, PARAMS.height);
        }

        onCanvasChange(nextCanvas);
    };

    // Preset sizes
    folder.addBlade({
        view: 'list',
        label: 'Presets',
        options: [
            {text: 'A5', value: {width: 1748, height: 2480, ppi: 300}},
            {text: 'A4', value: {width: 2480, height: 3508, ppi: 300}},
            {text: 'A3', value: {width: 3508, height: 4961, ppi: 300}},
            {text: 'A2', value: {width: 4961, height: 7016, ppi: 300}},
            {text: '1080p', value: {width: 1920, height: 1080, ppi: 72}},
            {text: '2K DCI', value: {width: 2048, height: 1080, ppi: 72}},
            {text: '4K', value: {width: 3840, height: 2160, ppi: 72}},
            {text: '4K DCI', value: {width: 4096, height: 2160, ppi: 72}},
        ],
        value: 'A5',
    }).on('change', (ev) => {
        PARAMS.width = ev.value.width;
        PARAMS.height = ev.value.height;
        PARAMS.PPI = ev.value.ppi;
        updateCanvas();
        canvasControls.setBaseZoom(PARAMS.width, PARAMS.height);
        convasControls.setZoom(1);
        sidePanel.refresh();
    });

    // Switch orientation button
        const btn = folder.addButton({
        title: 'Switch orientation',
    }).on('click', () => {
        const temp = PARAMS.width;
        PARAMS.width = PARAMS.height;
        PARAMS.height = temp;
        updateCanvas();
        sidePanel.refresh();
    });

    // Set drawing canvas width, height, PPI
    folder.addBinding(PARAMS, 'width', {min: 10, max: 5000, step: 10}).on('change', (ev) => {
        PARAMS.width = ev.value;
        updateCanvas();
    });
    folder.addBinding(PARAMS, 'height', {min: 10, max: 5000, step: 10}).on('change', (ev) => {
        PARAMS.height = ev.value;
        updateCanvas();
    });
    folder.addBinding(PARAMS, 'PPI', {min: 72, max: 600, step: 1}).on('change', (ev) => {
        PARAMS.PPI = ev.value;
    });

    // Set background color
    folder.addBinding(PARAMS, 'background');

    return sidePanel;
}

export default addControls;
export {PARAMS};