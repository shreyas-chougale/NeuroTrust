import pickle
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.metrics import classification_report, confusion_matrix
from src.preprocess import load_data

def evaluate_model():
    _, X_test, _, y_test = load_data()
    
    with open('models/pipeline.pkl', 'rb') as f:
        model = pickle.load(f)
    
    y_pred = model.predict(X_test)
    
    print("Classification Report:")
    print(classification_report(y_test, y_pred))
    
    cm = confusion_matrix(y_test, y_pred)
    plt.figure(figsize=(8,6))
    sns.heatmap(cm, annot=True, fmt='d', cmap='Blues', xticklabels=model.classes_, yticklabels=model.classes_)
    plt.title('Confusion Matrix')
    plt.ylabel('True Label')
    plt.xlabel('Predicted Label')
    plt.savefig('reports/figures/confusion_matrix.png')
    print("Confusion matrix saved to reports/figures/confusion_matrix.png")

if __name__ == '__main__':
    evaluate_model()
