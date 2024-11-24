import slugify from "slugify";
import articleModel from "../models/article.model.js";

export const generateSlug = async (title: string) => {
  let slug = slugify(title, { lower: true, strict: true });

  const slugExists = await articleModel.findOne({ slug });
  if (slugExists) {
    slug += `-${Date.now()}`; // Timestamp to ensure uniqueness
  }

  return slug;
};
