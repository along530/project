import reqAddOrUpdateCart from '@/api'
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
export default {
    state,
    mutations,
    actions,
    getters
}