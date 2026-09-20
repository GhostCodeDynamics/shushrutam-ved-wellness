import React, { useRef, useState } from "react";
import { ImagePlus, Link2, Loader2, Trash2 } from "lucide-react";
import { api } from "../lib/api.js";
import { Button, Field, TextInput } from "./ui.jsx";

const MAX_BYTES = 5 * 1024 * 1024;
const SERVER_EXT = { png: "png", jpeg: "jpg", jpg: "jpg", gif: "gif", webp: "webp", avif: "avif", heic: "heic" };

export default function ImageUploader({ value, onChange, folder = "blog", label = "Image" }) {
  const inputRef = useRef(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  function pickFile() {
    inputRef.current?.click();
  }

  async function handleFile(file) {
    setError("");
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("Please choose an image file.");
      return;
    }
    if (file.size > MAX_BYTES) {
      setError("Image is too large — maximum 5 MB.");
      return;
    }
    const ext = SERVER_EXT[file.type.split("/")[1]] || "jpg";
    const cleanName = (file.name || `image-${Date.now()}.${ext}`).replace(/[\\/]/g, "-");
    const fileName =
      cleanName.toLowerCase().split(".").pop() === ext
        ? cleanName.toLowerCase()
        : `${cleanName.toLowerCase()}.${ext}`;

    setUploading(true);
    try {
      const dataUrl = await readDataUrl(file);
      const res = await api("/admin/images", {
        method: "POST",
        body: {
          fileName,
          data: dataUrl,
          folder,
        },
      });
      onChange(res.file.url);
    } catch (err) {
      setError(err.message || "Upload failed.");
    } finally {
      setUploading(false);
    }
  }

  return (
    <Field label={label} hint="Upload to ImageKit, or paste any image URL below.">
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/gif,image/webp,image/avif,image/heic"
        className="hidden"
        data-testid="file-input"
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      <div className="flex items-start gap-3">
        {value && (
          <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">
            <img src={value} alt="Current" className="h-full w-full object-cover" />
          </div>
        )}
        <div className="min-w-0 flex-1 space-y-2">
          <TextInput
            value={value || ""}
            onChange={(e) => onChange(e.target.value)}
            placeholder="https://ik.imagekit.io/…"
          />
          <div className="flex items-center gap-2">
            <Button kind="secondary" onClick={pickFile} disabled={uploading}>
              {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <ImagePlus className="h-4 w-4" />}
              {uploading ? "Uploading…" : "Upload"}
            </Button>
            {value && (
              <Button kind="ghost" onClick={() => onChange("")} aria-label="Clear image">
                <Trash2 className="h-4 w-4 text-red-600" />
              </Button>
            )}
            {value && (
              <a href={value} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-gray-400 hover:text-gray-600">
                <Link2 className="h-3 w-3" /> Open
              </a>
            )}
          </div>
          {error && <p className="text-xs text-red-600">{error}</p>}
        </div>
      </div>
    </Field>
  );
}

function readDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Could not read the file."));
    reader.onload = () => resolve(reader.result);
    reader.readAsDataURL(file);
  });
}