let telegramJoined = false;
let spinCount = 0;
let balance = 0;
let referrals = 0;

// Telegram Join Check
document.addEventListener("DOMContentLoaded", () => {
    if (!telegramJoined) {
        document.getElementById("join-telegram").style.display = "block";
    }
});

document.querySelector(".btn").addEventListener("click", () => {
    telegramJoined = true;
    document.getElementById("join-telegram").style.display = "none";
    document.getElementById("game-container").style.display = "block";
});

// Spin Logic
document.getElementById("spin-btn").addEventListener("click", () => {
    if (spinCount >= 5 && referrals < 5) {
        alert("Refer 5 friends to unlock more spins!");
        return;
    }

    let outcomes = ["Bad Luck", "Spin Again", "₹10", "₹30", "₹50", "Bad Luck"];
    let result = outcomes[Math.floor(Math.random() * outcomes.length)];

    document.getElementById("result").innerText = `Result: ${result}`;
    spinCount++;

    if (result.includes("₹")) {
        let amount = parseInt(result.replace("₹", ""));
        balance += amount;

        if (balance > 150) balance = 150; // Cap at ₹150
    }
});


// Withdraw Logic
document.getElementById("withdraw-btn").addEventListener("click", () => {
    if (balance >= 150 && referrals >= 5) {
        alert("Withdrawal Successful!");
    } else {
        alert("You need ₹150 and 5 referrals to withdraw!");
    }
});
