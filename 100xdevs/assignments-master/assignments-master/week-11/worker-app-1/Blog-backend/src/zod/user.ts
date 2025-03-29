
import { z } from "zod";
export const signupschema = z.object({
    username : z.string(),
    email : z.string().email(),
    password : z.string(),
}); 


export const signinschema = z.object({
    email: z.string().email(),
    password : z.string(),
});