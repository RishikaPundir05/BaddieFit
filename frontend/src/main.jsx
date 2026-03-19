import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import App from './App.jsx'
import { WorkoutProvider } from './context/WorkoutContext.jsx'
import { RewardProvider } from './context/RewardContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <WorkoutProvider>
        <RewardProvider>
          <App />
          <Toaster
            position="top-center"
            toastOptions={{
              style: {
                background: '#1a1a2e',
                color: '#fff',
                borderRadius: '16px',
                border: '1px solid rgba(255,255,255,0.2)',
                fontFamily: 'Nunito, sans-serif',
                fontWeight: 700,
              },
            }}
          />
        </RewardProvider>
      </WorkoutProvider>
    </BrowserRouter>
  </React.StrictMode>
)
