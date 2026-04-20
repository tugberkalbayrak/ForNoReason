// ===================================
// PSYCHIATRY CLINIC SIMULATOR
// Game Data - Conditions, Patients, Shop Items
// ===================================

const CONDITIONS = [
    {
        id: 'depression',
        name: 'Major Depressive Disorder',
        category: 'Mood Disorders',
        difficulty: 1,
        symptoms: [
            'Persistent sadness or low mood (2+ weeks)',
            'Loss of interest in activities (anhedonia)',
            'Sleep disturbances (insomnia or hypersomnia)',
            'Changes in appetite/weight',
            'Fatigue or loss of energy',
            'Feelings of worthlessness or guilt',
            'Difficulty concentrating',
            'Recurrent thoughts of death or suicide'
        ],
        diagnosticCriteria: '5+ symptoms for 2+ weeks causing significant impairment. Must include depressed mood or anhedonia.',
        treatments: [
            {
                id: 'ssri',
                name: 'SSRI Medication',
                description: 'Selective Serotonin Reuptake Inhibitors (e.g., Fluoxetine, Sertraline)',
                effectiveness: 0.85,
                sideEffects: 'Nausea, sexual dysfunction, insomnia',
                cost: 50
            },
            {
                id: 'cbt',
                name: 'Cognitive Behavioral Therapy',
                description: 'Weekly therapy sessions focusing on negative thought patterns',
                effectiveness: 0.80,
                sideEffects: 'Temporary emotional discomfort',
                cost: 100
            },
            {
                id: 'lifestyle_dep',
                name: 'Lifestyle Modifications',
                description: 'Exercise, sleep hygiene, social engagement',
                effectiveness: 0.60,
                sideEffects: 'None',
                cost: 0
            }
        ],
        explanation: 'Depression is one of the most common mental health conditions. The key diagnostic feature is persistent low mood or loss of interest lasting at least 2 weeks. SSRIs work by increasing serotonin levels in the brain. CBT helps patients identify and change negative thought patterns. Best outcomes often come from combining medication and therapy.'
    },
    {
        id: 'anxiety',
        name: 'Generalized Anxiety Disorder',
        category: 'Anxiety Disorders',
        difficulty: 1,
        symptoms: [
            'Excessive worry occurring more days than not (6+ months)',
            'Difficulty controlling the worry',
            'Restlessness or feeling keyed up',
            'Being easily fatigued',
            'Difficulty concentrating',
            'Irritability',
            'Muscle tension',
            'Sleep disturbance'
        ],
        diagnosticCriteria: 'Excessive anxiety and worry about multiple events/activities for 6+ months, difficult to control, causing impairment.',
        treatments: [
            {
                id: 'ssri_anx',
                name: 'SSRI/SNRI Medication',
                description: 'First-line pharmacological treatment (e.g., Escitalopram, Venlafaxine)',
                effectiveness: 0.80,
                sideEffects: 'Nausea, headache, initial increased anxiety',
                cost: 50
            },
            {
                id: 'cbt_anx',
                name: 'CBT for Anxiety',
                description: 'Focuses on worry exposure and cognitive restructuring',
                effectiveness: 0.85,
                sideEffects: 'Temporary increase in anxiety during exposure',
                cost: 100
            },
            {
                id: 'benzodiazepine',
                name: 'Benzodiazepines (Short-term)',
                description: 'Fast-acting anxiolytics for acute symptoms',
                effectiveness: 0.90,
                sideEffects: 'Sedation, risk of dependence, withdrawal',
                cost: 30,
                warning: 'Only for short-term use due to addiction risk'
            }
        ],
        explanation: 'GAD is characterized by chronic, excessive worry about everyday things. Unlike normal anxiety, it\'s disproportionate and persistent. SSRIs/SNRIs are first-line treatments. CBT is highly effective, particularly techniques like worry time and cognitive restructuring. Benzodiazepines provide quick relief but should be used cautiously due to dependence risk.'
    },
    {
        id: 'bipolar',
        name: 'Bipolar Disorder',
        category: 'Mood Disorders',
        difficulty: 3,
        symptoms: [
            'Episodes of mania/hypomania (elevated mood, increased energy)',
            'Episodes of depression',
            'Decreased need for sleep during manic episodes',
            'Grandiosity or inflated self-esteem',
            'Pressured speech, racing thoughts',
            'Impulsive or risky behavior',
            'Psychotic features (in severe mania)'
        ],
        diagnosticCriteria: 'At least one manic episode (Bipolar I) or hypomanic + major depressive episode (Bipolar II).',
        treatments: [
            {
                id: 'mood_stabilizer',
                name: 'Mood Stabilizers',
                description: 'Lithium, Valproate, or Lamotrigine to stabilize mood swings',
                effectiveness: 0.85,
                sideEffects: 'Weight gain, tremor, thyroid/kidney monitoring needed',
                cost: 80
            },
            {
                id: 'antipsychotic_bipolar',
                name: 'Atypical Antipsychotics',
                description: 'Quetiapine, Olanzapine, or Aripiprazole',
                effectiveness: 0.80,
                sideEffects: 'Metabolic changes, sedation, weight gain',
                cost: 120
            },
            {
                id: 'psychoeducation',
                name: 'Psychoeducation & Routine',
                description: 'Sleep regulation, stress management, recognizing early warning signs',
                effectiveness: 0.70,
                sideEffects: 'None',
                cost: 50
            }
        ],
        explanation: 'Bipolar disorder involves alternating episodes of mania/hypomania and depression. It\'s often misdiagnosed as depression initially. Mood stabilizers like lithium are cornerstone treatments. Importantly, antidepressants alone can trigger manic episodes in bipolar patients. Regular sleep patterns and stress management are crucial for stability.'
    },
    {
        id: 'schizophrenia',
        name: 'Schizophrenia',
        category: 'Psychotic Disorders',
        difficulty: 4,
        symptoms: [
            'Delusions (fixed false beliefs)',
            'Hallucinations (often auditory)',
            'Disorganized speech',
            'Grossly disorganized or catatonic behavior',
            'Negative symptoms (flat affect, avolition, alogia)',
            'Social/occupational dysfunction',
            'Duration: 6+ months'
        ],
        diagnosticCriteria: '2+ characteristic symptoms for 1+ month, with continuous signs for 6+ months, causing significant impairment.',
        treatments: [
            {
                id: 'antipsychotic_typical',
                name: 'First-Generation Antipsychotics',
                description: 'Haloperidol, Fluphenazine - dopamine D2 antagonists',
                effectiveness: 0.75,
                sideEffects: 'Extrapyramidal symptoms, tardive dyskinesia risk',
                cost: 60
            },
            {
                id: 'antipsychotic_atypical',
                name: 'Second-Generation Antipsychotics',
                description: 'Risperidone, Olanzapine, Clozapine (treatment-resistant)',
                effectiveness: 0.80,
                sideEffects: 'Metabolic syndrome, weight gain, sedation',
                cost: 150
            },
            {
                id: 'psychosocial',
                name: 'Psychosocial Interventions',
                description: 'Social skills training, supported employment, family therapy',
                effectiveness: 0.65,
                sideEffects: 'None',
                cost: 100
            }
        ],
        explanation: 'Schizophrenia is a chronic psychotic disorder affecting ~1% of the population. Positive symptoms (hallucinations, delusions) respond well to antipsychotics. Negative symptoms (social withdrawal, lack of motivation) are harder to treat. Early intervention improves outcomes. Second-generation antipsychotics have fewer movement side effects but more metabolic concerns. Clozapine is reserved for treatment-resistant cases.'
    },
    {
        id: 'ptsd',
        name: 'Post-Traumatic Stress Disorder',
        category: 'Trauma-Related Disorders',
        difficulty: 2,
        symptoms: [
            'Exposure to traumatic event',
            'Intrusive memories, flashbacks, nightmares',
            'Avoidance of trauma-related stimuli',
            'Negative changes in thoughts/mood',
            'Hyperarousal (hypervigilance, startle response)',
            'Duration: 1+ month',
            'Significant distress or impairment'
        ],
        diagnosticCriteria: 'Exposure to actual/threatened death, serious injury, or sexual violence, followed by intrusion, avoidance, negative cognitions, and arousal symptoms for 1+ month.',
        treatments: [
            {
                id: 'ssri_ptsd',
                name: 'SSRI Medication',
                description: 'Sertraline or Paroxetine (FDA-approved for PTSD)',
                effectiveness: 0.65,
                sideEffects: 'Nausea, sexual dysfunction, insomnia',
                cost: 50
            },
            {
                id: 'trauma_focused_therapy',
                name: 'Trauma-Focused Therapy',
                description: 'Prolonged Exposure (PE) or EMDR',
                effectiveness: 0.85,
                sideEffects: 'Temporary distress during processing',
                cost: 150
            },
            {
                id: 'prazosin',
                name: 'Prazosin for Nightmares',
                description: 'Alpha-blocker specifically for trauma-related nightmares',
                effectiveness: 0.70,
                sideEffects: 'Dizziness, orthostatic hypotension',
                cost: 30
            }
        ],
        explanation: 'PTSD develops after experiencing or witnessing trauma. The hallmark is re-experiencing the trauma through flashbacks or nightmares. Trauma-focused therapies like Prolonged Exposure and EMDR are considered first-line and more effective than medication alone. These therapies help process the traumatic memory so it no longer feels current. SSRIs can help with associated depression and anxiety.'
    },
    {
        id: 'ocd',
        name: 'Obsessive-Compulsive Disorder',
        category: 'Obsessive-Compulsive Disorders',
        difficulty: 2,
        symptoms: [
            'Obsessions (intrusive, unwanted thoughts/images/urges)',
            'Compulsions (repetitive behaviors or mental acts)',
            'Time-consuming (>1 hour/day)',
            'Causes significant distress or impairment',
            'Common themes: contamination, harm, symmetry, taboo thoughts',
            'Insight varies (good to absent)'
        ],
        diagnosticCriteria: 'Presence of obsessions, compulsions, or both, that are time-consuming or cause significant distress/impairment.',
        treatments: [
            {
                id: 'high_dose_ssri',
                name: 'High-Dose SSRI',
                description: 'OCD often requires higher SSRI doses than depression',
                effectiveness: 0.70,
                sideEffects: 'Dose-dependent side effects',
                cost: 60
            },
            {
                id: 'erp',
                name: 'Exposure and Response Prevention (ERP)',
                description: 'Gold standard therapy - facing fears without performing compulsions',
                effectiveness: 0.85,
                sideEffects: 'Temporary anxiety during exposures',
                cost: 150
            },
            {
                id: 'act',
                name: 'Acceptance and Commitment Therapy',
                description: 'Learning to accept intrusive thoughts without acting on them',
                effectiveness: 0.75,
                sideEffects: 'None',
                cost: 120
            }
        ],
        explanation: 'OCD involves a cycle of obsessions (intrusive thoughts) and compulsions (behaviors to reduce anxiety). The key insight is that compulsions temporarily relieve anxiety but maintain the disorder long-term. ERP is the gold standard treatment - patients gradually face feared situations while resisting compulsions. This breaks the cycle and teaches the brain that anxiety decreases naturally without rituals.'
    },
    {
        id: 'borderline',
        name: 'Borderline Personality Disorder',
        category: 'Personality Disorders',
        difficulty: 4,
        symptoms: [
            'Fear of abandonment',
            'Unstable, intense relationships',
            'Identity disturbance',
            'Impulsivity (spending, sex, substances, driving, binge eating)',
            'Suicidal behavior or self-harm',
            'Affective instability (intense mood swings)',
            'Chronic feelings of emptiness',
            'Inappropriate anger',
            'Stress-related paranoia or dissociation'
        ],
        diagnosticCriteria: '5+ of the above symptoms, beginning by early adulthood, present in various contexts.',
        treatments: [
            {
                id: 'dbt',
                name: 'Dialectical Behavior Therapy (DBT)',
                description: 'Skills training in mindfulness, emotion regulation, distress tolerance, interpersonal effectiveness',
                effectiveness: 0.85,
                sideEffects: 'Requires high commitment (weekly individual + group)',
                cost: 200
            },
            {
                id: 'schema_therapy',
                name: 'Schema Therapy',
                description: 'Addresses deep-seated patterns from childhood',
                effectiveness: 0.75,
                sideEffects: 'Emotionally intensive',
                cost: 180
            },
            {
                id: 'medication_bpd',
                name: 'Symptom-Targeted Medication',
                description: 'Mood stabilizers, atypical antipsychotics for specific symptoms',
                effectiveness: 0.50,
                sideEffects: 'Varies by medication',
                cost: 80,
                note: 'No medication treats BPD itself, only specific symptoms'
            }
        ],
        explanation: 'BPD is characterized by emotional dysregulation, unstable relationships, and fear of abandonment. DBT is the gold standard treatment, teaching concrete skills for managing intense emotions. The disorder has a good prognosis - many patients experience significant improvement over time. Medications play a limited role, targeting specific symptoms rather than the core disorder. A validating, consistent therapeutic relationship is crucial.'
    },
    {
        id: 'panic',
        name: 'Panic Disorder',
        category: 'Anxiety Disorders',
        difficulty: 1,
        symptoms: [
            'Recurrent unexpected panic attacks',
            'Peak intensity within minutes',
            'Palpitations, sweating, trembling, shortness of breath',
            'Chest pain, nausea, dizziness',
            'Fear of dying, losing control, or "going crazy"',
            'Persistent concern about additional attacks',
            'Maladaptive behavioral changes (avoidance)'
        ],
        diagnosticCriteria: 'Recurrent unexpected panic attacks plus 1+ month of worry about attacks or maladaptive behavior change.',
        treatments: [
            {
                id: 'ssri_panic',
                name: 'SSRI Medication',
                description: 'First-line prevention treatment',
                effectiveness: 0.75,
                sideEffects: 'May initially increase anxiety',
                cost: 50
            },
            {
                id: 'cbt_panic',
                name: 'CBT with Interoceptive Exposure',
                description: 'Learning that physical sensations are not dangerous',
                effectiveness: 0.85,
                sideEffects: 'Temporary discomfort during exercises',
                cost: 120
            },
            {
                id: 'breathing',
                name: 'Breathing Retraining',
                description: 'Diaphragmatic breathing to manage hyperventilation',
                effectiveness: 0.60,
                sideEffects: 'None',
                cost: 0
            }
        ],
        explanation: 'Panic disorder involves recurrent unexpected panic attacks and fear of future attacks. The key maintaining factor is "fear of fear" - misinterpreting normal bodily sensations as dangerous. Interoceptive exposure (deliberately inducing sensations like dizziness or rapid heartbeat) teaches patients these sensations aren\'t harmful. SSRIs reduce attack frequency. Breathing retraining helps manage acute symptoms.'
    },
    {
        id: 'alcohol',
        name: 'Alcohol Use Disorder',
        category: 'Substance-Related Disorders',
        difficulty: 3,
        symptoms: [
            'Drinking more or longer than intended',
            'Unsuccessful attempts to cut down',
            'Spending a lot of time drinking or recovering',
            'Craving alcohol',
            'Failure to fulfill obligations',
            'Continued use despite social/interpersonal problems',
            'Giving up important activities',
            'Using in physically hazardous situations',
            'Continued use despite physical/psychological problems',
            'Tolerance and/or withdrawal'
        ],
        diagnosticCriteria: '2+ symptoms in 12 months. Mild (2-3), Moderate (4-5), Severe (6+).',
        treatments: [
            {
                id: 'naltrexone',
                name: 'Naltrexone',
                description: 'Reduces craving and pleasurable effects of alcohol',
                effectiveness: 0.65,
                sideEffects: 'Nausea, headache, liver toxicity (rare)',
                cost: 100
            },
            {
                id: 'acamprosate',
                name: 'Acamprosate',
                description: 'Helps maintain abstinence by reducing protracted withdrawal',
                effectiveness: 0.60,
                sideEffects: 'Diarrhea, contraindicated in kidney disease',
                cost: 120
            },
            {
                id: 'cbt_sud',
                name: 'CBT for Substance Use',
                description: 'Identifying triggers, developing coping skills, relapse prevention',
                effectiveness: 0.70,
                sideEffects: 'None',
                cost: 150
            },
            {
                id: 'detox',
                name: 'Medical Detoxification',
                description: 'Supervised withdrawal management (if physically dependent)',
                effectiveness: 0.80,
                sideEffects: 'Withdrawal symptoms managed with benzodiazepines',
                cost: 500,
                note: 'Required first step for severe dependence'
            }
        ],
        explanation: 'Alcohol Use Disorder exists on a spectrum from mild to severe. Important: abrupt cessation in dependent individuals can cause life-threatening withdrawal (seizures, delirium tremens) - medical detox may be needed. Naltrexone blocks opioid receptors, reducing alcohol\'s rewarding effects. Acamprosate helps restore brain chemistry. Psychosocial treatments address underlying triggers and build coping skills. AA and other support groups can be valuable adjuncts.'
    },
    {
        id: 'anorexia',
        name: 'Anorexia Nervosa',
        category: 'Eating Disorders',
        difficulty: 4,
        symptoms: [
            'Restriction of energy intake leading to significantly low weight',
            'Intense fear of gaining weight',
            'Distorted body image or undue influence of weight on self-evaluation',
            'Subtypes: Restricting vs. Binge-Eating/Purging',
            'Physical signs: amenorrhea, lanugo, bradycardia, hypotension',
            'Laboratory abnormalities: electrolyte imbalances, anemia'
        ],
        diagnosticCriteria: 'Energy restriction, low weight, fear of weight gain, and disturbed body image.',
        treatments: [
            {
                id: 'fbt',
                name: 'Family-Based Treatment (FBT)',
                description: 'Parents take charge of refeeding (especially for adolescents)',
                effectiveness: 0.75,
                sideEffects: 'Family conflict initially',
                cost: 200,
                note: 'First-line for adolescents'
            },
            {
                id: 'cbt_e',
                name: 'CBT-E (Enhanced)',
                description: 'Specialized CBT for eating disorders addressing overvaluation of shape/weight',
                effectiveness: 0.65,
                sideEffects: 'None',
                cost: 180
            },
            {
                id: 'medical_monitoring',
                name: 'Medical Monitoring & Nutritional Rehabilitation',
                description: 'Weight restoration, monitoring for refeeding syndrome',
                effectiveness: 0.85,
                sideEffects: 'Refeeding syndrome risk if too rapid',
                cost: 300,
                note: 'Essential for medical stability'
            }
        ],
        explanation: 'Anorexia nervosa has the highest mortality rate of any psychiatric disorder. Medical complications include cardiac arrhythmias, osteoporosis, and electrolyte imbalances. Weight restoration is the first priority - cognitive work is difficult when malnourished. FBT empowers parents to support recovery in adolescents. Refeeding must be monitored carefully to prevent refeeding syndrome (potentially fatal electrolyte shifts). Long-term recovery often requires addressing underlying psychological issues.'
    },
    {
        id: 'adhd',
        name: 'Attention-Deficit/Hyperactivity Disorder',
        category: 'Neurodevelopmental Disorders',
        difficulty: 2,
        symptoms: [
            'Inattention (careless mistakes, difficulty sustaining attention, disorganization)',
            'Hyperactivity (fidgeting, leaving seat, running/climbing, talking excessively)',
            'Impulsivity (blurting answers, interrupting, difficulty waiting turn)',
            'Symptoms present before age 12',
            'Present in 2+ settings (home, work, school)',
            'Clear evidence of interference with functioning',
            'Not better explained by another disorder'
        ],
        diagnosticCriteria: '5+ symptoms of inattention and/or hyperactivity-impulsivity for 6+ months, present before age 12, in multiple settings.',
        treatments: [
            {
                id: 'stimulant',
                name: 'Stimulant Medication',
                description: 'Methylphenidate or Amphetamine preparations - first-line treatment',
                effectiveness: 0.85,
                sideEffects: 'Decreased appetite, insomnia, increased heart rate',
                cost: 80
            },
            {
                id: 'non_stimulant',
                name: 'Non-Stimulant Medication',
                description: 'Atomoxetine, Guanfacine - alternatives or adjuncts',
                effectiveness: 0.65,
                sideEffects: 'Fatigue, GI upset, gradual onset of action',
                cost: 100
            },
            {
                id: 'cbt_adhd',
                name: 'CBT for ADHD',
                description: 'Organizational skills, time management, addressing negative self-talk',
                effectiveness: 0.60,
                sideEffects: 'None',
                cost: 120
            },
            {
                id: 'accommodations',
                name: 'Environmental Accommodations',
                description: 'Workplace/school adjustments, coaching, planners, reminders',
                effectiveness: 0.70,
                sideEffects: 'None',
                cost: 0
            }
        ],
        explanation: 'ADHD is a neurodevelopmental disorder affecting executive functions. Stimulants increase dopamine and norepinephrine in prefrontal cortex, improving focus and impulse control. Despite concerns, properly prescribed stimulants do NOT increase addiction risk and actually reduce it by treating the underlying disorder. Non-stimulants are options for those who don\'t tolerate stimulants. Behavioral strategies and accommodations are essential complements to medication.'
    }
];

// Patient Cases
const PATIENT_CASES = [
    {
        id: 1,
        name: "Sarah M.",
        age: 28,
        gender: "Female",
        occupation: "Marketing Coordinator",
        chiefComplaint: "I just can't seem to find joy in anything anymore. Everything feels... gray.",
        history: "Patient reports 3-month history of persistent low mood, loss of interest in previously enjoyed activities (stopped attending yoga classes, no longer meets friends for dinner). Sleeps 10-12 hours but still feels tired. Reports 8-lb weight gain due to increased appetite. Difficulty concentrating at work - made several errors on projects. States 'I feel like a burden to everyone.' Denies active suicidal ideation but says 'life feels pointless sometimes.' No prior psychiatric history. Works full-time but struggling to keep up.",
        mentalStatus: {
            appearance: "Well-groomed but appears fatigued",
            behavior: "Psychomotor retardation noted",
            speech: "Soft, slow, monotone",
            mood: "Depressed",
            affect: "Restricted, congruent with mood",
            thoughtProcess: "Linear but slowed",
            thoughtContent: "Negative self-view, no psychosis",
            cognition: "Difficulty with concentration"
        },
        correctDiagnosis: 'depression',
        urgency: 'medium',
        consultationTime: 45,
        potentialEarn: 150,
        reputationGain: 15
    },
    {
        id: 2,
        name: "Michael T.",
        age: 35,
        gender: "Male",
        occupation: "Software Engineer",
        chiefComplaint: "My mind never stops racing. I'm constantly worried about everything.",
        history: "Reports lifelong tendency to worry, but significantly worsened over past year. Worries about work performance, health, finances, relationships - acknowledges worries are excessive but can't stop. Experiences muscle tension (especially neck/shoulders), restlessness ('feels like I need to pace'), and difficulty falling asleep due to racing thoughts. Wife complains he's always irritable. Missed several work deadlines due to perfectionism and difficulty concentrating. Drinks 3-4 cups coffee daily to cope with fatigue.",
        mentalStatus: {
            appearance: "Casual dress, appears restless",
            behavior: "Fidgety, foot tapping",
            speech: "Rapid, pressured at times",
            mood: "Anxious",
            affect: "Wide-ranging but tense",
            thoughtProcess: "Racing, jumps between topics",
            thoughtContent: "Multiple worries, no psychosis",
            cognition: "Intact but distracted"
        },
        correctDiagnosis: 'anxiety',
        urgency: 'low',
        consultationTime: 40,
        potentialEarn: 120,
        reputationGain: 12
    },
    {
        id: 3,
        name: "Jessica L.",
        age: 24,
        gender: "Female",
        occupation: "Graduate Student",
        chiefComplaint: "One week I'm on top of the world, the next I can't get out of bed.",
        history: "History of mood swings since college. Currently in depressive episode (2 weeks): sleeping 14 hours/day, hasn't attended classes, states 'I'm worthless.' Reports previous 4-day period 3 months ago where she slept only 2 hours/night, started 3 different business plans, spent $3000 on credit cards, and felt 'invincible.' During that time, gave a 2-hour presentation to classmates about her 'brilliant ideas.' Friends were concerned about her behavior. No substance use. Family history positive for 'mood disorder' in mother.",
        mentalStatus: {
            appearance: "Disheveled, dark circles under eyes",
            behavior: "Psychomotor retardation currently",
            speech: "Slow, low volume",
            mood: "Depressed",
            affect: "Congruent, tearful at times",
            thoughtProcess: "Slowed",
            thoughtContent: "Hopelessness, no active SI",
            cognition: "Poor concentration"
        },
        correctDiagnosis: 'bipolar',
        urgency: 'high',
        consultationTime: 50,
        potentialEarn: 200,
        reputationGain: 25
    },
    {
        id: 4,
        name: "David R.",
        age: 42,
        gender: "Male",
        occupation: "Unemployed (formerly Accountant)",
        chiefComplaint: "The voices won't stop telling me I'm being watched.",
        history: "First episode at age 22, hospitalized twice. Stopped medications 6 months ago because 'they make me feel like a zombie.' Reports auditory hallucinations: voices comment on his actions and say government is tracking him through TV. Believes neighbors are sending him messages through their lights. Speaks to himself occasionally. Poor self-care, lives in subsidized housing. Sister reports he's become increasingly isolated. Denies suicidal ideation. No substance use.",
        mentalStatus: {
            appearance: "Disheveled, poor hygiene",
            behavior: "Occasionally looks around room suspiciously",
            speech: "Tangential at times",
            mood: "Anxious",
            affect: "Blunted",
            thoughtProcess: "Loose associations",
            thoughtContent: "Paranoid delusions, auditory hallucinations",
            cognition: "Appears intact but poor attention"
        },
        correctDiagnosis: 'schizophrenia',
        urgency: 'high',
        consultationTime: 50,
        potentialEarn: 200,
        reputationGain: 30
    },
    {
        id: 5,
        name: "Amanda K.",
        age: 31,
        gender: "Female",
        occupation: "Nurse",
        chiefComplaint: "I keep reliving the accident. I can't sleep, I can't function.",
        history: "Motor vehicle accident 8 months ago - patient was driving, another car ran red light, passenger in other car died. Since then: weekly nightmares about accident, avoids driving on that road (takes 30-min detour to work), startled by sudden noises, feels 'numb' emotionally, guilty about surviving ('why did I live when he died?'). Increased alcohol use (2-3 glasses wine nightly to sleep). Previously high-performing nurse, now considering leaving profession. No prior psychiatric history.",
        mentalStatus: {
            appearance: "Professional attire, appears tired",
            behavior: "Startled when door slammed during interview",
            speech: "Normal rate and tone",
            mood: "Sad, anxious",
            affect: "Restricted, especially when discussing trauma",
            thoughtProcess: "Linear",
            thoughtContent: "Guilt related to trauma, no psychosis",
            cognition: "Intact"
        },
        correctDiagnosis: 'ptsd',
        urgency: 'medium',
        consultationTime: 45,
        potentialEarn: 160,
        reputationGain: 18
    },
    {
        id: 6,
        name: "Robert H.",
        age: 26,
        gender: "Male",
        occupation: "Teacher",
        chiefComplaint: "I know my thoughts are irrational, but I can't stop myself from checking things.",
        history: "Reports intrusive thoughts about harming students accidentally (leaving stove on, doors unlocked). Spends 2-3 hours daily checking locks, stove, email drafts. Arrives late to work frequently. Understands thoughts are excessive ('I know I locked it') but anxiety becomes unbearable without checking. Avoids using kitchen knives at home. Symptoms worsening over 2 years. No depression, no substance use. Previously high-functioning, now receiving warnings at work.",
        mentalStatus: {
            appearance: "Neat, professional",
            behavior: "Repeatedly checks phone during session",
            speech: "Normal",
            mood: "Anxious, frustrated",
            affect: "Congruent",
            thoughtProcess: "Linear, detailed",
            thoughtContent: "Intrusive harm thoughts, good insight",
            cognition: "Intact"
        },
        correctDiagnosis: 'ocd',
        urgency: 'medium',
        consultationTime: 45,
        potentialEarn: 160,
        reputationGain: 18
    },
    {
        id: 7,
        name: "Emily S.",
        age: 23,
        gender: "Female",
        occupation: "Bartender",
        chiefComplaint: "Everyone always leaves me. I do something wrong and they're gone.",
        history: "Pattern of intense, unstable relationships since adolescence. Current boyfriend threatens breakup after she called him 47 times in one night when he didn't answer. History of self-harm (cutting arms, last episode 2 weeks ago after argument with friend). Impulsive spending (maxed out 3 credit cards), occasional binge drinking. Rapid mood shifts - 'happy to furious in minutes.' Chronic feelings of emptiness. Multiple ER visits for suicidal gestures (overdoses that weren't lethal). Childhood history of neglect.",
        mentalStatus: {
            appearance: "Trendy clothing, visible scars on arms",
            behavior: "Intense eye contact, then looks away",
            speech: "Rapid, emotional",
            mood: "Labile",
            affect: "Intense, rapidly shifting",
            thoughtProcess: "Circular when discussing relationships",
            thoughtContent: "Fear of abandonment, no psychosis",
            cognition: "Intact"
        },
        correctDiagnosis: 'borderline',
        urgency: 'high',
        consultationTime: 50,
        potentialEarn: 200,
        reputationGain: 25
    },
    {
        id: 8,
        name: "Christopher B.",
        age: 29,
        gender: "Male",
        occupation: "Sales Representative",
        chiefComplaint: "Out of nowhere, my heart starts racing and I think I'm having a heart attack.",
        history: "First panic attack 6 months ago at work - sudden onset of palpitations, sweating, trembling, shortness of breath, fear of dying. Lasted 15 minutes. Since then, has had 5 more attacks. Now avoids exercising (fears elevated heart rate), stopped drinking coffee, carries water bottle everywhere 'just in case.' Went to ER twice - cardiac workup negative. Worried about having another attack ('what if I pass out during a presentation?'). No depression, no substance use.",
        mentalStatus: {
            appearance: "Business casual, well-groomed",
            behavior: "Restless, checks watch frequently",
            speech: "Normal",
            mood: "Anxious",
            affect: "Congruent",
            thoughtProcess: "Linear",
            thoughtContent: "Health anxiety, fear of future attacks",
            cognition: "Intact"
        },
        correctDiagnosis: 'panic',
        urgency: 'low',
        consultationTime: 40,
        potentialEarn: 120,
        reputationGain: 12
    },
    {
        id: 9,
        name: "Thomas W.",
        age: 45,
        gender: "Male",
        occupation: "Construction Worker",
        chiefComplaint: "My wife says I have a problem with drinking. She might be right.",
        history: "Drinks 6-8 beers nightly, more on weekends (12+). Needs to drink to 'unwind' from physically demanding job. Tried to quit 3 months ago - experienced shaking, sweating, couldn't sleep. Missed 8 days of work last month due to hangovers. DUI arrest 4 months ago (first offense). Wife threatens to leave. Continues drinking despite knee problems (doctor said alcohol worsens inflammation). Morning hand tremors that improve after drinking. No prior treatment.",
        mentalStatus: {
            appearance: "Large build, slight tremor in hands",
            behavior: "Avoids eye contact when discussing drinking",
            speech: "Normal",
            mood: "Guilty, defensive",
            affect: "Congruent",
            thoughtProcess: "Linear",
            thoughtContent: "Ambivalence about quitting',
            cognition: "Intact, possible mild memory issues"
        },
        correctDiagnosis: 'alcohol',
        urgency: 'high',
        consultationTime: 50,
        potentialEarn: 180,
        reputationGain: 22
    },
    {
        id: 10,
        name: "Olivia P.",
        age: 19,
        gender: "Female",
        occupation: "College Student",
        chiefComplaint: "My parents are making me come here. They say I'm too thin.",
        history: "Brought by parents who are 'very worried.' Lost 25 lbs over 6 months (from 125 to 100 lbs, height 5'6\"). Restricts food to <800 cal/day, exercises 2 hours daily. Preoccupied with food, reads nutrition labels obsessively. Believes she's 'still too fat' especially around abdomen. Amenorrhea for 4 months. Parents report she's withdrawn from friends, irritable when asked about eating. Previously high-achieving student, now struggling academically. Denies problem - 'I just want to be healthy.'",
        mentalStatus: {
            appearance: "Thin, wears baggy clothes, dry skin",
            behavior: "Resistant, minimal eye contact",
            speech: "Minimal, monotone",
            mood: "Irritable",
            affect: "Restricted",
            thoughtProcess: "Rigid around food topics",
            thoughtContent: "Body image distortion, denies severity",
            cognition: "Intact but preoccupied"
        },
        correctDiagnosis: 'anorexia',
        urgency: 'high',
        consultationTime: 50,
        potentialEarn: 200,
        reputationGain: 28
    },
    {
        id: 11,
        name: "Jake M.",
        age: 16,
        gender: "Male",
        occupation: "High School Student",
        chiefComplaint: "School says I need an evaluation before they'll let me take my meds.",
        history: "Diagnosed with ADHD at age 8, treated with methylphenidate until age 14 when he stopped taking it ('I didn't need it'). Teachers report: frequently loses assignments, talks during lectures, turns in incomplete work, fidgets constantly. Parents report: forgets chores, loses belongings, interrupts conversations, can't sit through family dinners. Started failing 2 classes this semester. IQ testing shows superior intelligence - teachers say he's 'not living up to potential.' No depression, minimal anxiety.",
        mentalStatus: {
            appearance: "Teenager, casual dress",
            behavior: "Constantly fidgeting, gets up once during session",
            speech: "Talkative, interrupts occasionally",
            mood: "Neutral",
            affect: "Congruent",
            thoughtProcess: "Jumps between topics",
            thoughtContent: "No psychosis",
            cognition: "Bright but distractible"
        },
        correctDiagnosis: 'adhd',
        urgency: 'low',
        consultationTime: 40,
        potentialEarn: 130,
        reputationGain: 14
    }
];

// Shop Items
const SHOP_ITEMS = {
    books: [
        {
            id: 'dsm5',
            name: 'DSM-5 Reference Guide',
            description: 'Comprehensive diagnostic criteria for all psychiatric conditions. Unlocks condition details in-game.',
            price: 200,
            icon: 'fa-book-medical',
            benefit: 'Shows detailed symptom lists for all conditions',
            unlocks: 'all_conditions'
        },
        {
            id: 'psychopharm',
            name: 'Psychopharmacology Textbook',
            description: 'Advanced guide to psychiatric medications, mechanisms, and interactions.',
            price: 300,
            icon: 'fa-pills',
            benefit: 'Shows detailed medication information and side effects',
            unlocks: 'medication_details'
        },
        {
            id: 'psychotherapy',
            name: 'Psychotherapy Techniques',
            description: 'Evidence-based therapy approaches for various conditions.',
            price: 250,
            icon: 'fa-comments',
            benefit: 'Shows therapy effectiveness ratings',
            unlocks: 'therapy_details'
        },
        {
            id: 'case_studies',
            name: 'Clinical Case Studies',
            description: 'Collection of real-world cases with expert commentary.',
            price: 180,
            icon: 'fa-folder-open',
            benefit: '+10% diagnosis accuracy bonus',
            unlocks: 'accuracy_bonus'
        }
    ],
    equipment: [
        {
            id: 'assessment_tools',
            name: 'Standardized Assessment Tools',
            description: 'PHQ-9, GAD-7, Y-BOCS, and other validated screening instruments.',
            price: 150,
            icon: 'fa-clipboard-check',
            benefit: 'Provides symptom severity scores',
            unlocks: 'assessment_scores'
        },
        {
            id: 'lab_access',
            name: 'Laboratory Access',
            description: 'Order basic labs to rule out medical causes (TSH, B12, CBC, CMP).',
            price: 400,
            icon: 'fa-flask',
            benefit: 'Can order labs to rule out medical mimics',
            unlocks: 'lab_orders'
        },
        {
            id: 'supervised_note',
            name: 'Supervised Note-Taking App',
            description: 'Digital system for organizing patient information efficiently.',
            price: 100,
            icon: 'fa-laptop-medical',
            benefit: '+5 min extra consultation time per patient',
            unlocks: 'extra_time'
        },
        {
            id: 'telepsychiatry',
            name: 'Telepsychiatry Platform',
            description: 'Video conferencing setup for remote consultations.',
            price: 350,
            icon: 'fa-video',
            benefit: 'Attracts more patients per day',
            unlocks: 'more_patients'
        }
    ],
    upgrades: [
        {
            id: 'office_decor',
            name: 'Office Decoration Upgrade',
            description: 'Create a calming, professional environment for patients.',
            price: 200,
            icon: 'fa-couch',
            benefit: '+$20 per consultation fee',
            unlocks: 'fee_increase_1'
        },
        {
            id: 'waiting_room',
            name: 'Waiting Room Renovation',
            description: 'Comfortable seating, magazines, water station.',
            price: 300,
            icon: 'fa-chair',
            benefit: 'Improved patient satisfaction (+5 reputation per case)',
            unlocks: 'rep_bonus'
        },
        {
            id: 'clinic_expansion',
            name: 'Clinic Expansion',
            description: 'Add a second consultation room.',
            price: 600,
            icon: 'fa-building',
            benefit: 'Can see 2 patients simultaneously',
            unlocks: 'double_patients'
        },
        {
            id: 'premium_location',
            name: 'Premium Location Move',
            description: 'Relocate clinic to upscale neighborhood.',
            price: 1000,
            icon: 'fa-map-marker-alt',
            benefit: '+$50 per consultation, attracts complex cases',
            unlocks: 'premium_cases'
        }
    ]
};

// Tutorial Tips
const TUTORIAL_TIPS = [
    "Take your time reading patient histories - key diagnostic clues are often in the details.",
    "Consider multiple diagnoses before committing. What else could explain these symptoms?",
    "Remember: medications treat symptoms, therapy addresses root causes. Often you need both.",
    "Urgency matters! High-urgency patients may have safety concerns that need immediate attention.",
    "Don't forget to check the Quick Reference panel for diagnostic criteria.",
    "Invest in books and equipment early - they pay for themselves in improved accuracy.",
    "Balance earning money with learning. A knowledgeable doctor makes fewer costly mistakes.",
    "Some conditions look similar - Bipolar Depression vs. Major Depression, for example. Look for history of mania!",
    "Treatment isn't one-size-fits-all. Consider patient preferences, side effects, and cost.",
    "Building a successful practice takes time. Don't get discouraged by early mistakes!"
];
