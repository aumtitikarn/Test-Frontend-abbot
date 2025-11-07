export type BlogStatus = "public" | "unpublic";

export interface Blog {
  id: string;
  title: string;
  slug: string;
  status: BlogStatus;
  excerpt?: string;
  content: string;
  createdAt: string; // ISO
  updatedAt: string; // ISO
}
