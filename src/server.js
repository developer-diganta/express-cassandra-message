const express = require("express");
const models = require("./configs/cassandra.config");
const app = express();
const { v5: uuid } = require('uuid');
const errorHandler = require("./middlewares/errorHandler.middleware");
const PORT = 3000;
const messageRoutes = require("./routes/message.routes")
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use("/api/v1",messageRoutes)

app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log("Listening on port " + PORT);
})