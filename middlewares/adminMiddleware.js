import userModel from "../models/userModel.js"
export const adminAuth = async (req,res,next) => {
    try {
        const user = await userModel.findById(req.body.userId)

        //CHECK ADMIN
        if(user ?. role !== 'Admin'){
            return res.status(401).send({
                success: false,
                message: "Auth Failed"
            })
        }
        else{
            next();
        }
    } catch (error) {
        console.log(error);
        return res.status(401).send({
            success: false,
            message: "Auth Failed, ADMIN API",
            error
        })
    }
}