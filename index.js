const express = require("express");
const path = require("path");
const userRouter = require("./routes/user");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { checkForAuthMid } = require("./middlewares/auth");
const Bell = require("./models/bell_data");

const port = 5543;
const app = express();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
mongoose.connect("mongodb://localhost:27017/Ronogenesis_school",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(e => console.log("MongoDB connected"));

app.set('view engine', 'ejs');
app.set('views', path.resolve("./views"));
app.use(express.static("public"))
app.use(express.static(path.join(__dirname, 'public/css/Home')));
app.use(cookieParser());

app.get("/data/Bell", async (req, res) => {
    try {
        const userId = req.query.id;
        const bells = await Bell.find({ createdBy: userId });
        res.json(bells)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" });
    }
})
app.use(checkForAuthMid("token"));

app.use("/", userRouter);

app.listen(port, () => {
    console.log(`Listening at ${port}`);
})