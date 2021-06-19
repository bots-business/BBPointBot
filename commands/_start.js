/*CMD
  command: /start
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
CMD*/

if(chat.chat_type!="private"){ return }

Bot.runCommand("/start-info")

if(params&&params.includes("req")&&params.includes("-points-to-")){
  Bot.runCommand("/onRequest " + params);
}

if(params&&(params=="link")){
  Bot.runCommand("/link")
}
