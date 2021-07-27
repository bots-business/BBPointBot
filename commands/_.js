/*CMD
  command: *
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

if (!user) { return }

if (!message) { return }

if (!request.reply_to_message) { return }

// User can get points with reply "[numeric]"
if (!isNumeric(message)) {
  return
}


if(request.reply_to_message.from.username==bot.name){
  Bot.sendMessage("I don't need your BB Points 😅")
  return
}


Bot.run({
  command: "transfer",
  options: {
    message: parseInt(message),
    reply_to_message: request.reply_to_message
  }
})

