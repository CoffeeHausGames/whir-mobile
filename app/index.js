// App.js or another root component
import React from 'react';
import { AuthProvider } from './authcontext';
import MainPage from './mapscreen';

const App = () => {
  return (
    <AuthProvider>
      {/* Other components */}
      <MainPage />
    </AuthProvider>
  );
};

export default App;
