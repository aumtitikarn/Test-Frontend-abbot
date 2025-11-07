export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

const KEY = "blogs";

export function loadBlogsFromStorage<T>(fallback: T): T {
  if (typeof window === "undefined") return fallback as T;
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function saveBlogsToStorage<T>(data: T): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(data));
}
