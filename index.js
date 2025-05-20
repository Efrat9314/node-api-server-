import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import TaskRouter from './Routes/TaskRouter.js'

const app = express();

app.use(cors());
app.use(express.json());

const mess=(req,res,next)=>{
    console.log('middleware 1')
    next();
}

app.use('/',mess,(req,res,next)=>{
    console.log('middleware 2');
    next()
})

app.use('/tasks',TaskRouter);

app.listen(5000, () => {
    console.log('app is running on http://localhost:5000')
})