import { useRouter } from 'next/router';
import Link from 'next/link';

const ResultsPage = () => {
  const router = useRouter();
  const { prediction } = router.query;

  return (
    <div style={{ 
      padding: '2rem', 
      maxWidth: '600px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ color: '#2c3e50', textAlign: 'center' }}>Resultado de Predicción</h1>
      
      <div style={{ 
        marginTop: '2rem',
        padding: '1.5rem',
        backgroundColor: '#e2f3ff',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#004085', marginBottom: '0.5rem' }}>
          🎯 Predicción de Ventas
        </h2>
        <div style={{ 
          fontSize: '2rem',
          color: '#004085',
          fontWeight: 'bold'
        }}>
          ${prediction ? parseFloat(prediction as string).toFixed(2) : 'N/A'}
        </div>
      </div>

      <Link href="/" passHref>
        <button
          style={{
            marginTop: '2rem',
            padding: '0.75rem 1.5rem',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            display: 'block',
            width: '100%'
          }}
        >
          ⬅️ Volver al Inicio
        </button>
      </Link>
    </div>
  );
};

export default ResultsPage;