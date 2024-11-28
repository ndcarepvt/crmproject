import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/db.js'
import userRouter from './routes/user.route.js'
import incentiveRouter from './routes/incentive.route.js'


// App Config
const port = process.env.PORT || 4000
const app = express()


// Intialize middleware
app.use(express.json())
app.use(cors({
  origin: 'https://ndayurveda.vercel.app' // or '*' to allow all origins
}));

// Connect Database
connectDB()

// API Routes
app.use('/api/incentive', incentiveRouter)
app.use('/api/user', userRouter)


app.get('/' ,(req, res)=>{
  res.send("API Working")
})

app.post('/webhook' ,(req, res)=>{
  console.log(req.body)
})

app.listen(port,()=>{
  console.log(`The server is running on http://localhost:${port}`)
})