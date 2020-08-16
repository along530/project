<template>
    <div>
        <!-- Search<br>
        params参数:{{$route.params.keyword}}
        params参数简便获取:{{keyword}}
        query参数:{{$route.query.keyword}}
        query参数简便获取:{{keyword2}} -->
        <TypeNav></TypeNav>
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