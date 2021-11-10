/*CMD
  command: onexchange
  help: 
  need_reply: 
  auto_retry_time: 
  folder: 🌀 Exchange
  answer: 
  keyboard: 
  aliases: 
CMD*/

let opts = options.options

function getBrodcastMsg(){
  let name = Libs.commonLib.getLinkFor(user)
  
  let bbp_to_ep = name +
      ": exchange\n" +
      opts.bb_points +
      "💎 BBP to " +
      opts.extra_points +
      " ⚡ EP";

  let ep_to_bbp = name +
      ": exchange\n" +
      Math.abs(opts.extra_points) +
      " ⚡ EP to " +
      Math.abs(opts.bb_points) +
      " 💎 BBP";

  return opts.extra_points > 0 ? bbp_to_ep : ep_to_bbp;
}

function brodcastOperation() {
  Bot.sendMessage(opts.info_msg)
  
  if(opts.extra_points<0){
    // EP to BBP
    let res = Libs.ResourcesLib.userRes("BBPoint");
    res.add(-1*opts.bb_points);
  }

  broadcastToChanell( getBrodcastMsg() )
}

if (options.result == "ok") {
  brodcastOperation()
}else{
  // have error
  let err = options.error;
  let curEP = parseInt(err.split('have only: ')[1].split(" ")[0])
  Bot.sendMessage("⚠️ Error. You have only: " + curEP + " ⚡ EP." +
  "\n\nYou can echange your\n" + curEP + " ⚡ EP to:\n`"  + parseInt(curEP/60) + "` 💎 BB points"  );
}
