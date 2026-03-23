const DEMO_POSTS_KEY = "bioativa_demo_posts_v1"

export function getDemoPosts(): any[] {
  if (typeof window === "undefined") return []
  try {
    const raw = window.localStorage.getItem(DEMO_POSTS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function saveDemoPosts(posts: any[]) {
  if (typeof window === "undefined") return
  window.localStorage.setItem(DEMO_POSTS_KEY, JSON.stringify(posts))
}

export function addDemoPost(post: any) {
  const posts = getDemoPosts()
  saveDemoPosts([post, ...posts])
}

export function removeDemoPost(postId: string) {
  const posts = getDemoPosts()
  saveDemoPosts(posts.filter((post: any) => String(post.id) !== String(postId)))
}
