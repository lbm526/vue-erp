<template>
  <div class="i-conten">
    <div id="addIncome" class="warpper">
      <div class="m-b-md">
        <el-divider content-position="center">
          <h3>新增支出明细</h3>
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
                                    $v.message.name.$error
                            },
                            { 'form-group--error': $v.message.name.$error }
                        ]"
          >
            <i class="colorRead">*</i>
            <label :class="{ colorRead: $v.message.name.$error }">名称：</label>
            <el-input
              v-model="$v.message.name.$model"
              class="inline-block w80"
              placeholder="请输入名称"
              @blur="$v.message.name.$touch()"
              clearable
            ></el-input>
            <div
              :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.name
                                        .$error
                                }
                            ]"
              v-if="!$v.message.name.required"
            >必填项！</div>
          </el-col>
        </el-row>
        <el-row class="m-t-sm">
          <el-col
            :md="12"
            :push="6"
            :class="[
                            'text-right',
                            {
                                'animated shake delay-.5s':
                                    $v.message.money.$error
                            },
                            { 'form-group--error': $v.message.money.$error }
                        ]"
          >
            <i class="colorRead">*</i>
            <label :class="{ colorRead: $v.message.money.$error }">金额：</label>
            <el-input
              v-model.number="$v.message.money.$model"
              type="number"
              class="inline-block w80"
              placeholder="请输入金额"
              @blur="$v.message.money.$touch()"
              clearable
            ></el-input>
            <div
              :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.money
                                        .$error
                                }
                            ]"
              v-if="!$v.message.money.required"
            >必填项！</div>
          </el-col>
        </el-row>
        <el-row class="m-t-sm">
          <el-col
            :md="12"
            :push="6"
            :class="[
                            'text-right',
                            {
                                'animated shake delay-.5s':
                                    $v.message.reason.$error
                            },
                            { 'form-group--error': $v.message.reason.$error }
                        ]"
          >
            <i class="colorRead">*</i>
            <label :class="{ colorRead: $v.message.reason.$error }">支出原因：</label>
            <el-input
              v-model="$v.message.reason.$model"
              @blur="$v.message.reason.$touch()"
              class="inline-block w80 customer"
              placeholder="请输入支出原因"
              type="textarea"
              :rows="3"
              clearable
            ></el-input>
            <div
              :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.reason
                                        .$error
                                }
                            ]"
              v-if="!$v.message.reason.required"
            >必填项！</div>
          </el-col>
        </el-row>
        <el-row class="m-t-sm">
          <el-col
            :md="12"
            :push="6"
            :class="[
                            'text-right',
                            {
                                'animated shake delay-.5s':
                                    $v.message.payPerson.$error
                            },
                            {
                                'form-group--error': $v.message.payPerson.$error
                            }
                        ]"
          >
            <i class="colorRead">*</i>
            <label
              :class="{
                                colorRead: $v.message.payPerson.$error
                            }"
            >出纳人：</label>
            <el-input
              v-model.trim="$v.message.payPerson.$model"
              class="inline-block w80"
              placeholder="请输入出纳人名称"
              @blur="$v.message.payPerson.$touch()"
              clearable
            ></el-input>
            <div
              :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.payPerson
                                        .$error
                                }
                            ]"
              v-if="!$v.message.payPerson.required"
            >必填项！</div>
          </el-col>
        </el-row>
      </div>
      <el-row class="m-t-sm">
        <el-col :md="12" :push="6" class="text-right">
          <label>备注：</label>
          <el-input
            v-model="message.mark"
            class="inline-block w80 customer"
            placeholder="请输入备注"
            type="textarea"
            :rows="3"
            clearable
          ></el-input>
        </el-col>
      </el-row>
      <div class="text-center mt70 m-t-md">
        <el-button @click="$router.go(-1)">取消</el-button>
        <el-button type="primary" @click="submitUser()">提交</el-button>
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
        name: "",
        money: "",
        mark: "",
        payPerson: "",
        reason: ""
      }
    };
  },
  validations: {
    message: {
      name: {
        required
      },
      money: {
        required
      },
      payPerson: {
        required
      },
      reason: {
        required
      }
    }
  },
  methods: {
    /**
     * 新增收入明细
     */
    submitUser() {
      const _this = this;
      let user = this.$store.state.userInfo;
      let opt = {
        companyId: user.companyId
      };
      this.$v.$touch(); // 验证
      // 验证不出错（通过）
      if (!this.$v.$invalid) {
        Object.assign(opt, this.message);
        this.axios
          .post("/api/incomeAndPay/addPay", opt)
          .then(res => {
            _this.error.listen(res.data.msg).then(() => {
              _this.$router.push("/incomeAndPay");
              _this.$message({
                type: "success",
                message: "添加成功"
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
.customer {
  vertical-align: top;
}
</style>