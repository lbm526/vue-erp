<template>
    <div id="login-bg">
        <div id="login">
            <div class="login_info">
                <div class="text-center title">欢迎使用少烦忧</div>

                <!-- 登录 -->
                <template v-if="isLogin">
                    <h2>登录</h2>
                    <div class="text-left">
                        <div>账号</div>
                        <div class="m-t-sm">
                            <el-input
                                v-model="phone"
                                clearable
                                placeholder="请输入手机号"
                                maxlength="11"
                                prefix-icon="el-icon-user-solid"
                                key="login_phone"
                                autocomplete="off"
                            ></el-input>
                        </div>
                        <div class="m-t-md">密码</div>
                        <div class="m-t-sm">
                            <el-input
                                v-model="password"
                                type="password"
                                clearable
                                placeholder="请输入密码"
                                prefix-icon="el-icon-lock"
                                key="login_password"
                                autocomplete="off"
                            ></el-input>
                        </div>
                        <div style="font-size:12px;margin-top:5px">
                            <el-checkbox size="mini" v-model="checked"
                                ><span style="font-size:12px"
                                    >记住密码</span
                                ></el-checkbox
                            >
                            <span class="pull-right"
                                ><a href="#">忘记密码？</a></span
                            >
                        </div>
                        <div class="m-t-md">
                            <el-button class="login_btn" type="button" round
                                >登录</el-button
                            >
                        </div>
                        <div
                            style="font-size:12px;margin-top:5px"
                            class="text-center"
                        >
                            <a href="#" @click="isLogin = false">立即注册</a>
                        </div>
                    </div>
                </template>

                <!-- 注册 -->
                <template v-else>
                    <h2>注册</h2>
                    <div class="text-left">
                        <div>账号</div>
                        <div
                            :class="[
                                'm-t-sm',
                                {
                                    'animated shake delay-.5s':
                                        $v.register_ver.phone.$error
                                },
                                {
                                    'form-group--error':
                                        $v.register_ver.phone.$error
                                }
                            ]"
                        >
                            <el-input
                                v-model="register_ver.phone"
                                clearable
                                placeholder="请输入手机号"
                                maxlength="11"
                                prefix-icon="el-icon-user-solid"
                                key="register_phone"
                                autocomplete="off"
                            ></el-input>
                            <div
                                :class="[
                                    'colorRead',
                                    'text-right',
                                    {
                                        'form-group__message': !$v.register_ver
                                            .phone.$error
                                    }
                                ]"
                                v-if="!$v.register_ver.phone.required"
                            >
                                必填项！
                            </div>
                            <div
                                :class="[
                                    'colorRead',
                                    'text-right',
                                    {
                                        'form-group__message': !$v.register_ver
                                            .phone.$error
                                    }
                                ]"
                                v-if="!$v.register_ver.phone.phoneRegex"
                            >
                                手机格式错误！
                            </div>
                        </div>
                        <div class="m-t-md">邮箱</div>
                        <div
                            :class="[
                                'm-t-sm',
                                {
                                    'animated shake delay-.5s':
                                        $v.register_ver.email.$error
                                },
                                {
                                    'form-group--error':
                                        $v.register_ver.email.$error
                                }
                            ]"
                        >
                            <el-input
                                v-model="register_ver.email"
                                clearable
                                placeholder="请输入邮箱"
                                maxlength="11"
                                prefix-icon="el-icon-message"
                                key="login_email"
                                autocomplete="off"
                            ></el-input>
                            <div
                                :class="[
                                    'colorRead',
                                    'text-right',
                                    {
                                        'form-group__message': !$v.register_ver
                                            .email.$error
                                    }
                                ]"
                                v-if="!$v.register_ver.email.required"
                            >
                                必填项！
                            </div>
                            <div
                                :class="[
                                    'colorRead',
                                    'text-right',
                                    {
                                        'form-group__message': !$v.register_ver
                                            .email.$error
                                    }
                                ]"
                                v-if="!$v.register_ver.email.email"
                            >
                                邮箱格式错误！
                            </div>
                        </div>
                        <div class="m-t-md">密码</div>
                        <div
                            :class="[
                                'm-t-sm',
                                {
                                    'animated shake delay-.5s':
                                        $v.register_ver.password.$error
                                },
                                {
                                    'form-group--error':
                                        $v.register_ver.password.$error
                                }
                            ]"
                        >
                            <el-input
                                v-model="register_ver.password"
                                type="password"
                                clearable
                                placeholder="请输入密码"
                                prefix-icon="el-icon-lock"
                                key="register_password"
                                autocomplete="off"
                                :show-password="true"
                            ></el-input>
                            <div
                                :class="[
                                    'colorRead',
                                    'text-right',
                                    {
                                        'form-group__message': !$v.register_ver
                                            .password.$error
                                    }
                                ]"
                                v-if="!$v.register_ver.password.required"
                            >
                                必填项！
                            </div>
                            <div
                                :class="[
                                    'colorRead',
                                    'text-right',
                                    {
                                        'form-group__message': !$v.register_ver
                                            .password.$error
                                    }
                                ]"
                                v-if="!$v.register_ver.password.minLength"
                            >
                                输入长度不能小于6！
                            </div>
                        </div>
                        <div class="m-t-md">再次输入密码</div>
                        <div
                            :class="[
                                'm-t-sm',
                                {
                                    'animated shake delay-.5s':
                                        $v.register_ver.repeatPassword.$error
                                },
                                {
                                    'form-group--error':
                                        $v.register_ver.repeatPassword.$error
                                }
                            ]"
                        >
                            <el-input
                                v-model="register_ver.repeatPassword"
                                type="password"
                                clearable
                                placeholder="请再次输入密码"
                                prefix-icon="el-icon-lock"
                                key="register_password1"
                                autocomplete="off"
                                :show-password="true"
                            ></el-input>
                            <div
                                :class="[
                                    'colorRead',
                                    'text-right',
                                    {
                                        'form-group__message': !$v.register_ver
                                            .repeatPassword.$error
                                    }
                                ]"
                                v-if="!$v.register_ver.repeatPassword.required"
                            >
                                必填项！
                            </div>
                            <div
                                :class="[
                                    'colorRead',
                                    'text-right',
                                    {
                                        'form-group__message': !$v.register_ver
                                            .repeatPassword.$error
                                    }
                                ]"
                                v-if="!$v.register_ver.repeatPassword.minLength"
                            >
                                输入长度不能小于6！
                            </div>
                            <div
                                :class="[
                                    'colorRead',
                                    'text-right',
                                    {
                                        'form-group__message': !$v.register_ver
                                            .repeatPassword.$error
                                    }
                                ]"
                                v-if="
                                    !$v.register_ver.repeatPassword
                                        .sameAsPassword
                                "
                            >
                                密码不一致！
                            </div>
                        </div>
                        <div class="m-t-md">
                            <el-button
                                class="register_btn"
                                @click="commitRegister()"
                                type="button"
                                round
                                >注册</el-button
                            >
                        </div>
                        <div
                            style="font-size:12px;margin-top:5px"
                            class="text-center"
                        >
                            <a href="#" @click="isLogin = true">立即登录</a>
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import {
    required,
    not,
    sameAs,
    minLength,
    email
} from "vuelidate/lib/validators";
import { regex } from "vuelidate/lib/validators/common";
const phoneRegex = regex("phoneNumber", /^1(3|4|5|7|8)\d{9}$/); // 手机号码校验

export default {
    data() {
        return {
            isLogin: false,
            checked: false,
            login_ver: {
                phone: "",
                password: ""
            },
            register_ver: {
                email: "",
                phone: "",
                password: "",
                repeatPassword: ""
            }
        };
    },
    validations: {
        //  登录验证
        login_ver: {
            phone: {
                required,
                phoneRegex
            },
            password: {
                required,
                minLength: minLength(6)
            }
        },
        // 注册验证
        register_ver: {
            email: {
                required,
                email
            },
            phone: {
                required,
                phoneRegex
            },
            password: {
                required,
                minLength: minLength(6)
            },
            repeatPassword: {
                required,
                minLength: minLength(6),
                sameAsPassword: sameAs("password")
            }
        }
    },
    created() {},
    methods: {
        /**
         * 账号注册
         * 数据校验
         */
        commitRegister() {
            this.$v.$touch(); // 验证
            // 验证不出错（通过）
            if (!this.$v.$invalid) {
            }
        }
    }
};
</script>
<style scoped>
#login-bg {
    position: relative;
    width: 100%;
    height: 100%;
    background: url(../assets/images/login_background.jpg) 0 0 no-repeat;
    background-size: 100% 100%;
}
#login {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.title {
    font-size: 22px;
    margin-bottom: 40px;
}
.login_info {
    text-align: center;
    padding: 20px 20px;
    min-width: 25%;
    min-height: 450px;
    max-height: 600px;
    background-color: #fff;
    border: 1px solid #fff;
    border-radius: 4px;
}
.login_btn,
.register_btn{
    color: #fff;
    width: 100%;
    transition: all 2s;
    background: linear-gradient(to right, #17c6e1, #e911fd);
}
a:hover {
    color: #409eff;
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
<style>
.el-checkbox__inner {
    font-size: 12px !important;
    width: 12px !important;
    height: 12px !important;
}
.el-button:hover,.el-button {
    color: #fff !important;
}
</style>