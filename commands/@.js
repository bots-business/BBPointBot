/*CMD
  command: @
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

function isAdmin(){
  var admin_id = AdminPanel.getFieldValue({
    panel_name: "AdminInfo", // panel name
    field_name: "ADMIN_ID" // field name
  })
  return user.id == admin_id
}

function isNumeric(value){
  return value.match(/^-{0,1}\d+$/)
}

function broadcastToChanell(text){
  var chanell = AdminPanel.getFieldValue({
    panel_name: "Options", // panel name
    field_name: "InfoChannel" // field name
  })

  Api.sendMessage({ chat_id: chanell, text: text  } );
}

function broadcastOperation(amount, from_user, to_user, operation){
  if(amount==0){ return }

  let prefix = "+";
  if(amount<0){ prefix = "-" }

  let name = isAdmin() ? "admin" : Libs.commonLib.getNameFor(from_user);
  let other_name = Libs.commonLib.getNameFor(to_user);
  if(operation){ operation+= "\n" }
  if(!operation){ operation = "" }
  broadcastToChanell(operation + name + " > " + other_name + ": " + prefix + amount + "💎");
}

function transferPoint(){
  res.removeAnyway(1)
  anotherRes = Libs.ResourcesLib.anotherUserRes("BBPoint", answer.answer_from_id);
  anotherRes.add(1);
}

function showAlert(text){
  Api.answerCallbackQuery({
    callback_query_id: req.request_id,
    text: text,
    show_alert: true // or false - for alert on top
  })
}

function havePointOnRequest(req){
  let res = Libs.ResourcesLib.userRes("BBPoint");

  if(!res.have(req.amount)){
     showAlert("Not enough 💎.\nYou have only: " +
        res.value() + "💎");
     return
  }
  return true
}

function parseRequestParams(){
  // we have params like req10-X-points-to-TgID
  // return { amount: X, transferred_to_tg_id: Y }
  if(params==""){ return }

  let arr = params.split("-")
  let webhook_url = Bot.getProperty("extUrl_" + arr[0].split("req")[1]);

  return {
     webhook_url: webhook_url,
     amount: parseInt(arr[1]),
     transferred_to_tg_id: arr[4],  // telegram id
     message_id: arr[5],
     request_id: arr[6],
     // sometime we have JSON parse error winh first_name, last_name
     // make json without thems
     user: {
       id: user.id,
       telegramid: user.telegramid,
       username: user.username,
       language_code: user.language_code,
       created_at: user.created_at 
     }
  }
}
