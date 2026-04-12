import os
import pandas as pd

BASE_DIR     = os.path.dirname(os.path.abspath(__file__))
DATASETS_DIR = os.path.join(BASE_DIR, "..", "datasets")

_precaution_df  = pd.read_csv(os.path.join(DATASETS_DIR, "symptom_precaution.csv"))
_description_df = pd.read_csv(os.path.join(DATASETS_DIR, "symptom_Description.csv"))

_precaution_df["Disease_lower"]  = _precaution_df["Disease"].str.lower().str.strip()
_description_df["Disease_lower"] = _description_df["Disease"].str.lower().str.strip()

def _lifestyle_tips(bmi, sleep, diet):
    tips = []
    if bmi is not None:
        if bmi >= 35:
            tips.append({"icon": "⚖️", "urgency": "warn",
                "title": "Obesity management",
                "desc": f"Your BMI is {bmi} (obese range). Consider consulting a nutritionist and starting a structured weight-loss programme."})
        elif bmi >= 25:
            tips.append({"icon": "🥗", "urgency": "ok",
                "title": "Weight management",
                "desc": f"Your BMI is {bmi} (overweight). Aim for 30 minutes of moderate exercise daily and reduce processed food intake."})

    if sleep is not None:
        if sleep < 5:
            tips.append({"icon": "😴", "urgency": "danger",
                "title": "Critical sleep deficit",
                "desc": f"You are sleeping only {sleep} hrs/night. Chronic sleep deprivation raises cardiovascular and metabolic risk significantly. Aim for 7–9 hrs."})
        elif sleep < 7:
            tips.append({"icon": "🌙", "urgency": "warn",
                "title": "Improve sleep duration",
                "desc": f"You sleep {sleep} hrs/night. Adults need 7–9 hrs. Try a consistent sleep schedule and reduce screen time before bed."})

    if diet:
        diet_l = diet.lower()
        if "keto" in diet_l:
            tips.append({"icon": "🫀", "urgency": "warn",
                "title": "Keto diet — monitor heart health",
                "desc": "Long-term ketogenic diets may raise LDL cholesterol. Get lipid panel checked every 6 months."})
        elif "vegan" in diet_l or "vegetarian" in diet_l:
            tips.append({"icon": "💊", "urgency": "ok",
                "title": "Supplement B12 & Iron",
                "desc": "Plant-based diets can be low in Vitamin B12 and Iron. Consider regular blood tests and supplements if needed."})

    return tips


def _get_precautions(disease_name):
    key = disease_name.lower().strip()
    row = _precaution_df[_precaution_df["Disease_lower"].str.contains(key, na=False)]
    if row.empty:
        first_word = key.split()[0]
        row = _precaution_df[_precaution_df["Disease_lower"].str.contains(first_word, na=False)]
    if row.empty:
        return []
    cols = [c for c in row.columns if c.lower().startswith("precaution")]
    return [str(v).strip() for v in row.iloc[0][cols].dropna().values if str(v).strip()]


def _get_description(disease_name):
    key = disease_name.lower().strip()
    row = _description_df[_description_df["Disease_lower"].str.contains(key, na=False)]
    if row.empty:
        return None
    return str(row.iloc[0]["Description"]).strip()


def _urgency(risk_label):
    return {"High": "danger", "Moderate": "warn", "Low": "ok"}.get(risk_label, "ok")

def get_recommendations(structured_risks, symptom_predictions, bmi=None, sleep=None, diet=None):
    sections = []

    urgent = [d for d in structured_risks if d["risk"] == "High"]
    urgent += [d for d in symptom_predictions if d["risk"] == "High"]
    if urgent:
        items = []
        for d in urgent:
            items.append({
                "icon": "🚨",
                "urgency": "danger",
                "title": f"Consult a doctor — {d['disease']} ({d['probability']}% risk)",
                "desc": f"High risk detected. Please see a healthcare professional promptly. Do not ignore symptoms."
            })
        sections.append({"group": "Immediate Actions", "items": items})

    top_disease = None
    if symptom_predictions:
        top_disease = symptom_predictions[0]["disease"]
    elif structured_risks:
        top_disease = max(structured_risks, key=lambda x: x["probability"])["disease"]

    if top_disease:
        precautions = _get_precautions(top_disease)
        description = _get_description(top_disease)
        if precautions:
            risk_tag = _urgency(
                next((d["risk"] for d in (symptom_predictions + structured_risks)
                      if d["disease"] == top_disease), "Moderate")
            )
            items = [{"icon": "📋", "urgency": risk_tag,
                      "title": p.capitalize(), "desc": ""} for p in precautions]
            sections.append({
                "group": f"Precautions for {top_disease}",
                "description": description,
                "items": items
            })

    lifestyle = _lifestyle_tips(bmi, sleep, diet)
    if lifestyle:
        sections.append({"group": "Lifestyle Adjustments", "items": lifestyle})
    moderate = [d for d in (structured_risks + symptom_predictions) if d["risk"] == "Moderate"]
    if moderate:
        items = []
        for d in moderate:
            items.append({
                "icon": "📊",
                "urgency": "warn",
                "title": f"Monitor {d['disease']} markers",
                "desc": f"{d['probability']}% risk detected. Schedule a check-up and track relevant biomarkers over the next 3 months."
            })
        sections.append({"group": "Conditions to Monitor", "items": items})

    sections.append({
        "group": "Suggested Follow-up Tests",
        "items": [
            {"icon": "🩸", "urgency": "ok", "title": "Complete Blood Count (CBC)", "desc": "Screens for anaemia, infection, and immune system issues."},
            {"icon": "💧", "urgency": "ok", "title": "Fasting blood glucose", "desc": "Checks for diabetes and pre-diabetic markers."},
            {"icon": "❤️", "urgency": "ok", "title": "Lipid panel", "desc": "Measures cholesterol and triglyceride levels for cardiovascular risk."},
        ]
    })

    return sections
