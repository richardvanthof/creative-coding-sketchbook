# Extension

## Drawing in 3D
We're going to look at drawing in 3D. Activate webgl renderer to start.
```javascript
createCanvas(300,300,WEBGL)
```
### Basic primitives

```javascript
// box(width, [height], [depth])
// Creates a box. If height/depth are omitted, creates a cube.
box(width, height, depth)
```

- width: Number (required)  
- height, depth: Number (optional)

```javascript
// torus(radius, tubeRadius, [detailX], [detailY])
// A donut-shaped mesh.
torus(radius, tubeRadius, detailX, detailY)
```

- radius: Number (required) — main radius  
- tubeRadius: Number (required) — radius of the tube  
- detailX, detailY: Number (optional) — resolution

```javascript
// sphere(radius, [detailX], [detailY])
// A UV-sphere.
sphere(radius, detailX, detailY)
```

- radius: Number (required)  
- detailX, detailY: Number (optional) — resolution along axes

```javascript
// plane(width, [height], [detailX], [detailY])
// A flat grid (two-sided).
plane(width, height, detailX, detailY)
```

- width: Number (required)  
- height: Number (optional)  
- detailX, detailY: Number (optional) — subdivisions

```javascript
// cylinder(radius, height, [detailX], [detailY])
// A capped cylinder.
cylinder(radius, height, detailX, detailY)
```

- radius: Number (required)  
- height: Number (required)  
- detailX, detailY: Number (optional) — radial / height resolution

```javascript
// cone(radius, height, [detailX], [detailY])
// A cone with a circular base.
cone(radius, height, detailX, detailY)
```

- radius: Number (required)  
- height: Number (required)  
- detailX, detailY: Number (optional) — radial / height resolution

```javascript
// ellipse(x, y, width, [height])
// 2D ellipse in model coordinates (useful in WEBGL shapes/planes).
ellipse(x, y, width, height)
```

- x, y: Number — position in model coordinates  
- width: Number (required)  
- height: Number (optional)
All regular shapes from p5 also work in 3d space and can often take a z-coordinate.



### Positioning
lots of forms don't use x and y coordinates. You have to use `translate()` for this.

### Lights
You can also add different lights. 
```javascript
ambientLight()
// Gives flat light

directionalLight() 
// you don't have a position that the light comes from, just an array of parrarel light rays

pointLight();
// illuminating equally in every direction. 

spotLight();
// you can decide location and direction.
```
These lights are seen as object. You can therefore animate then using translate.
## Coordinates
You have x, y and z axis. (0,0,0) is now in the middle of the canvas instead of webgl
z points to the camera. The higher the z-axis, the closer the object seems to you.

## Loading models
Can load models via preload function like obj, ...

## Style geometry
We can change `fill`, `stroke`, `strokeWeight`, `StrokeCap` and `StrokeJoin`;

## Apply textures
You can apply textures to objects.

```javascript
let img;

preload() {
    img = loadImage('/path/to/img.jpg')
};

setup() {
    createCanvas(300,300,WEBGL);
}

draw() {
    texture(img);
    box(width/2, width/2)
}
```
### Video
Apply video. It creates a Video DOM object and fulls frames from that.
```javascript
let video;

preload() {
    video = createVideo('/path/to/vid.mp4')
};

setup() {
    createCanvas(300,300,WEBGL);
    video.hide();
}

draw() {
    texture(video);
    box(width/2, width/2)
}
```

## UV Coordinates
if you want to map textures onto a custom geometry you can add e separate set of UV coordinates
```
beginShape();
vertex()
vertex()
vertex()
endShape();
```

## Texturemode
`texturemode(IMAGE)`: default - expects pixel coordinates in image space.
`textureMode(NORMAL)`: expects uv coordinates to be normalized. (this is how it works in most 3d software)

## Materials
```javascript
ambientMaterial();
/**
 * applies a material that only reacts to ambientLight. 
 * you can also decide with what color it responds with. 
 * (the light can be gray but the material can light up green)
**/

specularMaterial();
// ???

emissiveMaterial();
// looks like you're emitting light.

normalMaterial();
// colors shape based on what direction they're pointing. Good for debugging.

```

## Camera
The 'eye' from wich the user sees the image.
- frustum
  - near plane
  - far plane
- perspective
  - FOV
  - aspect ratio
  - near plane
  - far plane
- Orthogonal: all lines go parralel. no perspective

## Navigation
You can move around using your mouse by adding ```orbitControl()``` to the `draw()` loop;
youcan also create a custom camera that you can directly control;

```javascript
let cam, position, speed, heading, rotation;

function setup() {
  createCanvas(300, 300, WEBGL);
  cam = createCamera();
  position = createVector(25, 0, 25);
  speed = 1;
  heading = 0;
  rotation = 0;
  const w = width/100;
  const h = height/100
  cam.frustum(-w, w, -h, h, 15, 500)
}

function draw() {
  background(240);
  // Update camera position to create a flythrough effect
  if (rotation != 0) {
    // If the camera is rotating add rotation to heading
	heading += rotation;
    // If the heading is a multiple of 90, stop rotating
    if ((heading % 90) == 0) { rotation = 0; }
  } else if ((abs(position.x - 25) % 50) == 0 && (abs(position.z - 25) % 50) == 0) {
    // If the position is at an intersection and with 50% probability
    if (random() < 0.5) {
      // Set the rotation to a non-zero value
	  rotation = random([-1, 1]);
    }
  }
  // The current heading in radians
  const a = radians(heading);
  // The velocity is the heading x speed
  const v = createVector(sin(a), 0, cos(a)).mult(speed);
  // The next position is the position + velocity
  const p = p5.Vector.add(position, v);
  // Set the current position
  cam.setPosition(position.x, position.y, position.z);
  // Look in the direction of the next position
  cam.lookAt(p.x, p.y, p.z);
  // If the camera is not rotating then move to next position
  if (rotation == 0) { position = p; }
  // Draw a grid of boxes to visualize 3D space
  for (let x = -1000; x <= 1000; x += 50) {
    for (let z = -1000; z <= 1000; z += 50) {
      push();
      translate(x, 0, z);
      strokeWeight(0.5);
      box(20);
      pop();
    }
  }
}
```

## Buildgeometry
`buildGeometry()`

## Shaders
- vertex shaders: 

