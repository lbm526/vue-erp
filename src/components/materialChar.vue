<template>
    <div id="char" class="text-center">
        <el-button-group>
            <el-button
                v-for="(item, index) in btnArray"
                :key="item.id"
                :class="{ active: currentSort == index }"
                @click="giveCharData(index)"
            >
                {{ item.text }}
            </el-button>
        </el-button-group>
        <div id="marteralCharLine"></div>
    </div>
</template>
<script>
// 引入基本模板
let echarts = require("echarts/lib/echarts");
// 引入提示框和title组件
require("echarts/lib/component/tooltip");
require("echarts/lib/component/title");
// 引入柱状图组件
require("echarts/lib/chart/line");
export default {
    data() {
        return {
            currentSort: 0,
            btnArray: [
                {
                    id: "month",
                    text: "月"
                },
                {
                    id: "quarter",
                    text: "季"
                },
                {
                    id: "year",
                    text: "年"
                }
            ],
            data: [10, 20, 30, 40, 30, 60, 70],
            xAxisData: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
        };
    },
    mounted() {
        let line = echarts.init(document.getElementById("marteralCharLine"));
        this.lineChar();
        window.addEventListener("resize", function() {
            line.resize();
        });
    },
    methods: {
        giveCharData(index) {
            // 阻止重复点击
            if (this.currentSort === index) {
                return false;
            }
            this.currentSort = index;
            this.data = [100, 20, 40, 200, 10, 50, 90];
            this.lineChar();
        },
        lineChar() {
            let line = echarts.init(
                document.getElementById("marteralCharLine")
            );
            const option = {
                color: this.$store.state.echartsColor,
                tooltip: {
                    trigger: "axis"
                },
                toolbox: {
                    feature: {
                        saveAsImage: {}
                    }
                },
                xAxis: [
                    {
                        type: "category",
                        boundaryGap: false,
                        data: this.xAxisData
                    }
                ],
                yAxis: [
                    {
                        type: "value"
                    }
                ],
                series: [
                    {
                        type: "line",
                        areaStyle: {},
                        data: this.data
                    }
                ]
            };
            line.setOption(option);
        }
    }
};
</script>
<style scoped>
.active {
    background: #409eff;
    color: #fff;
}
#marteralCharLine {
    width: 100%;
    height: 400px;
}
</style>
