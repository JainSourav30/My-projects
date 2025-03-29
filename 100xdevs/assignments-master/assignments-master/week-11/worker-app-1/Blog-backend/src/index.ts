import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { UserRouter } from './Routes/UserRoutes';
import { PostRouter } from './Routes/PostRoutes';

const app = new Hono();
app.use(cors());

app.get('/',(c)=>{
    return c.text("hello blog backend!")
})

app.route('/api/v1/users', UserRouter);
app.route('/api/v1/posts', PostRouter);

export default app
