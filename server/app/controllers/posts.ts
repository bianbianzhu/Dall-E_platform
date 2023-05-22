import { Request, Response } from 'express';
import * as dotenv from 'dotenv';
import cloudinary from '../services/cloudinary.js';
import PostModel from '../models/Post.js';

dotenv.config();

export const getAllPosts = async (req: Request, res: Response) => {
  // validation using express-validator

  try {
    const posts = await PostModel.find().exec();

    return res.status(200).json({
      success: true,
      data: posts,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errMsg: err,
    });
  }
};

export const getPostById = async (req: Request, res: Response) => {
  // validation using express-validator

  return res.send('Get post by id');
};

export const addPost = async (req: Request, res: Response) => {
  // validation using express-validator

  try {
    const { name, prompt, image } = req.body;

    // update the base64 image to cloudinary and get the url
    const imageUrl = await cloudinary.uploader.upload(image);

    const newPost = new PostModel({
      name,
      prompt,
      imageUrl: imageUrl.url,
    });

    await newPost.save();

    return res.status(201).json({
      success: true,
      data: newPost,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      errMsg: err,
    });
  }
};
