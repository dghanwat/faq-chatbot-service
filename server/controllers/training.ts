import { ChatResponse } from '../models/chatResponse';
import { CHAT_RESPONSE_TYPES } from '../models/responseTypes';
var JsonDB = require('node-json-db');
var db = new JsonDB("./db/faqDatabase", true, true);
export default class TrainingCtrl {

    createQuestionAndAnswersSet = (req, res) => {
        req.body.forEach((qna) => {
            db.push("/training_data/data_set[]", qna, true);

        });
        res.status(200).json({ message: "Created Successfully" });
    }

    appendQuestionAndAnswersSet = (req, res) => {
        req.body.forEach((qna) => {
            db.push("/training_data/data_set[]", qna, true);
        });
        res.status(200).json({ message: "Created Successfully" });
    }

    train = (req, res) => {
        var data = db.getData("/training_data/data_set");
        console.log("Training data", data);
        var argsForTraining = new Array()
        data.forEach((qna) => {
            argsForTraining.push(qna.question);
            argsForTraining.push(qna.answer)
        })
        var spawn = require("child_process").spawn;
        var process = spawn('python', ["./python/node_training_sql_with_input_array.py",
            argsForTraining.join("\n")]);

        process.stdout.on('data', function (data) {
            console.log('Data',data.toString());
            
        })
        process.on('close',function() {
            res.status(200).json({ message: "Training Done" });
        })



    }



}