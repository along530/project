<template>
  <div class="cart">
    <h4>全部商品</h4>
    <div class="cart-main">
      <div class="cart-th">
        <div class="cart-th1">全部</div>
        <div class="cart-th2">商品</div>
        <div class="cart-th3">单价（元）</div>
        <div class="cart-th4">数量</div>
        <div class="cart-th5">小计（元）</div>
        <div class="cart-th6">操作</div>
      </div>
      <div class="cart-body">
        <ul class="cart-list" v-for="cart in shopCartList" :key="cart.id">
          <li class="cart-list-con1">
            <input
              type="checkbox"
              name="chk_list"
              :checked="cart.isChecked === 1"
              @click="updateOne(cart)"
            />
          </li>
          <li class="cart-list-con2">
            <img :src="cart.imgUrl" />
            <div class="item-msg">{{ cart.skuName }}</div>
          </li>

          <li class="cart-list-con4">
            <span class="price">399.00</span>
          </li>
          <li class="cart-list-con5">
            <a href="javascript:void(0)" class="mins" @click="updateCartNum(cart, -1)">-</a>
            <input
              autocomplete="off"
              type="text"
              :value="cart.skuNum"
              minnum="1"
              class="itxt"
              @change="updateCartNum(cart, $event.target.value * 1)"
            />
            <a href="javascript:void(0)" class="plus" @click="updateCartNum(cart, 1)">+</a>
          </li>
          <li class="cart-list-con6">
            <span class="sum">{{ cart.skuPrice * cart.skuNum }}</span>
          </li>
          <li class="cart-list-con7">
            <a href="#none" class="sindelet" @click="deleteOne(cart)">删除</a>
            <br />
            <a href="#none">移到收藏</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="cart-tool">
      <div class="select-all">
        <input class="chooseAll" type="checkbox" v-model="isCheckAll" />
        <span>全选</span>
      </div>
      <div class="option">
        <a href="#none" @click="deleteAll">删除选中的商品</a>
        <a href="#none">移到我的关注</a>
        <a href="#none">清除下柜商品</a>
      </div>
      <div class="money-box">
        <div class="chosed">
          已选择
          <span>{{ checkNum }}</span>件商品
        </div>
        <div class="sumprice">
          <em>总价（不含运费） ：</em>
          <i class="summoney">{{ allMoney }}</i>
        </div>
        <div class="sumbtn">
          <a class="sum-btn" href="###" target="_blank">结算</a>
          <!-- <router-linke to="/trade"
          class="sum-btn" >结算</router-linke> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  name: "ShopCart",
  mounted() {
    this.getShopCartList();
    this.getTradeInfo();
  },
  methods: {
    getShopCartList() {
      this.$store.dispatch("getShopCartList");
    },
    async updateCartNum(cart, disNum) {
      //校正数量,disNUm是想改变的量
      if (cart.skuNum + disNum < 1) {
        disNum = 1 - cart.skuNum; //disNum和原来的数量加起来最少得是1,如果小于1得对disNum修正
      }

      //发请求去处理数量，返回成功后重新请求列表数据，就会看到最新的数据
      try {
        await this.$store.dispatch("addOrUpdateCart", {
          skuId: cart.skuId,
          skuNum: disNum,
          //vue调试查看skuId
        });
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },
    async updateOne(cart) {
      //发请求
      try {
        await this.$store.dispatch("updateIsCheck", {
          skuId: cart.skuId,
          isChecked: cart.isChecked === 1 ? 0 : 1,
        });
        //结果成功去重新请求列表页数据
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },
    async deleteOne(cart) {
      try {
        await this.$store.dispatch("deleteCart", cart.skuId);
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },
    //删除多个选中的购物车选框
    async deleteAll() {
      try {
        await this.$store.dispatch("deleteAllCheckCart");
        this.getShopCartList();
      } catch (error) {
        alert(error.message);
      }
    },
    getTradeInfo() {
      this.$store.dispatch("getTradeInfo");
    },
    //切换默认地址
    changeDefault(address) {
      this.userAddressList.forEach((item) => (item.isDefault = "0"));
      address.isDefault = "1";
    },
  },
  computed: {
    ...mapState({
      shopCartList: (state) => state.shopcart.shopCartList,
      tradeInfo: (state) => state.trade.tradeInfo,
      detailArrayList() {
        return this.tradeInfo.detailArrayList || [];
      },
      userAddressList() {
        return this.tradeInfo.userAddressList || [];
      }, //看vue-trade组件
    }),
    isCheckAll: {
      get() {
        return (
          this.shopCartList.every((item) => item.isChecked === 1) &&
          this.shopCartList.length > 0
        ); //现在全选框是否打√
      },
      async set(val) {
        //最新值,要修改所有的状态,val对应的状态,val如果是true就对应1,因为isCHecked只认识数字,如果是false就对应0,默认传的是布尔值
        try {
          const result = await this.$store.dispatch(
            "updateAllIsCheck",
            val ? 1 : 0
          );
          console.log(result);
          this.getShopCartList();
        } catch (error) {
          alert(error.message);
        }
      },
    },
    checkNum() {
      //统计选择的数量,每次拿的都是前一个pre
      return this.shopCartList.reduce((pre, item) => {
        if (item.isChecked === 1) {
          pre += item.skuNum;
        }
        return pre;
      }, 0);
    },
    //统计总价
    allMoney() {
      return this.shopCartList.reduce((pre, item) => {
        if (item.isChecked === 1) {
          pre += item.skuNum * item.skuPrice;
        }
        return pre;
      }, 0);
    },
  },
};
</script>

<style lang="less" scoped>
.cart {
  width: 1200px;
  margin: 0 auto;

  h4 {
    margin: 9px 0;
    font-size: 14px;
    line-height: 21px;
  }

  .cart-main {
    .cart-th {
      background: #f5f5f5;
      border: 1px solid #ddd;
      padding: 10px;
      overflow: hidden;

      & > div {
        float: left;
      }

      .cart-th1 {
        width: 25%;

        input {
          vertical-align: middle;
        }

        span {
          vertical-align: middle;
        }
      }

      .cart-th2 {
        width: 25%;
      }

      .cart-th3,
      .cart-th4,
      .cart-th5,
      .cart-th6 {
        width: 12.5%;
      }
    }

    .cart-body {
      margin: 15px 0;
      border: 1px solid #ddd;

      .cart-list {
        padding: 10px;
        border-bottom: 1px solid #ddd;
        overflow: hidden;

        & > li {
          float: left;
        }

        .cart-list-con1 {
          width: 15%;
        }

        .cart-list-con2 {
          width: 35%;

          img {
            width: 82px;
            height: 82px;
            float: left;
          }

          .item-msg {
            float: left;
            width: 150px;
            margin: 0 10px;
            line-height: 18px;
          }
        }

        .cart-list-con4 {
          width: 10%;
        }

        .cart-list-con5 {
          width: 17%;

          .mins {
            border: 1px solid #ddd;
            border-right: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }

          input {
            border: 1px solid #ddd;
            width: 40px;
            height: 33px;
            float: left;
            text-align: center;
            font-size: 14px;
          }

          .plus {
            border: 1px solid #ddd;
            border-left: 0;
            float: left;
            color: #666;
            width: 6px;
            text-align: center;
            padding: 8px;
          }
        }

        .cart-list-con6 {
          width: 10%;

          .sum {
            font-size: 16px;
          }
        }

        .cart-list-con7 {
          width: 13%;

          a {
            color: #666;
          }
        }
      }
    }
  }

  .cart-tool {
    overflow: hidden;
    border: 1px solid #ddd;

    .select-all {
      padding: 10px;
      overflow: hidden;
      float: left;

      span {
        vertical-align: middle;
      }

      input {
        vertical-align: middle;
      }
    }

    .option {
      padding: 10px;
      overflow: hidden;
      float: left;

      a {
        float: left;
        padding: 0 10px;
        color: #666;
      }
    }

    .money-box {
      float: right;

      .chosed {
        line-height: 26px;
        float: left;
        padding: 0 10px;
      }

      .sumprice {
        width: 200px;
        line-height: 22px;
        float: left;
        padding: 0 10px;

        .summoney {
          color: #c81623;
          font-size: 16px;
        }
      }

      .sumbtn {
        float: right;

        a {
          display: block;
          position: relative;
          width: 96px;
          height: 52px;
          line-height: 52px;
          color: #fff;
          text-align: center;
          font-size: 18px;
          font-family: "Microsoft YaHei";
          background: #e1251b;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
