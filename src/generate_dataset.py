import pandas as pd
import numpy as np
import random
import os

def generate_dataset(num_samples=10000):
    np.random.seed(42)
    random.seed(42)

    device_types = ['Known', 'Unknown', 'Suspicious']
    vpn_usages = ['Yes', 'No']
    user_roles = ['User', 'Admin', 'Guest']
    locations = ['Normal', 'New City', 'New Country', 'High Risk Country']
    login_times = ['Day', 'Night', 'Unusual']

    data = {
        'deviceType': np.random.choice(device_types, num_samples, p=[0.7, 0.2, 0.1]),
        'failedLoginAttempts': np.random.poisson(0.5, num_samples),
        'vpnUsage': np.random.choice(vpn_usages, num_samples, p=[0.2, 0.8]),
        'userRole': np.random.choice(user_roles, num_samples, p=[0.8, 0.1, 0.1]),
        'location': np.random.choice(locations, num_samples, p=[0.6, 0.2, 0.1, 0.1]),
        'loginTime': np.random.choice(login_times, num_samples, p=[0.7, 0.2, 0.1]),
    }

    df = pd.DataFrame(data)

    # Cap failed login attempts to a reasonable max
    df['failedLoginAttempts'] = df['failedLoginAttempts'].clip(upper=10)

    # Determine risk score and target variable
    def calculate_risk(row):
        score = 0
        if row['deviceType'] == 'Suspicious': score += 40
        elif row['deviceType'] == 'Unknown': score += 15
        
        score += min(row['failedLoginAttempts'] * 15, 60)
        
        if row['vpnUsage'] == 'Yes' and row['location'] in ['New Country', 'High Risk Country']: score += 30
        
        if row['userRole'] == 'Admin': 
            if row['location'] != 'Normal': score += 20
            if row['loginTime'] == 'Unusual': score += 20
            
        if row['location'] == 'High Risk Country': score += 45
        elif row['location'] == 'New Country': score += 25
        elif row['location'] == 'New City': score += 10
        
        if row['loginTime'] == 'Unusual': score += 20
        elif row['loginTime'] == 'Night': score += 5
        
        # Add some noise
        score += random.randint(-5, 10)
        score = max(0, min(100, score))
        
        if score > 75: return 'BLOCK'
        elif score > 45: return 'MFA_REQUIRED'
        else: return 'ALLOW'

    df['risk_level'] = df.apply(calculate_risk, axis=1)
    
    # Map risk level to numeric target for training (0=ALLOW, 1=MFA_REQUIRED, 2=BLOCK)
    # wait, classification target can be strings directly, scikit-learn supports string labels.
    
    os.makedirs('data', exist_ok=True)
    df.to_csv('data/dataset.csv', index=False)
    print("Successfully generated data/dataset.csv with 10,000 samples.")

if __name__ == '__main__':
    generate_dataset()
