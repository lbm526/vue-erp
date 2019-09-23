<template>
    <div class="i-conten">
        <div id="userManage" class="warpper">
            <!-- 用户管理 -->
            <el-button type="primary" size="small" @click="addUser()">
                <i class="el-icon-plus"></i>
                新增用户
            </el-button>
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
                    <el-table-column prop="_id" label="账号ID">
                    </el-table-column>
                    <el-table-column prop="phone" label="账号">
                    </el-table-column>
                    <el-table-column prop="userName" label="用户名">
                    </el-table-column>
                    <el-table-column prop="roleName" label="用户角色">
                    </el-table-column>
                    <el-table-column prop="email" label="邮箱">
                    </el-table-column>
                    <!-- <el-table-column prop="name" label="账号状态">
                    </el-table-column> -->
                    <el-table-column prop="createDate" label="注册时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        fixed="right"
                        label="操作"
                        width="240"
                    >
                        <template slot-scope="scope">
                            <el-button
                                @click="handleClick(scope.row)"
                                type="primary"
                                plain
                                size="small"
                                >编辑</el-button
                            >
                            <el-button
                                type="warning"
                                plain
                                size="small"
                                @click="openChangePassword(scope.row)"
                                >修改密码</el-button
                            >
                            <el-button
                                type="danger"
                                plain
                                size="small"
                                @click="deleteUser(scope.row)"
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

        <!-- 修改模态框 -->
        <el-dialog
            title="修改密码"
            :visible.sync="changPasswordDialog"
            :close-on-click-modal="false"
        >
            <el-row>
                <el-col
                    :md="12"
                    :push="6"
                    :class="[
                        {
                            'form-group--error':
                                $v.message.repeatPassword.$error
                        },
                        {
                            'animated shake delay-.5s':
                                $v.message.repeatPassword.$error
                        }
                    ]"
                >
                    <div class="m-b-sm">
                        <label
                            for=""
                            :class="{
                                colorRead: $v.message.repeatPassword.$error
                            }"
                            >旧密码：</label
                        >
                    </div>
                    <el-input
                        v-model="$v.message.repeatPassword.$model"
                        @blur="$v.message.repeatPassword.$touch()"
                        placeholder="请输入旧密码"
                        autocomplete="off"
                        type="password"
                        suffix-icon="el-icon-lock"
                        clearable
                    ></el-input>
                    <div
                        v-if="!$v.message.repeatPassword.required"
                        :class="[
                            'colorRead',
                            {
                                'form-group__message': !$v.message
                                    .repeatPassword.$error
                            }
                        ]"
                    >
                        请输入旧密码
                    </div>
                    <div
                        v-if="!$v.message.repeatPassword.isUnique"
                        :class="[
                            'colorRead',
                            {
                                'form-group__message': !$v.message
                                    .repeatPassword.$error
                            }
                        ]"
                    >
                        旧密码错误
                    </div>
                </el-col>
            </el-row>

            <el-row class="m-t-md">
                <el-col
                    :md="12"
                    :push="6"
                    :class="[
                        {
                            'form-group--error': $v.message.password.$error
                        },
                        {
                            'animated shake delay-.5s':
                                $v.message.password.$error
                        }
                    ]"
                >
                    <div class="m-b-sm">
                        <label
                            for=""
                            :class="{
                                colorRead: $v.message.password.$error
                            }"
                            >新密码：</label
                        >
                    </div>
                    <el-input
                        v-model="$v.message.password.$model"
                        @blur="$v.message.password.$touch()"
                        placeholder="请输入新密码"
                        autocomplete="off"
                        type="password"
                        suffix-icon="el-icon-lock"
                        clearable
                    ></el-input>
                    <div
                        v-if="!$v.message.password.required"
                        :class="[
                            'colorRead',
                            {
                                'form-group__message': !$v.message.password
                                    .$error
                            }
                        ]"
                    >
                        请输入新密码
                    </div>
                    <div
                        v-if="!$v.message.password.sameAsPassword"
                        :class="[
                            'colorRead',
                            {
                                'form-group__message': !$v.message.password
                                    .$error
                            }
                        ]"
                    >
                        新密码不能与旧密码一致
                    </div>
                </el-col>
            </el-row>

            <div slot="footer" class="dialog-footer text-center">
                <el-button @click="cancle()">取 消</el-button>
                <el-button type="primary" @click="changPassword()"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>
<script>
import {
    required,
    not,
    sameAs,
} from "vuelidate/lib/validators";
import _ from "lodash";
let searchResult = false;
function withMessage(search) {
    return search;
}
export default {
    data() {
        return {
            currentPage: 1,
            pagesize: 8,
            tableData: [],
            changPasswordDialog: false,
            selectId: "", //修改密码的id
            message: {
                repeatPassword: "",
                password: ""
            },
            searchResult: true //后端返回后验证
        };
    },
    validations: {
        message: {
            repeatPassword: {
                required,
                // 异步验证
                //等待后端返回结果后验证
                async isUnique(value) {
                    if (!value) {
                        return true;
                    }
                    return this.searchResult;
                }
            },
            password: {
                required,
                sameAsPassword: not(sameAs("repeatPassword"))
            }
        }
    },
    created() {
        this.getUserList();
        this.debouncedGetAnswer = _.debounce(this.getAnswer, 500);
    },
    watch: {
        "message.repeatPassword": function(newQuestion, oldQuestion) {
            this.debouncedGetAnswer();
        }
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
         * 获取用户列表
         */
        getUserList() {
            let _this = this;
            let user = this.$store.state.userInfo;
            this.axios
                .get("/api/user/userList",{params:{
                    companyId: user.companyId
                }})
                .then(res => {
                    console.log(res);
                    _this.tableData = res.data.result;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 新增用户
         */
        addUser() {
            this.$router.push("/addUserManage");
        },
        /**
         * 编辑用户
         */
        handleClick(row) {
            let id = row._id;
            this.$router.push({ path: "/editUserInfo", query: { id } });
        },
        /**
         * 删除用户
         */
        deleteUser(row) {
            const _this = this;
            if (!this.message.repeatPassword) {
                return false;
            }
            this.axios
                .post("/api/user/deleteUserInfo", { _id: row._id })
                .then(res => {
                    _this.error.listen(res.data.msg).then(function() {
                        _this.$message({
                            message: "删除成功",
                            type: "success"
                        });
                        _this.getUserList();
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 弹出模态框
         * 获取id
         */
        openChangePassword(row) {
            this.changPasswordDialog = true;
            this.selectId = row._id;
        },
        /**
         * 检索原始密码是否正确
         * Lodash防抖动
         */
        getAnswer() {
            const _this = this;
            // 内容为空时阻止请求
            if (!this.message.repeatPassword) {
                return false;
            }
            this.axios
                .get("/api/user/searchPassword", {
                    params: {
                        _id: this.selectId,
                        oldPassword: this.message.repeatPassword
                    }
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(function() {
                        console.log(res);
                        _this.searchResult = res.data.result.vuelidate;
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 取消修改密码
         */
        cancle() {
            this.changPasswordDialog = false;
            this.message.repeatPassword = "";
            this.message.password = "";
        },
        /**
         * 修改密码
         */
        changPassword() {
            const _this = this;
            this.$v.$touch(); // 验证
            // 验证不出错（通过）
            if (!this.$v.$invalid) {
                this.axios
                    .post("/api/user/changPassword", {
                        _id: this.selectId,
                        newPassword: this.message.password
                    })
                    .then(res => {
                        _this.error.listen(res.data.msg).then(() => {
                            _this.changPasswordDialog = false; //关闭模态框
                            // 清空数据
                            _this.selectId = "";
                            _this.message.password = "";
                            _this.message.repeatPassword = "";
                            _this.$v.$reset(); // 重置验证，避免清空内容再次验证
                            _this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                        });
                    });
            }
        }
    }
};
</script>
<style scope>
.form-group__message {
    display: none;
    font-size: 12px !important;
    color: #cc3333;
}

.form-group--error input,
.form-group--error input:focus,
.form-group--error input:hover,
.form-group--error textarea {
    border-color: #cc3333;
}
</style>
