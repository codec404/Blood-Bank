import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { createinventoryController, getDonorController, getHospitalController, getInventoryController, getInventoryHospitalController, getOrganizationController, getOrganizationControllerForHospital, getRecentInventoryController } from "../controllers/inventoryController.js";

const router = express.Router()

//CREATE INVENTORY
router.post('/create-inventory',userAuth,createinventoryController)

//GET INVENTORY DATA
router.get('/get-inventory-data',userAuth,getInventoryController)

//GET HOSPITAL INVENTORY DATA
router.post('/get-hospital-inventory-data',userAuth,getInventoryHospitalController)

//GET DONOR DATA
router.get('/get-donor-data',userAuth,getDonorController)

//GET RECENT INVENTORY
router.get('/get-recent-inventory',userAuth,getRecentInventoryController)

//GET HOSPITAL DATA
router.get('/get-hospital-data',userAuth,getHospitalController)

//GET ORGANIZATION DATA
router.get('/get-organization-data',userAuth,getOrganizationController)

// GET ORGANIZATION FOR HOSPITAL
router.get('/get-organization-for-hospital',userAuth,getOrganizationControllerForHospital)

export default router