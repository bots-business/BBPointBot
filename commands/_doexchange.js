/*CMD
  command: /doexchange
  help: 
  need_reply: true
  auto_retry_time: 
  answer: How many BB points do you want to change? Please input number.
  keyboard: 
  aliases: 
CMD*/

function isNumeric(value){
  return value.match(/^-{0,1}\d+$/)
}

if(!BBAdmin.curUser.parentAccount){
  Bot.runCommand("/no-linked-account");
  return
}

let value = message;
if(!isNumeric(value)){
  Bot.sendMessage("Please input numbers only. For example: 15");
  return
}

let res = Libs.ResourcesLib.userRes("BBPoint");
value = parseInt(value);

if(value<1){
  Bot.sendMessage("Value must be creater then 1");
  return
}

if(!res.have(value)){
  Bot.sendMessage("You do not have " + value + "💎 BB Points" );
  return
}

res.remove(value);
let extra_points = value * 50;
BBAdmin.addExtraPointsToIterationQuota({extra_points: extra_points});

Bot.sendMessage("You received: " + extra_points + " extra points" );

let name = Libs.commonLib.getNameFor(user);
Api.sendMessage({ chat_id: "@bbpoints", text: name + ": exchange " + value + "💎 for " + extra_points + " EP" } );



