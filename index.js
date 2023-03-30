import * as dotenv from 'dotenv'
import express  from 'express';
import db from './config/db.js'
import userRoutes from './routes/userRoutes.js'
import applicationRoutes from './routes/applicationRoutes.js'
import cors from 'cors'
import {MONGO_PORT} from '../variables.js'



const app = express();
app.use(express.json());
dotenv.config();

db();

app.use(cors ({
    origin: 'http://localhost:5173',
    // origin:'http://127.0.0.1:5173',
    credentials:true
}))

app.use("/api/user", userRoutes);
app.use("/api/application", applicationRoutes);


const PORT = MONGO_PORT

app.listen(PORT, ()=>{
    console.log(`port: ${PORT}`)
});
 