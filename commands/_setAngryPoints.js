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

if(!user){return}
//allowed to run through admin panel only

var angryPointsPanel = AdminPanel.getPanel("AngryPoints")

var masterId = angryPointsPanel.fields[0].value
var limit = angryPointsPanel.fields[1].value
var hourlyGrowth = angryPointsPanel.fields[2].value
var maxGrowthLimit = angryPointsPanel.fields[3].value

var angryPointsLimit = Libs.ResourcesLib.anotherUserRes(
  "angryPointsLimit",
  masterId
)
angryPointsLimit.set(parseInt(limit))

var sec_in_hr = 1 * 60 * 60
var angryPoints = Libs.ResourcesLib.anotherUserRes("angryPoints", masterId)
angryPoints.growth.add({
  value: parseInt(hourlyGrowth),
  interval: sec_in_hr,
  max: parseInt(maxGrowthLimit)
})

//making the admin panel empty so that bot admin can add more masters

angryPointsPanel.fields[0].value = ""
angryPointsPanel.fields[1].value = ""
angryPointsPanel.fields[2].value = ""
angryPointsPanel.fields[3].value = ""

AdminPanel.setPanel({
  panel_name: "AngryPoints",
  data: angryPointsPanel
})
