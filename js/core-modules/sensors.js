import { updateData, getViewerID, getViewerData } from "./firestore_services";

let hoverCount = 0;
let clickCount = 0;
let startTime = null;
let totalTime = 0;
let lastHoveredElement = null;
const mainContainer = document.querySelector("main");

export function initializeSensors() {
  setupStaticSensor();
  setupDynamicSensor();
}

// Tracks user presence
function setupStaticSensor() {
  try {
    const sensor = document.createElement("div");
    Object.assign(sensor.style, {
      position: "absolute",
      width: "1px",
      height: "1px",
      top: "50%",
      left: "50%",
      opacity: "100",
      pointerEvents: "none",
    });

    document.body.appendChild(sensor);

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        console.log("User is engaging with Core AI.");
        if (!startTime) startTime = Date.now();
      } else {
        saveTime();
        startTime = null;
      }
    });

    observer.observe(sensor);
    window.addEventListener("beforeunload", saveTime);
  } catch (error) {
    console.error("Error initializing static sensor:", error);
  }
}

function saveTime() {
  if (startTime) {
    totalTime += Date.now() - startTime;
    startTime = Date.now();
  }
}

function setupDynamicSensor() {
  document.addEventListener("mousemove", (e) => {
    if (!mainContainer.contains(e.target) || e.target === lastHoveredElement)
      return;
    hoverCount++;
    lastHoveredElement = e.target;
  });

  document.addEventListener("click", (e) => {
    if (mainContainer.contains(e.target)) {
      clickCount++;
    }
  });
  gatherData();
}
let intervalId = null;

async function gatherData() {
  // Check if the page is not Home, because we only want this on other pages
  if (document.title != "Home" || document.title != "Core AI") {
    // Prevent multiple intervals by clearing the previous one
    if (intervalId !== null) {
      clearInterval(intervalId);
    }

    // Start a new interval to gather data every 10 seconds
    intervalId = setInterval(async () => {
      const currentData = await getViewerData(getViewerID());

      // Prepare the new data object with defaults for missing fields
      let data = {};
      const pagePrefix = document.title.toLowerCase().replace(/\s+/g, "_"); // Generate page key dynamically (e.g., 'portfolio' or 'case_studies')

      // Check if the current data has the required fields, if not, initialize them
      data[`${pagePrefix}_hover`] =
        (currentData?.[`${pagePrefix}_hover`] || 0) + hoverCount;
      data[`${pagePrefix}_click`] =
        (currentData?.[`${pagePrefix}_click`] || 0) + clickCount;
      data[`${pagePrefix}_sensor_timer`] =
        ((currentData?.[`${pagePrefix}_sensor_timer`] || 0) + totalTime) / 1000; // Add the new time in seconds

      // Save the updated data to the database
      await updateData("viewer", getViewerID(), data);

      // Log the data for debugging
      console.log(`Page: ${pagePrefix}`);
      console.log(`Total Hovers: ${data[`${pagePrefix}_hover`]}`);
      console.log(`Total Clicks: ${data[`${pagePrefix}_click`]}`);
      console.log(
        `Total Time: ${data[`${pagePrefix}_sensor_timer`].toFixed(2)} seconds`
      );

      // Reset counts after saving
      hoverCount = 0;
      clickCount = 0;
      totalTime = 0;
    }, 10000);
  }
}

