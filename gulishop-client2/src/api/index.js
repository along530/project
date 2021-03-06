//这个文件是所有的接口请求函数的文件
//每一个请求接口数据功能都给它定义成一个函数，以后哪里需要去请求数据，就调用对应的这个接口请求函数就好了
import Ajax from '@/ajax/Ajax'  //刚才暴露出去的instance
import mockAjax from '@/ajax/mockAjax'

// 路径/api/product/getBaseCategoryList    
// 请求方式：GET
// 请求参数：无
export const reqCategoryList = () => {
  return Ajax({
    url:'/product/getBaseCategoryList',
    method:'get'
  })
}
// reqCategoryList()

//请求banner和floor  mock的接口请求函数
export const reqBannerList = () => {
  return mockAjax({
    url:'/banner',
    method:'get'
  })
}

export const reqFloorList = () => {
  return mockAjax({
    url:'/floor',
    method:'get'
  })
}

//searchParams,这个参数必须要有,至少得是一个没有属性的对象
//参数如果是一个空的对象,代表搜索请求获取的是全部的数据
//参数如果有搜索条件,代表获取的就是搜索条件匹配的数据
export const reqGoodsListInfo =(searchParams)=>{
	return Ajax({
        url:'/list',
        method:'post',
        data:searchParams
    })
}
reqGoodsListInfo({})
//空对象给了searchParams



