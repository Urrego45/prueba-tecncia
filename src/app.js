import express from 'express';
import routesLogin from './routes/login.routes.js';
import morgan from "morgan"
import cookieParser from "cookie-parser"

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use("/api", routesLogin)

export default app