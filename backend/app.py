from flask import Flask, request, jsonify
from flask_cors import CORS
from predictor import predict_unified
from recommender import get_recommendations

app = Flask(__name__)
CORS(app)   


@app.route("/")
def home():
    return "AI Health Risk System is running!"


@app.route("/predict", methods=["POST"])
def predict():
    data = request.json or {}

    try:
        age    = float(data.get("age", 0))
        weight = float(data.get("weight", 70))   
        height = float(data.get("height", 170))  
        sleep  = float(data.get("sleep", 7))
        diet   = str(data.get("diet", "balanced"))
        gender = str(data.get("gender", "other"))
    except (TypeError, ValueError) as e:
        return jsonify({"error": f"Invalid input: {e}"}), 400

    if age <= 0:
        return jsonify({"error": "Age must be greater than 0"}), 400
    if height <= 0:
        return jsonify({"error": "Height must be greater than 0"}), 400

    height_m = height / 100.0
    bmi = round(weight / (height_m ** 2), 1)

    symptoms      = str(data.get("symptoms", "")).strip()
    conditions    = str(data.get("conditions", "")).strip()
    combined_text = f"{symptoms} {conditions}".strip()

    try:
        predictions = predict_unified(
            age=age, bmi=bmi, sleep=sleep, diet=diet,
            gender=gender, symptoms=combined_text, top_n=5
        )
    except Exception as e:
        return jsonify({"error": f"Prediction failed: {e}"}), 500

    if predictions:
        overall_score = predictions[0]["probability"]
        risk_label    = predictions[0]["risk"]
    else:
        overall_score = 0.0
        risk_label    = "Low"

    recommendations = get_recommendations(
        structured_risks=[],            
        symptom_predictions=predictions,
        bmi=bmi,
        sleep=sleep,
        diet=diet
    )

    return jsonify({
        "bmi":                  bmi,
        "overall_score":        overall_score,
        "risk_label":           risk_label,
        "fused_predictions":    predictions,
        "structured_risks":     [],            
        "symptom_predictions":  predictions,
        "recommendations":      recommendations,
    })


if __name__ == "__main__":
    app.run(debug=True, port=5000)