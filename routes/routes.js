import express from "express";
import controller from '../controllers/controll.js'

const router = express.Router();

router.route("/").get(controller).post(controller)

router.route('/:id')
.get(controller)
.patch(controller)
.delete(controller)


export default router