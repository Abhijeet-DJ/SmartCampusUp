const { validateUser } = require("../services/authentication");

function checkForAuthMid(cookieName) {
    return (req, res, next) => {
        console.log("middleware activated");
        
        const tokenValue = req.cookies[cookieName];

        if (!tokenValue) {
           return next();
        }

        try {
            const userPayload = validateUser(tokenValue);
            console.log("Payload Created..");
            
            req.user = userPayload;
        } catch (error) {console.log(error);};
        
        return next();
    }
}

module.exports = { checkForAuthMid };