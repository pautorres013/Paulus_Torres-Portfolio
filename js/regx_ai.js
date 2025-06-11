async function getResponse(userInput) {
    // Load JSON knowledge base
    const response = await fetch("./json/knowledge.json");
    const data = await response.json();
    
    // Convert input to lowercase and check if there's a matching response
    const lowerInput = userInput.toLowerCase();
    
    for (const key in data) {
        if (lowerInput.includes(key)) {
            return data[key]; // Return matched response
        }
    }
    return "Sorry, I don't understand.";
}

// Example usage
const userMessage = "hello";
getResponse(userMessage).then(console.log); // Output: "Hi there! How can I help you?"

document.getElementsByClassName("response").innerHTML = getResponse(userMessage).then(console.log);