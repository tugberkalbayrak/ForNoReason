// Patient data for psychiatry simulation
// Educational purposes only - not for actual medical diagnosis

const patientsData = [
    {
        id: 1,
        name: "Sarah M.",
        age: 28,
        history: "College student, no prior psychiatric history. Recently experienced breakup and academic stress.",
        symptoms: ["Persistent sadness", "Loss of interest in activities", "Sleep disturbances", "Difficulty concentrating", "Feelings of worthlessness"],
        correctDiagnosis: "Major Depressive Disorder",
        correctTreatment: "SSRI antidepressant + Cognitive Behavioral Therapy",
        differentialDiagnoses: ["Adjustment Disorder", "Bipolar Disorder", "Generalized Anxiety Disorder"],
        education: "Major Depressive Disorder requires at least 5 symptoms present for 2+ weeks including depressed mood or anhedonia. First-line treatment includes SSRIs and psychotherapy."
    },
    {
        id: 2,
        name: "James T.",
        age: 35,
        history: "Software engineer. Reports increasing worry over the past 6 months about work performance and family matters.",
        symptoms: ["Excessive worry", "Restlessness", "Muscle tension", "Irritability", "Sleep problems", "Difficulty controlling worry"],
        correctDiagnosis: "Generalized Anxiety Disorder",
        correctTreatment: "SSRI/SNRI + Cognitive Behavioral Therapy",
        differentialDiagnoses: ["Panic Disorder", "Social Anxiety Disorder", "Hyperthyroidism"],
        education: "GAD is characterized by excessive anxiety and worry occurring more days than not for at least 6 months. Physical symptoms like muscle tension and restlessness are common."
    },
    {
        id: 3,
        name: "Maria G.",
        age: 42,
        history: "Teacher. Family reports periods of elevated mood followed by deep depression. Currently in elevated state.",
        symptoms: ["Decreased need for sleep", "Racing thoughts", "Increased goal-directed activity", "Grandiosity", "Impulsive spending", "Pressured speech"],
        correctDiagnosis: "Bipolar I Disorder (Manic Episode)",
        correctTreatment: "Mood stabilizer (Lithium/Valproate) + Antipsychotic",
        differentialDiagnoses: ["Major Depressive Disorder", "Schizophrenia", "Substance-induced mood disorder"],
        education: "Manic episodes involve abnormally elevated mood lasting at least 1 week with significant impairment. Bipolar I requires at least one manic episode."
    },
    {
        id: 4,
        name: "David L.",
        age: 23,
        history: "Graduate student. Believes classmates are plotting against him. Hears voices commenting on his actions.",
        symptoms: ["Auditory hallucinations", "Paranoid delusions", "Social withdrawal", "Disorganized thinking", "Flat affect"],
        correctDiagnosis: "Schizophrenia",
        correctTreatment: "Second-generation antipsychotic + Psychosocial support",
        differentialDiagnoses: ["Schizoaffective Disorder", "Delusional Disorder", "Substance-induced psychosis"],
        education: "Schizophrenia requires 2+ psychotic symptoms for at least 6 months with functional impairment. Hallucinations and delusions are hallmark positive symptoms."
    },
    {
        id: 5,
        name: "Emily R.",
        age: 31,
        history: "Marketing executive. Experiences sudden episodes of intense fear with physical symptoms. Avoids crowded places.",
        symptoms: ["Recurrent panic attacks", "Fear of future attacks", "Avoidance behaviors", "Palpitations during attacks", "Shortness of breath", "Fear of losing control"],
        correctDiagnosis: "Panic Disorder with Agoraphobia",
        correctTreatment: "SSRI + Exposure therapy + Cognitive restructuring",
        differentialDiagnoses: ["Generalized Anxiety Disorder", "Social Anxiety Disorder", "Cardiac conditions"],
        education: "Panic disorder involves recurrent unexpected panic attacks followed by concern about additional attacks. Agoraphobia is avoidance of situations where escape might be difficult."
    },
    {
        id: 6,
        name: "Michael B.",
        age: 19,
        history: "College freshman. Difficulty maintaining friendships. Reports feeling empty and has history of self-harm.",
        symptoms: ["Unstable relationships", "Fear of abandonment", "Identity disturbance", "Impulsivity", "Emotional instability", "Chronic feelings of emptiness"],
        correctDiagnosis: "Borderline Personality Disorder",
        correctTreatment: "Dialectical Behavior Therapy (DBT)",
        differentialDiagnoses: ["Bipolar Disorder", "Major Depressive Disorder", "PTSD"],
        education: "BPD is characterized by pervasive instability in relationships, self-image, and affects. DBT is the gold standard treatment focusing on emotion regulation and distress tolerance."
    },
    {
        id: 7,
        name: "Robert K.",
        age: 45,
        history: "Veteran. Experiences flashbacks to combat situations. Avoids reminders and has hypervigilance.",
        symptoms: ["Intrusive memories", "Nightmares", "Avoidance of trauma reminders", "Hypervigilance", "Exaggerated startle response", "Emotional numbness"],
        correctDiagnosis: "Post-Traumatic Stress Disorder (PTSD)",
        correctTreatment: "Trauma-focused CBT or EMDR + SSRI",
        differentialDiagnoses: ["Acute Stress Disorder", "Generalized Anxiety Disorder", "Depression"],
        education: "PTSD develops after exposure to traumatic event. Symptoms include re-experiencing, avoidance, negative cognitions, and hyperarousal lasting more than 1 month."
    },
    {
        id: 8,
        name: "Lisa W.",
        age: 38,
        history: "Accountant. Performs repetitive checking behaviors. Has intrusive thoughts about contamination.",
        symptoms: ["Obsessive thoughts about contamination", "Compulsive hand washing", "Checking behaviors", "Time-consuming rituals", "Recognition that thoughts are excessive"],
        correctDiagnosis: "Obsessive-Compulsive Disorder (OCD)",
        correctTreatment: "Exposure and Response Prevention (ERP) + SSRI (high dose)",
        differentialDiagnoses: ["Generalized Anxiety Disorder", "Specific Phobia", "Psychotic Disorder"],
        education: "OCD involves obsessions (intrusive thoughts) and compulsions (repetitive behaviors). ERP is the most effective psychotherapy, requiring higher SSRI doses than depression."
    },
    {
        id: 9,
        name: "Thomas H.",
        age: 52,
        history: "Business owner. Long history of alcohol use. Recently lost license due to DUI. Wants to quit but experiences cravings.",
        symptoms: ["Cravings for alcohol", "Withdrawal symptoms when not drinking", "Continued use despite consequences", "Tolerance", "Failed attempts to quit"],
        correctDiagnosis: "Alcohol Use Disorder (Severe)",
        correctTreatment: "Detoxification + Naltrexone/Acamprosate + Support groups",
        differentialDiagnoses: ["Alcohol Dependence", "Depression", "Anxiety Disorder"],
        education: "AUD is diagnosed based on impaired control, social impairment, risky use, and pharmacological criteria. Treatment often requires medical detox followed by medication and psychosocial support."
    },
    {
        id: 10,
        name: "Anna S.",
        age: 16,
        history: "High school student. Parents concerned about restrictive eating and excessive exercise. BMI significantly below normal.",
        symptoms: ["Restricted food intake", "Intense fear of gaining weight", "Distorted body image", "Excessive exercise", "Amenorrhea", "Preoccupation with calories"],
        correctDiagnosis: "Anorexia Nervosa",
        correctTreatment: "Family-based therapy + Nutritional rehabilitation + Medical monitoring",
        differentialDiagnoses: ["Bulimia Nervosa", "Avoidant/Restrictive Food Intake Disorder", "Medical conditions"],
        education: "Anorexia nervosa involves restriction of energy intake leading to significantly low weight, fear of weight gain, and disturbance in self-perceived weight. Family-based treatment is first-line for adolescents."
    }
];

// Available diagnoses dropdown options
const availableDiagnoses = [
    "Major Depressive Disorder",
    "Generalized Anxiety Disorder",
    "Bipolar I Disorder (Manic Episode)",
    "Schizophrenia",
    "Panic Disorder with Agoraphobia",
    "Borderline Personality Disorder",
    "Post-Traumatic Stress Disorder (PTSD)",
    "Obsessive-Compulsive Disorder (OCD)",
    "Alcohol Use Disorder (Severe)",
    "Anorexia Nervosa",
    "Adjustment Disorder",
    "Social Anxiety Disorder",
    "Delusional Disorder",
    "Acute Stress Disorder"
];

// Available treatments dropdown options
const availableTreatments = [
    "SSRI antidepressant + Cognitive Behavioral Therapy",
    "SSRI/SNRI + Cognitive Behavioral Therapy",
    "Mood stabilizer (Lithium/Valproate) + Antipsychotic",
    "Second-generation antipsychotic + Psychosocial support",
    "SSRI + Exposure therapy + Cognitive restructuring",
    "Dialectical Behavior Therapy (DBT)",
    "Trauma-focused CBT or EMDR + SSRI",
    "Exposure and Response Prevention (ERP) + SSRI (high dose)",
    "Detoxification + Naltrexone/Acamprosate + Support groups",
    "Family-based therapy + Nutritional rehabilitation + Medical monitoring",
    "Supportive therapy only",
    "Benzodiazepines",
    "Antipsychotic monotherapy",
    "Hospitalization only"
];

// Export for use in game.js
export { patientsData, availableDiagnoses, availableTreatments };
