import { updateData, getViewerID, getViewerData } from "./firestore_services";

export async function logicInit(){
  compareData();
}
// Variables to store the data for both pages
let csDataObj = {
  hover: 0,
  click: 0,
  time: 0,
};

let pfDataObj = {
  hover: 0,
  click: 0,
  time: 0,
};

// Fetch data for the Case Studies page
async function csData() {
  const csPrefix = "case_studies"; // Prefix for case studies page data
  const currentDatacs = await getViewerData(getViewerID());
  csDataObj.hover = currentDatacs?.[`${csPrefix}_hover`] || 0;
  csDataObj.click = currentDatacs?.[`${csPrefix}_click`] || 0;
  csDataObj.time = currentDatacs?.[`${csPrefix}_sensor_timer`] || 0;

  console.log(
    `Case Studies - Hovers: ${csDataObj.hover}, Clicks: ${csDataObj.click}, Time: ${csDataObj.time}`
  );
}

// Fetch data for the Portfolio page
async function pfData() {
  const pfPrefix = "portfolio"; // Prefix for portfolio page data
  const currentDatapf = await getViewerData(getViewerID());
  pfDataObj.hover = currentDatapf?.[`${pfPrefix}_hover`] || 0;
  pfDataObj.click = currentDatapf?.[`${pfPrefix}_click`] || 0;
  pfDataObj.time = currentDatapf?.[`${pfPrefix}_sensor_timer`] || 0;

  console.log(
    `Portfolio - Hovers: ${pfDataObj.hover}, Clicks: ${pfDataObj.click}, Time: ${pfDataObj.time}`
  );
}

// Compare the data from both pages
async function compareData() {
  // Fetch the data first
  await csData(); // Fetch case studies data
  await pfData(); // Fetch portfolio data

  // Compare the total number of hovers, clicks, or time between pages
  console.log("Comparing Case Studies vs Portfolio:");

  // Comparison logic based on hovers, clicks, or time
  if (pfDataObj.hover > csDataObj.hover) {
    console.log("AI assumes Portfolio has more views (hover count).");
  } else if (pfDataObj.hover < csDataObj.hover) {
    console.log("AI assumes Case Studies has more views (hover count).");
  } else {
    console.log("Both pages have the same hover count.");
  }

  if (pfDataObj.click > csDataObj.click) {
    console.log("AI assumes Portfolio has more clicks.");
  } else if (pfDataObj.click < csDataObj.click) {
    console.log("AI assumes Case Studies has more clicks.");
  } else {
    console.log("Both pages have the same click count.");
  }

  if (pfDataObj.time > csDataObj.time) {
    console.log("AI assumes Portfolio has more time spent.");
  } else if (pfDataObj.time < csDataObj.time) {
    console.log("AI assumes Case Studies has more time spent.");
  } else {
    console.log("Both pages have the same time spent.");
  }
}

// Call compareData() periodically or at specific points to analyze the data
// setInterval(compareData, 10000); // Compare every 10 seconds (if desired)
