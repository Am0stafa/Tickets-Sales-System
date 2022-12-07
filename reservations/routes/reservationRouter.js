import express from "express";
import reservationController from "../controller/reservationController.js";

const router = express.Router();

router.route("/cart")
    .post(reservationController.addTicketToCart);

router.route("/purchase")
    .post(reservationController.purchased);



   


export default router;