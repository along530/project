import {reqCategoryList,reqBannerList,reqFloorList} from '@/api'
//初始化分类列表数据 
const state = {
  categoryList:[],
  bannerList:[],
  floorList:[]
}
//修改数据的方法
const mutations = {
  //直接修改数据  （不允许出现if  for  异步操作）
  RECEIVECATEGORYLIST(state,categoryList){
    state.categoryList = categoryList
  },
  RECEIVEBANNERLIST(state,bannerList){
    state.bannerList = bannerList
  },
  RECEIVEFLOORLIST(state,floorList){
    state.floorList = floorList
  },
}
//发送异步请求获取数据的方法
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
  },

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
  getters
}
