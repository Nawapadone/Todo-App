import ReactDOM from 'react-dom/client';
import './roboto.css';
import './index.css';

import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from "react-redux";
import configureStore from "./store";

const store = configureStore();

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
reportWebVitals();
