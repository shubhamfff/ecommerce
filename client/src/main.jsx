import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux'
import store from './store';
import { AuthProvider } from './context/auth.jsx';
import Footer from './components/Layout/Footer.jsx';
import { FloatButton } from 'antd';


ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <AuthProvider>
      <App />
      <Footer />
      <FloatButton.BackTop />
    </AuthProvider>
  </Provider>,
)
