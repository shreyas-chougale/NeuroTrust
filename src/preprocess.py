import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import OneHotEncoder, StandardScaler
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline

def load_data(filepath='data/dataset.csv'):
    df = pd.read_csv(filepath)
    X = df.drop(columns=['risk_level'])
    y = df['risk_level']
    return train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

def build_preprocessor():
    categorical_features = ['deviceType', 'vpnUsage', 'userRole', 'location', 'loginTime']
    numerical_features = ['failedLoginAttempts']

    categorical_transformer = Pipeline(steps=[
        ('onehot', OneHotEncoder(handle_unknown='ignore'))
    ])

    numerical_transformer = Pipeline(steps=[
        ('scaler', StandardScaler())
    ])

    preprocessor = ColumnTransformer(
        transformers=[
            ('num', numerical_transformer, numerical_features),
            ('cat', categorical_transformer, categorical_features)
        ])
    
    return preprocessor
