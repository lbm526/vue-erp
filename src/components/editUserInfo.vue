<template>
    <div class="i-conten">
        <div id="editUserInfo" class="warpper">
            <div class="m-b-md">
                <el-divider content-position="center">
                    <h3>修改用户信息</h3>
                </el-divider>
            </div>
            <div>
                <el-row>
                    <el-col
                        :md="12"
                        :push="6"
                        :class="[
                            'text-right',
                            {
                                'animated shake delay-.5s':
                                    $v.message.userName.$error
                            },
                            { 'form-group--error': $v.message.userName.$error }
                        ]"
                    >
                        <i class="colorRead">* </i>
                        <label
                            :class="{ colorRead: $v.message.userName.$error }"
                            >用户名：</label
                        >
                        <el-input
                            v-model="$v.message.userName.$model"
                            class="inline-block w80"
                            placeholder="请输入用户名"
                            @blur="$v.message.userName.$touch()"
                            clearable
                        ></el-input>
                        <div
                            :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.userName
                                        .$error
                                }
                            ]"
                            v-if="!$v.message.userName.required"
                        >
                            必填项！
                        </div>
                    </el-col>
                </el-row>
                <el-row class="m-t-md">
                    <el-col
                        :md="12"
                        :push="6"
                        :class="[
                            'text-right',
                            {
                                'animated shake delay-.5s':
                                    $v.message.phone.$error
                            },
                            { 'form-group--error': $v.message.phone.$error }
                        ]"
                    >
                        <i class="colorRead">* </i>
                        <label :class="{ colorRead: $v.message.phone.$error }"
                            >账号：</label
                        >
                        <el-input
                            v-model="$v.message.phone.$model"
                            class="inline-block w80"
                            placeholder="请输入手机号码"
                            maxlength="11"
                            @blur="$v.message.userName.$touch()"
                            clearable
                        ></el-input>
                        <div
                            :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.phone
                                        .$error
                                }
                            ]"
                            v-if="!$v.message.phone.required"
                        >
                            必填项！
                        </div>
                        <div
                            :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.phone
                                        .$error
                                }
                            ]"
                            v-if="!$v.message.phone.phoneRegex"
                        >
                            请输入手机号码
                        </div>
                    </el-col>
                </el-row>
                <el-row class="m-t-md">
                    <el-col
                        :md="12"
                        :push="6"
                        :class="[
                            'text-right',
                            {
                                'animated shake delay-.5s':
                                    $v.message.email.$error
                            },
                            { 'form-group--error': $v.message.email.$error }
                        ]"
                    >
                        <i class="colorRead">* </i>
                        <label :class="{ colorRead: $v.message.email.$error }"
                            >邮箱：</label
                        >
                        <el-input
                            v-model="$v.message.email.$model"
                            class="inline-block w80"
                            placeholder="请输入邮箱"
                            @blur="$v.message.email.$touch()"
                            clearable
                        ></el-input>
                        <div
                            :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.email
                                        .$error
                                }
                            ]"
                            v-if="!$v.message.email.required"
                        >
                            必填项！
                        </div>
                        <div
                            :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.email
                                        .$error
                                }
                            ]"
                            v-if="!$v.message.email.email"
                        >
                            请输入邮箱
                        </div>
                    </el-col>
                </el-row>
                <el-row class="m-t-md">
                    <el-col
                        :md="12"
                        :push="6"
                        :class="[
                            'text-right',
                            {
                                'animated shake delay-.5s':
                                    $v.message.roleId.$error
                            },
                            { 'form-group--error': $v.message.roleId.$error }
                        ]"
                    >
                        <i class="colorRead">* </i>
                        <label :class="{ colorRead: $v.message.roleId.$error }"
                            >角色：</label
                        >
                        <el-select
                            v-model="$v.message.roleId.$model"
                            clearable
                            placeholder="请选择角色"
                            @change="$v.message.roleId.$touch()"
                            class="inline-block w80"
                        >
                            <el-option
                                v-for="item in roleList"
                                :key="item.roleName"
                                :label="item.roleName"
                                :value="item.roleId"
                            >
                            </el-option>
                        </el-select>
                        <div
                            :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.roleId
                                        .$error
                                }
                            ]"
                            v-if="!$v.message.roleId.required"
                        >
                            必填项！
                        </div>
                    </el-col>
                </el-row>
            </div>
            <div class="text-center mt70">
                <el-button @click="$router.go(-1)">取消</el-button>
                <el-button type="primary" @click="submitUser()">修改</el-button>
            </div>
        </div>
    </div>
</template>
<script>
import { required, email, sameAs } from "vuelidate/lib/validators";
import { regex } from "vuelidate/lib/validators/common";
const phoneRegex = regex("phoneNumber", /^1(3|4|5|7|8)\d{9}$/); // 手机号码校验

export default {
    data() {
        return {
            message: {
                _id: "",
                userName: "",
                phone: "",
                email: "",
                roleId: ""
            },
            roleList: [] //角色数组
            // vuelidate验证内容
        };
    },
    validations: {
        message: {
            userName: {
                required
            },
            phone: {
                required,
                phoneRegex
            },
            email: {
                required,
                email
            },
            roleId: {
                required
            }
        }
    },
    created() {
        let id = this.$route.query.id;
        this.getRoleList();
        this.getUserInfo(id);
    },
    mounted() {
        this.message._id = this.$route.query.id;
    },
    methods: {
        // 获取角色信息
        getRoleList() {
            let _this = this;
            this.axios
                .get("/api/roleManage/roleList")
                .then(res => {
                    console.log("角色列表", res);
                    _this.roleList = res.data.result || [];
                })
                .catch(err => {
                    console.log(err);
                });
        },
        //获取用户信息
        getUserInfo(id) {
            let _this = this;
            this.axios
                .get("/api/user/findUserInfo", {
                    params: {
                        _id: id
                    }
                })
                .then(res => {
                    console.log("用户信息", res);
                    for (let key in _this.message) {
                        _this.message[key] = res.data.result[key];
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        },
        // 修改用户信息
        submitUser() {
            const _this = this;
            this.$v.$touch(); // 验证
            // 验证不出错（通过）
            if (!this.$v.$invalid) {
                this.axios
                    .post("/api/user/editUserInfo", this.message)
                    .then(res => {
                        _this.error.listen(res.data.msg).then(function() {
                            _this.$message({
                                message: "修改成功",
                                type: "success"
                            });
                            _this.$router.push("/userManage");
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
<style scope>
.mt70 {
    margin-top: 70px;
}
.form-group__message {
    display: none;
    font-size: 12px;
    color: #cc3333;
}

.form-group--error input,
.form-group--error input:focus,
.form-group--error input:hover,
.form-group--error textarea {
    border-color: #cc3333;
}
</style>