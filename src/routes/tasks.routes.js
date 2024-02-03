import express from 'express';
import { authRequired } from '../middlewares/validateToken.js'
import {
    getTasks,
    createTask,
    updateTask,
    deleteTask
} from '../controllers/tasks.constroller.js';
import { validateSchema } from '../middlewares/validator.js';
import { registerUpdateTaskSchema } from '../schemas/tasks.schema.js';

const router = express.Router()

router.get('/tasks', authRequired, getTasks)
router.post('/tasks', authRequired, validateSchema(registerUpdateTaskSchema), createTask)
router.put('/tasks/:id', authRequired, validateSchema(registerUpdateTaskSchema), updateTask)
router.delete('/tasks/:id', authRequired, deleteTask)


export default router