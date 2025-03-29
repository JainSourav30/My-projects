import { client } from "..";

/*
 * Should insert into the users table
 * Shopassword: string,
 *   name: string
 * }uld return the User object
 * {
 *   username: string,
 *   
 */

interface User {
    username:string;
    password: string;
    name: string;
}
export async function createUser(username: string, password: string, name: string):Promise<User> {
    await client.connect();
    const user = await client.query(
        "INSERT INTO users (username,password,name) VALUES ($1,$2,$3) RETURNING *",[username,password,name]
    );
    return user.rows[0];
}

/*
 * Should return the User object
 * {
 *   username: string,
 *   password: string,
 *   name: string
 * }
 */
export async function getUser(userId: number):Promise<User> {
    await client.connect();
    const user = await client.query(
        "SELECT * FROM users where id = $1",[userId]
    );
    return user.rows[0]|| null;

}
