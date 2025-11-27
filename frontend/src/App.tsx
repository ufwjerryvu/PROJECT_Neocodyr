import React from 'react';

import LandingPage from './pages/Landing/Page';
import { TestPage } from './TestPage';

function App() {
  return (
    <>
      <LandingPage/>
      <TestPage/> {/* Used for ad-hoc testing. Delete when not needed anymore */}
    </>
  );
}

export default App;
