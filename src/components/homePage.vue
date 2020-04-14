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
                  <svg class="icon iconfont-big" aria-hidden="true">
                    <use :xlink:href="'#icon-yue'" />
                  </svg>
                  <span>利润</span>
                </el-col>
                <el-col :span="12" class="text-right">
                  <span id="profit" class="fontBig">{{ profit }}</span>
                  元
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <svg class="icon iconfont-big" aria-hidden="true">
                    <use :xlink:href="'#icon-zhangdan'" />
                  </svg>
                  <span>总收入</span>
                </el-col>
                <el-col :span="12" class="text-right">
                  <span id="totalIncome" class="fontBig">
                    {{
                    totalIncome
                    }}
                  </span>
                  元
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="12">
                  <svg class="icon iconfont-big" aria-hidden="true">
                    <use :xlink:href="'#icon-zongfeiyong'" />
                  </svg>
                  <span>总支出</span>
                </el-col>
                <el-col :span="12" class="text-right">
                  <span id="totalOutcome" class="fontBig">
                    {{
                    totalOutput
                    }}
                  </span>
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
            <el-row>
              <el-col :span="8" class="text-center">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="'#icon-biaoqian'" />
                </svg>
                <div class="iconText">
                  <span>未接订单</span>
                  <span id="openOrder" class="font18">(20)</span>
                </div>
              </el-col>
              <el-col :span="8" class="text-center">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="'#icon-xinzengshoukuan'" />
                </svg>
                <div class="iconText">
                  <span>已接订单</span>
                  <span id="acceptedOrder" class="font18">(10)</span>
                </div>
              </el-col>
              <el-col :span="8" class="text-center">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="'#icon-shoukuanrenling'" />
                </svg>
                <div class="iconText">
                  <span>完成订单</span>
                  <span id="compleOrder" class="font18">(50)</span>
                </div>
              </el-col>
            </el-row>

            <!-- 日月年入库 -->
            <el-row class="m-t-sm">
              <el-col :span="8" class="text-center">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="'#icon-xinxiguanliyufabu'" />
                </svg>
                <div class="iconText">
                  <span>日入库量</span>
                  <span id="putInStoreforDay" class="font18">(20)</span>
                </div>
              </el-col>
              <el-col :span="8" class="text-center">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="'#icon-dingdan'" />
                </svg>
                <div class="iconText">
                  <span>月入库量</span>
                  <span id="putInStoreforMonth" class="font18">(10)</span>
                </div>
              </el-col>
              <el-col :span="8" class="text-center">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="'#icon-yundan'" />
                </svg>
                <div class="iconText">
                  <span>年入库量</span>
                  <span id="putInStoreforYear" class="font18">(50)</span>
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
                  <span id="putOutStoreforDay" class="font18">(20)</span>
                </div>
              </el-col>
              <el-col :span="8" class="text-center">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="'#icon-zaixiancheliang'" />
                </svg>
                <div class="iconText">
                  <span>月出库量</span>
                  <span id="putOutStoreforMonth" class="font18">(10)</span>
                </div>
              </el-col>
              <el-col :span="8" class="text-center">
                <svg class="icon" aria-hidden="true">
                  <use :xlink:href="'#icon-gonggongfuwu'" />
                </svg>
                <div class="iconText">
                  <span>年出库量</span>
                  <span id="putOutStoreforYear" class="font18">(50)</span>
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
            <label class="beforeColor">年收入支出概览</label>
          </div>
          <div id="myChart"></div>
        </el-col>

        <!-- 扇形图 -->
        <el-col :xs="24" :md="12">
          <div class="beforeColorContains">
            <label class="beforeColor">近5年利润趋势图</label>
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
require("echarts/lib/component/legend");
// 引入柱状图组件
require("echarts/lib/chart/bar");
require("echarts/lib/chart/line");

export default {
  data() {
    return {
      income: [],
      pay: [],
      profit: "",
      totalIncome: "",
      totalOutput: "",
      five_year: [],
      five_year_val: []
    };
  },
  created() {
    this.capital();
  },
  mounted() {
    this.drawLine();
    this.drawPie();
    this.getIncomeAndPay();
    this.get_five_year_money();
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
        .get("/api/incomeAndPay/money", {
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
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["收入", "支出"]
        },
        color: this.$store.state.echartsColor,
        xAxis: {
          name: "月",
          type: "category",
          data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        },
        yAxis: {
          name: "收入/支出(元)",
          type: "value"
        },
        series: [
          {
            name: "收入",
            type: "bar",
            data: this.income
          },
          {
            name: "支出",
            type: "bar",
            color: "#cc3333",
            data: this.pay
          }
        ]
      });
    },
    getIncomeAndPay() {
      let user = this.$store.state.userInfo;
      let _this = this;
      this.axios
        .get("/api/incomeAndPay/incomeList_year", {
          params: {
            companyId: user.companyId
          }
        })
        .then(res => {
          const data = res.data.result;
          _this.income = data.map(item => {
            return item.money;
          });
          console.log("年收入", res, _this.income);
        })
        .catch(err => {
          console.log(err);
        });
      this.axios
        .get("/api/incomeAndPay/payList_year", {
          params: {
            companyId: user.companyId
          }
        })
        .then(res => {
          const data = res.data.result;
          _this.pay = data.map(item => {
            return item.money;
          });
          this.drawLine();
          console.log("年支出", res, _this.income);
        })
        .catch(err => {
          console.log(err);
        });
    },
    get_five_year_money() {
      const _this = this;
      this.axios
        .get("/api/money/total_near_fiveYear")
        .then(res => {
          console.log("近5年利润趋势", res);
          const data = res.data.arr;
          for (let i = 0; i < data.length; i++) {
            _this.five_year.push(data[i]["_id"]);
            _this.five_year_val.push(data[i].money);
          }
          _this.drawPie();
        })
        .catch(err => {
          console.log(err);
        });
    },
    drawPie() {
      let myPie = echarts.init(document.getElementById("myPie"));
      // 绘制图表
      const option = {
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["近5年利润趋势"]
        },
        color: this.$store.state.echartsColor,
        xAxis: {
          name: "月",
          type: "category",
          data: this.five_year
        },
        yAxis: {
          name: "元",
          type: "value"
        },
        series: [
          {
            name: "近5年利润趋势",
            type: "line",
            data: this.five_year_val
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
  height: 500px;
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


