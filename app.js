// Roulette Simulator Application
class RouletteSimulator {
    constructor() {
        this.balance = 1000;
        this.spinCount = 0;
        this.totalWins = 0;
        this.lastResult = null;
        this.currentBet = null;
        this.isSpinning = false;
        this.wheelNumbers = this.generateWheelNumbers();
        
        this.init();
    }

    init() {
        this.drawWheel();
        this.attachEventListeners();
        this.updateUI();
    }

    // Generate roulette wheel numbers (0-36 with colors)
    generateWheelNumbers() {
        const numbers = [];
        const redNumbers = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];
        
        for (let i = 0; i <= 36; i++) {
            let color;
            if (i === 0) {
                color = 'green';
            } else if (redNumbers.includes(i)) {
                color = 'red';
            } else {
                color = 'black';
            }
            numbers.push({ number: i, color: color });
        }
        return numbers;
    }

    // Draw roulette wheel
    drawWheel() {
        const svg = document.getElementById('wheelNumbers');
        svg.innerHTML = '';
        const centerX = 150;
        const centerY = 150;
        const radius = 130;
        const angleSlice = (360 / 37);

        this.wheelNumbers.forEach((num, index) => {
            const angle = (index * angleSlice - 90) * (Math.PI / 180);
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);

            // Draw colored segment
            const startAngle = ((index * angleSlice - 90) * Math.PI) / 180;
            const endAngle = (((index + 1) * angleSlice - 90) * Math.PI) / 180;
            
            const x1 = centerX + 120 * Math.cos(startAngle);
            const y1 = centerY + 120 * Math.sin(startAngle);
            const x2 = centerX + 120 * Math.cos(endAngle);
            const y2 = centerY + 120 * Math.sin(endAngle);

            const largeArc = angleSlice > 180 ? 1 : 0;
            const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
            
            const color = num.color === 'red' ? '#ef5350' : num.color === 'black' ? '#333' : '#4caf50';
            path.setAttribute('d', `M ${centerX} ${centerY} L ${x1} ${y1} A 120 120 0 ${largeArc} 1 ${x2} ${y2} Z`);
            path.setAttribute('fill', color);
            path.setAttribute('stroke', '#fff');
            path.setAttribute('stroke-width', '1');
            svg.appendChild(path);

            // Draw number text
            const text = document.createElementNS('http://www.w3.org/2000/svg', 'text');
            text.setAttribute('x', x);
            text.setAttribute('y', y);
            text.setAttribute('text-anchor', 'middle');
            text.setAttribute('dy', '0.3em');
            text.setAttribute('font-size', '11');
            text.setAttribute('font-weight', 'bold');
            text.setAttribute('fill', '#fff');
            text.textContent = num.number;
            svg.appendChild(text);
        });
    }

    // Attach event listeners
    attachEventListeners() {
        // Bet type selector
        document.querySelectorAll('.bet-type-btn').forEach(btn => {
            btn.addEventListener('click', () => this.changeBetType(btn.dataset.type));
        });

        // Bet options
        document.querySelectorAll('.color-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectColor(btn.dataset.color, btn));
        });

        document.querySelectorAll('.even-odd-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectEvenOdd(btn.dataset.choice, btn));
        });

        document.querySelectorAll('.range-btn').forEach(btn => {
            btn.addEventListener('click', () => this.selectRange(btn.dataset.range, btn));
        });

        document.querySelectorAll('.quick-bet').forEach(btn => {
            btn.addEventListener('click', () => {
                document.getElementById('betAmount').value = btn.dataset.amount;
            });
        });

        // Spin button
        document.getElementById('spinBtn').addEventListener('click', () => this.spin());

        // Reset button
        document.getElementById('resetBtn').addEventListener('click', () => this.reset());
    }

    // Change bet type
    changeBetType(type) {
        document.querySelectorAll('.bet-type-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelector(`[data-type="${type}"]`).classList.add('active');
        
        document.querySelectorAll('.bet-options').forEach(opt => opt.classList.add('hidden'));
        
        const betMap = {
            'number': 'numberBet',
            'color': 'colorBet',
            'even-odd': 'evenOddBet',
            'range': 'rangeBet'
        };
        
        document.getElementById(betMap[type]).classList.remove('hidden');
        this.currentBet = { type: type };
    }

    // Select color
    selectColor(color, btn) {
        document.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentBet = { type: 'color', value: color };
    }

    // Select even/odd
    selectEvenOdd(choice, btn) {
        document.querySelectorAll('.even-odd-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentBet = { type: 'even-odd', value: choice };
    }

    // Select range
    selectRange(range, btn) {
        document.querySelectorAll('.range-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentBet = { type: 'range', value: range };
    }

    // Main spin function
    spin() {
        if (this.isSpinning) return;
        
        // Get current bet
        const betType = document.querySelector('.bet-type-btn.active').dataset.type;
        const betAmount = parseInt(document.getElementById('betAmount').value);

        if (betAmount > this.balance) {
            alert('Insufficient balance!');
            return;
        }

        // Validate bet based on type
        if (!this.validateBet(betType)) {
            alert('Please select a valid bet option!');
            return;
        }

        // Deduct bet amount
        this.balance -= betAmount;
        this.spinCount++;
        this.isSpinning = true;
        document.getElementById('spinBtn').disabled = true;

        // Spin animation
        this.animateSpin();

        // Generate random result after animation
        setTimeout(() => {
            this.lastResult = Math.floor(Math.random() * 37);
            this.checkWin(betType, betAmount);
            this.isSpinning = false;
            document.getElementById('spinBtn').disabled = false;
            this.updateUI();
        }, 2000);
    }

    // Validate bet
    validateBet(betType) {
        switch(betType) {
            case 'number':
                return true; // Number input always has a value
            case 'color':
                return document.querySelector('.color-btn.active') !== null;
            case 'even-odd':
                return document.querySelector('.even-odd-btn.active') !== null;
            case 'range':
                return document.querySelector('.range-btn.active') !== null;
            default:
                return false;
        }
    }

    // Animate spin
    animateSpin() {
        const wheel = document.getElementById('rouletteWheel');
        wheel.classList.remove('spinning');
        // Trigger reflow to restart animation
        void wheel.offsetWidth;
        wheel.classList.add('spinning');
    }

    // Check if player won
    checkWin(betType, betAmount) {
        let won = false;
        let payout = 0;
        const winningNumber = this.lastResult;
        const winningColor = this.wheelNumbers[winningNumber].color;

        switch(betType) {
            case 'number':
                const selectedNumber = parseInt(document.getElementById('selectedNumber').value);
                if (selectedNumber === winningNumber) {
                    won = true;
                    payout = betAmount * 36;
                }
                break;
            case 'color':
                const selectedColor = document.querySelector('.color-btn.active').dataset.color;
                if (selectedColor === winningColor) {
                    won = true;
                    payout = betAmount * 2;
                }
                break;
            case 'even-odd':
                const selectedChoice = document.querySelector('.even-odd-btn.active').dataset.choice;
                if (selectedChoice === 'even' && winningNumber % 2 === 0 && winningNumber !== 0) {
                    won = true;
                    payout = betAmount * 2;
                } else if (selectedChoice === 'odd' && winningNumber % 2 !== 0) {
                    won = true;
                    payout = betAmount * 2;
                }
                break;
            case 'range':
                const selectedRange = document.querySelector('.range-btn.active').dataset.range;
                const ranges = {
                    '1-12': [1, 12],
                    '13-24': [13, 24],
                    '25-36': [25, 36]
                };
                if (winningNumber >= ranges[selectedRange][0] && winningNumber <= ranges[selectedRange][1]) {
                    won = true;
                    payout = betAmount * 3;
                }
                break;
        }

        if (won) {
            this.balance += payout;
            this.totalWins++;
            this.showResult(`🎉 You Won! ${payout} credits!`, true);
        } else {
            this.showResult(`😢 You Lost. The number was ${winningNumber} (${winningColor})`, false);
        }
    }

    // Show result
    showResult(message, won) {
        const resultDisplay = document.getElementById('resultDisplay');
        const resultText = document.getElementById('resultText');
        const payout = document.getElementById('payout');
        
        resultText.textContent = message;
        payout.textContent = `Winning Number: ${this.lastResult} (${this.wheelNumbers[this.lastResult].color})`;
        
        if (won) {
            resultDisplay.style.borderLeftColor = '#4caf50';
            resultDisplay.style.backgroundColor = '#e8f5e9';
        } else {
            resultDisplay.style.borderLeftColor = '#f44336';
            resultDisplay.style.backgroundColor = '#ffebee';
        }
        
        resultDisplay.classList.remove('hidden');
    }

    // Update UI
    updateUI() {
        document.getElementById('balance').textContent = this.balance.toLocaleString();
        document.getElementById('spinCount').textContent = this.spinCount;
        document.getElementById('totalWins').textContent = this.totalWins;
        
        const winRate = this.spinCount > 0 ? ((this.totalWins / this.spinCount) * 100).toFixed(1) : 0;
        document.getElementById('winRate').textContent = winRate + '%';
        
        if (this.lastResult !== null) {
            const color = this.wheelNumbers[this.lastResult].color;
            document.getElementById('lastResult').textContent = `Last Result: ${this.lastResult} (${color.toUpperCase()})`;
        }

        // Disable spin if no balance
        if (this.balance <= 0) {
            document.getElementById('spinBtn').disabled = true;
            alert('Game Over! You\'ve run out of credits. Click Reset to play again.');
        }
    }

    // Reset game
    reset() {
        this.balance = 1000;
        this.spinCount = 0;
        this.totalWins = 0;
        this.lastResult = null;
        document.getElementById('spinBtn').disabled = false;
        document.getElementById('resultDisplay').classList.add('hidden');
        this.updateUI();
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RouletteSimulator();
});