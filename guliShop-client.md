# day01

## 01、脚手架创建项目

```vue
vue create '文件名'
使用默认方式创建
guliShop-client下面创建src文件夹assets , 里面用来放logo
删除helloWord文件以及相关的标签
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
新建vue.config.js(package.json的同级文件)
module.exports = {
  		lintOnSave: false,
	}
```



## 05、jsconfig.json配置别名@提示

```js
创建jsconfig.json(package.json的同级文件)

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

	引入html到vue组件 template
	引入less到vue组件 style   解决loader   只需要安装less 和 less-loader就可以了
	引入图片	
	使用less需要npm i less-loader -D

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

  - **index.js , 引入基础组件 , 使用VueRouter插件**

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

    - 需要引入vue  App.vue  router  

      - 可以用@代表src

    - new Vue , 注册注入给VUe添加路由功能并且能让每个组件内部都有两个对象可以拿到$router $route

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
  
  <style>
  
  </style>
  
  ```

  - Search/index.vue

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

  - 

## 10、配置路由在对应点击切换路由组件的位置，替换路由链接	
​	声明式导航和编程式导航

```
声明式导航(router-link)和编程式导航(push repalce)
```

11、登录注册不需要Footer,通过路由meta配置解决
	从route当中可以获取到path判断可以解决但是麻烦
	

12、路由传参相关

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



# day02



13、先来搞Home,Home的子组件静态页面实现
	费时费力  但是莫急莫慌

- Brand  Floor  Like  ListContainer  Rank  Recommend  分别给每个文件夹添加图片文件夹和index.vue

Home的静态页面就有了，接下来要去实现动态数据

14、**postman测试后台api接口，保存请求信息以便后期使用（参考接口文档）**
	**postman的基本使用方法**



15、前后台交互模块ajax模块，对axios的二次封装
	获取数据离不开ajax，所以先把ajax工具搞定

		配置基础路径和超时限制
	    const instance = axios.create({
	      baseURL: "/api", //配置基础路径
	      timeout: 20000, //配置请求超时时间
	    });
		添加进度条信息  nprogress
	//请求拦截器当中添加打开进度条的功能,config就是请求报文
	instance.interceptors.request.use((config) => {
	    NProgress.start();
	    //处理config(请求报文)
	    //添加额外的功能,使用进度条
	    return config; //返回这个config , 请求继续发送,发送的报文信息就是新的config对象
	});
	
		//返回的响应不再需要从data属性当中拿数据，而是响应就是我们要的数据
	instance.interceptors.response.use(
	  (response) => {
	    NProgress.done();
	    //3
	    //默认返回的是response,也就是我们的响应报文信息,如果要拿到数据就通过response.data去获取
	    //现在我们是在返回响应之前把响应直接改成了数据,以后拿数据就不需要.data了
	    return response.data;
	  },
	  (error) => {
	    //4
	    alert("发送请求失败:" + error.message || "未知错误");
	    //如果需要进一步处理这个错误,那么就返回一个失败的promise
	    //new Error("请求失败")就是自定义错误信息
	    // return Promise.reject(new Error("请求失败"));
	    //如果不需要再去处理这个错误,那么就返回一个pending状态的promise(目的在于终止promise链)
	    return new Promise(() => {});
	  }
	);


​	
​		统一处理请求错误, 具体请求也可以选择处理或不处理



16、所有接口的请求函数模块，我们定义一个index.js去写
	以后请求什么数据直接导入去调函数就可以
	先写请求三级分类列表数据
	测试ajax请求是否能够拿到数据

```js
//这个文件是所有的接口请求函数的文件
//每个请求接口数据都定义成一个函数,以后哪里需要请求数据,就调用对应的这个接口请求函数就好了
import Ajax from '@/ajax/Ajax'//刚才暴露出去的instance
//拿到三级列表的数据,调用这个函数就可以了
export const reqCategoryList = ()=>{
    return Ajax({
        url:'product/getBaseCategoryList',
        method:'get'
    })
}
reqCategoryList()
```



17、测试ajax请求机解决跨域问题
	
```js
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



18、可以拿到数据，但是我们得去管理我们的数据，使用vuex
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
home.js
import {reqCategoryList} from '@/api'

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
user.js
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

const state = {};
const mutations = {};
const actions = {};
const getters = {};
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



19、获取到数据后显示三级分类列表
	分析数据结构：在模板上展示数据v-for

	鼠标悬停在链接上变色，需要修改一下公共样式
	悬停在分类上背景色需要变化，修改分类组件的样式
	三级分类列表宽度比较小，右边的缝隙比较大

```js
TypeNav/index.vue
把class为item的都可以删掉了,在bo里面遍历categoryList里面的c1,写:key,
(c1代表一个一个数据)
一级分类里面的a标签改成{{c1.categoryName}}
class="fore"不正常,需要遍历,它就是二级分类,遍历c1.categoryChild里面的c2,写:key,
    dt里面的a标签插值c2.categoryName
em代表的是三级分类,留一个,再遍历c2.categoryChild里面的c3,:key
这时候左侧分类列表就能显示数据了
```



# day03



20、事件控制二 三级的显示和隐藏
	原来的是使用css去做的，咱们不用
	添加移入和移出事件（关键是数据的设计）
		移入哪一个把哪一个的index，传到回调函数，然后把currentIndex = index
		上面使用类的对象写法：item_on : currentIndex == index
		而移出事件我们需要移出全部分类的时候才会消失，因此移出事件我们需要添加在外部一个div上

21、演示快速触发事件卡顿现象

22、函数的防抖和节流讲解
	100秒触发100次
	正常：事件触发非常频繁，而且每一次的触发，回调函数都要去执行
	节流：在规定的间隔时间范围内不会重复触发回调，只有大于这个时间间隔才会触发回调，把频繁触发变为少量触发
	防抖：前面的所有的触发都被取消，最后一次执行在规定的时间之后才会，也就是说如果连续快速的触发  只会执行一次

23、优化快速触发typeNav鼠标移入和移出事件，节流lodash的throttle节流操作
	将移入事件的回调进行节流操作

```html
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



24、按需引入lodash减少打包体积
	引入的时候不要去引入整个lodash
	引入lodash/throttle ,创建throttle方法

```vue
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



26、点击某个类别（无论几级）跳转到搜索页面
	先用声明式导航替换原来的a
	需要把类别的id和类别的名字通过query参数传递

```javascript
 //解构data对象里面的categoryname,category1id,category2id,category3id
      let { categoryname, category1id, category2id, category3id } = data;
```



27、使用编程式路由导航优化声明式导航组件对象过多造成的卡顿
​	声明式导航本质上是组件对象，组件对象过多，会造成效率很慢  所以会很卡
​
28、利用事件委派提高处理事件的效率
​	每个项都添加事件，事件的回调函数很多，效率也不好
​	在共同的父级元素添加事件监听
​		问题：怎么知道点击的是不是a标签

​		因为是自定义属性

​		问题：怎么知道点击的是一级还是二级还是三级

​		

​		问题：参数怎么携带，要携带携带哪些个的参数



```js
 toSearch(event) {
      //真正触发事件的目标子元素
      let target = event.target;
      //自定义属性组成的对象
      let data = target.dataset;
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
        //点击类别的时候带的是query参数,如果原来有params参数就带上
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        //如果没有就放到路由对象上
        this.$router.push(location);
      }
    },
```



29、利用自定义属性携带动态数据
	标签的data-开头的属性，叫做自定义属性
	通过我们的标签对象.dataset跳转搜索页后

```js
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






30、搜索页的typeNav一级列表隐藏
	首先这个组件被多个页面公用
	在mounted的时候可以判断路由是不是home如果不是把isShow改为false,  只是初始显示组件的时候隐藏一级分类


	移入的时候，一级分类要显示
	再次考虑外部盒子移入和移出  首页的移入移出，不会隐藏，但是其余的会移出隐藏，因此移入和移出我们需要使用回调函数
	点击搜索类别跳转到当前搜索页面也要把一级类别隐藏

31、显示和隐藏一级列表的过渡效果添加
	首先谁要加过渡就看谁在隐藏和显示
	需要放在transition标签内部，name需要起名字
	参考官方给的过渡图
	移入的时候是有过渡的
	移出的时候立马隐藏的
	注意：高度也是变化的

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



32、优化typeNav数据ajax请求次数，改变请求的位置
	之前我们是在typeNav组件内部dispatch去发送ajax请求，这样的话
	因为typeNav是被多个页面公用的，所以每次切换到一个页面，这个组件都会重新创建  mounted都会执行
	因此有几个页面公用了这个typeNav就会执行几次ajax请求
	所以我们放到App里面就只用执行一次，因为数据一样，没必要多次请求

```js
src/components/TypeNav/index.vue
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

    const result = await reqCategoryList()
    if(result.code === 200){
      commit('RECEIVECATEGORYLIST',result.data)
    }
  }
```



33、合并分类的query参数和搜索关键字的params参数
	找到对应组件
	点击search按钮的时候，去看看有没有query参数
	点击类别选项的时候，去看看有没有params参数
	注意：我们点击搜索的时候关键字使用的是params参数
	      点击类别选项的时候我们的参数使用的是query参数

```js
components/Header/index.vue
methods
 toSearch(){}
//新增代码
    if(this.$route.query){
            location.query = this.$route.query
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




到此为止我们的类别选项列表就完成了，后面开始做ListContainer和Floor

 



# day04 模拟数据 轮播

接下来我们就要做首页的ListContainer和Floor组件

34、设计json数据的结构和值
	banners.json
	floors.json
	
35、使用mockjs来模拟数据接口（其实和ajax差不多，mock其实就是给我们的json数据指定一个url路径去做请求）
	准备json数据
	使用mockjs来模拟提供接口地址

- 在main中引入mockServer.js

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

- 

**ajax文件夹里面建mockAjax.js** , 复制ajax , 从本地拿数据的

把/api改成/mock , 就不会往服务器发请求 , 而是往本地发请求 , 中间依赖的是配置代理vue.config.js

**api/index.js**

```js
引入mockAjax.js文件
//请求banner和floor  mock的接口请求函数
export const reqCategroyList = ()=>{
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

```vue
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

```

**Home/Floor/index.vue**

```js
- 接收floor数据 , 声明接收属性
- 家用电器改成{{floor.name}}
- li , class="active" , 遍历floor.navList
遍历节能补贴标签,floor.keywords里面的keyword属性,:key,内容{{keyword}},其他的li可以删掉了
img的src改成floor.imgUrl
"swiper-slide"类名的标签 ,遍历floor.carouselList里面的属性carousel, 图片的src改成carousel.imgUrl,当成js解析
center类名改src="floor.bigImg",当成js解析
所有的floor-conver-pit改src ,floor.recommendList[0]、[1]、[2],[3]当成js解析
图片放到public的图片里面 , Floor里面的images可以删了
```



36、mock数据的随机语法
	看文档

37、mock数据的vuex编码
	和categoryList的获取几乎一致，把mock接口当真正接口对待就好了

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

38、实现页面轮播
	swiper的用法参考官方网站
	安装 引入js和css
	swiper必须在页面的数据结构显示完成后创建才会生效

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

**39、解决swiper影响多个页面的bug**

**ListerContainer/index.vue**


	通过选择器可以指定哪个地方需要，但是不好
	通过ref最好
	//ref获取dom元素
	<div class="swiper-container" ref="banner"></div>
	使用SliderLoop组件,给SliderLoop传递bannerList数据
	<SliderLoop :bannerList="bannerList"></SliderLoop>

**40、swiper创建的时间应该是在页面列表创建之后才会有效果**
	静态页面是没问题的
	静态页面不需要等待数据，因此mounted完全可以去创建swiper

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



41、使用watch + nextTick  去解决比较好	
	Vue.nextTick 和 vm.$nextTick 效果一样
	nextTick是在最近的更新dom之后会立即调用传入nextTick的回调函数

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

42、动态显示Floor组件
	数据要对应起来

**pages/Home/index.vue**

```
<Floor v-for="(floor, index) in floorList" :key="floor.id" :floor="floor"></Floor>	
引入Floor组件
注册Floor组件

```



43、Floor当中的轮播没效果？
	它是根据数据循环创建组件对象的，外部的floor创建的时候
	所以数据肯定是已经获取到了，所以我们在mounted内部去创建swiper

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

44、定义可复用的轮播组件
	banner是在watch当中去创建swiper 因为组件创建的时候数据不一定更新

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

45、查看数据的时候应该怎么去查看
	看组件没有数据  接着看vuex没有数据   然后看network请求状态


//到此  首页逻辑就算告一段落  下面开始就是搜索页



# day05	

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



47、search接口测试和编写请求函数 （参数按照文档的给定）
	参考接口文档去做

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

**store里面建search.js** 

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

48、search模块vuex编码
	编码和前面的类似  每写一步就测试一步

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



49、搜索条件参数的理解和初始data收集参数准备
	传递参数对象，至少得传递一个没有属性的对象
	搜索参数是怎么组成的，参考文档
	在Search组件当中data设置初始参数的对象（因为不管怎么样搜索必须要一个初始的参数，没有就没办法）

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

50、search组件动态显示（先不搜索，获取数据去动态展示）

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



51、根据分类和用户点击的关键字进行搜索，解决在search组件内部再进行搜索的bug

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



52、动态显示和删除选中的搜索条件发送请求
	判断参数内部是否存在categoryName  存在就显示
	判断参数内部是否存在keyword 存在就显示
	点击事件，如果删除就把参数对应的数据清除，顺便发送新的请求

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





54、解决删除关键字后，输入框没有更新输入的bug
	组件间通信，删除关键字后通知header组件，全局事件总线的使用

```js
//老师没讲
```





55、根据品牌搜索（设置和删除）
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



56、根据属性搜索（设置和删除）
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




day06

57、解决在搜索页多次跳转后不能直接返回home的问题
	查看之前书写的所有跳转路由
	如果是搜索页往搜索页去跳转使用replace
	如果是home页往搜索页去跳转使用push

**Header/index.vue**

```js
if(this.$route.path !=='/home'){
    this.$router.replace(location)
}else{
    this.$router.push(location)
}
```

**TypeNav/index.vue**

```js
if(this.$route.path !=='/home'){
    this.$router.replace(location)
}else{
    this.$router.push(location)
}
```

**Search/indx.vue**

```js
removeCategoryName(){
    this.$router.replace({name:'search',params:this.$route.params})
}
```



58、getters的用法简化searchSelector中数据的获取  mapGetters使用


59、响应式对象数据属性的添加和删除

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




​	
60、排序数据的分析4种情况   
​	orderFlag:orderType


​	

61、动态确定排序项和排序方式
	
	哪个排序项选中并且有背景色（根据数据中的orderFlag决定active的类名）


	iconfont的使用


	图标显示在哪项什么时候显示（根据数据中的orderFlag决定）


	图标是向上还是向下（根据数据中的orderType决定）


​	
​	点击切换排序包含排序项和排序方式
​		点击当前排序项         切换排序方式
​		点击不是当前排序项     切换排序项指定默认排序方式
​		点击排序项的时候传递自身的排序项标识数据  一个方法搞定



62、模板内部的表达式优化计算属性值


63、分页组件


64、自定义通用的分页组件

	1、去课件当中获取到分页的静态组件
	2、注册组件并渲染静态组件
	3、动态组件的逻辑和功能
		3-1：思考设计 分页组件所需要的从父组件传递的数据是那些（1、当前页码  2、每页数量  3、总数  4、连续页数）  
		3-2：思考设计 分页内部需要计算的数据：总页数  连续页码的起始和结束
		3-3：在分页当中开始去计算逻辑








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
			连续页码的起始和结束（比较恶心）
	
			1、先判断连续页码是不是比最大的页码还要大，如果是那么start=1  end就是最大页码
			2、如果连续页码比最大页码小
				我们让start  =   当前页码 - 连续页码/2 取整
				      end   =    当前页码 + 连续页码/2 取整
				
				     如果start 求出来比1还小  那么start修正为1 end需要+修正的偏移量
				     如果end   求出来比最大页码还大   同样end修正为最大页码   start - 修正的偏移量


		动态显示页码
			
			每一个button都要考虑什么时候显示  还有什么时候是选中状态 
	
			什么时候显示和禁止操作
				上一页：如果当前页等于1 禁止操作
				第1页： 当start大于1才会显示  
				。。。: 当start大于等于2
				中间的连续页： v-for遍历  然后判断 如果大于等于start才会显示   
				。。。: 当当前页小于总页数 - 1才会显示
				最后一页：当end小于最后一页，才会显示 
				下一页：如果当前页等于最后一页 禁止操作
			什么时候选中状态
				如果当前页和目前这个页码是一样的，那么就添加active类


​			
​		
​		点击页码修改当前页码值
​			每个都要考虑  第一页  上一页  中间的连续页  最后一页 下一页


		更新页码父组件要去发请求
			把自身改变页码传给父组件修改参数重新发送请求


		父组件搜索条件更新，需要当前页码修改为1
			分页也就从1开始了，因为它是父的页码传递过去的



day07


65、详情组件
	一个一级路由组件，使用已经写好的
	商品列表页点击商品会跳转到详情页 需要携带params参数  商品id
	配置路由
	跳转过去后可能滚动条位置不对（参考router官网滚动配置） 
		注意是给路由器配置的选项




66、浏览器发送ajax请求，携带属性值如果是undefined不会发送，但是如果是“”是要发送的
	如何优化，在发送请求前把空串的属性干掉，但是不能影响原来的内部属性




67、Detail组件动态显示
	ajax请求函数
	vuex管理	
	获取数据
	展示数据
		商品数据  
		放大镜大图和小图拿的是同一套  全部让父组件传递过去就好了（要处理假报错的问题）
		
	交互
		图片列表的点击切换样式
		图片列表点击大图要跟着切换  组件通信index下标
		
		放大镜
			鼠标动  
			遮罩动
			求遮罩的位置
			设置遮罩的位置
			大图反向移动遮罩的位置2倍  


		商品售卖属性的点击切换（排它）


​			
​	

68、添加购物车需要发送请求，跳转到添加购物车成功

	如何知道成功还是失败    
		1、分发的时候传过去一个回调函数作为参数
		2、使用promise 
			async和await
			async函数返回值是一个promise   而且这个promise的状态结果  由当前函数返回值决定
			promise状态返回：
				函数返回undefined       成功
				函数正常返回值          成功
				函数返回 成功的promise  成功
				函数返回 失败的promise  失败
				函数抛出错误            失败
		
	成功之后跳转路由到添加成功组件    需要带一个query参数  skuNum 


​	
​	添加成功组件需要用到商品信息所以跳转路由要保存商品信息  保存信息的多种方式（localStorage和sessionStorage）


​				
​	动态显示添加成功页面数据


day08


69、购物车shopCart静态组件

	调整css让各个项目对齐    删除第三项   15  35  10 17 10 13


​	
70、购物车组件动态展示
​	请求数据
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





		交互：
			更新购物车数量数据
	
			更新购物车选中状态数据



Promise.all()  处理多个promise的数组，如果都成功那么返回的promise才成功，结果是每个成功的结果数组
				       如果失败，返回的失败的promise的reason






			删除购物车数据


​							

购物车完成后该去创建订单了，此时登录注册就必须要搞定，因为只有登录的用户才有创建订单的可能


day 09			
	
71、	注册：
		静态组件
		api
		store
		收集数据发送请求
		请求成功代表注册成功，那么就跳转到登录页	
	
		
72、	登录：
		
		静态组件
		api
		store
		收集数据发送请求
		请求成功后需要把用户信息保存在localStorage用于自动登录
		state的用户信息也要修改，
		state的用户信息读取先从localStorage里面去读，没有就是{},通过登录去修改
		以后每次发请求都要携带这个用户信息的token
		修改头部的用户状态信息


	自动登录：  不需要请求 就是把用户信息存储完了再次打开取出展示


​		
73、	退出登录：
​			
​		请求成功在store中把用户信息的数据清除（state和localStorage里面都要清除）



74、	携带token去进行后续操作

	userTempId和token的区别
	
		userTempId  未登录状态下的用户身份识别标识
	
		token       登录状态下的用户身份识别标识 
	
		两个都存在的话，后台会合并临时id对应的信息到token对应的信息上





day10


登录注册完成再去做订单交易的流程

点击购物车结算会去到订单交易页面=》
点击订单交易页面提交订单=》
会去到订单支付页面 =》 
点击立即支付会弹出二维码




75、	

	点击购物车结算会去到订单交易页面   去到之后需要发请求获取创建订单所需要的的交易信息，完成页面展示
	
	静态组件显示
	api
	store
	组件发请求
	获取数据
	组件展示数据
	完成交互


76、   点击创建订单页面提交订单    需要先发请求 提交订单信息   成功返回订单编号   把订单编号携带跳转路由去到订单支付页面

	在订单交易信息页面发送提交订单请求
	如果成功 路由跳转到支付页面，需要把提交订单成功的订单编号携带过去



77、   订单支付页面也需要支付信息   需要在订单支付页面根据订单编号发送请求获取支付信息，完成页面展示
	需要发请求根据订单编号，查询订单数据，展示页面



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


​	
79、支付成功后我们可以跳转到支付成功页面
​	静态组件


80、在支付成功页面我们可以选择继续购物，去到首页  也可以查看订单，去到用户中心




day 11



81、用户中心组件及子路由组件
	子路由组件拆分   我的订单和团购订单
	请求数据  在我的订单组件里面存储数据就好
	展示我的订单页面
	分页器的使用 和前面一样  把该传递的参数要传递过去  子组件点击修改页面，要通知父组件修改




82、路由守卫的理解（参考官网去写代码）
	有特定条件才能去到相应的页面的功能  
	拦截路由，查看是否满足条件，满足的放行，不满足的处理


83、必须登录后才能访问的多个界面使用全局守卫（交易相关、支付相关、用户中心相关） 自动跳转前面想而没到的页面
	

84、只有没登录才能看到登录的界面 路由独享守卫和组件守卫


85、只有携带了skuNum和sessionStorage内部有skuInfo数据  才能看到添加购物车成功的界面


86、只有从购物车界面才能跳转到交易页面（创建订单）


87、只有从交易页面（创建订单）页面才能跳转到支付页面


88、只有从支付页面才能跳转到支付成功页面





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


92、Pagination组件使用element-ui的组件
	


