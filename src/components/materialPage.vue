<template>
    <div id="materialPage">
        <!-- 导航栏 -->
        <el-row>
            <el-col :xs="12" :sm="12" :md="3" class="text-center m-b-sm">
                <el-button type="primary" @click="addMaterial()">
                    <i class="el-icon-plus"></i>
                    新增原料
                </el-button>
            </el-col>
            <el-col :xs="12" :sm="12" :md="3" class="text-center m-b-sm">
                <el-button type="danger" @click="deteleMaterial()">
                    <i class="el-icon-delete"></i>
                    批量删除
                </el-button>
            </el-col>
            <el-col :xs="24" :sm="24" :md="6" class="text-right m-b-sm">
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
            <el-col :xs="24" :sm="24" :md="7" class="text-right m-b-sm">
                <label for="personName">入库人：</label>
                <el-select
                    v-model="author"
                    @change="getMaterialList()"
                    clearable
                    placeholder="请选择入库人"
                    class="inline-block w180px"
                >
                    <el-option
                        v-for="item in materialNameList"
                        :key="item._id"
                        :label="item.author"
                        :value="item.author"
                    >
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <div class="text-center">
            <el-button-group>
                <el-button
                    v-for="(item, index) in distribute"
                    :key="item.id"
                    :class="{ active: currentSort == index }"
                    @click="giveCharData(index)"
                >
                    {{ item.name }}
                </el-button>
            </el-button-group>
        </div>
        <!-- 表格 -->
        <div class="m-t-md">
            <el-table
                :data="
                    tableData.slice(
                        (currentPage - 1) * pagesize,
                        currentPage * pagesize
                    )
                "
                @selection-change="select"
                style="width: 100%"
            >
                <el-table-column type="selection" width="45" fixed>
                </el-table-column>
                <el-table-column prop="_id" label="ID" v-if="false">
                </el-table-column>
                <el-table-column prop="material" label="原料名称">
                </el-table-column>
                <el-table-column prop="hasNumber" label="数量">
                </el-table-column>
                <el-table-column
                    prop="distributeState"
                    label="分发状态"
                    
                >
                    <template slot-scope="scope">
                        {{
                            scope.row.distributeState === 0
                                ? "未分发"
                                : "已分发"
                        }}
                    </template>
                </el-table-column>
                <el-table-column
                    prop="purpose"
                    label="用途"
                    width="300"
                ></el-table-column>
                <el-table-column prop="author" label="录入者">
                </el-table-column>
                <el-table-column prop="mark" label="备注">
                </el-table-column>
                <el-table-column
                    align="center"
                    fixed="right"
                    label="操作"
                    width="220"
                >
                    <template slot-scope="scope">
                        <el-button
                            v-if="scope.row.distributeState === 0"
                            @click="handleClick(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >分发</el-button
                        >
                        <el-button
                            type="warning"
                            plain
                            size="small"
                            @click="editMaterial(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            type="danger"
                            plain
                            size="small"
                            @click="deteleMaterial(scope.row)"
                            >删除</el-button
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
</template>
<script>
export default {
    data() {
        return {
            currentSort: 0,
            materialName: "",
            author: "",
            personName: "",
            currentPage: 1,
            pagesize: 8,
            tableData: [],
            materialNameList: [],
            distributeState: 0,
            selectId: [],
            distribute: [
                {
                    id: 0,
                    name: "未分发"
                },
                {
                    id: 1,
                    name: "已分发"
                }
            ]
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
        addMaterial() {
            this.$router.push("/addMaterial");
        },
        /**
         * 未分发、已分发
         */
        giveCharData(index) {
            // 阻止重复点击
            if (this.currentSort === index) {
                return false;
            }
            this.currentSort = index;
            this.distributeState = index;
            this.getMaterialList();
            this.getMaterialNameList();
        },
        /**
         * 选择checkedbox框
         */
        select(selection) {
            if (!selection) {
                this.selectId = [];
                return false;
            }
            let arr = [];
            for (let i = 0; i < selection.length; i++) {
                arr.push(selection[i]._id);
            }
            this.selectId = arr;
        },
        /**
         * 获取原料列表
         */
        getMaterialList() {
            let _this = this;
            let user = this.$store.state.userInfo;
            this.axios
                .get("/api/material/getMaterialList", {
                    params: {
                        distributeState: this.distributeState,
                        material: this.materialName,
                        author: this.author,
                        companyId: user.companyId
                    }
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log("原料列表", res);
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
            let user = this.$store.state.userInfo;
            this.axios
                .get("/api/material/materialNameList", {
                    params: {
                        distributeState: this.distributeState,
                        companyId: user.companyId
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
         * 批量删除原料
         */
        deteleMaterial(row) {
            let _this = this;
            // 单个删除时
            if (row) {
                this.selectId.push(row._id);
            }
            this.axios
                .post("/api/material/deleteMaterial", {
                    ids: this.selectId
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        _this.selectId = [];
                        _this.getMaterialList();
                        _this.getMaterialNameList();
                        _this.$message({
                            type: "success",
                            message: "删除成功"
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 分发原料到购物车
         */
        handleClick(row) {
            let _this = this;
            this.axios
                .post("/api/material/distributeToPurchase", {
                    _id: row._id
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        _this.getMaterialList();
                        _this.getMaterialNameList();
                        _this.$message({
                            type: "success",
                            message: "分发成功"
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 修改原料
         */
        editMaterial(row){
            let id = row._id;
            this.$router.push({path: '/editMaterial',query:{id}});
        }
    }
};
</script>
<style scoped>
.active {
    background: #409eff;
    color: #fff;
}
.el-input {
    display: inline-block;
    width: 80%;
}
</style>
