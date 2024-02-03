import { config } from 'dotenv';
config()

export const TOKEN_SECRET = process.env.TOKEN_SECRET || 'secret_key'

export const HOST_DATABASE = process.env.HOST_DATABASE || '127.0.0.1'
export const PORT_DATABASE = process.env.PORT_DATABASE || 3306
export const USER_DATABASE = process.env.USER_DATABASE || 'root'
export const PASSWORD_DATABASE = process.env.PASSWORD_DATABASE || '12345678'
export const DATABASE_NAME = process.env.DATABASE_NAME || 'prueba_tecnica'

export const PORT = process.env.PORT || 3000
export const HOST_LISTEN = process.env.HOST_LISTEN || '0.0.0.0'
