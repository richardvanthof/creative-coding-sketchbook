import pagination from "../lib/pagination.js";
import drawPad from "./sketches/drawPad/index.js";
import reactionDiffusionGenerator from "./sketches/reactionDiffusion/main.js";


pagination([reactionDiffusionGenerator, drawPad]);