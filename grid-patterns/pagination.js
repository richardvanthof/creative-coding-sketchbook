let currentP5;
const container = document.getElementById("sketch-container");
const sketches = [sketch1, sketch2, trunchet, rotatingGlitches];

// Simple paginator to switch between sketches
let currentSketchIndex = 0;
const paginator = document.createElement("div");
paginator.className = "paginator";

// Create prev and next buttons
const prevBtn = document.createElement("button");
prevBtn.innerText = "<";
prevBtn.className = "prev-btn";

const nextBtn = document.createElement("button");
nextBtn.innerText = ">";
nextBtn.className = "next-btn";

// Helper to load a sketch by index (wraps around)
function loadSketch(idx) {
  if (idx < 0) {
    currentSketchIndex = sketches.length - 1;
  } else if (idx >= sketches.length) {
    currentSketchIndex = 0;
  } else {
    currentSketchIndex = idx;
  }

  // update numeric button active state using normalized index
  paginator
    .querySelectorAll("button.number-btn")
    .forEach((b) => b.classList.remove("active"));
  const activeBtn = paginator.querySelector(
    `button.number-btn[data-index="${currentSketchIndex}"]`
  );
  if (activeBtn) activeBtn.classList.add("active");

  // remove previous sketch and initialize new one
  if (currentP5) {
    currentP5.remove();
  }
  container.innerHTML = "";
  currentP5 = new p5(sketches[currentSketchIndex], container);
}

// Prev/Next handlers (loadSketch wraps automatically)
prevBtn.addEventListener("click", () => loadSketch(currentSketchIndex - 1));
nextBtn.addEventListener("click", () => loadSketch(currentSketchIndex + 1));

paginator.append(prevBtn);

// Numeric buttons
sketches.forEach((sketch, index) => {
  const button = document.createElement("button");
  button.innerText = `${index + 1}`;
  button.setAttribute("data-index", index);
  button.classList.add("number-btn");
  if (index === currentSketchIndex) button.classList.add("active");

  button.addEventListener("click", (e) => {
    const idx = Number(e.currentTarget.getAttribute("data-index"));
    loadSketch(idx);
  });
  paginator.append(button);
});

paginator.append(nextBtn);

document.body.append(paginator);

// Initialize the first sketch on load
currentP5 = new p5(sketches[currentSketchIndex], container);
