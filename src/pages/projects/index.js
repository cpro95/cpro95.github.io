import * as Navi from 'navi'

export default Navi.createPage({
  title: "Projects",
  getContent: () => import('./document.mdx'),
})