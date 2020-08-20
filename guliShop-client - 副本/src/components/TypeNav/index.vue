<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container" @click="toSearch">
      <div @mouseleave="moveOutDiv" @mouseenter="moveInDiv">
        <h2 class="all">全部商品分类</h2>
        <div class="sort" v-show="isShow">
          <div class="all-sort-list2">
            <div
              @mouseenter="moveIn(index)"
              class="item"
              :class="{item_on:currentIndex === index}"
              v-for="(c1,index) in categoryList"
              :key="c1.categoryId"
            >
              <h3>
                <a
                  href="javascript:;"
                  :data-categoryName="c1.categoryName"
                  :data-category1Id="c1.categoryId"
                >{{ c1.categoryName }}</a>
              </h3>
              <div class="item-list clearfix">
                <div class="subitem">
                  <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                    <dt>
                      <a
                        href="javascript:;"
                        :data-categoryName="c2.categoryName"
                        :data-category2Id="c2.categoryId"
                      >{{ c2.categoryName }}</a>
                    </dt>
                    <dd>
                      <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                        <a
                          href="javascript:;"
                          :data-categoryName="c3.categoryName"
                          :data-category3Id="c3.categoryId"
                        >{{ c3.categoryName }}</a>
                      </em>
                    </dd>
                  </dl>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav class="nav">
        <a href="###">服装城</a>
        <a href="###">美妆馆</a>
        <a href="###">尚品汇超市</a>
        <a href="###">全球购</a>
        <a href="###">闪购</a>
        <a href="###">团购</a>
        <a href="###">有趣</a>
        <a href="###">秒杀</a>
      </nav>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import throttle from "lodash/throttle";
export default {
  name: "TypeNav",
  data() {
    return {
      //当前移入项的下标  初始值 -1  移入某一项，就把这个值改为移入的这项的下标
      currentIndex: -1,
      isShow: true,
    };
  },
  mounted() {
    if (this.$route.path !== "/home") {
      this.isShow = false;
    }
  },

  methods: {
    // getCategoryList() {
    //   this.$store.dispatch("getCategoryList");
    // },
    moveIn: throttle(
      function (index) {
        console.log(index);
        this.currentIndex = index;
      },
      30,
      { trailing: false } //开始的时候触发
    ),

    //点击类别事件回调
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
        //到了这query参数就收集完了,赋值给location的query属性
        location.query = query;
        //点击类别的时候带的是query参数,如果原来有params参数就带上
        if (this.$route.params) {
          location.params = this.$route.params;
        }
        //如果没有就把location对象放到路由对象上
        this.$router.push(location);
      }
      if (this.$route.path !== "/home") {
        this.$router.replace(location);
      } else {
        this.$router.push(location);
      }
    },
    //移入外部的div显示的三级分类列表
    moveInDiv() {
      //默认显示
      this.isShow = true;
    },
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
  },
  computed: {
    // ...mapState(['categoryList']) //错的  之前是对的
    // state.categoryList
    // state.home.categoryList
    ...mapState({
      categoryList: (state) => state.home.categoryList,
    }),
    // ...mapGetters(['categoryList1'])
  },
};
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;

  .container {
    width: 1200px;
    margin: 0 auto;
    display: flex;
    position: relative;

    .all {
      width: 210px;
      height: 45px;
      background-color: #e1251b;
      line-height: 45px;
      text-align: center;
      color: #fff;
      font-size: 14px;
      font-weight: bold;
    }

    .nav {
      a {
        height: 45px;
        margin: 0 22px;
        line-height: 45px;
        font-size: 16px;
        color: #333;
      }
    }

    .sort {
      position: absolute;
      left: 0;
      top: 45px;
      width: 210px;
      height: 461px;
      position: absolute;
      background: #fafafa;
      z-index: 999;

      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
            font-size: 14px;
            font-weight: 400;
            overflow: hidden;
            padding: 0 20px;
            margin: 0;

            a {
              color: #333;
            }
          }

          .item-list {
            display: none;
            position: absolute;
            width: 734px;
            min-height: 460px;
            background: #f7f7f7;
            left: 210px;
            border: 1px solid #ddd;
            top: 0;
            z-index: 9999 !important;

            .subitem {
              float: left;
              width: 650px;
              padding: 0 4px 0 8px;

              dl {
                border-top: 1px solid #eee;
                padding: 6px 0;
                overflow: hidden;
                zoom: 1;

                &.fore {
                  border-top: 0;
                }

                dt {
                  float: left;
                  width: 54px;
                  line-height: 22px;
                  text-align: right;
                  padding: 3px 6px 0 0;
                  font-weight: 700;
                }

                dd {
                  float: left;
                  width: 555px;
                  padding: 3px 0 0;
                  overflow: hidden;

                  em {
                    float: left;
                    height: 14px;
                    line-height: 14px;
                    padding: 0 8px;
                    margin-top: 5px;
                    border-left: 1px solid #ccc;
                  }
                }
              }
            }
          }

          &.item_on {
            background-color: skyblue;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>
