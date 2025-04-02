import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { AuthProvider } from './components/Context/AuthContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux'
import { store } from './stores/index.jsx';

const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <Provider store={store} >
        <App />
        </Provider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
