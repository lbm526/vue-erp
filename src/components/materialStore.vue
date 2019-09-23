<template>
    <div class="i-conten">
        <div id="materialStore" class="warpper">
            <el-row>
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
                <el-col :md="7">
                    <label>入库日期：</label>
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
                    <el-table-column prop="storeTime" label="入库人">
                    </el-table-column>
                    <el-table-column
                        prop="storeTime"
                        label="入库时间"
                        width="180"
                    >
                    </el-table-column>
                    </el-table-column>
                    <el-table-column prop="mark" label="备注">
                    </el-table-column>
                    <el-table-column align="center" fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button
                                @click="openDialog(scope.row)"
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
        <!-- 模态框 -->
        <el-dialog
                title="入库"
                :visible.sync="editRoleDialog"
                :close-on-click-modal="false"
            >
                <el-row>
                    <el-col
                        :md="12"
                        :push="6"
                        :class="[
                            'text-right',
                            {
                                'animated shake delay-.5s':
                                    $v.message.hasNumber.$error
                            },
                            { 'form-group--error': $v.message.hasNumber.$error }
                        ]"
                    >
                        <i class="colorRead">* </i>
                        <label :class="{ colorRead: $v.message.hasNumber.$error }"
                            >数量：</label
                        >
                        <el-input
                            v-model.number="$v.message.hasNumber.$model"
                            type="number"
                            class="inline-block w80"
                            placeholder="请输入数量"
                            @blur="$v.message.hasNumber.$touch()"
                            clearable
                        ></el-input>
                        <div
                            :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.hasNumber
                                        .$error
                                }
                            ]"
                            v-if="!$v.message.hasNumber.required"
                        >
                            必填项！
                        </div>
                    </el-col>
                </el-row>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editRoleDialog = false">取 消</el-button>
                    <el-button type="primary" @click="goToStore()"
                        >确 定</el-button
                    >
                </div>
            </el-dialog>
    </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            currentSort: 0,
            materialName: "",
            buyDate: "",
            currentPage: 1,
            pagesize: 8,
            tableData: [],
            purchaseState: 0,
            material: "",
            materialNameList: [],
            editRoleDialog: false,
            selectId: '',
            message: {
                hasNumber: ''
            }
        };
    },
    validations: {
        message: {
            hasNumber: {
                required
            }
        }
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
         * 打开模态框
         */
        openDialog(row){
            this.editRoleDialog = true;
            this.selectId = row._id;
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
                        storeState: 1,
                        material: this.materialName,
                        storeTime: this.buyDate,
                        companyId: user.companyId
                    }
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log("原料仓库列表", res);
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
                        storeState: 1,
                        purchaseState: 3,
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
         * 入库
         */
        goToStore() {
            const _this = this;
            this.$v.$touch(); // 验证
            // 验证不出错（通过）
            if (!this.$v.$invalid) {
                this.axios
                    .post('/api/store/addStore', {
                        hasNumber:this.message.hasNumber,
                        _id: this.selectId
                    })
                    .then(res => {
                        _this.error.listen(res.data.msg).then(() => {
                            _this.editRoleDialog = false;
                            _this.message.hasNumber = '';
                            _this.selectId = '';
                            _this.getMaterialList();
                            _this.$v.$reset();
                            _this.$message({
                                type: "success",
                                message: "入库成功"
                            });
                        });
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }
        }
    }
};
</script>
<style scoped>
.active {
    background: #409eff;
    color: #fff;
}
</style>
