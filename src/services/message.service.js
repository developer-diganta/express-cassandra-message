const models = require("../configs/cassandra.config");
const { v4: uuid } = require('uuid');
const util = require("util");
const saveMessage = async (sender,receiver, messageContent, attatchment, channelId) => {
    const id = models.timeuuidFromDate(new Date())
    const newMessageData = {
        id,
        channel_id:channelId,
        sender: models.uuidFromString(sender),
        receiver:models.uuidFromString(receiver),
        message_content:messageContent,   
    }

    if(attatchment){
        newMessageData.attatchment = attatchment
    }
    var newMessage = new models.instance.MessageStore(newMessageData);
    await newMessage.save(function(err){
        if(err) {
            throw new TypeError("Error saving data")
        }
    });
    return id;
}

const getMessageById = async (messageId, sender, receiver) => {
    const query = {
        sender:models.uuidFromString(sender),
        receiver: models.uuidFromString(receiver),
        id: models.timeuuidFromString(messageId)
    }
    const findOneAsync = util.promisify(models.instance.MessageStore.findOne).bind(models.instance.MessageStore);
    const message = await findOneAsync(query, { raw: true, allow_filtering: true });
    return message;

}

const getMessagesByChannelId = async (channelId) => {
    const query = {
        channel_id:channelId
    }
    const findAsync = util.promisify(models.instance.MessageStore.find).bind(models.instance.MessageStore);

    const messages = await findAsync(query,{raw:true, allow_filtering:true});
    if(!messages.length){
        throw new TypeError("Invalid data")
    }
    return messages;
}

const editMessage = async (channelId, messageId, message) => {
    const searchByQuery = {
        id: models.timeuuidFromString(messageId),
        channel_id: channelId
    }
    const updateQuery = {
        message_content:message,
        edited:true,
    }
    const updateAsync = util.promisify(models.instance.MessageStore.update).bind(models.instance.MessageStore);

    const updatedMessage = await updateAsync(searchByQuery,updateQuery,{if_exists: true})
    if(updatedMessage.rows && updatedMessage.rows.length>0 && updatedMessage.rows[0]['[applied]']==false){
        throw new TypeError("Invalid data")
    }
    return "Message Edited";
}

const deleteMessage = async (channelId, messageId) => {
    const searchByQuery = {
        channel_id: channelId,
        id: models.timeuuidFromString(messageId),
    }
    const findOneAsync = util.promisify(models.instance.MessageStore.findOne).bind(models.instance.MessageStore);
    // alternate way to check deletion ---------------------
    const messageBefore = await findOneAsync({
        id:models.timeuuidFromString(messageId)
    }, { raw: true, allow_filtering: true });
    if(!messageBefore){
        throw new TypeError("Invalid data")
    }
    //---------------------------


    const deleteMessage = util.promisify(models.instance.MessageStore.delete).bind(models.instance.MessageStore);
    const deletedMessage = await deleteMessage(searchByQuery);
    
    
    // alternate way to check deletion ------------------
    const messageAfter = await findOneAsync({
        id:models.timeuuidFromString(messageId)
    }, { raw: true, allow_filtering: true });
    if(messageAfter){
        throw new Error("Internal Server Error")
    }
    //----------------------
    return "Message Deleted"
}

const getChannelId = async(sender,receiver) => {
    const findOneAsync = util.promisify(models.instance.MessageStore.findOne).bind(models.instance.MessageStore);
    const channelId = await findOneAsync({
        sender:models.uuidFromString(sender),
        receiver: models.uuidFromString(receiver)
    },{ select:['channel_id'],allow_filtering: true })
    return channelId;
}
module.exports = {
    saveMessage,
    getMessageById,
    getMessagesByChannelId,
    editMessage,
    deleteMessage,
    getChannelId
};





                                  
                            