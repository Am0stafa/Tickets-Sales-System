import express from "express";
import userController from "../controllers/userController.js";
const router = express.Router();

router.route("/").get(userController.getAllUsers);   
router.route("/:id").get(userController.getUserById);
router.route("/mail/:email").get(userController.getIdByEmail);
router.route("/create").post(userController.createUser);
router.route("/ticket/:id").get(userController.getTicketById);

export default router;
