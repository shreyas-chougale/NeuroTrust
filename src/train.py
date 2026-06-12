import pickle
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV
from src.preprocess import load_data, build_preprocessor

def train_model():
    print("Loading data...")
    X_train, X_test, y_train, y_test = load_data()

    print("Building pipeline...")
    preprocessor = build_preprocessor()
    
    pipeline = Pipeline(steps=[
        ('preprocessor', preprocessor),
        ('classifier', RandomForestClassifier(random_state=42))
    ])

    param_grid = {
        'classifier__n_estimators': [50, 100, 200],
        'classifier__max_depth': [None, 10, 20],
        'classifier__min_samples_split': [2, 5]
    }

    print("Running GridSearchCV with Random Forest...")
    grid_search = GridSearchCV(pipeline, param_grid, cv=3, n_jobs=-1, verbose=2)
    grid_search.fit(X_train, y_train)

    best_model = grid_search.best_estimator_
    print(f"Best parameters: {grid_search.best_params_}")
    print(f"Training accuracy: {best_model.score(X_train, y_train):.4f}")

    with open('models/pipeline.pkl', 'wb') as f:
        pickle.dump(best_model, f)
    
    print("Model saved to models/pipeline.pkl")
    return best_model

if __name__ == '__main__':
    train_model()
