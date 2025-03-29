//projects.100xdevs.com

import { Client } from "pg";

const client = new Client({
    user: 'postgres',
    host: 'localhost',
    password: '1234',
    port: 5432,
    database: 'postgres' 
})
//

async function CreateTable(){
    await client.connect()
    const result = await client.query(`
        CREATE TABLE users (
        id SERIAL PRIMARY KEY,
        username VARCHAR(50) UNIQUE NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        );`
    );
    console.log(result);
}

CreateTable();