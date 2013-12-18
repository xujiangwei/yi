/**
 * Created by hbyzw on 13-12-13.
 * 说明：为模块添加了一个“selectdate”的自定义事件，处理函数包含一个传递返回“年-月-日”格式的参数
 */
define(function(require,exports,module){
    'require:nomunge,exports:nomunge,module:nomunge';

    require("./datepicker.refactor.css");
    var utils = require('utils');
    var extend = require('extend');
    var Base = require('component');

    /**
     * 生成随机ID
     * @returns {string}
     */
    var generaId = function(){
        var x="123456789poiuytrewqasdfghjklmnbvcxzQWERTYUIPLKJHGFDSAZXCVBNM";
        var res="";
        var len = parseInt(Math.random()*7 + 1);
        for(var i = 0;i < len; i++) {
            res += x.charAt(Math.ceil(Math.random()*100000000)%x.length);
        }
        return res;
    };

    /**
     * 模板替换
     * @param src
     * @param replacement
     * @returns {*}
     */
    var template = function(src, replacement){
        var res = src;
        var attrs = [];
        if(typeof src === "string"){
            var reg = /@\{([^}]*)\}/gm;
            attrs = src.match(reg);
            for(var i= 0,len = attrs.length;i<len;i++){
                var id = attrs[i].substring(2,attrs[i].length-1);
                res = res.replace(attrs[i],replacement[id]);
            }
        }
        return  res;
    };

    (function(){
        var DatePicker = extend(Base,{

            gid : generaId(),

            model:[
                '<input type="text" class="form-control" id="@{inputId}" />',
                '<span class="input-group-btn">',
                    '<button type="button" class="btn btn-default" id="@{btnId}">',
                        '<span class="glyphicon glyphicon-th"></span> ',
                    '</button> ',
                '</span> ',
                '<div id="@{id}calbody" class="panel panel-info"  style="z-index:10;position: absolute;display: none"></div>'
            ].join(""),

            calendarModel : [
                '<div class="panel panel-body">',
                '<table id="@{id}table" style="padding: 0;border: 0;width: 100%">',
                '<tr>',
                '<td><button type="button" class="btn btn-default btn-xs" id="@{id}left" ><span class="glyphicon glyphicon-chevron-left"></span></button></td>',
                '<td colspan="5"><button type="button" class="btn btn-default btn-sm " style="display: block; margin-left: auto; margin-right: auto;" id="@{id}YM" ><strong>12月2013年</strong> <span class="glyphicon glyphicon-chevron-down"></span></button></td>',
                '<td><button type="button" class="btn btn-default btn-xs" id="@{id}right"  style="display: block; margin-left: auto; "><span class="glyphicon glyphicon-chevron-right"></span></button></td>',
                '</tr>',
                '<tr>',
                        '<th class="month-day-td">日</th>',
                        '<th class="month-day-td">一</th>',
                        '<th class="month-day-td">二</th>',
                        '<th class="month-day-td">三</th>',
                        '<th class="month-day-td">四</th>',
                        '<th class="month-day-td">五</th>',
                        '<th class="month-day-td">六</th>',
                    '</tr>',
                '</table>',
                '</div>'
            ].join(""),

            chooseDateModel : [
                '<div id="@{id}choosetable" class="panel panel-body">',
                '<table  style="padding: 0;border: 0;width: 100%">',
                '<tr>',
                    '<td style="border-right: 1px solid #c5d2df">',
                        '<table id="@{id}month" style="padding: 0;border: 0;">',
                            '<tr>',
                            '<td class="month-day  Mr"><a href="javascript:void(0)"  class="calendar-x-date" value="1"  style="width:54px" hidefocus="on">一</a></td><td class="month-day  Mr"><a href="javascript:void(0)"  class="calendar-x-date" value="2" style="width:54px" hidefocus="on">二</a></td>',
                            '</tr>',
                            '<tr>',
                            '<td class="month-day  Mr"><a href="javascript:void(0)" class="calendar-x-date" value="3"  style="width:54px"  hidefocus="on">三</a></td><td class="month-day  Mr"><a href="javascript:void(0)" class="calendar-x-date" value="4" style="width:54px" hidefocus="on">四</a></td>',
                            '</tr>',
                            '<tr>',
                            '<td class="month-day  Mr"><a href="javascript:void(0)" class="calendar-x-date" value="5"  style="width:54px" hidefocus="on">五</a></td><td  class="month-day  Mr"><a href="javascript:void(0)"  class="calendar-x-date" value="6" style="width:54px" hidefocus="on">六</a></td>',
                            '</tr>',
                            '<tr>',
                            '<td class="month-day  Mr"><a  href="javascript:void(0)" class="calendar-x-date" value="7" style="width:54px" hidefocus="on">七</a></td><td  class="month-day  Mr"><a href="javascript:void(0)"  class="calendar-x-date" value="8" style="width:54px" hidefocus="on">八</a></td>',
                            '</tr>',
                            '<tr>',
                            '<td class="month-day  Mr"><a href="javascript:void(0)" class="calendar-x-date" value="9" style="width:54px" hidefocus="on">九</a></td><td  class="month-day  Mr"><a href="javascript:void(0)" class="calendar-x-date" value="10" style="width:54px" hidefocus="on">十</a></td>',
                            '</tr>',
                            '<tr>',
                            '<td class="month-day  Mr"><a href="javascript:void(0)" class="calendar-x-date" value="11" style="width:54px" hidefocus="on">十一</a></td><td  class="month-day  Mr"><a href="javascript:void(0)"  class="calendar-x-date" value="12" style="width:54px" hidefocus="on">十二</a></td>',
                            '</tr>',
                        '</table> ',
                    '</td>',
                    '<td>',
                        '<div>',
                            '<button type="button" class="btn btn-default btn-xs" id="@{id}year-left" type="btl" style="float: left; margin-left: 15px; " ><span class="glyphicon glyphicon-chevron-left" type="btl" ></span></button>',
                            '<button type="button" class="btn btn-default btn-xs" id="@{id}year-right" type="btl" style="float: right; margin-right: 15px; " ><span class="glyphicon glyphicon-chevron-right" type="btl" ></span></button>',
                        '</div>',
                        '<div id="@{id}year">',

                        '</div>',
                    '</td>',
                '</tr>',
                '<tr>',
                    '<td colspan="2" style="text-align: center"><button id="@{id}ok" class="btn btn-primary">确定</button>&nbsp;<button id="@{id}cancel" class="btn btn-default">取消</button> </td>',
                '</tr>',
                '</table> ',
                '</div>'
            ].join(""),

            /**
             * 创建年份选择面板
             * @param y 初始年份定位
             * @param f 判断是否是增加10年还是减少10年
             * @returns {*}
             */
            createYearTable : function(y,f){
                var yearModel = [];
                var years = [];
                var x = y - 3,
                    i = 0;

                x = parseInt(x)+10*f;

                while(i<10){
                    years.push(x++);
                    i++;
                }
                yearModel.push('<table id="@{id}10years" style="padding: 0;border: 0;">');

                for(var j= 0,k=0;j<5;j++){
                    yearModel.push('<tr>');
                    for(var d=0;d<2;d++){
                        yearModel.push('<td class="month-day Mr"><a href="javascript:void(0)" style="width:54px"');
                        if(years[k] == this.currDate.cacheYear){
                            yearModel.push('class="calendar-x-tq">');
                        } else{
                            yearModel.push('class="calendar-x-date">');
                        }
                        yearModel.push(years[k++]);
                        yearModel.push('</a></td>');
                    }
                    yearModel.push('</tr>');
                }
                yearModel.push('</table>');
                return template(yearModel.join(""),{id:this.gid});
            },

            /**
             * 日历数组
             * @param y 年份
             * @param m 月份
             * @returns {Array}
             */
            getMonthArray : function(y,m){

                var monthArray = []; //存储月份天数数据

                var firstDay = new Date(y,m,1);
                var firstWeek = firstDay.getDay();
                //var lastWeek = new Date(y,m+1,0).getDay();
                var m = mm = firstDay.getMonth();

                for(var i=0;i<firstWeek;i++){
                    var date = -i;
                    monthArray.unshift(new Date(y,m,date).getDate());
                }
                while(m === mm){
                    monthArray.push(firstDay.getDate());
                    var cdate = firstDay.getDate()
                    firstDay.setDate(cdate + 1);
                    m = firstDay.getMonth();
                }
                var a = 1;
                while(monthArray.length < 42){
                    monthArray.push(a++);
                }
                return monthArray;
            },
            /**
             * 创建日历表格
             * @param y 年份
             * @param m 月份
             * @returns {string}
             */
            createDateTable : function(y,m){
                var modelArray = [];
                var flagIndex = [];//用来表示1的位置

                var monthArray = this.getMonthArray(y,m);

                for(var i= 0,len=monthArray.length;i<len;i++){
                    if(monthArray[i] === 1){
                        flagIndex.push(i);
                    }
                }
                var w=0;
                while(w < 6){
                    modelArray.push('<tr>');
                    for(var j= w*7,len = (w+1)*7;j<len;j++){
                        modelArray.push('<td class="month-day  Mr"><a');

                        if(j>=flagIndex[0] && j<flagIndex[1]){
                            //如果是当前日期
                            if(monthArray[j] == this.currDate.date){
                                modelArray.push(' class="calendar-x-tq" href="javascript:void(0)">');
                            } else{
                                modelArray.push(' class="calendar-x-date" href="javascript:void(0)">');
                            }
                        } else{
                            modelArray.push(' class="month-day notday" href="javascript:void(0)">')
                        }
                        modelArray.push(monthArray[j]);
                        modelArray.push('</a></td>');
                    }
                    modelArray.push("</tr>");
                    w++;
                }
                var todayModel = '<tr><td colspan="7" style="text-align: center;"><button id="@{id}today" class="btn btn-primary">今天</button></td></tr>'
                var today = template(todayModel,{id:this.gid});
                modelArray.push(today);
                return modelArray.join("");
            },

            /**
             * 为日历面板添加事件
             */
            addCalendarEvents : function(){
                var that = this;
                //日期选择事件
                $("#" + that.gid +"table a").each(function(){
                    $(this).on("click",{componentId:that.getId()},function(e){
                        var compId = e.data.componentId;
                        var comp = Base.get(compId);
                        $(".calendar-x-tq").attr("class","calendar-x-date");
                        $(this).attr("class","calendar-x-tq");
                        comp.currDate.date = $(this).html();

                        var date = comp.currDate.year + "-" + (comp.currDate.month+1) + "-" + comp.currDate.date;

                        //为组件添加一个自定义的事件
                        comp.trigger("selectdate",date);

                        $("#" + comp.inputId).val(date);
                        //隐藏日历面板
                        $("#" + comp.gid + "calbody").hide();
                    });
                });

                //增加一个月份事件
                $("#" + this.gid + "right").on("click",{componentId:this.getId()},this.addMonth);

                //减少一个月份事件
                $("#" + this.gid + "left").on("click",{componentId:this.getId()},this.subMonth);

                //回到今天事件
                $("#" + this.gid + "today").on("click",{componentId:this.getId()},this.today);

                //年月选择的点击事件，用于打开年月选择面板
                $("#" + this.gid + "YM").on("click",{componentId:this.getId()},this.showYM);
            },

            /**
             * 增加一个月份处理函数
             * @param e
             */
            addMonth : function(e){
                var compId = e.data.componentId;
                var comp = Base.get(compId);
                comp.currDate.cacheMonth += 1;
                comp.currDate.cacheDate = $(".calendar-x-tq").html();
                var date = new Date(comp.currDate.cacheYear,comp.currDate.cacheMonth,comp.currDate.cacheDate);
                var currDate = comp.currDate;
                currDate.cacheYear = date.getFullYear();
                currDate.cacheMonth = date.getMonth();
                currDate.cacheDate = date.getDate();
                comp.showCalendar(date.getFullYear(),date.getMonth());
                comp = null;
                e.stopPropagation();
            },

            /**
             * 减少一个月份处理函数
             * @param e
             */
            subMonth : function(e){
                var compId = e.data.componentId;
                var comp = Base.get(compId);
                comp.currDate.cacheMonth -= 1;
                comp.currDate.cacheDate = $(".calendar-x-tq").html();
                var date = new Date(comp.currDate.cacheYear,comp.currDate.cacheMonth,comp.currDate.cacheDate);
                var currDate = comp.currDate;
                currDate.cacheYear = date.getFullYear();
                currDate.cacheMonth = date.getMonth();
                currDate.cacheDate = date.getDate();
                comp.showCalendar(date.getFullYear(),date.getMonth());
                comp = null;
                e.stopPropagation();
            },

            /**
             * 回到今天处理函数
             * @param e
             */
            today : function(e){
                var compId = e.data.componentId;
                var comp = Base.get(compId);
                var today = new Date();
                comp.currDate = {
                    year:today.getFullYear(),
                    month:today.getMonth(),
                    date:today.getDate(),
                    cacheYear:today.getFullYear(),
                    cacheMonth:today.getMonth(),
                    cacheDate:today.getDate()
                };

                var date = comp.currDate.year + "-" + (comp.currDate.month+1) + "-" + comp.currDate.date;
                $("#" + comp.inputId).val(date);

                //为组件添加一个自定义的事件
                comp.trigger("selectdate",date);

                comp.showCalendar(comp.currDate.year,comp.currDate.month);
                $("#" + comp.gid + "calbody").hide();
                comp = null;
                date = null;
            },

            /**
             * 创建年月选择面板
             * @param date
             */
            createYM : function(date){
                var chooseModel = template(this.chooseDateModel,{id:this.gid});
                $("#" + this.gid + "calbody").html(chooseModel);
                $("#" + this.gid + "year").html(this.createYearTable(new Date().getFullYear(),0));

                //注册月份单击事件
                $("#" + this.gid + "month a").each(function(){
                    if($(this).attr("value") == (date.cacheMonth + 1)){
                        $(this).attr("class","calendar-x-tq");
                    }

                });

                //注册年份单击事件
                $("#" + this.gid + "10years a").each(function(){

                    if($(this).html() == date.cacheYear){
                        $(this).attr("class","calendar-x-tq");
                    }

                });
                chooseModel = null;

            },

            /**
             * 年份选择事件处理函数，因为刷新年份选择区域时要重新注册年份选择事件
             * @param comp
             */
            addYearChooseEvents : function(comp){
                $("#" + comp.gid + "10years a").each(function(){
                    $(this).on("click",function(e){
                        $("#" + comp.gid + "10years " + ".calendar-x-tq").attr("class","calendar-x-date");
                        $(this).attr("class","calendar-x-tq");
                        comp.currDate.cacheYear = $(this).html();
                        e.stopPropagation();
                    });
                });
            },

            /**
             * 为年月选择面板添加事件
             * @param comp
             */
            addYMEvents : function(comp){


                //月份选择事件
                $("#" + comp.gid + "month a").each(function(){
                    $(this).on("click",function(e){
                        $("#" + comp.gid + "month " + ".calendar-x-tq").attr("class","calendar-x-date");
                        $(this).attr("class","calendar-x-tq");
                        comp.currDate.cacheMonth = $(this).attr("value")-1;
                        e.stopPropagation();
                    });
                });

                //注册年份选择事件
                comp.addYearChooseEvents(comp);

                //前进10年
                $("#" + comp.gid + "year-right").on("click",function(e){
                    var d = comp.currDate;
                    comp.rc = parseInt(comp.rc) + 1;
                   // $("#" + comp.gid + "year").html(comp.createYearTable(d.year,comp.rc));
                    $("#" + comp.gid + "year").html(comp.createYearTable(new Date().getFullYear(),comp.rc));
                    comp.addYearChooseEvents(comp);
                    e.stopPropagation();
                });

                //回退10年
                $("#" + comp.gid + "year-left").on("click",function(e){
                    var d = comp.currDate;
                    comp.rc = parseInt(comp.rc) -1;
                    $("#" + comp.gid + "year").html(comp.createYearTable(d.year,comp.rc));
                    $("#" + comp.gid + "year").html(comp.createYearTable(new Date().getFullYear(),comp.rc));
                    comp.addYearChooseEvents(comp);
                    e.stopPropagation();
                });
                //提交选择年月，关闭年月选择面板，调用日历展示面板
                $("#" + comp.gid + "ok").on("click",function(e){
                    var d = comp.currDate;
                    d.year = d.cacheYear;
                    d.month = d.cacheMonth;
                    comp.showCalendar(d.year, d.month);
                    e.stopPropagation();
                });

                //取消年月选择
                $("#" + comp.gid + "cancel").on("click",function(e){
                    var d = comp.currDate;
                    d.cacheYear = d.year;
                    d.cacheMonth = d.month;
                    d.cacheDate = d.date;
                    comp.showCalendar(d.year, d.month);
                    e.stopPropagation();
                });

            },

            /**
             * 显示年月选择面板
             * @param e
             */
            showYM : function(e){
                var compId = e.data.componentId;
                var comp = Base.get(compId);
                comp.rc = 0;
                comp.createYM(comp.currDate);
                comp.addYMEvents(comp);
                comp = null;
                e.stopPropagation();
            },

            /**
             * 替换日历面板模板
             * @returns {*}
             */
            getTemp : function(){
                return template(this.calendarModel,{id:this.gid});
            },

            /**
             * 存储和缓存当前日历对象
             */
            currDate : {
                year : new Date().getFullYear(),
                month: new Date().getMonth(),
                date : new Date().getDate(),
                cacheYear : new Date().getFullYear(),
                cacheMonth: new Date().getMonth(),
                cacheDate : new Date().getDate()
            },

            /**
             * 显示日历面板
             * @param y
             * @param m
             */
            showCalendar : function(y,m){
                $("#" + this.gid + "calbody").html(this.getTemp());
                var monthMap = ["一","二","三","四","五","六","七","八","九","十","十一","十二"];
                $("#" + this.gid + "YM strong").html(monthMap[m] + "月" + y + "年");
                $("#"+this.gid + "table").append(this.createDateTable(y,m));
                this.addCalendarEvents();

            },

            /**
             * 单击时打开日历面板
             * @param e
             */
            addBtnClick : function(e){
                var compId = e.data.componentId;
                var comp = Base.get(compId);
                var d = comp.currDate;
                var btnOffset = $(this).offset();
                var cal = $("#" + comp.gid + "calbody");
                var w = $(this).outerWidth(),
                    h = $(this).outerHeight(),
                    l = btnOffset.left,
                    t = btnOffset.top;
                cal.css({left:(l+w-cal.outerWidth()) + "px",top:(t+h) + "px"});

                cal.toggle();
                comp = null;
                e.stopPropagation();
            },

            /**
             * 初始化单击事件
             * @param inputId
             * @param btnId
             */
            initEvents : function(inputId,btnId){
                $("#" + btnId).on("click",{componentId:this.getId()},this.addBtnClick);
                $(document).on("click",{componentId:this.getId()},function(e){
                    var compId = e.data.componentId;
                    var comp = Base.get(compId);
                    comp.currDate.cacheYear = comp.currDate.year;
                    comp.currDate.cacheMonth = comp.currDate.month;
                    comp.currDate.cacheDate = comp.currDate.date;
                    comp.showCalendar(comp.currDate.year,comp.currDate.month);

                    $("#" + comp.gid + "calbody").hide();
                    var date = comp.currDate.year + "-" + (comp.currDate.month+1) + "-" + comp.currDate.date;
                    $("#" + inputId).val(date);
                    comp = null;

                });
            },
            initialize:function(){
                var inpId = this.inputId ? this.inputId : generaId() + "input";
                var bId = this.btnId ? this.btnId : generaId() + "btn";

                this.el.html(template(this.model,{inputId:inpId,btnId:bId,id:this.gid}));
                this.el.attr("class","input-group");
                this.initEvents(inpId,bId);

                this.showCalendar(this.currDate.year,this.currDate.month);
                var date = this.currDate.year + "-" + (this.currDate.month+1) + "-" + this.currDate.date;
                $("#" + this.inputId).val(date);

            },
            onRender : function(container,position){
                DatePicker.superclass.onRender.call(this,container,position);

                this.initialize();
            }
        });

        module.exports = DatePicker;
    }());

});