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
var maxLimit = angryPointsPanel.fields[1].value
var hourlyGrowth = angryPointsPanel.fields[2].value
var maxGrowthLimit = angryPointsPanel.fields[3].value

var angryPointsMaxLimit = Libs.ResourcesLib.anotherUserRes(
  "angryPointsMaxLimit",
  masterId
)
angryPointsMaxLimit.set(parseInt(maxLimit))

var sec_in_hr = 1 * 60 * 60
var availableAngryPoints = Libs.ResourcesLib.anotherUserRes("availableAngryPoints", masterId)
availableAngryPoints.growth.add({
  value: parseInt(hourlyGrowth),
  interval: sec_in_hr,
  max: parseInt(maxGrowthLimit)
})
