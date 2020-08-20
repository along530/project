import {getUserTempId} from '@/utils/userabout'
//保存数据状态
const state = {
  //用户的临时身份标识,我们在state当中存一份
    //为了以后获取的时候,效率更高一些
    //用户的身份标识是要存储在永久保存的地方(localStorage),并且尽量不要更改
    //先去从localStorage内部去取,有就用,没有就得创建,可以使用函数
    userTempId:getUserTempId()
};
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
