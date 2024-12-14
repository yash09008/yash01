const prizes = ["₹10", "₹50", "₹100", "₹0", "Better Luck Next Time", "Better Luck Next Time", "Better Luck Next Time"];
const wheel = document.getElementById('wheel');
const spinButton = document.getElementById('spinButton');
const result = document.getElementById('result');
const balanceDisplay = document.getElementById('balance');
const withdrawButton = document.getElementById('withdrawButton');

let balance = parseInt(localStorage.getItem('balance')) || 0;
let firstSpin = localStorage.getItem('firstSpin') || false;

balanceDisplay.textContent = balance;

spinButton.addEventListener('click', () => {
    if (!firstSpin) {
        firstSpin = true;
        localStorage.setItem('firstSpin', true);
        balance += 10;
        updateBalance();
        result.textContent = "You won: ₹10 on your first spin! 🎉";
        return;
    }

    const randomDeg = Math.floor(Math.random() * 360);
    const prizeIndex = Math.floor(randomDeg / (360 / prizes.length));
    const selectedPrize = prizes[prizeIndex];

    wheel.style.transform = `rotate(${randomDeg + 720}deg)`;

    setTimeout(() => {
        if (selectedPrize.startsWith("₹")) {
            const prizeAmount = parseInt(selectedPrize.slice(1));
            balance += prizeAmount;
            updateBalance();
        }
        result.textContent = `You won: ${selectedPrize}! 🎉`;
    }, 3000);
});

withdrawButton.addEventListener('click', () => {
    if (balance >= 50) {
        alert(`Withdrawal Successful! ₹${balance} has been sent to your account.`);
        balance = 0;
        updateBalance();
    } else {
        alert("Minimum balance of ₹50 is required for withdrawal.");
    }
});

function updateBalance() {
    balanceDisplay.textContent = balance;
    localStorage.setItem('balance', balance);
    withdrawButton.disabled = balance < 50;
}
