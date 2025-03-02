
function showReflection() {
    let reflections = [
        "Pause and breathe deeply.",
        "What are you grateful for today?",
        "Let go of what you can't control.",
        "Celebrate small victories.",
        "Embrace the present moment."
    ];
    alert(reflections[Math.floor(Math.random() * reflections.length)]);
}

function displayTimeMessage() {
    let now = new Date().getHours();
    let message;
    if (now < 12) {
        message = "Good Morning! Start with positivity.";
    } else if (now < 18) {
        message = "Good Afternoon! Stay energized and focused.";
    } else {
        message = "Good Evening! Take time to unwind.";
    }
    alert(message);
}

function calculateSum() {
    let num1 = parseFloat(document.getElementById('num1').value) || 0;
    let num2 = parseFloat(document.getElementById('num2').value) || 0;
    document.getElementById('result').textContent = num1 + num2;
}

document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        this.style.backgroundColor = getRandomColor();
    });
});

function getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}
