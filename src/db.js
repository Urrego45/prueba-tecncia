import {
    HOST_DATABASE,
    PORT_DATABASE,
    USER_DATABASE,
    PASSWORD_DATABASE,
    DATABASE_NAME,
} from './config.js';
import { createPool } from "mysql2/promise";


export const pool = createPool({
    host: HOST_DATABASE,
    port: PORT_DATABASE,
    user: USER_DATABASE,
    password: PASSWORD_DATABASE,
    database: DATABASE_NAME
})