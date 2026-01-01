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
import { AuthorCreateCoursePage } from './pages/Course/Authors/Create/Page';
import { AuthorOnlyRoute } from './routes/AuthorOnlyRoute';
import { AuthorManageCoursePage } from './pages/Course/Authors/Manage/Page';
import { NotFoundPage } from './pages/Errors/NotFound/Page';
import { UnauthorizedPage } from './pages/Errors/Unauthorized/Page';
import { ForbiddenPage } from './pages/Errors/Forbidden/Page';
import { NotFoundRedirect } from './routes/NotFoundRedirect';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/error/notfound" element={<NotFoundPage/>}/>
          <Route path="/error/unauthorized" element={<UnauthorizedPage/>}/>
          <Route path="/error/forbidden" element={<ForbiddenPage/>}/>
          <Route element={<GuestRoute />}>
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/test" element={<TestPage/>}/>
          </Route>
          <Route element={<AuthorOnlyRoute/>}>
            <Route path="/author/courses/create" element={<AuthorCreateCoursePage/>}/>
            <Route path="/author/courses/:courseId/manage" element={<AuthorManageCoursePage/>}/>
          </Route>
          <Route path="*" element={<NotFoundRedirect/>}/>
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
