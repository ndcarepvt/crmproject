import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import invoiceRouter from './routes/invoice.route.js'
import connectDB from './config/db.js'
import userRouter from './routes/user.route.js'


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
app.use('/api/invoice', invoiceRouter)
app.use('/api/user', userRouter)


app.get('/' ,(req, res)=>{
  res.send("API Working")
})

app.listen(port,()=>{
  console.log(`The server is running on http://localhost:${port}`)
})