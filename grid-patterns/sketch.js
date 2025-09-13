// hexagon grid


/** 
// failed hexagonal grid (looks cool though :)
const resX = 20, resY = resX;

function setup() {
  createCanvas(400, 400);
  noLoop();
}

function draw() {
  const sx = width/resX; // Width of each cell
  const sy = height/resY; // height of each cell
  for(let x = 0; x <= width; x += sx) {
    for(let y = 0; y <= height; y += sy) {
      fill('green')
      beginShape();
        vertex(x+sx*0,25, y);
        vertex(x+sx*0.75, y);
        vertex(x+sx, y+sy*0.5);
        vertex(x+sx*0.75, y+sy);
        vertex(x+sx*0,25, y + sy);
        vertex(x, y+sy*0.5);
      endShape(CLOSE);
    }
  }
};
*/

 

// // 5. Interactive Truchet Tiles
// // Based on https://www.youtube.com/watch?v=Vpx2OeFc26o
// class Tile {
//   constructor(x,y, size) {
//     this.x = x;
//     this.y = y;
//     this.angle = 0;
//     this.size = size;
//     this.type = floor(random(0,2));
//   }

//   show() {
//     rectMode(CENTER);
//     push();
//       strokeWeight(.3)
//       translate(this.x,this.y);
//       stroke(0)
//       const offset = this.size/2;
//       rotate(this.angle);
//       noStroke();
//       rect(0,0,this.size,this.size);
//       stroke(3)
//       if(this.type === 0) {
//         arc(-this.size/2,-this.size/2,this.size, this.size, 0, PI/2)
//         arc(this.size/2,this.size/2,this.size, this.size, PI, 3*PI/2)
//       } else {
//         arc(-this.size/2,this.size/2,this.size, this.size, TWO_PI*0.75, TWO_PI)
//         arc(this.size/2,-this.size/2,this.size, this.size, PI/2, PI)
//       }
//     pop();
//   }

//   update() {
//     //this.angle += 0.01;
//   }

//   detectCursor(x,y) {
//     if(x > this.x - this.size/2 && x < this.x + this.size/2 &&
//        y > this.y - this.size/2 && y < this.y + this.size/2) {
//          this.angle += PI/2;
//        }  
//   }

// }

// function setup() {
//   createCanvas(400, 400);
//   // angleMode(DEGREES);
//   const amount = 20; //Amount of tiles
//   const size = width / amount;
//   for(let x = size/2; x < width; x += size) {
//     for(let y = size/2; y < height; y += size) {
//       tiles.push(new Tile(x,y, size));
//     }
//   }
//   //console.log(type)
//   //noLoop();
// }

// function draw() {
//   // background(0);
//   tiles.forEach(tile => {
//     tile.update();
//     tile.detectCursor(mouseX, mouseY)
//     tile.show();
//   })
  
// }


// 2. Weird gradient with rotating squares

/** 
let rows = 20;
let cols = 20;
function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
  //noLoop();
}

function draw() {
  background(220);
  //noStroke();

  for(let x = 0; x < width; x += width / cols) {
    for(let y = 0; y < height; y += height / rows) {

      noStroke();
      const r = random(0,1)
      push();
        rectMode(CENTER)
        translate(x,y)
        rotate(frameCount)
        fill(10, map(x, 0, width, 0, 255), map(y, 0, height, 0, 255))
        rect(x,y,x+(width/cols),y+(height/rows));

      pop();
    }
  }
}
*/

/*
// 1. draws diagonal line using random() function
let rows = 20;
let cols = 20;
function draw() {
  background(220);
  //noStroke();
  for(let x = 0; x < width; x += width / cols) {
    for(let y = 0; y < height; y += height / rows) {

      //fill(255 * (x / width), 255 * (y / height), 150);
      //rect(x, y, width / cols, height / rows);
      const r = random(0,1)
      if(r < .5) {
        // line(x,y, x, y + (height/rows));
        line(x,y, x + (width/cols), y + (height/rows));
        
      } else {
        // line(x,y, x + (width/cols), y);
        line(x,y, x + (width/cols), y - (height/rows));
        
      }
    }
  }
}
*/
