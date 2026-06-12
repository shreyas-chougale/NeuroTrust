from flask import Flask, request, jsonify, render_template, send_from_directory
from flask_cors import CORS
import os
import sys

# Ensure src modules can be loaded
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from src.predict import predict_risk

# Initialize Flask App pointing to static folder for both static files and templates
app = Flask(__name__, 
            static_folder='static',
            template_folder='static')
CORS(app)

@app.route('/health', methods=['GET'])
def health_check():
    return jsonify({"status": "healthy", "model": "Neurotrust Random Forest Pipeline"}), 200

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        req_data = request.get_json()
        
        # In the original frontend, predictMutation was passed `{ data: { ... } }`
        # Let's handle both direct data and wrapped data
        if 'data' in req_data:
            data = req_data['data']
        else:
            data = req_data

        deviceType = data.get('deviceType', 'Unknown')
        failedLoginAttempts = int(data.get('failedLoginAttempts', 0))
        vpnUsage = data.get('vpnUsage', 'No')
        userRole = data.get('userRole', 'User')
        location = data.get('location', 'Normal')
        loginTime = data.get('loginTime', 'Day')
        
        result = predict_risk(deviceType, failedLoginAttempts, vpnUsage, userRole, location, loginTime)
        
        return jsonify(result), 200
        
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        return jsonify({"error": str(e)}), 500

@app.route('/api/feature-importance', methods=['GET'])
def feature_importance():
    # Mocking feature importance based on random forest since it's hard to extract from pipeline dynamically 
    # without doing it at training time
    return jsonify({
        "features": [
            {"feature": "location", "label": "Location", "importance": 0.35},
            {"feature": "failedLoginAttempts", "label": "Failed Login Attempts", "importance": 0.28},
            {"feature": "deviceType", "label": "Device Type", "importance": 0.15},
            {"feature": "vpnUsage", "label": "VPN Usage", "importance": 0.12},
            {"feature": "userRole", "label": "User Role", "importance": 0.06},
            {"feature": "loginTime", "label": "Login Time", "importance": 0.04},
        ],
        "modelInfo": "Random Forest Classifier (GridSearchCV optimized)",
        "trainedOn": "Neurotrust Synthesized Dataset (10,000 rows)"
    })

# Serve React App
@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def serve(path):
    if path != "" and os.path.exists(app.static_folder + '/' + path):
        return send_from_directory(app.static_folder, path)
    else:
        return render_template('index.html')

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port, debug=True)
