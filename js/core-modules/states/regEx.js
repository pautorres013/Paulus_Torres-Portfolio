export class English {
  constructor() {
    this.self_pronoun = ["Core AI", "I", "My presence"];
    this.self_preposition = ["am", "is", "feels"];
    this.preposition = ["here", "aware", "present"];
    this.observation_verbs = ["observe", "sense"];
    this.interjection_noun = ["Hello", "Hi"];
  }

  getRandomElement(array) {
    return array[Math.floor(Math.random() * array.length)];
  }

  generatePattern() {
    let tempPattern = ["...", ",,,,"];

    let selectedPronoun = this.getRandomElement(this.self_pronoun);

    if (selectedPronoun === "I") {
      tempPattern = [
        this.getRandomElement(this.interjection_noun),
        selectedPronoun,
        "am",
        this.getRandomElement(this.preposition),
      ];
    } else if (selectedPronoun === "Core AI") {
      tempPattern = [
        this.getRandomElement(this.interjection_noun),
        selectedPronoun,
        "is",
        this.getRandomElement(this.preposition),
      ];
    } else {
      tempPattern = [
        selectedPronoun,
        this.getRandomElement(this.observation_verbs),
        this.getRandomElement(["you", "time", "space"]),
      ];
    }

    console.log(this.validateSentence(tempPattern.join(" ")));
    return tempPattern.join(" ");
  }

  validateSentence(sentence) {
    if (typeof sentence !== "string") return false;
    const regex =
      /^(Hello|Hi)\s(I\sam\shere|Core\sAI\sis\saware|My\spresence\sis\spresent)\.$|^(I|Core\sAI)\s(observe|sense)\s(you|time|space)\.$/i;
    return regex.test(sentence.trim());
  }
}

// Example Usage
const english = new English();
const pattern = english.generatePattern(true, true);
console.log("Generated Pattern:", pattern);
