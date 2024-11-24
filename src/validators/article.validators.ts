import Joi from "joi";

export const createArticleSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  category: Joi.string().required(),
  imageCover: Joi.string().uri(),
  author: Joi.string().required(),
});
