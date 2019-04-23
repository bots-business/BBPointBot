/*CMD
  command: /setupbbmp
  help: 
  need_reply: 
  auto_retry_time: 
  answer: BB Master Points setuped
  keyboard: 
  aliases: 
CMD*/

function isAdmin(){
  let admin_tg_id = 519829299;
  return (user.telegramid==admin_tg_id);
}

if(!isAdmin()){ return }

let mp = Libs.ResourcesLib.anotherChatRes("bbmp", "bot");
let secs_in_day = 60 * 60 * 24;

mp.growth.add({
  value: 50,
  interval: secs_in_day,
  max: 50
});

mp.set(50)
