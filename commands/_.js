/*CMD
  command: *
  help: 
  need_reply: 
  auto_retry_time: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

if(!message){ return }
if(!user){ return }

function isAdmin(){
  let admin_tg_id = 519829299;
  return (user.telegramid==admin_tg_id);
}

function isNumeric(value){
  return value.match(/^-{0,1}\d+$/)
}

function getValue(){
  if(message=="👍"){ return 1}
  return parseInt(message);
}

function getAnotherUserRes(){
  let from_id = request.reply_to_message.from.id;
  return Libs.ResourcesLib.anotherUserRes("BBPoint", from_id);
}

function successMessage(res, amount){
  let to_msg = request.reply_to_message.message_id;
  let prefix = "+";
  if(amount<0){ prefix = "-" }
  
  name = isAdmin() ? "admin" : Libs.commonLib.getNameFor(user);
  
  let msg = prefix + amount + " 💎 from " + name + ".\nYou have: " + res.value() + "💎";

  Bot.sendMessage(msg, {reply_to_message_id: to_msg});
}

function transferByUser(res, anotherRes, amount){
  if(!res.have(amount)){
     Bot.sendMessage("Not enough 💎.\nYou have only: " +
        res.value() + "💎", {is_reply: true});
     return false;
  }
  return res.transferTo(anotherRes, amount);
}

function transfer(res, anotherRes, amount){
  if(isAdmin()){
    return anotherRes.add(amount);
  }
  return transferByUser(res, anotherRes, amount);
}

if(!request.reply_to_message){ return }

if(!isNumeric(message)){ return }

let amount = getValue();
if(!isAdmin()&&(amount<1)){ return }

let anotherRes = getAnotherUserRes();

let res = Libs.ResourcesLib.userRes("BBPoint");

let result = transfer(res, anotherRes, amount);

if(result){
  successMessage(anotherRes, amount);
}








