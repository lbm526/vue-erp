<template>
    <div class="i-conten">
        <div id="producePutaway" class="warpper">
            <!-- 库存管理 -->
            <el-row>
                <el-button-group class="pull-left m-l-sm">
                    <el-button
                        v-for="(item, index) in btnArray"
                        :key="item.id"
                        :class="{ active: currentSort == index }"
                        @click="giveCharData(index)"
                    >
                        {{ item.text }}
                    </el-button>
                </el-button-group>
                <el-col :md="6" class="m-l-md">
                    <label for="materialName">名称：</label>
                    <el-select
                        v-model="produceName"
                        @change="getProduceList()"
                        clearable
                        placeholder="请选择名称"
                        class="inline-block w180px"
                    >
                        <el-option
                            v-for="item in materialNameList"
                            :key="item._id"
                            :label="item.produceName"
                            :value="item.produceName"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :md="7">
                    <label>生产日期：</label>
                    <el-date-picker
                        v-model="buyDate"
                        type="date"
                        value-format="yyyy-MM-dd"
                        @change="getProduceList()"
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
                    <el-table-column type="expand">
                        <template slot-scope="props">
                            <el-form
                                label-position="left"
                                inline
                                class="demo-table-expand"
                            >
                                <template
                                    v-for="item in props.row.materialSelect"
                                >
                                    <el-form-item
                                        label="材料名称"
                                        :key="item.materialName"
                                    >
                                        <span>{{ item.materialName }}</span>
                                    </el-form-item>
                                    <el-form-item
                                        label="数量"
                                        :key="item.materialNumber"
                                    >
                                        <span
                                            :class="{
                                                colorRead:
                                                    item.materialNumber === 0
                                            }"
                                            >{{ item.materialNumber }}</span
                                        >
                                    </el-form-item>
                                </template>
                            </el-form>
                        </template>
                    </el-table-column>
                    <el-table-column prop="id" label="ID" v-if="false">
                    </el-table-column>
                    <el-table-column prop="produceName" label="名称">
                    </el-table-column>
                    <el-table-column prop="produceNumber" label="数量">
                    </el-table-column>
                    <el-table-column prop="produceSate" label="状态">
                        <template slot-scope="scope">
                            <span v-if="scope.row.produceSate === 0"
                                >新任务</span
                            >
                            <span v-if="scope.row.produceSate === 1"
                                >进行中</span
                            >
                            <span v-if="scope.row.produceSate === 2"
                                >已完成</span
                            >
                            <span v-if="scope.row.produceSate === 3"
                                >已超期</span
                            >
                        </template>
                    </el-table-column>

                    <el-table-column
                        prop="brand"
                        label="品牌"
                    ></el-table-column>
                    <el-table-column
                        prop="qualityGuaranteePeriod"
                        label="保质期（天）"
                    >
                    </el-table-column>
                    <el-table-column
                        prop="qualityGuaranteePeriod"
                        label="工艺图纸"
                    >
                        <template slot-scope="scope">
                            <el-button
                                type="success"
                                size="small"
                                plain
                                @click="download(scope.row)"
                                >下载</el-button
                            >
                        </template>
                    </el-table-column>
                    <el-table-column prop="content" label="含量">
                    </el-table-column>
                    <el-table-column
                        prop="completeTime"
                        label="预计完成时间"
                        width="150"
                    >
                        <template slot-scope="scope">
                            {{
                                scope.row.completeTime
                                    ? new Date(scope.row.completeTime).Format(
                                          "yyyy-MM-dd"
                                      )
                                    : ""
                            }}
                        </template>
                    </el-table-column>
                    <el-table-column
                        align="center"
                        fixed="right"
                        label="操作"
                        width="180"
                    >
                        <template slot-scope="scope" v-if="scope.row.produceSate === 2">
                            <el-button
                                @click="handleClick(scope.row)"
                                type="primary"
                                plain
                                size="small"
                                >入库</el-button
                            >
                            <el-button type="danger" plain size="small"
                            @click="notStore(scope.row)"
                                >不需入库</el-button
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
        <iframe :src="downloadSrc" v-show="false" frameborder="0"></iframe>
    </div>
</template>
<script>
require("../assets/js/Date/Udate");
export default {
    data() {
        return {
            currentSort: 0,
            materialNameList: [],
            produceName: "",
            buyDate: "",
            downloadSrc: "",
            btnArray: [
                {
                    id: "newOrder",
                    text: "未入库"
                },
                {
                    id: "ongoing",
                    text: "已入库"
                },
                {
                    id: "compelte",
                    text: "不需入库"
                }
            ],
            currentPage: 1,
            pagesize: 8,
            tableData: []
        };
    },
    created() {
        this.getProduceList();
        this.getProduceNameArray();
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
            this.getProduceList();
            this.getProduceNameArray();
        },
        /**
         * 下载图纸
         * 传入下载的id
         */
        download(row) {
            this.downloadSrc =
                "http://127.0.0.1:8088/api/produce/downloadFile?id=" +
                JSON.stringify(row.id);
        },
        /**
         * 获取产品名称对象数组
         */
        getProduceNameArray() {
            let _this = this;
            this.axios
                .get("/api/produce/produceNameList", {
                    params: {
                        produceSate: this.currentSort + 2
                    }
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log("生产名称列表", res);
                        _this.materialNameList = res.data.result;
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 获取生产产品列表
         */
        getProduceList() {
            let _this = this;
            let search = {
                produceName: this.produceName,
                produceSate: this.currentSort + 2,
                completeTime: this.buyDate
            };
            this.axios
                .get("/api/produce/getProduceList", {
                    params: search
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log("完成的生产产品列表", res);
                        this.tableData = res.data.result;
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 入库
         * @params _id
         */
        handleClick(row) {
            let _this = this;
            let _id = row._id;
            this.axios
                .post("/api/produce/goToStore", {
                    _id
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        _this.getProduceList();
                        _this.getProduceNameArray();
                        _this.$message({
                            type: 'success',
                            message:'入库成功'
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**
         * 不需入库
         * @params _id
         */
        notStore(row){
            let _this = this;
            let _id = row._id;
            this.axios
                .post("/api/produce/notNeedStore", {
                    _id
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        _this.getProduceList();
                        _this.getProduceNameArray();
                        _this.$message({
                            type: 'success',
                            message:'操作成功'
                        });
                    });
                })
                .catch(err => {
                    console.log(err);
                });
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
