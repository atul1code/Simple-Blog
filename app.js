import express from 'express'
import dotenv  from 'dotenv';
import mongoose from 'mongoose';
import session from 'express-session'
import connectMongoDBSession from 'connect-mongodb-session'




import readerRouter from './routers/reader.routes.js'
import publisherRouter from './routers/publiser.routes.js'
import authRouter from './routers/auth.routes.js'



const app = express();

dotenv.config()  // environment variable load
const MongoDBStore = connectMongoDBSession(session); //session store in mongodb

app.use(express.urlencoded()) // body parser middleware

app.set('view engine', 'ejs')
app.set('views', 'views')

// This creates a session store in MongoDB.
const store = new MongoDBStore({
    uri: process.env.DB_PATH,  // connection url 
    collection: "sessions",  //MongoDB will create a collection named session
})

// middleare to handle sessions 
app.use( session ({
    secret: process.env.SESSION_SECRET,   // secret key for session which protects session data 
    resave:false,   //Save session only when modified
    saveUninitialized: false,  // Session created only after login or data added 
    store: store  
}))

app.use((req, res, next) =>{
    res.locals.isLoggedIn = req.session.isLoggedIn; // 
    res.locals.user = req.session.user; //
    next();
})


app.get((req, res, next) =>{
    console.log("server started")
    
})
 


 
app.use(authRouter)
app.use(readerRouter)

app.use('/publisher', (req, res, next) =>{
  if(req.session.isLoggedIn){
    next();
  }else{
   return res.redirect('/login')
  }
})
app.use( publisherRouter )



const PORT = process.env.PORT  || 3008;
const DB_PATH = process.env.DB_PATH 
mongoose.connect(DB_PATH).then( () => {
console.log("db connected")
app.listen(PORT, () => {
console.log(`server is started at http://localhost:${PORT}`)
})
}).catch( err => {
    console.log("error while connecting to db", err)
})


