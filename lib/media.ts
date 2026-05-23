/** Encode an asset path so spaces and special chars work in <img>/<video> src.
 * Skip encoding for external URLs (http/https).
 */
export function asset(path: string): string {
  // External URL — return as-is
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // Local path — encode each segment
  return path
    .split("/")
    .map((part) => (part ? encodeURIComponent(part) : ""))
    .join("/");
}
