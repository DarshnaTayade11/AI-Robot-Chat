const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");
const micBtn = document.getElementById("micBtn");
const userInput = document.getElementById("userInput");

// Simple AI knowledge
function botReply(text) {
  text = text.toLowerCase();

  if (text.includes("html")) return `
HTML is used to structure a webpage.
Example: <img src="image.jpg"> adds an image.
Tags like <h1> are for headings.
`;

  if (text.includes("css")) return `
CSS is used for styling — colors, fonts, layout.
Example: color: purple;
`;

  if (text.includes("javascript") || text.includes("js")) return `
JavaScript makes websites interactive.
Example: button clicks, forms, animations, chat apps.
`;

  if (text.includes("image"))
    return `To add image in HTML: <img src="photo.jpg" alt="photo">`;

  if (text.includes("heading"))
    return `Heading example: <h1>This is a heading</h1>`;

  return "I’m still learning — but I’ll try my best to answer!";
}

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.className = "message " + sender;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
}

sendBtn.onclick = () => {
  const text = userInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  userInput.value = "";

  setTimeout(() => {
    addMessage(botReply(text), "bot");
  }, 500);
};

// Voice input
let recognition;
if ("webkitSpeechRecognition" in window) {
  recognition = new webkitSpeechRecognition();
  recognition.lang = "en-US";

  micBtn.onclick = () => {
    recognition.start();
    micBtn.innerText = "🎙️ listening...";
  };

  recognition.onresult = (e) => {
    micBtn.innerText = "🎤";
    userInput.value = e.results[0][0].transcript;
  };
} else {
  micBtn.disabled = true;
  micBtn.innerText = "🚫";
}
