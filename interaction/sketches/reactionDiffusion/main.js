import calculateLaPlace from "./helpers/calculateLaPlace.js";

// CREATE CREATIVE USE OF THIS
// Coding Challenge #13: Reaction Diffusion Algorithm in p5.js
// https://www.youtube.com/watch?v=BV9ny785UNc

// I know, the performance sucks. This should be done in a shader but I don't know how to do that yet :/

const reactionDiffusion = (p) => {
    let showFPS;
    let cells = [];
    let cellsNext = [];
    let c1, c2;

    let res;

    let dA = 1, //diffusion rate A
        dB = 0.5, // diffusion rate B
        feed = 0.055, // feed rate
        kill = 0.062, // kill rate
        dt = 1 // time scale. 1 once per frame

    
    p.setup = () => {
      p.createCanvas(300, 300);
      p.pixelDensity(1);
      res = p.width;
      c1 = p.color(204,57,72);
      c2 = p.color(187,68,36);

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
      
      // Place an area of 'chemicals'
      for (let cx = 100; cx < 160; cx++) {
          for (let cy = 100; cy < 160; cy++) {
            cells[cx][cy].b = 1;
          }
      }
    }
    
    p.draw = () => {
      p.background(220);
      p.loadPixels();
      
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

      // show frameRate
      if (showFPS.checked()){
        p.text(`FPS: ${p.floor(p.frameRate())}`,10,20);
      }
    }

    const swap = () => {
      let cache = cells
      cells = cellsNext;
      cellsNext = cache;
    }
}


export default reactionDiffusion;