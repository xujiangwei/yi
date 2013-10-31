define(function(require, exports, module) {
	var env = {
			ie : /MSIE/i.test(navigator.userAgent),
			ie6 : /MSIE 6/i.test(navigator.userAgent),
			ie7 : /MSIE 7/i.test(navigator.userAgent),
			ie8 : /MSIE 8/i.test(navigator.userAgent),
			ie9 : /MSIE 9/i.test(navigator.userAgent),
			firefox : /Firefox/i.test(navigator.userAgent),
			opera : /Opera/i.test(navigator.userAgent),
			webkit : /Webkit/i.test(navigator.userAgent),
			camino : /Camino/i.test(navigator.userAgent)
		};
	var $$ = function(id) {
		return "string" == typeof id ? document.getElementById(id) : id;
	};
	require("plugins/calendar/calendar.css");
	var BaseClass=require("plugins/calendar/base.js");
	var DoubleTimeSlider=require("plugins/calendar/timeslider.js");
	var CalendarGroup=require("plugins/calendar/calendar.js");
	
	function getElementX(e) {
		if (!env.firefox) {
			return window.event.offsetX;
		} else {
			return e.layerX;
		}
	}
	function getElementY(e) {
		if (!env.firefox) {
			return window.event.offsetY;
		} else {
			return e.layerY;
		}
	}
	function toContainerX(elem, toElem) {
		return elem.offsetParent != toElem ? elem.offsetLeft
				+ toContainerX(elem.offsetParent, toElem) : elem.offsetLeft;
	}
	function toContainerY(elem, toElem) {
		return elem.offsetParent != toElem ? elem.offsetTop
				+ toContainerY(elem.offsetParent, toElem) : elem.offsetTop;
	}
	
	var ChooseTime=BaseClass.extend({	
		DestroyModle : function() {
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
                               '<td width="109px" style="font-size:12px;"><h5>起始时间：</h5></td>',
                               '<td></td>',
                               '<td width="68px" style="font-size:12px;"></td>',
                            '</tr>',   
                            '<tr>',
                                '<td width="109px"><input  class="form-control"  type="text" id="startmonth@{id}" value="" /></td>',
                                '<td>-</td>',
                                '<td width="68px"><input   class="form-control"   type="text" id="startMinute@{id}" value=""/></td>',          
                             '</tr>',
                             '<tr>',
                             '<td width="109px" style="font-size:12px;"><h5>结束时间：</h5></td>',
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
        RandomId:function(){
     	   do{
     		  var id=this.randomChar();
     	   }while($$(id));
            return id;
        },
		HideAlert:function(){
			$$('alert'+this.id).style.display="none";
		},
		ShowAlert:function(text){
	        $$('alert'+this.id).style.display="block";
	        $$('alert'+this.id).innerHTML=text;
		},
		TimeSliderHide:function(){
			this.DoubleTimeSliderObj.Hide();
		},
		CalendarHide:function(){
			this.CalendarGroupObj.Hide();
		},
		Show:function(){
			this.elem.style.display="block";
		},
		Hide:function(){
			this.removeEventHandler(document,"click",this._DocumentClick);
			this.elem.style.display="none";
			this.flag=true;
		},
		ClearInput:function(){	
			$$("startmonth"+this.id).style.borderTop="1px solid #A3A3A3";
			$$("startmonth"+this.id).style.borderLeft="1px solid #A3A3A3";
			$$("startmonth"+this.id).style.borderBottom="1px solid #CCC";
			$$("startmonth"+this.id).style.borderRight="1px solid #CCC";
			$$("endmonth"+this.id).style.borderTop="1px solid #A3A3A3";
			$$("endmonth"+this.id).style.borderLeft="1px solid #A3A3A3";
			$$("endmonth"+this.id).style.borderBottom="1px solid #CCC";
			$$("endmonth"+this.id).style.borderRight="1px solid #CCC";
			$$("startMinute"+this.id).style.borderTop="1px solid #A3A3A3";
			$$("startMinute"+this.id).style.borderLeft="1px solid #A3A3A3";
			$$("startMinute"+this.id).style.borderBottom="1px solid #CCC";
			$$("startMinute"+this.id).style.borderRight="1px solid #CCC";
			$$("endMinute"+this.id).style.borderTop="1px solid #A3A3A3";
			$$("endMinute"+this.id).style.borderLeft="1px solid #A3A3A3";
			$$("endMinute"+this.id).style.borderBottom="1px solid #CCC";
			$$("endMinute"+this.id).style.borderRight="1px solid #CCC";
		},
		getSubmitButton:function(){
			return $$("submit"+this.id);
		},
		InputMonthClick:function(e){
			var elem = e.target || e.srcElement;
			this.ClearInput();
			elem.style.border="3px solid #07C";
		},
		InputMinuteClick:function(e){
			var elem = e.target || e.srcElement;
			this.ClearInput();
			elem.style.border="3px solid #86BE2B";
		},
		DocumentClick:function(){
			this.Hide();
		
			
		},
		InputElemClick:function(e){
			if(this.flag){
				if(env.ie){
					if(this.options.Location=="left"){
						 var x=$$(this.options.TriggerElem).getBoundingClientRect().left;
					}else{
						 var x=document.documentElement.scrollWidth-$$(this.options.TriggerElem).getBoundingClientRect().right;
					}
			       
			        var y=$$(this.options.TriggerElem).getBoundingClientRect().top+document.documentElement.scrollTop+$$(this.options.TriggerElem).offsetHeight;
				}else{
					 if(this.options.Location=="left"){
						 var x=$$(this.options.TriggerElem).getBoundingClientRect().left;
					 }else{
					     var x=document.documentElement.scrollWidth-$$(this.options.TriggerElem).getBoundingClientRect().right;
					 }
					 var y=toContainerY($$(this.options.TriggerElem),document.body)+$$(this.options.TriggerElem).offsetHeight;
				}
			    this.elem.style.top=y+"px";
			 
			    if(this.options.Location=="left"){
			        this.elem.style.left=x+"px";
			    }else{
			    	this.elem.style.right=x+"px";
			    }
			    this.Show();
			    this.addEventHandler(document,"click",this._DocumentClick);
		        if (e && e.stopPropagation ){ 
		            e.stopPropagation();
		        }else{
		           window.event.cancelBubble = true;
		        }
		        this.flag=false;
			}else{
				this.Hide();
				
				this.flag=true;
			}
		},
		SubmitClick:function(){
			$$(this.options.InputElem).innerHTML=this.getRange();
			this.options.onOk();
			this.Hide();
		},
		EventElem:function(){
			this._DocumentClick=this.Bind(this,this.DocumentClick);
			this.addEventHandler($$("startmonth"+this.id),"click",this.Bind(this,this.InputMonthClick));
			this.addEventHandler($$("endmonth"+this.id),"click",this.Bind(this,this.InputMonthClick));
			this.addEventHandler($$("startMinute"+this.id),"click",this.Bind(this,this.InputMinuteClick));
			this.addEventHandler($$("endMinute"+this.id),"click",this.Bind(this,this.InputMinuteClick));
			this.addEventHandler($$(this.options.TriggerElem),'click',this.Bind(this,this.InputElemClick));
			this.addEventHandler(this.elem,'click',this.Bind(this,this.StopPropagation));
			
			this.addEventHandler($$("submit"+this.id),"click",this.Bind(this,this.SubmitClick));
			this.addEventHandler($$("cancel"+this.id),"click",this.Bind(this,this.Hide));
			
		},
		StopPropagation:function(e){
	        if (e && e.stopPropagation ){ 
	            e.stopPropagation();
	        }else{
	           window.event.cancelBubble = true;
	        }
		},
		getRange:function(){
			return $$("startmonth"+this.id).value+" "+$$("startMinute"+this.id).value+" - "+$$("endmonth"+this.id).value+" "+$$("endMinute"+this.id).value;
		},
		getStartTime:function(){
			return $$("startmonth"+this.id).value+" "+$$("startMinute"+this.id).value+":00";
		},
		getEndTime:function(){
			return $$("endmonth"+this.id).value+" "+$$("endMinute"+this.id).value+":00";
		},
        CreateElem:function(){
        	this.id=this.RandomId();
        	this.elem = document.body.insertBefore(document.createElement("div"), document.body.childNodes[0]);
        	this.elem.id=this.id;
        	this.elem.className="_song_choosetime";
        	this.elem.style.display="none";
        	this.flag=true;
        
			this.elem.innerHTML=this.Modle.getElemEx({
				id:this.id
			});
			
			var StartTimeArr = this.options.StartTime.split(" ");
			var StartTimeYear=StartTimeArr[0];
			var StartTimeYearArr=StartTimeYear.split("-");
			var StartTimeMinute=StartTimeArr[1];
			var StartTimeMinuteArr=StartTimeMinute.split(":");
			
			var EndTimeArr = this.options.EndTime.split(" ");
			var EndTimeYear=EndTimeArr[0];
			var EndTimeYearArr=EndTimeYear.split("-");
			var EndTimeMinute=EndTimeArr[1];
			var EndTimeMinuteArr=EndTimeMinute.split(":");
			
			this.CalendarGroupObj=new this.options.CalendarGroup({
				CaleNum:this.options.CaleNum,
				Papa:this,
			    Start:{
		            year:parseInt(StartTimeYearArr[0], 10),
		            month:parseInt(StartTimeYearArr[1], 10),
		            day:parseInt(StartTimeYearArr[2], 10)
	            },
	            End:{
		            year:parseInt(EndTimeYearArr[0], 10),
		            month:parseInt(EndTimeYearArr[1], 10),
		            day:parseInt(EndTimeYearArr[2], 10)        	
	            },
                StartElem:$$("startmonth"+this.id),
                EndElem:$$("endmonth"+this.id),
				Container:$$("choose"+this.id)
			});
			this.DoubleTimeSliderObj=new this.options.DoubleTimeSlider({
				CaleNum:this.options.CaleNum,
				Start:{
				   hour:parseInt(StartTimeMinuteArr[0], 10),
				   minute:parseInt(StartTimeMinuteArr[1], 10)
                },
                End:{
 				   hour:parseInt(EndTimeMinuteArr[0], 10),
				   minute:parseInt(EndTimeMinuteArr[1], 10)	
                },
				Papa:this,
                StartElem:$$("startMinute"+this.id),
                EndElem:$$("endMinute"+this.id),
				Container : $$("choose"+this.id)
			});
			if(this.options.InputElem){this.options.InputElem.innerHTML=this.getRange();}
			
        },
        initialize : function(options) {
        	this.parent(options);
			if (this.Modle.sign) {	
				this.Modle.initialize(this.Template());
			}

        	this.CreateElem();
        	this.EventElem();	
        	this.DestroyModle();
	    },
	    SetOptionsValue : function(options) {
		    this.options = {
		    		onOk:function(){},
		    		Location:"right",
		    		CaleNum:3,
                    StartTime:"2013-10-16 00:00:00",
                    EndTime: "2013-10-17 12:00:00",
					InputElem:null,
					TriggerElem:null,
					CalendarGroup:CalendarGroup,
					DoubleTimeSlider:DoubleTimeSlider
		    };
	    }
	});
	module.exports=ChooseTime;
});