// Game state management
import { patientsData, availableDiagnoses, availableTreatments } from './patients.js';

let gameState = {
    currentDay: 1,
    energy: 100,
    reputation: 50,
    patientsSeen: 0,
    correctDiagnoses: 0,
    currentPatient: null,
    patientQueue: [],
    gameActive: false
};

// DOM Elements
const screens = {
    welcome: document.getElementById('welcome-screen'),
    ward: document.getElementById('ward-screen'),
    consultation: document.getElementById('consultation-screen'),
    results: document.getElementById('results-screen'),
    gameOver: document.getElementById('game-over-screen')
};

const statsDisplay = {
    day: document.getElementById('day-display'),
    energy: document.getElementById('energy-display'),
    reputation: document.getElementById('reputation-display')
};

// Initialize the game
function initGame() {
    gameState = {
        currentDay: 1,
        energy: 100,
        reputation: 50,
        patientsSeen: 0,
        correctDiagnoses: 0,
        currentPatient: null,
        patientQueue: [],
        gameActive: true
    };
    
    updateStats();
    showScreen('ward');
    generatePatientQueue();
    renderPatientQueue();
}

// Show specific screen
function showScreen(screenName) {
    Object.values(screens).forEach(screen => screen.classList.remove('active'));
    screens[screenName].classList.add('active');
}

// Update stats display
function updateStats() {
    statsDisplay.day.textContent = `Day: ${gameState.currentDay}`;
    statsDisplay.energy.textContent = `Energy: ${gameState.energy}%`;
    statsDisplay.reputation.textContent = `Reputation: ${gameState.reputation}`;
    
    // Color code energy
    if (gameState.energy < 30) {
        statsDisplay.energy.style.color = '#dc3545';
    } else if (gameState.energy < 60) {
        statsDisplay.energy.style.color = '#ffc107';
    } else {
        statsDisplay.energy.style.color = '#28a745';
    }
}

// Generate patient queue for the day
function generatePatientQueue() {
    // Shuffle and select 3-5 patients for the day
    const shuffled = [...patientsData].sort(() => Math.random() - 0.5);
    const numPatients = Math.floor(Math.random() * 3) + 3; // 3-5 patients
    gameState.patientQueue = shuffled.slice(0, numPatients);
}

// Render patient queue
function renderPatientQueue() {
    const container = document.getElementById('patients-container');
    container.innerHTML = '';
    
    if (gameState.patientQueue.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666;">No more patients today. End your day or study to restore energy.</p>';
        return;
    }
    
    gameState.patientQueue.forEach((patient, index) => {
        const card = document.createElement('div');
        card.className = 'patient-card';
        card.innerHTML = `
            <h4>${patient.name}</h4>
            <p>Age: ${patient.age}</p>
            <p>Waiting time: ${Math.floor(Math.random() * 30) + 5} mins</p>
        `;
        card.addEventListener('click', () => seePatient(patient));
        container.appendChild(card);
    });
}

// See a patient
function seePatient(patient) {
    if (gameState.energy < 10) {
        alert('You\'re too tired! Study to restore energy first.');
        return;
    }
    
    gameState.currentPatient = patient;
    gameState.energy -= 10;
    updateStats();
    
    // Populate consultation screen
    document.getElementById('patient-name').textContent = patient.name;
    document.getElementById('patient-age').textContent = `Age: ${patient.age}`;
    document.getElementById('patient-history').textContent = `History: ${patient.history}`;
    
    // Render symptoms
    const symptomsContainer = document.getElementById('symptoms-container');
    symptomsContainer.innerHTML = '';
    patient.symptoms.forEach(symptom => {
        const li = document.createElement('li');
        li.textContent = symptom;
        symptomsContainer.appendChild(li);
    });
    
    // Populate diagnosis dropdown
    const diagnosisSelect = document.getElementById('diagnosis-select');
    diagnosisSelect.innerHTML = '<option value="">-- Select Diagnosis --</option>';
    availableDiagnoses.forEach(diagnosis => {
        const option = document.createElement('option');
        option.value = diagnosis;
        option.textContent = diagnosis;
        diagnosisSelect.appendChild(option);
    });
    
    // Populate treatment dropdown
    const treatmentSelect = document.getElementById('treatment-select');
    treatmentSelect.innerHTML = '<option value="">-- Select Treatment --</option>';
    availableTreatments.forEach(treatment => {
        const option = document.createElement('option');
        option.value = treatment;
        option.textContent = treatment;
        treatmentSelect.appendChild(option);
    });
    
    showScreen('consultation');
}

// Submit diagnosis and treatment
function submitDiagnosis() {
    const diagnosisSelect = document.getElementById('diagnosis-select');
    const treatmentSelect = document.getElementById('treatment-select');
    
    const selectedDiagnosis = diagnosisSelect.value;
    const selectedTreatment = treatmentSelect.value;
    
    if (!selectedDiagnosis || !selectedTreatment) {
        alert('Please select both a diagnosis and treatment.');
        return;
    }
    
    const patient = gameState.currentPatient;
    const isDiagnosisCorrect = selectedDiagnosis === patient.correctDiagnosis;
    const isTreatmentCorrect = selectedTreatment === patient.correctTreatment;
    
    // Calculate score
    let feedback = '';
    let reputationChange = 0;
    
    if (isDiagnosisCorrect && isTreatmentCorrect) {
        feedback = `
            <h3>Excellent Work!</h3>
            <p class="correct">✓ Correct Diagnosis: ${patient.correctDiagnosis}</p>
            <p class="correct">✓ Correct Treatment: ${patient.correctTreatment}</p>
            <p><strong>Educational Note:</strong> ${patient.education}</p>
        `;
        reputationChange = 10;
        gameState.correctDiagnoses++;
    } else if (isDiagnosisCorrect) {
        feedback = `
            <h3>Good Effort!</h3>
            <p class="correct">✓ Correct Diagnosis: ${patient.correctDiagnosis}</p>
            <p class="incorrect">✗ Incorrect Treatment</p>
            <p><strong>Correct Treatment:</strong> ${patient.correctTreatment}</p>
            <p><strong>Educational Note:</strong> ${patient.education}</p>
        `;
        reputationChange = 5;
    } else if (isTreatmentCorrect) {
        feedback = `
            <h3>Partial Credit</h3>
            <p class="incorrect">✗ Incorrect Diagnosis</p>
            <p class="correct">✓ Correct Treatment</p>
            <p><strong>Correct Diagnosis:</strong> ${patient.correctDiagnosis}</p>
            <p><strong>Educational Note:</strong> ${patient.education}</p>
        `;
        reputationChange = 2;
    } else {
        feedback = `
            <h3>Needs Improvement</h3>
            <p class="incorrect">✗ Incorrect Diagnosis</p>
            <p class="incorrect">✗ Incorrect Treatment</p>
            <p><strong>Correct Diagnosis:</strong> ${patient.correctDiagnosis}</p>
            <p><strong>Correct Treatment:</strong> ${patient.correctTreatment}</p>
            <p><strong>Educational Note:</strong> ${patient.education}</p>
        `;
        reputationChange = -5;
    }
    
    gameState.reputation += reputationChange;
    gameState.patientsSeen++;
    
    // Remove patient from queue
    gameState.patientQueue = gameState.patientQueue.filter(p => p.id !== patient.id);
    
    // Display results
    document.getElementById('result-feedback').innerHTML = feedback;
    updateStats();
    showScreen('results');
}

// Continue after results
function continueAfterResults() {
    if (gameState.patientQueue.length === 0) {
        endDay();
    } else {
        renderPatientQueue();
        showScreen('ward');
    }
}

// Study to restore energy
function study() {
    if (gameState.energy >= 100) {
        alert('Your energy is already full!');
        return;
    }
    
    gameState.energy = Math.min(100, gameState.energy + 30);
    updateStats();
    alert('You studied for a while and restored some energy! (+30 energy)');
}

// End the day
function endDay() {
    gameState.currentDay++;
    
    if (gameState.currentDay > 5) {
        endGame();
        return;
    }
    
    gameState.energy = 100; // Restore energy for new day
    updateStats();
    generatePatientQueue();
    renderPatientQueue();
    showScreen('ward');
    alert(`Day ${gameState.currentDay - 1} complete! Starting Day ${gameState.currentDay}`);
}

// End the game
function endGame() {
    gameState.gameActive = false;
    
    const finalStats = document.getElementById('final-stats');
    const accuracy = gameState.patientsSeen > 0 
        ? Math.round((gameState.correctDiagnoses / gameState.patientsSeen) * 100) 
        : 0;
    
    finalStats.innerHTML = `
        <h3>Final Statistics</h3>
        <div class="stat-row">
            <span>Total Days Completed:</span>
            <span>5</span>
        </div>
        <div class="stat-row">
            <span>Patients Seen:</span>
            <span>${gameState.patientsSeen}</span>
        </div>
        <div class="stat-row">
            <span>Correct Diagnoses:</span>
            <span>${gameState.correctDiagnoses}</span>
        </div>
        <div class="stat-row">
            <span>Accuracy Rate:</span>
            <span>${accuracy}%</span>
        </div>
        <div class="stat-row">
            <span>Final Reputation:</span>
            <span>${gameState.reputation}</span>
        </div>
    `;
    
    const title = document.getElementById('game-over-title');
    if (accuracy >= 80 && gameState.reputation >= 70) {
        title.textContent = 'Outstanding Performance! 🌟';
        title.style.color = '#28a745';
    } else if (accuracy >= 60 && gameState.reputation >= 50) {
        title.textContent = 'Good Job! 👍';
        title.style.color = '#667eea';
    } else {
        title.textContent = 'Keep Practicing! 📚';
        title.style.color = '#ffc107';
    }
    
    showScreen('gameOver');
}

// Event Listeners
document.getElementById('start-btn').addEventListener('click', initGame);
document.getElementById('next-patient-btn').addEventListener('click', () => {
    if (gameState.patientQueue.length > 0) {
        seePatient(gameState.patientQueue[0]);
    } else {
        alert('No patients in queue. End your day or wait for new patients.');
    }
});
document.getElementById('study-btn').addEventListener('click', study);
document.getElementById('end-day-btn').addEventListener('click', endDay);
document.getElementById('submit-diagnosis-btn').addEventListener('click', submitDiagnosis);
document.getElementById('back-to-ward-btn').addEventListener('click', () => {
    renderPatientQueue();
    showScreen('ward');
});
document.getElementById('continue-btn').addEventListener('click', continueAfterResults);
document.getElementById('restart-btn').addEventListener('click', initGame);

// Initialize on load
updateStats();
