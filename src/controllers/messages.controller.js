const {saveMessage, getMessageById, getMessagesByChannelId, editMessage, deleteMessage, getChannelId} = require("../services/message.service")
const { v4: uuid } = require('uuid')
const hashGenerator = require("../utils/hashGenerator")

const saveMessageController = async (req,res,next) => {
    const channelId = hashGenerator(req.params.sender+req.body.receiver);
    const result = await saveMessage(req.params.sender, req.body.receiver, req.body.messageContent, req.body.attatchment, channelId)
    res.status(200).send({
        message:"Message saved",
        id: result,
        channelId
    })
}

const getMessageByIdController = async (req,res,next) => {
    const message = await getMessageById(req.params.messageId, req.body.sender, req.body.receiver)
    res.status(200).send({
        message_content:message.message_content,
        attatchment: message.attatchment
    })
}

const getMessagesByChannelIdController = async (req,res,next) => {
    const messages = await getMessagesByChannelId(req.params.channelId)
    res.status(200).send(messages)
}

const editMessageController = async (req,res) => {
    const updatedMessage = await editMessage(req.params.channelId, req.params.messageId, req.body.message)
    res.status(200).send(updatedMessage)
}

const deleteMessageController = async (req,res) => {
    const deletedMessage = await deleteMessage(req.params.channelId,req.params.messageId, req.body.sender)
    res.status(200).send(deletedMessage)
}

const getChannelIdController = async (req,res) => {
    const channelId = await getChannelId(req.query.sender,req.query.receiver);
    res.status(200).send(channelId);
}

module.exports = {
    saveMessageController,
    getMessageByIdController,
    getMessagesByChannelIdController,
    editMessageController,
    deleteMessageController,
    getChannelIdController
}