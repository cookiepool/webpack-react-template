搭建React环境跟Vue区别不大，这里我做一个小记录。

# 核心
Vue的时候我们安装的是Vue相关的东西，使用React的话就需要React相关的了。
```
npm react react-dom react-router-dom -S
```

# babel.config.js
babel主要是安装多了个@babel/preset-react，这个用来转换jsx。
```
npm install @babel/core @babel/preset-env @babel/preset-react -D
```
corejs使用第三版，前面配置Vue的时候用的第二版
```
npm install core-js@3 -S
```
配置babel.config.js
```
module.exports = {
  presets: [
    ["@babel/perset=-env", {
      "useBuiltIns": "usage",
      "core-js": 3
    }, "@babel/preset-react"]
  ]
}
```
# webpack.config.js
- html-webpack-plugin 处理html文件
- copy-webpack-plugin 拷贝静态资源
- babel-loader 使用webpack时我们需要babel-loader来调用babel的核心来实现转换
- url-loader 处理静态文件
- file-loader 处理静态文件
```
npm install html-webpack-plugin copy-webpack-plugin babel-loader url-loader file-loader -D
```

# webapck.dev.js
- webpack-merge 合并webpack配置
- webpack-dev-server webpack开发配置服务器
- style-loader 把css样式注入到style标签上
- css-loader 用于解析css
- sass-loader 用于解析scss，转换成css
- dart-sass 类似于编译器，解析scss语法
- postcss-loader 解析postcss的配置并用于样式文件
```
npm install webpack-merge webpack-dev-server style-loader css-loader sass-loader dart-sass postcss-loader -D
```

# webpack.prod.js
- webpack-merge 合并webpack配置
- clean-webpack-plugin 用于清除打包后的文件夹
- webpack-bundle-analyzer 打包后分析包内容
- mini-css-extract-plugin 提取css到单独的文件
- @intervolga/optimize-cssnano-plugin 压缩css代码
```
npm install clean-webpack-plugin webpack-bundle-analyzer mini-css-extract-plugin @intervolga/optimize-cssnano-plugin -D
```

# 其他配置
- autoprefixer 给CSS3新特性添加浏览器前缀
- postcss-cssnext 官方以及不推荐这个了，取而代之的是postcss-preset-env
- postcss-preset-env 如果配置了这个就不需要配置autoprefixer了
```
npm install postcss-preset-env -D
```

# 执行npm run dev命令过后，让其在控制台展示的信息更好看
默认执行webpack-dev-server后控制台会输出一大串输出信息，看起来有点恼火。如下图
![](https://imgkr.cn-bj.ufileos.com/fa7d79de-d852-4914-8317-f9f478f409a0.png)

如果我们需要展示好看的信息，需要做以下配置，首先配置webpack.config.js里面的devServer选项。
```
devServer: {
  host: '0.0.0.0',
  hot: true,
  port: 9866,
  contentBase: './dist',
  clientLogLevel: 'error',
  overlay: {
    errors: true,
    warnings: true
  },
  quiet: true
}
```
quiet的值我们设置成true，这样我们就看不到大串的输出信息了，同时我们需要一个插件来接替输出信息，安装插件
```
npm install friendly-errors-webpack-plugin -D
```
在webpack.config.js的里面加入以下语句
```
const friendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

plugins: [
  // ...... 省略的语句
  new friendlyErrorsWebpackPlugin()
]
```
这样就可以了。

# CSS的管理
这里我使用了CSS in Module的模式，没有研究CSS in JS。

首先我们需要配置css-loader
```
options: {
  modules: {
    localIdentName: '[name]__[local]--[hash:base64:5]'
  }
}
```
然后再你的组件里面这样写样式
```
import styles from './App.scss';

render() {
  return(
    <div className={styles['all-wraper']}>
      <div className={styles.text}>{ this.state.msg }</div>
      <div className={styles.wraper}>
        <p className={styles.content}>前端框架</p>
      </div>
    </div>
  )
}
```
注意如果你的类名里面有-这个符号，就只能使用styles['all-wraper']这种语法。

但是上面这个有个问题是，我们自己的公共样式一般不需要被转换，比如我们把公共样式写在了common.scss里面，那么你不想它被转换的话，再你的样式前面输入:global关键词即可，比如我这儿
```
:global .flex-all-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
```
然后再你的html代码里面这样写：
```
<div className={styles['all-wraper'] + ' flex-all-center'}>
```

# Webpack 5配置补充
1、图片跟字体资源使用webpack自带的功能，不再使用url-loader和file-loader，去除音频文件的加载。
```
assetModuleFilename: 'assets/[name].[hash][ext][query]'

{
  test: /\.(jpe?g|png|gif|svg)$/i,
  type: 'asset/resource'
},
{
  test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
  type: 'asset/resource'
}
```

> [参考-资源模块](https://webpack.docschina.org/guides/asset-modules/)

2、样式对应的dart-sass升级为sass。

3、关于eslint-loader，官方建议使用eslint-webpack-plugin，eslint-loader已不再维护。

4、NamedModulesPlugin替换为optimization.moduleIds: 'named'；这个功能主要是在热重载时直接返回更新文件名，而不是文件的id。

5、webpack-merge的引入方式变为：const { merge } = require('webpack-merge');

6、copy-webpack-plugin的配置方式变为：
```
plugins: [
  new copyWebpackPlugin({
    patterns: [{
      from: path.resolve(__dirname, '../public'),
      to: path.resolve(__dirname, '../dist')
    }]
  })
]
```

7、webpack的devtool选项的值有次序要求，应匹配为：^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$

8、devServer的quiet, contentBase字段废弃

9、devServer的clientLogLevel字段相关配置收拢到client里面配置

10、index.html从public移入根目录，否则会报 `Multiple assets emit different content to the same filename index.html`

11、webpack-devserver升级到4.x后，开启热更新后可以不再配置webpack.HotModuleReplacementPlugin

12、移除friendly-errors-webpack-plugin插件，对webpack 5支持不好

13、@intervolga/optimize-cssnano-plugin替换为css-minimizer-webpack-plugin，用于CSS压缩，@intervolga/optimize-cssnano-plugin早已停止更新。

14、使用fullhash代替hash关键词