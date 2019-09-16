<template>
<!-- 收支管理 -->
    <div class="i-conten">
        <div id="incomeAndPay" class="warpper">
            <!-- 收入支出 -->
            <el-button type="primary" size="medium" @click="addIncome()">
                <i class="el-icon-plus"></i>
                新增收入
            </el-button>
            <el-button type="primary" size="medium" @click="addPay()">
                <i class="el-icon-plus"></i>
                新增支出
            </el-button>
            <el-tabs v-model="activeName" @tab-click="handleClick" class="m-t-sm">
                <el-tab-pane label="收入明细" name="first">
                    <income-modlu v-if="showActive"></income-modlu>
                </el-tab-pane>
                <el-tab-pane label="支出明细" name="second">
                    <!-- <keep-alive> -->
                    <pay-modlu v-if="!showActive"></pay-modlu>
                    <!-- </keep-alive> -->
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            activeName: "first",
            keepName: "first",
            showActive: true
        };
    },
    methods: {
        handleClick(tab, event) {
            if (this.keepName === tab.name) {
                return false;
            }
            this.keepName = tab.name;
            this.showActive = !this.showActive;
        },
        /**
         * 添加收入
         */
        addIncome(){
            this.$router.push('./addIncome');
        },
        /**
         * 添加支出
         */
        addPay(){
            this.$router.push('./addPayInfo');
        }
    },

    components: {
        incomeModlu: () => import("./incomeModlu.vue"),
        payModlu: () => import("./payModlu.vue")
    }
};
</script>
<style scoped>
</style>
