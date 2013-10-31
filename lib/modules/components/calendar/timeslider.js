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
	var BaseClass=require("plugins/calendar/base.js");
	var TimeSliderConfig={
			fontColor:"#333",
			fontSize:"11px",
			uitlBorderWidth:0,
			dotBorder:"1px solid #787878",
			uitlBorder:"1px solid #999",//"1px solid #D6D6D6"背景线上，border的样式
			halfMargin:8,//背景线上，短的线的外边距
			halfHeight:14,//背景线上，短的线的高度
			completeHeight:30,//背景线上的完成高度，也就是长的线的高度
			uitlWidth:10,//背景线的每个的宽度，也是拖动块的基本宽度
			padding:5,//标准内边距
			bothSidesPadding:14,//right,left在标准内边距上的增量
			bottomPadding:14,//bottom在标准内边距上的增量
			position:"relative",//被Container包含的首个元素的定位方式
			dotIncreHeight:2,
			"margin-left":14,
			"margin-right":13,
			dotIncreWdith:0//dot拖动块在uitlWidth上的增量宽度
			
	};
	var SliderDot = BaseClass.extend( {
		getScrollLeft : function() {
	        if (env.ie||env.opera||env.firefox) {
		        return document.documentElement.scrollLeft;
	        } else {
		        return document.body.scrollLeft;
	        }
        },
        getScrollTop : function() {
	        if (env.ie||env.opera||env.firefox) {
		        return document.documentElement.scrollTop;
	        } else {
		        return document.body.scrollTop;
	        }
        },
		MouseUp:function(){
			this.removeEventHandler(document, "mousemove", this.mouseMove);
			this.removeEventHandler(document, "mouseup", this.mouseUp);
			if (env.ie) {
				this.removeEventHandler(this.elem, "losecapture",this.mouseUp);
				this.elem.releaseCapture();
			} else {
				this.removeEventHandler(window, "blur", this.mouseUp);
			}   		
	    },
		MouseDown:function(event){
			this._x = event.clientX - this.elem.offsetLeft;
			this._y = event.clientY - this.elem.offsetTop;
			this._t=this.getScrollTop();
			this._l=this.getScrollLeft();		
			this.addEventHandler(document, "mousemove", this.mouseMove);
			this.addEventHandler(document, "mouseup", this.mouseUp);

			if (env.ie) {
				this.addEventHandler(this.elem, "losecapture", this.mouseUp);
				this.elem.setCapture();
			} else {
				this.addEventHandler(window, "blur", this.mouseUp);
				event.preventDefault();
			}
		
	    },
	    SetPosition:function(obj){
	    	var num=obj.hour*2;
            if(obj.minute>=30){
            	num++;
	    	}
            this.elem.style.left=(this.uitlWidth*num+this.boundaryLeft)+"px";   
            this.textElem.style.left=(this.uitlWidth*num+this.boundaryText)+"px";
            this.textElem.innerHTML=(obj.hour<10?("0"+obj.hour):obj.hour)+":"+(obj.minute<10?("0"+obj.minute):obj.minute);
	    },
		MouseMove:function(event){
	    	window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
	    	var left = event.clientX - this._x-this._l+this.getScrollLeft();
	    	left=Math.max(Math.min(left,this.boundaryRight),this.boundaryLeft);
	    	var num=Math.floor((left-this.boundaryLeft)/this.uitlWidth);	    	
	    	if(num!=this.num){
	    	    this.elem.style.left=(this.uitlWidth*num+this.boundaryLeft)+"px";    	    
	    	    if(num%2==0){
	    	    	var textAfter="00";
	    	    }else{
	    	    	var textAfter="30";
	    	    }
	    	    var textbefore=Math.floor(num/2);
	    	    
	    	    if(textbefore==24){textbefore=23;textAfter=59;}
	    	    if(textbefore<10){textbefore="0"+textbefore;}
	    	    this.textElem.style.left=(this.uitlWidth*num+this.boundaryText)+"px";
	    	    this.textElem.innerHTML=textbefore+":"+textAfter;
	    	    this.options.Papa.SetTime(textbefore+":"+textAfter);
	    	    this.num=num;
	    	}
	    },
        EventElem:function(){
        	this.addEventHandler(this.elem,"mousedown",this.BindAsEventListener(this,this.MouseDown));
	    },
		CreateElem:function(){
			var height=TimeSliderConfig.halfHeight+TimeSliderConfig.dotIncreHeight;
			var width=TimeSliderConfig.uitlWidth+TimeSliderConfig.dotIncreWdith;
			this.boundaryText=TimeSliderConfig.padding+TimeSliderConfig.bothSidesPadding-26/2;
			this.boundaryTop=TimeSliderConfig.padding+(TimeSliderConfig.completeHeight-height)/2-1;
			this.boundaryLeft=TimeSliderConfig.padding+TimeSliderConfig.bothSidesPadding-width/2;
			this.boundaryRight=(TimeSliderConfig.uitlWidth+TimeSliderConfig.uitlBorderWidth)*48+this.boundaryLeft;
			this.elem=document.createElement("div");
			this.elem.style.backgroundColor="whiteSmoke";
			this.elem.style.borderRadius="2px";
			this.elem.style.border=TimeSliderConfig.dotBorder;
			this.elem.style.height=height+"px";
			this.elem.style.width=width+"px";
			this.elem.style.position="absolute";
			this.elem.style.top=this.boundaryTop+"px";
			this.elem.style.left=this.boundaryLeft+"px";
			this.elem.style.cursor="pointer";
			this.num=0;
			this.uitlWidth=TimeSliderConfig.uitlBorderWidth+TimeSliderConfig.uitlWidth;
			$$(this.options.Container).appendChild(this.elem);
			this.textElem=document.createElement("div");
			this.textElem.style.position="absolute";
			this.textElem.style.wordBreak="break-all";
			this.textElem.style.textAlign="center";
			this.textElem.style.fontSize=TimeSliderConfig.fontSize;
			this.textElem.style.color=TimeSliderConfig.fontColor;
			this.textElem.style.left=this.boundaryText+"px";
			this.textElem.style.backgroundColor='#F7F7F7';
			this.textElem.style.top=(TimeSliderConfig.padding+TimeSliderConfig.completeHeight+10)+"px";
			if(env.ie6){
				this.textElem.style.width="27px";
			}
			this.textElem.innerHTML="00:00";
			$$(this.options.Container).appendChild(this.textElem);
			
		},
		initialize : function(options) {
			this.parent(options);
			this.CreateElem();
			this.mouseMove=this.BindAsEventListener(this,this.MouseMove);
			this.mouseUp=this.Bind(this,this.MouseUp);
            this.EventElem();

		},
		SetOptionsValue : function(options) {
			this.options = {
					Papa:null,
				    Container : ""
			};
		}
	});
	var TimeSlider = BaseClass.extend( {

        SetTime:function(text){
			if(this.oText){
				this.oText.value=text;
			}	
        },
        SetDate:function(obj){//{date:new Date()}
			var Time={
					   hour:obj.getHours(),
					   minute:obj.getMinutes()
				    };
	        this.Dot.SetPosition(Time);
	        this.options.TextElem.value=(obj.getHours()<10?"0"+obj.getHours():obj.getHours())+":"+(obj.getMinutes()<10?"0"+obj.getMinutes():obj.getMinutes());
        },
        TextElemBlur:function(){     	
        	if(!(/^((2[0123])|([01]\d)):([0-5]\d)$/.test(this.options.TextElem.value))){
        		this.options.TextElem.value="00:00";
        		this.options.Papa.ShowAlert("请输入正确的时间");
        		return false;
        	}else{
        		this.options.Papa.HideAlert();
        	}
        	var arr=this.options.TextElem.value.split(":");     
			var Time={
				   hour:parseInt(arr[0],10),
				   minute:parseInt(arr[1],10)
			    };
        	this.Dot.SetPosition(Time);
        },
		EventElem:function(){
			if(this.oText){
			//	this.elem.style.border="1px solid #86BE2B";
			}
			this.addEventHandler($$(this.options.TextElem),"blur",this.Bind(this,this.TextElemBlur));
		},
		CreateTable:function(){
			this.background=document.createElement("div");
			var uitlWidth=TimeSliderConfig.uitlBorderWidth+TimeSliderConfig.uitlWidth;
			var boundaryText=TimeSliderConfig.padding+TimeSliderConfig.bothSidesPadding-26/2-1;
			var buffer=this.StringBuffer();
			buffer.append('<table border="0" cellspacing="0" cellpadding="0">');
			buffer.append('<tr>');
			for(var i=0;i<24;i++){
				if(i==0||(i+1)%4==0){
					var textElem=document.createElement("div");
					textElem.style.position="absolute";
					textElem.style.wordBreak="break-all";
					textElem.style.textAlign="center";
					textElem.style.fontSize=TimeSliderConfig.fontSize;
					textElem.style.color="#333";
					textElem.style.left=(uitlWidth*i*2+boundaryText)+"px";
					textElem.style.top=(TimeSliderConfig.padding+TimeSliderConfig.completeHeight)+"px";
					if(env.ie6){
						textElem.style.width="27px";
					}
					textElem.innerHTML=(i<10?("0"+i):i)+":00";
					this.elem.appendChild(textElem);
				}
				buffer.append('<td><div style="');
				
				buffer.append('width:');
				buffer.append(TimeSliderConfig.uitlWidth+"px;");
				buffer.append('border-left:');
				buffer.append(TimeSliderConfig.uitlBorder);
				buffer.append(';height:');
				buffer.append(TimeSliderConfig.completeHeight);
				buffer.append('px"></div></td>');
				
				buffer.append('<td><div style="');
				buffer.append('margin-top:');buffer.append(TimeSliderConfig.halfMargin+"px;");
				buffer.append('margin-bottom:');buffer.append(TimeSliderConfig.halfMargin+"px;");
				buffer.append('width:');buffer.append(TimeSliderConfig.uitlWidth+"px;");
				buffer.append('border-left:');buffer.append(TimeSliderConfig.uitlBorder+";");
				buffer.append('height:');buffer.append(TimeSliderConfig.halfHeight+"px");
				buffer.append('"></div></td>');
			}
			buffer.append('</tr>');
			buffer.append('</table>');
			this.background.style.borderRight=TimeSliderConfig.uitlBorder;
			this.background.innerHTML=buffer.toString();
			this.elem.appendChild(this.background);
		},
		CreateElem:function(){
			this.elem=document.createElement("div");
			var padding=TimeSliderConfig.padding;
			this.elem.style.paddingTop=padding+"px";
			this.elem.style.paddingLeft=this.elem.style.paddingRight=(TimeSliderConfig.bothSidesPadding+padding)+"px";
			this.elem.style.paddingBottom=(TimeSliderConfig.bottomPadding+padding)+"px";
			this.elem.style.position=TimeSliderConfig.position;
			this.CreateTable();
			
			this.Dot=new this.options.Dot({
				Container:this.elem,
				Papa:this
			});
			this.Dot.SetPosition(this.options.Time);
			this.options.Container.appendChild(this.elem);
		},
		initialize : function(options) {
			this.parent(options);
			this.CreateElem();
			if(this.options.TextElem){this.oText=$$(this.options.TextElem);}
			this.oText.value=(this.options.Time.hour>=10?this.options.Time.hour:("0"+this.options.Time.hour))+":"+(this.options.Time.minute>=10?this.options.Time.minute:("0"+this.options.Time.minute));
			this.EventElem();
		
		},
		SetOptionsValue : function(options) {
			this.options = {
				Papa:{
		           HideAlert:function(){},
		           ShowAlert:function(){}
	            },
				Time:{
				   hour:null,
				   minute:null
			    },
			    TextElem:null,
				Dot : SliderDot,
				Container : ""
			};
		}
	});
	var DoubleTimeSlider = BaseClass.extend( {
        Hide:function(){
	        this.elem.style.display="none";
	        this.flag=false;
        },
        Show:function(){
		    this.elem.style.display="block";
		    this.flag=true;
	    },
	    ClickTextElem:function(){
	    	if(!this.flag){
	    		this.options.Papa.CalendarHide();
	    		this.Show();
	    	}
	    },
	    EventElem:function(){
	    	this.addEventHandler($$(this.options.StartElem),"click",this.Bind(this,this.ClickTextElem));
	    	this.addEventHandler($$(this.options.EndElem),"click",this.Bind(this,this.ClickTextElem));
	    },
        HideAlert:function(){
	    	this.options.Papa.HideAlert();
	    },
        ShowAlert:function(text){
        	this.options.Papa.ShowAlert(text);
        },
		CreateElem : function() {
			this.elem = document.createElement("div");
			this.elem.style.marginLeft=TimeSliderConfig["margin-left"]+'px';
			this.elem.style.marginRight=TimeSliderConfig["margin-right"]+'px';
			var div=document.createElement("div");
			div.style.margin="1px";
			div.innerHTML='<span class="label-slider">起始时间，分钟部分：</span>';
			this.elem.appendChild(div);
			new this.options.TimeSlider({
				   Papa:this,
				   Time:{
				        hour:this.options.Start.hour,
				        minute:this.options.Start.minute
			       },
				   TextElem:this.options.StartElem,
				   Container:this.elem
				});
			var div=document.createElement("div");
			div.style.margin="3px";
			div.innerHTML='<span class="label-slider">结束时间，分钟部分：</span>';
			this.elem.appendChild(div);
			new this.options.TimeSlider({
				   Time:{
		              hour:this.options.End.hour,
		              minute:this.options.End.minute
		           },
				   TextElem:this.options.EndElem,
				   Container:this.elem
				});
			this.Hide();
			this.options.Container.appendChild(this.elem);
		},
		initialize : function(options) {
			this.parent(options);
        	if(this.options.CaleNum==3){
        		TimeSliderConfig.uitlWidth=10;
        		TimeSliderConfig["margin-left"]=14;
        		TimeSliderConfig["margin-right"]=13;
        	}else if(this.options.CaleNum==2){
        		TimeSliderConfig.uitlWidth=7;
        		TimeSliderConfig["margin-left"]=1;
        		TimeSliderConfig["margin-right"]=0;
        	}
			this.CreateElem();
			this.EventElem();
		},
		SetOptionsValue : function(options) {
			this.options = {
			    CaleNum:3,
				Start:{
				   hour:null,
				   minute:null
                },
                End:{
 				   hour:null,
				   minute:null  	
                },
				Papa:{
 		           HideAlert:function(){},
 		           ShowAlert:function(){}
 	            },
				TimeSlider:TimeSlider,
                StartElem:null,
                EndElem:null,
				Container : null
			};
		}
	});
	module.exports=DoubleTimeSlider;
});