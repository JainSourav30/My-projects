export function Todos({todos}){
    console.log("Received Todos in Todos Component:", todos); 
    return <div>
        {todos.map((todo)=>{
            return <div>
                <h1>{todo.title}</h1>
                <h2>{todo.description}</h2>
                <button>{todo.completed == true ? "completed" : "mark as compelete"}</button>

            </div>
        })}
    </div>
} 