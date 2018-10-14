import { ChatResponse } from '../models/chatResponse';
import { CHAT_RESPONSE_TYPES } from '../models/responseTypes';

export default class ChatCtrl {

    chat = (req, res) => {
        console.log('Request for chat', req.body);
        // Use child_process.spawn method from  
        // child_process module and assign it 
        // to variable spawn 
        var spawn = require("child_process").spawn;
        // Parameters passed in spawn - 
        // 1. type_of_script 
        // 2. list containing Path of the script 
        //    and arguments for the script  
        var process = spawn('python', ["./python/node_bot.py",
            req.body.message]);

        // Takes stdout data from script which executed 
        // with arguments and send this data to res object 
        process.stdout.on('data', function (data) {
            let chatResponse: ChatResponse = new ChatResponse();
            chatResponse.type = CHAT_RESPONSE_TYPES.TEXT;
            chatResponse.content = data.toString()
            res.status(200).json({ message: chatResponse });

        })
    }

}