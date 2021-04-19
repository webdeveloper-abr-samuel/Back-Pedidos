const express = require('express');
const router = express.Router();
const { verifyToken } = require("../../middleware/authentication");
const statisticsDistributorController = require('../../controllers').statisticsDistributorController;

router.post("/Lineal", verifyToken, statisticsDistributorController.getChartLineal);
router.get("/Pie", verifyToken, statisticsDistributorController.getChartPie);

module.exports = router;