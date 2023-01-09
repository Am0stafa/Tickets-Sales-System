import express from "express";
import reservationController from "../controller/reservationController.js";

const router = express.Router();

router.route("/pending")
    .post(reservationController.addTicketToCart);

router.route("/purchase")
    .post(reservationController.purchased);

router.route("/cancel")
    .post(reservationController.cancel);
    
router.route("/pendingMatch")
    .patch(reservationController.consumePendingTicket);
    
router.route("/successMatch")
    .patch(reservationController.consumeSuccess);

router.route("/consumeCancel")
    .patch(reservationController.consumeCancel);



export default router;