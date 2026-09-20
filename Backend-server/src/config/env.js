import "dotenv/config";

function required(name) {
  const value = process.env[name];
  if (!value || !value.trim()) {
    throw new Error(`Missing required environment variable: ${name}`);
  }
  return value;
}

function optional(name, fallback = "") {
  const value = process.env[name];
  if (value === undefined || value === null) return fallback;
  const trimmed = String(value).trim();
  return trimmed === "" ? fallback : trimmed;
}

function proxyTrust() {
  const raw = optional("TRUST_PROXY", isProduction ? "1" : "false");
  if (raw === "true") return true;
  if (raw === "false") return false;
  const count = Number(raw);
  if (Number.isInteger(count) && count > 0) return count;
  return raw;
}

function corsOrigins() {
  const raw = optional("CORS_ORIGINS", "http://localhost:5173,http://localhost:5174");
  const result = [];
  for (const entry of raw.split(",")) {
    const cleaned = entry.trim().replace(/\/+$/, "");
    if (!cleaned) continue;
    if (!result.includes(cleaned)) result.push(cleaned);
    // Treat http://localhost:PORT and http://127.0.0.1:PORT as equivalent so
    // visiting via either hostname doesn't trip the origin allowlist.
    const portMatch = cleaned.match(/^https?:\/\/(localhost|127\.0\.0\.1):(\d+)$/);
    if (portMatch) {
      const twin = cleaned.replace(
        portMatch[1],
        portMatch[1] === "localhost" ? "127.0.0.1" : "localhost",
      );
      if (!result.includes(twin)) result.push(twin);
    }
  }
  return result;
}

const isProduction = (process.env.NODE_ENV || "development").trim() === "production";
const isTest = (process.env.NODE_ENV || "development").trim() === "test";

const rawPort = Number(optional("PORT", "4000"));

export const env = {
  NODE_ENV: optional("NODE_ENV", "development"),
  isProduction,
  isTest,
  isDevelopment: !isProduction && !isTest,

  port: Number.isInteger(rawPort) && rawPort > 0 && rawPort <= 65535 ? rawPort : 4000,

  trustProxy: proxyTrust(),

  corsOrigins: corsOrigins(),

  mongoUri: optional("MONGODB_URI", ""),

  jwtSecret: isProduction ? required("JWT_SECRET") : optional("JWT_SECRET", "dev-only-secret"),
  jwtExpiresIn: optional("JWT_EXPIRES_IN", "8h"),

  bootstrapSecret: optional("BOOTSTRAP_SECRET", ""),

  smtp: {
    host: optional("SMTP_HOST", ""),
    port: Number(optional("SMTP_PORT", "587")),
    secure: optional("SMTP_SECURE", "false") === "true",
    user: optional("SMTP_USER", ""),
    pass: optional("SMTP_PASS", ""),
    from: optional("MAIL_FROM", "ShushrutamVed Care <no-reply@example.com>"),
    to: optional("MAIL_TO", "care@example.com"),
  },

  imagekit: {
    publicKey: optional("IMAGEKIT_PUBLIC_KEY", ""),
    privateKey: optional("IMAGEKIT_PRIVATE_KEY", ""),
    urlEndpoint: optional("IMAGEKIT_URL_ENDPOINT", ""),
    configured:
      Boolean(process.env.IMAGEKIT_PUBLIC_KEY) &&
      Boolean(process.env.IMAGEKIT_PRIVATE_KEY) &&
      Boolean(process.env.IMAGEKIT_URL_ENDPOINT),
  },
};

if (env.isProduction && !env.mongoUri) {
  throw new Error("Missing required environment variable: MONGODB_URI");
}

if (env.isProduction && !process.env.CORS_ORIGINS) {
  throw new Error("Missing required environment variable: CORS_ORIGINS");
}

if (env.isProduction && env.bootstrapSecret) {
  console.warn("[env] BOOTSTRAP_SECRET is set in production — remove it after the first admin is created.");
}

const ikKeys = [env.imagekit.publicKey, env.imagekit.privateKey, env.imagekit.urlEndpoint].filter(Boolean).length;
if (ikKeys > 0 && ikKeys < 3) {
  console.warn("[env] IMAGEKIT_* is partially configured — image uploads stay disabled until all three are set.");
}