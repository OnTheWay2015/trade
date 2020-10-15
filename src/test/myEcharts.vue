<template>
  <div id="echarts_test">
    <div>echarts_test {{val}}</div>
    <div id="echarts_test_div" style="width: 600px;height:400px;"></div>
    <div> ------------------------------ 
    </div> 
    <div id="echarts_test_div01" style="width: 600px;height:400px;"></div>
    <div> ------------------------------ 
    </div> 
    <div id="echarts_test_div02" style="width: 600px;height:400px;"></div>
  </div>
</template>

<script lang="ts">

import { Component,Prop, Vue } from 'vue-property-decorator';


import echarts from 'echarts'
@Component
export default class echarts_test extends Vue {
    @Prop({ default: '123' }) private val!: string

  private myChart!:any;
  private myChart1!:any;
  private myChart2!:any;
  private setMyEcharts() 
  {
    let self = this;
      console.log("2----------------");
		// 基于准备好的dom，初始化echarts实例
        let   vm:any = this.$root; 
        let ele:any =  document.getElementById('echarts_test_div');
        this.myChart = echarts.init(ele);
        //this.myChart1 = echarts.init(document.getElementById('echarts_test_div01'));
        //this.myChart2 = echarts.init(document.getElementById('echarts_test_div02'));
            self.myChart.on('click', function (params) {
                console.log(params);
                if (params.componentType == "series") {
                  //add_point.data.push([params.dataIndex, params.data]);
                  //self.myChart.setOption(self.def_option_more);
                }
            });
		// 指定图表的配置项和数据
		// 使用刚指定的配置项和数据显示图表。
        //this.myChart.setOption(this.option);
        this.myChart.setOption(this.def_option_more);

  }
  private _init_():void{
    this.setMyEcharts();
      console.log("10----------------");
  }
  public mounted():void {
      console.log("1----------------");
    this._init_();
  }




		private option = {
			  title: {
			    text: 'ECharts 入门示例'
			  },
			  tooltip: {},
			  legend: {
				  data:['销量']
			  },
			  xAxis: {
				  data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
			  },
			  yAxis: {},
			  series: [{
				  name: '销量',
				  type: 'bar',
				  data: [5, 20, 36, 10, 10, 20]
			  }]
    };

		private option1 = {
			  series: [{
				  name: '销量',
				  type: 'bar',
				  data: [5, 20, 36, 10, 10, 20]
			  }]
		};

		private def_option:any = {
			  title: {
			    text: 'ECharts 入门示例'
			  },
			  tooltip: {},
			  legend: {
				  data:['销量']
			  },
			  xAxis: {
				  data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
			  },
			  yAxis: {},
			  series: [{
				  name: '销量',
				  type: 'bar',
				  data: [5, 20, 36, 10, 10, 20]
			  }]
    };

		private def_option_more:any = {
			  title: {
			    text: 'ECharts 入门示例'
			  },
			  tooltip: {},
			  legend: {
				  data:['销量']
			  },
			  xAxis: {
              type: 'value',
              min: 'dataMin', //有依赖x,y轴定位的显示需要数值 ,比如 scatter
              max: 'dataMax',
				  //data: ["衬衫","羊毛衫","雪纺衫","裤子","高跟鞋","袜子"]
			  },
			  yAxis: {
              type: 'value',
              min: 'dataMin',
              max: 'dataMax'
        },
			  series: [{
				  name: '销量',
				  type: 'bar',
          //柱形图距离远近 
          barWidth:3,
          barGap:'10%', 
				  data: [5, 20, 36, 10, 10, 20]
        },
        {
           name: 'scatter',
           type: 'scatter',
           itemStyle: {
             normal: {
               opacity: 0.8
             }
           },
           symbolSize: function (val) {
               return val[2] * 10;
           },
           data:[[10,10,10]]   // x,y, 第三个元素对应 symbolSize里的 val[2] 
         } 
        ]
    };




private def_option1:any = {
    title: {
        text: '指数',
        left: 0
    },
    legend: {
        data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
    },
    grid: {
        left: '10%',
        right: '10%',
        bottom: '15%'
    },
    xAxis: {
        type: 'category',
        data: ["1","2"],
        scale: true,
        boundaryGap: false,
        axisLine: {onZero: false},
        splitLine: {show: false},
        splitNumber: 20,
        min: 'dataMin',
        max: 'dataMax'
    },
    yAxis: {
        scale: true,
        splitArea: {
            show: true
        }
    },
    series: [
        {
            name: '日K',
            type: 'candlestick',
            data: [],
        },
    ]
};


private option_graphic_rect = {
    color: ['#8EC9EB'],
    xAxis: {
        type: 'value',
         
    },
    yAxis: {
        
        type: 'category',
      
    },
     graphic: [
         {
			type: 'rect',
			left: 'center',
      top: 'center',
      //position:[0,0],
			z: 100,
			shape: {
				width: 400,//屏幕象素
				height: 50
			},
			style: {
				fill: 'rgba(0,0,0,0.3)'
			}
		}
    ],
    series: [
    ]
};


private option_graphic_circle = {
    color: ['#8EC9EB'],
    xAxis: {
        type: 'value',         
    },
    yAxis: {        
        type: 'category',      
    },
     graphic: [
         {
			type: 'circle',
			position:[0,0],
			z: 0,
			shape: {
				cx: 0,
				cy: 0,
				r:100
			},
			style: {
				//fill: 'rgba(0,0,0,0.3)',
				stroke:"#fff"
			}
		}
    ],
    series: [       
    ]
};



private add_point = {
        name: 'custom',
        type: 'custom',
        renderItem: function (params, api) {
            // 对于 data 中的每个 dataItem，都会调用这个 renderItem 函数。
            // （但是注意，并不一定是按照 data 的顺序调用）

            // 这里进行一些处理，例如，坐标转换。
            // 这里使用 api.value(0) 取出当前 dataItem 中第一个维度数组的第一个数值。
            var categoryIndex = api.value(0);
            // 这里使用 api.coord(...) 将数值在当前坐标系中转换成为屏幕上的点的像素值。
            var startPoint = api.coord([api.value(1), categoryIndex]); //第一个参数传入数组, data[0] 为x轴数值,　data[1] 为y轴数值,当轴为 category 时,传入 dataIndex值做定位
            var endPoint = api.coord([api.value(2), categoryIndex]);
            // 这里使用 api.size(...) 获得 Y 轴上数值范围为 1 的一段所对应的像素长度。
            var height = api.size([0, 1])[1] * 0.6;

            //startPoint = [15,0];
            //endPoint = [18,5];
            // shape 属性描述了这个矩形的像素位置和大小。
            // 其中特殊得用到了 echarts.graphic.clipRectByRect，意思是，
            // 如果矩形超出了当前坐标系的包围盒，则剪裁这个矩形。
            // 如果矩形完全被剪掉，会返回 undefined.
            var rectShape = echarts.graphic.clipRectByRect({
                // 矩形的位置和大小。
                //x: startPoint[0],
                //y: startPoint[1] - height / 2,
                //width: endPoint[0] - startPoint[0],
                //height: height

                x:50,
                y:80,
                width:20,
                height:30
            }, {
                // 当前坐标系的包围盒。
                x: params.coordSys.x,
                y: params.coordSys.y,
                width: params.coordSys.width,
                height: params.coordSys.height
            });
            return {
			                  type: 'circle',
			                  position:[0,0], //位置
			                  shape: {
			                         	cx: 0,
			                         	cy: 0,
                                r:100
                               },
                         style: {
                           //fill:"#ff",
                           stroke:"#fff"
                         }
            };
            var cShape = {};
            return rectShape && {
                type: 'circle',
                shape: cShape,
                style: api.style()
            };

            // 这里返回为这个 dataItem 构建的图形元素定义。
            return rectShape && {
                // 表示这个图形元素是矩形。还可以是 'circle', 'sector', 'polygon' 等等。
                type: 'rect',
                shape: rectShape,
                // 用 api.style(...) 得到默认的样式设置。这个样式设置包含了
                // option 中 itemStyle 的配置和视觉映射得到的颜色。
                style: api.style()
            };


        },
        itemStyle: {
          color: '#FD1050',
          color0: '#0CF49B',
          borderColor: '#FD1050',
          borderColor0: '#0CF49B'
        },
        encode: {
          // data 中『维度1』和『维度2』对应到 X 轴
          //x: [1, 2],
          x:1, 
          // data 中『维度0』对应到 Y 轴
          y:0
        },
        data: [
            [12, 44, 55, 60], // 这是第一个 dataItem
            [20, 20, 1, 2], // 这是第三个 dataItem
        ]
    };


  private dataZoom =  [
    {
      type: 'slider',
      show: true,
      xAxisIndex: [0],
      start: 1,
      end: 35
    },
    {
      type: 'slider',
      show: true,
      yAxisIndex: [0],
      left: '93%',
      start: 29,
      end: 36
    },
    {
      type: 'inside',
      xAxisIndex: [0],
      start: 1,
      end: 35
    },
    {
      type: 'inside',
      yAxisIndex: [0],
      start: 29,
      end: 36
    }
  ];
}

</script>

