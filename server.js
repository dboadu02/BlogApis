import express from 'express'
import dotenv from 'dotenv'
import connectDb from './db/mongodb.js'
import userRouter  from './routers/userRouter.js'
import otpRouter from './routers/otpRouter.js'
import authRouter from './routers/authRouter.js'
import passwordResetRouter from './routers/passwordResetRouter.js'
import postRouter from './routers/postRouter.js'
import commentRouter from './routers/commentRouter.js'
import cookieParser from 'cookie-parser'

dotenv.config()
connectDb()

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser())

app.use("/api", userRouter)
app.use("/api/otp", otpRouter)
app.use("/api", authRouter)
app.use("/api", passwordResetRouter)
app.use("/api", postRouter)
app.use("/api", commentRouter)



const port = process.env.PORT


app.listen(port, ()=>{
    console.log(`server is running on port ${port}`)
})