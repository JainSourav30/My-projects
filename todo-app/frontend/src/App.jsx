import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todos'

function App() {
  const[todos,setTodos]=useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todos")
      .then(async (res) => {
        const response = await res.json();
        console.log("Fetched Response:", response); // Debugging
  
        if (Array.isArray(response)) {
          setTodos(response); // ✅ Directly update state with array
        } 
      })
      .catch((err) => console.error("Error fetching todos:", err));
  }, []);
  
  

  return (
      <div>
        <CreateTodo></CreateTodo>
        <Todos todos={todos}></Todos>
        
      </div>  
  ) 
}

export default App

