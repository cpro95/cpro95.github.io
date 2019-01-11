export default {
  title: `Blog Tutorial!`,
  tags: ['react', 'navi'],
  spoiler: "Learn how to add new posts and tweak the theme to your liking.",
  getContent: () => import('./document.mdx'),
}