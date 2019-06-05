/**
 * @authors 1042482525@qq.com
 * @date    2018/10/12/0029 16:11:04
 */
"use strict";

define(["jquery","echarts"], function ($,echarts) {


    var log = function (msg) {
        if (typeof console !== 'undefined') {
            console && console.error && console.error(msg);
        }
    };
    if (!echarts) {
        log('ECharts is not Loaded');
        return;
    }



//注册主题
    echartsRegisterTheme();






//注册主题
    function echartsRegisterTheme() {

        var color_dark = [
            "#0054dc",
            "#8a00a3",
            "#01a23e",
            "#02cad6",
            "#ff6600",
            "#ff0076",
            "#b9e700"
        ];

        var color_dark_1 = [
            "#0026a2",
            "#0039ba",
            "#0054dc",
            "#3c6bf9",
            "#6d9eff",
            "#a5bff4",
            "#d1e0fe"
        ];

        var color_dark_2 = [
            "#490065",
            "#660080",
            "#8a00a3",
            "#a72fbf",
            "#c54fdd",
            "#fa81ff",
            "#fcb7ff"
        ];

        var color_dark_3 = [
            "#005c00",
            "#007c1b",
            "#01a23e",
            "#53d36b",
            "#82f4a8",
            "#bbffd1",
            "#e7ffef"
        ];

        var color_dark_4 = [
            "#004d59",
            "#006a77",
            "#0094a1",
            "#02cad6",
            "#50f1fe",
            "#95fbfb",
            "#d4ffff"
        ];

        var color_dark_5 = [
            "#880000",
            "#b11c00",
            "#cc3900",
            "#ff6600",
            "#ff9338",
            "#ffca6e",
            "#ffe1ac"
        ];

        var color_dark_6 = [
            "#86001f",
            "#b0003b",
            "#d60057",
            "#ff0076",
            "#ff549c",
            "#ff90d2",
            "#ffc4e7"
        ];

        //渐变色 默认垂直方向，从上到下
        var color_dark_gradient = [gradient(1),gradient(2),gradient(3),gradient(4),gradient(5),gradient(6)];
        //渐变色 方向 从右到左
        var color_dark_gradient_rl = [gradient(1,'rl'),gradient(2,'rl'),gradient(3,'rl'),gradient(4,'rl'),gradient(5,'rl'),gradient(6,'rl')];


        /* 深色主题 不同色相 —————————————————————— */
        echarts.registerTheme('vEchartsSkin_dark', create_json(color_dark,'dark'));
        /* 深色主题 不同色相 end */

        /* 同色相 主题 1 —————— */
        echarts.registerTheme('vEchartsSkin_dark_1', create_json(color_dark_1,'dark'));
        /* 同色相 主题 2 —————— */
        echarts.registerTheme('vEchartsSkin_dark_2', create_json(color_dark_2,'dark'));
        /* 同色相 主题 3 —————— */
        echarts.registerTheme('vEchartsSkin_dark_3', create_json(color_dark_3,'dark'));
        /* 同色相 主题 4 —————— */
        echarts.registerTheme('vEchartsSkin_dark_4', create_json(color_dark_4,'dark'));
        /* 同色相 主题 5 —————— */
        echarts.registerTheme('vEchartsSkin_dark_5', create_json(color_dark_5,'dark'));
        /* 同色相 主题 6 —————— */
        echarts.registerTheme('vEchartsSkin_dark_6', create_json(color_dark_6,'dark'));



        /* 浅色主题 不同色相 —————————————————————— */
        echarts.registerTheme('vEchartsSkin_light', create_json(color_dark,'light'));
        /* 浅色主题 不同色相 end */

        /* 同色相 主题 1 —————— */
        echarts.registerTheme('vEchartsSkin_light_1', create_json(color_dark_1,'light'));
        /* 同色相 主题 2 —————— */
        echarts.registerTheme('vEchartsSkin_light_2', create_json(color_dark_2,'light'));
        /* 同色相 主题 3 —————— */
        echarts.registerTheme('vEchartsSkin_light_3', create_json(color_dark_3,'light'));
        /* 同色相 主题 4 —————— */
        echarts.registerTheme('vEchartsSkin_light_4', create_json(color_dark_4,'light'));
        /* 同色相 主题 5 —————— */
        echarts.registerTheme('vEchartsSkin_light_5', create_json(color_dark_5,'light'));
        /* 同色相 主题 6 —————— */
        echarts.registerTheme('vEchartsSkin_light_6', create_json(color_dark_6,'light'));



        /* 渐变色主题 深色背景下 —————————————————————— */
        echarts.registerTheme('vEchartsSkin_dark_gradient', create_json(color_dark_gradient,'dark'));
        /* 渐变色主题 不同色相 end */
        /* 渐变色主题 深色背景下 方向从右到左 —————————————————————— */
        echarts.registerTheme('vEchartsSkin_dark_gradient_rl', create_json(color_dark_gradient_rl,'dark'));

        /* 渐变色主题 浅色背景下 —————————————————————— */
        echarts.registerTheme('vEchartsSkin_light_gradient', create_json(color_dark_gradient,'light'));
        /* 渐变色主题 不同色相 end */
        /* 渐变色主题 浅色背景下 方向从右到左 —————————————————————— */
        echarts.registerTheme('vEchartsSkin_light_gradient_rl', create_json(color_dark_gradient_rl,'light'));


    }





//创建 主题json
    function create_json(color,type) {
        var color_deep = '',
            color_deep9 = '',
            color_deep8 = '',
            color_deep6 = '',
            color_deep4 = '',
            color_deep3 = '',
            color_deep2 = '',
            color_deep1 = '',
            pieShadowColor = '',
            handleColor = '';
        switch (type){
            case 'dark':
                color_deep = '#ffffff';
                color_deep9 = 'rgba(255, 255, 255, 0.9)';
                color_deep8 = 'rgba(255, 255, 255, 0.8)';
                color_deep6 = 'rgba(255, 255, 255, 0.6)';
                color_deep4 = 'rgba(255, 255, 255, 0.4)';
                color_deep3 = 'rgba(255, 255, 255, 0.3)';
                color_deep2 = 'rgba(255, 255, 255, 0.2)';
                color_deep1 = 'rgba(255, 255, 255, 0.1)';
                pieShadowColor = 'rgba(0,0,0,.4)';
                handleColor = '#fff';
                break;
            case 'light':
                color_deep = '#111';
                color_deep9 = '#222';
                color_deep8 = '#333';
                color_deep6 = '#555';
                color_deep4 = '#777';
                color_deep3 = '#999';
                color_deep2 = '#aaa';
                color_deep1 = '#ccc';
                pieShadowColor = 'rgba(0,0,0,.2)';
                handleColor = '#ccc';
                break;
            default:
                color_deep = '';
        }

        return {
            "color": color,
            "textStyle": {},
            "grid":{
                "top": '35',
                "left": '2%',
                "right": '2%',
                "bottom": '10',
                "containLabel": true
            },
            "title": {
                "textStyle": {
                    "fontSize":"15",
                    "color": color_deep
                },
                "subtextStyle": {
                    "color": color_deep8
                }
            },
            "line": {
                "itemStyle": {
                    "normal": {
                        "borderWidth": "-1"
                    }
                },
                "lineStyle": {
                    "normal": {
                        "width": "2"
                    }
                },
                "symbolSize": "4",
                "symbol": "circle",
                "smooth": true
            },
            "radar": {
                "itemStyle": {
                    "normal": {
                        "borderWidth": "-1"
                    }
                },
                "lineStyle": {
                    "normal": {
                        "width": "2"
                    }
                },
                "symbolSize": "4",
                "symbol": "circle",
                "smooth": true
            },
            "bar": {
                "barGap":"25%",
                "barCategoryGap":"25%",
                "itemStyle": {
                    "normal": {
                        "barBorderWidth": 0,
                        "barBorderColor": color_deep6
                    },
                    "emphasis": {
                        "barBorderWidth": 0,
                        "barBorderColor": color_deep6
                    }
                }
            },
            "pie": {
                "label": {
                    "fontSize":'11',
                    "color":color_deep8
                },
                labelLine:{
                    length:5,
                    length2:10,
                    smooth:true,
                    lineStyle:{
                        shadowBlur: 10,
                        shadowColor: color_deep4,
                        color:color_deep4
                    }
                },
                "itemStyle": {
                    shadowBlur: 50,
                    shadowColor: pieShadowColor,
                    "normal": {
                        "borderWidth": 0,
                        "borderColor": color_deep6,
                    },
                    "emphasis": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    }
                }
            },
            "scatter": {
                "itemStyle": {
                    "normal": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    },
                    "emphasis": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    }
                }
            },
            "boxplot": {
                "itemStyle": {
                    "normal": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    },
                    "emphasis": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    }
                }
            },
            "parallel": {
                "itemStyle": {
                    "normal": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    },
                    "emphasis": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    }
                }
            },
            "sankey": {
                "itemStyle": {
                    "normal": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    },
                    "emphasis": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    }
                }
            },
            "funnel": {
                "itemStyle": {
                    "normal": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    },
                    "emphasis": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    }
                }
            },
            "gauge": {
                "itemStyle": {
                    "normal": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    },
                    "emphasis": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    }
                }
            },
            "candlestick": {
                "itemStyle": {
                    "normal": {
                        "color": "#c23531",
                        "color0": "#314656",
                        "borderColor": "#c23531",
                        "borderColor0": "#314656",
                        "borderWidth": 1
                    }
                }
            },
            "graph": {
                "itemStyle": {
                    "normal": {
                        "borderWidth": 0,
                        "borderColor": color_deep6
                    }
                },
                "lineStyle": {
                    "normal": {
                        "width": "1",
                        "color": color_deep4
                    }
                },
                "symbolSize": "4",
                "symbol": "circle",
                "smooth": true,
                "color": [
                    "#0054dc",
                    "#8a00a3",
                    "#01a23e",
                    "#02cad6",
                    "#ff6600",
                    "#ff0076",
                    "#b9e700"
                ],
                "label": {
                    "normal": {
                        "textStyle": {
                            "color": color_deep
                        }
                    }
                }
            },
            "map": {
                "itemStyle": {
                    "normal": {
                        "areaColor": "#89d0f7",
                        "borderColor": "rgba(0,0,0,0.16)",
                        "borderWidth": "1"
                    },
                    "emphasis": {
                        "areaColor": "#0054dc",
                        "borderColor": "rgba(0,0,0,0.16)",
                        "borderWidth": 1
                    }
                },
                "label": {
                    "normal": {
                        "textStyle": {
                            "color": "#ffffff"
                        }
                    },
                    "emphasis": {
                        "textStyle": {
                            "color": "rgba(255,255,255,0.8)"
                        }
                    }
                }
            },
            "geo": {
                "itemStyle": {
                    "normal": {
                        "areaColor": "#89d0f7",
                        "borderColor": "rgba(0,0,0,0.16)",
                        "borderWidth": "1"
                    },
                    "emphasis": {
                        "areaColor": "#0054dc",
                        "borderColor": "rgba(0,0,0,0.16)",
                        "borderWidth": 1
                    }
                },
                "label": {
                    "normal": {
                        "textStyle": {
                            "color": "#ffffff"
                        }
                    },
                    "emphasis": {
                        "textStyle": {
                            "color": "rgba(255,255,255,0.8)"
                        }
                    }
                }
            },
            "categoryAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": color_deep1
                    }
                },
                "axisTick": {
                    "show": true,
                    "lineStyle": {
                        "color": color_deep3
                    }
                },
                "axisLabel": {
                    "show": true,
                    "textStyle": {
                        "color": color_deep6,
                        "fontSize":"11"
                    }
                },
                "splitLine": {
                    "show": false,
                    "lineStyle": {
                        "color": [
                            color_deep1
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            color_deep3,
                            color_deep3
                        ]
                    }
                }
            },
            "valueAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": color_deep2
                    }
                },
                "axisTick": {
                    "show": true,
                    "lineStyle": {
                        "color": color_deep3
                    }
                },
                "axisLabel": {
                    "show": true,
                    "textStyle": {
                        "color": color_deep6,
                        "fontSize":"11"
                    }
                },
                "splitLine": {
                    "show": true,
                    "lineStyle": {
                        "color": [
                            color_deep1
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            color_deep3,
                            color_deep3
                        ]
                    }
                }
            },
            "logAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": color_deep2
                    }
                },
                "axisTick": {
                    "show": true,
                    "lineStyle": {
                        "color": color_deep3
                    }
                },
                "axisLabel": {
                    "show": true,
                    "textStyle": {
                        "color": color_deep6
                    }
                },
                "splitLine": {
                    "show": false,
                    "lineStyle": {
                        "color": [
                            color_deep6
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            color_deep3,
                            color_deep3
                        ]
                    }
                }
            },
            "timeAxis": {
                "axisLine": {
                    "show": true,
                    "lineStyle": {
                        "color": color_deep2
                    }
                },
                "axisTick": {
                    "show": true,
                    "lineStyle": {
                        "color": color_deep3
                    }
                },
                "axisLabel": {
                    "show": true,
                    "textStyle": {
                        "color": color_deep6
                    }
                },
                "splitLine": {
                    "show": false,
                    "lineStyle": {
                        "color": [
                            color_deep6
                        ]
                    }
                },
                "splitArea": {
                    "show": false,
                    "areaStyle": {
                        "color": [
                            color_deep3,
                            color_deep3
                        ]
                    }
                }
            },
            "toolbox": {
                "iconStyle": {
                    "normal": {
                        "borderColor": color_deep4
                    },
                    "emphasis": {
                        "borderColor": color_deep9
                    }
                }
            },
            "legend": {
                "top":2,
                "itemWidth": 10,
                "itemHeight": 8,
                "inactiveColor":color_deep4,
                "textStyle": {
                    "color": color_deep6,
                    "fontSize":"11"
                }
            },
            "tooltip": {
                "axisPointer": {
                    "lineStyle": {
                        "color": color_deep1,
                        "width": 1
                    },
                    "crossStyle": {
                        "color": color_deep1,
                        "width": 1
                    }
                },
                trigger: 'axis',
                textStyle:{
                    fontSize:'12',
                    textBorderWidth:'0',
                    textShadowBlur:'0'
                }
            },
            "timeline": {
                "lineStyle": {
                    "color": color_deep1,
                    "width": 1
                },
                padding: [2, 10],
                symbol:"circle",
                symbolSize: 7,
                "itemStyle": {
                    "normal": {
                        "color": color_deep4,
                        "borderWidth": "0",
                    },
                    "emphasis": {
                        "color": color_deep8
                    }
                },
                "controlStyle": {
                    itemSize:14,
                    "normal": {
                        "color": color_deep4,
                        "borderColor": color_deep4,
                        "borderWidth": "0"
                    },
                    "emphasis": {
                        "color": color_deep4,
                        "borderColor": color_deep4,
                        "borderWidth": "0"
                    }
                },
                "checkpointStyle": {
                    "color": "#FF6600",
                    symbolSize:10,
                    "borderColor": color_deep2
                },
                "label": {
                    "fontSize":"8",
                    "normal": {
                        "textStyle": {
                            "color": color_deep4
                        }
                    },
                    "emphasis": {
                        "textStyle": {
                            "color": color_deep4
                        }
                    }
                }
            },
            "visualMap": {
                "color": [
                    "#0054dc",
                    "#6d9eff",
                    "#a5bff4",
                    "#50f1fe"
                ]
            },
            "dataZoom": {
                "handleSize": "200%",
                height:'10',
                handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
                handleStyle: {
                    color: handleColor,
                    shadowBlur: 3,
                    shadowColor: color_deep3,
                    shadowOffsetX: 2,
                    shadowOffsetY: 2
                },
                dataBackground: {
                    areaStyle: {
                        color: '#f00'
                    },
                    lineStyle: {
                        opacity: 0.5,
                        //color: '#8392A5'
                        color: color_deep4
                    }
                },
                textStyle: {
                    color: color_deep,
                },
                borderColor:color_deep2,
                /*"backgroundColor": "rgba(47,69,84,0)",
                "dataBackgroundColor": "rgba(47,69,84,0.3)",
                "fillerColor": "rgba(167,183,204,0.4)",
                "handleColor": "#a7b7cc",*/
            },
            "markPoint": {
                "label": {
                    "normal": {
                        "textStyle": {
                            "color": color_deep
                        }
                    },
                    "emphasis": {
                        "textStyle": {
                            "color": color_deep
                        }
                    }
                }
            },
            animationDelay: function (idx) {
                return idx * 50;
            },
            animationEasing: 'quarticOut',
        }

    }





//常用属性 变量 ——————————————————————————————————————

    //color
    function color(type) {
        switch(type){
            case 1:
                return "#0054dc";
            case 2:
                return "#8a00a3";
            case 3:
                return "#01a23e";
            case 4:
                return "#02cad6";
            case 5:
                return "#ff6600";
            case 6:
                return "#ff0076";
            case 7:
                return "#b9e700";
        }
    }



    //线性渐变颜色
    // 变量：颜色类型、方向
    function gradient(type,dir) {
        var dir_new = 'tb'; //不指定方向，默认为从上到下
        if(typeof(dir) == "undefined"){
            dir_new = 'tb';
        }else{
            dir_new = dir;
        }

        //渐变方向
        var dirdata = {};
        switch(dir_new){
            case 'tb': //从上到下
                dirdata = {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1
                };
                break;
            case 'rl': //从右到左
                dirdata = {
                    x: 1,
                    y: 0,
                    x2: 0,
                    y2: 0
                };
                break;
            default: //默认为从上到下
                dirdata = {
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1
                };
        }


        // 颜色和方向合并
        switch(type){
            case 1:
                return $.extend(dirdata,{
                    type: 'linear',
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(0, 84, 220, 1)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(0, 84, 220, .01)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                });
            case 2:
                return $.extend(dirdata,{
                    type: 'linear',
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(138, 0, 163, 1)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(138, 0, 163, .01)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                });
            case 3:
                return $.extend(dirdata,{
                    type: 'linear',
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(1, 162, 62, 1)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(1, 162, 62, .01)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                });
            case 4:
                return $.extend(dirdata,{
                    type: 'linear',
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(2, 202, 214, 1)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(2, 202, 214, .01)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                });
            case 5:
                return $.extend(dirdata,{
                    type: 'linear',
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(255, 102, 0, 1)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(255, 102, 0, .01)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                });
            case 6:
                return $.extend(dirdata,{
                    type: 'linear',
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(255, 0, 118, 1)' // 0% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(255, 0, 118, .01)' // 100% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                });
        }

    }


    //grid
    function grid(type) {
        switch(type){
            case 1:
                return {
                    top: '10',
                    left: '2%',
                    right: '2%',
                    bottom: '10',
                    containLabel: true
                };
        }
    }



    //图例
    function legend(type) {
        switch(type){
            case 1:
                return {
                    right: '0',
                };
            case 2:
                return {
                    top:'middle',
                    right: '5',
                    itemWidth: 10,
                    itemHeight: 10,
                    orient:'vertical',
                    textStyle:{
                        color:'rgba(255,255,255,.8)',
                        fontSize:'12'
                    }
                };
            case 3:
                return {
                    top:'middle',
                    right: '15',
                    itemWidth: 10,
                    itemHeight: 10,
                    orient:'vertical',
                    textStyle:{
                        color:'rgba(255,255,255,.8)',
                        fontSize:'12'
                    }
                };
            case 4:
                return {
                    top: '0',
                    right: '15',
                    itemHeight: '2',
                    icon: 'rect',
                    textStyle:{
                        color:'rgba(255,255,255,.8)',
                        fontSize:'12'
                    }
                };
        }
    }



    //引导线
    function labelLine(type) {
        switch(type){
            case 1:
                return {
                    length:5,
                    length2:10,
                    smooth:true,
                    lineStyle:{
                        shadowBlur: 10,
                        shadowColor: 'rgba(255, 255, 255, 0.4)',
                        color:'rgba(255, 255, 255, 0.6)'
                    }
                };
        }
    }





    return {
        color:color, //color
        gradient:gradient, //渐变颜色
        grid:grid, //grid
        legend:legend, //图例
        //labelLine:labelLine, //引导线


    }







});


