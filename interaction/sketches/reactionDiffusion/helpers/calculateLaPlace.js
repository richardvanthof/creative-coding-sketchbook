 /**
# LaPlacian function
Function that takes care of convolution. It takes the values of all cells around the target cell and use that in the calculation.
look at every single cell and apply a weight. We're trying to determine the difference between the cell and it's neighbours.
Some typical values used, for those interested, are: DA=1.0, DB=.5, f=.055, k=.062 (f and k vary for different patterns), and Δt=1.0. The Laplacian is performed with a 3x3 convolution with center weight -1, adjacent neighbors .2, and diagonals .05. The grid is initialized with A=1, B=0, and a small area is seeded with B=1.

> Learn more: https://www.geeksforgeeks.org/machine-learning/laplace-operator/
*/
const calculateLaPlace = ({
    x, y, grid,
    chemical = 'a',
    direct = 0.2,
    across = 0.05
}) => {
    const width = grid.length;
    const height = grid[0].length;
    
    // Helper to wrap indices around edges
    const wrap = (n, max) => (n + max) % max;

    const neighbors = [
    // center
    [0,  0, -1],

    // direct neighbors
    [-1,  0, direct],
    [ 1,  0, direct],
    [ 0, -1, direct],
    [ 0,  1, direct],

    // diagonal neighbors
    [-1, -1, across],
    [ 1,  1, across],
    [-1,  1, across],
    [ 1, -1, across],
    ];

    let sum = 0;

    for (const [dx, dy, w] of neighbors) {
    const nx = wrap(x + dx, width);
    const ny = wrap(y + dy, height);
    sum += grid[nx][ny][chemical] * w;
    }

    return sum;
};

export default calculateLaPlace;