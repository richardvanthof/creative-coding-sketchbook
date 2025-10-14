import calculateLaPlace from "./helpers/calculateLaPlace.js";

// CREATE CREATIVE USE OF THIS
// Coding Challenge #13: Reaction Diffusion Algorithm in p5.js
// https://www.youtube.com/watch?v=BV9ny785UNc

// I know, the performance sucks. This should be done in a shader but I don't know how to do that yet :/

const reactionDiffusion = (p) => {
    let brushSize;
    let brushShape = 'square';
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

        // Brush Controls
        p.createP('Brush Size');
        brushSize = p.createSlider(0, 200, 20);
        brushSize.style('width', '200px');

        // Brush shape
        p.createP('Brush shape');
        p.createDiv().addClass(['shapes-button-group btn-group']);
        [['❍', 'circle'], ['☐', 'square']].forEach(([icon, label]) => {
          const btn = document.createElement('button');
          btn.innerText = icon;
          btn.title = `${label} brush`;
          btn.value = label;
          btn.classList.add('btn','btn-outline-primary');
          btn.onclick = (e) => {
            e.target.parentNode.querySelectorAll('button').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');
            brushShape = e.target.value;
            console.log(brushShape)
          }
          document.querySelector('.shapes-button-group').appendChild(btn);
        })
        // Simulation Controls
        p.createP('Diffusion A');
        diffusionA = p.createSlider(0, 2, 1, 0.01);
        diffusionA.style('width', '200px');

        p.createP('Diffusion B');
        diffustionB = p.createSlider(0, 1, 0.5, 0.01);
        diffustionB.style('width', '200px');

        p.createP('Feed Rate');
        feedRate = p.createSlider(0, 0.1, 0.055, 0.001);
        feedRate.style('width', '200px');

        p.createP('Kill Rate');
        killRate = p.createSlider(0, 0.1, 0.062, 0.001);
        killRate.style('width', '200px');

        showFPS = p.createCheckbox('FPS Counter', false);
      // Generate grid data structure
      // with the initial particle properties.
      for(let x = 0; x < res; x++) {
          cells[x] = [];
          cellsNext[x] = [];
          for(let y = 0; y < res; y++) {
            const initial = { a: 1, b: 0 };
            cells[x][y] = { ...initial };
            cellsNext[x][y] = { ...initial };
          }
      }
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
      p.rect(p.mouseX, p.mouseY, brushSize.value());

      // show frameRate
      if (showFPS.checked()){
        p.push();
        p.fill(0);
        p.text(`FPS: ${p.floor(p.frameRate())}`,10,20);
        p.pop();
      }
    }

    p.mouseWheel = (e) => {
        brushSize.value(brushSize.value() + (e.delta/10));
    }

    p.mousePressed = (e) => {
        const bs = brushSize.value();
          const xStart = p.floor(p.constrain(p.mouseX - bs / 2, 0, p.width - 1));
          const yStart = p.floor(p.constrain(p.mouseY - bs / 2, 0, p.height - 1));
          const xEnd   = p.floor(p.constrain(p.mouseX + bs / 2, 0, p.width - 1));
          const yEnd   = p.floor(p.constrain(p.mouseY + bs / 2, 0, p.height - 1));
        for (let x = xStart; x < xEnd; x++) {
            for (let y = yStart; y < yEnd; y++) {
                cells[x][y].b = 1;
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