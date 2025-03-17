import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app.tsx';
import './index.less';
import {configureStore} from './services/store';
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

const store = configureStore();
export type AppDispatch = typeof store.dispatch;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);
