# 🏥 Psychiatry Ward Simulator

A browser-based educational game designed for medical students to practice psychiatric diagnosis and treatment skills.

## Overview

This interactive simulation game places you in the role of a psychiatry intern. Your goal is to correctly diagnose and treat patients while managing your energy levels and building your professional reputation over a 5-day rotation.

## Features

### 🎮 Gameplay Mechanics
- **Patient Consultations**: Interview virtual patients presenting with various psychiatric conditions
- **Diagnostic Challenges**: Choose from multiple possible diagnoses based on symptoms and patient history
- **Treatment Planning**: Select appropriate evidence-based treatments for each condition
- **Resource Management**: Balance your energy levels throughout each day
- **Progress Tracking**: Build your reputation as you make correct diagnoses

### 📚 Educational Content
The game includes 10 different psychiatric conditions:
1. Major Depressive Disorder
2. Generalized Anxiety Disorder
3. Bipolar I Disorder (Manic Episode)
4. Schizophrenia
5. Panic Disorder with Agoraphobia
6. Borderline Personality Disorder
7. Post-Traumatic Stress Disorder (PTSD)
8. Obsessive-Compulsive Disorder (OCD)
9. Alcohol Use Disorder
10. Anorexia Nervosa

Each case includes:
- Detailed patient history
- Presenting symptoms
- Differential diagnoses to consider
- Evidence-based treatment recommendations
- Educational feedback after each consultation

### 🎯 Learning Objectives
- Recognize common psychiatric presentations
- Apply DSM-5 diagnostic criteria
- Understand first-line treatment approaches
- Develop clinical reasoning skills
- Learn about differential diagnoses

## How to Play

### Starting the Game
1. Open `index.html` in any modern web browser
2. Click "Start Your Rotation" to begin

### Daily Workflow
1. **See Patients**: Click on patient cards to begin consultations
2. **Review Information**: Read patient history and symptoms carefully
3. **Make Diagnosis**: Select the most appropriate diagnosis from the dropdown
4. **Choose Treatment**: Pick the evidence-based treatment option
5. **Get Feedback**: Review detailed educational feedback
6. **Manage Energy**: Use the "Study" action to restore energy when needed
7. **End Day**: When all patients are seen, end the day to progress

### Scoring System
- **Correct Diagnosis + Treatment**: +10 reputation
- **Correct Diagnosis Only**: +5 reputation
- **Correct Treatment Only**: +2 reputation
- **Both Incorrect**: -5 reputation

### Winning the Game
Complete all 5 days and aim for:
- **Outstanding**: ≥80% accuracy and ≥70 reputation
- **Good**: ≥60% accuracy and ≥50 reputation
- **Needs Practice**: Below these thresholds (try again!)

## Technical Details

### File Structure
```
psychiatry-game/
├── index.html          # Main HTML file
├── css/
│   └── style.css       # Game styling
├── js/
│   ├── patients.js     # Patient data and cases
│   └── game.js         # Game logic and mechanics
├── assets/             # (Optional) Future images/icons
└── data/               # (Optional) Future additional data
```

### Browser Compatibility
Works on all modern browsers:
- Chrome/Edge (recommended)
- Firefox
- Safari
- Opera

No installation required - just open the HTML file!

### Running Locally
**Option 1: Direct File Access**
Simply double-click `index.html` to open in your browser.

**Option 2: Local Server** (Recommended for module loading)
```bash
cd psychiatry-game
python3 -m http.server 8080
# Then open http://localhost:8080 in your browser
```

## Educational Disclaimer

⚠️ **This game is for educational purposes only.** It is designed as a learning tool for medical students and should not be used for actual medical diagnosis or treatment decisions. Always consult official medical resources and supervised clinical experience for real patient care.

## Future Enhancements

Potential features for future versions:
- More patient cases and conditions
- Difficulty levels
- Progress tracking across sessions
- Detailed statistics and performance analytics
- Multiplayer/competitive mode
- Mobile-responsive design improvements
- Sound effects and enhanced visuals
- Additional mental health conditions
- Pharmacology quizzes
- Therapy technique mini-games

## Credits

Developed as an educational tool for medical student training in psychiatry.

## License

Free to use for educational purposes.

---

**Happy Learning! 🧠📖**
