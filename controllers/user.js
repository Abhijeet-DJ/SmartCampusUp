const User = require("../models/user")

function handleSignIn(req, res) {
    return res.render("signIn");
}

async function handleLogIn(req, res) {

    const { email, pass } = req.body;
    console.log(email,pass);

    try {
        const token = await User.matchPass(email, pass);

        if (token) {
            console.log("cookie created");
            return res.cookie("token",token).redirect("/");
        }
    } catch (error) {
        console.log("error in cookie creation...");
        console.log(error);
        return res.render("SignIn",{
            error: 'Incorrect Email or Password'
        });
    }
}

function handleSignUp(req, res) {
    return res.render("SignUp");
}

async function handleUserCreation(req, res) {

    const { fullName, email, pass } = req.body;

    await User.create({ fullName, email, pass });

    console.log(`user created : ${User}`);
    

    return res.redirect("/");
}


module.exports = {
    handleSignIn,
    handleLogIn,
    handleSignUp,
    handleUserCreation
} 