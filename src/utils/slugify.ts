import slugify from "@sindresorhus/slugify";
import articleModel from "../models/article.model.js";

/**
 * Generates a unique slug for an article title
 * @param {string} title - The article title to convert into a slug
 * @returns {Promise<string>} - A unique slug string
 */
export const generateSlug = async (title: string) => {
  const baseSlug = slugify(title, { lowercase: true });
  let uniqueSlug = baseSlug;
  let counter = 1;
  const maxAttempts = 100; // Prevent infinite loops

  while (await articleModel.exists({ slug: uniqueSlug })) {
    uniqueSlug = `${baseSlug}-${counter}`;
    counter += 1;

    if (counter > maxAttempts) {
      throw new Error("Failed to generate a unique slug. Please try again.");
    }
  }

  return uniqueSlug;
};
