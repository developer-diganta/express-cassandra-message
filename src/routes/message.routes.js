const express = require('express');
const asyncHandler = require('../middlewares/asyncHandler.middleware');
const { saveMessageController, getMessageByIdController, getMessagesByChannelIdController, editMessageController, deleteMessageController, getChannelIdController } = require('../controllers/messages.controller');
const router = express.Router();

router.post("/senders/:sender/message/save", asyncHandler(saveMessageController));
router.get("/messages/:messageId", asyncHandler(getMessageByIdController));
router.get("/channels/:channelId/messages", asyncHandler(getMessagesByChannelIdController));
router.route("/channels/:channelId/messages/:messageId").patch(asyncHandler(editMessageController))
      .delete(asyncHandler(deleteMessageController));
router.get("/channelId", asyncHandler(getChannelIdController))
module.exports = router;




















