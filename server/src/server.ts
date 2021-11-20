import express from 'express';
import cors from 'cors';
import config from './config';
import * as bodyParser from 'body-parser';
import AuthenticationController from './controllers/AuthenticationController';
import LinkController from './controllers/LinkController';
import TagController from './controllers/TagController';
import authMiddleware from './middleware/auth';
import { connect } from './database';
import SuggestionsController from './controllers/SuggestionsController';

class ExpressApplication {
  public app: express.Application;

  constructor() {
    this.app = express();
  }

  private applyMiddleware(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(cors());
  }

  private configureRoutes(): void {
    const authController = new AuthenticationController();
    const linksController = new LinkController();
    const tagsController = new TagController();
    const suggestionsController = new SuggestionsController();

    this.app.use('/auth', authController.router);
    this.app.use('/links', authMiddleware, linksController.router);
    this.app.use('/tags', authMiddleware, tagsController.router);
    this.app.use('/suggestions', authMiddleware, suggestionsController.router);
  }

  public async start(): Promise<void> {
    this.applyMiddleware();
    this.configureRoutes();

    await connect();
    console.log('Database connection established!');

    this.app.listen(config.port, () =>
      console.log(`Server running!\nhttp://localhost:${config.port}/`)
    );
  }
}

export default new ExpressApplication();
