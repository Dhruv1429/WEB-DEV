function generateGreeting() {
    // 1. Get elements from HTML
    const nameInput = document.getElementById('userName').value;
    const moodInput = document.getElementById('userMood').value;
    const resultBox = document.getElementById('greeting-result');

    // 2. Validation: Ensure fields aren't empty
    if (nameInput.trim() === "" || moodInput === "") {
        alert("Please enter both your name and mood!");
        return;
    }

    // 3. Logic: Determine Time of Day
    const hour = new Date().getHours();
    let timeGreeting = "";

    if (hour < 12) {
        timeGreeting = "Good Morning";
    } else if (hour < 18) {
        timeGreeting = "Good Afternoon";
    } else {
        timeGreeting = "Good Evening";
    }

    // 4. Logic: Determine Message based on Mood
    let moodMessage = "";
    let moodClass = "";

    switch (moodInput) {
        case "happy":
            moodMessage = "Glad to see you smiling! Keep that vibe going! 🌟";
            moodClass = "mood-happy";
            break;
        case "sad":
            moodMessage = "It's okay to have down days. Take it easy on yourself. 💙";
            moodClass = "mood-sad";
            break;
        case "energetic":
            moodMessage = "Woah! You're on fire today! Go crush your goals! 🚀";
            moodClass = "mood-energetic";
            break;
        case "tired":
            moodMessage = "You've worked hard. Don't forget to rest and recharge. ☕";
            moodClass = "mood-tired";
            break;
        default:
            moodMessage = "Have a wonderful day!";
    }

    // 5. Construct final message
    const finalMessage = `${timeGreeting}, ${nameInput}! ${moodMessage}`;

    // 6. Update DOM (Show result)
    resultBox.textContent = finalMessage;
    
    // Reset classes to handle fresh animation restart
    resultBox.className = ''; 
    void resultBox.offsetWidth; // Trigger reflow (Forces animation to restart)
    
    // Add new classes
    resultBox.classList.add('animate-pop');
    resultBox.classList.add(moodClass);
}