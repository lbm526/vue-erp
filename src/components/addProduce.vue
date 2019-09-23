<template>
  <div class="i-conten">
    <div id="addProduce" class="warpper">
      <el-form
        :model="produceList"
        ref="produceList"
        :rules="rules"
        enctype="multipart/form-data"
        label-width="auto"
        @submit.native.prevent
      >
        <el-row class="text-right">
          <el-col :md="8" class="padding-sm">
            <el-form-item prop="produceName">
              <i class="colorRead">*</i>
              <label>名称：</label>
              <el-input v-model="produceList.produceName" class="inline-block w80" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" class="padding-sm">
            <el-form-item prop="produceNumber">
              <i class="colorRead">*</i>
              <label>数量：</label>
              <el-input
                v-model.number="produceList.produceNumber"
                class="inline-block w80"
                clearable
                type="number"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" class="padding-sm">
            <el-form-item prop="brand">
              <i class="colorRead">*</i>
              <label>品牌：</label>
              <el-input v-model="produceList.brand" class="inline-block w80" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" class="padding-sm">
            <el-form-item prop="qualityGuaranteePeriod">
              <i class="colorRead">*</i>
              <label style="line-height:40px">保质期：</label>
              <el-input
                v-model.number="
                                    produceList.qualityGuaranteePeriod
                                "
                class="w80 vertical-middle"
                type="number"
                clearable
              >
                <template slot="append">天</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" class="padding-sm">
            <el-form-item prop="content">
              <i class="colorRead">*</i>
              <label>含量：</label>
              <el-input v-model="produceList.content" class="inline-block w80" clearable></el-input>
            </el-form-item>
          </el-col>
          <el-col :md="8" class="padding-sm">
            <el-form-item prop="completeTime" required>
              <i class="colorRead">*</i>
              <label>产品完成时间：</label>
              <el-date-picker
                v-model="produceList.completeTime"
                value-format="yyyy-MM-dd"
                type="date"
                class="inline-block w70"
                placeholder="选择日期"
              ></el-date-picker>
            </el-form-item>
          </el-col>

          <el-col :md="8" class="padding-sm text-left">
            <el-form-item>
              <label>上传工艺流程图：</label>
              <el-upload
                action
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-change="onchange2"
                :on-remove="handleRemove"
                :auto-upload="false"
                class="m-t-sm"
                :limit="1"
                :file-list="fileList"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt />
              </el-dialog>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider>
          <i class="el-icon-s-open"></i>原料
        </el-divider>
        <!-- 原料部分 -->
        <el-row>
          <el-col :md="12">
            <div class="beforeColorContains">
              <label class="beforeColor">原料列表</label>
            </div>
            <div
              v-for="(item, index) in materialData.slice(
                                (currentPage - 1) * pagesize,
                                currentPage * pagesize
                            )"
              v-bind:key="item.id"
              class="m-t-sm"
            >
              <el-checkbox v-model="item.checked" @change="selectCheckbox(index)"></el-checkbox>
              <label>{{ item.materialName }}</label>
              <el-input
                type="number"
                v-model.number="item.materialNumber"
                placeholder="请输入数量"
                :disabled="!item.checked"
                class="inline-block w80 m-l-sm"
              ></el-input>
            </div>
            <!-- 分页 -->
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[2, 4, 6, 10]"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="materialData.length"
              class="m-t-sm"
            ></el-pagination>
          </el-col>
          <el-col :md="12">
            <div class="beforeColorContains">
              <i class="colorRead">*</i>
              <label class="beforeColor">已选原料</label>
            </div>
            <el-form-item prop="materialSelect">
              <ul>
                <li
                  class="materialList pull-left"
                  v-for="item in produceList.materialSelect"
                  :key="item.id"
                >
                  <span>材料名称：{{ item.materialName }}</span>
                  <span class="m-l-md">数量：{{ item.materialNumber }}</span>
                </li>
              </ul>
            </el-form-item>
          </el-col>
        </el-row>
        <div class="text-center m-t-sm">
          <el-button type="button" @click="comeBack()">取消</el-button>
          <el-button type="primary" @click="comfirmForm('produceList')">提交</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      materialData: [],
      currentPage: 1,
      pagesize: 4,
      produceList: {
        produceName: "", //产品名称
        produceNumber: "", //数量
        brand: "", //品牌
        qualityGuaranteePeriod: "", //保质期
        content: "", //含量
        completeTime: "", //产品完成时间
        materialSelect: []
      },
      //上传工艺流程图
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      fileList: [],
      rules: {
        produceName: [
          {
            required: true,
            message: "请填写产品名称",
            trigger: "change"
          }
        ],
        produceNumber: [
          {
            required: true,
            message: "请填写数量",
            trigger: "change",
            type: "number"
          }
        ],
        brand: [
          {
            required: true,
            message: "请填写品牌",
            trigger: "change"
          }
        ],
        qualityGuaranteePeriod: [
          {
            required: true,
            message: "请填写保质期",
            trigger: "change",
            type: "number"
          }
        ],
        content: [
          {
            required: true,
            message: "请填写含量",
            trigger: "change"
          }
        ],
        completeTime: [
          {
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        materialSelect: [
          {
            required: true,
            message: "请选择原料",
            trigger: "change"
          }
        ]
      },
      param: new FormData()
    };
  },
  created() {
    this.getMaterialList();
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
    //上传图纸函数
    handleRemove(file) {
      console.log(file);
      this.param.delete("file");
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      file.url = "";
      console.log(file);
    },
    onchange2(file, filesList) {
      console.log(file, filesList);
      this.param.append("file", file.raw);
    },
    /**获取材料仓库列表*/
    getMaterialList() {
      let _this = this;
      this.axios("/api/material/getMaterialList", {
        storeState: 1
      })
        .then(res => {
          _this.error.listen(res.data.msg).then(() => {
            console.log("仓库列表", res);
            let data = res.data.result;
            if (data && data.length > 0) {
              for (let i = 0; i < data.length; i++) {
                let opt = {};
                opt["id"] = data[i]._id;
                opt["materialNumber"] = data[i].hasNumber;
                opt["materialName"] = data[i].material;
                opt["checked"] = false;
                _this.materialData.push(opt);
              }
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 返回
    comeBack() {
      this.$router.go(-1);
    },
    // 提交表单
    comfirmForm(formName) {
      let _this = this;
      let user = this.$store.state.userInfo;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.param.append('companyId', JSON.stringify(user.companyId));
          for (let key in this.produceList) {
            this.param.append(key, JSON.stringify(this.produceList[key]));
          }
          let config = {
            headers: {
              "Content-Type": "multipart/form-data"
            }
          };
          this.axios
            .post("/api/produce/upload", this.param, config)
            .then(res => {
              _this.error.listen(res.data.msg).then(() => {
                _this.$router.push("/produceList");
                _this.$message({
                  type: "success",
                  message: "添加成功"
                });
              });
            });
        }
      });
    },
    selectCheckbox(index) {
      let data = this.materialData[index];
      if (data.checked === false) {
        this.produceList.materialSelect.splice(index, 1);
        return false;
      }

      this.produceList.materialSelect.push(data);
    }
  }
};
</script>
<style scoped>
.beforeColorContains {
  margin-bottom: 15px;
  position: relative;
  left: 10px;
  font-size: 1.2em;
}
.beforeColor::before {
  content: "";
  position: absolute;
  left: -12px;
  width: 8px;
  height: 25px;
  background: #409eff;
}
.materialList {
  height: 30px;
  line-height: 30px;
  width: 50%;
}
.el-form-item {
  margin: 0;
}
</style>
<style>
.el-form-item__error {
  color: #f56c6c;
  font-size: 12px;
  line-height: 1;
  padding-top: 4px;
  position: absolute;
  top: 100%;
  right: 0;
}
</style>
