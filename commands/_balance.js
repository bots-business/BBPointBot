/*CMD
  command: /balance
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 

  <<KEYBOARD

  KEYBOARD
  aliases: 💎 balance
CMD*/

if(chat.chat_type!="private"){ return }

let res = Libs.ResourcesLib.userRes("BBPoint");
Bot.sendMessage("You have: " + res.value() + "💎");

