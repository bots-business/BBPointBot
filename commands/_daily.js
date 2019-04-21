/*CMD
  command: /daily
  help: 
  need_reply: 
  auto_retry_time: 86400
  answer: 
  keyboard: 
  aliases: 
CMD*/

if(user){ return }

let reward;

// max = 50
let mpDaily = Libs.ResourcesLib.anotherChatRes("masters-daily", "bot");  
// max = 10
reward = Math.round( mpDaily.value() / 5 );

let masters = Bot.getProperty("masters");
let msg = "Daily reward for Masters +" + reward + "💎 BB Points:\n"
let res;


for(let i in masters){
  if(!masters[i]){ continue }
  msg = msg + "\n🤠 " + Libs.commonLib.getNameFor(masters[i]) + ": +" + reward + "💎";

  res = Libs.ResourcesLib.anotherUserRes("BBPoint", masters[i].id);
  res.add(reward);
}

Bot.sendMessageToChatWithId("-1001390263766", msg)
Api.sendMessage({ chat_id: "@bbpoints", text: msg  } );


// send usage statistics
let adminDaily = Libs.ResourcesLib.anotherChatRes("admin-daily", "bot");
let adminDailyRemove = Libs.ResourcesLib.anotherChatRes("admin-remove-daily", "bot");

let mpDailyRemove = Libs.ResourcesLib.anotherChatRes("master-remove-daily", "bot");

usersDaily = Libs.ResourcesLib.anotherChatRes("users-daily", "bot");


let mp = Libs.ResourcesLib.anotherChatRes("bbmp", "bot");

msg = "*Current daily usage* " +
  "\n\nAdmin handed out: " + adminDaily.value()+
  "\n   ❌ removed: " + adminDailyRemove.value()+
  
  "\n\n🤠 Masters handed out: " + mpDaily.value() + "/ 🔮" + mp.value() +
  "\n   ❌ removed: " + mpDailyRemove.value() +
  
  "\n\n👥 Users handed out: " + usersDaily.value();

// reset daily stats
adminDaily.set(0);
adminDailyRemove.set(0);
mpDaily.set(0);
mpDailyRemove.set(0);
usersDaily.set(0);

Api.sendMessage({ chat_id: "@bbpoints", text: msg  } );

