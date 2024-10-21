<!-- Continuation of the body -->
        <!-- Prestige Section -->
        <div class="prestige-section" id="prestige-section" style="display: none;">
            <h2>Prestige Mode</h2>
            <p>Prestige and earn permanent coin multipliers!</p>
            <p>Prestige Bonus: <span id="prestige-bonus">x2</span></p>
            <button onclick="prestige()">Prestige Now</button>
        </div>

    </div>

    <script>
        let coins = 0;
        let coinsPerTap = 1;
        let upgradeCost = 100;
        let level = 1;
        let frenzyMode = false;
        let prestigeLevel = 0;
        let prestigeBonus = 1;

        // Coin earning function
        function earnCoins() {
            coins += coinsPerTap * prestigeBonus;
            document.getElementById('coin-counter').innerText = `Coins: ${coins}`;

            // Frenzy Mode Unlock at 500 coins
            if (coins >= 500 && !frenzyMode) {
                frenzyMode = true;
                alert("Frenzy Mode Unlocked! Earn 3x coins for the next minute.");
                coinsPerTap *= 3;
                setTimeout(() => {
                    frenzyMode = false;
                    coinsPerTap /= 3;
                }, 60000);
            }

            // Prestige Mode Unlock at level 10
            if (level >= 10 && prestigeLevel === 0) {
                document.getElementById('prestige-section').style.display = 'block';
            }
        }

        // Upgrade Elon Musk and increase coin production
        function upgrade() {
            if (coins >= upgradeCost) {
                coins -= upgradeCost;
                coinsPerTap *= 2;
                upgradeCost *= 2;
                level++;

                // Update visuals
                document.getElementById('coin-counter').innerText = `Coins: ${coins}`;
                document.getElementById('coins-per-tap').innerText = coinsPerTap;
                document.getElementById('upgrade-cost').innerText = upgradeCost;

                // Change Elon image and background as per level
                document.getElementById('elon-img').src = `elon-level${level}.png`;
                document.body.style.backgroundImage = `url('background-level${level}.jpg')`;
            } else {
                alert("Not enough coins!");
            }
        }

        // Prestige function
        function prestige() {
            if (level >= 10) {
                prestigeLevel++;
                prestigeBonus *= 2;
                coins = 0;
                level = 1;
                coinsPerTap = 1;
                upgradeCost = 100;
                frenzyMode = false;

                // Update visuals for prestige
                document.getElementById('prestige-bonus').innerText = `x${prestigeBonus}`;
                document.getElementById('coin-counter').innerText = `Coins: ${coins}`;
                document.getElementById('coins-per-tap').innerText = coinsPerTap;
                document.getElementById('upgrade-cost').innerText = upgradeCost;
                document.getElementById('elon-img').src = 'elon-level1.png';
                document.body.style.backgroundImage = "url('background-level1.jpg')";
                alert(`Prestige Successful! Your coin production is now multiplied by ${prestigeBonus}.`);
            }
        }

        function openUpgrade() {
            document.getElementById('upgrade-section').style.display = 'block';
            document.getElementById('daily-task').style.display = 'none';
            document.getElementById('referral-section').style.display = 'none';
            document.getElementById('leaderboard-section').style.display = 'none';
            document.getElementById('prestige-section').style.display = 'none';
        }

        function openTasks() {
            document.getElementById('daily-task').style.display = 'block';
            document.getElementById('upgrade-section').style.display = 'none';
            document.getElementById('referral-section').style.display = 'none';
            document.getElementById('leaderboard-section').style.display = 'none';
            document.getElementById('prestige-section').style.display = 'none';
        }

        function openReferral() {
            document.getElementById('referral-section').style.display = 'block';
            document.getElementById('daily-task').style.display = 'none';
            document.getElementById('upgrade-section').style.display = 'none';
            document.getElementById('leaderboard-section').style.display = 'none';
            document.getElementById('prestige-section').style.display = 'none';
        }

        function openLeaderboard() {
            document.getElementById('leaderboard-section').style.display = 'block';
            document.getElementById('daily-task').style.display = 'none';
            document.getElementById('upgrade-section').style.display = 'none';
            document.getElementById('referral-section').style.display = 'none';
            document.getElementById('prestige-section').style.display = 'none';
        }

    </script>
</body>
</html>
