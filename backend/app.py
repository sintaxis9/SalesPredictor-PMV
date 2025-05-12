from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
import tensorflow as tf
import io
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '2' 

app = Flask(__name__)
CORS(app, resources={r"/*": {
    "origins": [
        "http://localhost:3000",
        "https://sales-predictor-pmv.vercel.app"
    ],
    "methods": ["POST", "GET", "OPTIONS"],  
    "allow_headers": ["Content-Type", "Authorization"]
}})

@app.route('/')
def home():
    return "Backend del SalesPredictor-PMV"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        print("[DEBUG] Solicitud recibida. Datos:", request.json)
        csv_data = request.json.get('csv', '')
        print("[DEBUG] Primeras 50 letras del CSV:", csv_data[:50])

        df = pd.read_csv(io.StringIO(csv_data))
        
        mock_prediction = len(df) * 1000
        
        return jsonify({
            'prediction': float(mock_prediction),
            'status': 'success'
        })
    except Exception as e:
        return jsonify({
            'error': str(e),
            'status': 'error'
        })

@app.route('/favicon.ico')
def favicon():
    return app.send_static_file('favicon.ico')

if __name__ == '__main__':
    app.run(debug=True, port=5000)