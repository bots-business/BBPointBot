/*CMD
  command: /cancelRequest
  help: 
  need_reply: 
  auto_retry_time: 
  folder: Payment Service
  answer: 
  keyboard: 
  aliases: 
CMD*/

Api.deleteMessage({ message_id: request.message.message_id })
