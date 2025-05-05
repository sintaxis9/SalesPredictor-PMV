import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface PredictionResponse {
  prediction: number;
  status: string;
  error?: string;
}

interface CSVPreview {
  headers: string[];
  rows: string[][];
}

const Predictor = () => {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [csvPreview, setCsvPreview] = useState<CSVPreview | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      
      // Leer y mostrar el contenido del CSV
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target?.result as string;
        const rows = csvData.split('\n').map(row => row.split(','));
        setCsvPreview({
          headers: rows[0].map(header => header.trim()),
          rows: rows.slice(1, 6).map(row => row.map(cell => cell.trim())) // Muestra solo las primeras 5 filas
        });
      };
      reader.readAsText(selectedFile);
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
        
        const response = await axios.post<PredictionResponse>(
          'http://localhost:5000/predict',
          { csv: csvData }
        );
        
        if (response.data.status === 'success') {
          router.push(`/results?prediction=${response.data.prediction}`);
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

  const downloadSampleCSV = () => {
    const csvContent = `date,sales,product_id,region
2023-01-01,1500,101,Norte
2023-01-02,1800,101,Norte
2023-01-03,2200,102,Sur
2023-01-04,1900,103,Este
2023-01-05,2100,102,Oeste
2023-01-06,2400,103,Norte
2023-01-07,1700,101,Sur`;

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales_sample.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '800px',
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>Sales Predictor PMV</h1>
      
      <div style={{ 
        marginBottom: '2rem',
        backgroundColor: '#f8f9fa',
        padding: '1rem',
        borderRadius: '8px'
      }}>
        <button
          type="button"
          onClick={downloadSampleCSV}
          style={{
            padding: '0.75rem 1.5rem',
            background: '#28a745',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            margin: '0 auto'
          }}
        >
          <span>⬇️</span>
          Descargar CSV de ejemplo
        </button>
        <p style={{ 
          marginTop: '0.5rem',
          fontSize: '0.9rem',
          color: '#6c757d',
          textAlign: 'center'
        }}>
          Usa este archivo para probar el sistema
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
        <div style={{ 
          margin: '1rem 0',
          border: '2px dashed #ced4da',
          borderRadius: '8px',
          padding: '1.5rem',
          textAlign: 'center'
        }}>
          <input
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'block', margin: '0 auto' }}
          />
          {file && (
            <p style={{ 
              marginTop: '0.5rem',
              color: '#495057',
              fontWeight: '500'
            }}>
              Archivo seleccionado: {file.name}
            </p>
          )}
        </div>
        
        <button
          type="submit"
          disabled={!file || loading}
          style={{
            width: '100%',
            padding: '1rem',
            background: !file ? '#6c757d' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '1rem',
            transition: 'background 0.3s'
          }}
        >
          {loading ? '📡 Procesando...' : '📊 Predecir Ventas'}
        </button>
      </form>

      {csvPreview && (
        <div style={{ 
          marginTop: '2rem',
          border: '1px solid #e0e0e0',
          borderRadius: '8px',
          overflow: 'hidden',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <h3 style={{
            padding: '1rem',
            background: '#f8f9fa',
            margin: 0,
            borderBottom: '1px solid #e0e0e0',
            fontSize: '1.1em'
          }}>
            Vista previa del CSV ({csvPreview.rows.length} filas mostradas)
          </h3>
          
          <div style={{ 
            maxHeight: '400px',
            overflow: 'auto'
          }}>
            <table style={{ 
              width: '100%',
              borderCollapse: 'collapse',
              backgroundColor: 'white'
            }}>
              <thead>
                <tr>
                  {csvPreview.headers.map((header, index) => (
                    <th 
                      key={index}
                      style={{
                        padding: '12px',
                        textAlign: 'left',
                        backgroundColor: '#f1f3f5',
                        borderBottom: '2px solid #dee2e6',
                        position: 'sticky',
                        top: 0
                      }}
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              
              <tbody>
                {csvPreview.rows.map((row, rowIndex) => (
                  <tr 
                  key={rowIndex}
                  style={{
                    borderBottom: '1px solid #dee2e6',
                    cursor: 'pointer',
                    transition: 'background-color 0.2s'
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f8f9fa')}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'white')}
                >
                    {row.map((cell, cellIndex) => (
                      <td 
                        key={cellIndex}
                        style={{
                          padding: '12px',
                          fontSize: '0.9em',
                          color: '#495057',
                          whiteSpace: 'nowrap'
                        }}
                      >
                        {cell || <span style={{ color: '#868e96' }}>N/A</span>}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {error && (
        <div style={{ 
          marginTop: '1.5rem',
          padding: '1rem',
          backgroundColor: '#ffe3e3',
          color: '#dc3545',
          borderRadius: '6px',
          textAlign: 'center'
        }}>
          ⚠️ Error: {error}
        </div>
      )}
    </div>
  );
};

export default Predictor;