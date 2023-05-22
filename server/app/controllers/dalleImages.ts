import { Request, Response } from 'express';
import openai from '../services/openai.js';
import { ImageFormat, ImageSize } from '../constants/interface.js';

const NUM_IMAGES: number = 1;

export const createDalleImage = async (req: Request, res: Response) => {
  // validate request body using express-validator

  try {
    const { prompt }: { prompt: string } = req.body;

    const response = await openai.createImage({
      prompt,
      n: NUM_IMAGES,
      size: ImageSize.Large,
      response_format: ImageFormat.Base64,
    });

    // Response example:
    // {
    //     "created": 1589478378,
    //     "data": [
    //       {
    //         "url": "https://..."
    //       },
    //       {
    //         "url": "https://..."
    //       }
    //     ]
    //   }

    const image = response?.data?.data?.[0]?.[ImageFormat.Base64];
    const created = response?.data?.created;

    return res.status(200).json({ image, created });
  } catch (error: any) {
    console.log(error);
    // let's assert that it is an axios error, we can get the error message from the response
    return res.status(500).send(error?.response?.data?.error?.message);
  }
};
