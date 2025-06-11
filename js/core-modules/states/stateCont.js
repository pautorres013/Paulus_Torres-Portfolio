import { English } from "./regEx.js";

const eng = new English();

class Controller {
  constructor() {
    this.chat = document.getElementById("chat");
    this.regexPattern = "";
  }

  initialize() {
    this.greetUser();
    this.startAwarenessMode();
  }

  greetUser() {
    this.chat.textContent = eng.generatePattern();
  }

  startAwarenessMode() {
    setInterval(() => {
      const awarenessSentence = eng.generatePattern(
        this.hasGreeted,
        Math.random() > 0.5
      );
      this.displaySentence(awarenessSentence);
    }, 8000); // Change interval timing as needed
  }

  displaySentence(sentence) {
    this.chat.textContent = `${sentence}`;
  }
}

const cont = new Controller();
cont.initialize();
