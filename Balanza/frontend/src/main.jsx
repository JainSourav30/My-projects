import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { TagSpendingProvider } from './context/TagSpendingContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <TagSpendingProvider>
      <App />
    </TagSpendingProvider>
)
