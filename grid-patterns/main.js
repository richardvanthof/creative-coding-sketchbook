import pagination from "../lib/pagination.js";
import hexGameOfLife from "./sketches/hexagonalGameOfLife/gameOfLife.js";
// import triangleGrid from "./sketches/triangleGrid/main.js";
import rotatingGlitches from "./sketches/rotatingGlitches.js";
import trunchet from "./sketches/trunchet.js";
import dotGrid from "./sketches/dotGrid.js";

pagination([trunchet, dotGrid, hexGameOfLife, rotatingGlitches]);