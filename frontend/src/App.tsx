import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';

import { LandingPage } from './pages/Landing/Page';
import { RegisterPage } from './pages/Register/Page';
import { LoginPage } from './pages/Login/Page';


import { TestPage } from './TestPage';
import { ProfilePage } from './pages/Profile/Page';
import { ProtectedRoute } from './routes/ProtectedRoute';
import { GuestRoute } from './routes/GuestRoute';
import { DashboardPage } from './pages/Dashboard/Page';
import { AuthorCreateCoursePage } from './pages/Course/Author/Page';
import { AuthorOnlyRoute } from './routes/AuthorOnlyRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route element={<GuestRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<AuthorOnlyRoute/>}>
            <Route path="/author/create" element={<AuthorCreateCoursePage/>}/>
          </Route>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
