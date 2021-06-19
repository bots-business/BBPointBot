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

if(!user){ return }
if(!message){ return }
if(!request.reply_to_message){ return }

if(isNumeric(message)){
  // User can get points with reply "[numeric]"

  Bot.run({ 
    command: "transfer",
    options: { message: parseInt(message), reply_to_message: request.reply_to_message }
  })
}



