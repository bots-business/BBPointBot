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

var AngryPointsdata = AdminPanel.getPanel("AngryPoints")

var masterId = AngryPointsdata.fields[0].value
var limit = AngryPointsdata.fields[1].value
var growth = AngryPointsdata.fields[2].value
var maxLimit = AngryPointsdata.fields[3].value

var angryPointsLimit = Libs.ResourcesLib.anotherUserRes(
  "angryPointsLimit",
  masterId
)
angryPointsLimit.set(parseInt(limit))

var sec_in_hr = 1 * 60 * 60
var angryPoints = Libs.ResourcesLib.anotherUserRes("angryPoints", masterId)
angryPoints.growth.add({
  value: parseInt(growth),
  interval: sec_in_hr,
  max: parseInt(maxLimit)
})

//making the admin panel empty so that bot admin can add more masters

AngryPointsdata.fields[0].value = ""
AngryPointsdata.fields[1].value = ""
AngryPointsdata.fields[2].value = ""
AngryPointsdata.fields[3].value = ""

AdminPanel.setPanel({
  panel_name: "AngryPoints",
  data: AngryPointsdata
})
