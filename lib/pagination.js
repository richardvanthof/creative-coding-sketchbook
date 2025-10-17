const pagination = (sketches) => {
  // check if current sketch id is set.
  const params = new URLSearchParams(window.location.search);
  const sketchId = params.get("id");
  const controls = params.get("controls");

  let currentP5;
  let currentSketchIndex = sketchId || 0; //check if ?id= is set in URL
  const container = document.querySelector(".app");

  const nav = document.createElement("nav");
  nav.style.position = "absolute";
  nav.style.bottom = "1em";
  nav.style.width = "100%";
  nav.style.padding = "0 1em";
  nav.style.zIndex = "1000";
  nav.style.display = "flex";
  nav.style.justifyContent = "space-between";

   // Add home button
  const homeLink = document.createElement("a");
  homeLink.href = "../";
  homeLink.innerHTML = `🏠`;
  // homeLink.classList.add(["btn"]);
  homeLink.style.marginRight = "1em";
  homeLink.style.alignItems = "baseline";
  homeLink.classList.add("btn", "btn-outline-secondary");
  nav.appendChild(homeLink);


  // Use a UL to follow Bootstrap pagination structure
  const paginator = document.createElement("ul");
  
  paginator.classList.add("paginator", "pagination");
  paginator.style.padding = "0";
  paginator.style.margin = "0";

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

      const url = new URL(window.location);
      url.searchParams.set("id", idx);
      window.history.replaceState({}, "", url);

      loadSketch(idx);

      
    });

    li.appendChild(button);
    paginator.append(li);
  });

  paginator.append(nextLi);
  nav.appendChild(paginator);

  // Append paginator to body unless ?controls= is set to false/0/no/off
  const hideControlsValues = ["false", "0", "no", "off"];
  if (!hideControlsValues.includes((controls || "").toLowerCase())) {
    document.body.appendChild(nav);
  }

  

  // Initialize the first sketch on load
  currentP5 = new p5(sketches[currentSketchIndex], container);
}

export default pagination;
