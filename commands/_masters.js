/*CMD
  command: /masters
  help: 
  need_reply: 
  auto_retry_time: 
  answer: 
  keyboard: 
  aliases: 🤠 masters
CMD*/

let masters = Bot.getProperty("masters");
let msg = "*Masters:*"

for(let i in masters){
  if(!masters[i]){ continue }
  msg = msg + "\n🤠 " + Libs.commonLib.getNameFor(masters[i]);
}

let mp = Libs.ResourcesLib.anotherChatRes("bbmp", "bot");
msg = msg + "\n\n*Masters can:*\n-hand out 💎 BB points: 1, 2\n-can take points: ❌ -1, -2, -3";

msg = msg + "\n\nNow Masters have:\n*" + mp.value() + " 🔮 BB Master Points*.\n\nReset progress: " +
  mp.growth.progress().toFixed(2) + "%"

msg = msg + "\n\nInfo: https://telegra.ph/BB-Masters-04-21"

Bot.sendMessage(msg);

