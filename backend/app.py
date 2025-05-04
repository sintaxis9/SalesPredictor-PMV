from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
import tensorflow as tf

app = Flask(__name__)
CORS(app)

@app.route('/')
def home():
    return "backend SalesPredictor-PMV"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        mock_prediction = np.random.uniform(1000, 5000)

        return jsonify({
            'prediction': float(mock_prediction),
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        })

if __name__ == '__main__':
    app.run(debug=True, port=5000)