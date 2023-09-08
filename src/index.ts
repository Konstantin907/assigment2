import { app } from "./app";

const PORT = 3001;
const HOST = "localhost"



app.listen(PORT, HOST, ()=>{
    console.log(`Server running on http://${HOST}:${PORT}`);
})