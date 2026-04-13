import os
import json
import pandas as pd
from dotenv import load_dotenv
from google import genai

load_dotenv()

BASE_DIR     = os.path.dirname(os.path.abspath(__file__))
DATASETS_DIR = os.path.join(BASE_DIR, "..", "datasets")

_precaution_df  = pd.read_csv(os.path.join(DATASETS_DIR, "symptom_precaution.csv"))
_description_df = pd.read_csv(os.path.join(DATASETS_DIR, "symptom_Description.csv"))

_precaution_df["Disease_lower"]  = _precaution_df["Disease"].str.lower().str.strip()
_description_df["Disease_lower"] = _description_df["Disease"].str.lower().str.strip()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")
_gemini_client = None

if GEMINI_API_KEY:
    try:
        _gemini_client = genai.Client(api_key=GEMINI_API_KEY)
        print("[OK] Gemini API configured successfully")
    except Exception as e:
        print(f"[WARN] Gemini setup failed: {e}. Using fallback recommendations.")


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


def _gemini_recommendations(predictions, bmi, sleep, diet):
    if not _gemini_client or not predictions:
        return None

    diseases_text = "\n".join(
        [f"- {d['disease']}: {d['probability']}% risk ({d['risk']})" for d in predictions]
    )

    prompt = f"""You are a medical health advisor AI. Based on the following AI-predicted disease risks and patient vitals, provide personalized health recommendations.

PREDICTED DISEASES:
{diseases_text}

PATIENT VITALS:
- BMI: {bmi}
- Sleep: {sleep} hours/night
- Diet type: {diet}

Respond ONLY with valid JSON in this exact format (no markdown, no code blocks):
{{
  "ai_insights": {{
    "summary": "A 2-3 sentence overall health assessment based on the predictions.",
    "risk_level": "High/Moderate/Low"
  }},
  "recommendations": [
    {{
      "icon": "emoji",
      "urgency": "danger/warn/ok",
      "title": "Short actionable title",
      "desc": "Detailed 1-2 sentence recommendation."
    }}
  ],
  "diet_plan": [
    {{
      "icon": "emoji",
      "urgency": "ok",
      "title": "Dietary recommendation title",
      "desc": "Specific dietary advice."
    }}
  ],
  "tests": [
    {{
      "icon": "emoji",
      "urgency": "ok/warn",
      "title": "Test name",
      "desc": "Why this test is needed."
    }}
  ]
}}

Rules:
- Give 3-5 actionable recommendations
- Give 2-3 specific diet suggestions based on predicted diseases and current diet
- Give 2-4 medical tests that should be done
- Use urgency "danger" for high-risk items, "warn" for moderate, "ok" for general advice
- Be specific and personalized, not generic
- Use appropriate emojis for icons"""

    try:
        response = _gemini_client.models.generate_content(
            model="gemini-2.0-flash",
            contents=prompt
        )
        text = response.text.strip()

        if text.startswith("```"):
            text = text.split("\n", 1)[1]
            if text.endswith("```"):
                text = text[:-3]
            text = text.strip()

        data = json.loads(text)
        return data
    except Exception as e:
        print(f"[WARN] Gemini API error: {e}")
        return None


def _fallback_recommendations(structured_risks, symptom_predictions, bmi, sleep, diet):
    sections = []

    urgent = [d for d in structured_risks if d["risk"] == "High"]
    urgent += [d for d in symptom_predictions if d["risk"] == "High"]
    if urgent:
        items = []
        for d in urgent:
            items.append({
                "icon": "!", "urgency": "danger",
                "title": f"Consult a doctor - {d['disease']} ({d['probability']}% risk)",
                "desc": "High risk detected. Please see a healthcare professional promptly."
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
            items = [{"icon": "i", "urgency": risk_tag,
                      "title": p.capitalize(), "desc": ""} for p in precautions]
            sections.append({
                "group": f"Precautions for {top_disease}",
                "description": description,
                "items": items
            })

    if bmi and bmi >= 25:
        sections.append({"group": "Lifestyle Adjustments", "items": [
            {"icon": "!", "urgency": "warn", "title": "Weight management",
             "desc": f"BMI is {bmi}. Aim for 30 min exercise daily."}
        ]})

    diet_items = []
    diet_lower = str(diet).lower().strip() if diet else "balanced"
    if diet_lower in ("keto", "keto / low-carb", "high-protein"):
        diet_items.append({
            "icon": "🥦", "urgency": "warn",
            "title": "Increase fibre intake",
            "desc": "Low-carb diets can lack fibre. Add leafy greens, chia seeds, and flaxseeds."
        })
    if diet_lower in ("vegan", "vegetarian"):
        diet_items.append({
            "icon": "💊", "urgency": "warn",
            "title": "Monitor B12 & iron levels",
            "desc": "Plant-based diets may lack vitamin B12 and heme iron. Consider fortified foods or supplements."
        })
    diet_items.extend([
        {"icon": "🥗", "urgency": "ok",
         "title": "Eat more whole foods",
         "desc": "Prioritise whole grains, fresh vegetables, lean protein, and healthy fats over processed food."},
        {"icon": "💧", "urgency": "ok",
         "title": "Stay well hydrated",
         "desc": "Aim for 8–10 glasses of water daily. Proper hydration supports metabolism and organ function."},
        {"icon": "🍎", "urgency": "ok",
         "title": "Include antioxidant-rich fruits",
         "desc": "Berries, citrus, and pomegranates help reduce inflammation and support immune health."},
    ])
    if bmi and bmi >= 25:
        diet_items.append({
            "icon": "⚖️", "urgency": "warn",
            "title": "Reduce calorie-dense foods",
            "desc": f"With a BMI of {bmi}, consider portion control and limiting sugary drinks and fried foods."
        })
    sections.append({"group": "Diet & Nutrition Plan", "items": diet_items})

    sections.append({
        "group": "Suggested Follow-up Tests",
        "items": [
            {"icon": "+", "urgency": "ok", "title": "Complete Blood Count (CBC)",
             "desc": "Screens for anaemia, infection, and immune system issues."},
            {"icon": "+", "urgency": "ok", "title": "Fasting blood glucose",
             "desc": "Checks for diabetes and pre-diabetic markers."},
            {"icon": "+", "urgency": "ok", "title": "Lipid panel",
             "desc": "Measures cholesterol and triglyceride levels."},
        ]
    })

    return sections


def get_recommendations(structured_risks, symptom_predictions, bmi=None, sleep=None, diet=None):
    all_predictions = symptom_predictions + structured_risks
    gemini_data = _gemini_recommendations(all_predictions, bmi, sleep, diet)

    if gemini_data:
        sections = []

        ai = gemini_data.get("ai_insights", {})
        if ai.get("summary"):
            sections.append({
                "group": "AI Health Assessment",
                "description": ai["summary"],
                "items": [{
                    "icon": "🤖", "urgency": _urgency(ai.get("risk_level", "Moderate")),
                    "title": f"Overall risk: {ai.get('risk_level', 'Moderate')}",
                    "desc": ai["summary"]
                }]
            })

        top_disease = symptom_predictions[0]["disease"] if symptom_predictions else None
        if not top_disease and structured_risks:
            top_disease = max(structured_risks, key=lambda x: x["probability"])["disease"]
        if top_disease:
            description = _get_description(top_disease)
            precautions = _get_precautions(top_disease)
            if precautions:
                risk_tag = _urgency(
                    next((d["risk"] for d in (symptom_predictions + structured_risks)
                          if d["disease"] == top_disease), "Moderate")
                )
                items = [{"icon": "🛡️", "urgency": risk_tag,
                          "title": p.capitalize(), "desc": ""} for p in precautions]
                sections.append({
                    "group": f"Precautions for {top_disease}",
                    "description": description,
                    "items": items
                })

        recs = gemini_data.get("recommendations", [])
        if recs:
            sections.append({"group": "Personalized Recommendations", "items": recs})

        diet_items = gemini_data.get("diet_plan", [])
        if diet_items:
            sections.append({"group": "Diet & Nutrition Plan", "items": diet_items})

        tests = gemini_data.get("tests", [])
        if tests:
            sections.append({"group": "Recommended Medical Tests", "items": tests})

        return {"gemini_powered": True, "sections": sections}

    fallback = _fallback_recommendations(structured_risks, symptom_predictions, bmi, sleep, diet)
    return {"gemini_powered": False, "sections": fallback}
