import React from 'react'
import ReactDOM from 'react-dom/client'
import { CookiesProvider } from 'react-cookie';
import { BrowserRouter } from 'react-router-dom';

// component imports
import App from './App.jsx'

//bootstrap css import
import 'bootstrap/dist/css/bootstrap.min.css';

// css imports
import './index.css'



ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <CookiesProvider defaultSetOptions={{ path: '/' }}>
       
        <App />
    </CookiesProvider>
  </BrowserRouter>
  ,
)
