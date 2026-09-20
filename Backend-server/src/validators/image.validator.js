import { validationError } from "../utils/AppError.js";
import { cleanString } from "../utils/sanitize.js";

const MIME_EXT = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg",
  "image/gif": "gif",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/heic": "heic",
};

const BASE64_RE = /^data:image\/[a-z0-9.+-]+;base64,([A-Za-z0-9+/=\s]+)$/;

const MAX_DECODED_BYTES = 5 * 1024 * 1024; // 5 MB after decoding
const MAX_BASE64_CHARS = 8 * 1024 * 1024; // generous buffer for the base64 string

export function assertImagePayload(body) {
  const fileName = cleanString(body?.fileName, { max: 120 });
  const rawData = cleanString(body?.data, { max: MAX_BASE64_CHARS });
  const folder = cleanString(body?.folder, { max: 80 }).replace(/^\/+|\/+$/g, "");

  if (!fileName) throw validationError("fileName is required");
  if (!rawData) throw validationError("Image data is required");

  const match = rawData.match(BASE64_RE);
  if (!match) throw validationError("data must be a base64 data URI (data:image/...;base64,...)");

  const mimeMatch = rawData.match(/^data:([^;,]+);base64,/) || [];
  const ext = MIME_EXT[(mimeMatch[1] || "").toLowerCase()];
  if (!ext) throw validationError("Unsupported image type — use PNG, JPEG, GIF, WEBP, AVIF or HEIC");

  const decoded = Buffer.from(match[1].replace(/\s+/g, ""), "base64");
  if (decoded.length === 0) throw validationError("Image data is empty");
  if (decoded.length > MAX_DECODED_BYTES) {
    throw validationError("Image is too large — maximum 5 MB");
  }

  const extFromName = fileName.toLowerCase().split(".").pop();
  if (extFromName !== ext) throw validationError(`File name must end in .${ext}`);

  if (/[\\/]/.test(fileName)) throw validationError("fileName must not contain path separators");

  return { base64: rawData, fileName, folder };
}