<template>
  <div id="home">
    <div id="sidebarContain">
      <!-- TODO 待修改 -->
      <div class="header">少烦忧</div>
      <el-menu
        :default-active="defaultActive"
        class="el-menu-vertical-demo"
        :collapse="contentWidth"
        background-color="#444"
        @select="handleSelect"
        text-color="#fff"
        active-text-color="#ffd04b"
      >
        <template v-for="item in menuData">
          <!-- 含有子菜单 -->
          <el-submenu v-if="item.chirlden" :index="item.path" v-bind:key="item.path">
            <template slot="title">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </template>
            <el-menu-item-group>
              <el-menu-item
                v-for="chirld in item.chirlden"
                :key="chirld.title"
                :index="chirld.path"
                @click.native="changeMenu()"
              >
                <i :class="chirld.icon"></i>
                <span slot="title">{{ chirld.title }}</span>
              </el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <!-- 不含子菜单 -->
          <el-menu-item
            v-else
            @click.native="changeMenu()"
            :index="item.path"
            v-bind:key="item.path"
          >
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div id="right-content" v-bind:class="[contentWidth ? 'change-width' : 'default-width']">
      <nav-bar></nav-bar>
      <router-view></router-view>
    </div>
  </div>
</template>
<script>
import navBar from "../components/navBar";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      defaultActive: "/homePage",
      oldnumber: "",
      // 菜单列表
      menuData: [
        {
          path: "/homePage",
          icon: "el-icon-office-building",
          title: "我的工作台"
        },
        {
          path: "/orderManage",
          icon: "el-icon-truck",
          title: "订单管理"
        },
        {
          path: "produceMenu",
          icon: "el-icon-s-promotion",
          title: "生产管理",
          chirlden: [
            {
              path: "/produceList",
              icon: "el-icon-s-order",
              title: "生产列表"
            },
            {
              path: "/produceSituation",
              icon: "el-icon-view",
              title: "生产情况"
            }
          ]
        },
        {
          path: "/materialHome",
          icon: "el-icon-s-open",
          title: "原料列表"
        },
        {
          path: "/purchase",
          icon: "el-icon-sell",
          title: "采购管理"
        },
        {
          path: "stockMenu",
          icon: "el-icon-shopping-cart-2",
          title: "仓库管理",
          chirlden: [
            {
              path: "/materialStore",
              icon: "el-icon-sell",
              title: "原料仓库"
            },
            {
              path: "/producePutaway",
              icon: "el-icon-s-order",
              title: "产品入库"
            },
            {
              path: "/stockManage",
              icon: "el-icon-view",
              title: "成品仓库"
            }
          ]
        },
        {
          path: "/consignmentManage",
          icon: "el-icon-s-shop",
          title: "发货管理"
        },
        {
          path: "/customerManage",
          icon: "el-icon-s-shop",
          title: "客户管理"
        },
        {
          path: "/incomeAndPay",
          icon: "el-icon-s-shop",
          title: "收入支出管理"
        },
        {
          path: "/userMenu",
          icon: "el-icon-setting",
          title: "系统管理",
          chirlden: [
            {
              path: "/userManage",
              icon: "el-icon-user",
              title: "用户管理"
            },
            {
              path: "/roleManage",
              icon: "el-icon-view",
              title: "角色管理"
            }
          ]
        }
      ]
    };
  },
  created() {
    // F5刷新页面时默认选中原来的菜单路径
    // 通过session保存防止因刷新页面引起导航栏失去焦点
    let local = sessionStorage.getItem("histroyRouter");
    let path = this.$route.path;
    this.$store.state.userInfo = JSON.parse(
      sessionStorage.getItem("userInfo")
    );

    if (local) {
      this.defaultActive = local;
    } else {
      this.defaultActive = path;
    }
    console.log("用户信息", this.$store.state.userInfo);
  },
  mounted() {},
  methods: {
    // 选择导航标签事件
    // 获取选择项的index值
    handleSelect(index, indexPath) {
      this.defaultActive = index;
    },
    // 切换导航标签跳转页面
    changeMenu() {
      let defaultActive = this.defaultActive;
      // 防止右边内容跳转页面后，再次点击回退到导航栏指向的页面
      if (this.oldnumber == defaultActive) {
        return false;
      }
      this.oldnumber = defaultActive;
      // 保存刷新前的路由
      sessionStorage.setItem("histroyRouter", defaultActive);
      this.$router.push(defaultActive); //跳转页面
    }
  },
  computed: {
    ...mapGetters(["contentWidth"])
  },
  components: {
    navBar
  }
};
</script>
<style scope>
.content,
#home {
  height: 100%;
}
.el-menu-vertical-demo {
  overflow-y: auto;
  overflow-x: hidden;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
#sidebarContain {
  /* max-width: 200px; */
  height: 100%;
  float: left;
}
#sidebarContain > ul {
  height: calc(100% - 60px);
}
li {
  text-align: left;
}
.header {
  height: 60px;
  text-align: center;
  line-height: 60px;
  color: #fff;
  background: #595d66;
}
#right-content {
  float: left;
  height: 100%;
}
.default-width {
  width: calc(100% - 201px);
}
.change-width {
  width: calc(100% - 65px);
}
</style>