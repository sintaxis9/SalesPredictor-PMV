import Link from 'next/link';
import  useAuthStore  from '../stores/authStore';

const Navbar = () => {
  const { user, logout } = useAuthStore();
  
  const getUsername = () => user?.email.split('@')[0] || '';

  return (
    <nav style={{
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderBottom: '1px solid #dee2e6',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <Link href="/" style={{ textDecoration: 'none', color: '#007bff', fontWeight: 'bold' }}>
        SalesPredictor
      </Link>
      
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        {user ? (
          <>
            <span style={{ color: '#495057' }}>👤 {getUsername()}</span>
            <button 
              onClick={logout}
              style={{
                padding: '0.5rem 1rem',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/login" style={{ textDecoration: 'none', color: '#007bff' }}>
              Login
            </Link>
            <Link href="/register" style={{ textDecoration: 'none', color: '#007bff' }}>
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;