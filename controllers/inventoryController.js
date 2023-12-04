import inventoryModel from "../models/inventoryModel.js";
import userModel from "../models/userModel.js";

//CREATE INVENTORY
export const createinventoryController = async (req,res,next) => {
    try {
        //validation
        const {email,inventoryType} = req.body
        const user = await userModel.findOne({email})
        if(!user){
            throw new Error("User not found")
        }
        if(inventoryType === "in" && user.role !== "Donor"){
            throw new Error("Not a donor account")
        }
        if(inventoryType === "out" && user.role !== "Hospital"){
            throw new Error("Not a hospital account")
        }
        
        //save record
        const inventory = new inventoryModel(req.body)
        await inventory.save()
        return res.status(200).send({
            success: true,
            message: "New Blood record added"
        })
    } catch (error) {
        console.log("Error");
        res.status(500).send({
            success: false,
            message: "Error in create inventory API",
            error
        })
    }
};

// Get Inventory based on organization
export const getInventoryController = async (req,res) => {
    try {
        const inventory = await inventoryModel.find({
            organization: req.body.userId
        }).populate("donor").populate("hospital").sort({createdAt : -1});
        return res.status(200).send({
            success: true,
            message: "Inventory Found",
            inventory
        })
    } catch (error) {
        console.log("Error");
        res.status(404).send({
            success: false,
            message: "Error in getInventory API",
            error
        })
    }
}