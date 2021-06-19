/*CMD
  command: /exchange
  help: exchange BB points 💎 to iterations
  need_reply: 
  auto_retry_time: 
  folder: 🌀 Exchange
  answer: 
  keyboard: 
  aliases: 🌀 exchange
CMD*/

if(chat.chat_type!="private"){ return }

let res = Libs.ResourcesLib.userRes("BBPoint");

if(!BBAdmin.curUser.parentAccount){
  Bot.runCommand("/no-linked-account");
}else{
  Bot.sendMessage("You have: " + res.value() + "💎 BB Points (BBP)." + 
   "\n\n1 💎 - it is 50 ⚡ Extra Points (EP)." +
   "\n\nYou can change your:\n" + res.value() + "💎 BBP to " + 50*res.value() + " ⚡ EP." +
   "\n\n\nAlso you can change your EP to BBP: " +
    "\n⚡ 60 EP - it is 💎 1 BBP"
  );
  Bot.runCommand("/doexchange");
}

