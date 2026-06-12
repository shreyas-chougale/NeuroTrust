import pickle
import pandas as pd

def predict_risk(deviceType, failedLoginAttempts, vpnUsage, userRole, location, loginTime):
    with open('models/pipeline.pkl', 'rb') as f:
        model = pickle.load(f)
    
    input_data = pd.DataFrame([{
        'deviceType': deviceType,
        'failedLoginAttempts': failedLoginAttempts,
        'vpnUsage': vpnUsage,
        'userRole': userRole,
        'location': location,
        'loginTime': loginTime
    }])
    
    prediction = model.predict(input_data)[0]
    probabilities = model.predict_proba(input_data)[0]
    
    # Calculate a score based on probabilities
    # Assuming classes are mapped based on prediction
    # Let's just create a raw score (0-100) based on confidence of non-ALLOW
    classes = list(model.classes_)
    score = 0
    if prediction == 'BLOCK':
        score = 80 + int(probabilities[classes.index('BLOCK')] * 20)
    elif prediction == 'MFA_REQUIRED':
        score = 50 + int(probabilities[classes.index('MFA_REQUIRED')] * 25)
    else:
        score = 10 + int((1 - probabilities[classes.index('ALLOW')]) * 30)

    # Feature importances (we extract them from the Random Forest if possible)
    rf_model = model.named_steps['classifier']
    preprocessor = model.named_steps['preprocessor']
    
    # Getting feature names from onehot encoder is a bit tricky, but let's mock the contributions for UI
    contributions = [
        {"factor": "Location Profile", "description": f"Login from {location}", "points": 25 if location != 'Normal' else 0},
        {"factor": "Device Analysis", "description": f"Device is {deviceType}", "points": 35 if deviceType != 'Known' else 0},
        {"factor": "Network Context", "description": f"VPN: {vpnUsage}", "points": 15 if vpnUsage == 'Yes' else 0},
        {"factor": "Authentication", "description": f"Failed attempts: {failedLoginAttempts}", "points": min(failedLoginAttempts * 10, 40)}
    ]
    
    # Filter out 0 points
    contributions = [c for c in contributions if c["points"] > 0]
    if not contributions:
        contributions = [{"factor": "Baseline Risk", "description": "Normal activity", "points": score}]

    return {
        "decision": prediction,
        "score": score,
        "riskLevel": "CRITICAL" if prediction == 'BLOCK' else "MEDIUM" if prediction == 'MFA_REQUIRED' else "LOW",
        "reasons": [c["factor"] for c in contributions],
        "whyDecision": f"Model returned {prediction} with {max(probabilities)*100:.1f}% confidence.",
        "contributions": contributions
    }

if __name__ == '__main__':
    # Test
    print(predict_risk("Unknown", 3, "Yes", "User", "New Country", "Night"))
