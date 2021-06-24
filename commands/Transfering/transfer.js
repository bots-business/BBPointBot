/*CMD
  command: transfer
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Transfering
  answer: 
  keyboard: 
  aliases: 
CMD*/

var other_name;
var name;

function getAnotherUserRes(from_id){
  if(!from_id){
    from_id = options.reply_to_message.from.id
  }
  return Libs.ResourcesLib.anotherUserRes("BBPoint", from_id);
}

function successMessage(res, amount){
  let to_msg;
  if(options.reply_to_message){
    to_msg = options.reply_to_message.message_id;
  }
  let prefix = "+";
  if(amount<0){ prefix = "-" }
  
  name = isAdmin() ? "admin" : Libs.commonLib.getNameFor(user);
  let msg = prefix + amount + " 💎 from " + name + ".\nYou have: " + res.value() + "💎";

  let transferred_to = options.reply_to_message.from;
  Bot.sendMessage(msg, { reply_to_message_id: to_msg });

  broadcastOperation(amount, user, transferred_to);
}

function canBeAngry(amount){
  if(isAdmin()){ return true }  // admin can be very angry
  if (canRemoveByAngryPoints(amount)) {return true}
  return amount >= 0
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
  if(!canBeAngry(amount)){ return }

  if(isAdmin()){
    return anotherRes.add(amount);
  }
  if (canRemoveByAngryPoints(amount)) {
    removeByAngryPoints(amount)
    return anotherRes.add(amount)
  }
  return transferByUser(res, anotherRes, amount);
}

if(!options){ return }

let amount = options.message;
let anotherRes = getAnotherUserRes();

let res = Libs.ResourcesLib.userRes("BBPoint");
let result = transfer(res, anotherRes, amount);

if(result){
  successMessage(anotherRes, amount);
}
