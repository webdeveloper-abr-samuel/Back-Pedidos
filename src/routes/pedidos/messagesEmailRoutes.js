const express = require('express');
const router = express.Router();
const messagesEmailController = require('../../controllers').messagesEmailController;
const { verifyToken } = require("../../middleware/authentication");

router.post("/",verifyToken, messagesEmailController.post);
router.post("/emailMessage",verifyToken, messagesEmailController.postMessages);

module.exports = router;