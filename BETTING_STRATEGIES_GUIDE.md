# Betting Strategies & Advanced Statistics - Documentation

## 📚 Overview

This module adds comprehensive betting strategy analysis and advanced statistical features to the Roulette Simulator. Learn about different betting systems, their mathematical foundations, and simulate their performance.

## 🎲 Available Betting Strategies

### 1. Martingale System
**Description**: Double your bet after every loss until you win.

**How it works**:
- Start with base bet (e.g., $10)
- After loss: $10 → $20 → $40 → $80 → $160...
- After win: Reset to $10

**Formula**: `Bet(n) = Base × 2^(n-1)`

**Risk Level**: 🔴 HIGH
- Pros: Simple; Recovers all losses + 1 unit profit
- Cons: Requires large bankroll; Table limits may prevent continuation; High risk of ruin
- Recommended Bankroll: 500 units

**When to Use**: Only with very deep pockets and strong discipline

---

### 2. Fibonacci System
**Description**: Follow the Fibonacci sequence for bet progression.

**How it works**:
- Sequence: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55...
- After loss: Move to next number
- After win: Move back two numbers

**Formula**: `F(n) = F(n-1) + F(n-2)`

**Risk Level**: 🟡 MEDIUM
- Pros: Lower progression than Martingale; Mathematically elegant; Lower risk
- Cons: Complex to track; Requires significant bankroll; Long recovery
- Recommended Bankroll: 300 units

**When to Use**: When you want controlled progression

---

### 3. D'Alembert System
**Description**: Increase by 1 unit after loss, decrease by 1 unit after win.

**How it works**:
- Start with base bet (e.g., $10)
- After loss: $10 → $20 → $30 → $40...
- After win: $40 → $30 → $20 → $10...

**Formula**: `Bet(n+1) = Bet(n) ± 1 unit`

**Risk Level**: 🟡 MEDIUM
- Pros: Gentle progression; Lower max bets; Lower bankroll requirement
- Cons: Slow profit accumulation; Negative expected value; Requires discipline
- Recommended Bankroll: 200 units

**When to Use**: For safer, longer play sessions

---

### 4. Labouchere System
**Description**: Cross off numbers from a custom sequence to determine bet amounts.

**How it works**:
1. Write sequence: e.g., [1, 2, 3, 4, 5]
2. Bet = First + Last = 1 + 5 = 6 units
3. If win: Cross off both numbers
4. If lose: Add bet amount to end
5. Continue until sequence complete

**Risk Level**: 🟠 MEDIUM-HIGH
- Pros: Customizable; Can achieve profit with moderate wins; Interesting structure
- Cons: Complex to track; Can require large bets; House edge always present
- Recommended Bankroll: 400 units

---

### 5. Paroli System
**Description**: Double your bet after each win (positive progression).

**How it works**:
- Start with base bet (e.g., $10)
- After win: $10 → $20 → $40 (then reset)
- After loss: Always reset to base
- Typical goal: 3 consecutive wins

**Formula**: `Bet(n+1) = Bet(n) × 2 (if win)`

**Risk Level**: 🟢 LOW-MEDIUM
- Pros: Uses winnings to bet; Lower loss potential; Psychologically positive
- Cons: Profits limited; Requires luck; Subject to house edge
- Recommended Bankroll: 100 units

**When to Use**: When you want low-risk, fun play

---

### 6. Flat Betting
**Description**: Bet the same amount every time (no progression).

**How it works**:
- Choose fixed bet: $10
- Every spin: Bet $10
- No changes based on wins or losses

**Formula**: `Bet(n) = Constant`

**Risk Level**: 🟢 LOW
- Pros: Simple management; No stress; Bankroll lasts longer
- Cons: No strategy to overcome edge; Slow accumulation; Steady losses
- Recommended Bankroll: 50 units

---

## 📊 Advanced Statistics

### House Edge Analysis

**Single Zero Roulette (European)**:
- House Edge: **2.7%**
- Calculation: 1/37 = 0.027 = 2.7%
- This means over time, you lose approximately 2.7% of all money wagered

**Double Zero Roulette (American)**:
- House Edge: **5.26%**
- Calculation: 2/38 = 0.0526 = 5.26%

### Probability Distribution

| Bet Type | Payout | Probability | House Edge |
|----------|--------|-------------|------------|
| Single Number | 36:1 | 1/37 (2.7%) | 2.7% |
| Red/Black | 1:1 | 18/37 (48.6%) | 2.7% |
| Even/Odd | 1:1 | 18/37 (48.6%) | 2.7% |
| Range (1-12) | 2:1 | 12/37 (32.4%) | 2.7% |
| Dozen | 2:1 | 12/37 (32.4%) | 2.7% |

### Expected Value (EV) Calculation

**Formula**: `EV = (P_win × Payout) - (P_lose × Bet)`

**Example - Red/Black Bet**:
- Probability of winning: 18/37 = 48.6%
- Probability of losing: 19/37 = 51.4%
- Bet amount: $100
- EV = (0.486 × $100) - (0.514 × $100) = -$2.80
- Expected loss per $100 bet: $2.80 (or 2.7%)

### Standard Deviation

**Formula**: `σ = √(n × p × (1-p) × (Payout)²)`

Where:
- n = number of bets
- p = probability of winning
- Payout = winning amount per unit bet

## 🎯 Using the Simulator

### 1. Select a Strategy
Click on any strategy card to view detailed information.

### 2. Run Simulation
- Set initial bet amount
- Choose number of spins to simulate
- Enter win probability (default: 48.6% for Red/Black)
- Click "Run Simulation"

### 3. View Results
- Final Balance: Total money after simulation
- Total Wins/Losses: Count of winning and losing spins
- Win Rate: Percentage of winning spins
- Max Bet Used: Highest bet amount required
- ROI: Return on Investment percentage
- Chart: Visual representation of balance over time

### 4. Calculate Expected Value
- Select bet type
- Enter bet amount
- See EV calculation and interpretation

## 💡 Key Insights

### Why No Strategy Beats the House

1. **The House Edge is Permanent**
   - Every bet has a negative expected value
   - Over time, the house always wins

2. **Betting Systems Don't Change Odds**
   - Previous spins don't affect future outcomes
   - Each spin is independent
   - Probability remains constant

3. **Bankroll Requirements**
   - Progression systems need large bankrolls
   - Maximum bet might be reached
   - Risk of total loss

4. **The Gambler's Fallacy**
   - After many reds, black is NOT more likely
   - Each spin has the same probability
   - Trends are just random variance

## 🎓 Educational Recommendations

✅ **DO:**
- Use this for learning and entertainment only
- Understand probability and statistics
- Set strict loss limits
- View losses as entertainment costs
- Appreciate mathematical concepts

❌ **DON'T:**
- Try to make money from gambling
- Believe you've found a "winning system"
- Increase bets to recover losses
- Chase losses
- Gamble with money you can't afford to lose

## 📚 Mathematical Resources

### Relevant Concepts
- Probability Theory
- Expected Value
- Standard Deviation
- Law of Large Numbers
- Random Walk Theory
- Gambler's Fallacy

### Further Reading
- "Fooled by Randomness" - Nassim Nicholas Taleb
- "The Kelly Criterion" - John Kelly
- Probability Theory textbooks

## 📝 Notes

- All simulations use random number generation
- Results vary due to randomness
- Repeated simulations show consistent average losses
- House edge is mathematically proven
- No system can overcome a negative expected value

---

**Remember**: This simulator is for educational purposes only. Gambling should be viewed as entertainment, not as a way to make money. Always gamble responsibly!
