## getting pixels
get a color from a point in the image using 

```
const img = 
cosnt c = img.get(mouseY, mouseY);
console.log(c) // get color at pixel position
```

.get is also good to stretch pixels

get() can also be used to just make a copy

.set allows you to set any pixel on an image of the canvas
use updatePiels() to apply your edits.

we can use the set function inside the image as well


# Graphics contects
```const g = p.createGraphic()```

is allows you to separate out drawing of multiple elements (like layers in photoshop).

# Masks
allows us to mash images together.

# Sound
You can do some things with sound in P5. You can load in MP3 or OGG (based on the browser).
It will play it once

## fft
it supports fft!
you can even make synths!

[Tone](https://tonejs.github.io/) is also a nice sound library.

# Shaders
Inspiration: https://www.shadertoy.com/?theme=default
https://thebookofshaders.com/