/*CMD
  command: /setMasterRemoveableGrowthAmount
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
var sec_in_hr = 1 * 60 * 60
var masterRemoveablePoint = Libs.ResourcesLib.anotherUserRes(
  "masterRemoveablePoint",
  masterId
)
masterRemoveablePoint.growth.add({
  value: parseInt(message),
  interval: sec_in_hr
})

Bot.sendMessage(
  "Master Removeale Growth Successfully Set for the User " +
    masterId +
    "\n\n" +
    masterRemoveablePoint.growth.title()
)
