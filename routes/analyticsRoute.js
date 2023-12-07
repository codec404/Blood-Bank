import express from "express";
import { userAuth } from "../middlewares/userAuth.js";
import { bloodGroupDetailsController } from "../controllers/analyticsController.js";

const router = express.Router()

//CREATE INVENTORY
router.get('/blood-groups-data',userAuth,bloodGroupDetailsController)


export default router