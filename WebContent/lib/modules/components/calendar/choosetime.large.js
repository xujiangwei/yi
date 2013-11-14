/**
 * 时间选择控件，包含日立及时间轴
 * @author Xiaoyin Song
 *
 *使用说明：
 *	    var ChooseTimeLarge	=require('modules/components/calendar/choosetime.large.js');
 *	    new ChooseTimeLarge({
 *          caleNum:3,日历个数
 *	    	location:"left",定位
 *	    	InputElem:document.getElementById("buttontime"),将接受控件赋值的元素
 *			TriggerElem:document.getElementById("buttontime")触发控件的元素
 *	    });
 *
 */
define(function(require, exports, module) {
	require("modules/components/calendar/calendar.css");
	var BaseClass=require("modules/components/calendar/choosetime.js");

	var ChooseTime=Class(BaseClass,{	
		destroyModle : function() {
			delete this.Modle;
		},
		Modle : {
			modle : ['<table border="0" cellspacing="0" cellpadding="0">',
                       '<tr>',
                          '<td valign="top">',
                             '<div id="choose@{id}"></div>',
                          '</td>',
                          '<td>',
                            '<div class="hr">',
                            '<div id="alert@{id}" class="error"></div>',
                          '<div class="label" style="display:none">时间范围：',
                              '<select class="select">',
                                  '<option value="custom">自定义</option>',
                                  '<option value="today">今天</option>',
                                  '<option value="yesterday">昨天</option>',
                                  '<option value="lastweek">上周</option>',
                                  '<option value="lastmonth">上月</option>',
                              '</select>',
                          '</div><form class="form-inline">',
                          '<table border="0" cellspacing="0" cellpadding="0" style="border-spacing: 2px;border-color: gray;" >',
                            '<tr>',
                               '<td width="109px" style="font-size:12px;"><p class="text-muted credit">起始时间：</p></td>',
                               '<td></td>',
                               '<td width="68px" style="font-size:12px;"></td>',
                            '</tr>',   
                            '<tr>',
                                '<td width="109px"><input  class="form-control"  type="text" id="startmonth@{id}" value="" /></td>',
                                '<td>-</td>',
                                '<td width="68px"><input   class="form-control"   type="text" id="startMinute@{id}" value=""/></td>',          
                             '</tr>',
                             '<tr>',
                             '<td width="109px" style="font-size:12px;"><p class="text-muted credit">结束时间：</p></td>',
                             '<td></td>',
                             '<td width="68px" style="font-size:12px;"></td>',
                           '</tr>', 
                             '<tr>',
                                '<td width="109px"><input class="form-control"  type="text" id="endmonth@{id}" value=""  /></td>',//disabled="disabled"
                                '<td>-</td>',
                                '<td width="68px"><input  class="form-control"   type="text" id="endMinute@{id}" value=""/></td>',
                             '</tr>',
                          '</table>',
                          '<hr class="dividing">',
                          '<button  type="button" class="btn btn-primary" style="margin-left:20px;" id="submit@{id}">应用</button>',
                   
                          '<button   type="button" data-bb-handler="cancel" class="btn btn-default" style="margin-left:20px;" id="cancel@{id}">取消</button>',
                        '</div>',
                          '</td>',                          
                       '</tr>',
                      '</table></form>'
			         ].join(""),
			modleTem : null,
			initialize : function(Template) {
				
				this.modleTem = new Template(this.modle);
				this.sign = false;
			},
			getElemEx : function(options) {
				return this.modleTem.compile(options);
			},
			sign : true
		},	
		hideAlert:function(){
			this.$$('alert'+this.id).style.display="none";
		},
		showAlert:function(text){
	        this.$$('alert'+this.id).style.display="block";
	        this.$$('alert'+this.id).innerHTML=text;
		},
		timeSliderHide:function(){
			this.doubleTimeSliderObj.hide();
		},
		calendarHide:function(){
			this.calendarGroupObj.hide();
		},
		show:function(x,y){
		
			if(this.elem==null){
				
	        	this.createElem();
	        	this.Manager.push(this.elem.id,this);
	        	this.eventElem();	
			}
			this.Manager.hide(this.elem.id);
			if(x&&y){
		    this.elem.style.top=y+"px";
			 
		    if(this.options.location=="left"){
		        this.elem.style.left=x+"px";
		    }else{
		    	this.elem.style.right=x+"px";
		    }
			}
			
			this.elem.style.display="block";
		
		},
		clearInput:function(){	
			this.$$("startmonth"+this.id).style.borderTop="1px solid #A3A3A3";
			this.$$("startmonth"+this.id).style.borderLeft="1px solid #A3A3A3";
			this.$$("startmonth"+this.id).style.borderBottom="1px solid #CCC";
			this.$$("startmonth"+this.id).style.borderRight="1px solid #CCC";
			this.$$("endmonth"+this.id).style.borderTop="1px solid #A3A3A3";
			this.$$("endmonth"+this.id).style.borderLeft="1px solid #A3A3A3";
			this.$$("endmonth"+this.id).style.borderBottom="1px solid #CCC";
			this.$$("endmonth"+this.id).style.borderRight="1px solid #CCC";
			this.$$("startMinute"+this.id).style.borderTop="1px solid #A3A3A3";
			this.$$("startMinute"+this.id).style.borderLeft="1px solid #A3A3A3";
			this.$$("startMinute"+this.id).style.borderBottom="1px solid #CCC";
			this.$$("startMinute"+this.id).style.borderRight="1px solid #CCC";
			this.$$("endMinute"+this.id).style.borderTop="1px solid #A3A3A3";
			this.$$("endMinute"+this.id).style.borderLeft="1px solid #A3A3A3";
			this.$$("endMinute"+this.id).style.borderBottom="1px solid #CCC";
			this.$$("endMinute"+this.id).style.borderRight="1px solid #CCC";
		},
		getSubmitButton:function(){
			return this.$$("submit"+this.id);
		},
		inputMonthClick:function(e){
			var elem = e.target || e.srcElement;
			this.clearInput();
			elem.style.border="3px solid #07C";
		},
		inputMinuteClick:function(e){
			var elem = e.target || e.srcElement;
			this.clearInput();
			elem.style.border="3px solid #86BE2B";
		},
		documentClick:function(){
			this.hide();	
		},
		submitClick:function(){
			this.$$(this.options.inputElem).innerHTML=this.getRange();
			this.options.onOk(this);
			this.hide();
		},
		eventElem:function(){
			
			this._inputMonthClick=this.bind(this,this.inputMonthClick);
			this._inputMinuteClick=this.bind(this,this.inputMinuteClick);
			
			this._stopPropagation=this.bind(this,this.stopPropagation);
			
			$("#startmonth"+this.id).on("click",this._inputMonthClick);
			$("#endmonth"+this.id).on("click",this._inputMonthClick);
			$("#startMinute"+this.id).on("click",this._inputMinuteClick);
			$("#endMinute"+this.id).on("click",this._inputMinuteClick);

			$(this.elem).on('click',this._stopPropagation);
			
			this._submitClick=this.bind(this,this.submitClick);
			this._hide=this.bind(this,this.hide);
			$("#submit"+this.id).on("click",this._submitClick);
			$("#cancel"+this.id).on("click",this._hide);
			
		},
		stopPropagation:function(e){
	        if (e && e.stopPropagation ){ 
	            e.stopPropagation();
	        }else{
	           window.event.cancelBubble = true;
	        }
		},
		getRange:function(){
			return this.$$("startmonth"+this.id).value+" "+this.$$("startMinute"+this.id).value+" - "+this.$$("endmonth"+this.id).value+" "+this.$$("endMinute"+this.id).value;
		},
		getStartTime:function(){
			return this.$$("startmonth"+this.id).value+" "+this.$$("startMinute"+this.id).value+":00";
		},
		getEndTime:function(){
			return this.$$("endmonth"+this.id).value+" "+this.$$("endMinute"+this.id).value+":00";
		},
        createElem:function(){
        	this.id=this.randomId();
        	this.elem = document.body.appendChild(document.createElement("div"));
        	this.elem.id=this.id;
        	this.elem.className="panel panel-info _song_choosetime";
        	this.elem.style.display="none";
        	
        	this.panelBody=document.createElement("div");
        	this.panelBody.className="panel-body";
        	this.elem.appendChild(this.panelBody);
        	this.panelBody.innerHTML=this.Modle.getElemEx({
				id:this.id
			});
			
			var startTimeArr = this.options.startTime.split(" ");
			var startTimeYear=startTimeArr[0];
			var startTimeYearArr=startTimeYear.split("-");
			var StartTimeMinute=startTimeArr[1];
			var startTimeMinuteArr=StartTimeMinute.split(":");
			
			var endTimeArr = this.options.endTime.split(" ");
			var endTimeYear=endTimeArr[0];
			var endTimeYearArr=endTimeYear.split("-");
			var endTimeMinute=endTimeArr[1];
			var endTimeMinuteArr=endTimeMinute.split(":");
			
			this.calendarGroupObj=new this.options.CalendarGroup({
				key:this.elem.id,
				caleNum:this.options.caleNum,
				papa:this,
			    Start:{
		            year:parseInt(startTimeYearArr[0], 10),
		            month:parseInt(startTimeYearArr[1], 10),
		            day:parseInt(startTimeYearArr[2], 10)
	            },
	            End:{
		            year:parseInt(endTimeYearArr[0], 10),
		            month:parseInt(endTimeYearArr[1], 10),
		            day:parseInt(endTimeYearArr[2], 10)        	
	            },
                StartElem:this.$$("startmonth"+this.id),
                EndElem:this.$$("endmonth"+this.id),
				Container:this.$$("choose"+this.id)
			});
			this.doubleTimeSliderObj=new this.options.DoubleTimeSlider({
				caleNum:this.options.caleNum,
				Start:{
				   hour:parseInt(startTimeMinuteArr[0], 10),
				   minute:parseInt(startTimeMinuteArr[1], 10)
                },
                End:{
 				   hour:parseInt(endTimeMinuteArr[0], 10),
				   minute:parseInt(endTimeMinuteArr[1], 10)	
                },
				papa:this,
                StartElem:this.$$("startMinute"+this.id),
                EndElem:this.$$("endMinute"+this.id),
				Container : this.$$("choose"+this.id)
			});
			if(this.options.inputElem){this.options.inputElem.innerHTML=this.getRange();}
			
        },
        initialize : function(options) {
        	this.elem=null;
			this.setOptionsValue();
			this.setOptions(options);
			if(this.Manager.sign){
				this.Manager.initialize();
			}
			if (this.Modle.sign) {	
				this.Modle.initialize(this.template());
			}
			this._documentClick=this.bind(this,this.documentClick);
			this._inputElemClick=this.bind(this,this.inputElemClick);
			$(this.options.triggerElem).on('click',this._inputElemClick);
			this.flag=true;

	    },
	    destroy:function(){
	    	if(this.elem!=null){
	    	    this.calendarGroupObj.destroy();
	    	    this.calendarGroupObj=null;
	    	    this.doubleTimeSliderObj.destroy();
	    	    this.doubleTimeSliderObj=null;
	    	
			    $("#startmonth"+this.id).off("click",this._inputMonthClick);
			    $("#endmonth"+this.id).off("click",this._inputMonthClick);
			    $("#startMinute"+this.id).off("click",this._inputMinuteClick);
			    $("#endMinute"+this.id).off("click",this._inputMinuteClick);
		
			    $(this.elem).off('click',this._stopPropagation);
			
			    $("#submit"+this.id).off("click",this._submitClick);
			    $("#cancel"+this.id).off("click",this._hide);
			    this.Manager.remove(this.elem.id);
			    document.body.removeChild(this.elem);
			    this.elem=null;
			    this.panelBody=null;
			    
	    	}
	    }

	});
	module.exports=ChooseTime;
});