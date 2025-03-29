import { useEffect, useState } from 'react'

import './App.css'

function useTimer(n){
  const [counter,setCounter]=useState(0);
  useEffect(()=>{
    const value =setInterval(()=>{
      setCounter(counter+1)
    },n*1000)
    return ()=>{
      clearInterval(value)
    }
  },[n,counter])
  return counter;
}

function App() {
const count = useTimer(3);
  return (
    <div>Time is at {count}</div>
  )

}

export default App
