<template>
    <div class="i-conten">
        <div class="warpper" id="editMaterial">
            <div class="m-b-md">
                <el-divider content-position="center">
                    <h3>修改原料信息</h3>
                </el-divider>
            </div>
            <el-row>
                <el-col
                    :md="12"
                    :push="6"
                    :class="[
                        'text-right',
                        {
                            'animated shake delay-.5s':
                                $v.message.material.$error
                        },
                        { 'form-group--error': $v.message.material.$error }
                    ]"
                >
                    <i class="colorRead">* </i>
                    <label :class="{ colorRead: $v.message.material.$error }"
                        >原料名称：</label
                    >
                    <el-input
                        v-model="$v.message.material.$model"
                        class="inline-block w80"
                        placeholder="请输入原料名称"
                        @blur="$v.message.material.$touch()"
                        clearable
                    ></el-input>
                    <div
                        :class="[
                            'colorRead',
                            {
                                'form-group__message': !$v.message.material
                                    .$error
                            }
                        ]"
                        v-if="!$v.message.material.required"
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
            <el-row class="m-t-sm">
                <el-col
                    :md="12"
                    :push="6"
                    :class="[
                        'text-right',
                        {
                            'animated shake delay-.5s':
                                $v.message.purpose.$error
                        },
                        { 'form-group--error': $v.message.purpose.$error }
                    ]"
                >
                    <i class="colorRead">* </i>
                    <label :class="{ colorRead: $v.message.purpose.$error }"
                        >用途：</label
                    >
                    <el-input
                        v-model="$v.message.purpose.$model"
                        class="inline-block w80 customer"
                        placeholder="请输入用途"
                        type="textarea"
                        :rows="2"
                        @blur="$v.message.purpose.$touch()"
                        clearable
                    ></el-input>
                    <div
                        :class="[
                            'colorRead',
                            {
                                'form-group__message': !$v.message.purpose
                                    .$error
                            }
                        ]"
                        v-if="!$v.message.purpose.required"
                    >
                        必填项！
                    </div>
                </el-col>
            </el-row>
            <el-row class="m-t-sm">
                <el-col
                    :md="12"
                    :push="6"
                    class="text-right"
                >
                    <label
                        >备注：</label
                    >
                    <el-input
                        v-model="message.mark"
                        class="inline-block w80 customer"
                        placeholder="请输入备注"
                        type="textarea"
                        :rows="2"
                        clearable
                    ></el-input>
                </el-col>
            </el-row>
            <div class="text-center todoButton">
                <el-button @click="goBack()">取消</el-button>
                <el-button type="primary" @click="keepMaterial()"
                    >录入</el-button
                >
            </div>
        </div>
    </div>
</template>
<script>
import { required } from "vuelidate/lib/validators";

export default {
    data() {
        return {
            message: {
                material: "",
                hasNumber: "",
                purpose: "",
                author: "",
                mark: "",
                distributeState: 0,
                purchaseState: "",
                storeState: "",
                receiveTime: "",
                distributeTime: "",
                purchaseTime: "",
                storeTime: "",
                distributePerson: "",
                receivePerson: "",
                purchasePerson: "",
                storePerson: ""
            }
        };
    },
    validations: {
        message: {
            material: { required },
            hasNumber: { required },
            purpose: { required }
        }
    },
    created(){
        this.getMaterialById();
    },
    methods: {
        goBack() {
            window.history.go(-1);
        },
        /**
         * 根据id获取原料信息
         */
        getMaterialById(){
            let _id = this.$route.query.id;
            console.log(_id)
            let _this = this;
            this.axios.get('/api/material/getMaterById',{
                params: {
                    _id
                }
            }).then(res => {
                _this.error.listen(res.data.msg).then(() => {
                    console.log('原料信息',res);
                    _this.message = res.data.result;
                })
            })
            .catch(err => {
                console.log(err);
            })
        },
        /**
         * 提交原料信息
         */
        keepMaterial() {
             const _this = this;
            this.$v.$touch(); // 验证
            // 验证不出错（通过）
            if (!this.$v.$invalid) {
                this.message.author = this.$store.state.userInfo.userName;
                this.axios.post('/api/material/editMaterialInfo',this.message)
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        _this.$message({
                            type: 'success',
                            message: '录入成功'
                        })
                        _this.$router.push('/materialHome');
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
#addMaterial {
    padding: 50px 80px;
}
.todoButton {
    margin-top: 50px;
}
.customer{
    vertical-align: top
}
</style>
