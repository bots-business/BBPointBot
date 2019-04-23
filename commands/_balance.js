/*CMD
  command: /balance
  help: 
  need_reply: 
  auto_retry_time: 
  answer: 

  <<KEYBOARD

  KEYBOARD
  aliases: 💎 balance
CMD*/

let res = Libs.ResourcesLib.userRes("BBPoint");
Bot.sendMessage("You have: " + res.value() + "💎");

