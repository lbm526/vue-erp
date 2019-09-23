<template>
  <div id="navBar">
    <nav>
      <div class="menu-btn" @click="flexibleMenu()">
        <el-button>
          <i class="el-icon-menu"></i>
        </el-button>
      </div>
      <div id="nav-right">
        <div @click="singDown()" class="singDown">
          <i class="iconfont icon-chehuisekuai"></i>
          <span>注销</span>
        </div>
        <div>
          <i class="el-icon-user-solid"></i>
          <label id="user">{{userName}}</label>
        </div>
      </div>
    </nav>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { mapState } from "vuex";

export default {
  data() {
    return {
      userName: "用户"
    };
  },
  created() {
    this.userName = this.$store.state.userInfo.userName;
  },
  methods: {
    ...mapActions(["flexibleMenu"]),
    singDown() {
      sessionStorage.removeItem('userInfo');
      this.$store.state.userInfo = {};
      this.$router.replace('/')
    }
  }
};
</script>
<style scope>
nav {
  padding: 0 15px;
  height: 60px;
  line-height: 60px;
  background: #fff;
  border-bottom: #ccc solid 1px;
  box-shadow: 0 1px 5px #ccc;
}
#nav-right,
#nav-right > div {
  padding: 0 10px;
  float: right;
}
#nav-right > div i {
  padding-right: 5px;
}
.menu-btn {
  float: left;
}
.el-icon-menu {
  color: rgb(44, 135, 238);
}
.singDown:hover{
  cursor: pointer;
}
</style>