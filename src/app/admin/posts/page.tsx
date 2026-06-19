import { getAllPosts } from "@/lib/posts";
import PostsClient from "./PostsClient";

export const dynamic = "force-dynamic";

export default async function PostsAdminPage() {
  const posts = await getAllPosts();
  return <PostsClient initialPosts={posts} />;
}
