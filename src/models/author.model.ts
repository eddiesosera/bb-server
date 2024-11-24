import { Schema, model, Document, PaginateModel } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

export interface IAuthor extends Document {
  articles: Schema.Types.ObjectId[];
  fullname: string;
  username: string;
  password: string;
  accountType: string;
  dateJoined: Date;
}

const authorSchema = new Schema<IAuthor>({
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Article",
    },
  ],
  fullname: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  accountType: {
    type: String,
    default: "contributor",
    enum: ["admin", "contributor"],
  },
  dateJoined: { type: Date, default: Date.now },
});

// Pagination plugin
authorSchema.plugin(mongoosePaginate);

export default model<IAuthor, PaginateModel<IAuthor>>("Author", authorSchema);
