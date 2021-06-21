/*CMD
  command: /setMasterRemoveable
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Master
  <<ANSWER
*Please forward a message from Master or enter the master telegram id*
Use /cancel to cancel the command
  ANSWER
  keyboard: 
  aliases: 
CMD*/

if (!isAdmin) {
  return
}
if (message == "/cancel") {
  Bot.sendMessage("Operantion Cancelled")
  return
}
var masterId = request.forward_from ? request.forward_from.id : message

Bot.sendMessage(
  "*Please enter the amount for Master Removeavle Points Once Per User*\nFor the user :- `" +
    masterId +
    "`\n\nUse /cancel to cancel the command"
)
Bot.run({
  command: "/setMasterRemoveableLimit",
  options: { masterId: masterId }
})
