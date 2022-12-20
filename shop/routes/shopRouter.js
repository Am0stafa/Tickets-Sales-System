import express from "express";
import shopController from "../controller/shopController.js";

const router = express.Router();

router.route("/matches").get(shopController.getAll);
router.route("/:id").get(shopController.getMatchById);   
router.route("/availability/:matchId").get(shopController.getAvailability);   
router.route("/catagories/:matchId").get(shopController.availableCat);   


export default router;