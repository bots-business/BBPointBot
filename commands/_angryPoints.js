  
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

var angryPoints = Libs.ResourcesLib.userRes("AngryPoints")
Bot.sendMessage("Your Angry  Points :- " + angryPoints.value())
