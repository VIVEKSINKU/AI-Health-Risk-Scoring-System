from symptom_normalizer import normalize_symptoms
from predictor import predict_disease

text = "excessive thirst, frequent urination especially at night, unexplained weight loss, extreme hunger, fatigue, blurry vision"
normalized = normalize_symptoms(text.lower())
print("Normalized input:")
print(normalized)
print()
results = predict_disease(text, top_n=5)
print("Top predictions:")
for r in results:
    print(f"  {r['disease']}: {r['probability']}% ({r['risk']})")
