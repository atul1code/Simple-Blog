import express from 'express'
import dotenv  from 'dotenv';
import mongoose from 'mongoose';



import readerRouter from './routers/reader.routes.js'
import publisherRouter from './routers/publiser.routes.js'
import authRouter from './routers/auth.routes.js'


dotenv.config()
const app = express();

app.get((req, res, next) =>{
    console.log("server started")
    
})
 
app.use(express.urlencoded())

app.set('view engine', 'ejs')
app.set('views', 'views')

 
app.use(authRouter)
app.use(readerRouter)
app.use(publisherRouter)



const PORT = process.env.PORT
const DB_PATH = process.env.DB_PATH 
mongoose.connect(DB_PATH).then( () => {
console.log("db connected")
app.listen(PORT, () => {
console.log(`server is started at http://localhost:${PORT}`)
})
}).catch( err => {
    console.log("error while connecting to db", err)
})


