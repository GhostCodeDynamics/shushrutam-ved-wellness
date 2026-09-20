// Optional: pin the process to explicit DNS resolvers before any lookup happens.
// Fixes environments where the OS-configured resolver refuses c-ares queries for
// remote hosts (e.g. querySrv ECONNREFUSED for mongodb+srv Atlas clusters).
// Controlled by DNS_SERVERS (comma-separated IPv4 list); no-op when unset,
// NOT a secret, may be committed.
import "dotenv/config";
import dns from "node:dns";

const raw = (process.env.DNS_SERVERS || "").trim();
if (raw) {
  const servers = raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^(\d{1,3}\.){3}\d{1,3}$/.test(s));
  if (servers.length > 0) {
    try {
      dns.setServers(servers);
      console.log(`[dns] Using explicit resolvers: ${servers.join(", ")}`);
    } catch (error) {
      console.warn("[dns] Ignoring invalid DNS_SERVERS:", error.message);
    }
  }
}