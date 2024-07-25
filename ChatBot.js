const chatbox = document.getElementById('chatlog');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');
const clearBtn = document.getElementById('clearBtn');

// Sample Q&A data
const qaData = [
    { question: "How can I reset my password?", answer: "You can reset your password by clicking on 'Forgot Password' on the login page." },
    { question: "What is the return policy?", answer: "Our return policy allows returns within 30 days of purchase with a valid receipt." },
    { question: "How do I track my order?", answer: "You can track your order using the tracking number provided in your shipping confirmation email." },
    { question: "How do I contact customer service?", answer: "You can contact our customer service by calling 123-456-7890 or emailing support@company.com." },
    { question: "What are your business hours?", answer: "Our business hours are Monday to Friday, 9 AM to 5 PM." },
    { question: "Do you offer international shipping?", answer: "Yes, we offer international shipping to selected countries. Please check our shipping policy for more details." },
    { question: "How can I update my account information?", answer: "You can update your account information by logging into your account and going to the account settings page." },
    { question: "What payment methods do you accept?", answer: "We accept credit/debit cards, PayPal, and other major payment methods." },
    { question: "Can I cancel my order?", answer: "Yes, you can cancel your order within 24 hours of placing it. Please contact our customer service for assistance." },
    { question: "How do I apply a discount code?", answer: "You can apply a discount code at checkout in the 'Promo Code' field." }
];

sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') handleUserInput();
});
clearBtn.addEventListener('click', clearChat);

function handleUserInput() {
    const userQuestion = userInput.value;
    if (userQuestion.trim() === "") return;

    appendToChatLog('user-message', userQuestion);

    const bestMatch = findBestMatch(userQuestion);
    if (bestMatch) {
        appendToChatLog('bot-message', bestMatch.answer);
    } else {
        appendToChatLog('bot-message', 'No matching answer found. Do you want to start a live chat?');
        // Simulate sending an email for live chat (In a real application, this would be handled by server-side code)
        sendLiveChatEmail(userQuestion);
    }

    userInput.value = '';
}

function appendToChatLog(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.classList.add('message', sender);
    
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'X';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
        chatbox.removeChild(messageElement);
    });
    
    messageElement.appendChild(deleteBtn);
    chatbox.appendChild(messageElement);
    chatbox.scrollTop = chatbox.scrollHeight;
}

function findBestMatch(userQuestion) {
    let bestMatch = null;
    let highestScore = 0;

    qaData.forEach(qa => {
        const score = calculateSimilarity(userQuestion.toLowerCase(), qa.question.toLowerCase());
        if (score > highestScore && score >= 0.8) {
            highestScore = score;
            bestMatch = qa;
        }
    });

    return bestMatch;
}

function calculateSimilarity(str1, str2) {
    const words1 = str1.split(' ');
    const words2 = str2.split(' ');
    const commonWords = words1.filter(word => words2.includes(word));
    return commonWords.length / Math.max(words1.length, words2.length);
}

function sendLiveChatEmail(userQuestion) {
    // In a real application, replace this with an AJAX request to the server
    console.log(`Sending email to company for live chat: ${userQuestion}`);
    setTimeout(() => {
        appendToChatLog('bot-message', 'Please check your email for a live chat link.');
    }, 1000);
}

function clearChat() {
    chatbox.innerHTML = '';
}
