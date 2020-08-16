<template>
  <div>
   <TypeNav />
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like />
    <Floor 
    v-for="floor in floorList"
    :key="floor.id"
    :floor="floor"
    />
    <Brand />
  </div>
</template>

<script>
import ListContainer from "./ListContainer";
import Recommend from "./Recommend";
import Rank from './Rank'
import Like from './Like'
import Floor from './Floor'
import Brand from './Brand'
import {mapState} from 'vuex'

export default {
  name: "Home",
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand
  },
  //一挂载到页面就触发actions函数,传getFloorList方法获取数据
  mounted(){
    this.$store.dispatch('getFloorList')
  },
  //没有拿到数据,所有用计算属性
  computed:{
    ...mapState({
      floorList:state => state.home.floorList
    })
  },
};
</script>

<style lang="less" scoped></style>
