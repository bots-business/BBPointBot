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

var angryPointsPanel = AdminPanel.getPanelValues("AngryPoints")

var angryPointsMaxLimit = Libs.ResourcesLib.anotherUserRes(
  "angryPointsMaxLimit",
  angryPointsPanel.masterId
)
angryPointsMaxLimit.set(parseInt(angryPointsPanel.maxLimit))

var sec_in_hr = 1 * 60 * 60
var availableAngryPoints = Libs.ResourcesLib.anotherUserRes("availableAngryPoints", angryPointsPanel.masterId)
availableAngryPoints.growth.add({
  value: parseInt(angryPointsPanel.hourlyGrowth),
  interval: sec_in_hr,
  max: parseInt(angryPointsPanel.maxGrowthLimit)
})
