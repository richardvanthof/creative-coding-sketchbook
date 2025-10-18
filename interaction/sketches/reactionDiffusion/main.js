import calculateLaPlace from "./helpers/calculateLaPlace.js";

// Inspired by
// https://www.youtube.com/watch?v=BV9ny785UNc
// https://www.karlsims.com/rdtool.html?s=7PN0Zo9kbN1yTq00EM7
// https://www.karlsims.com/rd.html

// I know, the performance is not great. This should be done in a shader but I don't know how to do that yet :/
// Other performance tips always welcome!

const createSlider = (p, labelText, min, max, value, step) => {
  const container = p.createDiv().style("margin", "10px");
  p.createP(labelText).parent(container);
  const slider = p.createSlider(min, max, value, step).parent(container);
  slider.style("width", "200px");
  return slider;
};

const reactionDiffusion = (p) => {
  let graphic;
  let brushSize;
  let brushShape = "circle";
  let showFPS;
  let cells = [];
  let cellsNext = [];
  let c1, c2, res;
  let paused = false;

  let diffusionA = 1, //diffusion rate A
    diffustionB = 0.5, // diffusion rate B
    feedRate = 0.055, // feed rate
    killRate = 0.062, // kill rate
    timeScale = 1, // time scale. 1 once per frame
    currentPreset;

  const presets = [
    { F: 0.055, k: 0.062, pattern: "Default" },
    { F: 0.0367, k: 0.0649, pattern: "Worm-like (maze)" },
    { F: 0.022, k: 0.051, pattern: "Spot patterns" },
    { F: 0.035, k: 0.065, pattern: "Fingerprints / labyrinths" },
    { F: 0.03, k: 0.055, pattern: "Blobby, dynamic structures" },
    { F: 0.014, k: 0.054, pattern: "Sparse dots" },
    { F: 0.05, k: 0.062, pattern: "Dense texture" },
  ];

  p.setup = () => {
    const wrapper = p.createDiv().class("layout");
    graphic = p.createCanvas(200, 200).parent(wrapper);
    p.pixelDensity(1);
    p.rectMode(p.CENTER);
    p.colorMode(p.HSB, 1); // Normalize HSB to 0-1
    res = p.width;

    // UI CONTROLS
  const controls = p.createDiv().addClass('controls-wrapper').parent(wrapper);
    // Canvas Controls
   
    
  
    // Brush Controls
    const brushControls = p.createDiv().addClass('controls').parent(controls);
    p.createP("Brush Size").parent(brushControls);
    brushSize = p.createSlider(0, 200, 20).parent(brushControls);
    brushSize.style("width", "200px");
    // Brush shape
    p.createP("Brush shape").parent(brushControls);
    p.createDiv()
      .addClass(["shapes-button-group btn-group"])
      .parent(brushControls);
    [
      ["❍", "circle"],
      ["☐", "square"],
    ].forEach(([icon, label]) => {
      const btn = document.createElement("button");
      btn.innerText = icon;
      btn.title = `${label} brush`;
      btn.value = label;
      btn.classList.add(
        "btn",
        "btn-outline-primary",
        btn.value === brushShape && "active"
      );
      btn.onclick = (e) => {
        e.target.parentNode
          .querySelectorAll("button")
          .forEach((b) => b.classList.remove("active"));
        e.target.classList.add("active");
        brushShape = e.target.value;
        console.log(brushShape);
      };
      document.querySelector(".shapes-button-group").appendChild(btn);
    });

    // Canvas Colors
    const canvasColors = p.createDiv().addClass('controls').parent(controls);
    p.createP("Colors").parent(canvasColors);
    c1 = p.createColorPicker("#fff").parent(canvasColors);
    c2 = p.createColorPicker("#000").parent(canvasColors);

    //console.log(c1.color())

    // Simulation Controls
    const simControls = p.createDiv().addClass('controls').parent(controls);

    p.createP(`Presets`).addClass('label').parent(simControls);
    currentPreset = p.createSelect().parent(simControls);
    currentPreset.addClass("form-select"); // Bootstrap styling
    currentPreset.attribute("aria-label", "Preset select");
    currentPreset.changed((e) => {
      const [F, k] = currentPreset.value().split(",").map(Number);
      setFeedRate(F);
      setKillRate(k);
      //
      console.log({ F, k });
    });
    presets.forEach(({ F, k, pattern }, i) => {
      currentPreset.option(pattern, [F, k]);
    });

    p.createP(`Feed Rate`).addClass('label').parent(simControls);
    feedRate = p.createSlider(0.002, 0.12, 0.055, 0.0001).parent(simControls);
    feedRate.style("width", "200px");

    p.createP(`Kill Rate`).addClass('label').parent(simControls);
    killRate = p.createSlider(0.03, 0.07, 0.062, 0.0001).parent(simControls);
    killRate.style("width", "200px");

    const advancedSimControls = p.createElement("details").addClass('label').parent(simControls);
    p.createElement("summary", "Advanced").parent(advancedSimControls);
    p.createP(`Diffusion A`).addClass('label').parent(advancedSimControls);
    diffusionA = p.createSlider(0, 2, 1, 0.01).parent(advancedSimControls);
    diffusionA.style("width", "200px");

    p.createP(`Diffusion B`).addClass('label').parent(advancedSimControls);
    diffustionB = p.createSlider(0, 1, 0.5, 0.01).parent(advancedSimControls);
    diffustionB.style("width", "200px");

    showFPS = p
      .createCheckbox("FPS Counter", false)
      .parent(advancedSimControls);
    const helpDialog = p.createElement(
      "dialog",
      "Hold [ and ] to change brush size"
    );

     const canvasControls = p.createDiv().addClass('controls').parent(controls);
    // p.createButton("Play/Pause")
    //   .addClass("btn btn-light")
    //   .parent(canvasControls)
    //   .mousePressed(() => {});
    p.createButton("Save frame")
      .addClass("btn btn btn-outline-primary")
      .parent(canvasControls)
      .mousePressed(() => saveFrame());
    p.createButton("Reset")
      .addClass("btn btn btn-outline-secondary")
      .parent(canvasControls)
      .mousePressed(() => resetCanvas());
    // p.createButton("Shortcuts")
    //   .addClass("btn btn btn-outline-primary")
    //   .parent(canvasControls)
    //   .mousePressed(() => helpDialog.showModal());
    
    // Generate grid data structure
    // with the initial particle properties.
    resetCanvas();
    //console.log(cells)

    //   // Place an area of 'chemicals'
    //   for (let cx = 100; cx < 160; cx++) {
    //       for (let cy = 100; cy < 160; cy++) {
    //         cells[cx][cy].b = 1;
    //       }
    //   }
  };

  p.draw = () => {
    p.background(220);
    p.loadPixels();
    let dA = diffusionA.value(), //diffusion rate A
      dB = diffustionB.value(), // diffusion rate B
      feed = feedRate.value(), // feed rate
      kill = killRate.value(), // kill rate
      dt = timeScale; // time scale. 1 once per frame

    cells.forEach((cols, x) => {
      cols.forEach((cell, y) => {
        const a = cell.a,
          b = cell.b;
        const config = { x, y, grid: cells };
        const laPlace = {
          a: calculateLaPlace({ ...config, chemical: "a" }),
          b: calculateLaPlace({ ...config, chemical: "b" }),
        };
        cellsNext[x][y].a =
          a + dA * laPlace.a - a * b * b + feed * (1 - a) * dt;
        cellsNext[x][y].b =
          b + (dB * laPlace.b + a * b * b - (kill + feed) * b) * dt;
      });
    });

    // Define gradient endpoints once outside the loop
    const [r1, g1, b1, a1] = c1.color().levels;
    const [r2, g2, b2, a2] = c2.color().levels;

    for (let x = 0; x < p.width; x++) {
      for (let y = 0; y < p.height; y++) {
        let t = cellsNext[x][y].b; // 

        // Manual RGB interpolation 
        let r = r1 + (r2 - r1) * t;
        let g = g1 + (g2 - g1) * t;
        let b = b1 + (b2 - b1) * t;

        let pix = (x + y * p.width) * 4;
        p.pixels[pix + 0] = r;
        p.pixels[pix + 1] = g;
        p.pixels[pix + 2] = b;
        p.pixels[pix + 3] = 255;
      }
    }
    p.updatePixels();
    swap();

    p.noCursor();
    p.noFill();
    if (brushShape === "circle") {
      p.ellipse(p.mouseX, p.mouseY, brushSize.value(), brushSize.value());
    } else {
      p.rect(p.mouseX, p.mouseY, brushSize.value());
    }

    // show frameRate
    if (showFPS.checked()) {
      p.push();
      p.fill(0);
      p.text(`FPS: ${p.floor(p.frameRate())}`, 10, 20);
      p.pop();
    }
  };




  
  // Paint controls
  p.mousePressed = (e) => paint();
  p.mouseDragged = (e) => paint(); // BUG: sometimes this results in green squares taking over the canvas
  p.mouseWheel = (e) => adjustBrushSize(e.delta / 10);
  p.keyPressed = () => {
    if (p.key === "]") adjustBrushSize(3);
    if (p.key === "[") adjustBrushSize(-3);
    if (p.key === "s") saveFrame();
    if (p.key === "Escape") resetCanvas();
  };

  const paint = () => {
    const bs = brushSize.value();
    const xStart = p.floor(p.constrain(p.mouseX - bs / 2, 0, p.width - 1));
    const yStart = p.floor(p.constrain(p.mouseY - bs / 2, 0, p.height - 1));
    const xEnd = p.floor(p.constrain(p.mouseX + bs / 2, 0, p.width - 1));
    const yEnd = p.floor(p.constrain(p.mouseY + bs / 2, 0, p.height - 1));

    if (brushShape === "circle") {
      const cx = p.mouseX;
      const cy = p.mouseY;
      const r = bs / 2;
      const r2 = r * r;
      for (let x = xStart; x < xEnd; x++) {
        for (let y = yStart; y < yEnd; y++) {
          const dx = x - cx;
          const dy = y - cy;
          if (dx * dx + dy * dy <= r2) {
            cells[x][y].b = 1;
          }
        }
      }
    } else {
      for (let x = xStart; x < xEnd; x++) {
        for (let y = yStart; y < yEnd; y++) {
          cells[x][y].b = 1;
        }
      }
    }
  };
  const adjustBrushSize = (mutation) =>
    brushSize.value(brushSize.value() + mutation);

  const resetCanvas = () => {
    cells = [];
    for (let x = 0; x < res; x++) {
      cells[x] = [];
      cellsNext[x] = [];
      for (let y = 0; y < res; y++) {
        const initial = { a: 1, b: 0 };
        cells[x][y] = { ...initial };
        cellsNext[x][y] = { ...initial };
      }
    }
  };

  const saveFrame = () => p.save(graphic, "pattern.jpg");

  const setFeedRate = (value) => feedRate.value(value);
  const setKillRate = (value) => killRate.value(value);

  const swap = () => {
    let cache = cells;
    cells = cellsNext;
    cellsNext = cache;
  };
};

export default reactionDiffusion;
