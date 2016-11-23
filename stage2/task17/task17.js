/*
设计思路：通过randomBuildData随即产生需要用到的数据，即aqiSourceData，通过initAqiChartData得到渲染图表需要
用到的数据，存放在chartData中。通过pageState得到当前的表到选项，对应chartData中的数据，通过renderChart渲染图表

知识点：1。Date类型：var dat = new Date("2016-01-01")创建它定日期的日期对象。
                    dat.getFullYear()得到日期中的年份，
                    dat.getMonth()得到月份（从0开始）
                    dat.getDate()得到天数
                    dat.setDate()设置日期月份中的天数，如果传入的值超过了个改月应有的天数，则增加月份。
       2.Math类型:Math.ceil()向上取整。
                 Math.random()产生一个0<=x<1的一个随机数 
       3.String类型：substring(2, 8)返回被操作字符串的子串
                    replace(要被替换的字符串，替换的字符串)
*/


/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

function addEvent(element, event, listener) {
    if (element.addEventListener) { //标准
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) { //低版本ie
        element.attachEvent("on" + event, listener);
    } else { //都不行的情况
        element["on" + event] = listener;
    }
}
// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {   //得到日期格式字符串
    var y = dat.getFullYear();//得到四位数的年份
    var m = dat.getMonth() + 1;//返回日其中的月份，从零开始
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();//返回日期月份中的天数
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}

function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {

};



//获取随机颜色
function randomColor() {
    return "#" + Math.random().toString(16).substring(2, 8);
}


// 记录当前页面的表单选项
var pageState = {
    nowSelectCity: 0,
    nowGraTime: "day"
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    // 处理好的数据存到 chartData 中
    var day={};

    var week={};
    var weekDays=5;   //满7为一周，2016-01-01为周5
    var weekAqiTotal=0;  //一周的Aqi总数
    var weekNum=1;         //周数

    var month={};
    var monthNum=1;   //月数
    var monthAqiTotal=0;   //一月的Aqi总数

    for(city in aqiSourceData){          // 遍历源数据
        day[city]={};
        week[city]={};
        month[city]={};

        for(date in aqiSourceData[city]){
            var aqiData = aqiSourceData[city][date];

            //设置日的图表数据
            var dayGra={};
            dayGra['data']=aqiData;
            dayGra['width']='8px';
            dayGra['height']=aqiData*0.8+'px';
            dayGra['color']=randomColor();

            day[city][date]=dayGra;

            //设置周的图表数据

            weekAqiTotal+=aqiData;
            if(weekDays == 7 || date == '2016-03-31'){
                //处理第一周和最后一周不满七天的情况

                if(date== '2016-01-03'){
                    var weekAveAqi=(weekAqiTotal/3).toFixed(2);
                }else if(date == '2016-03-31'){
                    var weekAveAqi=(weekAqiTotal/4).toFixed(2);
                }else{
                    var weekAveAqi=(weekAqiTotal/7).toFixed(2)
                }

                var key="第"+weekNum+"周";

                var weekGra={};
                weekGra['data']=weekAveAqi;
                weekGra['width']="70px";
                weekGra['height']=weekAveAqi*0.8+'px';
                weekGra['color']=randomColor();

                week[city][key]=weekGra;
                weekNum++;
                weekAqiTotal=0;
                weekDays=0;
            }
            weekDays++;

            //设置月的图表数据
            monthAqiTotal+=aqiData;
            if(date == '2016-01-31' || date == '2016-03-31' || date == '2016-02-29'){
                // 处理2月和1、3月天数不同的情况
                if (date == '2016-02-29') {
                    var monthAveAqi = (monthAqiTotal / 29).toFixed(2);
                } else {
                    var monthAveAqi = (monthAqiTotal / 31).toFixed(2);
                };
                var keys = monthNum + '月';
                var monthGra = {};

                monthGra['data'] = monthAveAqi;
                monthGra['height'] = monthAveAqi * 0.8 + 'px';
                monthGra['width'] = '150px';
                monthGra['color'] = randomColor();

                month[city][keys] = monthGra;

                monthTotal = 0;
                monthNum++;
            }
        }
        weekNum=1;
        monthNum=1;
    }


    chartData.day = day;
    chartData.week = week;
    chartData.month = month;

}


/**
 * 渲染图表
 */
function renderChart() {
    var aqi_chart_wrap=document.getElementsByClassName("aqi-chart-wrap")[0];
    var graCity=pageState["nowSelectCity"];
    var graTime=pageState["nowGraTime"];

    var graData=chartData[graTime][graCity];
    
    var html="";
    var style=" style=' width:{width}; height:{height}; background-color:{color} ' ";
    var title=" title=' {time} 的空气质量数值为 : {data}' "
    var model="<div "+style+title+"></div>";
    for(e in graData){
        html+=model.replace('{width}',graData[e].width).replace('{height}',graData[e].height)
            .replace('{color}',graData[e].color).replace('{time}',e)
            .replace('{data}',graData[e].data);
    }
    aqi_chart_wrap.innerHTML=html;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(e) {
    // 确定是否选项发生了变化 
    if(e.target.value==pageState['nowGraTime']){
        return false;
    }
   
    // 设置对应数据
    pageState['nowGraTime']=e.target.value;
    // 调用图表渲染函数
    renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange(e) {
    // 确定是否选项发生了变化 
    if(e.target.value==pageState['nowSelectCity']){
        return false;
    }
    // 设置对应数据
    pageState['nowSelectCity']=e.target.value;
    // 调用图表渲染函数
    renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
    var time_seclect = document.getElementById('form-gra-time');

    addEvent(time_seclect, "change", graTimeChange);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var city_select = document.getElementById("city-select");
    var html="";
    var model="<option>{city}</option>"
    for(city in aqiSourceData){
        html+=model.replace("{city}",city)+"<br/>";
    }
    city_select.innerHTML=html;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange
    
    addEvent(city_select, "change", citySelectChange);
}


/**
 * 初始化函数
 */
function init() {
    initGraTimeForm()
    initCitySelector();
    initAqiChartData();
}

init();

