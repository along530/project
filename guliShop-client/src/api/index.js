//这个文件是所有的接口请求函数的文件
//每个请求接口数据都定义成一个函数,以后哪里需要请求数据,就调用对应的这个接口请求函数就好了
import Ajax from "@/ajax/Ajax"; //刚才暴露出去的instance
import mockAjax from "@/ajax/mockAjax";

//拿到三级列表的数据,调用这个函数就可以了
export const reqCategoryList = () => {
  return Ajax({
    url: "/product/getBaseCategoryList",
    method: "get",
  });
};
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
export const reqGoodsDetailInfo = (skuId) => {
  return Ajax({
    url: `/item/${skuId}`,
    method: "get",
  });
};

//请求添加或者修改购物车（或者修改购物车数量）
export const reqAddOrUpdateCart = (skuId, skuNum) => {
  return Ajax({
    url: `/cart/addToCart/${skuId}/${skuNum}`,
    method: "post",
  });
};

//searchParams,这个参数必须要有,至少得是一个没有属性的对象
//参数如果是一个空的对象,代表搜索请求获取的是全部的数据
//参数如果有搜索条件,代表获取的就是搜索条件匹配的数据
export const reqGoodsListInfo = (searchParams) => {
  return Ajax({
    url: "/list",
    method: "post",
    data: searchParams,
  });
};
reqGoodsListInfo({}); //空对象给了searchParams
// reqCategoryList()
export const reqShopCartList = () => {
  return Ajax({
    url: "/cart/cartList",
    method: "get",
  });
};

export const reqUpdateIsCheck = (skuId, isChecked) => {
  return Ajax({
    url: `/cart/checkCart/${skuId}/${isChecked}`,
    method: "get",
  });
};
//删除购物车请求函数
export const reqDeleteCart = (skuId) => {
  return Ajax({
    url: `/cart/deleteCart/${skuId}`,
    method: "delete",
  });
};
//请求注册 /api/user/passport/register post {mobile,password.code}
export const reqRegister = (userInfo) => {
  return Ajax({
    url: "/user/passport/register",
    method: "post",
    data: userInfo,
  });
};
export const reqLogin = (userInfo) => {
  return Ajax({
    url: "/user/passport/login",
    method: "post",
    data: userInfo,
  });
};
export const reqLogout = () => {
  return Ajax({
    url: "/user/passport/logout",
    method: "get",
  });
};
export const reqTradeInfo = () => {
  return Ajax({
    url: "/order/auth/trade",
    method: "get",
  });
};
export const reqSubmitOrder = (tradeNo, tradeInfo) => {
  return Ajax({
    url: `/order/auth/submitOrder?tradeNo=${tradeNo}`,
    method: "post",
    //请求体
    data: tradeInfo,
  });
};

//获取支付页面的支付信息
export const reqPayInfo = (orderId) => {
  return Ajax({
    url: `/payment/weixin/createNative/${orderId}`,
    method: "get",
  });
};
//获取订单支付状态的信息
export const reqOrderStatus = (orderId) => {
  return Ajax({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get", //get请求不写,默认是get
  });
};
//获取订单支付状态的信息
export const reqOrderStatus = (orderId) => {
  return Ajax({
    url: `/payment/weixin/queryPayStatus/${orderId}`,
    method: "get", //get请求不写,默认是get
  });
};
