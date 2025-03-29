import { Hono } from "hono";
import { getUser, signin, signup } from "../Controllers/UserController";
import { authMiddleware } from "../Middleware/user";

export const UserRouter = new Hono();


UserRouter.post('/signup',signup);
UserRouter.post('/signin',signin);

UserRouter.get('/user/:id',authMiddleware, getUser);