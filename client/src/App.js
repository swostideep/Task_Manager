import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Tasks from './pages/Tasks';
import AddTask from './pages/AddTask';
import EditTask from './pages/EditTask';
import Navbar from './components/Navbar';

const isLoggedIn = () => !!localStorage.getItem('token');

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>

        <Route path="/" element={<Navigate to="/login" />} />


        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        
        {isLoggedIn() ? (
          <>
            <Route path="/tasks" element={<Tasks />} />
            <Route path="/add" element={<AddTask />} />
            <Route path="/edit/:id" element={<EditTask />} />
          </>
        ) : (
          // Redirect any unknown or protected route to login
          <Route path="*" element={<Navigate to="/login" />} />
        )}
      </Routes>
    </Router>
  );
}

export default App;
