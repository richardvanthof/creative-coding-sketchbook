// https://nl.pinterest.com/pin/29906785019840362/
const increasingDots = (p) => {
  const rows = 10;
  const cols = 10;

  p.setup = () => {
    p.createCanvas(400, 400);
    p.noLoop();
  }

  p.draw = () => {
    p.background(30,30,30);
    p.noStroke();
    p.fill(255);
    
    const directions = [
      [-p.HALF_PI, p.HALF_PI, p.CHORD], //right
      [p.HALF_PI, p.HALF_PI + p.PI, p.CHORD], //left
      [0, p.PI, p.CHORD], //down
      [p.PI, p.TWO_PI, p.CHORD] //up
    ]

    const d = p.width / cols;
    
    for(let y = 0; y < rows; y++){
      for(let x = 0; x < cols; x++){
        p.fill(255);
        p.arc(
          p.width/cols*x + (p.width/cols)/2,
          p.height/rows*y + (p.height/rows)/2,
          d,
          d,
          ...directions[p.floor(p.random(0, directions.length))],
        );
      }
    }
  }
}

export default increasingDots;