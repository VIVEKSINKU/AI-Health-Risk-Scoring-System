from flask import Flask, request, jsonify
from predictor import predict_disease
from model_loader import label_encoder
from utils import get_top_predictions

app = Flask(__name__)


@app.route('/')
def home():
    return "AI Health Risk System is running!"
def predict():
    data = request.json
    symptoms = data.get("symptoms", "")

    # Validate input
    if not symptoms:
        return jsonify({"error": "No symptoms provided"}), 400

    try:
        disease, probabilities = predict_disease(symptoms)

        top_results = get_top_predictions(
            probabilities,
            label_encoder.classes_
        )

        return jsonify({
            "predicted_disease": disease,
            "top_predictions": top_results
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)