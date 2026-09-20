import { uploadImage } from "../services/image.service.js";
import { AppError } from "../utils/AppError.js";
import { assertImagePayload } from "../validators/image.validator.js";

export async function adminUpload(req, res, next) {
  try {
    const { base64, fileName, folder } = assertImagePayload(req.body);

    const file = await uploadImage({ base64, fileName, folder });
    if (!file) {
      return next(new AppError("Image hosting is not configured on this server", 503));
    }

    return res.status(201).json({ success: true, file });
  } catch (error) {
    return next(error);
  }
}