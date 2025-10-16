const pagination = (sketches) => {
  let currentP5;
  let currentSketchIndex = 0;
  const container = document.querySelector(".app");

  // Use a UL to follow Bootstrap pagination structure
  const paginator = document.createElement("ul");
  paginator.style.position = "absolute";
  paginator.style.bottom = "0";
  paginator.style.left = "1em";
  paginator.classList.add("paginator", "pagination");

  // Prev button inside a page-item
  const prevLi = document.createElement("li");
  prevLi.className = "page-item prev-item";
  const prevBtn = document.createElement("button");
  prevBtn.innerHTML = "&laquo;"; // Bootstrap uses chevrons, can be "<"
  prevBtn.className = "page-link";
  prevLi.appendChild(prevBtn);

  // Next button inside a page-item
  const nextLi = document.createElement("li");
  nextLi.className = "page-item next-item";
  const nextBtn = document.createElement("button");
  nextBtn.innerHTML = "&raquo;"; // ">"
  nextBtn.className = "page-link";
  nextLi.appendChild(nextBtn);

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
      .querySelectorAll("li.page-item.number-item")
      .forEach((li) => li.classList.remove("active"));
    const activeLi = paginator.querySelector(
      `li.page-item.number-item[data-index="${currentSketchIndex}"]`
    );
    if (activeLi) activeLi.classList.add("active");

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

  paginator.append(prevLi);

  // Numeric buttons (li.page-item > button.page-link)
  sketches.forEach((sketch, index) => {
    const li = document.createElement("li");
    li.classList.add("page-item", "number-item");
    li.setAttribute("data-index", index);
    if (index === currentSketchIndex) li.classList.add("active");

    const button = document.createElement("button");
    button.innerText = `${index + 1}`;
    button.classList.add("page-link");
    // keep data-index on the li for active toggling; handler reads from event target
    button.addEventListener("click", (e) => {
      // find the parent li to read the data-index
      const parentLi = e.currentTarget.closest("li.page-item.number-item");
      const idx = Number(parentLi.getAttribute("data-index"));
      loadSketch(idx);
    });

    li.appendChild(button);
    paginator.append(li);
  });

  paginator.append(nextLi);

  document.body.append(paginator);

  // Initialize the first sketch on load
  currentP5 = new p5(sketches[currentSketchIndex], container);
}

export default pagination;
