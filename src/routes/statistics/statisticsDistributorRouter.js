const express = require('express');
const router = express.Router();
const { verifyToken } = require("../../middleware/authentication");
const statisticsDistributorController = require('../../controllers').statisticsDistributorController;

router.post("/Lineal", verifyToken, statisticsDistributorController.getChartLineal);
router.get("/States", verifyToken, statisticsDistributorController.getChartStates);
router.post("/Pie", verifyToken, statisticsDistributorController.getChartPie);


module.exports = router;