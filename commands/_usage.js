/*CMD
  command: /usage
  help: 
  need_reply: 
  auto_retry_time: 
  answer: 
  keyboard: 
  aliases: 📊 usage
CMD*/

let adminDaily = Libs.ResourcesLib.anotherChatRes("admin-daily", "bot");
let adminDailyRemove = Libs.ResourcesLib.anotherChatRes("admin-remove-daily", "bot");

let mpDaily = Libs.ResourcesLib.anotherChatRes("masters-daily", "bot");
let mpDailyRemove = Libs.ResourcesLib.anotherChatRes("master-remove-daily", "bot");

let mp = Libs.ResourcesLib.anotherChatRes("bbmp", "bot");

usersDaily = Libs.ResourcesLib.anotherChatRes("users-daily", "bot");

msg = "*Current daily usage* " +
  "\n\nAdmin handed out: " + adminDaily.value()+
  "\n   ❌ removed: " + adminDailyRemove.value()+
  
  "\n\n🤠 Masters handed out: " + mpDaily.value()+ "/ 🔮" + mp.value() +
  "\n   ❌ removed: " + mpDailyRemove.value() +
  
  "\n\n👥 Users handed out: " + usersDaily.value();

Bot.sendMessage(msg);


