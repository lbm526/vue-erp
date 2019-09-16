<template>
    <div class="i-conten">
        <div class="warpper">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="原料列表" name="first">
                    <material-page v-if="showActive"></material-page>
                </el-tab-pane>
                <el-tab-pane label="原料趋势图" name="second">
                    <material-char v-if="!showActive"></material-char>
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
        }
    },

    components: {
        materialPage: () => import("./materialPage.vue"),
        materialChar: () => import("./materialChar.vue")
    }
};
</script>
<style scoped>
</style>
