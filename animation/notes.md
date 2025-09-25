# Animation
unlike the seup function draw if called repeatedly. if we just write setup and then draw then p5 will call draw as much as it needs. Typically it is 30fps and we can't force it to do more than the browser. 

if we call Framerate() in setup we can basically come down from what the current fps is. it can be handy to make sure that something will run at a certain framerate.

couple of comments on some of the submission: 

>  some were doing createCanvas in the draw function. only do that in the setup() function. Easy mistake to make.

## Frame based animation

### Linear motion

every time a frame comes in we'll just fulfill this request by running the draw function. it's the simplest form of animation, where we can, for example move a box on screen. try to also think about variables that state when an animation should start and end so we have control over the motion. 

### Endless looping motions

I'm controlling my steps, each one has a start point (x and y coordinate), a phase (where in the cycle they are), a frequency and an amplitude and a size and color by using a list of hex values.

### Ping-pong motion

i just changed the logic on what we do when we get to the end of the frame. I just reverse the velocity (dt) so it goed back. it shows the utility to set up the control so we can easily set up the logic.

### frameCount()

keep track of the number of frames passed since the start of the sketch. handy if you want to keep an animation going withoug creating your own seperate value.

also handy when you use the % operator to keep it in some range.

## Timing based animation

### millis()

keep track of the miliseconds since the sketch started. handy when you want to run things bases on real time. It is smart to base your animations on real time. 

You can also use it to make events based on timing (every x seconds do n2(), every y seconds do n1())

### calculating running time

we can also use mills() to calculate how long a function takes. capture the millis at the start of a function. capture the millis when the function is done and subrackt them.

### calculating frame per seconds

if you want to show your fps, you can use `frameRate()` but you can also do it manually by calculating the running time and then `1000/deltaMilis()`

