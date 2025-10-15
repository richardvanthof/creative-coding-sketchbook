import calculateLaPlace from "./helpers/calculateLaPlace.js";

// CREATE CREATIVE USE OF THIS
// Coding Challenge #13: Reaction Diffusion Algorithm in p5.js
// https://www.youtube.com/watch?v=BV9ny785UNc

// I know, the performance sucks. This should be done in a shader but I don't know how to do that yet :/

const createSlider = (p, labelText, min, max, value, step) => {
    const container = p.createDiv().style('margin', '10px');
    p.createP(labelText).parent(container);
    const slider = p.createSlider(min, max, value, step).parent(container);
    slider.style('width', '200px');
    return slider;
}

const reactionDiffusion = (p) => {
    let brushSize;
    let brushShape = 'circle';
    let showFPS;
    let cells = [];
    let cellsNext = [];
    let c1, c2;

    let res;

    let diffusionA = 1, //diffusion rate A
        diffustionB = 0.5, // diffusion rate B
        feedRate = 0.055, // feed rate
        killRate = 0.062, // kill rate
        timeScale = 1 // time scale. 1 once per frame

    
    p.setup = () => {
      p.createCanvas(200, 200);
      p.pixelDensity(1);
      p.rectMode(p.CENTER);
      res = p.width;
      
      c1 = p.color(204,57,72);
      c2 = p.color(187,68,36);

      // UI CONTROLS
      // Brush Controls
      
        const brushControls = p.createDiv().style('margin', '10px');
        // Brush Controls
        p.createP('Brush Size').parent(brushControls);
        brushSize = p.createSlider(0, 200, 20).parent(brushControls);
        brushSize.style('width', '200px');

        // Brush shape
        p.createP('Brush shape').parent(brushControls);
        p.createDiv().addClass(['shapes-button-group btn-group']).parent(brushControls);
        [['❍', 'circle'], ['☐', 'square']].forEach(([icon, label]) => {
          const btn = document.createElement('button');
          btn.innerText = icon;
          btn.title = `${label} brush`;
          btn.value = label;
          btn.classList.add('btn','btn-outline-primary', btn.value === brushShape && 'active');
          btn.onclick = (e) => {
            e.target.parentNode.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            brushShape = e.target.value;
            console.log(brushShape)
          }
          document.querySelector('.shapes-button-group').appendChild(btn);
        })



        // Simulation Controls
        const simControls = p.createDiv().style('margin', '10px');
        p.createP('Diffusion A').parent(simControls);
        diffusionA = p.createSlider(0, 2, 1, 0.01).parent(simControls);
        diffusionA.style('width', '200px');

        p.createP('Diffusion B').parent(simControls);
        diffustionB = p.createSlider(0, 1, 0.5, 0.01).parent(simControls);
        diffustionB.style('width', '200px');

        p.createP('Feed Rate').parent(simControls);
        feedRate = p.createSlider(0, 0.1, 0.055, 0.001).parent(simControls);
        feedRate.style('width', '200px');

        p.createP('Kill Rate').parent(simControls);
        killRate = p.createSlider(0, 0.1, 0.062, 0.001).parent(simControls);
        killRate.style('width', '200px');

        showFPS = p.createCheckbox('FPS Counter', false).parent(simControls);

        p.createButton('Reset')
        .addClass('btn btn-light')
        .parent(simControls).mousePressed(() => resetCanvas());
        p.createButton('Shortcuts').addClass('btn btn-light').parent(simControls).mousePressed(() => {});
        p.createButton('Play/Pause').addClass('btn btn-light').parent(simControls).mousePressed(() => {});
        p.createButton('Save frame').addClass('btn btn-light').parent(simControls).mousePressed(() => {});
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
    }
    
    p.draw = () => {
      p.background(220);
      p.loadPixels();
      let dA = diffusionA.value(), //diffusion rate A
        dB = diffustionB.value(), // diffusion rate B
        feed = feedRate.value(), // feed rate
        kill = killRate.value(), // kill rate
        dt = timeScale // time scale. 1 once per frame
      
      cells.forEach((cols, x) => {
        cols.forEach((cell, y) => {
          const a = cell.a, b = cell.b;
          const config = {x,y,grid:cells}
          const laPlace = {
            a: calculateLaPlace({...config, chemical: 'a'}),
            b: calculateLaPlace({...config, chemical: 'b'})
          }
          cellsNext[x][y].a = a + (dA * laPlace.a) - (a * b * b) + (feed * (1-a)) * dt;
          cellsNext[x][y].b = b + (dB * laPlace.b + a * b * b - (kill + feed) * b) * dt;
        })
      })
      
      for(let x = 0; x < p.width; x++) {
        for(let y = 0; y < p.height; y++) {
          
          // Update pixel colors
          let pix = (x + y * p.width) * 4;
          p.pixels[pix + 0] = p.floor(cellsNext[x][y].a * 255);
          p.pixels[pix + 1] = 255;
          p.pixels[pix + 2] = p.floor(cellsNext[x][y].b * 255);
          p.pixels[pix + 3] = 255
        }
      }
      p.updatePixels();
      swap();

      
      p.noCursor();
      p.noFill();
      if(brushShape === 'circle') {
        p.ellipse(p.mouseX, p.mouseY, brushSize.value(), brushSize.value());
      } else {
        p.rect(p.mouseX, p.mouseY, brushSize.value());
      }
      

      // show frameRate
      if (showFPS.checked()){
        p.push();
        p.fill(0);
        p.text(`FPS: ${p.floor(p.frameRate())}`,10,20);
        p.pop();
      }
    }
    
    // Paint controls
    p.mousePressed = (e) => paint();
    p.mouseDragged = (e) => paint(); // BUG: sometimes this results in green squares taking over the canvas
    p.mouseWheel = (e) => adjustBrushSize(e.delta/10);
    p.keyPressed = () => {
      if (p.key === ']') adjustBrushSize(3);
      if (p.key === '[') adjustBrushSize(-3);
    };

    const paint = () => {
       const bs = brushSize.value();
        const xStart = p.floor(p.constrain(p.mouseX - bs / 2, 0, p.width - 1));
        const yStart = p.floor(p.constrain(p.mouseY - bs / 2, 0, p.height - 1));
        const xEnd   = p.floor(p.constrain(p.mouseX + bs / 2, 0, p.width - 1));
        const yEnd   = p.floor(p.constrain(p.mouseY + bs / 2, 0, p.height - 1));

        if (brushShape === 'circle') {
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
    }
    const adjustBrushSize = (mutation) => brushSize.value(brushSize.value() + mutation);
    const resetCanvas = () => {
      cells = [];
      for(let x = 0; x < res; x++) {
          cells[x] = [];
          cellsNext[x] = [];
          for(let y = 0; y < res; y++) {
            const initial = { a: 1, b: 0 };
            cells[x][y] = { ...initial };
            cellsNext[x][y] = { ...initial };
          }
      }
    }
    const swap = () => {
      let cache = cells
      cells = cellsNext;
      cellsNext = cache;
    }
}


export default reactionDiffusion;