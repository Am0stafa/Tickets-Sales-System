import express from "express";
import shopController from "../controller/shopController.js";

const router = express.Router();

router.route("/matches").get(shopController.getAll);
router.route("/:id").get(shopController.getMatchById);   


export default router;