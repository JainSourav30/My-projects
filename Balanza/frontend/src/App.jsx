import {BrowserRouter,Routes,Route, Navigate} from 'react-router-dom'
import { Signup } from './pages/Signup'
import { Signin } from './pages/Signin'
import { Dashboard } from './pages/Dashboard'
import { Payment } from './pages/Payment'
import './App.css'
import { useState } from 'react'
import { LandingPage } from './pages/LandingPage'

function App() {
  const [isAuthenticated,setIsAuthenticated] = useState(!!localStorage.getItem('token'));
  const ProtectedRoute = ({isAuthenticated,children}) => {
    if(!isAuthenticated){
      return (
        <Navigate to='/' replace/>
      )
    }
    return children;
  };

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={isAuthenticated ? <Navigate to="/dashboard"/>:<LandingPage/>}/>
            <Route path='/signup' element={<Signup setIsAuthenticated={setIsAuthenticated}/>}/>
            <Route path='/signin' element={<Signin setIsAuthenticated={setIsAuthenticated}/>}/>
            <Route path='/dashboard' element={<ProtectedRoute isAuthenticated={isAuthenticated}><Dashboard setIsAuthenticated={setIsAuthenticated}></Dashboard></ProtectedRoute>}/>
            <Route path='/payment' element={<Payment/>}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}


export default App
