from flask import Flask, jsonify, request
from flask_cors import CORS
import numpy as np
import pandas as pd
import tensorflow as tf

app = Flask(__name__, static_folder='static')
CORS(app)

@app.route('/')
def home():
    return "backend SalesPredictor-PMV"

@app.route('/predict', methods=['POST'])
def predict():
    try:
        csv_data = request.json.get('csv', '')
        
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