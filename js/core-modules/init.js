import { authID } from "./auth.js";
import { verifyViewer, getViewerID } from "./firestore_services.js"; // Import the functions you need from the SDKs you need
import { initializeSensors } from "./sensors.js";
import { logicInit } from "./logic.js";

class CoreAI {

  init() {
    /*this.generateViewer();
    initializeSensors();*/
  }
  generateViewer() {
    if(document.title == "Home"){
      verifyViewer(true);
    }else{
      verifyViewer(false);
    }
  }
}

// Initialize CORE AI
const core = new CoreAI();
core.init();