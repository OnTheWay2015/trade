enum series_tp{
    CANDLESTICK ="CANDLESTICK"
    ,LINE="LINE"
}
export class H_fmt_echarts 
{

    constructor() {
    }
    public reset()
    {
        this._title = null;
        this._values = [];
        this._categoryData = null;
        this._legendNames =[];
        return this;
    }
   
//-----------
    private _showcount:number = 20;
    private _showST_def:number = 0;
    private _showEd_def:number = 3;

//-----------
    private _title:any;
    private _values:any[] = [];
    private _categoryData:any
    private _legendNames:string[]=[];
    
    private upColor = '#ec0000';
    private upBorderColor = '#8A0000';
    private downColor = '#00da3c';
    private downBorderColor = '#008F28';
    public setCategoryData(v:any)
    {
        this._categoryData= v;
        return this;
    }
    public setValuesCandlestick(v:any,ops:any)
    {
        this.addvalues(series_tp.CANDLESTICK, v, ops);
        return this;
    }

    public setValuesAddLine(v:any,ops:any)
    {
        if (!v || v.length<=0)
        {
            return;
        }
        let self = this;
        self._showEd_def = self._showcount/v.length;
        this.addvalues(series_tp.LINE, v, ops);
        return this;
    }
    public setTitle(s:string)
    {
       this._title = s;
        return this;
    }
    private addvalues(tp:series_tp,v:any,ops:any)
    {
        this._values.push({
            tp:tp
            ,data:v
            ,ops:ops
        });

    }
//--------------------------------
    //public getDataByStartTime(k: string): any {
    //    let self = this;
    //    if (self._data[k]) {
    //        return self._data[k];
    //    }
    //    return null;
    //}

    public getOptions() {
        let self = this;
        let tooltip = self.getTooltip();
        let grid = self.getGrid();
        let xAxis = self.getXAxis();
        let yAxis = self.getYAxis();
        let dataZoom: any[] = self.getDataZoom();
        let series = self.getSeries();
        let legend = self.getLegend();
        let t = this._title ? this._title : 'title---';
        return {
            title:{
            text:t,
            left: 0,
                textStyle: {
                    color: '#fff'
                }
            },
            backgroundColor: '#21202D',
            tooltip: tooltip,
            legend: legend,
            grid: grid,
            xAxis: xAxis,
            yAxis: yAxis,
            dataZoom: dataZoom,
            series: series
        };
    }
    private getCategoryData() {
        return this._categoryData;
        //return [];
    }
    //private getValues() { // {xAxis_key, open,close,lowest,highest}
    //    return this._values;
    //    //return [];
    //}

    private getItemStyle() {
        let self = this;
        return {
            color: self.upColor,
            color0: self.downColor,
            borderColor: self.upBorderColor,
            borderColor0: self.downBorderColor
        }
    }
    

    private getSeriesNode(tp:series_tp,v:any,ops:any) {
        let self = this;
        let data =null;
        switch (tp)
        {
            case series_tp.LINE: 
                data = {
                    type: 'line',
                    name:  ops["name"]? ops["name"]:'lineName',
                    data: v,
                    smooth: true,
                    lineStyle: {
                        opacity: 0.5
                    }
                }; 
            break;
            case series_tp.CANDLESTICK: 
            data = {
                type: 'candlestick',
                name:  ops["name"]? ops["name"]:'k-name',
                data: v,
                itemStyle: self.getItemStyle(),
            }; 
            break;
        }
        if (!data)
        {
            console.error("getSeriesNode tp["+tp+"] err");
        }
        self._legendNames.push(data.name);
        return data;
    }

    private getSeries() {
        let self = this;
        let ary = [];
        for (let i=0;i<self._values.length;i++)
        {
            let v = self._values[i];
            let n =self.getSeriesNode(v.tp,v.data,v.ops);
            ary.push(n);
        }

        return ary;
    }


    private getTooltip() {
        //return {
        //    show: true,//显示数据信息
        //    trigger: 'axis',
        //    axisPointer: {
        //        type: 'cross'
        //    }
        //}

        return {
            show: true,//是否显示
            trigger: 'axis',
            axisPointer: {
                animation: false,
                type: 'cross',
                lineStyle: {
                    color: '#376df4',
                    width: 2,
                    opacity: 1
                }
            }
        };
    }

    private getLegend() {
        let self = this;
        return {
            show: true,
            //data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
            data: self._legendNames,
            inactiveColor: '#777',
            textStyle: {
                color: '#fff'
            }
        };



    }
    private getGrid() {
        return {
            show: false,
            left: '10%',
            right: '10%',
            bottom: '15%'
        }
    }
    private getXAxis() {
        let self = this;
        let data = self.getCategoryData()
        return {
            type: 'category',//类目轴
            data: data,// [], data0.categoryData,
            //scale: true,
            //boundaryGap: false,
            axisLine: { 
                lineStyle: { color: '#8392A5' }
                //onZero: false 
            },
            splitLine: { show: false },
            //splitNumber: 20,
            //splitNumber: 0.20,
            //min: 'dataMin',
            //max: 'dataMax'
        }
    }
    private getYAxis() {
        return {
            type:"value",// 数值轴
            scale: true,
            axisLine: { lineStyle: { color: '#8392A5' } },
            splitLine: {
                show:false 
            }
        }
    }
    private getDataZoom() {
        let self = this;
        //return [
        //    {
        //        type: 'inside',
        //        start: 50,
        //        end: 100
        //    },
        //    {
        //        show: true,
        //        type: 'slider',
        //        top: '90%',
        //        start: 50,
        //        end: 100
        //    }
        //];

        //return [
        //  {
        //      rangeMode: ['percent', 'percent'],
        //      start: 0,
        //      end: 3
        //  },
        //    {
        //      type: 'inside',
        //      filterMode: 'none',
        //    }
        //      
        //  ];

        return [{
            rangeMode: ['percent', 'percent'],
            start: self._showST_def,
            end: self._showEd_def,
            textStyle: {
                color: '#8392A5'
            },
            handleSize: '80%',
            dataBackground: {
                areaStyle: {
                    color: '#8392A5'
                },
                lineStyle: {
                    opacity: 0.8,
                    color: '#8392A5'
                }
            },
            handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
            }
        }, {
            type: 'inside'
        }];
    }

}
let g_H_fmt_echarts:H_fmt_echarts= new H_fmt_echarts();
export default g_H_fmt_echarts; 