import { Schema, model, Document } from "mongoose";

export interface AuthorDocument extends Document {
  articles: Schema.Types.ObjectId[];
  fullname: string;
  username: string;
  password: string;
  accountType: string;
  dateJoined: Date;
}

const AuthorSchema = new Schema<AuthorDocument>({
  articles: [
    {
      type: Schema.Types.ObjectId,
      ref: "Articles",
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

export default model<AuthorDocument>("Author", AuthorSchema);
