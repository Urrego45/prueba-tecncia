import express from 'express';
import morgan from "morgan"
import cookieParser from "cookie-parser"

import routesLogin from './routes/login.routes.js';
import routesTasks from './routes/tasks.routes.js';

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(cookieParser())

app.use("/api", routesLogin)
app.use("/api", routesTasks)

export default app