import ImageKit from "imagekit";

import { env } from "../config/env.js";

let client = null;

function getClient() {
  if (!env.imagekit.configured) return null;
  if (!client) {
    client = new ImageKit({
      publicKey: env.imagekit.publicKey,
      privateKey: env.imagekit.privateKey,
      urlEndpoint: env.imagekit.urlEndpoint,
    });
  }
  return client;
}

export async function uploadImage({ base64, fileName, folder }) {
  const imageKit = getClient();
  if (!imageKit) return null;
  const result = await imageKit.upload({
    file: base64,
    fileName,
    folder,
    useUniqueFileName: true,
  });
  return {
    fileId: result.fileId,
    filePath: result.filePath,
    name: result.name,
    url: result.url,
  };
}