// ===================================
// PSYCHIATRY CLINIC SIMULATOR
// Main Game Logic
// ===================================

class PsychiatryClinicGame {
    constructor() {
        // Game State
        this.state = {
            screen: 'loading',
            day: 1,
            money: 500,
            reputation: 0,
            totalPatients: 0,
            knowledgeLevel: 1,
            patientQueue: [],
            currentPatient: null,
            selectedDiagnosis: null,
            selectedTreatment: null,
            dailyStats: {
                seen: 0,
                earned: 0,
                correctDiagnoses: 0
            },
            unlockedConditions: ['depression', 'anxiety'],
            purchasedItems: [],
            clinicUpgrades: [],
            timeRemaining: 480 // 8 hours in minutes
        };

        // Tutorial State
        this.tutorialSlide = 1;
        this.totalTutorialSlides = 5;

        // Bind methods
        this.init = this.init.bind(this);
        this.startGame = this.startGame.bind(this);
        this.nextTutorialSlide = this.nextTutorialSlide.bind(this);
        this.prevTutorialSlide = this.prevTutorialSlide.bind(this);
        this.selectPatient = this.selectPatient.bind(this);
        this.selectDiagnosis = this.selectDiagnosis.bind(this);
        this.selectTreatment = this.selectTreatment.bind(this);
        this.confirmTreatment = this.confirmTreatment.bind(this);
        this.nextPatient = this.nextPatient.bind(this);
        this.openShop = this.openShop.bind(this);
        this.closeShop = this.closeShop.bind(this);
        this.switchShopTab = this.switchShopTab.bind(this);
        this.purchaseItem = this.purchaseItem.bind(this);
        this.endDay = this.endDay.bind(this);
        this.startNextDay = this.startNextDay.bind(this);
        this.updateUI = this.updateUI.bind(this);
    }

    init() {
        // Loading screen animation
        setTimeout(() => {
            document.getElementById('start-btn').addEventListener('click', this.startGame);
        }, 2000);
    }

    startGame() {
        this.switchScreen('tutorial-screen');
        this.initTutorial();
    }

    switchScreen(screenId) {
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });
        document.getElementById(screenId).classList.add('active');
        this.state.screen = screenId;
    }

    // Tutorial Functions
    initTutorial() {
        this.tutorialSlide = 1;
        this.updateTutorialSlide();
        this.createSlideIndicators();

        document.getElementById('next-slide').addEventListener('click', this.nextTutorialSlide);
        document.getElementById('prev-slide').addEventListener('click', this.prevTutorialSlide);
    }

    createSlideIndicators() {
        const container = document.querySelector('.slide-indicators');
        container.innerHTML = '';
        for (let i = 1; i <= this.totalTutorialSlides; i++) {
            const indicator = document.createElement('div');
            indicator.className = `indicator ${i === 1 ? 'active' : ''}`;
            indicator.addEventListener('click', () => {
                this.tutorialSlide = i;
                this.updateTutorialSlide();
            });
            container.appendChild(indicator);
        }
    }

    updateTutorialSlide() {
        document.querySelectorAll('.slide').forEach(slide => {
            slide.classList.remove('active');
        });
        document.querySelector(`.slide[data-slide="${this.tutorialSlide}"]`).classList.add('active');

        document.querySelectorAll('.indicator').forEach((indicator, index) => {
            indicator.classList.toggle('active', index + 1 === this.tutorialSlide);
        });

        document.getElementById('prev-slide').disabled = this.tutorialSlide === 1;
        
        const nextBtn = document.getElementById('next-slide');
        if (this.tutorialSlide === this.totalTutorialSlides) {
            nextBtn.innerHTML = 'Start Practice <i class="fas fa-play"></i>';
            nextBtn.onclick = () => this.beginPractice();
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-chevron-right"></i>';
            nextBtn.onclick = this.nextTutorialSlide;
        }
    }

    nextTutorialSlide() {
        if (this.tutorialSlide < this.totalTutorialSlides) {
            this.tutorialSlide++;
            this.updateTutorialSlide();
        }
    }

    prevTutorialSlide() {
        if (this.tutorialSlide > 1) {
            this.tutorialSlide--;
            this.updateTutorialSlide();
        }
    }

    beginPractice() {
        this.switchScreen('game-screen');
        this.generatePatientQueue();
        this.updateUI();
        this.setupEventListeners();
    }

    // Game Functions
    generatePatientQueue() {
        const availableCases = PATIENT_CASES.filter(patient => 
            this.state.unlockedConditions.includes(patient.correctDiagnosis)
        );
        
        // Add 3-5 patients per day
        const numPatients = Math.min(3 + Math.floor(this.state.reputation / 50), 6);
        
        for (let i = 0; i < numPatients; i++) {
            const randomCase = availableCases[Math.floor(Math.random() * availableCases.length)];
            const patient = {
                ...randomCase,
                queueId: Date.now() + i,
                arrivalTime: this.state.timeRemaining - (Math.random() * 60)
            };
            this.state.patientQueue.push(patient);
        }
        
        this.renderPatientQueue();
    }

    renderPatientQueue() {
        const queueContainer = document.getElementById('patient-queue');
        queueContainer.innerHTML = '';

        this.state.patientQueue.forEach(patient => {
            const card = document.createElement('div');
            card.className = `patient-card ${this.state.currentPatient?.queueId === patient.queueId ? 'selected' : ''}`;
            card.onclick = () => this.selectPatient(patient.queueId);
            
            card.innerHTML = `
                <div class="patient-card-header">
                    <span class="patient-card-name">${patient.name}</span>
                    <span class="patient-card-time">${Math.ceil(patient.consultationTime)} min</span>
                </div>
                <div class="patient-card-complaint">${patient.chiefComplaint.substring(0, 60)}...</div>
                <span class="patient-card-urgency urgency-${patient.urgency}">${patient.urgency}</span>
            `;
            
            queueContainer.appendChild(card);
        });

        document.getElementById('queue-length').textContent = this.state.patientQueue.length;
    }

    selectPatient(queueId) {
        if (this.state.currentPatient?.queueId === queueId) return;
        
        const patient = this.state.patientQueue.find(p => p.queueId === queueId);
        if (!patient) return;

        this.state.currentPatient = patient;
        this.state.selectedDiagnosis = null;
        this.state.selectedTreatment = null;
        
        this.renderPatientQueue();
        this.renderConsultationView();
    }

    renderConsultationView() {
        const patient = this.state.currentPatient;
        if (!patient) return;

        document.getElementById('consultation-view').style.display = 'block';
        document.getElementById('no-patient-view').style.display = 'none';
        document.getElementById('result-view').style.display = 'none';
        document.getElementById('treatment-section').style.display = 'none';

        document.getElementById('patient-name').textContent = patient.name;
        document.getElementById('patient-demographics').textContent = 
            `Age: ${patient.age} | Gender: ${patient.gender} | Occupation: ${patient.occupation}`;
        document.getElementById('consultation-time').textContent = `${patient.consultationTime} min`;
        document.getElementById('chief-complaint').textContent = patient.chiefComplaint;
        document.getElementById('patient-history').textContent = patient.history;

        // Render Mental Status Exam
        const mseContainer = document.getElementById('mental-status');
        mseContainer.innerHTML = '';
        Object.entries(patient.mentalStatus).forEach(([key, value]) => {
            const item = document.createElement('div');
            item.className = 'mse-item';
            item.innerHTML = `
                <div class="mse-label">${key.replace(/([A-Z])/g, ' $1').trim()}</div>
                <div class="mse-value">${value}</div>
            `;
            mseContainer.appendChild(item);
        });

        // Render Diagnosis Options
        const diagnosisContainer = document.getElementById('diagnosis-options');
        diagnosisContainer.innerHTML = '';
        
        CONDITIONS.forEach(condition => {
            const btn = document.createElement('div');
            btn.className = 'diagnosis-btn';
            btn.onclick = () => this.selectDiagnosis(condition.id);
            btn.innerHTML = `
                <h4>${condition.name}</h4>
                <p>${condition.category}</p>
            `;
            diagnosisContainer.appendChild(btn);
        });
    }

    selectDiagnosis(conditionId) {
        this.state.selectedDiagnosis = conditionId;
        
        document.querySelectorAll('.diagnosis-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        event.currentTarget.classList.add('selected');

        // Show treatment section
        const condition = CONDITIONS.find(c => c.id === conditionId);
        const treatmentContainer = document.getElementById('treatment-options');
        treatmentContainer.innerHTML = '';

        condition.treatments.forEach(treatment => {
            const btn = document.createElement('div');
            btn.className = 'treatment-btn';
            btn.onclick = () => this.selectTreatment(treatment.id);
            btn.innerHTML = `
                <h4>${treatment.name}</h4>
                <p>${treatment.description}</p>
            `;
            treatmentContainer.appendChild(btn);
        });

        document.getElementById('treatment-section').style.display = 'block';
        document.getElementById('confirm-treatment').onclick = this.confirmTreatment;
    }

    selectTreatment(treatmentId) {
        this.state.selectedTreatment = treatmentId;
        
        document.querySelectorAll('.treatment-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        event.currentTarget.classList.add('selected');
    }

    confirmTreatment() {
        if (!this.state.selectedDiagnosis || !this.state.selectedTreatment) {
            alert('Please select both a diagnosis and treatment plan.');
            return;
        }

        const patient = this.state.currentPatient;
        const isCorrectDiagnosis = this.state.selectedDiagnosis === patient.correctDiagnosis;
        
        // Calculate rewards
        let moneyEarned = isCorrectDiagnosis ? patient.potentialEarn : Math.floor(patient.potentialEarn * 0.3);
        let reputationGained = isCorrectDiagnosis ? patient.reputationGain : Math.floor(patient.reputationGain * 0.2);

        // Apply bonuses from upgrades
        if (this.state.clinicUpgrades.includes('fee_increase_1')) {
            moneyEarned += 20;
        }
        if (this.state.clinicUpgrades.includes('rep_bonus')) {
            reputationGained += 5;
        }

        // Update state
        this.state.money += moneyEarned;
        this.state.reputation += reputationGained;
        this.state.dailyStats.seen++;
        this.state.dailyStats.earned += moneyEarned;
        if (isCorrectDiagnosis) {
            this.state.dailyStats.correctDiagnoses++;
        }
        this.state.totalPatients++;
        this.state.timeRemaining -= patient.consultationTime;

        // Remove patient from queue
        this.state.patientQueue = this.state.patientQueue.filter(p => p.queueId !== patient.queueId);
        this.state.currentPatient = null;

        // Show results
        this.showResults(isCorrectDiagnosis, moneyEarned, reputationGained);
    }

    showResults(isCorrect, moneyEarned, reputationGained) {
        const patient = this.state.patientQueue.find(p => p.queueId === this.state.currentPatient?.queueId) || 
                       PATIENT_CASES.find(p => p.correctDiagnosis === this.state.selectedDiagnosis);
        
        const resultView = document.getElementById('result-view');
        const consultationView = document.getElementById('consultation-view');
        
        consultationView.style.display = 'none';
        resultView.style.display = 'block';

        const icon = document.getElementById('result-icon');
        icon.className = `result-icon ${isCorrect ? 'success' : 'error'}`;
        icon.innerHTML = `<i class="fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'}"></i>`;

        document.getElementById('result-title').textContent = isCorrect ? 'Correct Diagnosis!' : 'Incorrect Diagnosis';
        
        const condition = CONDITIONS.find(c => c.id === patient.correctDiagnosis);
        document.getElementById('result-diagnosis').textContent = condition.name;
        document.getElementById('result-choice').textContent = this.state.selectedDiagnosis === patient.correctDiagnosis ? 
            condition.name : CONDITIONS.find(c => c.id === this.state.selectedDiagnosis)?.name || 'Unknown';
        
        const treatment = condition.treatments.find(t => t.id === this.state.selectedTreatment);
        document.getElementById('result-treatment').textContent = treatment?.name || 'None selected';

        document.getElementById('result-explanation').innerHTML = `
            <strong>${isCorrect ? 'Excellent work!' : 'Learning opportunity:'}</strong><br><br>
            ${condition.explanation}
        `;

        document.getElementById('reward-money').textContent = `+$${moneyEarned}`;
        document.getElementById('reward-reputation').textContent = `+${reputationGained}`;

        document.getElementById('next-patient-btn').onclick = this.nextPatient;
    }

    nextPatient() {
        this.state.selectedDiagnosis = null;
        this.state.selectedTreatment = null;

        if (this.state.patientQueue.length === 0 || this.state.timeRemaining < 30) {
            // No more patients or time
            document.getElementById('consultation-view').style.display = 'none';
            document.getElementById('result-view').style.display = 'none';
            document.getElementById('no-patient-view').style.display = 'flex';
            
            if (this.state.timeRemaining < 30) {
                setTimeout(() => this.endDay(), 1000);
            }
        } else {
            this.renderPatientQueue();
            document.getElementById('consultation-view').style.display = 'block';
            document.getElementById('result-view').style.display = 'none';
            document.getElementById('no-patient-view').style.display = 'none';
        }

        this.updateUI();
    }

    setupEventListeners() {
        document.getElementById('shop-btn').onclick = this.openShop;
        document.getElementById('end-day-btn').onclick = this.endDay;
        document.getElementById('next-patient-btn').onclick = this.nextPatient;
        
        // Shop modal close
        document.querySelectorAll('.close-modal').forEach(btn => {
            btn.onclick = () => {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.classList.remove('active');
                });
            };
        });

        // Shop tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.onclick = (e) => this.switchShopTab(e.target.closest('.tab-btn').dataset.tab);
        });

        // End day modal
        document.getElementById('start-next-day').onclick = this.startNextDay;
    }

    openShop() {
        document.getElementById('shop-modal').classList.add('active');
        this.renderShop();
    }

    closeShop() {
        document.getElementById('shop-modal').classList.remove('active');
    }

    switchShopTab(tabName) {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        document.querySelectorAll('.shop-section').forEach(section => {
            section.classList.remove('active');
        });
        document.getElementById(`${tabName}-section`).classList.add('active');
    }

    renderShop() {
        document.getElementById('shop-money').textContent = `$${this.state.money}`;

        // Render books
        const booksSection = document.getElementById('books-section');
        booksSection.innerHTML = SHOP_ITEMS.books.map(item => this.renderShopItem(item, 'book')).join('');

        // Render equipment
        const equipmentSection = document.getElementById('equipment-section');
        equipmentSection.innerHTML = SHOP_ITEMS.equipment.map(item => this.renderShopItem(item, 'equipment')).join('');

        // Render upgrades
        const upgradesSection = document.getElementById('upgrades-section');
        upgradesSection.innerHTML = SHOP_ITEMS.upgrades.map(item => this.renderShopItem(item, 'upgrade')).join('');

        // Add buy button listeners
        document.querySelectorAll('.btn-buy').forEach(btn => {
            btn.onclick = (e) => {
                const itemId = e.target.dataset.itemId;
                const itemType = e.target.dataset.itemType;
                this.purchaseItem(itemId, itemType);
            };
        });
    }

    renderShopItem(item, type) {
        const owned = this.state.purchasedItems.includes(item.id) || this.state.clinicUpgrades.includes(item.id);
        const canAfford = this.state.money >= item.price;

        return `
            <div class="shop-item ${owned ? 'owned' : ''}">
                <div class="shop-item-icon">
                    <i class="fas ${item.icon}"></i>
                </div>
                <h4>${item.name}</h4>
                <p>${item.description}</p>
                <p style="color: var(--success-color); font-size: 0.85rem;"><strong>${item.benefit}</strong></p>
                <div class="shop-item-price">
                    <span class="price-tag">$${item.price}</span>
                    <button class="btn-buy" data-item-id="${item.id}" data-item-type="${type}" 
                            ${owned ? 'disabled' : ''} ${!owned && !canAfford ? 'disabled' : ''}>
                        ${owned ? 'Owned' : 'Buy'}
                    </button>
                </div>
            </div>
        `;
    }

    purchaseItem(itemId, itemType) {
        let item;
        if (itemType === 'book') {
            item = SHOP_ITEMS.books.find(i => i.id === itemId);
        } else if (itemType === 'equipment') {
            item = SHOP_ITEMS.equipment.find(i => i.id === itemId);
        } else {
            item = SHOP_ITEMS.upgrades.find(i => i.id === itemId);
        }

        if (!item || this.state.money < item.price) return;

        this.state.money -= item.price;

        if (itemType === 'upgrade') {
            this.state.clinicUpgrades.push(item.id);
        } else {
            this.state.purchasedItems.push(item.id);
        }

        // Apply unlocks
        if (item.unlocks === 'all_conditions') {
            this.state.unlockedConditions = CONDITIONS.map(c => c.id);
        }

        this.updateUI();
        this.renderShop();
    }

    endDay() {
        const expenses = {
            rent: 50 + (this.state.clinicUpgrades.includes('premium_location') ? 100 : 0),
            utilities: 20
        };
        const totalExpenses = expenses.rent + expenses.utilities;
        const netProfit = this.state.dailyStats.earned - totalExpenses;

        document.getElementById('end-day-seen').textContent = this.state.dailyStats.seen;
        document.getElementById('end-day-correct').textContent = this.state.dailyStats.correctDiagnoses;
        document.getElementById('end-day-earned').textContent = `$${this.state.dailyStats.earned}`;
        document.getElementById('end-day-reputation').textContent = `+${this.state.reputation}`;
        
        document.getElementById('expense-rent').textContent = `-$${expenses.rent}`;
        document.getElementById('expense-utilities').textContent = `-$${expenses.utilities}`;
        document.getElementById('expense-total').textContent = `-$${totalExpenses}`;
        
        const profitEl = document.getElementById('net-profit');
        profitEl.textContent = `${netProfit >= 0 ? '+' : ''}$${netProfit}`;
        profitEl.className = netProfit >= 0 ? 'profit-positive' : 'profit-negative';

        document.getElementById('next-day-num').textContent = this.state.day + 1;

        document.getElementById('end-day-modal').classList.add('active');
    }

    startNextDay() {
        this.state.day++;
        this.state.timeRemaining = 480; // Reset to 8 hours
        this.state.dailyStats = {
            seen: 0,
            earned: 0,
            correctDiagnoses: 0
        };

        document.getElementById('end-day-modal').classList.remove('active');
        this.generatePatientQueue();
        this.updateUI();
        
        // Reset view
        document.getElementById('consultation-view').style.display = 'block';
        document.getElementById('result-view').style.display = 'none';
        document.getElementById('no-patient-view').style.display = 'flex';
    }

    updateUI() {
        document.getElementById('current-day').textContent = this.state.day;
        document.getElementById('money-display').textContent = `$${this.state.money}`;
        document.getElementById('reputation-display').textContent = this.state.reputation;
        document.getElementById('patients-display').textContent = this.state.totalPatients;
        document.getElementById('knowledge-display').textContent = `Level ${this.state.knowledgeLevel}`;
        
        document.getElementById('seen-today').textContent = this.state.dailyStats.seen;
        document.getElementById('earned-today').textContent = `$${this.state.dailyStats.earned}`;
        
        const hours = Math.floor(this.state.timeRemaining / 60);
        const minutes = this.state.timeRemaining % 60;
        document.getElementById('time-remaining').textContent = `${hours}h ${minutes}m`;

        // Update reference panel
        this.updateReferencePanel();
    }

    updateReferencePanel() {
        const conditionList = document.getElementById('condition-reference');
        conditionList.innerHTML = '';

        this.state.unlockedConditions.forEach(condId => {
            const condition = CONDITIONS.find(c => c.id === condId);
            if (condition) {
                const li = document.createElement('li');
                li.innerHTML = `
                    <i class="fas fa-check-circle"></i>
                    ${condition.name}
                `;
                conditionList.appendChild(li);
            }
        });
    }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.game = new PsychiatryClinicGame();
    window.game.init();
});
