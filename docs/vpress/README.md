---
sidebar: auto
---
# 阅读vuepress文档的记录
## 简单介绍
- VuePress 带有内置的 基于 header 搜索(headers-based search) 的功能 - 它会自动从所有页面的 title, h2 和 h3 header 标签中，建立一个简单的搜索索引。即页面右上角那个搜索框。
- 默认主题。允许自定义导航栏(navbar)、侧边栏(sidebar)和主页(homepage)等。详细信息可查看 [默认主题配置](http://caibaojian.com/vuepress/default-theme-config/) 页面。也可以[自定义主题](http://caibaojian.com/vuepress/guide/custom-themes.html)。

## vuepress的markdown扩展
以下为表现形式，具体语法看代码，[文档链接](http://caibaojian.com/vuepress/guide/markdown.html)
::: tip
This is a tip
:::

::: warning
This is a warning
:::

::: danger
This is a dangerous warning
:::

::: danger STOP
Danger zone, do not proceed
:::
在代码块中显示高亮
``` js{4}
export default {
  data () {
    return {
      msg: 'Highlighted!'
    }
  }
}
```