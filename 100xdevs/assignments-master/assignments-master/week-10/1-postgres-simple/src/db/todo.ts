import { client } from "..";
/*
 * Function should insert a new todo for this user
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */

interface Todo {
    title:string;
    description:string;
    done?:boolean;
    id:number;
}

export async function createTodo(userId: number, title: string, description: string):Promise<Todo> {
    await client.connect();

    const  todo = await client.query("INSERT INTO todos (userId,title,description) VALUES ($1,$2,$3) RETURNING *",[userId,title,description]); 

    return todo.rows[0];
}

/*
 * mark done as true for this specific todo.
 * Should return a todo object
 * {
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }
 */

export async function updateTodo(todoId: number) {
    
}


/*
 *  Get all the todos of a given user
 * Should return an array of todos
 * [{
 *  title: string,
 *  description: string,
 *  done: boolean,
 *  id: number
 * }]
 */


export async function getTodos(userId: number) {

}