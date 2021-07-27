/*CMD
  command: /angryPoints
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

var availableAngryPoints = Libs.ResourcesLib.userRes("availableAngryPoints");

Bot.sendMessage(
  "This Point can be used to remove the BB Points from the User\n\nYour Angry Points:- " +
   availableAngryPoints.value()
)

