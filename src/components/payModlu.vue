<template>
    <div class="i-conten">
        <div id="payModlu">
            <el-row>
                <el-col :md="6">
                    <label for="materialName">名称：</label>
                    <el-select
                        v-model="materialName"
                        @change="getPayList()"
                        clearable
                        placeholder="请选择角色"
                        class="inline-block w180px"
                    >
                        <el-option
                            v-for="item in materialNameList"
                            :key="item.name"
                            :label="item.name"
                            :value="item.name"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :md="6">
                    <label>日期：</label>
                    <el-date-picker
                        v-model="buyDate"
                        @change="getPayList()"
                        value-format="yyyy-MM-dd"
                        type="date"
                        class="inline-block w60"
                    ></el-date-picker>
                </el-col>
                <el-col :md="6">
                    <label>月份：</label>
                    <el-date-picker
                        v-model="buyMonth"
                        @change="getPayList()"
                        value-format="MM"
                        type="month"
                        class="inline-block w60"
                    ></el-date-picker>
                </el-col>
                <el-col :md="6">
                    <label>年份：</label>
                    <el-date-picker
                        v-model="buyYear"
                        @change="getPayList()"
                        value-format="yyyy"
                        type="year"
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
                    <el-table-column prop="_id" label="单号">
                    </el-table-column>
                    <el-table-column prop="name" label="名称">
                    </el-table-column>
                    <el-table-column prop="money" label="金额">
                    </el-table-column>
                    <el-table-column prop="reason" label="支出原因">
                    </el-table-column>
                    <el-table-column prop="payPerson" label="出纳人">
                    </el-table-column>
                    <el-table-column prop="createdAt" label="时间">
                        <template slot-scope="scope">
                            <label for="">{{
                                new Date(scope.row.createdAt).Format(
                                    "yyyy-MM-dd hh:mm:ss"
                                )
                            }}</label>
                        </template>
                    </el-table-column>
                    <el-table-column prop="mark" label="备注">
                    </el-table-column>
                    <el-table-column align="center" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                @click="editPay(scope.row)"
                                type="primary"
                                plain
                                size="small"
                                >修改</el-button
                            >
                            <el-button type="danger" plain size="small"
                            @click="deletePay(scope.row)"
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
    </div>
</template>
<script>
export default {
    data() {
        return {
            currentSort: 0,
            materialName: "",
            buyDate: "",
            buyMonth: "",
            buyYear: "",
            currentPage: 1,
            pagesize: 8,
            materialNameList: [],
            tableData: []
        };
    },
    created() {
        this.getPayList();
        this.PayNameList();
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
        },
        /**
         * 获取支出列表
         */
        getPayList() {
            const _this = this;
            let name = this.materialName;
            let day = this.buyDate;
            let month = this.buyMonth;
            let year = this.buyYear;
            let user = this.$store.state.userInfo;
            this.axios
                .get("/api/incomeAndPay/payList", {
                    params: {
                        name,
                        day,
                        month,
                        year,
                        companyId: user.companyId
                    }
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log("支出列表", res);
                        _this.tableData = res.data.result;
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取名称列表
         */
        PayNameList() {
            const _this = this;
            let user = this.$store.state.userInfo;
            this.axios
                .get("/api/incomeAndPay/PayNameList",{
                    params: {
                        companyId: user.companyId
                    }
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log("支出名称列表", res);
                        _this.materialNameList = res.data.result;
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 删除支出明细
         */
        deletePay(row) {
            let _this = this;
            this.axios
                .post("/api/incomeAndPay/deletePay", {
                    _id: row._id
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log(res);
                        _this.getPayList(); //刷新数据
                        _this.PayNameList();
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
         * 修改所选项支出明细
         */
        editPay(row) {
            this.$router.push({ path: "/editPayInfo", query: { id: row._id } });
        }
    }
};
</script>
<style scoped>
</style>
