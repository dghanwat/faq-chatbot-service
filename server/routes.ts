import * as express from 'express';
import * as cors from "cors";

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


  app.use('/api', router);

}
