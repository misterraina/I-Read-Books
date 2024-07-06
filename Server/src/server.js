import dotenv from 'dotenv';
import {connectDb} from './db/index.js'
import { app } from './app.js';

dotenv.config({
    path:"./.env"
});

connectDb()
.then( ()=>{
    app.listen(process.env.PORT || 5000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT} || 5000 `)
    
    app.on("error", (error) => {
        console.log("ERRR on connecting app: ", error)
        throw error
    })
    }) 
})
.catch((err) => {
    console.log("Postgresql connection failed !!! ", err)
})

