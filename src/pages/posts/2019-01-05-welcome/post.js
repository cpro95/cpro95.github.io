export default {
  title: `이 블로그는 어떻게 수정하죠? by James K Nelson`,
  tags: ['react', 'navi'],
  spoiler: "Navi를 이용한 새 페이지 만들기 등등",
  getContent: () => import('./document.mdx'),
}