<template>
    <div class="i-conten">
        <div id="homePage" class="warpper">
            <!-- 第一行 -->
            <el-row>
                <el-col :span="24">
                    <el-col :xs="24" :md="12">
                        <div class="beforeColorContains">
                            <label class="beforeColor">资金汇总</label>
                        </div>
                        <div class="pullRight">
                            <el-row>
                                <el-col :span="12">
                                    <svg
                                        class="icon iconfont-big"
                                        aria-hidden="true"
                                    >
                                        <use :xlink:href="'#icon-yue'" />
                                    </svg>
                                    <span>利润</span>
                                </el-col>
                                <el-col :span="12" class="text-right">
                                    <span id="profit" class="fontBig">
                                        {{ profit }}
                                    </span>
                                    元
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <svg
                                        class="icon iconfont-big"
                                        aria-hidden="true"
                                    >
                                        <use :xlink:href="'#icon-zhangdan'" />
                                    </svg>
                                    <span>总收入</span>
                                </el-col>
                                <el-col :span="12" class="text-right">
                                    <span id="totalIncome" class="fontBig">{{
                                        totalIncome
                                    }}</span>
                                    元
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="12">
                                    <svg
                                        class="icon iconfont-big"
                                        aria-hidden="true"
                                    >
                                        <use
                                            :xlink:href="'#icon-zongfeiyong'"
                                        />
                                    </svg>
                                    <span>总支出</span>
                                </el-col>
                                <el-col :span="12" class="text-right">
                                    <span id="totalOutcome" class="fontBig">{{
                                        totalOutput
                                    }}</span>
                                    元
                                </el-col>
                            </el-row>
                        </div>
                    </el-col>
                    <!-- 订单与库存情况 -->
                    <el-col :xs="24" :md="12">
                        <div class="beforeColorContains">
                            <label class="beforeColor">订单与库存</label>
                        </div>
                        <!-- 订单类 -->
                        <el-row>
                            <el-col :span="8" class="text-center">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="'#icon-biaoqian'" />
                                </svg>
                                <div class="iconText">
                                    <span>未接订单</span>
                                    <span id="openOrder" class="font18"
                                        >(20)</span
                                    >
                                </div>
                            </el-col>
                            <el-col :span="8" class="text-center">
                                <svg class="icon" aria-hidden="true">
                                    <use
                                        :xlink:href="'#icon-xinzengshoukuan'"
                                    />
                                </svg>
                                <div class="iconText">
                                    <span>已接订单</span>
                                    <span id="acceptedOrder" class="font18"
                                        >(10)</span
                                    >
                                </div>
                            </el-col>
                            <el-col :span="8" class="text-center">
                                <svg class="icon" aria-hidden="true">
                                    <use
                                        :xlink:href="'#icon-shoukuanrenling'"
                                    />
                                </svg>
                                <div class="iconText">
                                    <span>完成订单</span>
                                    <span id="compleOrder" class="font18"
                                        >(50)</span
                                    >
                                </div>
                            </el-col>
                        </el-row>

                        <!-- 日月年入库 -->
                        <el-row class="m-t-sm">
                            <el-col :span="8" class="text-center">
                                <svg class="icon" aria-hidden="true">
                                    <use
                                        :xlink:href="'#icon-xinxiguanliyufabu'"
                                    />
                                </svg>
                                <div class="iconText">
                                    <span>日入库量</span>
                                    <span id="putInStoreforDay" class="font18"
                                        >(20)</span
                                    >
                                </div>
                            </el-col>
                            <el-col :span="8" class="text-center">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="'#icon-dingdan'" />
                                </svg>
                                <div class="iconText">
                                    <span>月入库量</span>
                                    <span id="putInStoreforMonth" class="font18"
                                        >(10)</span
                                    >
                                </div>
                            </el-col>
                            <el-col :span="8" class="text-center">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="'#icon-yundan'" />
                                </svg>
                                <div class="iconText">
                                    <span>年入库量</span>
                                    <span id="putInStoreforYear" class="font18"
                                        >(50)</span
                                    >
                                </div>
                            </el-col>
                        </el-row>
                        <!-- 日月年出库 -->
                        <el-row class="m-t-sm">
                            <el-col :span="8" class="text-center">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="'#icon-gouwuche'" />
                                </svg>
                                <div class="iconText">
                                    <span>日出库量</span>
                                    <span id="putOutStoreforDay" class="font18"
                                        >(20)</span
                                    >
                                </div>
                            </el-col>
                            <el-col :span="8" class="text-center">
                                <svg class="icon" aria-hidden="true">
                                    <use
                                        :xlink:href="'#icon-zaixiancheliang'"
                                    />
                                </svg>
                                <div class="iconText">
                                    <span>月出库量</span>
                                    <span
                                        id="putOutStoreforMonth"
                                        class="font18"
                                        >(10)</span
                                    >
                                </div>
                            </el-col>
                            <el-col :span="8" class="text-center">
                                <svg class="icon" aria-hidden="true">
                                    <use :xlink:href="'#icon-gonggongfuwu'" />
                                </svg>
                                <div class="iconText">
                                    <span>年出库量</span>
                                    <span id="putOutStoreforYear" class="font18"
                                        >(50)</span
                                    >
                                </div>
                            </el-col>
                        </el-row>
                    </el-col>
                </el-col>
            </el-row>

            <!-- 第二行 -->
            <el-row class="m-t-sm">
                <!-- 柱形图 -->
                <el-col :xs="24" :md="12">
                    <div class="beforeColorContains">
                        <label class="beforeColor">收入支出概览</label>
                    </div>
                    <div id="myChart"></div>
                </el-col>

                <!-- 扇形图 -->
                <el-col :xs="24" :md="12">
                    <div class="beforeColorContains">
                        <label class="beforeColor">原料使用占比</label>
                    </div>
                    <div id="myPie"></div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
// 引入柱状图组件
require("echarts/lib/chart/bar");
require("echarts/lib/chart/pie");

export default {
    data() {
        return {
            barData: [100, 200, 300, 400, 500, 600],
            profit: "",
            totalIncome: "",
            totalOutput: ""
        };
    },
    created() {
        this.capital();
    },
    mounted() {
        this.drawLine();
        this.drawPie();
        const self = this;
        let myChart = echarts.init(document.getElementById("myChart"));
        let myPie = echarts.init(document.getElementById("myPie"));

        window.addEventListener("resize", function() {
            myChart.resize();
            myPie.resize();
        });
    },
    computed: {},
    methods: {
        /**
         * 资金总汇
         */
        capital() {
            let _this = this;
            let user = this.$store.state.userInfo;
            this.axios
                .get("/api/incomeAndPay/money",{
                    params: {
                        companyId: user.companyId
                    }
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log("资金总汇", res);
                        let result = res.data.result;
                        _this.profit = result.profit.toFixed(2);
                        _this.totalIncome = result.totalIncome.toFixed(2);
                        _this.totalOutput = result.totalOutput.toFixed(2);
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(document.getElementById("myChart"));
            // 绘制图表
            myChart.setOption({
                tooltip: {},
                color: this.$store.state.echartsColor,
                xAxis: {
                    data: ["利润", "总收入", "总支出", "裤子", "高跟鞋", "袜子"]
                },
                yAxis: {},
                series: [
                    {
                        name: "销量",
                        type: "bar",
                        data: this.barData
                    }
                ]
            });
        },
        drawPie() {
            let myPie = echarts.init(document.getElementById("myPie"));
            // 绘制图表
            const option = {
                tooltip: {
                    trigger: "item",
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                visualMap: {
                    show: false,
                    min: 80,
                    max: 600,
                    inRange: {
                        colorLightness: [0, 1]
                    }
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        radius: "70%",
                        center: ["50%", "50%"],
                        data: [
                            { value: 335, name: "直接访问" },
                            { value: 310, name: "邮件营销" },
                            { value: 274, name: "联盟广告" },
                            { value: 235, name: "视频广告" },
                            { value: 400, name: "搜索引擎" }
                        ].sort(function(a, b) {
                            return a.value - b.value;
                        }),
                        roseType: "radius",
                        animationType: "scale",
                        animationEasing: "elasticOut",
                        animationDelay: function(idx) {
                            return Math.random() * 200;
                        }
                    }
                ]
            };
            myPie.setOption(option);
        }
    }
};
</script>
<style scoped>
.beforeColorContains {
    margin-bottom: 15px;
    position: relative;
    left: 20px;
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
#myChart,
#myPie {
    width: 100%;
    height: 300px;
}
.iconfont-big {
    vertical-align: middle;
    margin-right: 15px;
}
.pullRight {
    padding: 0 30px 15px 30px;
}
.pullRight > div {
    margin-bottom: 30px;
}
.fontBig {
    font-size: 1.5em;
}
.font18 {
    font-size: 18px;
}
</style>


