/*CMD
  command: /afterNotify
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Payment Service
  answer: 
  keyboard: 
  aliases: 
CMD*/

let req = parseRequestParams() // { amount: X, transferred_to_tg_id: Y }

let anotherRes = Libs.ResourcesLib.anotherUserRes("BBPoint", req.transferred_to_tg_id)

let res = Libs.ResourcesLib.userRes("BBPoint");

if(!havePointOnRequest(req)){ return }

res.transferTo(anotherRes, req.amount);

broadcastOperation(
   req.amount,
   user,
   { id: req.transferred_to_tg_id }, 
   "Request"
)

showAlert(req.amount + " 💎 transferred.")

Api.deleteMessage({ message_id: req.message_id })
