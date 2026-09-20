import { BlogPost } from "../models/index.js";
import { AppError, conflictError } from "../utils/AppError.js";
import { cleanString } from "../utils/sanitize.js";
import { slugify, uniqueSlugSuffix } from "../utils/slugify.js";
import { assertBlogPostPayload } from "../validators/blog.validator.js";

function publicPost(doc) {
  return {
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    category: doc.category,
    author: doc.author,
    publishDate: doc.publishDate,
    featuredImage: doc.featuredImage,
  };
}

function adminPost(doc) {
  return {
    id: String(doc._id),
    title: doc.title,
    slug: doc.slug,
    excerpt: doc.excerpt,
    content: doc.content,
    category: doc.category,
    author: doc.author,
    publishDate: doc.publishDate,
    featuredImage: doc.featuredImage,
    isPublished: doc.isPublished,
    seoTitle: doc.seoTitle,
    seoDescription: doc.seoDescription,
    createdAt: doc.createdAt,
    updatedAt: doc.updatedAt,
  };
}

async function slugWithRetry(slug, excludeId) {
  const taken = await BlogPost.find({ slug: new RegExp(`^${slug}(?:-[0-9]+)?$`), _id: { $ne: excludeId } })
    .distinct("slug");
  return uniqueSlugSuffix(slug, new Set(taken));
}

export async function listPublic(req, res, next) {
  try {
    const posts = await BlogPost.find({ isPublished: true })
      .sort({ publishDate: -1, createdAt: -1 })
      .lean();
    res.json({ items: posts.map(publicPost) });
  } catch (error) {
    next(error);
  }
}

export async function detailPublic(req, res, next) {
  try {
    const slug = cleanString(req.params.slug, { max: 200 });
    const post = await BlogPost.findOne({ slug, isPublished: true }).lean();
    if (!post) return next(new AppError("Article not found", 404));
    res.json({ post: publicPost(post) });
  } catch (error) {
    next(error);
  }
}

export async function adminList(req, res, next) {
  try {
    const page = Math.max(1, Number.parseInt(req.query.page, 10) || 1);
    const limit = Math.min(100, Math.max(1, Number.parseInt(req.query.limit, 10) || 20));
    const filter = {};
    if (req.query.status === "published") filter.isPublished = true;
    if (req.query.status === "draft") filter.isPublished = false;
    if (req.query.search) {
      const search = cleanString(req.query.search, { max: 80 });
      if (search) {
        filter.$or = [
          { title: new RegExp(search, "i") },
          { slug: new RegExp(search, "i") },
        ];
      }
    }
    const [items, total] = await Promise.all([
      BlogPost.find(filter)
        .sort({ updatedAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean(),
      BlogPost.countDocuments(filter),
    ]);
    res.json({
      items: items.map(adminPost),
      pagination: { page, limit, total, pages: Math.max(1, Math.ceil(total / limit)) },
    });
  } catch (error) {
    next(error);
  }
}

export async function adminDetail(req, res, next) {
  try {
    const post = await BlogPost.findById(req.params.id).lean();
    if (!post) return next(new AppError("Article not found", 404));
    res.json({ post: adminPost(post) });
  } catch (error) {
    next(error);
  }
}

export async function adminCreate(req, res, next) {
  try {
    const payload = assertBlogPostPayload(req.body);
    if (!payload.slug) {
      payload.slug = slugify(payload.title || "article");
    }
    payload.slug = await slugWithRetry(payload.slug, null);
    if (!payload.author) payload.author = req.admin?.name || "";
    const post = await BlogPost.create(payload);
    res.status(201).json({ post: adminPost(post) });
  } catch (error) {
    if (error?.code === 11000) {
      return next(conflictError("A post with this slug already exists"));
    }
    next(error);
  }
}

export async function adminUpdate(req, res, next) {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) return next(new AppError("Article not found", 404));
    const payload = assertBlogPostPayload(req.body, { partial: true });
    if (payload.slug) {
      payload.slug = await slugWithRetry(payload.slug, post._id);
    }
    Object.assign(post, payload);
    await post.save();
    res.json({ post: adminPost(post) });
  } catch (error) {
    if (error?.code === 11000) {
      return next(conflictError("A post with this slug already exists"));
    }
    next(error);
  }
}

export async function adminDelete(req, res, next) {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id);
    if (!post) return next(new AppError("Article not found", 404));
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}