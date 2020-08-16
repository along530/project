//这个文件是所有的接口请求函数的文件
//每个请求接口数据都定义成一个函数,以后哪里需要请求数据,就调用对应的这个接口请求函数就好了
import Ajax from '@/ajax/Ajax'//刚才暴露出去的instance
import mockAjax from '@/ajax/mockAjax'

//拿到三级列表的数据,调用这个函数就可以了
export const reqCategoryList = ()=>{
    return Ajax({
        url:'/product/getBaseCategoryList',
        method:'get'
    })
}
export const reqBannerList = ()=>{
    return mockAjax({
        url:'/banner',
        method:'get'
    })
}
export const reqFloorList = ()=>{
    return mockAjax({
        url:'/floor',
        method:'get'
    })
}
// reqCategoryList()