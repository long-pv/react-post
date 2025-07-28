import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Redux
import { Provider } from 'react-redux';
import store from "./store/store"; // Đường dẫn này đúng nếu store.js nằm trong src/

// CSS Imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import 'react-toastify/dist/ReactToastify.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './styles/app.scss';

// App
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>,
);
