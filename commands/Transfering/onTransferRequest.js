/*CMD
  command: onTransferRequest
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Transfering
  answer: 
  keyboard: 
  aliases: 
CMD*/

let json;
let res;

function sendResult() {
  HTTP.post({
    url: json.webhookUrl,
    body: json
  })
}

function sendBaseError(error) {
  Bot.sendMessage(
    "Error with Transfer request.\n" + error + "\n\nReceived data:"
  )
  Bot.sendMessage(inspect(content))
}

function haveBaseErrors() {
  if (content == "") {
    sendBaseError("Need json data.")
    return true
  }

  try {
    json = JSON.parse(content)
  } catch (e) {
    sendBaseError("Need json data.")
    return true
  }

  if (!json.webhookUrl) {
    sendBaseError("Need WebhookUrl param.")
    return true
  }
}

function haveSecretError(){
  if(!json.secret){
    json.error = { code: '10', title: 'Need secret' }
    return true;
  }

  if(json.secret==""){
    json.error = { code: '12', title: 'Secret can not be blank' }
    return true;
  }

  let curSecret = User.getProperty("transferSecret");
  if(json.secret!=curSecret){
    json.error = { code: '14', title: 'Invalid secret' }
    return true
  }
}

function haveErrors(){
  if(haveSecretError()){ return true }
 
  if(json.amount<1){
    json.error = { code: '2', title: 'Amount must be greater than or equal to 1' }
    return true
  }
  
  if(json.amount!=parseInt(json.amount)){
    json.error = { code: '3', title: 'Amount must be Integer only' }
    return true
  } 

  if(!res.have(json.amount)){
    json.error = { code: '1', title: 'Not enougth BB Points for transfer' }
    return true
  }
}

if (haveBaseErrors()) { return }

res = Libs.ResourcesLib.userRes("BBPoint");

json.owner = user;
json.owner.bb_points = res.value();

if(haveErrors()){
  sendResult(json);
  return
}


let anotherRes = Libs.ResourcesLib.anotherUserRes("BBPoint", json.to_tg_id )
res.transferTo(anotherRes, json.amount);

sendResult(json);

let note = "Transfer";
if(json.note&&(json.note!="")){
  note = note + ". Note:\n" + json.note
}

broadcastOperation(
   json.amount,
   user,
   { id: json.to_tg_id }, 
   note
)

