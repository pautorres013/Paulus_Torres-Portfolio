async function loadContent() {
  try {
    const response = await fetch("./json/cs-content.json");
    const data = await response.json(); // Parse JSON

    // Select the <ol> element
    const listContainer = document.querySelector(".list-cont");

    // Clear existing content
    listContainer.innerHTML = "";

    // Function to generate list items
    function createListItem(study, category) {
      let listItem = document.createElement("li");
      listItem.classList.add(
        "relative",
        "mb-4",
        "w-100",
        "md:w-full"
      );
      listItem.classList.add(); // Add margin for spacing

      // Add study title
      listItem.innerHTML = study.Title;
      listItem.classList.add("content-title", "cursor-pointer");

      // Create ordered list (<ol>) for contents
      let contents = document.createElement("ol");
      contents.classList.add(
        "flex",
        "flex-col",
        "text-justify",
        "list-[upper-roman]",
        "cs-cont",
        "overflow-hidden", 
        "transition-[max-height]",
        "duration-500",
        "ease-in-out",
        "max-h-0",
        "opacity-0"
      );

      // Determine content items based on category
      let contentItems = [];
      if (category === "case-study") {
        contentItems = [
          study.Introduction,
          study.Background,
          study["Blender-exporting"],
          study["Troubleshooting & Optimization"],
          study.Conclusion,
        ];
      } else if (category === "portfolio") {
        contentItems = [
          study.Introduction,
          study.Methodology,
          study.Structure,
          study.Design,
          study.Additional,
          study.Deployment,
        ];
      }

      // Loop through and create <li> elements inside <ol>
      contentItems.forEach((content) => {
        if (content) {
          let listContent = document.createElement("li");
          listContent.classList.add("list-[upper-roman]", "ml-10", "md:ml-20");
          listContent.innerHTML = content;
          contents.appendChild(listContent);
        }
      });

      let cs_button = document.createElement("button");
      cs_button.innerHTML = `<svg class='w-8 h-8 align-middle' fill='none' stroke='currentColor' stroke-width='2'
       viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'> <path id='arrow-path' 
       stroke-linecap='round' stroke-linejoin='round' d='M5 15l7-7 7 7'> </path> </svg>`;
      cs_button.classList.add("focus:outline-none", "cursor-pointer", "ml-2");

      // Append elements to the main list
      listItem.appendChild(contents);
      listItem.appendChild(cs_button);
      listContainer.appendChild(listItem);
    }

    // Process case-study
    data["case-study"].forEach((study) => createListItem(study, "case-study"));

    // Process portfolio
    data["portfolio"].forEach((study) => createListItem(study, "portfolio"));

    // Add event listeners after elements are created
    document.querySelectorAll(".list-cont li").forEach((listItem) => {
      const csContainer = listItem.querySelector(".cs-cont");
      const arrow = listItem.querySelector("#arrow-path");

      listItem.addEventListener("click", function () {
        const isExpanded =
          csContainer.style.maxHeight && csContainer.style.maxHeight !== "0px";

        if (!isExpanded) {
          csContainer.style.maxHeight = csContainer.scrollHeight + "px";
          csContainer.style.opacity = "1";
        } else {
          setTimeout(() => (csContainer.style.maxHeight = "0px"), 500);
          setTimeout(() => (csContainer.style.opacity = "0"), 500);
        }

        // Toggle arrow direction
        arrow.setAttribute(
          "d",
          isExpanded ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"
        );
      });
    });
  } catch (error) {}
}

// Call the function to load content when the page loads
loadContent();
