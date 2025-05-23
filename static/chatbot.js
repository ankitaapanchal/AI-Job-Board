function toggleChatbox() {
    const chatbox = document.getElementById('chatbox');
    chatbox.style.display = (chatbox.style.display === 'none' || chatbox.style.display === '') ? 'flex' : 'none';

    const log = document.getElementById('chat-log');
    log.innerHTML += `<div class="chat-bubble bot"><strong>🤖 </strong> Hi there! How can I help you today?</div>`; 
}



function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    const log = document.getElementById('chat-log');

    if (!message) return;

    log.innerHTML += `<div class="chat-bubble user"><strong>You:</strong> ${message}</div>`;
    input.value = "";
    log.scrollTop = log.scrollHeight;

    // Send to backend
    fetch("/chatbot/", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": getCSRFToken()
        },
        body: JSON.stringify({ message: message })
    })
    .then(res => res.json())
    .then(data => {
        log.innerHTML += `<div class="chat-bubble bot"><strong>🤖 </strong> ${data.response}</div>`;
        log.scrollTop = log.scrollHeight;
    })
    .catch(error => {
        log.innerHTML += `<div class="chat-bubble bot"><strong>🤖 </strong> Sorry, something went wrong.</div>`;
        
        log.scrollTop = log.scrollHeight;
    });
}

function getCSRFToken() {
    const name = "csrftoken=";
    const decodedCookies = decodeURIComponent(document.cookie);
    const cookies = decodedCookies.split(';');
    for (let i = 0; i < cookies.length; i++) {
        let c = cookies[i].trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
