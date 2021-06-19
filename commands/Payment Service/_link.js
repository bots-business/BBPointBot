/*CMD
  command: /link
  help: 
  need_reply: true
  auto_retry_time: 
  folder: Payment Service

  <<ANSWER
Please input Webhook Url for notification.
See demo @BBWebhookBot
  ANSWER
  keyboard: 
  aliases: 
CMD*/

let url = message;

let lastIndex = Bot.getProperty("lastExternalUrlIndex", 0);


Bot.setProperty("extUrl_" + String(lastIndex), url, "text")
Bot.setProperty("lastExternalUrlIndex", lastIndex + 1, "integer")

Bot.sendMessage(
  "\n\nYour deep link for:\n\n- 1 BB Point request" +
  "\n\n- from user_id (Your Tg ID): " + user.telegramid + "\n\n" +
  "https://t.me/BBPointBot?start=req" + lastIndex + '-1-points-to-' + user.telegramid +

  "\n\n\nYou can change bb point amount in url part: -XXX-points" +
  "\nYou can change user.id after part: -to-user-XXX"
)
