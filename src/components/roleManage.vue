<template>
    <div class="i-conten">
        <div id="roleManage" class="warpper">
            <!-- 用户管理 -->
            <el-button
                type="primary"
                size="small"
                @click="dialogFormVisible = true"
            >
                <i class="el-icon-plus"></i>
                添加角色
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
                    <el-table-column prop="roleId" label="ID">
                    </el-table-column>
                    <el-table-column prop="roleName" label="角色名">
                    </el-table-column>
                    <el-table-column prop="createDate" label="添加时间">
                    </el-table-column>
                    <el-table-column
                        align="center"
                        fixed="right"
                        label="操作"
                        width="240"
                    >
                        <template slot-scope="scope">
                            <el-button
                                @click="editClick(scope.row)"
                                type="primary"
                                plain
                                size="small"
                                >编辑</el-button
                            >
                            <el-button
                                type="danger"
                                plain
                                size="small"
                                @click="deleteRole(scope.row)"
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

            <!-- 添加模态框 -->
            <el-dialog
                title="添加角色"
                :visible.sync="dialogFormVisible"
                :close-on-click-modal="false"
            >
                <el-form
                    :model="ruleForm"
                    :rules="rules"
                    ref="ruleForm"
                    @submit.native.prevent
                >
                    <el-form-item
                        label="角色名称"
                        :label-width="formLabelWidth"
                        prop="roleName"
                    >
                        <el-input
                            v-model="ruleForm.roleName"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="dialogFormVisible = false"
                        >取 消</el-button
                    >
                    <el-button type="primary" @click="onSubmit('ruleForm')"
                        >确 定</el-button
                    >
                </div>
            </el-dialog>
            <!-- 修改模态框 -->
            <el-dialog
                title="添加角色"
                :visible.sync="editRoleDialog"
                :close-on-click-modal="false"
            >
                <el-form
                    :model="editRoleName"
                    :rules="rulesForeditRoleName"
                    ref="editRoleName"
                    @submit.native.prevent
                >
                    <el-form-item
                        label="角色名称"
                        :label-width="formLabelWidth"
                        prop="roleName"
                    >
                        <el-input
                            v-model="editRoleName.roleName"
                            autocomplete="off"
                        ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="editRoleDialog = false">取 消</el-button>
                    <el-button type="primary" @click="editRole('editRoleName')"
                        >确 定</el-button
                    >
                </div>
            </el-dialog>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            dialogFormVisible: false,
            editRoleDialog: false,
            roleId: "", //角色id
            ruleForm: {
                roleName: ""
            },
            rules: {
                roleName: [
                    {
                        required: true,
                        message: "请填写角色名称",
                        trigger: "change"
                    }
                ]
            },
            formLabelWidth: "120px",
            currentPage: 1,
            pagesize: 8,
            tableData: [],
            editRoleName: {
                roleName: ""
            },
            rulesForeditRoleName: {
                roleName: [
                    {
                        required: true,
                        message: "请填写角色名称",
                        trigger: "change"
                    }
                ]
            }
        };
    },
    created() {
        this.getRoleList();
    },
    mounted() {},
    methods: {
        // 初始页currentPage、初始每页数据数pagesize和数据data
        handleSizeChange: function(size) {
            this.pagesize = size;
        },
        handleCurrentChange: function(currentPage) {
            this.currentPage = currentPage;
        },
        giveCharData(index) {
            // 阻止重复点击
            if (this.currentSort === index) {
                return false;
            }
            this.currentSort = index;
        },

        // 获取角色列表
        getRoleList() {
            let user = this.$store.state.userInfo;
            const _this = this;
            this.axios
                .get("/api/roleManage/roleList",{params:{
                    companyId: user.companyId
                }})
                .then(res => {
                    _this.error.listen(res.data.msg).then(function() {
                        console.log("角色列表", res);
                        _this.tableData = res.data.result;
                    });
                })
                .catch(err => {
                    console.log("错误", err);
                });
        },
        // 添加角色
        onSubmit(formName) {
            const user = this.$store.state.userInfo;
            const _this = this;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios
                        .post("/api/roleManage/addRole", {
                            roleName: _this.ruleForm.roleName,
                            companyId: user.companyId
                        })
                        .then(res => {
                            console.log(res);
                            _this.error.listen(res.data.msg).then(function() {
                                _this.dialogFormVisible = false;
                                _this.getRoleList();
                                _this.ruleForm.roleName = "";
                                _this.$message({
                                    message: "添加成功",
                                    type: "success"
                                });
                            });
                        })
                        .catch(err => {
                            _this.$message({
                                message: "添加失败，请检查网络或重试！",
                                type: "error"
                            });
                        });
                } else {
                    console.log("error submit!!");
                    return false;
                }
            });
        },
        // 点击表格编辑按钮
        editClick(row) {
            this.roleId = row.roleId;
            this.editRoleDialog = true;
        },
        // 修改角色名称
        // @parmas roleId、roleName
        editRole(formName) {
            const _this = this;
            this.$refs[formName].validate(valid => {
                if (valid) {
                    this.axios
                        .post("/api/roleManage/editRole", {
                            roleName: _this.editRoleName.roleName,
                            roleId: _this.roleId
                        })
                        .then(res => {
                            _this.error.listen(res.data.msg).then(function() {
                                _this.editRoleDialog = false;
                                _this.getRoleList();
                                _this.editRoleName.roleName = "";
                                _this.$message({
                                    message: "修改成功",
                                    type: "success"
                                });
                            });
                        })
                        .catch(err => console.log(err));
                } else {
                    return false;
                }
            });
        },

        // 删除角色
        // @parmas roleId
        deleteRole(row) {
            this.roleId = row.roleId;
            let _this = this;
            this.$confirm("确认删除角色？", "温馨提示", {
                distinguishCancelAndClose: true,
                type: "warning",
                center: true,
                confirmButtonText: "保存",
                cancelButtonText: "取消"
            })
                .then(() => {
                    this.axios
                        .post("/api/roleManage/deleteRole", {
                            roleId: _this.roleId
                        })
                        .then(res => {
                            _this.error.listen(res.data.msg).then(() => {
                                _this.getRoleList();
                                _this.$message({
                                    message: "删除成功",
                                    type: "success"
                                });
                            });
                        })
                        .catch(err => {
                            console.log(err);
                        });
                })
                .catch(() => {});
        }
    }
};
</script>
<style scoped>
</style>
