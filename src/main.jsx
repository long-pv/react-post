import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

// Redux
import { Provider } from 'react-redux';
import store from './store/store';

// MUI
import { ThemeProvider, CssBaseline } from '@mui/material';
import theme from './theme';

// App
import App from './App';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element #root not found');
}

createRoot(rootElement).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </Provider>
  </StrictMode>
);
