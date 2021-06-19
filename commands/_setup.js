/*CMD
  command: /setup
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 
  answer: 
  keyboard: 
  aliases: 
CMD*/

var panel = {
  // Panel title
  title: "Admin Information",
  description: "Please fill here your admin id",
  // order index
  index: 0,
  icon: "key",
  // save button title - default "SAVE"
  button_title: "SAVE",
  // command called on saving
  // not necessary
  /* on_saving:{
     command: "/on-saving",
     // if you need user
     user_id: user_id // Get it via Bot.sendMessage(user.id)
  },
  */
  
  // Fields for this Panel
  // here 1 field only
  fields: [
    {
      name: "ADMIN_ID",
      title: "Admin ID",
      description: "you can get your admin_id with BJS Bot.sendMessage(user.id)",
      type: "string",
      placeholder: "your admin id",
      // value: 100
    }
    // another fields here
    // if needed
    // ...
  ]
}

AdminPanel.setPanel({
  panel_name: "AdminInfo",
  data: panel
  // force: true // default false - save fields values
});



var panel = {
  title: "Options",
  description: "Options for bot",
  index: 1,
  icon: "hammer",
  fields: [
    {
      name: "InfoChannel",
      title: "Info chanell",
      description: "All transfers will be published in this chanell",
      type: "string",
      placeholder: "@chanellName",
      icon: "notifications"
    }
  ]
}

AdminPanel.setPanel({
  panel_name: "Options",
  data: panel
  // force: true // default false - save fields values
});

Bot.sendMessage("Admin Panels setupped." + 
  "\n\nYour admin id is: ```" + user.id + "```" +
  "\n\nCur chat id is: ```" + chat.id + "```"
)

