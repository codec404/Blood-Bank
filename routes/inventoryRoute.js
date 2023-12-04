import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { createinventoryController, getInventoryController } from "../controllers/inventoryController.js";

const router = express.Router()

//CREATE INVENTORY
router.post('/create-inventory',userAuth,createinventoryController)

//GET INVENTORY DATA
router.get('/get-inventory-data',userAuth,getInventoryController)

export default router