import { Schema, model, Document, Types, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface IArticle extends Document {
  title: string;
  slug: string;
  content: string;
  imageCover?: string;
  datePublished: Date;
  category: string;
  author: Types.ObjectId;
}

const articleSchema = new Schema<IArticle>(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    imageCover: { type: String },
    datePublished: { type: Date, default: Date.now },
    category: { type: String, required: true },
    author: { type: Schema.Types.ObjectId, ref: "Author", required: true },
  },
  {
    timestamps: true,
  }
);

// Pagination plugin
articleSchema.plugin(mongoosePaginate);

// Indexing for better query perfomance
articleSchema.index({ category: 1 });
articleSchema.index({ author: 1 });

export default model<IArticle, PaginateModel<IArticle>>(
  "Article",
  articleSchema
);
