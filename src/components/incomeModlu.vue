<template>
    <div id="income">
        <el-row>
            <el-col :md="6">
                <label for="materialName">名称：</label>
                <el-select
                    v-model="materialName"
                    @change="getIncomeList()"
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
                    value-format="yyyy-MM-dd"
                    @change="getIncomeList()"
                    type="date"
                    class="inline-block w60"
                ></el-date-picker>
            </el-col>
            <el-col :md="6">
                <label>月份：</label>
                <el-date-picker
                    v-model="buyMonth"
                    value-format="MM"
                    @change="getIncomeList()"
                    type="month"
                    class="inline-block w60"
                ></el-date-picker>
            </el-col>
            <el-col :md="6">
                <label>年份：</label>
                <el-date-picker
                    v-model="buyYear"
                    value-format="yyyy"
                    @change="getIncomeList()"
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
            <el-table-column prop="_id" label="单号" width="120">
                </el-table-column>
                <el-table-column prop="name" label="名称" width="120">
                </el-table-column>
                <el-table-column prop="money" label="金额" width="120">
                </el-table-column>
                <el-table-column prop="price" label="单价" width="100">
                </el-table-column>
                <el-table-column prop="number" label="数量" width="180">
                </el-table-column>
                <el-table-column
                    prop="customer"
                    label="客户"
                    width="100"
                ></el-table-column>
                <el-table-column prop="tell" label="客户电话" width="110">
                </el-table-column>
                <el-table-column prop="address" label="客户地址" width="300">
                </el-table-column>
                <el-table-column
                    prop="projectPerson"
                    label="处理人"
                    width="100"
                >
                </el-table-column>
                <el-table-column prop="paymentTime" label="时间" width="180">
                    <template slot-scope="scope">
                        <label for="">{{
                            new Date(scope.row.paymentTime).Format(
                                "yyyy-MM-dd hh:mm:ss"
                            )
                        }}</label>
                    </template>
                </el-table-column>
                <el-table-column prop="mark" label="备注" width="180">
                </el-table-column>
                <el-table-column
                    align="center"
                    fixed="right"
                    label="操作"
                    width="150"
                >
                    <template slot-scope="scope">
                        <el-button
                            @click="editIncome(scope.row)"
                            type="primary"
                            plain
                            size="small"
                            >修改</el-button
                        >
                        <el-button
                            type="danger"
                            plain
                            size="small"
                            @click="deleteIncome(scope.row)"
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
require("../assets/js/Date/Udate");
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
        this.getIncomeList();
        this.getMateriaNameList();
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
         * 获取收入列表
         */
        getIncomeList() {
            const _this = this;
            let name = this.materialName;
            let day = this.buyDate;
            let month = this.buyMonth;
            let year = this.buyYear;
            this.axios
                .get("/api/incomeAndPay/incomeList", {
                    params: {
                        name,
                        day,
                        month,
                        year
                    }
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log("收入列表", res);
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
        getMateriaNameList() {
            const _this = this;
            this.axios
                .get("/api/incomeAndPay/materialNameList")
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log("材料名称列表", res);
                        _this.materialNameList = res.data.result;
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 删除收入明细
         */
        deleteIncome(row) {
            let _this = this;
            this.axios.post('/api/incomeAndPay/deleteIncome',{
                _id: row._id
            }).then(res => {
                _this.error.listen(res.data.msg).then(() => {
                    console.log(res)
                    _this.getIncomeList(); //刷新数据
                    _this.getMateriaNameList();
                    _this.$message({
                        type:'success',
                        message: '删除成功'
                    })
                })
            }).catch(err => {
                console.log(err);
            })
        },
        /**
         * 修改所选项收入明细
         */
        editIncome(row) {
            this.$router.push({path: '/editIncome',query:{id: row._id}});
        }
    }
};
</script>
<style scoped>
</style>
