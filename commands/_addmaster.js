/*CMD
  command: /addmaster
  help: 
  need_reply: 
  auto_retry_time: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

function isAdmin(){
  let admin_tg_id = 519829299;
  return (user.telegramid==admin_tg_id);
}

if(!isAdmin()){ return }

if(!request.reply_to_message){ return }
if(!request.reply_to_message.from){ return }

otherUser = request.reply_to_message.from;

let masters = Bot.getProperty("masters")
if(!masters){ masters = {} }

let msg = "User is Master already: 🤠" + Libs.commonLib.getNameFor(otherUser); 

if(!masters[otherUser.id] ){
  masters[otherUser.id] = otherUser;
  msg = "Congratulations we have a new Master!\n\nUser is Master now: 🤠" + Libs.commonLib.getNameFor(otherUser);
  Bot.setProperty("masters", masters, "json");
}

Bot.sendMessage(msg);
