/*CMD
  command: /doexchange
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 🌀 Exchange

  <<ANSWER
How many BB points do you want to change? Please input number.

Use negative number to exchange
⚡EP for 💎BBP, eg: -1
  ANSWER
  keyboard: 
  aliases: 
CMD*/

// it is avaible only for BB Admin
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

if(value==0){
  Bot.sendMessage("Need numeric value only" );
  return
}

if((value>0)&&(!res.have(value))){
  Bot.sendMessage("You do not have " + value + "💎 BB Points" );
  return
}

let extra_points;
let info_msg;

if(value > 0){
  // exchange BBP > to EP
  // 1 BBP = 50 EP
  res.remove(value);
  extra_points = value * 50;
  info_msg = "You received:\n\n" + extra_points + " ⚡ Extra Points for " +  value + "💎 BB Points";
}

if(value < 0){
   // exchange EP > to BBP 
   // 60 EP = 1 BBP
   extra_points = value * 60;
   info_msg = "You received:\n\n" + String(-1*value) + "💎 BB Points for " + String(-1*extra_points) + " ⚡ Extra Points";
}

Bot.sendMessage("Exchange...");

// it is avaible only for BB Admin
BBAdmin.addExtraPointsToIterationQuota({
   extra_points: extra_points,
   success: "onexchange",
   info_msg: info_msg,
   bb_points: value
});
