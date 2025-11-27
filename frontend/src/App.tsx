import React from 'react';

import LandingPage from './pages/Landing/Page';
import { TestPage } from './TestPage';
import { AuthProvider } from './contexts/AuthContext';

function App() {
  return (
    <AuthProvider>
      <LandingPage/>
      <TestPage/> {/* Used for ad-hoc testing. Delete when not needed anymore */}
    </AuthProvider>
  );
}

export default App;
