import pagination from "../lib/pagination.js";

import flowfield from "./sketches/flowfield/main.js";
import mutualAttraction from "./sketches/mutualAttraction/mutualAttraction.js";
import mutualAttractionRevised from "./sketches/mutualAttractionRevised/mutualAttraction.js";
pagination([mutualAttraction, mutualAttractionRevised]);