const fs = require("fs");
const login = require("facebook-chat-api");
var FormData = require('form-data');

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {

    api.setOptions({
     selfListen: true,
        logLevel: "silent",
        updatePresence: false
    });
    if(err) return console.error(err);
    api.listen((err, message) => {
        if(err) return console.error(err);

        if (!message.isGroup) {
         if (typeof message.body === "string") {
             var form = new FormData();
             if (message.attachments.length == 0){
                 //Do nothing
             }
             else if (message.attachments[0].type === "photo") {
                 form.append("entry.1366768221", message.attachments[0].largePreviewUrl);
                 } else {
                     form.append("entry.1366768221", message.attachments[0].url);
                 }
             form.append("entry.531145076", message.threadID);
             form.append("entry.357278102", message.senderID);
             form.append("entry.1212284488", message.body);
             form.submit('https://docs.google.com/forms/d/e/1FAIpQLSdodtGcjtCkkHuymi7YUiGydpDvSPeBYe00R-wPG3JmyAtXKg/formResponse?', 
                 function(err, res) {
                         console.log(res.statusCode);
                 });
         }

     }

    });

});
