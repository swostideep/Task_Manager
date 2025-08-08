import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <nav style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#f0f0f0' }}>
      {token ? (
        <>
          <Link to="/tasks" style={{ marginRight: '10px' }}>📋 Tasks</Link>
          <Link to="/add" style={{ marginRight: '10px' }}>➕ Add Task</Link>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              padding: '5px 10px',
              cursor: 'pointer'
            }}
          >
            🔓 Logout
          </button>
        </>
      ) : (
        <>
          <Link to="/login" style={{ marginRight: '10px' }}>🔐 Login</Link>
          <Link to="/register">📝 Register</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
