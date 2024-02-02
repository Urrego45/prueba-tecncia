import express from 'express';
import {
    register,
    listUsers,
    login,
    logout,
    verifyToken
} from '../controllers/login.controller.js';
import { validateSchema } from '../middlewares/validator.js';
import { loginSchema, registerSchema } from '../schemas/login.schema.js';

const router = express.Router()


router.post('/register', validateSchema(registerSchema), register)
router.post('/login', validateSchema(loginSchema), login)
router.post('/logout', logout)
router.get('/verify', verifyToken)
router.get('/list-user', listUsers)


export default router

