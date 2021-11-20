import { Request, Response, Router } from 'express';
import axios from 'axios';
import cheerio from 'cheerio';

export default class SuggestionsController {
  router: Router;

  constructor() {
    this.router = Router();

    this.router.get('/', this.getTagSuggestions);
  }

  private parseTextToCounterObject(fragments: string[]): {
    [key: string]: number;
  } {
    const payload: { [key: string]: number } = {};

    fragments.forEach((fragment) => {
      if (!payload[fragment]) {
        payload[fragment] = 1;
      } else {
        payload[fragment] = payload[fragment] + 1;
      }
    });

    return payload;
  }

  async getTagSuggestions(req: Request, res: Response) {
    const url = req.query.url;

    if (!url) {
      res.status(400).send('No URL has been provided');
    }

    const response = await axios.get(url as string);
    if (response.data) {
      const $ = cheerio.load(response.data);
      const text = $.text()
        .trim()
        .split(' ')
        .filter((fragment) => fragment);

      if (text) {
        res.status(200).send(this.parseTextToCounterObject(text));
      } else {
        res.status(500);
      }
    }
  }
}
