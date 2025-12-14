import {Pane} from 'https://cdn.jsdelivr.net/npm/tweakpane@4.0.5/dist/tweakpane.min.js';
import CanvasControls from './helpers/canvasControls';

const dynamicTypographyEditor = (p) => {
  let canvas;
  let zoom = 1;
  let camera;
  let camPos;
  let targetPos;
  let controls;


  const PARAMS = {
    width: 800,
    height: 800,
    PPI: 72,
    scale: 1,
    background: {r: 255, g: 255, b: 255},
  };

  const pane = new Pane();
  const folder = pane.addFolder({title: 'Page setup'}); 
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
    // PARAMS.width = ev.value.width;
    // PARAMS.height = ev.value.height;
    // PARAMS.PPI = ev.value.ppi;
    // canvas = p.createGraphics(PARAMS.width, PARAMS.height);

    // const fov = camera?.fov ?? p.PI / 3;
    // const aspect = p.width / p.height;
    // const halfW = PARAMS.width / 2;
    // const halfH = PARAMS.height / 2;
    // const tanHalfFov = Math.tan(fov / 2);
    // const distForHeight = halfH / tanHalfFov;
    // const distForWidth = halfW / (tanHalfFov * aspect);
    // const baseDistance = Math.max(distForHeight, distForWidth);

    // zoom = Math.max(PARAMS.width, PARAMS.height) / baseDistance;
    // camPos.z = baseDistance;
    // camera?.setPosition(camPos.x, camPos.y, camPos.z);
    // camera?.lookAt(targetPos.x, targetPos.y, targetPos.z);

    pane.refresh();
  });

  const btn = pane.addButton({
    title: 'Switch orientation',
  }).on('click', () => {
    const temp = PARAMS.width;
    PARAMS.width = PARAMS.height;
    PARAMS.height = temp;
    canvas = p.createGraphics(PARAMS.width, PARAMS.height);
    pane.refresh();
  });

  folder.addBinding(PARAMS, 'width', {min: 10, max: 5000, step: 10}).on('change', (ev) => {
    PARAMS.width = ev.value;
    canvas = p.createGraphics(PARAMS.width, PARAMS.height);
  });
  folder.addBinding(PARAMS, 'height', {min: 10, max: 5000, step: 10}).on('change', (ev) => {
    PARAMS.height = ev.value;
    canvas = p.createGraphics(PARAMS.width, PARAMS.height);
  });
  folder.addBinding(PARAMS, 'PPI', {min: 72, max: 600, step: 1}).on('change', (ev) => {
    PARAMS.dpi = ev.value;
  });
  folder.addBinding(PARAMS, 'background');
  p.setup = () => {
    p.createCanvas(innerWidth, innerHeight, p.WEBGL);
    p.pixelDensity(2);
    p.rectMode(p.CENTER);
    p.colorMode(p.HSB, 1);
    camPos = p.createVector(0, 0, Math.max(PARAMS.width, PARAMS.height));
    targetPos = p.createVector(0, 0, 0);
    canvas = p.createGraphics(PARAMS.width, PARAMS.height);
    camera = p.createCamera();
    camera.setPosition(camPos.x, camPos.y, camPos.z);
    camera.lookAt(targetPos.x, targetPos.y, targetPos.z);
    
  };

  p.draw = () => {
    p.background('darkgray')
    const {r, g, b} = PARAMS.background;
    canvas.background(r, g, b);
    p.image(canvas, -PARAMS.width / 2, -PARAMS.height / 2);
  };

  // const zoomToMouse = (delta) => {
  //   if (!camera || !camPos || !targetPos) {
  //     return;
  //   }
  //   const zoomAmount = delta * -0.001;
  //   zoom += zoomAmount;
  //   zoom = p.constrain(zoom, 0.05, 50);
  //   camPos.z = Math.max(PARAMS.width, PARAMS.height) / zoom;
  //   camera.setPosition(camPos.x, camPos.y, camPos.z);
  //   camera.lookAt(targetPos.x, targetPos.y, targetPos.z);
  // };

  p.mouseWheel = (e) => {
    // zoomToMouse(e.delta);
    return false;
  };

  p.keyDown = () => {
    if (p.key === 'z') {
      // zoomToMouse(100);
    } else if (p.key === 'x') {
      // zoomToMouse(-100);
    }

    if(p.key === '91') {
      p.cursor('grab');
    } else {
      p.cursor('default');
    }
  }

  p.windowResized = () => {
    // p.resizeCanvas(innerWidth, innerHeight);
  };

  p.mouseDragged = (e) => {
    // command keycode = 91;
    if (p.keyIsDown(32)) {
      // const panSpeed = 1 / zoom;
      // const moveX = e.movementX * panSpeed;
      // const moveY = e.movementY * panSpeed;
      // camPos.x -= moveX;
      // camPos.y -= moveY;
      // targetPos.x -= moveX;
      // targetPos.y -= moveY;
      // camera.setPosition(camPos.x, camPos.y, camPos.z);
      // camera.lookAt(targetPos.x, targetPos.y, targetPos.z);
      return false;
    }
    return false;
  };

  // p.mouseWheel = (e) => {
  //   camera += e.delta * 2;
  //   console.log(e.delta, cameraZ);
  //   camera = p.constrain(cameraZ, 200, 4000);
  //   return false;
  // };
};

export default dynamicTypographyEditor;
