const prizes = ["₹10", "₹50", "₹100", "₹0", "Better Luck Next Time", "Better Luck Next Time", "Better Luck Next Time"];
const spinButton = document.getElementById('spinButton');
const withdrawButton = document.getElementById('withdrawButton');
const result = document.getElementById('result');
const balanceDisplay = document.getElementById('balance');
const joinSection = document.getElementById('join-section');

let balance = parseInt(localStorage.getItem('balance')) || 0;
let firstSpin = localStorage.getItem('firstSpin') || false;
let joinedTelegram = false; // Update this after Telegram integration

balanceDisplay.textContent = balance;

// Check Telegram Join Status
function checkTelegramJoin() {
    // Replace this with actual Telegram join verification logic
    setTimeout(() => {
        joinedTelegram = true; // Simulate Telegram join
        if (joinedTelegram) {
            joinSection.style.display = 'none';
            spinButton.disabled = false;
        }
    }, 1000);
}

// Spin Logic
spinButton.addEventListener('click', () => {
    if (!firstSpin) {
        firstSpin = true;
        localStorage.setItem('firstSpin', true);
        balance += 10;
        updateBalance();
        result.textContent = "You won ₹10 on your first spin!";
        return;
    }

    const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
    if (randomPrize.startsWith("₹")) {
        balance += parseInt(randomPrize.slice(1));
        updateBalance();
    }
    result.textContent = `You won: ${randomPrize}`;
});

// Withdraw Logic
withdrawButton.addEventListener('click', () => {
    if (balance >= 50) {
        alert(`Withdrawal Successful! ₹${balance} has been sent to your account.`);
        balance = 0;
        updateBalance();
    } else {
        alert("Minimum ₹50 required to withdraw.");
    }
});

// Update Balance
function updateBalance() {
    balanceDisplay.textContent = balance;
    localStorage.setItem('balance', balance);
    withdrawButton.disabled = balance < 50;
}

// Initialize
checkTelegramJoin();
updateBalance();
