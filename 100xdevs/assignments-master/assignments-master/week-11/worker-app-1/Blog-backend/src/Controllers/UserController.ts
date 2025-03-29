import { PrismaClient } from "@prisma/client/extension";
import {withAccelerate} from '@prisma/extension-accelerate';
import { Context } from "hono";
import { signupschema } from "../zod/user";
import { Jwt } from "hono/utils/jwt";

enum StatusCode{
    BADREQ = 400,
    NOTFOUND = 404,
    NOTPERMISSIOON = 403
}


export async function signup(c : Context){
    //signup code
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());
    
    console.log("🔹 Prisma initialized");
      try{
        const body:{
            username: string;
            email: string;
            password: string;
        } = await c.req.json();

        const parsedUser = signupschema.safeParse(body);

        if(!parsedUser.success){
            return c.body("Enter valid details",StatusCode.BADREQ)
        }

        const isUserExist =  await prisma.user.findFirst({
            where:{email : body.email},
        });

        if(isUserExist){
            return c.body("User Already Exists!",StatusCode.BADREQ)
        }
        const res = await prisma.user.create({
            data:{
                username: body.username,
                email: body.email,
                password: body.password,
            },
        });

        const userId = res.id;
        const token = await Jwt.sign(userId,c.env.JWT_TOKEN)

        return c.json({
            msg: 'User created successfully',
            token,
            user:{
                userId:res.id,
                username: res.username,
                email:res.email,
            },
        });
      }
      catch(error){
        return c.body(`Internal server error ${error}`,500);
      }
};

export async function signin(c : Context){
    //signin code
};

export async function getUser(c: Context){
    //send user info
}