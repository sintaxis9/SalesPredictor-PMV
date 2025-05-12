import { useState } from 'react';
import { useRouter } from 'next/router';
import  useAuthStore  from '../stores/authStore';
import Navbar from '../components/Navbar';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const { register } = useAuthStore();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email.includes('@') || password.length < 3) {
      setError('Email o contraseña inválidos');
      return;
    }
    
    register(email);
    router.push('/');
  };

  return (
    <div>
      <Navbar />
      <div style={{ 
        maxWidth: '400px', 
        margin: '2rem auto', 
        padding: '2rem',
        boxShadow: '0 0 10px rgba(0,0,0,0.1)'
      }}>
        <h1 style={{ textAlign: 'center' }}>Registro</h1>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1rem' }}>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '0.5rem' }}
              required
            />
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.5rem' }}
              required
            />
          </div>
          
          {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
          
          <button 
            type="submit"
            style={{
              width: '100%',
              padding: '0.75rem',
              background: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;