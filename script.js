const wheelCanvas = document.getElementById('wheel');
const spinButton = document.getElementById('spin-btn');
const resultText = document.getElementById('result-text');
const ctx = wheelCanvas.getContext('2d');

const prizes = ["Bad Luck", "₹10", "Spin Again", "₹30", "₹50", "₹100"];
const colors = ["#FFDDC1", "#FFABAB", "#FFC3A0", "#D5AAFF", "#85E3FF", "#B9FBC0"];
let startAngle = 0;
const arc = Math.PI / (prizes.length / 2);
let spinTimeout = null;

// Draw Wheel
function drawWheel() {
    for (let i = 0; i < prizes.length; i++) {
        const angle = startAngle + i * arc;
        ctx.beginPath();
        ctx.arc(200, 200, 200, angle, angle + arc, false);
        ctx.lineTo(200, 200);
        ctx.fillStyle = colors[i];
        ctx.fill();
        ctx.save();
        ctx.fillStyle = "#333";
        ctx.translate(200 + Math.cos(angle + arc / 2) * 150, 200 + Math.sin(angle + arc / 2) * 150);
        ctx.rotate(angle + arc / 2 + Math.PI / 2);
        ctx.fillText(prizes[i], -ctx.measureText(prizes[i]).width / 2, 0);
        ctx.restore();
    }
}

// Spin Wheel
function spinWheel() {
    const spins = Math.floor(Math.random() * 10) + 10;
    let spinAngle = 0;
    let currentSpin = 0;

    function rotateWheel() {
        spinAngle += Math.PI / 12;
        startAngle += spinAngle / 100;
        drawWheel();
        currentSpin++;

        if (currentSpin < spins) {
            spinTimeout = requestAnimationFrame(rotateWheel);
        } else {
            const prizeIndex = Math.floor(((startAngle % (2 * Math.PI)) / arc) + prizes.length) % prizes.length;
            resultText.textContent = `🎉 You won: ${prizes[prizeIndex]} 🎉`;
        }
    }
    rotateWheel();
}

spinButton.addEventListener('click', () => {
    resultText.textContent = "Spinning...";
    cancelAnimationFrame(spinTimeout);
    spinWheel();
});

// Button Logic
document.getElementById('tasks-btn').addEventListener('click', () => {
    alert("Complete tasks to earn more spins!");
});

document.getElementById('refer-btn').addEventListener('click', () => {
    alert("Refer friends to earn extra rewards!");
});

document.getElementById('top-rank-btn').addEventListener('click', () => {
    alert("Check the top invitation ranks!");
});

// Initialize Wheel
drawWheel();

