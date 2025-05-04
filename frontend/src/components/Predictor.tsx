import { useState } from 'react';
import axios from 'axios';

interface PredictionResponse {
  prediction: number;
  status: string;
  error?: string;
}

const Predictor = () => {
  const [file, setFile] = useState<File | null>(null);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;

    setLoading(true);
    setError(null);
    
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const csvData = e.target?.result;
        
        // Enviar datos al backend
        const response = await axios.post<PredictionResponse>(
          'http://localhost:5000/predict',
          { csv: csvData }
        );
        
        if (response.data.status === 'success') {
          setPrediction(response.data.prediction);
        } else {
          setError(response.data.error || 'Error desconocido');
        }
      };
      reader.readAsText(file);
    } catch (err) {
      setError('Error al procesar el archivo');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Sales Predictor PMV</h1>
      
      <form onSubmit={handleSubmit}>
        <div style={{ margin: '1rem 0' }}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
          />
        </div>
        
        <button
          type="submit"
          disabled={!file || loading}
          style={{
            padding: '0.5rem 1rem',
            background: !file ? '#ccc' : '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          {loading ? 'Procesando...' : 'Predecir Ventas'}
        </button>
      </form>

      {error && (
        <div style={{ color: 'red', marginTop: '1rem' }}>Error: {error}</div>
      )}

      {prediction !== null && (
        <div style={{ marginTop: '2rem', fontSize: '1.2rem' }}>
          <h2>Resultado de la predicción:</h2>
          <p>${prediction.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default Predictor;