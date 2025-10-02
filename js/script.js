class TipCalculator {
    constructor() {
        this.billAmount = 0;
        this.peopleCount = 4;
        this.tipPercentage = 10;
        
        this.initializeElements();
        this.attachEventListeners();
        this.calculateTip();
    }
    
    initializeElements() {
        // DOM Elements
        this.billAmountInput = document.getElementById('billAmount');
        this.peopleCountElement = document.getElementById('peopleCount');
        this.tipButtons = document.querySelectorAll('.tip-btn');
        this.tipAmountElement = document.getElementById('tipAmount');
        this.totalAmountElement = document.getElementById('totalAmount');
        this.perPersonElement = document.getElementById('perPerson');
        this.finalPerPersonElement = document.getElementById('finalPerPerson');
        this.resetBtn = document.getElementById('resetBtn');
        
        // Set initial bill amount
        this.billAmount = parseFloat(this.billAmountInput.value) || 0;
    }
    
    attachEventListeners() {
        // Bill amount input
        this.billAmountInput.addEventListener('input', () => {
            this.billAmount = parseFloat(this.billAmountInput.value) || 0;
            this.calculateTip();
        });
        
        // People count buttons
        document.getElementById('decreasePeople').addEventListener('click', () => {
            if (this.peopleCount > 1) {
                this.peopleCount--;
                this.updatePeopleCount();
            }
        });
        
        document.getElementById('increasePeople').addEventListener('click', () => {
            this.peopleCount++;
            this.updatePeopleCount();
        });
        
        // Tip buttons
        this.tipButtons.forEach(button => {
            button.addEventListener('click', () => {
                this.tipPercentage = parseInt(button.dataset.tip);
                this.updateActiveTipButton();
                this.calculateTip();
            });
        });
        
        // Reset button
        this.resetBtn.addEventListener('click', () => {
            this.resetCalculator();
        });
        
        // Prevent multiple decimal points
        this.billAmountInput.addEventListener('keydown', (e) => {
            if (e.key === '.') {
                if (this.billAmountInput.value.includes('.')) {
                    e.preventDefault();
                }
            }
        });
    }
    
    updatePeopleCount() {
        this.peopleCountElement.textContent = this.peopleCount;
        this.calculateTip();
    }
    
    updateActiveTipButton() {
        this.tipButtons.forEach(button => {
            const isActive = parseInt(button.dataset.tip) === this.tipPercentage;
            button.classList.toggle('active', isActive);
            button.setAttribute('aria-pressed', isActive);
        });
    }
    
    calculateTip() {
        // Ensure valid inputs
        if (this.billAmount <= 0) {
            this.resetCalculator();
            return;
        }
        
        if (this.peopleCount <= 0) {
            this.peopleCount = 1;
            this.updatePeopleCount();
        }
        
        // Calculate tip amount
        const tipAmount = (this.billAmount * this.tipPercentage) / 100;
        const totalAmount = this.billAmount + tipAmount;
        const amountPerPerson = totalAmount / this.peopleCount;
        
        // Update display
        this.tipAmountElement.textContent = `$${tipAmount.toFixed(2)}`;
        this.totalAmountElement.textContent = `$${totalAmount.toFixed(2)}`;
        this.perPersonElement.textContent = `$${amountPerPerson.toFixed(2)}`;
        this.finalPerPersonElement.textContent = `$${amountPerPerson.toFixed(2)}`;
    }
    
    resetCalculator() {
        this.billAmountInput.value = '';
        this.peopleCount = 4;
        this.updatePeopleCount();
        this.tipPercentage = 10;
        this.updateActiveTipButton();
        this.calculateTip();
    }
}

// Initialize the calculator when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new TipCalculator();
});