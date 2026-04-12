import numpy as np
from scipy.sparse import hstack, csr_matrix
from model_loader import unified_model, vectorizer, label_encoder, scaler, model_meta
from symptom_normalizer import normalize_symptoms


def _diet_encode(diet_str):
    mapping = {
        "balanced": 0.0,
        "vegetarian": 0.3,
        "vegan": 0.3,
        "keto / low-carb": 0.7,
        "keto": 0.7,
        "high-protein": 0.7,
        "other": 0.5,
    }
    return mapping.get(str(diet_str).lower().strip(), 0.5)


def _gender_encode(gender_str):
    g = str(gender_str).lower().strip()
    if g in ("male", "m"):
        return 1.0
    elif g in ("female", "f"):
        return 0.0
    return 0.5


def _risk_label(pct):
    if pct >= 65:
        return "High"
    elif pct >= 35:
        return "Moderate"
    else:
        return "Low"


def predict_unified(age, bmi, sleep, diet, gender, symptoms, top_n=5):
    clean_symptoms = normalize_symptoms(symptoms.lower().strip())
    clean_symptoms = clean_symptoms.replace("_", " ")
    X_tfidf = vectorizer.transform([clean_symptoms])

    g = _gender_encode(gender)
    d = _diet_encode(diet)
    numeric_raw = np.array([[float(age), g, float(bmi), float(sleep), d]])
    numeric_scaled = scaler.transform(numeric_raw)
    X_numeric = csr_matrix(numeric_scaled)

    X_combined = hstack([X_tfidf, X_numeric])

    probabilities = unified_model.predict_proba(X_combined)[0]

    top_idx = probabilities.argsort()[-top_n:][::-1]
    results = []
    for i in top_idx:
        prob_pct = round(float(probabilities[i]) * 100, 1)
        results.append({
            "disease":     label_encoder.classes_[i],
            "probability": prob_pct,
            "risk":        _risk_label(prob_pct),
        })

    return results