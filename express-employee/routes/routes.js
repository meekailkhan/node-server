import express from "express";
import contro from '../controllers/controll.js'

const router = express.Router();

router.get('/',contro)

router.get('/:id', contro)


router.post("/", contro)

router.patch('/:id',contro);


router.delete('/:id', contro);


export default router