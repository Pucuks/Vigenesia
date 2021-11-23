import React from 'react';

import { Provider as AuthProvider } from './src/contexts/AuthContext';

import Navigation from './src/Navigation';

export default () => (
  <AuthProvider>
    <Navigation />
  </AuthProvider>
);
