import Joi from "joi";

export const createArticleSchema = Joi.object({
  title: Joi.string().required().messages({
    "string.empty": "Title is required",
  }),
  content: Joi.string().min(3).required().messages({
    "string.empty": "Content is required",
    "string.min": "Article content must be at least 3 characters long",
  }),
  category: Joi.string()
    .required()
    .valid("beardatorium", "launchpad", "notice", "team-build")
    .default("launchpad")
    .messages({
      "any.only":
        'Article category must be either one of the accepted types: Beardatorium, Launchpad, Notice, Team Build"',
    }),
  imageCover: Joi.string().uri(),
  author: Joi.string().required().messages({
    "string.empty": "Aurthor is not specified. Specify Author.",
  }),
});
