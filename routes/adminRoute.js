import express from "express";
import { deleteDonor, deleteHospital, deleteOrg, getDonorListController, getHospitalListController, getOrgListController } from "../controllers/adminController.js";
import { userAuth } from "../middlewares/userAuth.js";
import { adminAuth } from "../middlewares/adminMiddleware.js";

//ROUTER
const router = express.Router();

router.get("/get-donor-list",userAuth,adminAuth,getDonorListController)
router.get("/get-hospital-list",userAuth,adminAuth,getHospitalListController)
router.get("/get-org-list",userAuth,adminAuth,getOrgListController)

//DELETE
router.delete("/delete-donor/:id",userAuth,adminAuth,deleteDonor)
router.delete("/delete-hospital/:id",userAuth,adminAuth,deleteHospital)
router.delete("/delete-org/:id",userAuth,adminAuth,deleteOrg)

export default router