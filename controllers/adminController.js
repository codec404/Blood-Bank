import userModel from "../models/userModel.js";

//GET DONOR
export const getDonorListController = async (req,res) => {
    try {
        const donorData = await userModel.find({role: "Donor"}).sort({createdAt: -1})
        return res.status(200).send({
            success: true,
            Totalcount : donorData.length,
            message: "Fetched Donor List",
            donorData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Donor-LIST API"
        })
        
    }
}

//GET HOSPITAL
export const getHospitalListController = async (req,res) => {
    try {
        const hospitalData = await userModel.find({role: "Hospital"}).sort({createdAt: -1})
        return res.status(200).send({
            success: true,
            Totalcount : hospitalData.length,
            message: "Fetched Hospital List",
            hospitalData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Hospital-LIST API"
        })
        
    }
}

//GET ORGANIZATION
export const getOrgListController = async (req,res) => {
    try {
        const orgData = await userModel.find({role: "Organization"}).sort({createdAt: -1})
        return res.status(200).send({
            success: true,
            Totalcount : orgData.length,
            message: "Fetched Organization List",
            orgData
        })
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success: false,
            message: "Error in Organization-LIST API"
        })
        
    }
}

//DELETE DONOR
export const deleteDonor = async (req,res) =>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Donor Record Deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting donor",
            error
        })
    }
}

//DELETE HOSPITAL
export const deleteHospital = async (req,res) =>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Hospital Record Deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting Hospital",
            error
        })
    }
}

//DELETE ORGS
export const deleteOrg = async (req,res) =>{
    try {
        await userModel.findByIdAndDelete(req.params.id)
        return res.status(200).send({
            success: true,
            message: "Organization Record Deleted"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: "Error while deleting Organization",
            error
        })
    }
}