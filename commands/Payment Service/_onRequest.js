/*CMD
  command: /onRequest
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Payment Service
  answer: 
  keyboard: 
  aliases: 
CMD*/

let amount = params.split('-')[1];

let res = Libs.ResourcesLib.userRes("BBPoint");

Bot.sendInlineKeyboard(
  [
    { title: "Yes, transfer " + amount + " 💎 BB Point", command: "/acceptRequest " + params },
    { title: "🚫 Cancel", command: "/cancelRequest" }
  ],

  "⚠ Do you really want to transfer: \n\n*" + amount + "* 💎 BB Point?" + 
  "\n\nYou have: " + res.value() + " 💎 BB Point."
)
