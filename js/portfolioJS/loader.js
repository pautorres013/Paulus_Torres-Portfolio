import { createImageCarousel } from "./imgCarousel.js";
import { toggleDots } from "../section_scroll.js";

let currentIndex = 0; // Declare currentIndex before usage
let contentData = []; // Declare contentData before usag

const mainContainer = document.querySelector("#pf-cont");
// Select all sections with the ID 'pfslider'
let pf_slides = document.querySelectorAll("#pfslider");
document.addEventListener("DOMContentLoaded",()=>{
  pf_slides.forEach((pf_slide, index) => {
    pf_slide.addEventListener("click", () => {
      hideSliders();
      toggleDots();
      // Load the content based on the clicked section
      mainContainer.classList.toggle('hidden');
      loadContent(index); // Pass the index of the clicked section
    });
  });
});

async function loadContent(contentIndex) {
  try {
    const response = await fetch("./json/content.json");
    const data = await response.json();

    contentData = data["pf-content"]; // Store content data for navigation
    currentIndex = contentIndex; // Track current index

    // Clear existing content and set up the new layout
    const content = contentData[contentIndex];
    mainContainer.innerHTML = `
      <h1 class="bullet-title pb-10 pt-50">${content.title}</h1>
      <div class="grid grid-rows-1 items-center justify-center gap-4">
          <h2 class="int-title text-center">Description</h2>
          <p class="paragraphs ">${content.description}</p>
          <h2 class="int-title">Workflow</h2>
          <p class="paragraphs">${content.workflow}</p>
          <h2 class="int-title">Renders</h2>
      </div>
      <div class="relative overflow-hidden w-full space-x-4 md:space-y-0 space-y-10 mt-6 flex flex-col outline-1 outline-[var(--color-text)] shadow-2xl md:flex-row items-center" id="render-cont"></div>
  
      <div id="zoom-overlay" 
          class="fixed inset-0 visible:flex items-center justify-center bg-black/80 hidden w-full h-full">
          <img id="zoomed-img" src="" class="rounded-lg max-w-full max-h-full object-contain">
      </div>
  
      <div class="flex flex-row w-full items-center text-center justify-evenly space-x-5">
          <button id="back-btn" class="button-css">
          &lt;Portfolio
          </button>
        <div class='flex flex-row space-x-5 md:space-x-15'>
          <button id="bckBtn" class="button-css" >
          &lt;Previous
          </button>
          <button id="nxtBtn" class="button-css">
           Next &gt; 
          </button>
        </div>
    `;
    // Add navigation logic
    pfCont_navigation();
    // Back button logic
    document.querySelector("#back-btn").addEventListener("click", () => {
        showSliders();
    });
    // Load images if available
    const imgCarousel = new createImageCarousel(content);

  } catch (error) {
    console.error("Error loading content:", error);
  }
}

function showSliders(){
  mainContainer.classList.toggle('hidden');
  pf_slides = document.querySelectorAll("#pfslider");
  pf_slides.forEach((pf_slide, index) => {
    pf_slide.classList.toggle('hidden');
  });
  toggleDots();
}
function hideSliders(){
  pf_slides = document.querySelectorAll("#pfslider");
  pf_slides.forEach((pf_slide, index) => {
    pf_slide.classList.toggle('hidden');
  });
}


function pfCont_navigation() {
  try {
    const b_btn = document.querySelector("#bckBtn");
    const n_btn = document.querySelector("#nxtBtn");

    // Previous button event listener
    b_btn.addEventListener("click", () => {
      if (currentIndex > 0) {
        loadContent(currentIndex - 1); // Load previous content
      }
    });

    // Next button event listener
    n_btn.addEventListener("click", () => {
      if (currentIndex < contentData.length - 1) {
        loadContent(currentIndex + 1); // Load next content
      }
    });
  } catch (error) {
    console.error("Navigation error:", error);
  }
}