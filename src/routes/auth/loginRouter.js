const express = require('express');
const router = express.Router();
const loginController = require('../../controllers').loginController;

router.post("/validateTerminos", loginController.postTerminos);
router.post("/", loginController.login);
router.put("/", loginController.update);

module.exports = router;