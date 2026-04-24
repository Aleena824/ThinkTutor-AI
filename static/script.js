const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");
const levelText = document.getElementById("level-text");
const levelDot = document.getElementById("level-dot");
const levelBarFill = document.getElementById("level-bar-fill");

userInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") sendMessage();
});

function addMessage(role, text) {
    const welcome = document.querySelector(".welcome-message");
    if (welcome) welcome.remove();

    const wrapper = document.createElement("div");
    wrapper.classList.add("message", role);

    const label = document.createElement("div");
    label.classList.add("message-label");
    label.textContent = role === "user" ? "You" : "ThinkTutor AI";

    const bubble = document.createElement("div");
    bubble.classList.add("message-bubble");
    bubble.textContent = text;

    wrapper.appendChild(label);
    wrapper.appendChild(bubble);
    chatBox.appendChild(wrapper);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showTyping() {
    const typing = document.createElement("div");
    typing.classList.add("message", "ai");
    typing.id = "typing-indicator";

    const label = document.createElement("div");
    label.classList.add("message-label");
    label.textContent = "ThinkTutor AI";

    const dots = document.createElement("div");
    dots.classList.add("typing");
    dots.innerHTML = "<span></span><span></span><span></span>";

    typing.appendChild(label);
    typing.appendChild(dots);
    chatBox.appendChild(typing);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function removeTyping() {
    const typing = document.getElementById("typing-indicator");
    if (typing) typing.remove();
}

function updateLevel(level) {
    levelDot.className = "level-dot";

    if (level === "Beginner") {
        levelText.textContent = "Beginner";
        levelDot.classList.add("beginner");
        levelBarFill.style.width = "33%";
    } else if (level === "Intermediate") {
        levelText.textContent = "Intermediate";
        levelDot.classList.add("intermediate");
        levelBarFill.style.width = "66%";
    } else if (level === "Advanced") {
        levelText.textContent = "Advanced";
        levelDot.classList.add("advanced");
        levelBarFill.style.width = "100%";
    }
}

function parseLevel(text) {
    const match = text.match(/LEVEL:\s*(Beginner|Intermediate|Advanced)/i);
    return match ? match[1] : null;
}

function cleanReply(text) {
    return text.replace(/LEVEL:\s*(Beginner|Intermediate|Advanced)/i, "").trim();
}

async function sendMessage() {
    const message = userInput.value.trim();
    if (!message) return;

    addMessage("user", message);
    userInput.value = "";
    sendBtn.disabled = true;
    showTyping();

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();
        removeTyping();

        const level = parseLevel(data.reply);
        const cleanedReply = cleanReply(data.reply);

        addMessage("ai", cleanedReply);

        if (level) updateLevel(level);

    } catch (error) {
        removeTyping();
        addMessage("ai", "Something went wrong. Please try again.");
    }

    sendBtn.disabled = false;
    userInput.focus();
}