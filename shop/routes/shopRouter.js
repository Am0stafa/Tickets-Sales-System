import express from "express";
import shopController from "../controller/shopController.js";

const router = express.Router();

router.route("/matches").get(shopController.getAll);  
router.route("/availability/:matchId").get(shopController.getAvailability);
router.route("/allAvailability").get(shopController.getAllAvailability);  
router.route("/hold").get(shopController.getHold); 
router.route("/catagories/:matchId").get(shopController.availableCat);   


export default router;