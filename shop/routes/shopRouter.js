import express from "express";
import shopController from "../controller/shopController.js";

const router = express.Router();

router.route("/matches").get(shopController.getAll);  
router.route("/availability/:matchId").get(shopController.getAvailability);
router.route("/allAvailability").get(shopController.getAllAvailability);  
router.route("/hold").get(shopController.getHold); 
router.route("/hold/:id").get(shopController.getHoldMatch);
router.route("/catagories/:matchId").get(shopController.availableCat);

// Statistics
router.route("/catagories/sold/:matchId").get(shopController.getSoldCat);
router.route('/dashboard').get(shopController.getDashboard);
router.route('/catagories/stats/:matchId').get(shopController.getCatStats);
  
//

export default router;