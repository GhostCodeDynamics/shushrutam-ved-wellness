import mongoose from "mongoose";

const { Schema, model, models } = mongoose;

/**
 * Content blocks match the existing frontend `blog.js` shape:
 * `{ type: "paragraph" | "heading" | "list", text | items }`.
 */
export const BLOG_CONTENT_BLOCK_TYPES = ["heading", "paragraph", "list"];

const contentBlockSchema = new Schema(
  {
    type: { type: String, enum: BLOG_CONTENT_BLOCK_TYPES, required: true },
    text: { type: String, default: "" },
    items: { type: [String], default: [] },
  },
  { _id: false },
);

const blogPostSchema = new Schema(
  {
    title: { type: String, required: true, trim: true, maxlength: 200 },
    slug: { type: String, required: true, unique: true, trim: true, lowercase: true, index: true },
    excerpt: { type: String, trim: true, maxlength: 500, default: "" },
    content: { type: [contentBlockSchema], default: [] },
    category: { type: String, trim: true, maxlength: 80, default: "General" },
    author: { type: String, trim: true, maxlength: 120, default: "" },
    publishDate: { type: String, trim: true, maxlength: 30, default: "" },
    featuredImage: { type: String, trim: true, maxlength: 500, default: "" },
    isPublished: { type: Boolean, default: false, index: true },
    seoTitle: { type: String, trim: true, maxlength: 200, default: "" },
    seoDescription: { type: String, trim: true, maxlength: 400, default: "" },
  },
  { timestamps: true },
);

blogPostSchema.index({ isPublished: 1, publishDate: -1 });

export const BlogPost = models?.BlogPost || model("BlogPost", blogPostSchema);
export default BlogPost;