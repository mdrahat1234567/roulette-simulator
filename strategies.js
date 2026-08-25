// Betting Strategies Module

class BettingStrategies {
    constructor() {
        this.strategies = {
            martingale: {
                name: 'Martingale System',
                description: 'Double your bet after every loss until you win, then return to initial bet.',
                rules: [
                    'Start with a base unit bet',
                    'Double the bet after every loss',
                    'Return to base unit after a win',
                    'Requires significant bankroll'
                ],
                pros: ['Simple to understand', 'Recovers all losses plus one unit profit when win occurs'],
                cons: ['Requires large bankroll', 'Betting limits may prevent continuation', 'High risk of ruin'],
                mathFormula: 'Bet(n) = Base × 2^(n-1) where n is the loss count',
                riskLevel: 'HIGH',
                recommendedBankroll: 500
            },
            fibonacci: {
                name: 'Fibonacci System',
                description: 'Follow the Fibonacci sequence (1,1,2,3,5,8,13...) for bet progression.',
                rules: [
                    'Start at first number in sequence',
                    'After loss, move to next number',
                    'After win, move back two numbers',
                    'Continue until completing the sequence'
                ],
                pros: ['Lower bet progression than Martingale', 'Mathematically elegant', 'Lower risk than Martingale'],
                cons: ['Complex to track', 'Still requires significant bankroll', 'Long recovery period'],
                mathFormula: 'F(n) = F(n-1) + F(n-2)',
                riskLevel: 'MEDIUM',
                recommendedBankroll: 300
            },
            dalembert: {
                name: "D'Alembert System",
                description: 'Increase bet by one unit after loss, decrease by one unit after win.',
                rules: [
                    'Start with base unit',
                    'After loss, add 1 unit to next bet',
                    'After win, subtract 1 unit from next bet',
                    'Never go below minimum bet'
                ],
                pros: ['Gentle progression', 'Lower bankroll requirement', 'Lower maximum bet'],
                cons: ['Slow profit accumulation', 'Still negative expected value', 'Requires discipline'],
                mathFormula: 'Bet(n+1) = Bet(n) ± 1 unit',
                riskLevel: 'MEDIUM',
                recommendedBankroll: 200
            },
            labouchere: {
                name: 'Labouchere System',
                description: 'Write a sequence of numbers. Bet the sum of first and last. Cross off winning bets.',
                rules: [
                    'Write a sequence (e.g., 1,2,3,4,5)',
                    'Bet sum of first and last number',
                    'If win, cross off both numbers',
                    'If lose, add bet amount to end of sequence',
                    'Continue until all numbers crossed off'
                ],
                pros: ['Can achieve profit with moderate wins', 'Customizable', 'Interesting mathematical structure'],
                cons: ['Complex to track', 'Can require large bets', 'House edge always present'],
                mathFormula: 'Bet = First + Last (custom sequence)',
                riskLevel: 'MEDIUM-HIGH',
                recommendedBankroll: 400
            },
            paroli: {
                name: 'Paroli System',
                description: 'Double your bet after each win (positive progression). Reset after losses.',
                rules: [
                    'Start with base unit',
                    'After win, double the bet (up to 3 wins max)',
                    'After loss, return to base unit',
                    'Set a win target (usually 3 consecutive wins)'
                ],
                pros: ['Uses winnings to bet', 'Lower loss potential', 'Psychologically positive'],
                cons: ['Profits limited', 'Requires luck to work well', 'Still subject to house edge'],
                mathFormula: 'Bet(n+1) = Bet(n) × 2 (if win)',
                riskLevel: 'LOW-MEDIUM',
                recommendedBankroll: 100
            },
            flat: {
                name: 'Flat Betting',
                description: 'Bet the same amount on every spin. No progression system.',
                rules: [
                    'Choose a fixed bet amount',
                    'Bet the same amount every time',
                    'No changes based on wins or losses',
                    'Simple and straightforward'
                ],
                pros: ['Simple to manage', 'No stress from progressions', 'Bankroll lasts longer'],
                cons: ['No strategy to overcome house edge', 'Slow money accumulation', 'Losses accumulate steadily'],
                mathFormula: 'Bet(n) = Constant',
                riskLevel: 'LOW',
                recommendedBankroll: 50
            }
        };
        
        this.currentStrategy = null;
        this.simulationChart = null;
        this.init();
    }

    init() {
        this.attachEventListeners();
        this.setupStrategyCards();
    }

    attachEventListeners() {
        document.querySelectorAll('.strategy-card').forEach(card => {
            card.addEventListener('click', () => this.displayStrategyDetails(card.dataset.strategy));
        });
    }

    setupStrategyCards() {
        document.querySelectorAll('.strategy-card').forEach(card => {
            card.addEventListener('click', function() {
                document.querySelectorAll('.strategy-card').forEach(c => c.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }

    displayStrategyDetails(strategyKey) {
        const strategy = this.strategies[strategyKey];
        this.currentStrategy = strategyKey;

        let html = `
            <h3>${strategy.name}</h3>
            <p class="strategy-description">${strategy.description}</p>
            
            <div class="strategy-info-grid">
                <div class="info-section">
                    <h4>📄 Rules</h4>
                    <ul>
                        ${strategy.rules.map(rule => `<li>${rule}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="info-section">
                    <h4>✅ Pros</h4>
                    <ul>
                        ${strategy.pros.map(pro => `<li>${pro}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="info-section">
                    <h4>❌ Cons</h4>
                    <ul>
                        ${strategy.cons.map(con => `<li>${con}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="info-section">
                    <h4>📑 Mathematical Formula</h4>
                    <code>${strategy.mathFormula}</code>
                    <p><strong>Risk Level:</strong> ${strategy.riskLevel}</p>
                    <p><strong>Recommended Bankroll:</strong> ${strategy.recommendedBankroll} units</p>
                </div>
            </div>
        `;

        document.getElementById('strategyInfo').innerHTML = html;
    }

    runSimulation() {
        const initialBet = parseInt(document.getElementById('simInitialBet').value);
        const numSpins = parseInt(document.getElementById('simSpins').value);
        const winProb = parseFloat(document.getElementById('simWinProb').value) / 100;

        if (!this.currentStrategy) {
            alert('Please select a strategy first!');
            return;
        }

        const results = this.simulateStrategy(this.currentStrategy, initialBet, numSpins, winProb);
        this.displaySimulationResults(results);
    }

    simulateStrategy(strategyKey, initialBet, numSpins, winProb) {
        let balance = 1000;
        let currentBet = initialBet;
        let totalWins = 0;
        let totalLosses = 0;
        let maxBet = initialBet;
        let balanceHistory = [balance];
        let lossStreak = 0;
        let fibIndex = 0;
        const fibSequence = [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89];

        for (let i = 0; i < numSpins; i++) {
            const isWin = Math.random() < winProb;
            const payoutMultiplier = 2; // 1:1 payout (e.g., Red/Black)

            if (isWin) {
                balance += currentBet * payoutMultiplier;
                totalWins++;
                lossStreak = 0;

                // Update bet for next spin based on strategy
                switch(strategyKey) {
                    case 'martingale':
                        currentBet = initialBet;
                        break;
                    case 'fibonacci':
                        fibIndex = Math.max(0, fibIndex - 2);
                        currentBet = fibSequence[fibIndex] * initialBet;
                        break;
                    case 'dalembert':
                        currentBet = Math.max(initialBet, currentBet - initialBet);
                        break;
                    case 'paroli':
                        // Reset after 3 wins or keep doubling
                        if (lossStreak === 0) currentBet = initialBet;
                        break;
                    case 'labouchere':
                    case 'flat':
                        currentBet = initialBet;
                        break;
                }
            } else {
                balance -= currentBet;
                totalLosses++;
                lossStreak++;

                // Update bet for next spin based on strategy
                switch(strategyKey) {
                    case 'martingale':
                        currentBet *= 2;
                        break;
                    case 'fibonacci':
                        fibIndex = Math.min(fibSequence.length - 1, fibIndex + 1);
                        currentBet = fibSequence[fibIndex] * initialBet;
                        break;
                    case 'dalembert':
                        currentBet += initialBet;
                        break;
                    case 'paroli':
                        currentBet = initialBet;
                        break;
                    case 'labouchere':
                    case 'flat':
                        currentBet = initialBet;
                        break;
                }
            }

            if (balance <= 0) break; // Bankrupt
            maxBet = Math.max(maxBet, currentBet);
            balanceHistory.push(balance);
        }

        const roi = ((balance - 1000) / 1000) * 100;

        return {
            finalBalance: balance,
            totalWins: totalWins,
            totalLosses: totalLosses,
            winRate: ((totalWins / (totalWins + totalLosses)) * 100).toFixed(1),
            maxBet: maxBet,
            roi: roi.toFixed(2),
            balanceHistory: balanceHistory
        };
    }

    displaySimulationResults(results) {
        document.getElementById('finalBalance').textContent = results.finalBalance.toFixed(2);
        document.getElementById('totalWinsResult').textContent = results.totalWins;
        document.getElementById('totalLossesResult').textContent = results.totalLosses;
        document.getElementById('winRateResult').textContent = results.winRate + '%';
        document.getElementById('maxBetResult').textContent = results.maxBet.toFixed(2);
        document.getElementById('roiResult').textContent = results.roi + '%';

        document.getElementById('simulationResults').classList.remove('hidden');

        // Draw chart
        this.drawSimulationChart(results.balanceHistory);
    }

    drawSimulationChart(balanceHistory) {
        const canvas = document.getElementById('simulationChart');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        const width = canvas.width = canvas.offsetWidth;
        const height = canvas.height = 300;

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, width, height);

        if (balanceHistory.length < 2) return;

        const minBalance = Math.min(...balanceHistory);
        const maxBalance = Math.max(...balanceHistory);
        const range = maxBalance - minBalance || 1;

        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.beginPath();

        for (let i = 0; i < balanceHistory.length; i++) {
            const x = (i / (balanceHistory.length - 1)) * (width - 40) + 20;
            const y = height - ((balanceHistory[i] - minBalance) / range) * (height - 40) - 20;

            if (i === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }

        ctx.stroke();

        // Draw axes
        ctx.strokeStyle = '#ccc';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(20, 20);
        ctx.lineTo(20, height - 20);
        ctx.lineTo(width - 20, height - 20);
        ctx.stroke();
    }
}

// Expected Value Calculator
function calculateEV() {
    const betType = document.getElementById('evBetType').value;
    const betAmount = parseFloat(document.getElementById('evBetAmount').value);
    
    let probability, payout, ev;

    switch(betType) {
        case 'number':
            probability = 1 / 37;
            payout = 36;
            break;
        case 'color':
            probability = 18 / 37;
            payout = 1;
            break;
        case 'range':
            probability = 12 / 37;
            payout = 2;
            break;
    }

    ev = (probability * (betAmount * payout)) - ((1 - probability) * betAmount);
    const evPercent = (ev / betAmount) * 100;

    const resultHTML = `
        <div class="ev-details">
            <p><strong>Bet Type:</strong> ${betType.toUpperCase()}</p>
            <p><strong>Bet Amount:</strong> ${betAmount}</p>
            <p><strong>Probability of Winning:</strong> ${(probability * 100).toFixed(2)}%</p>
            <p><strong>Payout Multiplier:</strong> ${payout}:1</p>
            <hr>
            <p><strong>Expected Value:</strong> ${ev.toFixed(2)} per bet</p>
            <p><strong>Expected Value (%):</strong> ${evPercent.toFixed(2)}% ${evPercent < 0 ? '<span class="text-danger">(Negative)</span>' : '<span class="text-success">(Positive)</span>'}</p>
            <p style="margin-top: 10px; font-size: 0.9em; color: #666;">
                This means over 100 bets of ${betAmount}, you can expect to lose approximately ${Math.abs(ev * 100).toFixed(2)} units on average.
            </p>
        </div>
    `;

    document.getElementById('evResult').innerHTML = resultHTML;
}

// Initialize when DOM is ready
if (typeof RouletteSimulator !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        window.bettingStrategies = new BettingStrategies();
    });
}