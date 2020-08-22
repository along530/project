

## 01、脚手架创建项目

```vue
vue create '文件名'
使用默认方式创建
guliShop-client下面创建src文件夹assets , 里面用来放logo
删除helloWord文件以及相关的标签
 安装npm install vue-router --save
```

##02、认识项目目录及各个目录的作用

```vue
async/await 是解决异步的最佳方案
- mock数据  模拟数据 , 也是ajax请求范畴之内
- 接口测试  ,  做完要自己测试 , 避免跟后端冲突 , 搞好人际
- 模块化   es6模块化必须要了解
components:非路由组件
views,pages:路由组件
App:最后将各个组件组合到App组件中,然后通过index.html进行渲染
```

## 03、vue的main.js基本编码

```js
import Vue from 'vue'
import App from '@/App.vue'
import router from '@/router'
Vue.config.productionTip = false

new Vue({
  router,//注册注入给VUe添加路由功能并且能让每个组件内部都有两个对象可以拿到$router $route
  render: h => h(App),
}).$mount('#app')
  
```



## 04、eslint错误级别禁用   lintOnSave: false,

```js
根目录新建vue.config.js(package.json的同级文件)
module.exports = {
  		lintOnSave: false,
	}
```



## 05、jsconfig.json配置别名@提示

```js
根目录创建jsconfig.json(package.json的同级文件)

{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
        "@/*": ["src/*"]
    }
  },
  "exclude": ["node_modules", "dist"]
}
```



配置完成跑起项目，没有报错各种都正常，证明项目准备没问题

跑起来运行报错 （warning 找不到vue）  装的是3.0版本
我们用的是2.6.11
需要重新安装vue@2
又找不到  vue-template-compiler
安装 vue-template-compler

## 06、git的基本操作和分支基本操作

​	git基本操作
​		先有本地代码
​			创建本地库:git init
​			创建远程库
​			关联本地和远程==>git remote add "远程库地址"
​			修改本地
​			修改远程

		先有远程代码
			直接克隆


	git分支扩展
		分支创建和合并
			本地创建分支   git checkout -b dev
			本地推送新分支自动在远程库建立新分支  git push origin dev
			合并分支之前如果是多人协作先拉取一下远程master，以防止别人已经做了更改
			本地切换到master 然后再合并分支  git merge dev 
			合并之后再次推送到远程master
		分支删除
			项目开发完成可以删除分支		  
			git push origin --delete dev  删除远程分支
			git branch -d dev  删除本地分支 



## 07、观察页面确定页面主体框架
所有的功能页面都是 上中下结构    上和下是不变化的，只有中间在变化  

- header
- main
- footer

 	

## 08、定义页面主体组件组装，切换路径可以组件跳转（非路由组件和路由组件）

```
	Header和Footer是固定的所以是非路由组件
	Home  Search  Login  Register 都是点击才会出现所以是路由组件并且是一级的（可能内部还有二级）
	非路由组件组装
	路由的注册使用
	路由可以分模块去编写
```

## 09、把Header和Footer的模板进行替换显示

```js
App.vue
引入html到vue组件 template
引入less到vue组件 style   解决loader   只需要安装less 和 less-loader就可以了
引入图片	
使用less需要npm i less-loader -D
创建相应的组件文件夹拆分组件
在 components 文件夹中创建 footer 和 header 组件文件夹
将相应的 html 结构放入组件中
将相应的 css 或者 less 文件放入组件中
将图片文件(logo.png 和 wx_cz.jpg)放入组件文件夹下的 images 文件夹中
在 App.vue 文件中引入并注册组件
import Header from "@/components/Header";
import Footer from "@/components/Footer";
export default {
  name: "App",
  components: {
    Header,
    Footer,
  },
};
```

### 拆分非路由组件

```
1在components文件夹下创建Footer, Header文件夹; 
将静态页面的html, 和css分别写入相应的index.vue组件; 并且添加index.vue同级文件夹images将需要用到的图片放入其中; 
2: 在public中的index.html添加同级文件夹css, 将reset.css添加其中
index.html
```

创建跟components文件夹同级的pages文件夹

- Home文件夹 ,Login文件夹  ,Register文件夹  ,Search文件夹 , 里面都需要一个index.vue

- **创建跟pages同级的router文件夹**

  - **router/index.js , 引入基础组件 , 使用VueRouter插件**

  - ```
    import Vue from "vue";
    import VueRouter from 'vue-router';
    import routes from '@/router/routes'
    
    //声明使用插件 vue的插件都要去声明使用
    Vue.use(VueRouter);
    const router = new VueRouter({
      //配置应用中的所有路由
      routes
    })
    
    export default router;
    ```

  - **routes.js**

    - ```js
      import Home from "@/pages/Home";
      import Search from "@/pages/Search";
      import Login from "@/pages/Login";
      import Register from "@/pages/Register";
      export default [
        //专门配置各种路由的地方
        {
          path: "/home",
          component: Home,
        },
        {
      
          path: "/search/:keyword?", //?代表这个params参数可以传也可以不传
          component: Search,
          name: "search",
          // props:true  //布尔值写法： 代表只是把params参数通过属性传递给相应的组件
          // props:{name:'赵丽颖'} // 对象写法，只能传递静态的数据  几乎不用  因为需要额外传递静态数据才会用到
          props(route) {
              console.log(route);
            //route 收集好参数的路由对象
            //把传递过来的params参数和query参数一起映射为组件的属性（）
            return { keyword: route.params.keyword, keyword2: route.query.keyword };
          },
        },
        {
          path: "/login",
          component: Login,
          meta: {
            isHide: true,
          },
        },
        {
          path: "/register",
          component: Register,
          meta: {
            isHide: true,
          },
        },
        //重定向路由,根目录重定向到home
        {
          path: "/",
          redirect: "/home",
        },
      ];
      
      ```

  - **src里面创建App.vue , 真正渲染的页面**

    - 需要引入Header  Footer

    - 给组件命名为App 

    - 注册组件Header  Footer

    - 使用组件Header  Footer

      - ```
        <Header></Header>
        //会遍历路由中需要显示的路由并显示到页面上
        <router-view></router-view>
        //如果meta为false就不显示
        <Footer v-if="!$route.meta.isHide"> </Footer>
        ```

  - **src里面创建main.js**

    - 需要引入vue  App.vue  和 router  

      - 可以用@代表src

    - new Vue , 注册注入给Vue添加路由功能并且能让每个组件内部都有两个对象可以拿到$router $route

      - ```js
        new Vue({
          router,
          render: h => h(App),
        }).$mount('#app')
        ```

- **App.vue**

- ```vue
  <template>
    <div>
      <Header></Header>
      <router-view></router-view>
      <Footer v-if="!$route.meta.isHide"> </Footer>
    </div>
  </template>
  
  <script>
  import Header from '@/components/Header'
  import Footer from '@/components/Footer'
  
  export default {
    name: 'App',
    components: {
      Header,
      Footer
    }
  }
  </script>
  
  ```
  
  - **Search/index.vue**
  
  - ```vue
  <template>
        <div>
          Search<br>
            params参数:{{$route.params.keyword}}
            params参数简便获取:{{keyword}}
            query参数:{{$route.query.keyword}}
            query参数简便获取:{{keyword2}}
        </div>
    </template>
    
    <script>
    export default {
        //组件名称
        name:'Search',
        props:['keyword','keyword2']
    }
    </script>
    
    <style lang="less" scoped>
    
    </style>
    ```


需要安装 npm i less-loader -D 

运行程序是否正常; 

#### 总结:

A, 在pages目录下创建相应的路由组件Home, Login, Search, Register

B, 将其引入到routes.js文件中, 并且配置路由

```js
import Home from '@/pages/Home'

import Login from '@/pages/Login'

import Search from '@/pages/Search'

import Register from '@/pages/Register'

export default [{

        path: '/home',

        component: Home

    },

    {

        path: '/login',

        component: Login

    }, {

        path: '/search',

        component: Search

    }, {

        path: '/register',

        component: Register

    },

]
```

## 配置路由

A, 在router目录下创建路由配置index.js

```js
import Vue from 'vue'

import VueRouter from 'vue-router'

import routes from '@/router/routes'

Vue.use(VueRouter)

export default new VueRouter({

    routes

})
```

B, 在main.js中引入并且注册路由

```js
import Vue from 'vue'

import App from './App.vue'

import router from '@/router' //引入路由

Vue.config.productionTip = false

new Vue({

    render: h => h(App),

    router //注册路由

}).$mount('#app')
```

C, 在App.vue中进行路由组件的展示

```js
在App.vue中添加: < router - view > < /router-view>
```

在src下创建路由组件文件夹pages, (components放非路由组件)

Home文件夹/index.vue

```js
<template>
  <div>Home</div>
</template>

<script>
export default {
  name: 'Home',
}
</script>

<style lang="less" scoped>

</style>

```

相应的创建Login, Register, Search组件; 

Search组件

写一个组件标签, 就相当于创建一个组件对象

```js

<template>
  <div>

Search <br>

params参数:{{$route.params.keyword}}

params参数简便获取:{{keyword}}

query参数:{{$route.query.keyword}}

query参数简便获取:{{keyword2}}
   
 </div>
</template>

<script>
export default {
  name: 'Search',
  props:['keyword','keyword2','name']
}
</script>

<style lang="less" scoped>

</style>

```

在router 里面添加routes.js; 进行模块化

在src目录下创建router文件夹, 并且创建index.js, routes.js


自定义模块的3步骤:



1.引入js模块


2, 声明js模块, 不声明使用无效 Vue.use(VueRouter)

3, 使用js模块

router/index.js

```js
import Vue from 'vue'
import VueRouter from 'vue-router'
import routes from '@/router/routes'

Vue.use(VueRouter) //声明使用插件  vue的插件都要去声明使用  第三方免了

const router = new VueRouter({

    routes
})
export default router
```

routes.js

```js
import Home from '@/pages/Home'

import Search from '@/pages/Search'

import Login from '@/pages/Login'

import Register from '@/pages/Register'

export default [

    //专门配置各种路由的地方

    路由和路由器要区分

    {

        path: '/home',

        component: Home

    },

    {

        path: '/search/:keyword?', //?代表这个params参数可以传也可以不传

        component: Search,

        name: 'search',

        // props:true  //布尔值写法： 代表只是把params参数通过属性传递给相应的组件

        // props:{name:'赵丽颖'} // 对象写法，只能传递静态的数据  几乎不用  因为需要额外传递静态数据才会用到

        props(route) { //route 收集好参数的路由对象

            //把传递过来的params参数和query参数一起映射为组件的属性（）

            return {

                keyword: route.params.keyword,

                keyword2: route.query.keyword

            }

        }

    },

    {

        path: '/login',

        component: Login,

        meta: {

            isHide: true //证明要隐藏footer

        }

    },

    {

        path: '/register',

        component: Register,

        meta: {

            isHide: true //证明要隐藏footer

        },

    },

    //重定向

    {

        path: '/',

        redirect: '/home'

    }

]
```

在main.js中引入router; 
main.js

```js
import Vue from 'vue'
import App from '@/App'
import router from '@/router'
//组件三大步： 定义  注册  使用

Vue.config.productionTip = false

new Vue({

    // el:'#app',

    router, //注册注入给Vue添加路由功能并且让每个组件内部都有两个对象可以拿到 $router $route

    render: h => h(App) //  1、注册组件App   2、使用组件   3、渲染组件

    // components:{

    //   App

    // },

    // template:'<App/>'   //
}).$mount('#app')
```

展示

```js
1, 在App.vue中添加

<router-view></router-view>

2. 在Header.vue中修改

<!-- <a href="###"></a> -->

<router-link to="/register" class="register">免费注册</router-link>

<!-- <a href="###" ></a> -->

新建pages文件夹, 

创建Home, 

新建router文件夹:index.js   

引入注入到main.js; //注册注入给Vue添加路由功能并且让每个组件内部都有两个对象可以拿到 $router $route

改进方案:

在router 里面添加routes.js; 进行模块化

写一个组件标签, 就相当于创建一个组件对象
```



## 10、配置路由在对应点击切换路由组件的位置，替换路由链接	
**整理/更新位置**

​	声明式导航和编程式导航

创建 pages 路由组件文件夹,在里面创建 Home,Login,Register,Search 路由组件
npm i vue-router -S 下载 router 插件包
在 router 文件夹下创建 routes.js,模块化方便管理

```
声明式导航(router-link)和编程式导航(push repalce)
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Search from "@/pages/Search";

export default [
  {
    path: "/home",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/search",
    component: Search,
  },
  {
    //重定向路由
    path: "/",
    redirect: "/home",
  },
];
```

在 router/建 index.js 配置文件

```js
import Vue from "vue";
import VueRouter from "vue-router";
import routes from "@/router/routes";
Vue.use(VueRouter);

const router = new VueRouter({
  routes,
});

export default router;
```

在 main.js 中注入 router

```js
import Vue from "vue";
import App from "@/App";
import router from "@/router";
Vue.config.productionTip = false;

new Vue({
  router, //注入router,给Vue添加路由功能并且让每个组件内部都有两个对象可以拿到:$router $route
  render: (h) => h(App),
}).$mount("#app");
```

将结构内对应的 a 标签替换为<router-link></router-link>

```js
<router-link to="/login">登录</router-link>
<router-link class="register" to="/register">免费注册</router-link>
<router-link class="logo" title="尚品汇" to="/home">
  <img src="./images/logo.png" alt="" />
</router-link>
```

每个 router-link 标签都会创建一个组件对象,使用过多会消耗更多内存,编程式导航可以解决
编程式导航

```
<button @click="toSearch">搜索</button>

methods: {
    toSearch() {
      this.$router.push('/search')
    },
  },
```

### 解决多次触发编程式导航 报错的问题

```js
const originPush = VueRouter.prototype.push; //保存原来的push函数 ，后面修改之后可以找到原来的
const originReplace = VueRouter.prototype.replace;

VueRouter.prototype.push = function(location, onResolved, onRejected) {
  //调用push根本没有处理promise的回调，无论成功和失败
  if (onResolved === undefined && onRejected === undefined) {
    return originPush.call(this, location).catch(() => {});
  } else {
    //代表调用push的时候，传了处理promise的回调
    return originPush.call(this, location, onResolved, onRejected);
  }
};

VueRouter.prototype.replace = function(location, onResolved, onRejected) {
  //调用push根本没有处理promise的回调，无论成功和失败
  if (onResolved === undefined && onRejected === undefined) {
    return originReplace.call(this, location).catch(() => {});
  } else {
    //代表调用push的时候，传了处理promise的回调
    return originReplace.call(this, location, onResolved, onRejected);
  }
};
```



## 11、登录注册不需要Footer,通过路由meta配置解决
​	从route当中可以获取到path判断可以解决但是麻烦

```js
<footer v-if="$route.path !== '/login' && $route.path !== '/register'"></footer>
```

meta 配置
在路由配置对象中设置 meta 属性

```js
{
    path: "/login",
    component: Login,
    meta: {
      isHide:true  //要隐藏footer
    },
  },
  {
    path: "/register",
    component: Register,
    meta: {
      isHide:true //要隐藏footer
    },
  },
```

在标签中使用 meta 配置

```js
<footer v-if="!$route.meta.isHide"></footer>

```





## 12、路由传参相关 

	1)跳转路由的2种基本方式
	        	声明式: <router-link to="">
	        	编程式: this.$router.push()/replace()
	2)跳转路由携带参数的2种方式
	    	params参数
	    	query参数
	    	可以在路径后拼接  
	    	也可以使用对象写法
	
	3)面试问题1: 
		描述: 编程式路由跳转到当前路由(参数不变), 会抛出NavigationDuplicated的警告错误
		      声明式路由跳转内部已经处理
	原因：vue-router3.1.0之后, 引入了promise的语法
		     如果没有通过参数指定成功或者失败回调函数就返回一个promise来指定成功/失败的回调
		     且内部会判断如果要跳转的路径和参数都没有变化, 会抛出一个失败的promise
	
		解决: 1：在跳转时指定成功或失败的回调函数, 或者catch处理错误
		      2: 修正Vue原型上的push和replace方法 (优秀)

​	

	5)面试问题3: 指定params参数时可不可以用path和params配置的组合?（对象写法）
		不可以用path和params配置的组合, 
		只能用name和params配置的组合
		query配置可以与path或name进行组合使用
	
	4)面试问题2: 如何指定params参数可传可不传?    
		path: '/search/:keyword?'
	
	6)面试问题4: 如果指定name与params配置, 但params中数据是一个"", 无法跳转，路径会出问题
		前提是路由params参数要可传可不传
			解决1: 不指定params
		解决2: 指定params参数值为undefined


	7)面试问题5: 路由组件能不能传递props数据?
			可以: 可以将query或且params参数映射/转换成props传递给路由组件对象
		实现: props: (route)=>({keyword1:route.params.keyword, keyword2: route.query.keyword })

**路径后拼接传参**

```js
this.$router.push("/search?keyword=");
```

**对象传参**

```js
let location = {
  path: "/search",
};
this.$router.push(location);
```

**传递 params 参数和 query 参数**

**params 参数需要在路由配置路径中接收**

```js
{
    path: "/search/:keyword",
    component: Search,
},
```

**指定 params 参数时不可以用 path 和 params 配置的组合,只能用 name 和 params 配置的组合**

```js
let location = {
  // path: "/search",
  name: "search",
  params: {
    keyword: this.keyword,
  },
  query: {
    keyword: this.keyword.toUpperCase(),
  },
};
this.$router.push(location);

{
    path: "/search/:keyword",
    component: Search,
    name: "search",
  },
```

**解决 params 中数据是一个"", 无法跳转，路径出错问题**

```js
{
    path: "/search/:keyword?",//?代表这个params参数可传可不传
    component: Search,
    name: "search",
}

let location = {
        // path: "/search",
        name: "search",
        params: {
          keyword: this.keyword || undefined,
        },
        query: {
          keyword: this.keyword.toUpperCase(),
        },
      };
      this.$router.push(location);
```

**路由组件传递 props 数据(简便使用)**

```js
 1.
props: true; //代表只是把params参数通过属性传递给相应的组件

2.
props: {
  name: "jack";
} //只能传递静态数据

3.
{
    path: "/search/:keyword?",
    component: Search,
    name: "search",
    props(route){ //route收集好参数的路由对象
      //把传递过来的params参数和query参数一起映射为组件的属性
      return{keyword:route.params.keyword,keyword2:route.query.keyword}
    }
},
//接收使用
export default {
  name: "Search",
  props: ["keyword", "keyword2"],
};
```



# day02



## 13、先来搞Home,Home的子组件静态页面实现
​	费时费力  但是莫急莫慌

- Brand  Floor  Like  ListContainer  Rank  Recommend  分别给每个文件夹添加图片文件夹和index.vue

Home的静态页面就有了，接下来要去实现动态数据

拆分 Home 的所有组件,实现主页的静态展示
因为主页和搜索页都用到了 TypeNav 组件,所以将其放至 components 文件夹中,并且全局注册
在 main.js 中配置

```js
import TypeNav from "@/components/TypeNav";
Vue.component("TypeNav", TypeNav);
```



## 14、**postman测试后台api接口，保存请求信息以便后期使用（参考接口文档）**
​	**postman的基本使用方法**



## 15、前后台交互模块ajax模块，对axios的二次封装
​	获取数据离不开ajax，所以先把ajax工具搞定

```js
src/建ajax
配置基础路径和超时限制
// 1、配置基础路径和超时限制
import axios from "axios";
//创建一个新的axios实例
    const instance = axios.create({
      baseURL: "/api", //配置基础路径
      timeout: 20000, //配置请求超时时间
    });
//2.添加进度条信息  nprogress
//请求拦截器当中添加打开进度条的功能,config就是请求报文
instance.interceptors.request.use((config) => {
    NProgress.start();
    //处理config(请求报文)
    //添加额外的功能,使用进度条
    return config; //返回这个config , 请求继续发送,发送的报文信息就是新的config对象
});

//3.返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
instance.interceptors.response.use(
  (response) => {
    NProgress.done();
    //
    //默认返回的是response,也就是我们的响应报文信息,如果要拿到数据就通过response.data去获取
    //现在我们是在返回响应之前把响应直接改成了数据,以后拿数据就不需要.data了
    return response.data;
  },
  (error) => {
    //4 统一处理请求错误, 具体请求也可以选择处理或不处理
    alert("发送请求失败:" + error.message || "未知错误");
    //如果需要进一步处理这个错误,那么就返回一个失败的promise
    //new Error("请求失败")就是自定义错误信息
    // return Promise.reject(new Error("请求失败"));
    //如果不需要再去处理这个错误,那么就返回一个pending状态的promise(目的在于终止promise链)
    return new Promise(() => {});
  }
);
export default instance; //暴露出去我们的axios工具  后面发请求使用
统一处理请求错误, 具体请求也可以选择处理或不处理
```


​		

## 16、所有接口的请求函数模块，我们定义一个index.js去写
​	以后请求什么数据直接导入去调函数就可以
​	先写请求三级分类列表数据
​	测试ajax请求是否能够拿到数据

```js
src/建api文件夹/建index.js
//这个文件是所有的接口请求函数的文件
//每个请求接口数据都定义成一个函数,以后哪里需要请求数据,就调用对应的这个接口请求函数就好了
import Ajax from '@/ajax/Ajax.js'//刚才暴露出去的instance
//拿到三级列表的数据,调用这个函数就可以了
export const reqCategoryList = ()=>{
    return Ajax({
        url:'product/getBaseCategoryList',
        method:'get'
    })
}
reqCategoryList()
```



## 17、测试ajax请求解决跨域问题

```js
vue.config.js
返回404需要解决跨域
配置代理服务器解决跨域问题
module.exports = {
  lintOnSave: false, //eslint-loader 是否在保存的时候检查
  devServer: {
      //代理服务器
    proxy: {
        //匹配到/api就会访问http://182.92.128.115/
      "/api": {
        target: "http://182.92.128.115/",
      },
    },
  },
};

```

## 18、可以拿到数据，但是我们得去管理我们的数据，使用vuex

src / 建store文件夹 / 建user.js , home.js , 使用vuex模块化管理数据

每个vuex模块都能包含 state  mutations actions getters
	多模块化  画图分析
	总的state结构是什么
	mapState的写法分析  之前的state就是总的state  现在state里面包含了子模块对象
	state结构要注意
	state:{
		home:{
		},
		user:{
		}
	}

<img src="E:\前端学习资料\0422前端\渊哥\视频\0812前台项目02\vuex模块化开发.png" alt="vuex模块化开发" style="zoom: 200%;" />

```js
store/home.js
import {reqCategoryList} from '@/api'
//初始化分类列表数据
const state = {
  categoryList:[]
}
const mutations = {
  //直接修改数据  （不允许出现if  for  异步操作）
  RECEIVECATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  }
}
const actions = {
  //异步请求获取数据  允许if  for  异步操作
  async getCategoryList({commit}){
    //这里是异步操作,所以不能这样写
    // reqCategoryList().then(result => {
    //   commit('RECEIVECATEGORYLIST',result.data)
    // })
      //二次封装已经统一处理过错误了,所以就不用.catch
	//这里肯定拿的是成功的结果
    const result = await reqCategoryList()
    if(result.code === 200){
      commit('RECEIVECATEGORYLIST',result.data)
    }
  }
  
}
const getters = {
  // categoryList1(state){
  //   return state.categoryList
  // }
}

export default {
  state,
  mutations,
  actions,
  getters,
};

```

```js
store/user.js
//保存数据状态
const state = {};
//直接修改数据
const mutations = {};
//间接修改数据
const actions = {};
//计算属性
const getters = {};

export default {
  state,
  mutations,
  actions,
  getters,
};
```

```js
把home.js 和 user.js合并到index.js
import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import user from "./user";
import home from "./home";


export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    user,
    home,                                                 
  },//合并小的store到大的store身上
});
```



```js

TypeNav用组件中的数据,就在这里发请求

mounted(){
    //需要发请求就调函数,
    this.getCategoryList()
},
    methods:{
        getCategoryList(){
            this.$store.dispatch('getCategoryList')
        }
    }
//看页面上netWork请求有没有发送,vue调试工具看组件,里面还没有数据,因为还没有从vuex里拿,
//现在需要从vuex里面拿数据
computed:{
    ...mapState({
        categoryList:state=>state.home.categoryList
    }),
        //这两种写法都可以
        //...mapGetters(['categoryList1'])
}
//根据当前数据计算数据
const getters = {
    return state.categoryList1
}
//写完要看数据, 首先看netWork有没有发请求,然后看vuex有没有数据,最后看vue里有没有拿到数据,写一步要有一步的效果
```



## 19、获取到数据后显示三级分类列表
​	分析数据结构：在模板上展示数据v-for

	鼠标悬停在链接上变色，需要修改一下公共样式
	悬停在分类上背景色需要变化，修改分类组件的样式
	三级分类列表宽度比较小，右边的缝隙比较大

```js
TypeNav/index.vue 展示数据
把class为item的都可以删掉了,在bo里面遍历categoryList里面的c1,写:key,
(c1代表一个一个数据)
<div class="item" v-for="c1 in categoryList" :key="c1.categoryId">
  <h3>
    <a href="javascript:;">{{c1.categoryName}}</a>
  </h3>
</div>

一级分类里面的a标签改成{{c1.categoryName}}
class="fore"不正常,需要遍历,它就是二级分类,遍历c1.categoryChild里面的c2,写:key,
    dt里面的a标签插值c2.categoryName
em代表的是三级分类,留一个,再遍历c2.categoryChild里面的c3,:key
这时候左侧分类列表就能显示数据了
<dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
  <dt>
    <a href="">{{c2.categoryName}}</a>
  </dt>
</dl>
<em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
  <a href="">{{c3.categoryName}}</a>
</em>
```



# day03 防抖节流 按需引入lodash 



## 20、事件控制二 三级的显示和隐藏
​	原来的是使用css去做的，咱们不用
​	添加移入和移出事件（关键是数据的设计）
​		移入哪一个把哪一个的index，传到回调函数，然后把currentIndex = index
​		上面使用类的对象写法：item_on : currentIndex == index
​		而移出事件我们需要移出全部分类的时候才会消失，因此移出事件我们需要添加在外部一个div上

```js
将 css 控制显示隐藏改为事件控制
修改 css 类名
&.item_on {
  background-color: skyblue;
  .item-list {
    display: block;
  }
}
```

添加移入和移出事件,移出事件我们需要添加在外部一个 div 上

```js
TypeNav/index.vue
<div @mouseleave="currentIndex=-1 ">
  <h2 class="all">全部商品分类</h2>
  <div class="sort">
    <div class="all-sort-list2" @click="toSearch">
      <div
        class="item"
        @mouseenter="moveIn(index)"
        :class="{item_on:currentIndex === index}"
      ></div>
    </div>
  </div>
</div>
```

定义鼠标移入方法

```js
TypeNav/index.vue
data() {
    return {
      currentIndex: -1, //当前移入项的下标  初始值 -1  移入某一项，就把这个值改为移入的这项的下标
    };
  },
moveIn(index) {
    //移入某一项 就把currentIndex的值改为移入这个项的下标
    //而我们在项上添加的item_on这个类就会生效
    this.currentIndex = index;
     },
```



21、演示快速触发事件卡顿现象





## 22、函数的防抖和节流讲解
​	100秒触发100次
​	正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行
​	节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
​	防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会，也就是说如果连续快速的触发  只会执行一次

## 23、优化快速触发typeNav鼠标移入和移出事件，节流lodash的throttle节流操作
​	将移入事件的回调进行节流操作

```js
TypeNav/index.vue
//引入lodash里面的throttle方法
//初始化当前索引	
 data() {
    return {
      //当前移入项的下标  初始值 -1  移入某一项，就把这个值改为移入的这项的下标
      currentIndex: -1,
      isShow: true,
    };
  },
//methods里面,节流的方法,
  moveIn: throttle(
      function (index) {
        console.log(index);
        this.currentIndex = index;
      },
      30,
      { trailing: false } //开始的时候触发
    ),
      
 //移出外部的div首页的三级分类不会隐藏
    moveOutDiv() {
      //当前下标的项不显示
      this.currentIndex = -1;
      //判断路由对象的path是否等于首页
      if (this.$route.path !== "/home") {
        //让三级分类列表隐藏
        this.isShow = false;
      }
    },
  <!-- html部分-->      
<div 
     @mouseenter="moveIn(index)"
      class="item"
      :class="{item_on:currentIndex === index}"
      v-for="(c1,index) in categoryList"
      :key="c1.categoryId">
</div>
```



## 24、按需引入lodash减少打包体积
​	引入的时候不要去引入整个lodash
​	引入lodash/throttle ,创建throttle方法

```js
TypeNav/index.vue
import {throttle} from "lodash";
moveIn: throttle(
      function (index) {
        console.log(index);
        this.currentIndex = index;
      },
      30,
    //25、解决使用lodash节流后，快速移出后
​	{ 'trailing': fasle}
      { trailing: false } //开始的时候触发
    ),
```

## 25、解决使用 lodash 节流后，快速移出后，可能还会显示某个子项

```js
{
  trailing: fasle;
} //的作用    是否在结束延迟之后调用
```



## 26、点击某个类别（无论几级）跳转到搜索页面
​	先用声明式导航替换原来的a
​	需要把类别的id和类别的名字通过query参数传递

此方法会造成卡顿

```js
TypeNav/index.vue
<router-link
  :to="{name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}"
  >{{c2.categoryName}}</router-link
>
```



```javascript
TypeNav/index.vue
//解构data对象里面的categoryname,category1id,category2id,category3id
      let { categoryname, category1id, category2id, category3id } = data;
```



## 27、使用编程式路由导航优化声明式导航组件对象过多造成的卡顿
​	声明式导航本质上是组件对象，组件对象过多，会造成效率很慢  所以会很卡
​

## 28、利用事件委派提高处理事件的效率
​	每个项都添加事件，事件的回调函数很多，效率也不好
​	在共同的父级元素添加事件监听

```js
TypeNav/index.vue
<div class="container" @click="toSearch"></div>
```



​		问题：怎么知道点击的是不是a标签

​		因为是自定义属性

​		问题：怎么知道点击的是一级还是二级还是三级

​		

​		问题：参数怎么携带，要携带携带哪些个的参数

通过设置自定义属性

```js
<a
  href="javascript:;"
  :data-categoryName="c1.categoryName"
  :data-category1Id="c1.categoryId"
  >{{c1.categoryName}}</a
>
```

定义点击事件回调

```js
 //点击类别事件回调
toSearch(event) {
      //真正触发事件的目标子元素
      let target = event.target;
      //自定义属性组成的对象,拿到目标元素身上所有的自定义属性组成的对象
      let data = target.dataset;
    // 什么时候点的就是a标签  data当中存在categoryname那么就是点击的a标签
      // console.dir(target);
      //解构data对象里面的categoryname,category1id,category2id,category3id
      let { categoryname, category1id, category2id, category3id } = data;
      //判断是否有categoryname
      if (categoryname) {
        //点击的就是a标签
        let location = {
          name: "search",
        };
        //query参数
        let query = {
          categoryName: categoryname,
        };
        //判断是否有category1id
        if (category1id) {
          query.category1id = category1id;
        } else if (category2id) {
          query.category2Id = category2id;
        } else {
          query.category3Id = category3id;
        }
        //到了这query参数就收集完了
        location.query = query;
        //点击类别的时候带的是query参数,我们得去看看原来有没有params参数，有的话也得带上
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        //如果没有就放到路由对象上
        this.$router.push(location);
      }
    },
```



## 29、利用自定义属性携带动态数据
​	标签的data-开头的属性，叫做自定义属性
​	通过我们的标签对象.dataset跳转搜索页后

```js
TypeNav/index.vue
href="javascript:;"
  :data-categoryName="c1.categoryName"
  :data-category1Id="c1.categoryId"

href="javascript:;"
:data-categoryName="c2.categoryName"
:data-category2Id="c2.categoryId"

href="javascript:;"
:data-categoryName="c3.categoryName"
:data-category3Id="c3.categoryId"
```





## 30、搜索页的typeNav一级列表隐藏
​	首先这个组件被多个页面公用
​	在mounted的时候可以判断路由是不是home, 如果不是把isShow改为false,  只是初始显示组件的时候隐藏一级分类

```js
<div class="sort" v-show="isShow"></div>
```

```js
mounted() {
    if(this.$route.path !== '/home'){
      this.isShow = false
    }
  },
```




	移入的时候，一级分类要显示
	再次考虑外部盒子移入和移出  首页的移入移出，不会隐藏，但是其余的会移出隐藏，因此移入和移出我们需要使用回调函数
	点击搜索类别跳转到当前搜索页面也要把一级类别隐藏

## 31、显示和隐藏一级列表的过渡效果添加
​	首先谁要加过渡就看谁在隐藏和显示
​	需要放在transition标签内部，name需要起名字
​	参考官方给的过渡图
​	移入的时候是有过渡的
​	移出的时候立马隐藏的
​	注意：高度也是变化的

<transition name="show"> 

<div class="sort" v-show="isShow"></div>

</transition>

设置鼠标移入移出事件

设置鼠标移入移出函数

```js
TypeNav/index.vue
moveInDiv() {
    this.isShow = true;
  },
  moveOutDiv() {
    this.currentIndex = -1;
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },
```



```js
TypeNav/index.vue
  <transition name="show">
          <div class="sort" v-show="isShow">
            <div class="all-sort-list2">
              <div
                class="item"
                @mouseenter="moveIn(index)"
                :class="{item_on:currentIndex === index}"
                v-for="(c1, index) in categoryList"
                :key="c1.categoryId"
              >
                <h3>
                  <!-- <router-link
                    :to="`/search?categoryName=${c1.categoryName}&category1Id=${c1.categoryId}`"
                  >{{c1.categoryName}}</router-link>

                  <router-link
                    :to="'/search?categoryName='+c1.categoryName+'&category1Id='+c1.categoryId"
                  >{{c1.categoryName}}</router-link>-->

                  <!-- 使用声明式导航，会卡  原因每个<router-link>组件标签，都会创建一个组件对象，创建的太多了，改为编程式导航 -->
                  <!-- <router-link
                    :to="{name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}}"
                  >{{c1.categoryName}}</router-link>-->

                  <!-- 修改为编程式导航，卡的不厉害了，因为我们使用事件处理，不会创建很多的组件对象，
                  但是会出现很多的事件回调，内存占用还是比较大，效率还不高，最终我们决定使用事件委派来解决-->
                  <!-- <a
                    href="javascript:;"
                    @click="$router.push({name:'search',query:{categoryName:c1.categoryName,category1Id:c1.categoryId}})"
                  >{{c1.categoryName}}</a>-->

                  <a
                    href="javascript:;"
                    :data-categoryName="c1.categoryName"
                    :data-category1Id="c1.categoryId"
                  >{{c1.categoryName}}</a>
                </h3>
                <div class="item-list clearfix">
                  <div class="subitem">
                    <dl class="fore" v-for="(c2, index) in c1.categoryChild" :key="c2.categoryId">
                      <dt>
                        <!-- <a href>{{c2.categoryName}}</a> -->
                        <!-- <router-link
                          :to="{name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}}"
                        >{{c2.categoryName}}</router-link>-->

                        <!-- <a
                          href="javascript:;"
                          @click="$router.push({name:'search',query:{categoryName:c2.categoryName,category2Id:c2.categoryId}})"
                        >{{c2.categoryName}}</a>-->
                        <a
                          href="javascript:;"
                          :data-categoryName="c2.categoryName"
                          :data-category2Id="c2.categoryId"
                        >{{c2.categoryName}}</a>
                      </dt>
                      <dd>
                        <em v-for="(c3, index) in c2.categoryChild" :key="c3.categoryId">
                          <!-- <a href>{{c3.categoryName}}</a> -->
                          <!-- <router-link
                            :to="{name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}}"
                          >{{c3.categoryName}}</router-link>-->

                          <!-- <a
                            href="javascript:;"
                            @click="$router.push({name:'search',query:{categoryName:c3.categoryName,category3Id:c3.categoryId}})"
                          >{{c3.categoryName}}</a>-->

                          <a
                            href="javascript:;"
                            :data-categoryName="c3.categoryName"
                            :data-category3Id="c3.categoryId"
                          >{{c3.categoryName}}</a>
                        </em>
                      </dd>
                    </dl>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </transition>

//css部分
 &.show-enter {
        opacity: 0;
        height: 0;
      }
      &.show-enter-to {
        opacity: 1;
        height: 461px;
      }
      &.show-enter-active {
        transition: all 0.5s;
      }

```



## 32、优化typeNav数据ajax请求次数，改变请求的位置
​	之前我们是在typeNav组件内部dispatch去发送ajax请求，这样的话
​	因为typeNav是被多个页面公用的，所以每次切换到一个页面，这个组件都会重新创建  mounted都会执行
​	因此有几个页面公用了这个typeNav就会执行几次ajax请求
​	所以我们放到App里面就只用执行一次，因为数据一样，没必要多次请求

```js
src/components/TypeNav/index.vue
import { mapActions } from "vuex";
//发送请求
  mounted() {
    this.getCategoryList();
  },
  methods: {
    getCategoryList() {
        //触发Actions函数,传递getCategoryList回调
      this.$store.dispatch("getCategoryList");
    },
  },
 //触发home.js的actions里面的函数,请求数
 
store/home.js
  const state = {
  categoryList:[]
}
const mutations = {
  //直接修改数据  （不允许出现if  for  异步操作）
  RECEIVECATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  }
}
      
      const actions = {
  //异步请求获取数据  允许if  for  异步操作
  async getCategoryList({commit}){
    //  
    // reqCategoryList().then(result => {
    //   commit('RECEIVECATEGORYLIST',result.data)
    // })
      
 //二次封装已经统一处理过错误了,所以就不用.catch
	//这里肯定拿的是成功的结果
    const result = await reqCategoryList()
    if(result.code === 200){
      commit('RECEIVECATEGORYLIST',result.data)
    }
  }
```



## 33、合并分类的query参数和搜索关键字的params参数
​	找到对应组件
​	点击search按钮的时候，去看看有没有query参数
​	点击类别选项的时候，去看看有没有params参数
​	注意：我们点击搜索的时候关键字使用的是params参数
​	      点击类别选项的时候我们的参数使用的是query参数

见28  29步

```js
components/Header/index.vue
methods
 toSearch(){
//点击搜索的时候应该去看看以前有没有query参数 （路由当中有没有）
    if(this.$route.query){
            location.query = this.$route.query
          }
}
```

```js
src/components/TypeNav/index.vue
 //点击类别的时候带的是query参数，我们得去看看原来有没有params参数，有的话也得带上
toSearch(e){
    if(categoryname){
        //新增代码
        if (this.$route.params) {
              location.params = this.$route.params;
            }
    }
     
}
 
```

```js
Hearder/index.vue
toSearch() {
  let location = {
    name: "search",
    params: {
      keyword: this.keyword || undefined,
    },
  };
    //点击搜索的时候应该去看看以前有没有query参数 （路由当中有没有）
  if (this.$route.query) {
    location.query = this.$route.query;
  }
    //没有的话就放到路由对象上
  this.$router.push(location);
},
```

注意：我们点击搜索的时候关键字使用的是 params 参数
点击类别选项的时候我们的参数使用的是 query 参数


到此为止我们的类别选项列表就完成了，后面开始做ListContainer和Floor

 



# day04 模拟数据 轮播

接下来我们就要做首页的ListContainer和Floor组件

## 34、设计json数据的结构和值
​	banners.json
​	floors.json
​	创建 mock 文件夹,模拟本地数据,创建 banner.json floor.json

## 35、使用mockjs来模拟数据接口（其实和ajax差不多，mock其实就是给我们的json数据指定一个url路径去做请求）
​	准备json数据
​	使用mockjs来模拟提供接口地址

- 在main中引入mockServer.js
- 安装npm i mockjs -S

mock会拦截我们的ajax请求，从本地拿数据返回 , 不会真正去发送请求。( 发送请求是往本地发的 , 没有往后端发的 , 请求的数据也是本地的) 请求回来的是Json数据格式

**src建立mock文件夹**

- 建立banner.json , 从文档粘json数据

- ```js
  [
      {
          "id":"1",
          "imgUrl":"/images/banner1.jpg"
      },
      {
          "id":"2",
          "imgUrl":"/images/banner2.jpg"
      },
      {
          "id":"3",
          "imgUrl":"/images/banner3.jpg"
      },
      {
          "id":"4",
          "imgUrl":"/images/banner4.jpg"
      }
  ]
  ```

- 

- 建立floor.json ,  从文档粘第二个json数据

- ```js
  [{
          "id": "001",
          "name": "家用电器",
          "keywords": ["节能补贴", "4K电视", "空气净化器", "IH电饭煲", "滚筒洗衣机", "电热水器"],
          "imgUrl": "/images/floor-1-1.png",
          "navList": [{
                  "url": "#",
                  "text": "热门"
              },
              {
                  "url": "#",
                  "text": "大家电"
              },
              {
                  "url": "#",
                  "text": "生活电器"
              },
              {
                  "url": "#",
                  "text": "厨房电器"
              },
              {
                  "url": "#",
                  "text": "应季电器"
              },
              {
                  "url": "#",
                  "text": "空气/净水"
              },
              {
                  "url": "#",
                  "text": "高端电器"
              }
          ],
          "carouselList": [{
                  "id": "0011",
                  "imgUrl": "/images/floor-1-b01.png"
              },
              {
                  "id": "0012",
                  "imgUrl": "/images/floor-1-b02.png"
              },
              {
                  "id": "0013",
                  "imgUrl": "/images/floor-1-b03.png"
              }
          ],
          "recommendList": [
              "/images/floor-1-2.png",
              "/images/floor-1-3.png",
              "/images/floor-1-5.png",
              "/images/floor-1-6.png"
          ],
          "bigImg": "/images/floor-1-4.png"
      },
      {
          "id": "002",
          "name": "手机通讯",
          "keywords": ["节能补贴2", "4K电视2", "空气净化器2", "IH电饭煲2", "滚筒洗衣机2", "电热水器2"],
          "imgUrl": "/images/floor-1-1.png",
          "navList": [{
                  "url": "#",
                  "text": "热门2"
              },
              {
                  "url": "#",
                  "text": "大家电2"
              },
              {
                  "url": "#",
                  "text": "生活电器2"
              },
              {
                  "url": "#",
                  "text": "厨房电器2"
              },
              {
                  "url": "#",
                  "text": "应季电器2"
              },
              {
                  "url": "#",
                  "text": "空气/净水2"
              },
              {
                  "url": "#",
                  "text": "高端电器2"
              }
          ],
          "carouselList": [{
                  "id": "0011",
                  "imgUrl": "/images/floor-1-b01.png"
              },
              {
                  "id": "0012",
                  "imgUrl": "/images/floor-1-b02.png"
              },
              {
                  "id": "0013",
                  "imgUrl": "/images/floor-1-b03.png"
              }
          ],
          "recommendList": [
              "/images/floor-1-2.png",
              "/images/floor-1-3.png",
              "/images/floor-1-5.png",
              "/images/floor-1-6.png"
          ],
          "bigImg": "/images/floor-1-4.png"
      }
  ]
  ```

**安装mockjs**

- npm i mockjs -s 

**建mockServer.js**

- ```js
  引入mockjs
  引入banner.json
  引入floor.json
  mock.mock('/mock/banner' , {code:200,data:banner}) 
  mock.mock('/mock/floor' , {code:200,data:floor})
  //用来模拟接口的 , 往banner发请求 ,第二个参数是返回的数据 ,data是本地的数据
  在main.js里面引入@/mock/mockServer
  ```

- 在 main.js 中引入 mock 服务

- ```js
  import "@/mock/mockServer";
  ```

- 封装 mockAjax
  在 ajax 文件夹中创建 mockAjax.js 文件
  只需要将 baseURL 改为/moke,其他配置一样

- ```js
  const instance = axios.create({
    baseURL: "/mock", //配置请求基础路径
    timeout: 20000, //配置请求超时时间
  });
  ```

- 

**ajax文件夹里面建mockAjax.js** , 复制ajax , 从本地拿数据的

把/api改成/mock , 就不会往服务器发请求 , 而是往本地发请求 , 中间依赖的是配置代理vue.config.js

**api/index.js**

```js
引入mockAjax.js文件
//请求banner和floor  mock的接口请求函数
export const reqCategoryList = ()=>{
    return mockAjax({
        url:'/banner',
        method:'get'
    })
}
export const reqBannerList()=>{
    return mockAjax({
        url:'/banner',
        method:'get'
    })
}
export const reqFloorList()=>{
    return mockAjax({
        url:'/floor',
        method:'get'
    })
}

//最终暴露的是axios实例
//mock都是get请求
```

**store/home.js**

```js
const state = {
    categoryList:[],
  bannerList:[],
  floorList:[]
}
mutations
	//新增代码
    RECEIVEBANNERLIST(state,bannerList){
        state.bannerList = bannerList
    }
    RECEIVEFLOORLIST(state,floorList){
        state.floorList = floorList
    }
actions
	async getBannerList({commit}){
           const result = await reqBannerList()
        if(result.code === 200){
          commit('RECEIVEBANNERLIST',result.data)
        }
    }
	async getFloorList({commit}){
        const result = await reqFloorList()
        if(result.code === 200){
          commit('RECEIVEFLOORLIST',result.data)
        }
    }
```



**listContainer/index.vue**

```js
//引入vuex里面的mapState
mounted(){
//新增代码
this.$store.dispatch('getBannerList')}//listContainer里面就有banner的数据了

export default{
    computed:{
        ...mapState({
            bannerList:state =>state.home.bannerList
            //bannerList里面就有数据了,通过vue工具查看
        })
    }
} 

html部分,需要遍历bannerList里面的属性,设key值,img的src改为vue里面的属性名
<div class="swiper-slide"
    v-for="banner in bannerList" 
     :key="banner.id"
      >
  <img :src="banner.imgUrl" />
</div>

图片统一放在public里面的images文件夹


```

**pages/Home/index.vue**

```javascript
引入vuex里面的mapState
//没有数据,就用computed
computed:{
    ...mapState({
      floorList:state => state.home.floorList
    })
}
//一挂载到页面就触发actions函数,传getFloorList方法获取数据,方法定义在store/home
  mounted(){
    this.$store.dispatch('getFloorList')
  },
//看看vue调试Home里有没有数据
  
Floor标签遍历floorList里面的Floor, 加key ,属性传值:floor="floor"(props通信)
<Floor v-for="(floor, index) in floorList" :key="floor.id" :floor="floor"></Floor>
```

**Home/Floor/index.vue**

```js
- 接收floor数据 , 声明接收属性
- 家用电器改成{{floor.name}}
 <h3 class="fl">{{floor.name}}</h3>

- li , class="active" , 遍历floor.navList
   <li class="active" v-for="(nav, index) in floor.navList" :key="nav.text">
              <a href="#tab1" data-toggle="tab">{{nav.text}}</a>
    </li>

遍历节能补贴标签,floor.keywords里面的keyword属性,:key,内容{{keyword}},其他的li可以删掉了
 <li v-for="(keyword, index) in floor.keywords" :key="index">{{keyword}}</li>

img的src改成floor.imgUrl
<img :src="floor.imgUrl" />

"swiper-slide"类名的标签 ,遍历floor.carouselList里面的属性
<div
    class="swiper-slide"
    v-for="(carousel, index) in floor.carouselList":key="carousel.id">
        
carousel, 图片的src改成carousel.imgUrl,当成js解析
<img :src="carousel.imgUrl" />
    
center类名改src="floor.bigImg",当成js解析
<div class="split center">
              <img :src="floor.bigImg" />
</div>

所有的floor-conver-pit改src ,floor.recommendList[0]、[1]、[2],[3]当成js解析
<div class="floor-conver-pit">
                <img :src="floor.recommendList[0]" />
</div>
<div class="floor-conver-pit">
                <img :src="floor.recommendList[1]" />
</div>
<div class="floor-conver-pit">
                <img :src="floor.recommendList[2]" />
</div>
<div class="floor-conver-pit">
                <img :src="floor.recommendList[3]" />
</div>

图片放到public的图片里面 , Floor里面的images可以删了
```



## 36、mock数据的随机语法
看文档
http://mockjs.com/examples.html

## 37、mock数据的vuex编码
​	和categoryList的获取几乎一致，把mock接口当真正接口对待就好了

在 api 中添加 mock 接口的请求函数,请求模拟的 bannerList 和 floorList 数据

```js
api/index.js
import mockAjax from "@/ajax/mockAjax";
//请求banner和floor  mock的接口请求函数
export const reqBannerList = () => {
  return mockAjax({
    url: "/banner",
    method: "get",
  });
};
export const reqFloorList = () => {
  return mockAjax({
    url: "/floor",
    method: "get",
  });
};
```

在 store 中的 home.js 中创建 bannerList 和 floorList 数据以及发送请求的函数

```js
src/store
//引入请求moke接口的函数
import { reqBannerList, reqFloorList } from "@/api";
//初始化需要请求的数据
const state = {
  bannerList: [],
  floorList: [],
};
//修改数据的方法
const mutations = {
  //直接修改数据  （不允许出现if  for  异步操作）
  RECEIVEBANNERLIST(state, bannerList) {
    state.bannerList = bannerList;
  },
  RECEIVEFLOORLIST(state, floorList) {
    state.floorList = floorList;
  },
};
//发送异步请求获取数据的方法
const actions = {
  //异步请求获取数据  允许if  for  异步操作
  async getBannerList({ commit }) {
    const result = await reqBannerList();
    if (result.code === 200) {
      commit("RECEIVEBANNERLIST", result.data);
    }
  },
  async getFloorList({ commit }) {
    const result = await reqFloorList();
    if (result.code === 200) {
      commit("RECEIVEFLOORLIST", result.data);
    }
  },
};
```

在 ListContainer 组件中分发 getBannerList 事件

```js
mounted() {
    this.$store.dispatch("getBannerList");
  },
```

从 vuex 中获取 bannerList 数据

```js
computed: {
    ...mapState({
      bannerList: (state) => state.home.bannerList,
    }),
  },
```

在结构中使用动态数据

```js
<div class="swiper-slide" v-for="banner in bannerList" :key="banner.id">
  <img :src="banner.imgUrl" />
</div>
```



**src/store/home.js**

```js
actions
//新增
  async getBannerList({commit}){
     const result = await reqBannerList()
     if(result.code === 200){
       commit('RECEIVEBANNERLIST',result.data)
     }
   },
   async getFloorList({commit}){
     const result = await reqFloorList()
     if(result.code === 200){
       commit('RECEIVEFLOORLIST',result.data)
     }
   },
```

## 38、实现页面轮播
​	swiper的用法参考官方网站
​	安装 引入js和css
​	swiper必须在页面的数据结构显示完成后创建才会生效

**listContainer/index.vue**

```js
分页器就是轮播图的小圆点
引入swiper
引入swiper的css和js
import Swiper from "swiper";
import "swiper/css/swiper.css";
安装npm i swiper@5 -S

官网拿new swiper放到mounted里面,在这里实例化是不行的
  原因:轮播图的结构还没形成,mounted内部才去请求数据,mounted内部已经实例化swiper
最好是在main.js里面引入swiper/css/swiper.min.css ( search module查看)
  watch: {
    // bannerList(newVal,oldVal){

    // }

    bannerList: {
      //监视数据如果有了数据就去实例化swiper  
      //但是监视有数据实例化的时候太快了,上面的结构也不一定形成（是因为for循环）
      // watch + nextTick
      // nextTick 等待页面最近一次的更新完成，会调用它内部的回调函数
      // Vue.nextTick    vm（Vue的实例或者组件对象，就是this）.$nextTick  两个方法你开心就好，效果一样的
      handler(newVal, oldVal) {
        this.$nextTick(() => {
            //banner组件实例对象
          new Swiper(this.$refs.banner, {
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },


//监视数据如果有了数据就去实例化swiper,但是监视有数据实例化的时候太快了
//nextTick等待页面最近一次的更新完成,会调用它内部的回调函数,内部Vue.nexTick  vm.$nextTick,两个方法效果一样
```

**Floor/index.vue**

```js
引入swiper
引入swiper/css/swiper.min.css
import Swiper from "swiper";
import "swiper/css/swiper.css";
export default {
  name: "Floor",
  props: ["floor"], //声明接收属性
  mounted() {
    //1、这里直接创建Swiper实例，是可以的
    // 因为我们floor当中 轮播图结构已经形成了
    // 因为我们的floor数据不需要请求获取，而是直接在创建floor组件的时候就已经有这个数据了
    // new Swiper(this.$refs.floor2Swiper, {
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination",
    //   },
    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    // });
  },

  // watch: {

  //   // floor(){
  //   //   //只是一般监视可以简写  //深度监视必须使用麻烦写法
  //   // },

  //   floor: {
  //     //监视： 一般监视和深度监视
  //     // deep:true, //配置深度监视
  //     immediate:true, //immediate立即的意思
  //     handler(newVal, oldVal) {
  //       this.$nextTick(() => {
  //         new Swiper(this.$refs.floor2Swiper, {
  //           // 如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination",
  //           },
  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },
  //         });
  //       });
  //     },
  //   },
  // },
};
imediate是让floor生效
```

**src/components**

- 建文件夹SliderLoop,创建index.vue

```
在ListContainer使用SliderLoop组件
main.js引入SliderLoop
引入swiper
引入swiper/css/swiper.min.css

import Swiper from "swiper";
import "swiper/css/swiper.css";
export default {
  name: "",
  props:['bannerList'],
  watch: {
    // bannerList(newVal,oldVal){

    // }

    bannerList: {
      immediate: true, //immediate立即的意思
      //监视数据如果有了数据就去实例化swiper  但是
      //监视有数据实例化的时候太快了,上面的结构也不一定形成（for）
      // watch + nextTick
      // nextTick 等待页面最近一次的更新完成，会调用它内部的回调函数
      // Vue.nextTick    vm（Vue的实例或者组件对象，就是this）.$nextTick  两个方法你开心就好，效果一样的
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          new Swiper(this.$refs.banner, {
            // 如果需要分页器
            pagination: {
              el: ".swiper-pagination",
            },
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },
};

```

## 39、解决swiper影响多个页面的bug

**ListerContainer/index.vue**


	通过选择器可以指定哪个地方需要，但是不好
	通过ref最好
	//ref获取dom元素
	<div class="swiper-container" ref="banner"></div>
	使用SliderLoop组件,给SliderLoop传递bannerList数据
	<SliderLoop :bannerList="bannerList"></SliderLoop>
		静态页面是没问题的
		静态页面不需要等待数据，因此mounted完全可以去创建swiper

## 40、swiper创建的时间应该是在页面列表创建之后才会有效果

**src/pages/Home/ListContainer**

```

mounted() {
    //1、在这里实例化swiper是不行的
    // 原因: 轮播图的结构还没有形成
    //mounted内部才去请求数据，mounted内部已经实例化swiper
  
    // new Swiper(this.$refs.banner, {
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination",
    //   },
    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    // });
    this.$store.dispatch("getBannerList");
    //listContainer里面就有banner的数据了
  },
```

	现在我们的数据是动态的，mounted内部去创建，数据还没更新到界面上，因此无效
	可以使用延迟定时器去创建 但是不好



## 41、使用watch + nextTick  去解决比较好
​	Vue.nextTick 和 vm.$nextTick 效果一样
​	nextTick是在最近的更新dom之后会立即调用传入nextTick的回调函数

 **src/pages/Home/ListContainer**

```

 watch: {

  //   bannerList: {
  //     immediate:true, //immediate立即的意思
  //     //监视数据如果有了数据就去实例化swiper  但是
  //     //监视有数据实例化的时候太快了,上面的结构也不一定形成（for）
  //     // watch + nextTick
  //     // nextTick 等待页面最近一次的更新完成，会调用它内部的回调函数
  //     // Vue.nextTick    vm（Vue的实例或者组件对象，就是this）.$nextTick  两个方法你开心就好，效果一样的
  //     handler(newVal, oldVal) {
			一旦监视成功就会立即调用这个回调
  //       this.$nextTick(() => {
  //         new Swiper(this.$refs.banner, {
  //           // 如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination",
  //           },
  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },
  //         });
  //       });
  //     },
  //   },
  // },
```

## 42、动态显示Floor组件
​	数据要对应起来

**pages/Home/index.vue**

```
<Floor v-for="(floor, index) in floorList" :key="floor.id" :floor="floor"></Floor>	
引入Floor组件
注册Floor组件

```



## 43、Floor当中的轮播没效果？
​	它是根据数据循环创建组件对象的，外部的floor创建的时候
​	所以数据肯定是已经获取到了，所以我们在mounted内部去创建swiper

**pages/Home/Floor/index.vue**

```vue

mounted() {
    //1、这里直接创建Swiper实例，是可以的
    // 因为我们floor当中 轮播图结构已经形成了
    // 因为我们的floor数据不需要请求获取，而是直接在创建floor组件的时候就已经有这个数据了
    // new Swiper(this.$refs.floor2Swiper, {
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination",
    //   },
    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    // });
  },
```

## 44、定义可复用的轮播组件
​	banner是在watch当中去创建swiper 因为组件创建的时候数据不一定更新

**src/components/SliderLoop**

```js
export default {
    //新增代码
    //bannerList是0-4的变化, 既然是数据的变化 , 就可以用watch监视到
     bannerList: {
  //     immediate:true, //immediate立即的意思
  //     //监视数据如果有了数据就去实例化swiper  但是
  //     //监视有数据实例化的时候太快了,上面的结构也不一定形成（for）
  //     // watch + nextTick
  //     // nextTick 等待页面最近一次的更新完成，会调用它内部的回调函数
  //     // Vue.nextTick    vm（Vue的实例或者组件对象，就是this）.$nextTick  两个方法你开心就好，效果一样的
  //     handler(newVal, oldVal) {
  //       this.$nextTick(() => {
  //         new Swiper(this.$refs.banner, {
  //           // 如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination",
  //           },
  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },
  //         });
  //       });
  //     },
  //   },
  // },
}
```



​	**floor是在mounted当中去创建swiper，因为内部组件创建的时候，数据已经存在了**

**page/Home/Floor/index.vue**

```js
export default {
  name: "Floor",
  props: ["floor"], //声明接收属性
  mounted() {
    //1、这里直接创建Swiper实例，是可以的
    // 因为我们floor当中 轮播图结构已经形成了
    // 因为我们的floor数据不需要请求获取，而是直接在创建floor组件的时候就已经有这个数据了
    // new Swiper(this.$refs.floor2Swiper, {
    //   // 如果需要分页器
    //   pagination: {
    //     el: ".swiper-pagination",
    //   },
    //   // 如果需要前进后退按钮
    //   navigation: {
    //     nextEl: ".swiper-button-next",
    //     prevEl: ".swiper-button-prev",
    //   },
    // });
  },

  // watch: {

  //   // floor(){
  //   //   //只是一般监视可以简写  //深度监视必须使用麻烦写法
  //   // },

  //   floor: {
  //     //监视： 一般监视和深度监视
  //     // deep:true, //配置深度监视
  //     immediate:true, //immediate立即的意思
  //     handler(newVal, oldVal) {
  //       this.$nextTick(() => {
  //         new Swiper(this.$refs.floor2Swiper, {
  //           // 如果需要分页器
  //           pagination: {
  //             el: ".swiper-pagination",
  //           },
  //           // 如果需要前进后退按钮
  //           navigation: {
  //             nextEl: ".swiper-button-next",
  //             prevEl: ".swiper-button-prev",
  //           },
  //         });
  //       });
  //     },
  //   },
  // },
};
//这边是先发请求拿floorList,根据floorList遍历形成Floor组件,内部是在用轮播图,floor数据早就回来了
html部分
这段可以删了
 <div class="swiper-container" id="floor2Swiper">
                <div class="swiper-wrapper">
                  <div
                    class="swiper-slide"
                    v-for="carousel in floor.carouselList"
                    :key="carousel.id"
                  >
                    <img :src="carousel.imgUrl" />
                  </div>
                </div> -->
                <!-- 如果需要分页器 -->
                <!-- <div class="swiper-pagination"></div> -->

                <!-- 如果需要导航按钮 -->
                <!-- <div class="swiper-button-prev"></div>
                <div class="swiper-button-next"></div>
              </div>
 在new Swiper传参this.$refs.floor2swiper
```

**抽取组件**

公共组件components里面创建SliderLoop

复制ListContainer/index.vue的轮播图的html , 放到SliderLoop里面

```js
 <div class="swiper-container" ref="banner">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="banner in bannerList"
        :key="banner.id"
      >
        <img :src="banner.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
```



ListContainer/index.vue 

- class="center" 里面使用SliderLoop组件 , 传递bannerList数据
-  <SliderLoop :bannerList="bannerList"></SliderLoop>

复制ListContainer/index.vue里面的watch:{}

现在假设这个组件定义好了 , 需要全局注册  , 所以在main.js里面全局注册 SliderLoop , 定义 , 在ListContainer/index.vue已经使用了 , 所以这里就不用使用了 

现在就可以把ListContainer/index.vue 引入的注释 , watch:{}注释 , 

引入的放到SliderLoop

```js
import Swiper from "swiper";
import "swiper/css/swiper.css";
```

在ListContainer/index.vue里面SliderLoop组件传过去 ,<SliderLoop :bannerList="bannerList"></SliderLoop> 

 bannerList传给SliderLoop , SliderLoop 里面接收 ,  就可以通过遍历bannerList创建div去轮播

```vue
<div
        class="swiper-slide"
        v-for="banner in bannerList"
        :key="banner.id"
      >
        <img :src="banner.imgUrl" />
</div>
```



**Floor/index.vue** 的相关结构就可以不要了 , swiper-slide和swiper-silde类名的标签 , 只要swiper相关的都可以不要了 , watch也可以不用了 , 引入的也不要了 , 只需要使用SliderLoop标签就可以了 ,

<SliderLoop :bannerList="floor.carouselList"></SliderLoop>放在class="floorBanner"里面

 属性叫bannerList , 属性值floor.carouselList , 现在看下面小的轮播图也可以轮播



如果ListContainer/index.vue 拿"bannerList "数据就是大图的数据

如果是Floor/index.vue 拿"floor.carouselList "数据就是小图的数据了

**总结**:抽取公共组件的时候 ,第一拿html , 第二拿js , 第三, 定义,注册 ,第四 , 使用 ,拿数据

## 45、查看数据的时候应该怎么去查看
​	看组件没有数据  接着看vuex没有数据   然后看network请求状态


//到此  首页逻辑就算告一段落  下面开始就是搜索页



# day05 search搜索商品列表数据 

46、实现search与searchSelector静态组件
	searchSelector是search组件的一个子组件

pages/Search

```js
  components: {
    SearchSelector,
  },
  // 引入
   import SearchSelector from "./SearchSelector/SearchSelector";
  //使用
   <!--selector-->
    <SearchSelector />
      
```

## 47、search接口测试和编写请求函数 （参数按照文档的给定）
​	参考接口文档去做

**src/api/index.js**

```js
//searchParams,这个参数必须要有,至少得是一个没有属性的对象
//参数如果是一个空的对象,代表搜索请求获取的是全部的数据
//参数如果有搜索条件,代表获取的就是搜索条件匹配的数据
export const reqGoodsListInfo =(searchParams)=>{
	return ajax({
        url:'/list',
        method:'post',
        data:searchParams
    })
}
reqGoodsListInfo({})//空对象给了searchParams
params参数是和路径一体的 , 它也是一个对象,里面配置的是query参数
searchParams是vue组件传过来的
```

F12打开,去首页,main里面已经引入了api/index.js , 查看是否发送请求 , 如果报201 , 就是请求的参数问题 , 这里最少要传一个空对象`reqGoodsListInfo({})`

**store/建search.js** 

```js
import {reqGoodsListInfo} from '@/api'

const state = {
  goodsListInfo:{}
}
const mutations = {
  RECEIVEGOODSLISTINFO(state,goodsListInfo){
    state.goodsListInfo = goodsListInfo
  }
}
const actions = {
  //如果通过dispatch去调用的函数，接收的第一个参数是context上下文，我们传递的参数是第二个，如果我们传递的是
  //多个参数，需要使用对象传递给第二个
  // dispatch('getGoodsListInfo','aaa','bbb')
  async getGoodsListInfo({commit},searchParams){
    const result = await reqGoodsListInfo(searchParams)
    if(result.code === 200){
      commit('RECEIVEGOODSLISTINFO',result.data)
    }
  }
}
const getters = {
  attrsList(state){
    return state.goodsListInfo.attrsList || []
  },
  goodsList(state){
    return state.goodsListInfo.goodsList || []
  },
  trademarkList(state){
    return state.goodsListInfo.trademarkList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}

dispatch想要传递多个必须放在对象里面
//现在还没有发请求,在vue组件里面发
```

​                 

## 48、search模块vuex编码
​	编码和前面的类似  每写一步就测试一步

```js
src/api
//第一步发请求
export const reqGoodsListInfo =(searchParams)=>{
	return Ajax({
        url:'/list',
        method:'post',
        data:searchParams
    })
}
reqGoodsListInfo({})

//第二步拿数据
src/store/search.js
import {reqGoodsListInfo} from '@/api'

const state = {
  goodsListInfo:{}
}
const mutations = {
  RECEIVEGOODSLISTINFO(state,goodsListInfo){
    state.goodsListInfo = goodsListInfo
  }
}
const actions = {
  //如果通过dispatch去调用的函数，接收的第一个参数是context上下文，我们传递的参数是第二个，如果我们传递的是
  //多个参数，需要使用对象传递给第二个
  // dispatch('getGoodsListInfo','aaa','bbb')
  async getGoodsListInfo({commit},searchParams){
    const result = await reqGoodsListInfo(searchParams)
    if(result.code === 200){
      commit('RECEIVEGOODSLISTINFO',result.data)
    }
  }
}

//getters的用法简化searchSelector中数据的获取  mapGetters使用
const getters = {
  attrsList(state){
    return state.goodsListInfo.attrsList || []
  },
  goodsList(state){
    return state.goodsListInfo.goodsList || []
  },
  trademarkList(state){
    return state.goodsListInfo.trademarkList || []
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}

pages/Search/index.vue
//第三部触发回调获取数据
mounted() {
    //发请求
    this.getGoodsListInfo();
  },
  methods: {
    getGoodsListInfo() {
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
    },
```

## 49、搜索条件参数的理解和初始data收集参数准备
gulishop-client2进度

​	传递参数对象，至少得传递一个没有属性的对象
​	搜索参数是怎么组成的，参考文档
​	在Search组件当中data设置初始参数的对象（因为不管怎么样搜索必须要一个初始的参数，没有就没办法）

**Search/index.vue**

```js
export defalut{
   // data设置初始准备参数已经设置好了
    data(){
        return{
            searchParams:{
                //用户的初始化参数,里面放的是用户可能搜索的所有条件,只不过初始为空的
        category1Id: "",
        category2Id: "",
        category3Id: "",
        categoryName: "",
        keyword: "",
        order: "1:desc",
        pageNo: 1,
        pageSize: 5,
        props: [],
        trademark: "",
            },
        };
    },
    mounted(){
    //在mounted内部可以发送请求·
    this.getGoodsListInfo()
},
    beforeMouted(){
      this.handlerSearchParams()
  },
methods:{
	getGoodsListInfo(){
        this.$store.dispatch('getGoodsListInfo',this.searchParams)
    }
}
    //在computed内部获取我们的数据
computed:{
    ...mapGetters(['goodsList'])
}
   
//vue调试查看vuex,点击搜索到search页,看getGoodsListInfo有没有数据
    //html部分
    干掉多余的li,只留一个 , 
     class='yui3-u-1-5'遍历,goodsList是个数据
    img:src
    class='price'
    class='attr'
    //看页面显示的五个图片就是动态数据了
    //getters是为了防止a.b.c
```

## 50、search组件动态显示（先不搜索，获取数据去动态展示）

**Search/SearchSelector.vue**

- searchSelector组件内部数据动态展示

```js
export default {
    name:"SearchSelector"
        computed:{
            ...mapGetters(['attrsList','trademarkList'])
    }
    //去组件中看一下SearchSelector组件有没有数据,有了再去展示,
}
//html部分
class="logo-list" 留一个li,遍历
看search页面有没有品牌
class='type-wrap',留一个div,,遍历
//每一个Object是一个属性
//这里一定是个双层for循环,属性和属性值都要遍历
class="type-list",留一个li,遍历属性值
刷新search页面,就有8个属性对应8个属性值,search数据就算展示完成

```

**pages/Search/index.vue**

- search页面商品动态数据展示

```js
//解决search页输入搜索参数或者点击类别不会发请求的bug
//原因是因为mounted只能执行一次,因为search是一个路由组件,切换的时候才会创建和销毁
watch:{
    //一旦发生变化,路径就变了,就要发请求
    $route(){
      //把路由当中的keyword还有相关的类别名称及类别id获取到，添加到searchParams搜索条件当中
      //如果有那么搜索条件当中就有了，如果没有那就是初始化参数
      this.handlerSearchParams()
      this.getGoodsListInfo();
    }
}
methods:{
    getGoodsListInfo() {
        //发请求
      this.$store.dispatch("getGoodsListInfo", this.searchParams);
    },
    //封装函数
    handlerSearchParams() {
     //从路由当中获取categoryName和keyWord
   //把路由当中的keyword还有相关的类别名称及类别id获取到,添加searchParams搜索条件当中
      let { keyword } = this.$route.params;
      let {
        categoryName,
        category1Id,
        category2Id,
        category3Id,
      } = this.$route.query;

      let searchParams = {
        ...this.searchParams,
        keyword,
        categoryName,
        category1Id,
        category2Id,
        category3Id,
      };

      //这个参数，如果传的是空串，就没必要，剁了
      //为了节省传递数据占用的带宽，为了让后端压力减小
        //把属性名拿出来放在数组里面
      Object.keys(searchParams).forEach((item) => {
        if (searchParams[item] === "") {
          delete searchParams[item];
        }
      });

      //把我们搜索的参数数据变为当前的这个处理后的对象
      this.searchParams = searchParams;
    },
}
//看页面点击搜索或者点击分类列表测试
```



## 51、根据分类和用户点击的关键字进行搜索，解决在search组件内部再进行搜索的bug

- 用户可能从首页搜索 , 带了参数了 , 用户在搜索的时候,categoryName就有值了 , 这是初始化参数
- 用户很可能从输入框搜索 , 也可能点击类别搜索 , 在搜索页面都要把params和query拿到

**pages/Search/index.vue**

```js
真正到了搜索页面我们都要去解析拿到相关的参数  修改我们的搜索参数
	beforeMount 去同步更新data数据
	mounted     去异步发送请求

在搜索页重新输入关键字或者点击类别不会再发送请求，因为mounted只会执行一次，需要监视路由变化
srcpages/Search/index.vue
//根据类别及关键字搜索
//mounted一般用来异步发送请求,请求数据
//beforMount一般用来同步处理数据(参数)
beforeMount(){
   //重复代码,在Search/index.vue里面封装起来
    
}
//现在看搜索页,属性就没了
    
    
```

​	



## 52、动态显示和删除选中的搜索条件发送请求
​	判断参数内部是否存在categoryName  存在就显示
​	判断参数内部是否存在keyword 存在就显示
​	点击事件，如果删除就把参数对应的数据清除，顺便发送新的请求

**Search/index.vue**

```js
<li class="with-x" v-show="searchParams.categoryName">
      {{searchParams.categoryName}}
      <i @click="removeCategoryName">×</i>
</li>

<li class="with-x" v-show="searchParams.keyword">
      {{searchParams.keyword}}
      <i @click="removeKeyword">×</i>
</li>

<li class="with-x" v-show="searchParams.trademark">
              {{(searchParams.trademark ? searchParams.trademark : '').split(':')[1]}}
  <!-- {{searchParams.trademark.split(':')[1]}}  -->
              <i @click="removeTrademark">×</i>
</li>


<li class="with-x" v-for="(prop, index) in searchParams.props" :key="index">
              {{prop.split(':')[1]}}
              <i @click="removeProp(index)">×</i>
</li>
===================================================
methods:{
    //移除面包屑中的类名请求参数,相当于删除query
    removeCategoryName(){
        this.searchParams.categoryName=''
       不能直接dispatch,因为它改不了路由当中的路径 this.$route.push({name:'search',params:this.$route.params})
    },
        
    //删除面包屑当中的关键字
    removeKeyword(){
        this.searchParams.keyword='';
  //解决删除选中的搜索条件后路径不变的bug
	//上面删除发送请求我们的请求路径还是不变
	//我们需要手动去push跳转到去除对应参数的新路由      
  this.$router.replace({name:'search',query:this.$route.query})
    }
    //现在测试删除面包屑,路径是否变化
}
```





## 54、解决删除关键字后，输入框没有更新输入的bug
​	组件间通信，删除关键字后通知header组件，全局事件总线的使用

在 main.js 中创建全局事件总线

```js
new Vue({
  beforeCreate() {
    Vue.prototype.$bus = this; //配置全局事件总线
    //全局事件总线本质就是一个对象
    //满足条件
    //1、所有组件对象都可以看到这个对象(决定了这个对象必须是在Vue的原型当中)
    //2、这个对象必须能够使用$on和$emit(决定了这个对象必须是能够调用到Vue原型$on和$emit)
    //最终我们选择了vm作为时间总线是最简单的,因为本来我们就要有一个vm对象,直接拿来作为总线就好了
  },
});
```

在 Header 组件中绑定 removeKeyword 事件监听

```js
mounted() {
    // 通过全局总线绑定removeKeyword事件监听
    this.$bus.$on("removeKeyword", () => {
      this.keyword = ""; // 置空我们的搜索关键字
    });
  },
```

在 Search 组件中分发事件

```js
// 通知Header组件也删除输入的关键字
// 在Search, 通过事件总线对象来分发事件
removeKeyword(){
  this.$bus.$emit("removeKeyword");
}
```





## 55、根据品牌搜索（设置和删除）
​	给对应品牌添加点击事件
​	点击的时候需要给父组件search传递品牌的参数  参数结构参考接口文档
​	子向父通信
**SearchSelector.vue**

```js
//发请求要通知父组件发请求,点击了品牌,把这个品牌传到父组件
class="logo-list", 绑定单击事件是为了给爹传递参数,
<li 
 v-for="trademark in trademarkList" :key="trademark.tmId" @click="searchForTrademark(trademark)"
 >{{trademark.tmName}}
 </li>
//先把id和name拼好
methods:{
    searchForTradmark(trademark){
        //需要给父亲传递tradmark数据,让父亲去发请求
        //自定义事件专门子向父组件传递,父能看到儿子,给儿子绑定事件
        //哪里在触发事件($emit),哪里就是在发送数据
        this.$emit('searchForTradmark',trademark)//发送给searchForTradmark(tradmark)这个回调
    }
}

```

**Search/indx.vue**

```js

<SearchSelector @searchForTradmark='searchForTradmark' />
    //删除面包屑当中的品牌参数
 removeTrademark(){
    this.searchParams.trademark = ""
    this.getGoodsListInfo();
}
  //使用自定义事件组件通信(子向父),达到根据品牌搜索
searchForTrademark(tradmark){
    this.searchParams.trademark=`${trademark.tmId}:${trademark.tmName}`
    //发请求
    this.getGoodsListInfo()
}
```

**SearchSelector.vue**

```js


//v-if用这种写法
//{{searchParams.trademark.split()}}//假报错
//v-show就用这种写法
{{(searchParams.trademark ? searchParams.trademark: '').split(':')[1]}} 
```



## 56、根据属性搜索（设置和删除）
​	给对应的属性值添加点击事件
​	点击的时候需要给父组件search传递属性值参数  参数结构参考接口文档
​	使用组件间通信	
​	点击删除的时候从参数内部把对应的属性值参数删除，数组的方法

**SearchSelector.vue**

```js
class="type-list"/li/a
- <a href="javascript:;" @click="searchForAttrValue(attr,attrValue)">{{attrValue}}</a>

methods:{
    searchForAttrValue(attr,attrValue){
        this.$emit('searchForAttrValue',attr,attrValue)
    }
}
```

**Search/indx.vue**

```js
methods:{
    //使用自定义事件组件通信(子向父),达到根据属性值搜索
    searchForAttrValue(attr,attrValue){
        //"属性ID:属性值:属性名"
       //props里面如果有这个点击的属性值条件,就不需要再去发请求
       //只要有一个满足结果就返回true ,测试,点击属性值点击第二次不发请求,换一个属性继续发请求
        //let isTrue = this.searchParams.props.some(item=>item===`${attr.attrId}:${attrValue}:${attr.arrtName}`)
       let num = this.searchParams.props.indexOf(`${attr.attrId}:${attrValue}:${attr.arrtName}`)
       if(num !==-1) return
        //if(isTrue) return
  this.searchParams.props.push(`${attr.attrId}:${attrValue}:${attr.arrtName}`)
        //发请求
        this.getGoodsListInfo()
    },
        removeProp(index){
            //删除某一个下标的属性值
            this.searchParams.props.splice(index,1)
            //重新发请求
            this.getGoodsListInfo()
        }
}
//数组的各种方法都要用,

html部分
class"with-x"
- {{prop.split(':')[1]}}
class"with-x"/<i></i>

```



# day06 删除面包屑清空关键字 排序的图标 点击切换排序 自定义分页组件 详情页

## 57、解决在搜索页多次跳转后不能直接返回home的问题
​	查看之前书写的所有跳转路由
​	如果是搜索页往搜索页去跳转使用replace
​	如果是home页往搜索页去跳转使用push

**Header/index.vue**

```js
 toSearch(){
    if(this.$route.path !=='/home'){
        this.$router.replace(location)
    }else{
        this.$router.push(location)
    }
 }
```

**TypeNav/index.vue**

```js
toSearch(){
    if(this.$route.path !=='/home'){
        this.$router.replace(location)
    }else{
        this.$router.push(location)
    }
}
```

**Search/index.vue**

```js
removeCategoryName(){
    this.$router.replace({name:'search',params:this.$route.params})
}
```



**搜索框搜索 , 删除面包屑 , 同时删除输入框的内容**

```js
**main.js**
new Vue({
    mounted(){
        Vue.prototype.$bus = this//配置全局事件总线
    },
})

Search/index.vue
//删除面包屑当中的关键字请求参数
removeKeyword(){
    this.$bus.$emit('clearKeyword')//通知header组件把关键字清空
}

//路由组件是通过路由传参去做的
//所有的事件,只要不销毁就得解绑
Hearder/index.vue
mounted(){
    this.$bus.$on('clearKeyword',this.clearKeyword)
}
methods:{
       clearKeyword(){
      this.keyword = ''
    },
}
```



## 58、getters的用法简化searchSelector中数据的获取  mapGetters使用

```js
**stroe/search.js**
const getters = {
  attrsList(state){
    return state.goodsListInfo.attrsList || []
  },
  goodsList(state){
    return state.goodsListInfo.goodsList || []
  },
  trademarkList(state){
    return state.goodsListInfo.trademarkList || []
  }
}
```



## 59、响应式对象数据属性的添加和删除 ( 讲的源码 )

	对象当中的属性数据更改会导致页面更改，响应式数据
	
	添加：
		错的：如果对象当中没有对应的属性数据： 直接添加一个属性，这个属性不是响应式的
			因为vue只是在开始对对象当中的所有属性添加getter和setter，后期直接添加的没有
		
		对的：我们需要使用Vue.set  this.$set方法  这样的添加属性就是响应式的   必须对响应式对象添加属性
 Vue.netxTick  this.$nextTick()
有set就是响应式 , 什么时候有set方法 ? 数据劫持的时候就有

	删除：
		错的： 直接delete删除对象当中的属性，不会导致页面更改
			因为响应式属性只是在检测属性值的改变而不是检测属性的删除,改成空串就可以了,页面就可以变化  
	
		对的：我们需要使用Vue.delete方法  除了删除，还添加了更新界面的操作



## 60、排序数据的分析4种情况   
​	orderFlag:orderType

排序的类型:desc 降序 asc 升序
1 代表综合排序,2 代表价格排序
4 中排序情况 1.综合升序 2.综合降序 3.价格升序 4.价格降序

## 61、动态确定排序项和排序方式

```js
search/index.vue
哪个排序项选中并且有背景色（根据数据中的orderFlag决定active的类名）
<ul class="sui-nav">
  <li :class="{ active: searchParams.order.split(':')[0] === '1' }">
    <a href="#">综合</a>
  </li>
  <li :class="{ active: searchParams.order.split(':')[0] === '2' }">
    <a href="#">价格⬆</a>
  </li>
</ul>
```


	iconfont的使用


	图标显示在哪项什么时候显示（根据数据中的orderFlag决定）


	图标是向上还是向下（根据数据中的orderType决定）


​	点击切换排序包含排序项和排序方式
​		点击当前排序项         切换排序方式
​		点击不是当前排序项     切换排序项指定默认排序方式
​		点击排序项的时候传递自身的排序项标识数据  一个方法搞定

```js
Search/index.vue
order:'1:desc',//排序的标志 , 1代表综合排序,2代表价格排序,排序的类型:'desc'降序,'asc'升序
    //综合升序,综合降序,价格升序,价格降序,不影响做页面
    
    //1.背景色谁有,看order的数据,排序的标志是谁,1代表综合排序,2代表价格排序
 

order:'2:desc',
class=sui-nav/li,:class="{active:searchParams.order.split(':')[0] === '1'}"
    价格的li也设置:class="{active:searchParams.order.split(':')[0] === '2'}"
//2.图标的处理
	1.用什么 https://www.iconfont.cn/找up和down字体图标
          pubic/index.html
        link引入图标地址,就是在线用图标
			https://at.alicdn.com/t/font_2012379_mubm7liirxp.css
		
		图标-铅笔图标,icon/,删除/
            Search/index.vue
        价格标签,i标签
			class="iconfont"
            :class="{icondown:orderType === 'desc',iconup:orderType=== 'asc'}"
             v-if="orderFlag === '2'"
    2.图标在哪里显示
    	和上面背景色一样的,谁有背景色才有图标
		综合标签,
   <li :class="{active:orderFlag === '1'}">
          <a href="javascript:;">
            综合
            <i
              class="iconfont"
              :class="{icondown:orderType === 'desc',iconup:orderType === 'asc'}"
              v-if="orderFlag === '1'"
            ></i>
          </a>
    </li>

		价格标签也设置
    <li :class="{active:orderFlag === '2'}">
              <a href="javascript:;">
                价格
                <i
                  class="iconfont"
                  :class="{icondown:orderType === 'desc',iconup:orderType=== 'asc'}"
                  v-if="orderFlag === '2'"
                ></i>
              </a>
    </li>
    3.图标是向上还是向下
//3.点击切换排序规则
  综合标签,
@click="changeOrder('1')"
	价格标签
 @click='changeOrder('2')'
methods:{
    //综合和价格排序切换规则
    changeOrder(orderFlag){//接收1或者2
        let originOrderFlag = this.searchParams.order.split(':')[0]
        let originOrderType = this.searchParams.order.split(':')[1]
        let newOrder = '';
        if(orderFlag===originOrderFlag){
            //代表你点的还是原来排序的那个,我们只需要改变排序类型就可以了
            newOrder=`${originOrderFlag}:${originOrderType === 'desc'?'asc':'desc'}`
        }else{
            //代表点击的不是原来排序的那个,那么我们需要去改变排序的标志,类型默认就行
            newOrder=`${orderFlag}:desc`
        }
        //把新的排序规则给了搜索参数,重新发请求
        this.searchParams.order = newOrder;
        this.getGoodsListInfo()
    }
}


```

 

62、模板内部的表达式优化计算属性值

```js
Search/index.vue
computed:{
        orderFlag() {
      return this.searchParams.order.split(":")[0];
    },
    orderType() {
      return this.searchParams.order.split(":")[1];
    },
}
//设置综合标签,价格标签,优化

changeOrder(){
    //优化
    let originOrderFlag = this.orderFlag;
    let originOrderType = this.orderType;
}
//测试点击综合,价格
```



63、分页组件


64、自定义通用的分页组件

```vue
1、去课件当中获取到分页的静态组件
class="fr page"不要
components新建Pagination,新建index.vue
前台PC文档-2.16.5-通用的分页组件
直接放进来

main.js
引入Pagination
全局注册
Vue.component('Pagination',Pagination)

pages/Search/index.vue
使用Pagination标签
 <!-- 从父组件给分页组件传递的数据 -->
  <Pagination 
  :currentPageNum="searchParams.pageNo"
  :total="goodsListInfo.total"
  :pageSize="searchParams.pageSize"
  :continueSize="5"
  @changePageNum="changePageNum"
/>
          
父组件pages/Search/index.vue里面有个pageNo:1
组件间通信传的东西能少则少
	
需要计算数据
	1.总页数
	2.连续页码起始页
	

2、注册组件并渲染静态组件
3、动态组件的逻辑和功能
	3-1：思考设计 分页组件所需要的从父组件传递的数据是那些（1、当前页码  2、每页数量  3、总数  4、连续页数）  
	3-2：思考设计 分页内部需要计算的数据：总页数  连续页码的起始和结束
	3-3：在分页当中开始去计算逻辑
```






```vue
实现静态组件（模板结构样式）
	参考文档去获取

设计数据
	外部接受的
		当前页码
		每页数量
		总数
		连续页码数量   一般都是奇数个

	自己内部计算的
		总页数
		连续页码数的起始和结束（比较恶心）

		1、先判断连续页码是不是比最大的页码还要大，如果是那么start=1  end就是最大页码
		2、如果连续页码数比最大页码小
			我们让start  =   当前页码 - 连续页码/2 取整
			      end   =    当前页码 + 连续页码/2 取整
			
			     如果start 求出来比1还小  那么start修正为1 end需要+修正的偏移量
			     如果end   求出来比最大页码还大   同样end修正为最大页码   start - 修正的偏移量
			     **Search/index.vue**
//从父组件给分页组件传递的数据
<Pagination :currentPageNum = "searchParams.pageNo" 
:total="goodsListInfo.total"
:pageSize="searchParams.pageSize"
:continueSize="5"
/>
    pageSize:2,
        
    computed:{
        ...mapState({
            goosListInfo:state=>state.search.goodsListInfo
        })
    }

**Pagination/index.vue**
props:{
    currentPageNum:{
        type:Number,
        default:1
    },
        total:Number,
        pageSize:{
            type:Number,
            default:5
        }
    	continueSize:Number
},
    computed:{
        //计算总页码
        totalPageNum(){
            //向上取整
            return Math.ceil(this.total/this.pageSize)
        },
            //连续页的起始和结束页码
            startEnd(){
                let start,end,disNum
                let {currentPageNum,continueSize,totalPageNum} = this;
                if(continueSize >= totalPageNum){
                    start = 1;
                    end = totalPageNum
                }else{
                    start = currentPageNum - Math.floor(continueSize/2)
                    end = currentPageNum + Math.floor(continueSize/2)
                    if(start <= 1){
                        //dis代表要修正的值,修正左边出现的小于1的页码
                        disNum = 1-start
                        start += disNum
                        end += disNum
                    }
                    if(end >= totalPageNum){
                        //修正右边出现大于总页码的页码
                        disNum = end - totalPageNum
                        start -= disNum
                        end -= disNum
                    }
                }
                
                return {start,end}
            }
    }

<button :disabled="currentPageNum === 1" @click="$emit('changePageNum',currentPageNum - 1)">上一页</button>
<button v-if="startEnd.start > 1" @click="$emit('changePageNum',1)">1</button>
<button v-if="sartEnd.start > 2">.../button> 
    
<!-- vfor和vif可以同时出现，但是vfor优先级比vif高 -->
 <button
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      :class="{active:currentPageNum === page}"
      @click="$emit('changePageNum',page)"
    >{{page}}
</button>

<button v-if="startEnd.end < totalPageNum - 1">···</button>
    <button v-if="startEnd.end < totalPageNum" @click="$emit('changePageNum',totalPageNum)">{{totalPageNum}}</button>
    <button :disabled="currentPageNum === totalPageNum" @click="$emit('changePageNum',currentPageNum + 1)">下一页</button>


```


```js
	动态显示页码
		
		每一个button都要考虑什么时候显示  还有什么时候是选中状态 

		什么时候显示和禁止操作
			上一页：如果当前页等于1 禁止操作
			第1页： 当start大于1才会显示  
			。。。: 当start大于2
			中间的连续页： v-for遍历  然后判断 如果大于等于start才会显示   
			。。。: 当当前页小于总页数 - 1才会显示
			最后一页：当end小于最后一页，才会显示 
			下一页：如果当前页等于最后一页 禁止操作
		什么时候选中状态
			如果当前页和目前遍历的这个页码是一样的，那么就添加active类

    **Pagination/index.vue**
<div class="pagination">
    <button :disabled="currentPageNum === 1" @click="$emit('changePageNum',currentPageNum - 1)">上一页</button>
    <button v-if="startEnd.start > 1" @click="$emit('changePageNum',1)">1</button>
    <button v-if="startEnd.start > 2">···</button>

    <!-- vfor和vif可以同时出现，但是vfor优先级比vif高 -->
    <button
      v-for="page in startEnd.end"
      :key="page"
      v-if="page >= startEnd.start"
      :class="{active:currentPageNum === page}"
      @click="$emit('changePageNum',page)"
    >{{page}}</button>

    <button v-if="startEnd.end < totalPageNum - 1">···</button>
    <button v-if="startEnd.end < totalPageNum" @click="$emit('changePageNum',totalPageNum)">{{totalPageNum}}</button>
    <button :disabled="currentPageNum === totalPageNum" @click="$emit('changePageNum',currentPageNum + 1)">下一页</button>

    <button style="margin-left: 30px">共 {{total}} 条</button>
  </div>
```


​			


```vue
点击页码修改当前页码值
每个都要考虑  第一页  上一页  中间的连续页  最后一页 下一页	
更新页码父组件要去发请求
		把自身改变页码传给父组件修改参数重新发送请求
    Search/index.vue
<Pagination @changePageNum="changePageNum"/>
    
methods:{
    changePageNum(page){
        this.searchParams.pageNo = page
        this.getGoodsListInfo()
    },
}

```


```js
	父组件搜索条件更新，需要当前页码修改为1
    分页也就从1开始了，因为它是父的页码传递过去的
    相关的7个都要加,目的是改变搜索条件之后都到第一页
    **Search/index.vue**
        
     //删除面包屑当中的类名请求参数
    removeCategoryName() {
      this.searchParams.pageNo = 1
    }
    //删除面包屑当中的关键字请求参数
    removeKeyword() {
      this.searchParams.pageNo = 1
      }
	//使用自定义事件组件通信（子向父），达到根据品牌搜索
       searchForTrademark(trademark) {
      //回调函数在谁当中，谁就是接收数据的
      this.searchParams.pageNo = 1
      }
    //删除面包屑当中的品牌参数
    removeTrademark() {
      this.searchParams.pageNo = 1
    }
	//使用自定义事件组件通信（子向父），达到根据属性值搜索
    searchForAttrValue(attr, attrValue) {
	this.searchParams.pageNo = 1
    }
	 removeProp(index) {
      //删除某一个下标的属性值
      this.searchParams.pageNo = 1
     }
	//综合和价格排序切换规则
    changeOrder(orderFlag){
        this.searchParams.pageNo = 1
    }
	
```



65、详情组件
	一个一级路由组件，使用已经写好的
	商品列表页点击商品会跳转到详情页 需要携带params参数  商品id
	配置路由
	跳转过去后可能滚动条位置不对（参考router官网滚动配置） 
		注意是给路由器配置的选项

```js
Detail文件放到pages里面
router/routes.js
引入Detail
{
    path:'/detail/:skuId',//params参数
    component:Detail
}

Search/index.vue
class="p-img"
- <div class="p-img">
    <router-link :to="`/detail/${goods.id}`">
      <img :src="goods.defaultImg" />
    </router-link>
  </div>
class="attr"里面的a标签不要了
//测试搜索页能否到详情页

Vue Router官网-滚动行为
router/index.js
const router = new VueRouter({
   routes,
  //控制跳转过去之后滚动位置在哪里
  scrollBehavior (to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
//router暴露出去

store创建detail.js
import {reqGoodsDetailInfo} from '@/api'
const state = {
  goodsDetailInfo:{}
}
const mutations = {
  RECEIVEGOODSDETAILINFO(state,goodsDetailInfo){
    state.goodsDetailInfo = goodsDetailInfo
  }
}
const actions = {
  async getGoodsDetailInfo({commit},skuId){
    const result = await reqGoodsDetailInfo(skuId)
    if(result.code === 200){
      commit('RECEIVEGOODSDETAILINFO',result.data)
    }
  }
}
const getters = {
  categoryView(state){
    return state.goodsDetailInfo.categoryView || {}  
    //为什么会加个或者{} 为了防止出现Undefined,后期使用点语法报错
  },
  skuInfo(state){
    return state.goodsDetailInfo.skuInfo || {}
  },
  spuSaleAttrList(state){
    return state.goodsDetailInfo.spuSaleAttrList || []
  }
}
export default {
  state,
  mutations,
  actions,
  getters
}

src/store/index
引入detail
合并到大的store里面
modules: {
    detail
  }, //合并小的store到大的store身上
查看到详情页是否在最上面
```



66、浏览器发送ajax请求，携带属性值如果是undefined不会发送，但是如果是“”是要发送的
	如何优化，在发送请求前把空串的属性干掉，但是不能影响原来的内部属性( 不写不会影响功能 )

67、Detail组件动态显示
	ajax请求函数
	vuex管理	
	获取数据
	展示数据
		商品数据

```js
**api/index.js**
export const reqGoodsDetailInfo=(skuId)=>{
    return Ajax({
        url:`/item/${skuId}`,
        method:'get'
    })
}

**store建detail.js**
引入api
const state={
    goodsDetailInfo:{}
}
const mutations={
 RECEIVEGOODSDETAILINFO(state,goodsDetailInfo){
    state.goodsDetailInfo = goodsDetailInfo
  }
}
const actions= {
    async getGoodsDetailInfo({commit},skuId){
    const result = await reqGoodsDetailInfo(skuId)
    if(result.code === 200){
      commit('RECEIVEGOODSDETAILINFO',result.data)
    }
  }
}
const getters = {
    categoryView(state){
    return state.goodsDetailInfo.categoryView || {}  
    //为什么会加个或者{} 为了防止出现Undefined,后期使用点语法报错
  },
    skuInfo(state){
    return state.goodsDetailInfo.skuInfo || {}
  },
    spuSaleAttrList(state){
    return state.goodsDetailInfo.spuSaleAttrList || []
  }
}
//平台属性让用户搜索的,销售属性是购物的

**pages/Detail/index.vue**
mounted(){
    this.getGoodsDetailInfo()
},
methods:{
	getGoodsDetailInfo(){
        this.$store.dispatch("getGoodsDetailInfo",this.$route.params.skuId);
    },
    computed:{
        ...mapGetters(["categoryView", "skuInfo", "spuSaleAttrList"]),
    },
    components:{
        ImageList,
        Zoom
    }
}
//到search页看vuex-RECEIVEGOOSLIST-detail有没有数据

clsaa="conPoin"加3个span
<!-- 导航路径区域 -->
<div class="conPoin">
    <span>{{categoryView.category1Name}}</span>
    <span>{{categoryView.category2Name}}</span>
    <span>{{categoryView.category3Name}}</span>
</div>

class="InfoName"
<h3 class="InfoName">{{skuInfo.skuName}}</h3>

class="news"
<p class="news">{{skuInfo.skuDesc}}</p>

class="price"
<div class="price">
  <i>¥</i>
  <em>{{skuInfo.price}}</em>
  <span>降价通知</span>
</div>
//选择区域
class="choosedArea"
<div class="chooseArea">
      <div class="choosed"></div>
      <dl v-for="(spuSaleAttr, index) in spuSaleAttrList" :key="spuSaleAttr.id">
        <dt class="title">{{spuSaleAttr.saleAttrName}}</dt>
       
      </dl>
</div>

class="priceArea1"
<div class="priceArea1">
       <div class="title">价&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;格</div>
        <div class="price">
          <i>¥</i>
          <em>{{skuInfo.price}}</em>
          <span>降价通知</span>
        </div>
        <div class="remark">
          <i>累计评价</i>
          <em>65545</em>
        </div>
</div>

dd留一个,遍历,class="active"
 <dd
          changepirce="0"
          class="active"
          v-for="(spuSaleAttrValue, index) in spuSaleAttr.spuSaleAttrValueList"
          :key="spuSaleAttrValue.id"
        >{{spuSaleAttrValue.saleAttrValueName}}
</dd>
看页面的销售属性是否是三个:选择颜色/版本/套装
```



**8月18日 完成进度**

# day07 0819放大镜  销售属性 购物车 订单详情

## 点击小图同步上面的大图

```js
Detail/index.vue
交互
	图片列表的点击切换样式
	图片列表点击大图要跟着切换  组件通信index下标Detail/index.vue
computed:{
   imgList(){
      return this.skuInfo.skuImageList || []
    }
}
<Zoom :imgList="imgList"/>
<imageList :imgList="imgList"/>
        
Detail/imgeList/ImageList.vue
export defalt{
    props:['imgList'],
        data(){
        return{
            defaultIndex:0//默认的下标,带橙色的框框
        }
    }
}
class='swiper-slide'
<div class="swiper-slide" v-for="(img, index) in imgList" :key="img.id">
        <img
          :src="img.imgUrl"
          :class="{active:index === defaultIndex}"
          @click="changeDefaultIndex(index)"
        />
</div>
&:hover 注释
&.active{
    border: 2px solid #f60;
        padding: 1px;
}
//看小图是否显示,默认第一张是否有橙色框
methods:{
    changeDefaultIndex(index){
        this.defaultIndex=index;
        //看任意小图是否有橙色框
    }
}

8.19上午进度

Zoom/zoom.vue
export defalut{
    props:['imgList'],
    data(){
        return{
            defaultIndex:0//为了一上来就显示第0张图片的url
        }
    },
    computed:{
        defaultImg(){
            //动态数据尽量避免a.b.c
            return this.imgList[this.defaultIndex] || {}
        }
    }
}

class="spec-preview"/img/src
<div class="spec-preview">
    <img :src="defaultImg.imgUrl" />
    <div class="event"></div>
    <div class="big">
      <img :src="defaultImg.imgUrl" />
    </div>
    <div class="mask"></div>
</div>
现在点击可以切换,上面要同步切换,让index对应起来就可以了


**ImageList/ImageList.vue**
methods:{
    this.$bus.$emit('changeDefaultIndex", index')
}

**Zoom/zoom.vue**
methods:{
    changeDefaultIndex(index) {
      this.defaultIndex = index;
    },
},
mounted(){
    this.$bus.$on("changeDefaultIndex", this.changeDefaultIndex);
}

ImageList/ImageList.vue会通知Zoom/zoom.vue里面的index
//现在看点击小图是否同步上面的大图


```

## 点击小图列表箭头换一组图片

```js

    
	//现在处理点击imgList的箭头切换一组图片功能,看swiper文档,slides grid(网格分布)
slidesPerGroup  slidesPerView
SliderLoop里面的watch复制到ImageList.vue(万能代码)

**ImageList/ImageList.vue**
class"swiper-container"
 <div class="swiper-container" ref="imgList">
     
watch: {
    // bannerList(newVal,oldVal){
    // }
    imgList: {
      immediate: true, //immediate立即的意思
      //监视数据如果有了数据就去实例化swiper  但是
      //监视有数据实例化的时候太快了,上面的结构也不一定形成（for）
      // watch + nextTick
      // nextTick 等待页面最近一次的更新完成，会调用它内部的回调函数
      // Vue.nextTick    vm（Vue的实例或者组件对象，就是this）.$nextTick  两个方法你开心就好，效果一样的
      handler(newVal, oldVal) {
        this.$nextTick(() => {
          new Swiper(this.$refs.imgList, {
            slidesPerView : 5,
            slidesPerGroup : 5,
            // 如果需要前进后退按钮
            navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            },
          });
        });
      },
    },
  },

```

## 放大镜

```js
放大镜大图和小图拿的是同一套  全部让父组件传递过去就好了（要处理假报错的问题）
放大镜
    鼠标动  
    遮罩动
    求遮罩的位置
    设置遮罩的位置
    大图反向移动遮罩的位置2倍  
    sku就是某个商品
**Zoom/zoom.vue**
  c="event" <div class="event" @mousemove="move"></div>  
c="mask" <div class="mask" ref="mask"></div>
c="big" <img :src="defaultImg.imgUrl" ref="bigImg"/>
methods:{
    move(event){
        let bigImg = this.$refs.bigImg
        let mask = this.$refs.mask
        let mouseX = event.offsetX
        let mouseY = event.offsetY
        //拿到了鼠标位置
        let maskX = mouseX-mask.offsetWidth / 2
        let maskY = mouseY-mask.offsetWidth / 2
        
        //临界值
        if(maskX < 0){
            maskX = 0
        }else if(maskX > mask.offsetWidth){
            maskX = mask.offsetWidth
        }
        if(maskY < 0){
            maskY = 0
        }else if(maskY > mask.offsetHeight){
            maskY = mask.offsetHeight
        }
        
        mask.style.left = maskX + 'px'
        mask.style.top = maskY + 'px'
        bigImg.style.left = -2 * maskX + 'px'
      bigImg.style.top = -2 * maskY + 'px'
    }
}
****
```

## 商品销售属性


```js
Detail/index.vue
商品售卖属性的点击切换（排它）
	
	c="active",当成js解析
:class="{active:spuSaleAttrValue.isChecked === '1'}"
	- dd添加点击事件
@click="changeIsChecked(spuSaleAttr.spuSaleAttrValueList,spuSaleAttrValue)"
	
methods:{
	changeIsChecked(attrValueList, attrValue){
	//让列表当中所有的全部变白
		attrValueList.forEach(item=>{
		item.isChecked = "0";
		})
		//再让点击的变绿
		attrValue.isChecked = "1";
	}
}

//点击+ -的功能
export default{
    data(){
    return {
          skuNum: 1,
        };
    }

}

c="controls"/a
input双向数据绑定
v-model="skuNum"
+标签单击事件
@click="skuNum++"
-标签单击事件
@click="skuNum > 1? skuNum-- : skuNum = 1"
检查+ -按钮,看data/$route/skuNum数据
```

​	

## 68、添加购物车需要发送请求，跳转到添加购物车成功

```js
点击加入购物车会在当前页发请求,请求成功,跳转加入成功页面
代码/静态组件/添加购物车成功代码
pages/建AddCartSuccess文件夹/建index.vue

router/routes.js
export default[
   {
    path:'/addcartsuccess',
    component:AddCartSuccess
  },
]
引入AddCartSuccess

Detail/index.vue
使用编程式路由,不能使用声明式导航,因为我们不是直接跳到添加成功页面的,而是要先在详情页发请求给后台,后台返回成功数据后,再手动调整到添加成功页面
加入购物车标签,c="add"/a,单击事件
<div class="add">
               
    <a href="javascript:;" @click="addShopCart">加入购物车</a>
</div>
methods:{
    async addShopCart(){
        //先发请求给后台添加购物车
      //后台添加成功后返回结果
		try{
        //成功的结果
        await this.$store.dispatch("addOrUpdateCart", {
          skuId: this.skuInfo.id,
          skuNum: this.skuNum,
        });
        //根据结果决定是否跳转到添加成功页面
        alert("添加购物车成功，将自动跳转到成功页面");
        this.$router.push("/addcartsuccess?skuNum=" + this.skuNum);
        }catch{
         //失败
        alert(error.message);
        }
    }
}

api/index.js
//请求添加购物车或者修改购物车
//api文档看请求地址
export const reqAddOrUpdateCart = (skuId,skuNum) => {
    return Ajax({
        url:`/cart/addToCart/${ skuId }/${ skuNum }`,
        method:'post'
    })
}

**store建shopcart.js**
引入api里面的reqAddOrUpdateCart
const actions = {
  //异步发请求
  async addOrUpdateCart({commit},{skuId,skuNum}){
    const result = await reqAddOrUpdateCart(skuId,skuNum)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  }
}
const mutations = {}
const state = {}
const getters = {}
//暴露
	state,
    mutations,
    actions,
    getters
/store/shopcart.js要引入

Detail/index.vue
try{
    alert('添加购物车成功,将自动跳转成功页面')
}


//成功的页面也需要显示当前商品的详情,所以我们也得把商品的信息传递过去(存储方案:localStorage和sessionStorage)
 sessionStorage.setItem('SKUINFO_KEY',JSON.stringify(this.skuInfo))
//因为成功页面需要商品的数量,所以通过路由传参传递
this.$router.push("/addcartsuccess?skuNum=" + this.skuNum)
  看sessionStorage数据,很大的数据用存储方案,不要用路由传递
//点击,添加购物车完成


如何知道成功还是失败    
	1、分发的时候传过去一个回调函数作为参数
	2、使用promise 
		async和await
		async函数返回值是一个promise   而且这个promise的状态结果  由当前函数return的返回值决定
		promise状态返回：
			函数返回undefined       成功
			函数正常返回值          成功
			函数返回 成功的promise  成功
			函数返回 失败的promise  失败
			函数抛出错误            失败
	
成功之后跳转路由到添加成功组件    需要带一个query参数  skuNum 
```

## 添加购物车成功的页面

```js
Addcarsuccess/index.vue
export default{
     data(){
      return {
        skuInfo: JSON.parse(sessionStorage.getItem('SKUINFO_KEY')) || {}
      }
    }
}

c=left-pic/img
- <img :src="skuInfo.skuDefaultImg">
c=right-info/p
- <div class="right-info">
    <p class="title">{{skuInfo.skuName}}</p>
    <p class="attr">颜色：WFZ5099IH/5L钛金釜内胆 数量：{{$route.query.skuNum}}</p>
  </div>

public/css拿辉鸿老师的reset.css文件和iconfont.css

//查看商品已成功加入购物车页面

```

## 点击去购物车结算

```js
Addcarsuccess/index.vue
c=right-gocart
 <div class="right-gocart">
      <router-link class="sui-btn btn-xlarge" :to="`/detail/${skuInfo.id}`">查看商品详情</router-link>
      <router-link to="/shopcart">去购物车结算</router-link>
</div>
//加入购物车页面,去购物车结算功能
代码/静态组件/shopcart组件_静态 ,放到pages

router/routes.js
引入ShopCart
export default[
    {
        path:'/ShopCart',
        component:ShopCart
    }
]
//点击去购物车结算
```





​	添加成功组件需要用到商品信息所以跳转路由要保存商品信息  保存信息的多种方式（localStorage和sessionStorage）


​				
​	动态显示添加成功页面数据


day08

## 69、购物车shopCart静态组件

```js
ShopCart/index.vue
调整css让各个项目对齐    删除第三项  
width的百分比 
cart-list-con1 %15  
.cart-list-con2 %35  
cart-list-con4 %10 
cart-list-con5 %17 
cart-list-con6 %10 
cart-list-con7 %13
ShopCart/index.vue
c="cart-list-con3"这个类型的都删除

```



```js
api/index.js
请求购物车列表数据
export const reqShopCartList = () => {
  return Ajax({
    url:'/cart/cartList',
    method:'get'
  })
}
//对象写法
//export const reqShopCartList=()=>Ajax.get('')
```

```js
store/shopcart.js
//引入reqShopCartList
const state = {
    shopCartList:[]
}
const mutations = {
  RECEIVESHOPCARTLIST(state,shopCartList){
    state.shopCartList = shopCartList
  }
}


async getShopCartList({ commit }) {
    const result = await reqShopCartList();
    if (result.code === 200) {
      commit("RECEIVESHOPCARTLIST", result.data);
    }
  },
      
export default {
    mounted(){
        this.getShopCartList()
    },
    methods:{
        this.$store.dispatch('getShopCartList')
    }
//看vuex
}
```



## 70、购物车组件动态展示
```js
	请求数据
​		展示：
​			数据是要去请求接口的
​			请求购物车列表数据
​			写了接口请求发送也获取不到数据，因为没有身份标识
​				用户的临时id（userTempId）
​				用户没有登录前的身份标识
​				如果没有登录，用户需要查询数据，需要带上这个身份标识
​					它是一个随机的唯一的字符串标识    uuid
​				创建和保存
​					浏览器端创建，每次请求都携带上，尽量不要修改
​					应用一打开就创建保存在localStorage
​					在state当中也去保存一份，这样的话为了更快
使用
				使用请求拦截器每个请求都带上
					
			做法：
				书写工具函数去实现创建和保存uuid值
				在state当中去调用这个函数
				在ajax发送请求时候，所有请求头当中携带这个标识

		展示购物车数据（很多需要计算）
		
登录标识,注册标识
带着标识,服务器根据标识创建一个表,全都放在这个表里
需要一个东西创建唯一的标识,之前是用的Date.now()
现在用uuid,上GitHub找

store/user.js
const state = {
    //用户的临时身份标识,我们在state当中存一份
    //为了以后获取的时候,效率更高一些
    //用户的身份标识是要存储在永久保存的地方(localStorage),并且尽量不要更改
    //先去从localStorage内部去取,有就用,没有就得创建,可以使用函数
    userTempId: getUserTempId()
}
const mutations = {}
const actions = {}
const getters = {}


```

**src/建utils/建userabout.js**

```js
export function getUserTempId(){
  let userTempId = localStorage.getItem('USERTEMPID_KEY')
  if(!userTempId){
    userTempId = uuidv4(); // ⇨ '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d'
    localStorage.setItem('USERTEMPID_KEY',userTempId)
  }
  return userTempId
}

store/user.js
引入userabout.js
//vue调试工具看state数据

ajax/Ajax.js
引入store
config =>{
    let userTempId = store.state.user.userTempId
    config.headers.userTempId = userTempId  
}
//看有没有带localstorage标识
'Application'-'Local Storage'
//找到同一个userTmpId,存储数据的时候都带上标识,再请求的时候带当时存的同一个标识,就会返回同一个数据
//看vuex数据有没有返回

pages/ShopCart/index.vue
//引入vuex里面的mapState
computed:{
      ...mapState({
        shopCartList: state => state.shopcart.shopCartList
      })
    }
//到vue里面看数据

c="cart-list" v-for="(cart, index) in shopCartList" :key="cart.id"

c="cart-list-con2"/img 
<img :src="cart.imgUrl">
    
c="cart-list-con2"

c="cart-list-con6"/span
<span class="sum">{{cart.skuPrice * cart.skuNum}}</span>
```

## 总结

避免a.b.c , 所以每一个都要判断 , return this.a[b] || []

this.$bus.$emit('事件名' , 事件) ,事件绑定在$bus , 回调函数留在Zoom里面 ,用来接收数据的

data里面和computed里面的都是响应式数据 , 所以data变了 , computed也会变

放大镜 

- 先算出鼠标位置

- 鼠标的位置 - 蒙板宽度的一半
- 临界值是优化部分 , 不算代码逻辑

async是异步 , 函数返回值是promise , sync是同步 , 成功或失败看函数的return , 如果return是正常值 

- 返回的就是成功的 , return成功的promise , 
- 返回的就是成功的promise , 如果抛出的错误 , 返回的就是抛出的错误 

**加入购物车**

- 不能用声明式导航 , 因为不是立即跳转 , 所以用编程式

- 大的逻辑 : 

  - 发请求

    - api接口 ( params 真正配置的不是params , 配置的是query参数)

    - ```
      export const reqShopCartList = () => {
        return Ajax({
          url:'/cart/cartList',
          method:'get'
        })
      }
      ```

  - store

  - context就是解构commit里面的东西

  - 拿返回的结果

  - async返回的永远都不会是失败的promise

  - 只要是await 就放在try catch里面 , 用来捕获成功和失败的

  - 商品的信息存储在临时的sessionStorage里面

  - 空的sessionStorage和localStorage拿东西返回的是null

  - 包装类型

    - 包装类型是特殊的引用类型。每当读取一个基本类型值的时候，后台就会创建一个对应的基本包装类型的对象，从而可能调用一些方法来操作这些数据。包装类型共包括Boolean、Number和String三种

# day09 0820

## 单选 多选 全选 统计数量 统计价格

```js
shopcart/index.vue
交互：
		更新购物车数量数据

		更新购物车选中状态数据
	ShopCart/index.vue
	isChecked是1就要打√
	c="cart-list-con1"
		<li class="cart-list-con1">
            <input type="checkbox" name="chk_list" :checked="cart.isChecked === 1" />
          </li>

computed:{
    isCheckAll:{
        get(){
            return this.shopCartList.every(item => item.isChecked === 1)//现在全选框是否打√
        },
        set(){}
    },
        checkNum(){
            //统计选择的数量,每次拿的都是前一个pre
            return this.shopCartList.reduce((pre,item)=>{
                if(item.isChecked ===1){
                    pre += item.skuNum
                }
                return pre;
            },0)
        },
            //统计总价
        allMoney(){
            return this.shopCartList.reduce((pre,item)=>{
                if(item.isChecked ===1){
                    pre += item.skuNum *item.skuPrice
                }
                return pre;
            },0)
        }
}

c="select-all"
	 <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckAll" />
        <span>全选</span>
      </div>

c="chosed"
	<div class="chosed">
          已选择
          <span>{{checkNum}}</span>件商品
    </div>
<div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{allMoney}}</i>
</div>

总价标签
//现在看动态数据展示

//下面是交互功能,修改数量,选中状态,删除
//重新请求购物车页面才能让数量变化,重新渲染页面
//发请求传递的skuNum不是最终买的件数,关键看原来购物车有没有这件商品
//接口和添加购物车功能是同一个接口
c="cart-list-con5",- +的点击事件,鼠标失去焦点的时候,发请求,改购物车数量
<a href="javascript:void(0)" class="mins" @click="updateCartNum(cart,-1)">-</a>

//发请求更新购物车数量
<input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="updateCartNum(cart,$event.target.value*1)"
/>
 <a href="javascript:void(0)" class="plus" @click="updateCartNum(cart,1)">+</a>

methods:{
    async updateCartNum(cart, disNum) {
      //校正数量,disNUm是想改变的量
      if (cart.skuNum + disNum < 1) {
        disNum = 1 - cart.skuNum; //disNum和原来的数量加起来最少得是1,如果小于1得对disNum修正
      }

      //发请求去处理数量，返回成功后重新请求列表数据，就会看到最新的数据
      try {
        await this.$store.dispatch("addOrUpdateCart", {
          skuId: cart.skuId,
          skuNum: disNum,
          //vue调试查看skuId
        });
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },
        
}
//看点击加号netWork有没有发请求,失去焦点是否修正

//修改选中状态功能
api文档-8.切换商品选中状态
api/index.js
export const reqUpdateIsCheck = (skuId,isChecked) => {
    return Ajax({
        url:`/cart/checkCart/${skuId}/${isChecked}`,
        method:'get'
    })
}

store/shopcart.js里面引入api里面的reqUpdateIsCheck
  async updateIsCheck({commit},{skuId,isChecked}){
    const result = await reqUpdateIsCheck(skuId,isChecked)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))  //返回的是失败的promise 结果就是这个return返回的失败的promise的原因
      // return 'failed'  行 但是async函数将永远返回成功状态的promise
    }
  },

shopcart/index.vue
c="cart-list-con1" input单击事件,@click="updateOne(cart)"

async updateOne(cart){
    //发请求
    try{
         await this.$store.dispatch('updateIsCheck',{skuId:cart.skuId,isChecked:cart.isChecked === 1? 0 :1})
    //结果成功去重新请求列表页数据
        this.getShopCartList()
    }catch(error){
         alert(error.message)
    }
   
}
//现在检查单个选中状态

//全选按钮同步选中状态
shopcart/index.vue
computed:{
        isCheckAll:{
       async set(val){//最新值,要修改所有的状态,val对应的状态,val如果是true就对应1,因为isCHecked只认识数字,如果是false就对应0,默认传的是布尔值
           try {
              const result = await this.$store.dispatch('updateAllIsCheck',val?1:0)
              console.log(result)
              this.getShopCartList()
            } catch (error) {
              alert(error.message)
            } 
        }
    }
}


store/shopcart.js
async updateAllIsCheck({commit,state,dispatch},isChecked){
    let promises = [];
    state.shopCartList.forEach(item =>{
        //遍历每一个购物车,如果选中状态本身就和传递过来要修改的状态一样,就不用发请求了
        if(item.isChecked === isChecked) return
        //如果不一样,都需要发送请求,而且所有的请求都成功才算成功
        //可以从一个dispatch触发另一个dispatch
        let promise = dispatch('updateIsCheck',{skuId:item.skuId,isChecked})
                                                                       promises.push(promise)
    })
    //Promise.all()   处理多个promise的数组，如果都成功那么返回的promise才成功，结果是每个成功的promise的结果组成数组,如果失败，返回的第一个失败的promise的reason
    return Promise.all(promises)
}
//检查点击全选按钮是否生效,是否打印'ok,ok'
```

## 删除购物车数据


```js
		删除购物车数据,跟复选框功能一样
//单个删除
api/index.js
export const reqDeleteCart = (skuId)=>{
    return Ajax({
        url:`/cart/deleteCart/${skuId}`,
        method:'delete'
    })
}

store/shopcart.js
引入api里面的reqDeleteCart方法
async deleteCart({commit},skuId){
    const result =await reqDeleteCart(skuId)
    if(result.code === 200){
       return 'ok'
       }else{
         return Promise.reject(new Error('failed'))  				//返回的是失败的promise 结果就是这个return返回的失败的promise的原因
      // return 'failed'  行 但是async函数将永远返回成功状态的promise
    }
}

shopcart/index.vue
删除和移到收藏标签, @click='deleteOne(cart)'
async deleteOne(cart){
    try {
        await this.$store.dispatch("deleteCart", cart.skuId);
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
}
//检测删除一个,有一个bug,全选还是√
shopcart/index.vue
computed:{
    isCheckAll:{
    get() {
        return this.shopCartList.every((item) => item.isChecked === 1) && this.shopCartList.length > 0;
      },
    }
}
//再次测试删除所有,全选按钮的√是否取消

//下午进度

//删除多个的功能
shopcart.js
async deleteAllCheckCart({commit,state,dispatch}){
    let promises = []
    state.shopCartList.forEach(item => {
        if(item.isChecked === 0) return
        let promise = dispatch('deleteCart',item.skuId)
        promises.push(promise)
    })
    return Promise.all(promises)
}

shopcart/index.vue
删除选中的商品标签,@click="deleteAll"
async deleteAll(){
    try{
        await this.$store.dispatch('deleteAllCheckCart')
        this.getShopCartList()
    }catch(error){
        alert(error.message)
    }
}
//检测删除商品是否发请求,到这里购物车就做完了 
```

## 71、	注册：


		静态组件
		api
		store
		收集数据发送请求
		请求成功代表注册成功，那么就跳转到登录页	
购物车完成后该去创建订单了，此时登录注册就必须要搞定，因为只有登录的用户才有创建订单的可能

```js
代码/静态组件/注册&登录_静态 两个文件放到pages替换,然后有bug
login/index.vue
../../assets/建images/icons.png问题,全局搜索
pages/Home/Like/images 
测试点击登录和注册页面
icons.png拿过来统一放到assets,修改Like和ListContainer和Login里面的路径
Like和ListContainer是../../../assets/images/icons.png
Login是../../assets/images/icons.png

注册里面有登录,登录里面有注册
pages/Login/Register
登录标签,<router-link to="/login">登陆</router-link>

api文档,16.3
第一次登录的时候会有一个token,是登录后的身份标识,后台创建的,所以发请求要把token带上
userTempId是前台我们自己用uuid自己生成的

api/index.js
//请求注册 /api/user/passport/register post {mobile,password.code}
export const reqRegister = (userInfo)=>{
    return Ajax({
        url:'/user/passport/register',
        method:'post',
        data:userInfo
    })
}

store/user.js
引入api里面的reqRegister
const actions ={
    async register({commit},userInfo){
    const result = await reqRegister(userInfo)
    if(result.code === 200){
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },
}

**Register/index.vue**
完成注册按钮,@click="Register"
c="content",input,
    <input type="text" placeholder="请输入你的手机号" v-model="mobile" />
    <input type="text" placeholder="请输入验证码" v-model="code" />
    <input type="text" placeholder="请输入你的登录密码" v-model="password" />
    <input type="text" placeholder="请输入确认密码" v-model="password2" />
    
验证码
登录密码
确认密码
export default{
    data(){
        return{
            mobile:"",
            code:"",
            password:"",
            password2:""
        }
    }
    methods:{
       async register(){
            //收集参数形成对象
            let {mobile,code,password,password2} = this;
            if(mobile && code && password && password2 && password === password2){
                //初步的验证
                //dispatch相关的action把参数对象传递过去进行注册
                try{
                    await this.$store.dispatch('register',{mobile,code,password})
                    alert('注册成功,自动跳转登录页')
                    this.$router.push('/login')
                }catch(error){
                    alert(error.message)
                }
            }
        }
    }
}

验证码标签
这个写法是跨域的,依赖的是代理去解决的
<img ref="code" src="/api/user/passport/code" alt="code" @click="resetCode" />

methods:{
    resetCode(){
        this.$refs.code.src = '/api/user/passport/code'
    }
}
//测试注册功能
```





## 72、	登录：

```js
	静态组件
	api
	store
	收集数据发送请求
	请求成功后需要把用户信息保存在localStorage用于自动登录
	state的用户信息也要修改，
	state的用户信息读取先从localStorage里面去读，没有就是{},通过登录去修改
	以后每次发请求都要携带这个用户信息的token
	修改头部的用户状态信息
api/index.js
//请求登录
export const reqLogin = (userInfo)=>{
    return Ajax(){
        url:
        method:'post',
        data:userInfo
    }
}

store/user.js
const state = {
    userInfo: JSON.parse(localStorage.getItem('USERINFO_KEY')) || {},
}
const mutations = {
    RECEIVEUSERINFO(state,userInfo){
    state.userInfo = userInfo
  },
}

const actions = {
    async login({commit},userInfo){
    const result = await reqLogin(userInfo)
    if(result.code === 200){
      commit('RECEIVEUSERINFO',result.data)
      //我们要想自动登录，必须把登录后的信息存储起来，这样的话刷新页面vuex当中存储的数据就不见了
      //但是我们不用再去登录给vuex存数据，而是让vuex从存储的地方去拿
      localStorage.setItem('USERINFO_KEY',JSON.stringify(result.data))
      return 'ok'
    }else{
      return Promise.reject(new Error('failed'))
    }
  },
}


Login/index.vue
登录
邮箱/用户名/手机号 ,注意双向数据绑定
请输入密码,注意双向数据绑定

export default{
    data(){
        return{
            mobile:'',
            password:''
        }
    }
    methods:{
      async login(){
        //收集数据参数形成参数对象
        let {mobile,password} = this
        if(mobile && password){
          try {
            await this.$store.dispatch('login',{mobile,password})
            alert('恭喜登录成功')
            this.$router.push('/')
          } catch (error) {
            alert(error.message)
          }
        }
      }
    }
}
//这时候登录就做完了
登录button按钮没有规定类型,默认就是提交按钮
@click.prevent,清除默认行为
 <button class="btn" @click.prevent="login">登&nbsp;&nbsp;录</button>
登录成功看vux,userInfo

//登录成功页面显示用户名
Header/index.vue
复制p标签,v-if="$store.state,user.userInfo.name",v-else=""
```

## 自动登录


```js
自动登录：  不需要请求 就是把用户信息存储完了再次打开取出展示
想要自动登录,必须把数据保存一份
store/user.js
async login(){
    if (result.code === 200) {
      commit("RECEIVEUSERINFO", result.data);
      //我们要想自动登录，必须把登录后的信息存储起来，这样的话刷新页面vuex当中存储的数据就不见了
      //但是我们不用再去登录给vuex存数据，而是让vuex从存储的地方去拿
      localStorage.setItem("USERINFO_KEY", JSON.stringify(result.data));
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
const state = {
    userInfo:JSON.parse(localStorage.getItem('USERINFO_KEY'))||{},
}

```


​		
## 73、	退出登录：
​			
​		请求成功在store中把用户信息的数据清除（state和localStorage里面都要清除）

```js
Header/index.vue
退出登录,点击事件
methods:{
    async logout(){
      try {
        await this.$store.dispatch('logout')
        alert('退出登录成功,自动跳转到首页')
        this.$router.push('/')
      } catch (error) {
        alert(error.message)
      }
    }
}

复制一个p标签,v-if v-else判断
 <p v-if="$store.state.user.userInfo.name">
            <!-- <router-link to="/login">登录</router-link> -->
            <a href="javascript:;">{{ $store.state.user.userInfo.name }}</a>
            <!-- <router-link to="/register" class="register">免费注册</router-link> -->
            <a href="javascript:;" class="register" @click="logout">退出登录</a>
          </p>
<p v-else>
            <span>请</span>
            <router-link to="login">登录</router-link>
            <router-link class="register" to="register">免费注册</router-link>
</p>

api/indwx.js
//请求退出登录
export const reqLogout = () =>{
    return Ajax({
    url:'/user/passport/logout',
    method:'get',
  })
}

store/user.js
async reqLogout({commit}){
    cosnt result =await reqLogout()
    if(result.code===200){
        //清空localStorage当中的用户数据
        //清空state当中的userInfo数据
        localStorage.removeItem('USERINFO_KEY')
        commit('RESETUSERINFO')
        return 'ok'
    }else{
        return Promise.reject(new Error('failed'))
    }
}
cosnt mutations = {
        RESETUSERINFO(state){
        state.userInfo = {}
      }
    }
}

Header/index.vue
async logout(){
    try{
        await this.$store.dispatch('logout')
        alert('退出登录成功,自动跳转首页')
        this.$router.push('/')
    }catch(error){
        alert(error.message)
    }
}
//测试退出功能
```

## 总结:

只要是统计数据就想到reduce

Header/router标签 , to到购物车组件 , 就直接跳转到购物车

动态数据的展示就是页面在读取数据

Vue

- 静态页面
  - 拆分组件
  - 组装组件 : 定义 注册 使用
  - 渲染组件
- 动态页面
  - 动态数据的展示
    - 请求数据
    - 获取数据
    - 展示数据
  - 用户交互    



# 0821 day10

## 74、	携带token去进行后续操作

```js
userTempId和token的区别

	userTempId  未登录状态下的用户身份识别标识

	token       登录状态下的用户身份识别标识 

	两个都存在的话，后台会合并临时id对应的信息到token对应的信息上
序列化:数据库的数据序列化成JSON数据
第一次 userTempId
第二次 第一次保存的userTempId 转移到第二张表,以token为标准
token带到每次请求的请求头中

Ajax.js
config{
//把登录后的标识也添加到请求头当中
let token = store.state.user.userInfo.token
if(token){
    config.headers.token = token
    }
}
/*未登录状态添加商品到购物车,进入购物车,现在是在未登录状态加的,登录再进入购物车,无论登录前还是登录后的购物车商品都会到购物车里
登录前是userTmpId,登录后是token为标准
这是新技术,面试的时候有机会可以说说
*/
代码/静态组件/订单与支付相关组件放到pages里面
router/routes.js
配置trade的路由,并且引入
import Trade from '@/pages/Trade'
export defalut[
    {
    path:'/trade',
    component:Trade
    }
]

shopcart/index.vue
c=sumbtn router-link to="/trade"
到结算页面

api/index.js
//请求创建订单交易数据,api文档-获取订单交易页信息-10.1
/api/order/auth/trade  get
export const reqTradeInfo = ()=>{
    return ajax({
        url:'/order/auth/trade',
        method:'get'
    })
}

store/建trade.js
引入api里面的reqTradeInfo
随便复制一个文件,清空内容
const state = {
    tradeInfo:{}
}
const mutations = {
    RECEIVETRADEINFO(state,tradeInfo){
        state.tradeInfo =tradeInfo
    }
}
const actions ={
    async getTradeInfo({commit}){
        const result = await reqTradeInfo()
        if(result.code ===200){
           commit('RECEIVETRADEINFO',result.data)
           }
    }
}

//发请求
Trade/index.vue
export default{
    mounted(){
		this.getTradeInfo()
    }
    methods:{
		getTradeInfo(){
        this.$store.dispatch('getTradeInfo')
      },
          //切换默认地址
         changeDefault(address){
        this.userAddressList.forEach(item => item.isDefault = '0')
        address.isDefault = '1'
      }
    }
	computed:{
        //拿总的数据
        ...mapState({
            tradeInfo: state =>state.trade.tradeInfo})
        detailArrayList(){
            return this.tradeInfo.detailArrayList || []
        },
         userAddressList(){
            return this.tradeInfo.userAddressList || []
            } //看vue-trade组件
    }
}
//看vux数据

//展示数据
Trade/index.vue
收件人信息下面的两个div删除,v-for="address in userAddressList" :key="address.id"
c=username c=selected设置动态的

<span class="username" :class="{selected : address.isDefault === '1'}">{{address.consignee}}</span>

下面的三个span
 <p @click="changeDefault(address)">
          <span class="s1">{{address.userAddress}}</span>
          <span class="s2">{{address.phoneNum}}</span>
          <span class="s3" v-if="address.isDefault === '1'">默认地址</span>
</p>

//看页面是否展示

img :src
p标签{{goods.skuName}}
h3
有货
c=detail
<ul class="list clearFix" v-for="(goods, index) in detailArrayList" :key="goods.skuId">
          <li>
            <img :src="goods.imgUrl" alt="" style="width:100px;height:80px">
          </li>
          <li>
            <p>
              {{goods.skuName}}</p>
            <h4>7天无理由退货</h4>
          </li>
          <li>
            <h3>￥{{goods.orderPrice}}</h3>
          </li>
          <li>X{{goods.skuNum}}</li>
          <li>有货</li>
</ul>

看vue组件

买家留言标签
<textarea placeholder="建议留言前先与商家沟通确认" class="remarks-cont" v-model="message"></textarea>

data(){
    return{
        message:''
    }
}
件商品
<b><i>{{tradeInfo.totalNum}}</i>件商品，总商品金额</b>
    
应付金额
 <span>¥{{tradeInfo.totalAmount}}</span>

寄送的信息跟上面选择的信息对应的
computed:{
    defaultAddress(){
       return this.userAddressList.find(item => item.isDefault === '1')||{}
    }
}
寄送至
<span>{{defaultAddress.userAddress}}</span>
//看defaultAddress数据
收货人
<span>{{defaultAddress.consignee}}</span>
电话的span
 <span>{{defaultAddress.phoneNum}}</span>
//看页面收货人是否显示正常

//收件人 点击切换,添加点击事件,排他思想
收件人信息
v-for="(address, index) in userAddressList" 

p标签 @click="chanegDefault(address)"
methods:{
    changeDefault(address){
        this.userAddressList.forEach(item => item.isDefault = '0')
        address.isDefault = '1'
    }
}
//看下面收货人是否同步
```




登录注册完成再去做订单交易的流程

点击购物车结算会去到订单交易页面=》
点击订单交易页面提交订单=》
会去到订单支付页面 =》 
点击立即支付会弹出二维码

```js
提交订单会返回订单编号
Trade/index.vue
c=sub clearFix,添加a标签,单击事件
<a href="javascript:;" class="subBtn" @click="submitOrder">提交订单
</a>

methods:{
   async submitOrder(){
       //先收集请求需要的参数
       let tradeNo = this.tradeInfo.tradeNo
       let tradeInfo= {
           consignee: this.defaultAddress.consignee,   //用户名
            consigneeTel: this.defaultAddress.phoneNum,   //用户联系电话
            deliveryAddress: this.defaultAddress.userAddress, //用户地址
            paymentWay: "ONLINE",                    //支付方式
            orderComment: this.message,              //用户的留言
            orderDetailList: this.detailArrayList    //交易信息当中的商品详情
       }
       
        //发请求,创建订单,返回订单编号,这样做是不用vux保存数据,只要是$,就是vm上面的属性或者方法
       const result = await this.$API.reqSubmitOrder(tradeNo,tradeInfo)
        //我们携带这个订单编号然后跳转到支付页面
        if(result.code ===200){
            //返回订单编号
            
            //携带数据跳转支付页面
            alert('订单创建成功,自动跳转支付页面')
             //先到router.routes.js配置路由
 			this.$router.push('/pay?orderNo='+result.data)
           
        }else{
            alert('创建订单失败')
        }
    }
}


//vue-resource是vue的插件,专门用来发请求的
//Vue.use(vueResource),在原型中添加了http这个方法,用法跟axios完全一致


api/index.js
//请求创建提交订单(tradeNo:交易编号,在trade页面,)
tradeNoquery参数传的,得有请求体参数
orderId:订单编号
export const reqSubmitOrder = (tradeNo,tradeInfo) => {
    return Ajax({
        url:`/order/auth/submitOrder?tradeNo=${tradeNo}`,
        method:'post',
        //请求体
        data:tradeInfo
    })
}


//直接发请求
main.js
引入所有的API,所有的请求函数
import * as API from '@/api'
$API放到Vue的原型,目的并不是以它作为事件总线,因为它没法使用$on和$emit,我们只是为了让所有的组件能用这个API
 Vue.prototype.$API = API  
//测试的api不要了



//看订单页面,点击提交订单是否发请求,成功就会到支付页面
```




75、	

```js
点击购物车结算会去到订单交易页面   去到之后需要发请求获取创建订单所需要的的交易信息，完成页面展示

静态组件显示
api
store
组件发请求
获取数据
组件展示数据
完成交互

Pay/index.vue
4小时
订单编号动态生成
<em>{{$route.query.orderNo}}</em>

api/index.js
//获取支付页面的支付信息
export const reqPayInfo=(orderId)=>{
    return Ajax({
        url:`/payment/weixin/createNative/${orderId}`,
        method:'get'
    })
}

Pay/index.vue
export default{
    data(){
        return{
            payInfo:{},
             status: "",
        }
    }
    mounted(){
        this.getPayInfo()
    },
    methods:{
        async getPayInfo(){
            const result = await this.$API.reqPayInfo(this.$route.query.orderNo)//orderNo就是orderId
            if(result.code === 200){
                this.payInfo=result.data
            }
        }
    }
}
//vue-Pay组件-totalFee,显示"totalFee:0.01"就正常了
应付金额
<em class="orange money">￥{{payInfo.totalFee}}</em>

看路径中query参数
```

76、   点击创建订单页面提交订单    需要先发请求 提交订单信息   成功返回订单编号   把订单编号携带跳转路由去到订单支付页面

	在订单交易信息页面发送提交订单请求
	如果成功 路由跳转到支付页面，需要把提交订单成功的订单编号携带过去



77、   订单支付页面也需要支付信息   需要在订单支付页面根据订单编号发送请求获取支付信息，完成页面展示
	需要发请求根据订单编号，查询订单数据，展示页面

```js

```



78、  点击订单支付页面立即支付会出现一个支付二维码
	订单数据当中包含了一个codeUrl，是用来让我们生成二维码用的

	npm install --save qrcode   但是github去搜索的时候，搜索node-qrcode  用于把返回的图片地址生成二维码
	
	使用element-ui去做弹出显示  参考官网进行局部配置和打包
	
	点击立即支付
		1、我们需要根据codeUrl 使用qrcode生成要显示的微信二维码url
		2、使用element-ui的this.$alert 弹出消息框显示二维码图片，使用需要显示html的消息框
		3、弹出消息框的时候，我们需要循环定时器去查询支付状态
		4、如果支付成功，那么把支付成功的状态码保存在data当中，并且清除定时器，自动跳转到支付成功页面
		5、如果点击我已经支付成功，那么需要判断状态码是不是成功，如果成功那就关闭提示框，不成功就提示不关闭
			（需要放在messageBox的beforeClose回调当中去，判断 然后手动关闭）
		6、如果点击支付失败，那么需要提示信息 清除定时器  关闭提示框 关闭也要去手动关闭
			（需要放在messageBox的beforeClose回调当中去，判断 然后手动关闭）
		7、支付成功才能到支付成功页面，那么我们都要去花钱，所以把支付功能简化，直接点击就能跳


```js
	//看element-ui官网-MessageBox弹框
	//我们用的是HTML片段
//看组件内容
//安装element-ui -S , babel-plugin-component -D
//下载npm install --save qrcode
//下好之后就会有babel.config.js,专门的配置文件

main.js

//引入element-ui里面的messageBox(弹窗)和message(提示消息)
import { MessageBox, Message } from 'element-ui';

// 声明使用或者注册
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;

//重启项目

Pay/index.vue
引入import QRCode from "qrcode";
//点击立即支付的时候要弹出一个框,不能用router-link
a标签,@click="pay"
 <a href="javascript:;" class="btn" @click="pay">立即支付</a>

methods:{
  pay(){
      //弹出一个消息框
       this.$alert('<strong>这是 <i>HTML</i> 片段</strong>', 'HTML 片段', {
          dangerouslyUseHTMLString: true
        });
  }
}

//babel.config.js
//按需引入
module.eports=[
     "plugins": [
    [
      "component",
      {
        "libraryName": "element-ui",
        "styleLibraryName": "theme-chalk"
      }
    ]
  ]
]

//测试点击立即支付

//看官网-MessageBox弹框-Options-showClose
pay(){
      dangerouslyUseHTMLString: true,
      showClose: false,
      showCancelButton: true,
      cancelButtonText: "支付遇到问题",
      confirmButtonText: "我已成功支付",
      center: true,
}


//先生成二维码图片的路径
//vue组件里面多了一个main
//安装node-qrcode,GitHub搜索node-qrcode,
async pay(){
    //第一步.生成二维码图片
    try{
        const imgUrl = await QRCode.toDataURL(this.payInfo.codeUrl)
        console.log(imgUrl)
    }catch(error){
        //用法跟alert一样的
        this.$message.error('生成二维码失败'+error.message)
    }
}
//弹出一个消息框放到pay(){}里面
//测试立即支付是否弹出二维码
//用户支付之后,怎么知道用户支付成功了?向后台发请求要订单的支付状态,循环一直要,如果后台返回支付成功就让它自动跳到成功页面

this.$alert(
	
)//函数的返回值也是promise
    
//第三步.弹出消息同时循环的给后台发请求,获取该订单的支付状态数据,根据返回来的支付状态数据去决定要不要跳转到支付成功页面
try{
    if(!this.timer){
        this.timer=setInterval(async () => {
        //每2秒发一次请求获取支付状态信息
       const result = await this.$API.reqOrderStatus(this.payInfo.orderId)
       if(result.code === 200){
           //支付成功
           //清除定时器,跳转到支付成功页面,把当前的状态保存起来,以便用户点击我已成功支付的时候去判定
           this.status = 200//看用户点击的时候是不是200
           clearInterval(this.timer)//停止给定编号的定时器,并没有清空存储编号的变量,相当于把那个标志清除
            this.timer = null
           
           //跳转过去之后手动关闭我们的弹出消息框
           this.$msgbox.close()
           this.$router.push('/paysuccess')
           
           }
        },2000)
    }
}
    
api/index.js
//获取订单支付状态的信息
export const reqOrderStatus = (orderId) => {
    return Ajax({
        url:`/payment/weixin/queryPayStatus/${orderId}`,
        method:'get'//get请求不写,默认是get
    })
}

Pay/index.vue
try{
async pay(){
    //第二步.弹出一个消息框
     this.$alert(`<img src="${imgUrl}" />`, "请使用微信扫码支付",{
        dangerouslyUseHTMLString: true,
        showClose: false,
        showCancelButton: true,
        cancelButtonText: "支付遇到问题",
        confirmButtonText: "我已成功支付",
        center: true,
      });
    }
}
//测试支付一分钱路径有没有变/paysuccess

Pay/index.vue
try{
this.$alert(
    //第四步.点击按钮之后的处理及和第三步产生联系
	beforeClose: (action, instance, done) => {
            //关闭之前回调
            //如果不写这个回调，那么无论点击什么按钮，消息盒子都会强制关闭
            //如果写了这个回调，那么消息盒子的关闭由我们自己控制
            if (action === "confirm") {
              //真实的环境
              // if(this.status !== 200){
              //   this.$message.warning('小伙子没支付，支付后自动跳转')
              // }

              //测试环境
              clearInterval(this.timer); //clearInterval清除定时器，停止给定编号的定时器，并没有清空存储编号的变量
              this.timer = null;
              done();
              //跳转过去之后手动关闭我们的弹出消息框
              this.$router.push("/paysuccess");
            } else if (action === "cancel") {
              this.$message.warning("请联系尚硅谷前台小姐姐处理");
              clearInterval(this.timer); //clearInterval清除定时器，停止给定编号的定时器，并没有清空存储编号的变量
              this.timer = null;
              done(); //让我们手动关闭消息盒子
            }
          },
    }).then(() => {}).catch(() => {}); //函数的返回值也是promise
}
//测试"我已成功支付"是否关闭消息框,点击支付遇到问题有bug
//弹出一个消息框
this.$alert().then(() => {}).catch(() => {})//函数的返回值也是promise

router/routes.js
//配PaySuccess的路由,并且引入
import PaySuccess from '@/pages/PaySuccess'
 {
    path:'/paysuccess',
    component:PaySuccess
  },

//配center的路由并且引入
 {
    path:'/center',
    component:Center
  },
import Center from '@/pages/Center'
    
//点击查看订单到我的订单页面
```

## 总结:

1.生成二维码

2.弹出一个消息框去展示二维码图片

3.弹出消息同时循环的给后台请求,获取该订单的支付方状态数据

4.点击按钮之后的处理和第三部产生联系

![image-20200821164138808](C:\Users\zengxiaolong\AppData\Roaming\Typora\typora-user-images\image-20200821164138808.png)





79、支付成功后我们可以跳转到支付成功页面
​	静态组件

```js

```



80、在支付成功页面我们可以选择继续购物，去到首页  也可以查看订单，去到用户中心

```js

```




day 11



81、用户中心组件及子路由组件
	子路由组件拆分   我的订单和团购订单
	请求数据  在我的订单组件里面存储数据就好
	展示我的订单页面
	分页器的使用 和前面一样  把该传递的参数要传递过去  子组件点击修改页面，要通知父组件修改

```js

```



82、路由守卫的理解（参考官网去写代码）
	有特定条件才能去到相应的页面的功能  
	拦截路由，查看是否满足条件，满足的放行，不满足的处理

```js

```



83、必须登录后才能访问的多个界面使用全局守卫（交易相关、支付相关、用户中心相关） 自动跳转前面想而没到的页面

```js

```



84、只有没登录才能看到登录的界面 路由独享守卫和组件守卫

```js

```



85、只有携带了skuNum和sessionStorage内部有skuInfo数据  才能看到添加购物车成功的界面

```js

```



86、只有从购物车界面才能跳转到交易页面（创建订单）

```js

```



87、只有从交易页面（创建订单）页面才能跳转到支付页面

```js

```



88、只有从支付页面才能跳转到支付成功页面

```js

```





89、图片懒加载
	还没有加载得到目标图片时, 先显示loading图片
	在<img>进入可视范围才加载请求目标图片
	
	参考文档去写


90、路由懒加载  
	调用import函数把一次性打包的所有路由组件分开去加载  打包会打包成一个单独的文件
	访问哪一个再去加载哪一个

	(1）	当打包构建应用时，JS包会变得非常大，影响页面加载。如果我们能把不同路由对应的组件分割成不同的代码块，
		然后当路由被访问的时候才加载对应组件，这样就更加高效了
	(2)	本质就是Vue 的异步组件在路由组件上的应用
	(3)	需要使用动态import语法, 也就是import()函数
	(4)	import('模块路径'): webpack会对被引入的模块单独打包一个小文件
	(5)     当第一次访问某个路径对应的组件时，此时才会调用import函数去加载对应的js打包文件

91、验证规则插件的使用vee-validate  使用2版本  最新3版本

```js

```



92、Pagination组件使用element-ui的组件

```js

```




