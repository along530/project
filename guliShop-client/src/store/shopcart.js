import {
  reqAddOrUpdateCart,
  reqShopCartList,
  reqUpdateIsCheck,
  reqDeleteCart,
} from "@/api";
const state = {
  shopCartList: [],
};
const mutations = {
  RECEIVESHOPCARTLIST(state, shopCartList) {
    state.shopCartList = shopCartList;
  },
};
const actions = {
  //异步发请求
  async addOrUpdateCart({ commit }, { skuId, skuNum }) {
    const result = await reqAddOrUpdateCart(skuId, skuNum);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed"));
    }
  },

  async getShopCartList({ commit }) {
    const result = await reqShopCartList();
    if (result.code === 200) {
      commit("RECEIVESHOPCARTLIST", result.data);
    }
  },
  async updateIsCheck({ commit }, { skuId, isChecked }) {
    const result = await reqUpdateIsCheck(skuId, isChecked);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed")); //返回的是失败的promise 结果就是这个return返回的失败的promise的原因
      // return 'failed'  行 但是async函数将永远返回成功状态的promise
    }
  },
  async updateAllIsCheck({ commit, state, dispatch }, isChecked) {
    let promises = [];
    state.shopCartList.forEach((item) => {
      //遍历每一个购物车,如果选中状态本身就和传递过来要修改的状态一样,就不用发请求了
      if (item.isChecked === isChecked) return;
      //如果不一样,都需要发送请求,而且所有的请求都成功才算成功
      //可以从一个dispatch触发另一个dispatch
      let promise = dispatch("updateIsCheck", { skuId: item.skuId, isChecked });
      promises.push(promise);
    });
    //Promise.all()   处理多个promise的数组，如果都成功那么返回的promise才成功，结果是每个成功的promise的结果组成数组,如果失败，返回的第一个失败的promise的reason
    return Promise.all(promises);
  },
  async deleteCart({ commit }, skuId) {
    const result = await reqDeleteCart(skuId);
    if (result.code === 200) {
      return "ok";
    } else {
      return Promise.reject(new Error("failed")); //返回的是失败的promise 结果就是这个return返回的失败的promise的原因
      // return 'failed'  行 但是async函数将永远返回成功状态的promise
    }
  },
  async deleteAllCheckCart({ commit, state, dispatch }) {
    let promises = [];
    state.shopCartList.forEach((item) => {
      if (item.isChecked === 0) return;
      let promise = dispatch("deleteCart", item.skuId);
      promises.push(promise);
    });
    return Promise.all(promises);
  },
};

const getters = {};
export default {
  state,
  mutations,
  actions,
  getters,
};
