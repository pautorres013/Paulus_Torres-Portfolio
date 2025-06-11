
// Load images with carousel dots and auto-rotation
export function createImageCarousel(content) {
  const imageContainer = document.querySelector("#render-cont");

  if (content.renders && Array.isArray(content.renders) && content.renders.length > 0) {
    if (content.renders && Array.isArray(content.renders)) {
      content.renders.forEach((render) => {
        /*
        if (counter % 3 === 0 || counter === 0) {
          currRow = document.createElement("div");
          currRow.classList.add("flex", "flex-col", "gap-4", "w-100", "h-100"); // Adjust layout as needed
          imageContainer.appendChild(currRow);
        }
        
        createObject(currRow, render); // Append render to the current row*/
        createObject(imageContainer, render);
        
      });
    }
  }
}
function createObject(imageContainer, render) {

  Object.entries(render).forEach(([category, views]) => {
    const categ_data = document.createElement("div");
    categ_data.classList.add(
      "carousel",
      "shadow-2xl",
      "mx-5",
      "relative",
      "flex",
      "flex-col",
      "overflow-hidden",
      "w-100",
      "xl:w-screen",
      "outline-1",
      "outline-[var(--color-text)]"
    );

    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add(
      "carousel-images",
      "flex",
      "transition-transform",
      "duration-500",
      "items-center"
    );

    const dotsContainer = document.createElement("div");
    dotsContainer.classList.add(
      "carousel-dots",
      "flex",
      "justify-center",
      "space-x-2",
      "mt-6",
      "mb-5"
    );

    // Ensure we are accessing the first object inside the array
    Object.entries(views[0]).forEach(([viewName, src], index) => {

      const figure = document.createElement("figure");
      figure.classList.add("min-w-full", "min-h-full", "aspect-square");

      let img;
      if (viewName.toLowerCase().includes("animation")) {
        img = document.createElement("video");
        img.src = src;
        img.controls = true;
      } else {
        img = document.createElement("img");
        img.src = src;
      }
      img.alt = `${category} - ${viewName}`;
      img.classList.add("cursor-pointer", "w-full", "h-full", "object-cover");
      img.addEventListener("click", () => {
        document.getElementById("zoomed-img").src = src;
        document.getElementById("zoom-overlay").classList.remove("hidden");
        document.getElementById("zoom-overlay").classList.add("flex", "z-60");

        // Ensure zoom-overlay click listener is added **once**
        document.getElementById("zoom-overlay").addEventListener("click", () => {
          document.getElementById("zoom-overlay").classList.remove("flex");
          document.getElementById("zoom-overlay").classList.add("hidden");
        });
      });

      const figcaption = document.createElement("figcaption");
      figcaption.textContent = `${category} - ${viewName}`;

      figure.append(img, figcaption);
      imageWrapper.appendChild(figure);

      // Dots Navigation
      const dot = document.createElement("div");
      dot.classList.add(
        "w-4",
        "h-4",
        "bg-[var(--color-bg)]",
        "rounded-full",
        "cursor-pointer",
        "hover:bg-[var(--color-hover-bg)]",
        "outline-1"
      );
      dot.addEventListener("click", () => moveToSlide(imageWrapper, index));
      dotsContainer.appendChild(dot);
    });
  
    // Ensure the first dot is active
    Array.from(dotsContainer.children).forEach((dot, idx) => {
      dot.classList.toggle("bg-[var(--color-hover-bg)]", idx === 0);
    });
    categ_data.appendChild(imageWrapper);
    categ_data.appendChild(dotsContainer);
    imageContainer.appendChild(categ_data);

    // Rotate only if multiple images exist
    if (imageWrapper.children.length > 1) {
      autoRotate(imageWrapper, dotsContainer);
    }
  });
}



function moveToSlide(wrapper, dotsContainer, index) {
  wrapper.style.transform = `translateX(-${index * 100}%)`;
  // Highlight the active dot
  Array.from(dotsContainer.children).forEach((dot, idx) => {
    dot.classList.toggle("bg-[var(--color-hover-bg)]", idx === index);
  });
}

function autoRotate(wrapper, dotsContainer) {
  let currentIndex = 0;
  const slides = wrapper.children.length;
  let autoRotateInterval = setInterval(() => {
    currentIndex = (currentIndex + 1) % slides;
    moveToSlide(wrapper, dotsContainer, currentIndex);
  }, 2000);

  // Reset auto-rotation on dot click
  Array.from(dotsContainer.children).forEach((dot, index) => {
    dot.addEventListener("click", () => {
      clearInterval(autoRotateInterval); // Stop auto-rotation temporarily
      moveToSlide(wrapper, dotsContainer, index);

      // Restart auto-rotation after 5 seconds
      autoRotateInterval = setInterval(() => {
        currentIndex = (currentIndex + 1) % slides;
        moveToSlide(wrapper, dotsContainer, currentIndex);
      }, 3000);
    });
  });
}

