/*CMD
  command: /setMasterRemoveableLimit
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Master
  answer: 
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

if (!isNumeric(message)) {
  Bot.sendMessage("Send only the amount in Number")
  return
}

var masterId = options.masterId
var masterRemoveableLimit = Libs.ResourcesLib.anotherUserRes(
  "masterRemoveableLimit",
  masterId
)
masterRemoveableLimit.set(parseInt(message))

Bot.sendMessage(
  "*Please enter the amount for Master Removeavle Points per hours*\nFor the user :- `" +
    masterId +
    "`\n\nUse /cancel to cancel the command"
)
Bot.run({
  command: "/setMasterRemoveableGrowthAmount",
  options: { masterId: masterId }
})

