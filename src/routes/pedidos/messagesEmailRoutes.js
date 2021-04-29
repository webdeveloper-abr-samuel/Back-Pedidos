const express = require('express');
const router = express.Router();
const messagesEmailController = require('../../controllers').messagesEmailController;

router.post("/", messagesEmailController.post);
router.post("/emailMessage", messagesEmailController.postMessages);

module.exports = router;