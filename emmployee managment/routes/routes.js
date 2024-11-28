const express = require('express');
const router = express.Router();
const emp = require('../models/controll');
const controll = require('../controller/control')

router.get('/' , controll.handleGetAllEmploye)

router.get('/:id', controll.handleGetEmployeById)

router.post("/",controll.handleAddEmploye);

router.delete('/:id',controll.handleRemoveEmploye)

module.exports = router