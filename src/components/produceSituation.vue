<template>
    <div class="i-conten">
        <div id="produceSituation" class="warpper">
            <!--  各类产品占比-->
            <div class="beforeColorContains m-t-md">
                <label class="beforeColor">各类产品占比</label>
            </div>
            <div class="text-center">
                <el-button-group>
                    <el-button
                        v-for="(item, index) in produceArray"
                        :key="item.id"
                        :class="{ active: currentSort == index }"
                        @click="givePieCharData(index)"
                    >
                        {{ item.text }}
                    </el-button>
                </el-button-group>
            </div>
            <div ref="produceCharPie" style="height: 400px;width:100%"></div>
            <!--  成品分析图-->
            <div class="beforeColorContains m-t-md">
                <label class="beforeColor">前10名产品</label>
            </div>
            <div ref="produceCharBar" style="height: 400px;width:100%"></div>
        </div>
    </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
require("echarts/lib/component/legend");
// 引入柱状图组件
require("echarts/lib/chart/pie");
require("echarts/lib/chart/bar");
export default {
    data() {
        return {
            currentSort: 0,
            produceArray: [
                {
                    id: "new",
                    text: "未生产"
                },
                {
                    id: "quarter",
                    text: "生产中"
                },
                {
                    id: "complete",
                    text: "已完成"
                },
                {
                    id: "cost",
                    text: "已超期"
                }
            ],
            pieLength: [],
            pieSeriesData: [],
            lineXaxis: [],
            lineSeries: []
        };
    },
    created() {
        this.getProduceState(0);
        this.getTopTen();
    },
    mounted() {
        let pie = echarts.init(this.$refs.produceCharPie);
        let bar = echarts.init(this.$refs.produceCharBar);
        this.pieChar();
        this.drawLine();
        window.addEventListener("resize", function() {
            pie.resize();
            bar.resize();
        });
    },
    methods: {
        /**
         * 未完成、完成、超期
         */
        givePieCharData(index) {
            // 阻止重复点击
            if (this.currentSort === index) {
                return false;
            }
            this.currentSort = index;
            this.getProduceState(index);
        },
        /**初始化饼图 */
        pieChar() {
            let pie = echarts.init(this.$refs.produceCharPie);
            const option = {
                tooltip: {
                    type: "scroll",
                    orient: "vertical",
                    right: 10,
                    top: 20,
                    bottom: 20,
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                color: this.$store.state.echartsColor,
                legend: {
                    orient: "vertical",
                    x: "right",
                    data: this.pieLength
                },
                series: [
                    {
                        name: "访问来源",
                        type: "pie",
                        data: this.pieSeriesData
                    }
                ]
            };

            pie.setOption(option);
        },
        /**初始化柱形图 */
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart = echarts.init(this.$refs.produceCharBar);
            // 绘制图表
            myChart.setOption({
                tooltip: {
                    trigger: "axis",
                    // axisPointer: {
                    //     // 坐标轴指示器，坐标轴触发有效
                    //     type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
                    // }
                },
                color: this.$store.state.echartsColor,
                xAxis: {
                    data: this.lineXaxis
                },
                yAxis: {},
                series: [
                    {
                        name: "产量",
                        type: "bar",
                        barMaxWidth: 40,
                        data: this.lineSeries
                    }
                ]
            });
        },
        /**获取各类占比数据 */
        getProduceState(index) {
            let _this = this;
            this.axios
                .get("/api/produce/proportion", {
                    params: {
                        produceSate: index
                    }
                })
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log("各类占比数据", res);
                        const data = res.data.result;
                        for (let i = 0; i < data.length; i++) {
                            _this.pieLength.push(data[i].name);
                        }
                        _this.pieSeriesData = data;
                        _this.pieChar();
                    });
                })
                .catch(err => {
                    console.log(err);
                });
        },
        /**获取前十名产品 */
        getTopTen() {
            let _this = this;
            this.axios
                .get("/api/produce/topTen")
                .then(res => {
                    _this.error.listen(res.data.msg).then(() => {
                        console.log("前十名产品", res);
                        const data = res.data.result;
                        _this.lineXaxis = data.lineLength;
                        _this.lineSeries = data.lineSeriesData;
                        _this.drawLine();
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
.active {
    background: #409eff;
    color: #fff;
}
</style>
