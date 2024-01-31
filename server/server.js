const express = require("express");
const cors = require("cors");
require('dotenv').config();
const app = express();
const cookieParser = require("cookie-parser")


app.use(cors({credentials:true, origin:'http://localhost:5173'}))

app.use(express.json(), express.urlencoded({extended:true}));
app.use(cookieParser())

// requires mongoose config file so that its available to our express method
require("./config/mongoose.config");
// // requires our routes folder which houses a function with parameter of app. Epxress muse be added as argument
require("./routes/user.routes")(app);


app.listen(8000, () => {
    console.log("listening on port 8000")
});