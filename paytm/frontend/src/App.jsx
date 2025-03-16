import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { Signup } from './components/Signup'
import { Signin } from './components/Signin'
import { Dashboard } from './components/dashboard'
import './App.css'

function App() {

  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path='/signup' element={<Signup/>}/>
            <Route path='/Signin' element={<Signin/>}/>
            <Route path='/dashboard' element={<Dashboard/>}/>
            <Route path='/send' element={<send/>}/>
          </Routes>
        </BrowserRouter>
    </>
  )
}


export default App
