
SYNONYM_MAP = [
    # Diabetes
    (["excessive thirst", "polydipsia", "always thirsty", "extreme thirst", "increased thirst"],
     ["irregular_sugar_level", "fatigue", "weight_loss"]),
    (["frequent urination", "urinating often", "urinate at night", "polyuria", "peeing a lot"],
     ["irregular_sugar_level", "restlessness"]),
    (["unexplained weight loss", "losing weight", "sudden weight loss"],
     ["weight_loss", "lethargy"]),
    (["extreme hunger", "increased hunger", "always hungry", "polyphagia", "excessive hunger"],
     ["irregular_sugar_level", "restlessness"]),
    (["blurry vision", "blurred vision", "vision blurred", "blurring of vision"],
     ["blurred_vision"]),

    # Common Cold / Flu
    (["runny nose", "stuffy nose", "blocked nose", "nasal congestion"],
     ["continuous_sneezing", "runny_nose"]),
    (["sneezing", "continuous sneezing"],
     ["continuous_sneezing"]),
    (["sore throat", "throat pain", "scratchy throat"],
     ["throat_irritation"]),

    # Heart Disease
    (["chest pain", "chest tightness", "chest pressure", "heart pain"],
     ["chest_pain"]),
    (["shortness of breath", "breathing difficulty", "breathlessness", "hard to breathe"],
     ["breathlessness"]),
    (["palpitations", "heart racing", "fast heartbeat", "irregular heartbeat"],
     ["palpitations", "fast_heart_rate"]),

    # Hypertension
    (["high blood pressure", "hypertension", "elevated bp"],
     ["headache", "dizziness"]),

    # Migraine
    (["severe headache", "pounding headache", "throbbing headache", "migraine"],
     ["headache", "nausea"]),

    # Sleep
    (["insomnia", "can't sleep", "trouble sleeping", "sleep problems"],
     ["restlessness", "lethargy"]),

    # Fatigue / General
    (["fatigue", "extreme fatigue", "tiredness", "exhaustion", "very tired"],
     ["fatigue", "lethargy"]),
    (["fever", "high fever", "mild fever", "temperature"],
     ["high_fever"]),
    (["nausea", "nauseated", "feeling sick", "want to vomit"],
     ["nausea"]),
    (["vomiting", "throwing up"],
     ["vomiting"]),
    (["dizziness", "feeling dizzy", "lightheaded"],
     ["dizziness"]),

    # Kidney
    (["back pain", "lower back pain", "kidney pain"],
     ["back_pain"]),
    (["swelling", "swollen feet", "swollen legs", "edema"],
     ["swelling_of_stomach"]),

    # Skin
    (["itching", "itchy skin", "itchiness"],
     ["itching"]),
    (["rash", "skin rash", "redness on skin"],
     ["skin_rash"]),

    # Mental health
    (["anxiety", "anxious", "panic attacks"],
     ["anxiety"]),
    (["depression", "feeling depressed", "sad", "hopeless"],
     ["depression"]),
]


def normalize_symptoms(text: str) -> str:
    text_lower = text.lower()
    extra_keywords = []

    for phrases, keywords in SYNONYM_MAP:
        for phrase in phrases:
            if phrase in text_lower:
                extra_keywords.extend(keywords)
                break  

    if extra_keywords:
        unique_extras = list(dict.fromkeys(extra_keywords))
        return text + " " + " ".join(unique_extras)

    return text
