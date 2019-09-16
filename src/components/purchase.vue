<template>
    <div class="i-conten">
        <div id="purchase" class="warpper">
            <el-row>
                <el-button-group class="pull-left">
                    <el-button
                        v-for="(item, index) in btnArray"
                        :key="item.id"
                        :class="{ active: currentSort == index }"
                        @click="giveCharData(index)"
                    >
                        {{ item.text }}
                    </el-button>
                </el-button-group>
                <el-col :md="6" class="m-l-md">
                    <label for="materialName">名称：</label>
                    <el-select
                        v-model="materialName"
                        @change="getMaterialList()"
                        clearable
                        placeholder="请选择名称"
                        class="inline-block w180px"
                    >
                        <el-option
                            v-for="item in materialNameList"
                            :key="item._id"
                            :label="item.material"
                            :value="item.material"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :md="7" v-if="purchaseState === 2">
                    <label>采购日期：</label>
                    <el-date-picker
                        v-model="buyDate"
                        value-format="yyyy-MM-dd"
                        @change="getMaterialList()"
                        type="date"
                        class="inline-block w60"
                    ></el-date-picker>
                </el-col>
            </el-row>

            <!-- 表格 -->
            <div class="m-t-md">
                <el-table
                    :data="
                        tableData.slice(
                            (currentPage - 1) * pagesize,
                            currentPage * pagesize
                        )
                    "
                    style="width: 100%"
                >
                    <el-table-column prop="_id" label="ID" v-if="false">
                    </el-table-column>
                    <el-table-column prop="material" label="原料名称">
                    </el-table-column>
                    <el-table-column prop="hasNumber" label="数量">
                    </el-table-column>
                    <el-table-column prop="purchaseState" label="分发状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.purchaseState === 0"
                                >未采购</span
                            >
                            <span v-else-if="scope.row.purchaseState === 1"
                                >采购中</span
                            >
                            <span v-else>已采购</span>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop="purpose"
                        label="用途"
                        width="300"
                    ></el-table-column>
                    <el-table-column prop="author" label="录入者">
                    </el-table-column>
                    <el-table-column prop="receivePerson" label="领取人">
                    </el-table-column>
                    <el-table-column
                        prop="receiveTime"
                        label="领取时间"
                        width="180"
                    >
                    </el-table-column>
                    <el-table-column prop="purchasePerson" label="采购人">
                    </el-table-column>
                    <el-table-column
                        prop="purchaseTime"
                        label="采购时间"
                        width="180"
                    >
                    </el-table-column>
                    <el-table-column prop="mark" label="备注">
                    </el-table-column>
                    <el-table-column align="center" fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                v-if="scope.row.purchaseState === 0"
                                @click="receive(scope.row)"
                                type="primary"
                                plain
                                size="small"
                                >采购</el-button
                            >
                            <el-button
                                v-else-if="scope.row.purchaseState === 1"
                                @click="buyComplete(scope.row)"
                                type="primary"
                                plain
                                size="small"
                                >采购完成</el-button
                            >
                            <el-button
                                v-else
                                @click="goToStore(scope.row)"
                                type="primary"
                                plain
                                size="small"
                                >入库</el-button
                            >
                        </template>
                    </el-table-column>
                </el-table>

                <!-- 分页 -->
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[2, 8, 20, 40]"
                    :page-size="pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="tableData.length"
                >
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentSort: 0,
            materialName: "",
            buyDate: "",
            btnArray: [
                {
                    id: "newOrder",
                    text: "新任务"
                },
                {
                    id: "ongoing",
                    text: "进行中"
                },
                {
                    id: "compelte",
                    text: "已采购"
                }
            ],
            currentPage: 1,
            pagesize: 8,
            tableData: [],
            purchaseState: 0,
            material: "",
            materialNameList: []
        };
    },
    created() {
        this.getMaterialList();
        this.getMaterialNameList();
    },
    methods: {
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function(size) {
            this.pagesize = size;
            console.log(this.pagesize); //每页下拉显示数据
        },
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
            console.log(this.currentPage); //点击第几页
        },
        giveCharData(index) {
            // 阻止重复点击
            if (this.currentSort === index) {
                return false;
            }
            this.currentSort = index;
            this.purchaseState = index;
            this.getMaterialList();
            this.getMaterialNameList();
        },
        /**
         * 获取原料列表
         */
        getMaterialList() {
            let _this = this;
            this.axios
                .get("/api/material/getMaterialList", {
                    params: {
                        purchaseState: this.purchaseState,
                        material: this.materialName,
                        purchaseTime:this.buyDate
                    }
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log("采购列表", res);
                        _this.tableData = res.data.result;
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取原料名称集合
         */
        getMaterialNameList() {
            let _this = this;
            this.axios
                .get("/api/material/materialNameList", {
                    params: {
                        purchaseState: this.purchaseState
                    }
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log("原料名称", res);
                        _this.materialNameList = res.data.result;
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 领取采购
         */
        receive(row) {
            let _this = this;
            let _id = row._id;
            let receivePerson = this.$store.state.userInfo.userName;
            this.axios
                .post("/api/material/receiveBuy", {
                    _id,
                    receivePerson
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        _this.getMaterialList();
                        _this.getMaterialNameList();
                        _this.$message({
                            type: "success",
                            message: "领取采购成功"
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 完成采购
         */
        buyComplete(row) {
            let _this = this;
            let _id = row._id;
            let purchasePerson = this.$store.state.userInfo.userName;
            this.axios
                .post("/api/material/completeBuy", {
                    _id,
                    purchasePerson
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        _this.getMaterialList();
                        _this.getMaterialNameList();
                        _this.$message({
                            type: "success",
                            message: "采购完成成功"
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        goToStore(row) {
            let _this = this;
            let _id = row._id;
            let storePerson = this.$store.state.userInfo.userName;
            this.axios
                .post("/api/material/materialWarehousing", {
                    _id,
                    storePerson
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        _this.getMaterialList();
                        _this.getMaterialNameList();
                        _this.$message({
                            type: "success",
                            message: "入库成功"
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
    }
};
</script>
<style scoped>
.active {
    background: #409eff;
    color: #fff;
}
</style>
