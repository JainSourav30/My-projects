import { useState } from 'react'

import './App.css'
import InfoBar from './components/InfoBar'
import Content from './Content'

function App() {
 
  return (
    <div>
      <div className='bg-gray-100  flex h-screen'>
        <InfoBar />
        <Content />
      </div>
    </div> 
  )
}

export default App
