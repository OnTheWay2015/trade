import { END_PRICE_IDX,LOW_PRICE_IDX, MARK_TIME_IDX  } from './configs';
import event_key from './event_key';
import { deepClone } from './utils';

enum series_tp{
    CANDLESTICK ="CANDLESTICK"
    ,LINE="LINE"
}
export default class H_fmt_echarts 
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
    private toolCallback:any= null;
//-----------
    private _showcount_def:number = 500;
    private _showST_def:number = 0;
    private _showEd_def:number = 5;
    private _showEd:number = 5;

//-----------
    private _title:any;
    private _values:any[] = [];
    private _categoryData:any
    private _legendNames:string[]=[];
    


    private upColor = '#FD1050';
    private upBorderColor = '#FD1050';
    private downColor = '#0CF49B';
    private downBorderColor = '#0CF49B';
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
    public setToolCallback(v:any)
    {
        let self = this;
        self.toolCallback = v;
        return self;
    }
    public setValuesAddLine(v:any,ops:any)
    {
        if (!v || v.length<=0)
        {
            return;
        }

        let self = this;
        self._showEd=self._showEd_def/(v.length/self._showcount_def);
        this.addvalues(series_tp.LINE, v, ops);
        return this;
    }
    private _showToolBox:boolean = true;
    public setToolBox(v:boolean)
    {
       this._showToolBox= v;
        return this;
    }
    public setTitle(s:string)
    {
       this._title = s;
        return this;
    }

    private addvalues(tp:series_tp,v:any,ops:{dataraw?:any,markpoints?:any,marklines?:any})
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
        let toolbox = self._showToolBox ? self.getToolBox() : {};
        let brush  = self.getBrush();
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
            toolbox:toolbox,
            brush:brush,
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
    

    private getSeriesNode(tp:series_tp,v:any,ops:{dataraw?:any,markpoints?:any,marklines?:any}) {
        let self = this;
        let data =null;
        switch (tp)
        {
            case series_tp.LINE:
                data = {
                    type: 'line',
                    animation: false,
                    name: ops["name"] ? ops["name"] : 'lineName',
                    data: v,
                    smooth: true,
                    symbol: "none",//标记的图形
                    lineStyle: {
                        opacity: 0.5
                    }
                };
                if (ops.markpoints) {
                    data.markPoint = self.getLineMarkPoints(ops.dataraw, ops.markpoints);
                }
                break;
            case series_tp.CANDLESTICK:
                //let vclone:any ={};
                //deepClone(v,vclone);
                data = {
                    type: 'candlestick',
                    animation: false,
                    name: ops["name"] ? ops["name"] : 'k-name',
                    data: v,
                    itemStyle: self.getItemStyle(),
                };
                if (ops.marklines) {
                    data.markLine = self.getMarkLines(ops.dataraw, ops.marklines);
                }
                if (ops.markpoints) {
                    data.markPoint = self.getMarkPoints(ops.dataraw, ops.markpoints);
                }
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
            end: self._showEd,
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
        }, 
             {
                type: 'inside',
                zoomLock:false,
            },
            {
                type: 'slider',
                zoomLock:false,
        }];
    }


    /* 
     markPoint: {
                label: {
                    normal: {
                        formatter: function (param) {
                            return param != null ? Math.round(param.value) : '';
                        }
                    }
                },
                
                data: [
                    {
                        name: 'XX标点',
                        coord: ['2013/5/31', 2300],
                        value: 2300,
                        itemStyle: {
                            color: 'rgb(41,60,85)'
                        }
                    },
                    {
                        name: 'highest value',
                        type: 'max',
                        valueDim: 'highest'
                    },
                    {
                        name: 'lowest value',
                        type: 'min',
                        valueDim: 'lowest'
                    },
                    {
                        name: 'average value on close',
                        type: 'average',
                        valueDim: 'close'
                    }
                ]
            },
            markLine: {
                data: [
                    [
                        {
                            name: 'from lowest to highest',
                            type: 'min',
                            valueDim: 'lowest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: false
                                }
                            }
                        },
                        {
                            type: 'max',
                            valueDim: 'highest',
                            symbol: 'circle',
                            symbolSize: 10,
                            label: {
                                show: false
                            },
                            emphasis: {
                                label: {
                                    show: false
                                }
                            }
                        }
                    ],
                    {
                        name: 'min line on close',
                        type: 'min',
                        valueDim: 'close'
                    },
                    {
                        name: 'max line on close',
                        type: 'max',
                        valueDim: 'close'
                    }
                ]
            }
    
    */
    private _colorcnt:number = 0;
    private getMarkLines(kvalues:any,markidxs:any) {
        let self = this;
        self._colorcnt = 0;
        //mark  {下标1, 下标2,标识数据块哪个属性}
        let values = []; 
        for (let i=0;i<markidxs.length;i++)
        {
            let mark = markidxs[i];
            let v1 = kvalues[mark.idx1];
            let v2 = kvalues[mark.idx2];
            let valueidx1 = mark.valueidx1;
            let valueidx2 = mark.valueidx2?mark.valueidx2:valueidx1;

            //let color = "rgb("+ self._colorcnt *30%255 +", "+ self._colorcnt *50%255 +","+ self._colorcnt *70%255 +")";
            let color = "";
            let ci = self._colorcnt%3;
            let cvalue = Math.abs(255 - self._colorcnt * 77);
            if (ci == 0)
            {
                color = "rgb("+ cvalue+ ", 255,255)";
            }
            else if (ci == 1)
            {
                color = "rgb( 255,"+cvalue+",255)";

            }
            else{
                color = "rgb( 255,255,"+cvalue+")";
            }
            self._colorcnt ++;
            values.push(
                [
                    {
                        name: '',
                        coord: [v1[MARK_TIME_IDX], v1[valueidx1]],
                        symbol: 'circle',
                        lineStyle: {
                            color: color
                        },
                        symbolSize: 5,
                        label: {
                           position: "middle",
                           formatter: self._showMarkLineLabelFunc
                        },
                        info: [mark.idx1, mark.idx2],
                    },
                    {
                        coord: [v2[MARK_TIME_IDX], v2[valueidx2]],
                        symbol: 'circle',
                        symbolSize: 5,
                    }

                ]
            );
        } 


        let fmt: any = {
            data: values
        };
        return fmt;
    }
    private _showMarkLineLabelFunc:any = null;
    public setShowMarkLineLabelFunc(f:any)
    {
        let self = this;
        self._showMarkLineLabelFunc = f;
        return this;
    }
    private getMarkPoints(kvalues:any,markidxs:any) {
        //mark  {下标,标识数据块哪个属性}
        let values = []; 
        let self = this;
        self._colorcnt = 0;
        let color = "";
        for (let i = 0; i < markidxs.length; i++) {
            let ci = self._colorcnt%3;
            let cvalue = Math.abs(255 - self._colorcnt * 77);
            if (ci == 0)
            {
                color = "rgb("+ cvalue+ ", 255,255)";
            }
            else if (ci == 1)
            {
                color = "rgb( 255,"+cvalue+",255)";

            }
            else{
                color = "rgb( 255,255,"+cvalue+")";
            }
            self._colorcnt ++;
            let mark = markidxs[i];
            let v = kvalues[mark.idx];
            let rot = 0;
            if(mark.valueidx== LOW_PRICE_IDX )
            {
                rot = 180;
            }
            values.push({
                symbol:"pin",
                symbolRotate:rot,
                label: {
                    show: false
                },
                symbolSize:20,
                name: v[MARK_TIME_IDX] + ' 标点',
                coord: [v[MARK_TIME_IDX], v[mark.valueidx]],
                value: v[mark.valueidx],
                itemStyle: 
                {
                    color:color
                }
            });
        }

        //{
        //    name: 'XX标点',
        //        coord: ['2013/5/31', 2300],
        //            value: 2300,
        //                itemStyle: {
        //        color: 'rgb(41,60,85)'
        //    }
        //},
        
        let fmt = {
                label: {
                    normal: {
                        formatter: function (param) {
                            return param != null ? Math.round(param.value) : '';
                        }
                    }
                },
                data:values
        };
        return fmt;
    }


            //timemark: new Date().getTime(),
            //idx: 20,
            //price: 2000,
            //direction: 0,
            //COFlag: 0
    private getLineMarkPoints(kvalues:any,markidxs:any) {
        //mark  {下标,标识数据块哪个属性}
        let values = []; 
        let self = this;
        //let color = "rgb( 255,100,100)";
        let color = "";
        let dis = 50;
        for (let i = 0; i < markidxs.length; i++) {
            let mark = markidxs[i];
            let v = kvalues[mark.idx];
            let rot = 0;
            if(mark.direction == 0)
            {
                rot = 180;
                dis = -dis;
                color = "rgb( 100,255,100)";
            }
            else
            {
                color = "rgb( 255,100,100)";
            }
            //if(mark.COFlag== 0)
            //{
            //    color = "rgb( 100,255,100)";
            //}
            values.push({
                symbol:'arrow',
                symbolRotate:rot,
                label: {
                    show: true,
                    position: "top",
                    distance:dis,
                },
                symbolSize:20,
                name: v[MARK_TIME_IDX] + ' 标点',
                //coord: [v[0], v[mark.valueidx]],
                coord: [v[MARK_TIME_IDX], v[END_PRICE_IDX]],
                value: 0,
                info:mark,
                itemStyle: 
                {
                    color:color
                }
            });
        }
        
        let fmt = {
                label: {
                    normal: {
                        formatter: function (param) {
                            //console.log("-------------param:");
                            //console.log(param);
                            return param != null ? Math.round(param.data.info.price) : '';
                        }
                    }
                },
                data:values
        };
        return fmt;
    }


    private getToolBox()
    {
        let self = this;
        let toolbox = {
            top:'3%',
            left:'50%',
            feature: {
                brush: {
                    type: ['lineX', 'clear']
                },
                myTool_addpoint: {
                    show: true,
                    icon: 'path://M534.115 489.885V132c0-11.05-8.952-20-19.996-20h-4.238c-11.046 0-19.996 8.954-19.996 20v357.885H132c-11.05 0-20 8.952-20 19.996v4.238c0 11.046 8.954 19.996 20 19.996h357.885V892c0 11.05 8.952 20 19.996 20h4.238c11.046 0 19.996-8.954 19.996-20V534.115H892c11.05 0 20-8.952 20-19.996v-4.238c0-11.046-8.954-19.996-20-19.996H534.115z',
                    title: '添加点'
                    ,onclick: function (){
                        if (self.toolCallback)
                        {
                            self.toolCallback(event_key.UIACT_ADD_POINT);
                        }
                    }
                },
                myTool_addline: {
                    show: true,
                    icon: 'path://M534.115 489.885V132c0-11.05-8.952-20-19.996-20h-4.238c-11.046 0-19.996 8.954-19.996 20v357.885H132c-11.05 0-20 8.952-20 19.996v4.238c0 11.046 8.954 19.996 20 19.996h357.885V892c0 11.05 8.952 20 19.996 20h4.238c11.046 0 19.996-8.954 19.996-20V534.115H892c11.05 0 20-8.952 20-19.996v-4.238c0-11.046-8.954-19.996-20-19.996H534.115z',
                    title: '添加线'
                    ,onclick: function (){
                        if (self.toolCallback)
                        {
                            self.toolCallback(event_key.UIACT_ADD_LINE);
                        }
                    }
                },
                myTool_clearMark: {
                    show: true,
                    icon: 'path://M867 557l-188 188q-29 29 -71 29v0q-41 0 -70 -29l-381 -381q-29 -29 -29 -70.5t29 -70.5l188 -189q29 -29 70.5 -29t70.5 29l381 382q29 29 29 70t-29 71zM471 49q-23 -23 -55.5 -23t-55.5 23l-189 188q-23 24 -23 56.5t23 55.5l77 77l300 -300zM853 430l-290 -290l-301 300l291 291q23 23 55.5 23t55.5 -23l189 -189q23 -23 23 -56t-23 -56zM602 29zM577 29q0 10 7.5 17.5t17.5 7.5t17.5 -7.5t7.5 -17.5t-7.5 -17.5t-17.5 -7.5t-17.5 7.5t-7.5 17.5zM693 29zM669 29q0 10 7 17.5t17.5 7.5t17.5 -7.5t7 -17.5t-7 -17.5t-17.5 -7.5t-17.5 7.5t-7 17.5zM785 29zM760 29q0 10 7 17.5t17.5 7.5t17.5 -7.5t7 -17.5t-7 -17.5t-17.5 -7.5t-17.5 7.5t-7 17.5z',
                    title: '清空标记',
                    onclick: function (){
                        if (self.toolCallback)
                        {
                            self.toolCallback(event_key.UIACT_DEL_POINT);
                        }
                    }
                },
                myTool_clearMarkLine: {
                    show: true,
                    icon: 'path://M867 557l-188 188q-29 29 -71 29v0q-41 0 -70 -29l-381 -381q-29 -29 -29 -70.5t29 -70.5l188 -189q29 -29 70.5 -29t70.5 29l381 382q29 29 29 70t-29 71zM471 49q-23 -23 -55.5 -23t-55.5 23l-189 188q-23 24 -23 56.5t23 55.5l77 77l300 -300zM853 430l-290 -290l-301 300l291 291q23 23 55.5 23t55.5 -23l189 -189q23 -23 23 -56t-23 -56zM602 29zM577 29q0 10 7.5 17.5t17.5 7.5t17.5 -7.5t7.5 -17.5t-7.5 -17.5t-17.5 -7.5t-17.5 7.5t-7.5 17.5zM693 29zM669 29q0 10 7 17.5t17.5 7.5t17.5 -7.5t7 -17.5t-7 -17.5t-17.5 -7.5t-17.5 7.5t-7 17.5zM785 29zM760 29q0 10 7 17.5t17.5 7.5t17.5 -7.5t7 -17.5t-7 -17.5t-17.5 -7.5t-17.5 7.5t-7 17.5z',
                    title: '清空线段'
                    ,onclick: function (){
                        if (self.toolCallback)
                        {
                            self.toolCallback(event_key.UIACT_DEL_LINE);
                        }
                    }
                },
                myTool_cycle: {
                    show: false,
                    icon: 'path://M151.709749 946.380178l0-87.077218 740.886991 0 0 87.077218L151.709749 946.380178zM674.686754 510.566348l217.907938-174.326351 0 479.482399L674.686754 815.722396 674.686754 510.566348zM413.199275 815.721373 413.199275 336.238974l217.906915 174.325327 0 305.155025L413.199275 815.721373 413.199275 815.721373zM646.386198 367.222639l-0.724501-0.76441-0.041956 0.082888L387.448798 108.373243 173.627944 322.19512l-30.813796-30.81482L389.961014 44.191478l256.425184 261.403568 173.131129-173.134199-57.667398-57.7114 130.745786 0 0 130.830721-42.262546-42.304502L646.386198 367.222639zM369.616664 815.721373 151.709749 815.721373 151.709749 510.566348l217.906915-174.326351L369.616664 815.721373 369.616664 815.721373z',
                    title: '周期线'
                    ,onclick: function (){
                        if (self.toolCallback)
                        {
                            self.toolCallback(event_key.UIACT_TOOL_TODO);
                        }
                    }
                },
                myTool_4: {
                    show: false,
                    icon: 'path://M221.44 126.976l-221.504 768 803.84 0 220.096-768L221.44 126.976zM747.008 830.976 97.28 830.976l178.176-640 653.824 0L747.008 830.976z',
                    title: '平行四边形'
                    ,onclick: function (){
                        if (self.toolCallback)
                        {
                            self.toolCallback(event_key.UIACT_TOOL_TODO);
                        }
                    }
                },
                myTool_Forecast: {
                    show: false,
                    icon: 'path://M839.98294 601.496313l119.413694 0 0-59.706847L839.98294 541.789467 839.98294 601.496313zM780.276093 840.324724 780.276093 64.132646 63.790862 840.324724 780.276093 840.324724zM660.862399 720.91103 362.327142 720.91103l298.535257-298.535257L660.862399 720.91103zM839.98294 362.667903l119.413694 0 0-59.706847L839.98294 302.961056 839.98294 362.667903zM839.98294 64.132646l0 59.706847 119.413694 0L959.396633 64.132646 839.98294 64.132646zM839.98294 840.324724l119.413694 0 0-59.706847L839.98294 780.617877 839.98294 840.324724z',
                    title: '预测'
                    ,onclick: function (){
                        if (self.toolCallback)
                        {
                            self.toolCallback(event_key.UIACT_TOOL_TODO);
                        }
                    }
                },
                myTool_upload: {
                    show: false,
                    icon: 'path://M772.446777 368.57238c-11.789511-135.038556-123.906008-240.97633-260.659625-240.97633-136.75464 0-248.869091 105.937774-260.659625 240.97633C111.535259 374.298801 0.021489 490.091014 0.021489 632.497375c0 142.006248 110.890576 257.535471 249.932306 263.86462l0 0.606821 202.326055 0L452.27985 656.586003l-82.614579 0 130.007983-147.376559 127.031185 147.376559-79.212086 0 0 240.383836 226.12918 0 0-0.606821c139.04173-6.329149 249.932306-121.859395 249.932306-263.86462C1023.553838 490.091014 912.041092 374.298801 772.446777 368.57238zM761.719458 860.904435c-0.010233 0-0.021489-0.001023-0.031722-0.001023l-178.491207 0.001023L583.196529 692.695409l124.547621 0L500.924757 455.628108 294.105365 692.695409l122.469286 0 0 168.209026-142.818753-0.001023c0 0-0.104377-0.3776-0.154519-0.561795-3.9121 0.204661-7.78429 0.562818-11.746532 0.562818-124.887358 0-226.12918-102.262058-226.12918-228.40706 0-116.662023 86.71906-212.420971 198.529589-226.208998 19.543102-3.794419 39.769772-3.667529 51.962465-3.045359-0.180102-3.727904-0.559748-7.402597-0.559748-11.175527 0-126.147048 101.241822-228.408083 226.12918-228.408083s226.12918 102.260012 226.12918 228.408083c0 4.058432-0.393973 8.015557-0.600681 12.021801l59.860343 3.185552c108.001783 17.195637 190.673667 111.296829 190.673667 225.221508C987.848639 758.642376 886.606817 860.904435 761.719458 860.904435z',
                    title: '补充'
                    ,onclick: function (){
                        if (self.toolCallback)
                        {
                            self.toolCallback(event_key.UIACT_TOOL_TODO);
                        }
                    }
                }
            }
        };
        return toolbox;
    }

    private getBrush()
    {
        let brush = {
            xAxisIndex: 'all',
            brushLink: 'all',
            outOfBrush: {
                colorAlpha: 0.1
            }
        };
        return  brush;
    }
}