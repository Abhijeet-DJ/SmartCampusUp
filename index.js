const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthMid } = require("./middlewares/auth");

const port = 5543;
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({extended : false}));
mongoose.connect("mongodb://localhost:27017/Ronogenesis_school").then(e => console.log("MongoDB connected"));

app.set('view engine','ejs');
app.set('views',path.resolve("./views"));
app.use(express.static("public"))
app.use(express.static(path.join(__dirname, 'public/css/Home')));
app.use(cookieParser());
app.use(checkForAuthMid("token"));

app.use("/",userRouter);

app.listen(port,()=>{
    console.log(`Listening at ${port}`);
})