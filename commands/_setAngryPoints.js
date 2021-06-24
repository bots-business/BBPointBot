/*CMD
  command: /setAngryPoints
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

var AngryPointsdata = AdminPanel.getPanel("AngryPoints")

var masterId = AngryPointsdata.fields[0].value
var limit = AngryPointsdata.fields[1].value
var growth = AngryPointsdata.fields[2].value
var maxLimit = AngryPointsdata.fields[3].value

var AngryPointsLimit = Libs.ResourcesLib.anotherUserRes(
  "AngryPointsLimit",
  masterId
)
AngryPointsLimit.set(parseInt(limit))

var sec_in_hr = 1 * 60 * 60
var AngryPoints = Libs.ResourcesLib.anotherUserRes("AngryPoints", masterId)
AngryPoints.growth.add({
  value: parseInt(growth),
  interval: sec_in_hr,
  max: parseInt(maxLimit)
})

AngryPointsdata.fields[0].value = ""
AngryPointsdata.fields[1].value = ""
AngryPointsdata.fields[2].value = ""
AngryPointsdata.fields[3].value = ""

AdminPanel.setPanel({
  panel_name: "AngryPoints",
  data: AngryPointsdata
})