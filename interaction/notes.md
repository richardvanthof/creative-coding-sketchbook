# Objects

JSON like object where you can store key value pairs.
```
const person = {
    name: 'Richard',
    grade: 9
}
```

You can access access them like numbers in an array `person['name']` or using the dot notation `person.grade`.
you can add properties like `person.age = 2025-1998`

```
// result
const person = {
    name: 'Richard',
    grade: 9,
    age: 27
}
```

## Adding a method
```
// result
const person = {
    name: 'Richard',
    grade: 9,
    age: 27,
    hello: () => console.log(`Hello world, I'm ${this.name}`) 
    // result: Hello world, I'm Richard.
}
```


# Simulation
## Particle systems
A collection of many minute elements that together represent a fuzzy object like fire or water. Every game or movie has them. Came along in the early 80s.

- We're gonna use a lot of ojects

## Mass-spring simulation
```
force = mass x accelleration
acceleration = force/mass
````

normally what we do is:

```
velocity = velocity + accelleration
poition = position + velocity
```

The trouble is that it's unstable.

### Verlet integration
the difference is that we don't keep velocity. We keep the current position and the last position. 
we calculate the velocity on each frame. why? because it's one less place the computer will make an error.

see slides

### Duck typing
If have multiple classes with common methods you can just call these 