import React from 'react';
import 'intl-pluralrules';
import './lang/i18n';

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import {StorageProvider} from './src/store';
import Navigation from './src/Navigation';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  return (
    <QueryClientProvider client={queryClient}>
      <StorageProvider>
        <Navigation />
        <Toast />
      </StorageProvider>
    </QueryClientProvider>
  );
}

export default App;
