import User from "../../DB/modules/user.model.js";
import Message from "../../DB/modules/message.model.js";
import {getAllMessagesSchema }from './messages.validation.js'; 


export const sendMessage = async (req, res, next) => {
  try {
    const { content, recipientId } = req.body;

    // التحقق من وجود المستلم
    const recipient = await User.findById(recipientId);
    if (!recipient) {
      return next(new Error("Recipient not found", { cause: 404 }));
    }

    // إنشاء الرسالة
    const message = await Message.create({
      content,
      sender: req.user._id,
      receiver: recipientId
    });

    return res.status(201).json({
      message: "Message sent successfully",
      result: message
    });
  } catch (error) {
    next(error);
  }
};




export const getSingleMessage = async (req,res,next)=> {

    const {messageId} = req.params;
    const message = await Message.findById(messageId).populate([
      { path: 'sender', select: 'name email -_id' },
      { path: 'receiver', select: 'name email -_id' }
    ]);
    if (!message) return next (new Error("Message not found" , {cause: 404}) );

    // Check if the user is authorized to view the message

    if (message.receiver?.email === req.user.email || message.sender?.email === req.user.email) {
      return res.status(200).json({message: "get single message successfully", result: message})
    }
    
    return next (new Error("You are not authorized to view this message" , {cause: 403}) );
}


export const getAllMessages = async (req,res,next)=> {
    const {flag} = req.query;
    // if (flag === "inbox") {
    //     const messages = await Message.find({ receiver: req.user._id });
    //     return res.status(200).json({message: "get all inbox messages successfully", result: messages})
    // }

    // if (flag === "sent") {
    //     const messages = await Message.find({ sender: req.user._id });
    //     return res.status(200).json({message: "get all sent messages successfully", result: messages})
    // }

    return res.status(200).json({message: "get all messages successfully" , result:flag === "inbox" ? await Message.find({receiver: req.user._id}) :
     await Message.find({sender: req.user._id})})
}




export const updateMessage = async (req,res,next) => {
    return res.status(200).json({message: "update message successfully"})
}



export const deleteMessage = async (req,res,next) => {
    return res.status(200).json({message: "delete message successfully"})
}