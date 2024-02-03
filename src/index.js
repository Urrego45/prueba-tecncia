import {
    PORT,
    HOST_LISTEN
} from './config.js';
import app from "./app.js"

app.listen(PORT, HOST_LISTEN, () => {
    console.log(`>>> Server on port ${PORT}`)
})

