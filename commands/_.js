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

function isMaster(){
  let masters = Bot.getProperty("masters");
  return masters[user.telegramid];
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
  if(isMaster()){ name = "🤠 Master " + name }
  
  let msg = prefix + amount + " 💎 from " + name + ".\nYou have: " + res.value() + "💎";

  Bot.sendMessage(msg, {reply_to_message_id: to_msg});

  let other_name = Libs.commonLib.getNameFor(request.reply_to_message.from);
  Api.sendMessage({ chat_id: "@bbpoints", text: name + " > " + other_name + ": " + prefix + amount + "💎"  } );
}

function canBeAngry(amount){
  if(isAdmin()){ return true }  // admin can be very angry
  if(isMaster()&&(amount>-4)){ return true } // master can remove -3 bb points
  return amount > 0
}

function transferByUser(res, anotherRes, amount){
  if(!res.have(amount)){
     Bot.sendMessage("Not enough 💎.\nYou have only: " +
        res.value() + "💎", {is_reply: true});
     return false;
  }

  let usersDaily = Libs.ResourcesLib.anotherChatRes("users-daily", "bot");
  usersDaily.add(amount);

  return res.transferTo(anotherRes, amount);
}

function transferByMaster(res, anotherRes, amount){
  if(amount>2){
    return transferByUser(res, anotherRes, amount);
  }

  let mp = Libs.ResourcesLib.anotherChatRes("bbmp", "bot");
  
  let mpDaily = Libs.ResourcesLib.anotherChatRes("masters-daily", "bot");
  let mpDailyRemove = Libs.ResourcesLib.anotherChatRes("master-remove-daily", "bot");

  if(amount<0){
    mp.add(amount);
    mpDailyRemove.remove(amount)
    return anotherRes.add(amount);
  }
  
  
  if(!mp.have(amount)){
    Bot.sendMessage("Not enough Master Points 🔮.\nAdmins have only: " +
    mp.value() + "🔮", {is_reply: true});
    return false;
  }

  mp.remove(amount);
  mpDaily.add(amount);
  return anotherRes.add(amount);
}

function transfer(res, anotherRes, amount){
  if(!canBeAngry(amount)){ return }

  if(isAdmin()){
    let adminDaily = Libs.ResourcesLib.anotherChatRes("admin-daily", "bot");
    let adminDailyRemove = Libs.ResourcesLib.anotherChatRes("admin-remove-daily", "bot");
    if(amount>0){
      adminDaily.add(amount);
    }else{
      adminDailyRemove.remove(amount);
    }

    return anotherRes.add(amount);
  }
  if(isMaster()){
    return transferByMaster(res, anotherRes, amount);
  }
  return transferByUser(res, anotherRes, amount);
}

if(!request.reply_to_message){ return }

if(!isNumeric(message)){ return }

let amount = getValue();

let anotherRes = getAnotherUserRes();

let res = Libs.ResourcesLib.userRes("BBPoint");

let result = transfer(res, anotherRes, amount);

if(result){
  successMessage(anotherRes, amount);
}








