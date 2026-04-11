def get_top_predictions(probabilities, classes, top_n=3):
    sorted_indices = probabilities.argsort()[-top_n:][::-1]

    results = []
    for i in sorted_indices:
        prob = float(probabilities[i])

        results.append({
            "disease": classes[i],
            "probability": round(prob * 100, 2),
            "risk": get_risk_level(prob)
        })

    return results


def get_risk_level(prob):
    prob = prob * 100

    if prob < 30:
        return "Low"
    elif prob < 70:
        return "Medium"
    else:
        return "High"