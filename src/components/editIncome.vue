<template>
    <div class="i-conten">
        <div id="editIncome" class="warpper">
            <div class="m-b-md">
                <el-divider content-position="center">
                    <h3>修改收入明细</h3>
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
                        <i class="colorRead">* </i>
                        <label :class="{ colorRead: $v.message.name.$error }"
                            >名称：</label
                        >
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
                        >
                            必填项！
                        </div>
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
                        <i class="colorRead">* </i>
                        <label :class="{ colorRead: $v.message.money.$error }"
                            >金额：</label
                        >
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
                        >
                            必填项！
                        </div>
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
                                    $v.message.price.$error
                            },
                            { 'form-group--error': $v.message.price.$error }
                        ]"
                    >
                        <i class="colorRead">* </i>
                        <label :class="{ colorRead: $v.message.price.$error }"
                            >单价：</label
                        >
                        <el-input
                            v-model.number="$v.message.price.$model"
                            type="number"
                            class="inline-block w80"
                            placeholder="请输入单价"
                            @blur="$v.message.price.$touch()"
                            clearable
                        ></el-input>
                        <div
                            :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.price
                                        .$error
                                }
                            ]"
                            v-if="!$v.message.price.required"
                        >
                            必填项！
                        </div>
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
                                    $v.message.number.$error
                            },
                            { 'form-group--error': $v.message.number.$error }
                        ]"
                    >
                        <i class="colorRead">* </i>
                        <label :class="{ colorRead: $v.message.number.$error }"
                            >数量：</label
                        >
                        <el-input
                            v-model.number="$v.message.number.$model"
                            type="number"
                            class="inline-block w80"
                            placeholder="请输入数量"
                            @blur="$v.message.number.$touch()"
                            clearable
                        ></el-input>
                        <div
                            :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.number
                                        .$error
                                }
                            ]"
                            v-if="!$v.message.number.required"
                        >
                            必填项！
                        </div>
                    </el-col>
                </el-row>
                <el-row class="m-t-sm">
                    <el-col :md="12" :push="6" class="text-right">
                        <label>客户：</label>
                        <el-input
                            v-model="message.customer"
                            class="inline-block w80"
                            placeholder="请输入客户名称"
                            clearable
                        ></el-input>
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
                                    $v.message.tell.$error
                            },
                            { 'form-group--error': $v.message.tell.$error }
                        ]"
                    >
                        <label :class="{ colorRead: $v.message.tell.$error }"
                            >手机号码：</label
                        >
                        <el-input
                            v-model="$v.message.tell.$model"
                            class="inline-block w80"
                            placeholder="请输入手机号码"
                            @blur="$v.message.tell.$touch()"
                            maxlength="11"
                            clearable
                        ></el-input>
                        <div
                            :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.tell
                                        .$error
                                }
                            ]"
                            v-if="!$v.message.tell.required"
                        >
                            手机号码错误！
                        </div>
                    </el-col>
                </el-row>
                <el-row class="m-t-sm">
                    <el-col :md="12" :push="6" class="text-right">
                        <label>地址：</label>
                        <el-input
                            v-model="message.address"
                            class="inline-block w80 customer"
                            placeholder="请输入客户地址"
                            type="textarea"
                            :rows="2"
                            clearable
                        ></el-input>
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
                                    $v.message.projectPerson.$error
                            },
                            { 'form-group--error': $v.message.projectPerson.$error }
                        ]"
                    >
                        <i class="colorRead">* </i>
                        <label :class="{ colorRead: $v.message.projectPerson.$error }"
                            >负责人：</label
                        >
                        <el-input
                            v-model.trim="$v.message.projectPerson.$model"
                            class="inline-block w80"
                            placeholder="请输入负责人名称"
                            @blur="$v.message.projectPerson.$touch()"
                            clearable
                        ></el-input>
                        <div
                            :class="[
                                'colorRead',
                                {
                                    'form-group__message': !$v.message.projectPerson
                                        .$error
                                }
                            ]"
                            v-if="!$v.message.projectPerson.required"
                        >
                            必填项！
                        </div>
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
                _id: "", //所修改收入明细id
                name: "",
                money: "",
                price: "",
                number: "",
                customer: "",
                tell: "",
                address: "",
                projectPerson: "",
                paymentTime: "",
                mark: ""
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
            price: {
                required
            },
            number: {
                required
            },
            projectPerson: {
                required
            },
            tell: {
                phoneRegex
            }
        }
    },
    created(){
        let id = this.$route.query.id;
        this.message._id = id;
        this.getIncomeInfoById();
    },
    methods: {
        /***
         * 根据id查询收入信息
         */
        getIncomeInfoById(){
            const _this = this;
            this.axios.get('/api/incomeAndPay/incomeGetById',{
                params: {
                    _id: this.message._id
                }
            }).then(res => {
                console.log('收入信息',res)
                let data = res.data.result;
                let arr = this.message;
                for(let key in arr){
                    arr[key] = data[key];
                }
            }).catch(err => {
                console.log(err);
            })
        },
        /**
         * 新增收入明细
         */
        submitUser() {
            const _this = this;
            this.$v.$touch(); // 验证
            // 验证不出错（通过）
            if (!this.$v.$invalid) {
                this.message.paymentTime = new Date();
                this.axios.post('/api/incomeAndPay/editIncome',this.message)
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        _this.$router.push('/incomeAndPay');
                        _this.$message({
                            type: 'success',
                            message: "修改成功",
                        })
                    })
                })
                .catch(err => {
                    console.log(err);
                })
            }
        }
    }
};
</script>
<style scoped>
.customer{
    vertical-align: top
}
</style>