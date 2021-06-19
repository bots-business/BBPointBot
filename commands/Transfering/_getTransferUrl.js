/*CMD
  command: /getTransferUrl
  help: 
  need_reply: false
  auto_retry_time: 
  folder: Transfering

  <<ANSWER

  ANSWER
  keyboard: 
  aliases: 
CMD*/

// send this link only in PM - secure reason
if(chat.chat_type!="private"){
  return
}

// user's webhook
let webhookUrl = Libs.Webhooks.getUrlFor({
  // this command will be runned on webhook
  command: "onTransferRequest",
  // execute for this (current) user
  user_id: user.id,
})

Bot.sendMessage("Use this url for transfer your BB Points to another user")
Bot.inspect(webhookUrl);
