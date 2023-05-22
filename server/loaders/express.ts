import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
import router from '../app/routes/index.js';
import * as dotenv from 'dotenv';
dotenv.config();

const PORT = process.env.PORT || 3000;

const startServer = () => {
  const app = express();

  app
    .listen(PORT, () => {
      return console.log(`Server is running on port ${PORT}`);
    })
    .on('error', (err) => {
      console.log(err);
      process.exit(1);
    });

  return app;
};

export default () => {
  const app = startServer();
  app.use(cors());
  app.use(helmet());
  app.use(express.json({ limit: '50mb' }));
  app.use(express.urlencoded({ extended: true }));

  app.use('/api/v1', router);
};
