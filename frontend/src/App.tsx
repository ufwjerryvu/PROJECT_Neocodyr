import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import { LandingPage } from './pages/Landing/Page';
import { RegisterPage } from './pages/Register/Page';
import { LoginPage } from './pages/Login/Page';

import { TestPage } from './TestPage';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage/>}/>
          <Route path="/dashboard" element={<TestPage/>}/>
          <Route path="/register" element={<RegisterPage/>}/>
          <Route path="/login" element={<LoginPage/>}/>
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
