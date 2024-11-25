import slugify from "slugify";
import articleModel from "../models/article.model.js";

/**
 * Generates a unique slug for an article title
 * @param {string} title - The article title to convert into a slug
 * @returns {Promise<string>} - A unique slug string
 */
export const generateSlug = async (title: string) => {
  let slug = slugify(title, { lower: true, strict: true });

  const slugExists = await articleModel.findOne({ slug });
  if (slugExists) {
    slug += `-${Date.now()}`; // Timestamp to ensure uniqueness if slug exists.
  }

  return slug;
};
