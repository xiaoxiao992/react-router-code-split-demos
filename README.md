### 关于代码拆分(code split)
什么是代码拆分，代码拆分的效果的是什么？
代码拆分的效果就是，当我们web站点是SPA时，我们希望但我们进入页面A时，只加载页面A相关的资源，当加载页面B时，只加载页面B相关的资源，这样可以实现加快页面首次加载，这就是代码拆分要达到的效果。所以并是不所有的页面（组件）都适合做代码拆分，只有需要通过路由加载的页面（组件）才需要做代码。假设我们有以下的页面：我们可以得到，UserProfile即使是不要代码拆分的，因为他是这个页面的内容，进来就要展示了；但AsyncUserInput并不是页面的内容，需要用户点击当前页面上的链接才打开展示，所以AsyncUserInput需要做代码拆分。
``` js
export default class User extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>这是User
                <Button type="primary">确定吧</Button>
                <Link to="/user/input" >新增</Link>
                <UserProfile />
                <Switch>
                    <Route path="/user/input" exact={true} component={AsyncUserInput} />
                </Switch>
            </div>
        )
    }
};
```
实现 code split 请参考 [code-splitting](https://reacttraining.com/react-router/web/guides/code-splitting)
注意是 babel-plugin-syntax-dynamic-import 和 react-loadable 都同时要的。

### 关于antd的按需加载
实现按需加载需要使用 babel-plugin-import 实现；
需要注意的是，当使用代码拆分，extract-text-webpack-plugin 只会合并入口文件中引入的样式，其他模块中的样式将不会被合并。只有当**allChunks: true**时才会把其他模块引入的样式合并进来，此时样式是没法实现按需加载的。
### 关于 babel-plugin-import 配置
```["import", { "libraryName": "antd" }]```: 只引入js文件， 需要在入口文件引入antd样式，import 'antd/dist/antd.css'；
```["import", { "libraryName": "antd", "style": true }]```:  引入js和(less/sass)文件，这个可以配置less 参数，可以改变样式主题；
```["import", { "libraryName": "antd", "style": "css" }]```: 引入js和css文件，这个因为引入的是编译好的css文件，所不能更改主题；



