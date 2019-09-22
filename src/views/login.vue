<template>
  <div id="login-bg">
    <div id="login">
      <div class="login_info">
        <div class="text-center title">欢迎使用少烦忧</div>

        <!-- 登录 -->
        <template v-if="isLogin">
          <h2>登录</h2>
          <div class="text-left" @keyup.enter="login">
            <div>账号</div>
            <div
              :class="[
                        'm-t-sm',
                        {
                            'animated shake delay-.5s':
                                $v.login_ver.phone.$error
                        },
                        {
                            'form-group--error':
                                $v.login_ver.phone.$error
                        }
                    ]"
            >
              <el-input
                v-model="login_ver.phone"
                clearable
                placeholder="请输入手机号"
                maxlength="11"
                prefix-icon="el-icon-user-solid"
                key="login_phone"
                autocomplete="off"
              ></el-input>
              <div
                :class="[
                        'colorRead',
                        'text-right',
                        {
                            'form-group__message': !$v.login_ver
                                .phone.$error
                        }
                    ]"
                v-if="!$v.login_ver.phone.required"
              >必填项！</div>
              <div
                :class="[
                            'colorRead',
                            'text-right',
                            {
                                'form-group__message': !$v.login_ver
                                    .phone.$error
                            }
                        ]"
                v-if="!$v.login_ver.phone.phoneRegex"
              >手机格式错误！</div>
            </div>
            <div class="m-t-md">密码</div>
            <div
              :class="[
                        'm-t-sm',
                        {
                            'animated shake delay-.5s':
                                $v.login_ver.password.$error
                        },
                        {
                            'form-group--error':
                                $v.login_ver.password.$error
                        }
                    ]"
            >
              <el-input
                v-model="login_ver.password"
                type="password"
                clearable
                placeholder="请输入密码"
                prefix-icon="el-icon-lock"
                key="login_password"
                autocomplete="off"
              ></el-input>
              <div
                :class="[
                            'colorRead',
                            'text-right',
                            {
                                'form-group__message': !$v.login_ver
                                    .password.$error
                            }
                        ]"
                v-if="!$v.login_ver.password.required"
              >必填项！</div>
              <div
                :class="[
                            'colorRead',
                            'text-right',
                            {
                                'form-group__message': !$v.login_ver
                                    .password.$error
                            }
                        ]"
                v-if="!$v.login_ver.password.minLength"
              >输入长度不能小于6！</div>
            </div>
            <div style="font-size:12px;margin-top:5px">
              <el-checkbox size="mini" v-model="checked">
                <span style="font-size:12px">记住密码</span>
              </el-checkbox>
              <span class="pull-right">
                <a href="#">忘记密码？</a>
              </span>
            </div>
            <div class="m-t-md">
              <el-button class="login_btn" type="button" round @click="login()">登录</el-button>
            </div>
            <div style="font-size:12px;margin-top:5px" class="text-center">
              <a href="#" @click="goToRegiter()">立即注册</a>
            </div>
          </div>
        </template>

        <!-- 注册 -->
        <template v-else>
          <h2>注册</h2>
          <div class="text-left" @keyup.enter="commitRegister">
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
              >必填项！</div>
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
              >手机格式错误！</div>
            </div>
            <div class="m-t-md">公司</div>
            <div
              :class="[
                        'm-t-sm',
                        {
                            'animated shake delay-.5s':
                                $v.register_ver.companyName.$error
                        },
                        {
                            'form-group--error':
                                $v.register_ver.companyName.$error
                        }
                    ]"
            >
              <el-input
                v-model="register_ver.companyName"
                clearable
                placeholder="请输入公司名称"
                maxlength="16"
                prefix-icon="el-icon-office-building"
                key="login_companyName"
                autocomplete="off"
              ></el-input>
              <div
                :class="[
                            'colorRead',
                            'text-right',
                            {
                                'form-group__message': !$v.register_ver
                                    .companyName.$error
                            }
                        ]"
                v-if="!$v.register_ver.companyName.required"
              >必填项！</div>
              <div
                :class="[
                            'colorRead',
                            'text-right',
                            {
                                'form-group__message': !$v.register_ver
                                    .companyName.$error
                            }
                        ]"
                v-if="!$v.register_ver.companyName.maxLength"
              >名称长度小于16！</div>
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
              >必填项！</div>
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
              >邮箱格式错误！</div>
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
              >必填项！</div>
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
              >输入长度不能小于6！</div>
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
              >必填项！</div>
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
              >输入长度不能小于6！</div>
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
              >密码不一致！</div>
            </div>
            <div class="m-t-md">
              <el-button class="register_btn" @click="commitRegister()" type="button" round>注册</el-button>
            </div>
            <div style="font-size:12px;margin-top:5px" class="text-center">
              <a href="#" @click="goToLogin()">立即登录</a>
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
  maxLength,
  email
} from "vuelidate/lib/validators";
import { regex } from "vuelidate/lib/validators/common";
const phoneRegex = regex("phoneNumber", /^1(3|4|5|7|8)\d{9}$/); // 手机号码校验

export default {
  data() {
    return {
      isLogin: true,
      checked: false,
      login_ver: {
        phone: "",
        password: ""
      },
      register_ver: {
        email: "",
        phone: "",
        password: "",
        companyName: "",
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
      companyName: {
        required,
        maxLength: maxLength(16)
      },
      repeatPassword: {
        required,
        minLength: minLength(6),
        sameAsPassword: sameAs("password")
      }
    }
  },
  created() {
    let remeber = JSON.parse(localStorage.getItem("remeberPassword"));
    if (remeber) {
      this.checked = true;
      this.login_ver.phone = remeber.phone;
      this.login_ver.password = remeber.password;
    }
  },
  methods: {
    /**
     * 跳转到注册
     */
    goToRegiter() {
      this.isLogin = false;
      this.$v.login_ver.$reset();
      for (let i in this.login_ver) {
        this.login_ver[i] = "";
      }
    },
    /**
     * 跳转到登录
     */
    goToLogin() {
      this.isLogin = true;
      this.$v.register_ver.$reset();
      //   清空内容
      for (let i in this.register_ver) {
        this.register_ver[i] = "";
      }
    },
    /**
     * 账号注册
     * 数据校验
     */
    commitRegister() {
      let _this = this;
      this.$v.register_ver.$touch(); // 验证
      // 验证不出错（通过）
      if (!this.$v.register_ver.$invalid) {
        this.axios
          .post("/api/register", this.register_ver)
          .then(res => {
            _this.error.listen(res.data.msg).then(() => {
              _this.isLogin = true;
              this.$v.register_ver.$reset();
              //   清空内容
              for (let i in this.register_ver) {
                this.register_ver[i] = "";
              }
              _this.$message({
                message: "注册成功",
                type: "success"
              });
            });
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    /**
     * 登录
     */
    login() {
      let _this = this;
      this.$v.login_ver.$touch(); // 验证
      // 验证不出错（通过）
      if (!this.$v.login_ver.$invalid) {
        this.axios
          .post("/api/login", this.login_ver)
          .then(res => {
            _this.error.listen(res.data.msg).then(() => {
              // 将用户信息加入缓存，浏览器关闭清除
              sessionStorage.setItem(
                "userInfo",
                JSON.stringify(res.data.result)
              );
              // 记住账号、密码
              if (_this.checked) {
                localStorage.setItem(
                  "remeberPassword",
                  JSON.stringify({
                    phone: _this.login_ver.phone,
                    password: _this.login_ver.password
                  })
                );
              } else {
                localStorage.removeItem("remeberPassword");
              }
              sessionStorage.removeItem("histroyRouter");
              _this.$router.push("/Home");
              _this.$message({
                type: "success",
                message: "登录成功"
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
  max-height: 800px;
  background-color: #fff;
  border: 1px solid #fff;
  border-radius: 4px;
}
.login_btn,
.register_btn {
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
.register_btn:hover,
.register_btn,
.login_btn:hover,
.login_btn {
  color: #fff !important;
}
</style>