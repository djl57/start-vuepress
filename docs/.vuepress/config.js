module.exports = {
  title: '个人文档', 
  description: ' ',
  themeConfig: {
    nav: [
      { text: 'vuepress阅读记录', link: '/vpress/' },
      { text: 'js文档', link: '/jsdoc/' },
      { text: 'css黑魔法', link: '/cssdoc/' },
      { text: 'html语义化', link: '/htmldoc/' },
      { text: 'todo', link: '/todo/' },
      { text: '个人简历', link: '/resume/' },
      { text: '代码片段', link: '/code/' },
      { text: 'github', link: 'https://github.com/djl57/start-vuepress' },
    ],
    sidebar: {
      '/jsdoc/': [
        '',
        'number',
        'boolean',
        'array',
        'object',
        'null',
        'undefined',
      ],
    }
  }
}
