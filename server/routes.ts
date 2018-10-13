import * as express from 'express';
import * as cors from "cors";

import ChatCtrl from './controllers/chat';
import TrainingCtrl from './controllers/training';

export default function setRoutes(app) {
  const router = express.Router();
  // Apply the routes to our application with the prefix /api
  // Options for cors midddleware
  const options: cors.CorsOptions = {
    allowedHeaders: ["Origin", "X-Requested-With", "Content-Type", "Accept", "X-Access-Token"],
    credentials: true,
    methods: "GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE",
    origin: "*",
    preflightContinue: true,
  };

  // Use cors middleware
  router.use(cors(options));

  const chatCtrl = new ChatCtrl();
  const trainingCtrl = new TrainingCtrl()

  //Chat
  router.route('/chat').post(chatCtrl.chat);
  router.route('/training/data/qna').post(trainingCtrl.createQuestionAndAnswersSet);
  router.route('/training/data/qna').put(trainingCtrl.appendQuestionAndAnswersSet);
  router.route('/train').post(trainingCtrl.train);

  app.use('/api', router);

}
