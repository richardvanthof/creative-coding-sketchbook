let rows = 20;
let cols = 20;

function setup() {
  createCanvas(400, 400);
  angleMode(DEGREES);
}

function draw() {
  background(220);
  //noStroke();
  for(let x = 0; x < width; x += width / cols) {
    for(let y = 0; y < height; y += height / rows) {

      //fill(255 * (x / width), 255 * (y / height), 150);
      //rect(x, y, width / cols, height / rows);
      line(x,y, x + (width/cols), y + (height/rows));
      line(x,y, x + (width/cols), y - (height/rows));
      push();
      if((x+y % 2) === 0) {
        rotate(20);
        line(x,y, x, y + (height/rows));
      }
      pop();
      
      line(x,y, x + (width/cols), y);
    }
  }
}
