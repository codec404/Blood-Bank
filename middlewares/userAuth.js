// Decrypt token
import jwt from "jsonwebtoken"

export const userAuth = async (req,res,next) => {
    try{
        const token = req.headers['authorization'].split(" ")[1]
        jwt.verify(token, process.env.JWT_SECRET ,(err,decode) => {
            if(err){
                return res.status(401).send({
                    success: false,
                    message: "Authentication Failed"
                })
            }
            else{
                req.body.userId = decode.userId
                next();
            }
        })
    }
    catch(error){
        console.log("Error in userAuth");
        res.status(401).send({
            success: false,
            message: "Authentication Failed"
        })
    }
}