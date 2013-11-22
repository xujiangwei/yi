/**
 * 
 * @author Xiaoyin Song
 * 
 * v 1.0.0
 * 
 * 实现单选日历控件
 * 对外调用的类：datepicker
 * 
 * 调用格式：
 *	new DatePicker({
 *		location:"left",
 *		startTime:"2013-10-10",
 *		inputElem:document.getElementById("buttontime2"),
 *		triggerElem:document.getElementById("buttontime2")
 *	});
 */
define(function(require, exports, module) {
	require("modules/components/calendar/calendar.css");
	require('class');
	var BaseClass=require("modules/components/calendar/base.js");
	var BaseClassChoose=require("modules/components/calendar/choosetime.js");
	var selectMonth= Class(BaseClass,{
        findElem:function(value){
        	var a=this.options.container.getElementsByTagName("a");
        	for(var i=0,len=a.length;i<len;i++){
        		if(a[i].getAttribute('value')==value){
        			return a[i];
        		}
        	}
        },
        click:function(e){
            if ( e && e.stopPropagation ){             
                e.stopPropagation();
            } else{    
                e.cancelBubble = true;
            }
        	var elem=e.target||e.srcElement;
        	if(elem.nodeName.toLowerCase()=="a"){
        		this.findElem(this.value).className="calendar-x-date";
        		this.value=elem.getAttribute('value');
        		elem.className="calendar-x-tq";
        	}
        },
        getValue:function(){
        	return this.value;
        },
        setValue:function(value){
        	this.findElem(this.value).className="calendar-x-date";
        	this.value=value;
        	this.findElem(value).className="calendar-x-tq";
        },
        eventElem:function(){
        	this._click=this.bind(this,this.click);
        	$(this.options.container).on("click",this._click);   
        },
        createElem:function(){
        	this.options.container.innerHTML=['<table  border="0" cellspacing="0" cellpadding="0" width="100%" >',
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
        	                                 			   '</table>'].join("");
        
        },
	    initialize: function(options) {
		   this.setOptionsValue();
		   this.setOptions(options);
           this.value=1;
           this.createElem();
           this.eventElem();
	    },
	    setOptionsValue: function(options) {
	       this.options = {
	    		   container:null
            
	       };
	    },
	    destroy:function(){
	    	$(this.options.container).off("click",this._click);
	    }
	});
	var selectYear= Class(BaseClass,{
        getValue:function(){
    	    return this.value;
        },
        click:function(e){
            if ( e && e.stopPropagation ){             
               e.stopPropagation();
            } else{    
               e.cancelBubble = true;
            }
    	    var elem=e.target||e.srcElement;
    	    if(elem.nodeName.toLowerCase()=="a"){
    	    	
    	    		//alert(this.findElem(this.value))
    	    		if(this.findElem(this.value)){this.findElem(this.value).className="calendar-x-date";}   		        
    		        this.value=elem.getAttribute('value');
    		        elem.className="calendar-x-tq";
    	    	
    	    }else if(elem.nodeName.toLowerCase()=="button"||elem.nodeName.toLowerCase()=="span"){
    	    	if(elem.getAttribute('type').toLowerCase()=="btl"){
    	    		this.$$(this.options.container).innerHTML=this.createTable(this.y-10);
    	    	}else if(elem.getAttribute('type').toLowerCase()=="btr"){
    	    		this.$$(this.options.container).innerHTML=this.createTable(this.y+10);
    	    	}
    	    }
        },
        findElem:function(value){
     	   var a=this.options.container.getElementsByTagName("a");
     	   for(var i=0,len=a.length;i<len;i++){
     		   if(a[i].getAttribute('type')=='value'&&a[i].getAttribute('value')==value){
     			   
     			  return a[i];
     		   }
     	   }
        },
        setValue:function(value){
       	
        	this.value=value;
        	this.$$(this.options.container).innerHTML=this.createTable(value);
        },
        eventElem:function(){
          this._click=this.bind(this,this.click);
		  $(this.options.container).on("click",this._click);
        },
        createElem:function(){
     	   this.$$(this.options.container).innerHTML=this.createTable(this.value);
        },
        createTable:function(value){
        	var sb=this.stringBuffer();
        	sb.append('<table  border="0" cellspacing="0" cellpadding="0" width="100%" >');
        	sb.append('<tr>');
        	sb.append('<td><button type="button" class="btn btn-default btn-xs" id="@{id}left" type="btl" style="display: block; margin-left: auto; margin-right: auto; " ><span class="glyphicon glyphicon-chevron-left" type="btl" ></span></button>');
        	sb.append('</td><td ><button type="button" class="btn btn-default btn-xs" id="@{id}right"   type="btr" style="display: block; margin-left: auto; margin-right: auto; "><span  type="btr" class="glyphicon glyphicon-chevron-right"></span></button></td>');
        	sb.append('</tr>');
      
        	var y=Math.floor(value/10)*10;
        	this.y=y;
        	for(var i=0;i<10;i++){
        		sb.append('<tr>');
        		sb.append('<td class="month-day Mr"><a href="javascript:void(0)" style="width:54px"'); 
        		if(this.value==(y+i)){
        			sb.append('class="calendar-x-tq" ');
        	    }else{
        	    	sb.append('class="calendar-x-date" ');
        		}
        		sb.append('type="value" value="'+(y+i)+'" hidefocus="on">'+(y+i)+'</a></td>');
        		i++;
        		sb.append('<td class="month-day Mr"><a href="javascript:void(0)" style="width:54px" '); 
          		if(this.value==(y+i)){
        			sb.append('class="calendar-x-tq" ');
        	    }else{
        	    	sb.append('class="calendar-x-date" ');
        		}
        		sb.append('type="value" value="'+(y+i)+'" hidefocus="on">'+(y+i)+'</a></td>');
        		sb.append('</tr>');
        	}
        	sb.append('</table>');
        	return sb.toString();
        },
	    initialize: function(options) {
		   this.setOptionsValue();
		   this.setOptions(options);
           var d=new Date();
           this.value=d.getFullYear();
           this.createElem();
           this.eventElem();
	    },
	    setOptionsValue: function(options) {
	       this.options = {
	    		   container:null
                  
	       };
	    },
	    destroy:function(){
	    	 $(this.options.container).off("click",this._click);
	    }
	});
	/**
	 * 
	 * 类selectPanel
	 *  功能：
	 *     选择年的月的控件的包装器
	 *     被datepicker调用
	 * 
	 */
	var selectPanel= Class(BaseClass,{
		Modle:{
		   modle:['<table  border="0" cellspacing="0" cellpadding="0" width="100%" >',
'<tr>',
'<td style="height:165px; border-right: 1px solid #c5d2df;" width="50%">',
'<div id="@{id}mon">',
'</div>',
'</td>',
'<td>',
'<div id="@{id}year">',
'</div>',
'</td>',
'</tr>',
'<tr>',
'<td colspan="2" class="x-date-bottom"  align="center" style="padding:6px">',
'<table border="0" cellspacing="0" cellpadding="0">',
'<tr>',
'<td><div class="btn btn-primary" style="margin-right:4px" id="@{id}ok">确定</div></td>',
'<td><div class="btn btn-default" style="margin-left:4px" id="@{id}cancel">取消</div></td>',
'</tr>',
'</table>',
'</td>',
'</tr>',
'</table>'].join(""),
		   modleTem:null,
	       initialize:function(Template){
		       this.modleTem = new Template(this.modle);
	           this.sign=false;
           },
           getElemEx:function(options){
         	   return this.modleTem.compile(options);
            },
           sign:true
        },
        getMonth:function(){
        	return parseInt(this._m.getValue(),10);
        },
        getYear:function(){
        	return parseInt(this._y.getValue(),10);
        },
        ok:function(){
        	this.options.papa.callBack(this.getMonth(),this.getYear());
        	this.hide();
        },
        eventElem:function(){
        	this._ok=this.bind(this,this.ok);
        	this._hide=this.bind(this,this.hide);
        	$("#"+this.id+"ok").on("click",this._ok);
        	$("#"+this.id+"cancel").on("click",this._hide);
        },
        hide:function(){
        	this.elem.style.display="none";
        },
        show:function(e){
        
        	this.elem.style.width=this.options.papa.getWidth()+"px";
        	this.elem.style.height=this.options.papa.getHeight()+"px";
            if ( e && e.stopPropagation ){             
                e.stopPropagation();
             } else{    
                e.cancelBubble = true;
             }
            this._m.setValue(this.options.papa.getMonth());
            this._y.setValue(this.options.papa.getYear());
        	this.elem.style.display="block";
        	var oM =this.elem.style, t=0, c=179, d=25;
        	oM.left="0px"; clearTimeout(this._t);
        	var fun=function(t,b,c,d){
    			return c*((t=t/d-1)*t*t*t*t + 1) + b;
    		};
        	function _run(){
        		if(t<d){
        			t++;
        			oM.top = (Math.ceil(fun(t,0,c,d))-179) + "px";
                    this._t=setTimeout(_run, 10);
        		}else{
        			oM.top =  "0px";
        		}
        	}
        	_run();

        },
        createElem:function(){
        	this.id=this.randomId();
        	this.elem=document.createElement("div");
        	this.elem.id=this.id;
        	this.elem.style.display="none";
        	this.elem.className="panel panel-info";
        	this.elem.style.position="absolute";

        	this.panelBody=document.createElement("div");
        	this.panelBody.className="panel-body _song_calendar_wrapper";
        	this.elem.appendChild(this.panelBody);
        	this.panelBody.innerHTML=this.Modle.getElemEx({
        		id: this.id
        	});
        	this.options.container.appendChild(this.elem);
        	
        	this._m=new selectMonth({
        		container:this.$$(this.id+"mon")
        	});
        	this._y=new selectYear({
        		container:this.$$(this.id+"year")
        	});
        },
	    initialize: function(options) {
			this.setOptionsValue();
			this.setOptions(options);
            if(this.Modle.sign){
         	   this.Modle.initialize(this.template());
            }
            this.createElem();
            this.eventElem();
 	    },
 	   setOptionsValue: function(options) {
 	       this.options = {
 	    		papa:null,
 	    		container:null
 	       };
 	    },
 	   destroy:function(){
 		    this._m.destroy();
 		    this._y.destroy();
 			$("#"+this.id+"ok").off("click",this._ok);
        	$("#"+this.id+"cancel").off("click",this._hide);
        	this.options.container.removeChild(this.elem);
        	this.elem=null;
        	this.panelBody=null;
 	   }
	});
	/*
	 * 类 datepicker
	 *   功能：
	 *      负责创建整个控件，控件显示，位置，和日期选择
	 *   样式：
	 *      全部为bootstrap
	 */
	var datepicker=Class(BaseClassChoose, {

		Modle:{
		   modle:[
		          '<table border="0" cellspacing="0" cellpadding="0"  >',
	        '<tr>',
	        '<td><button type="button" class="btn btn-default btn-xs" id="@{id}left" ><span class="glyphicon glyphicon-chevron-left"></span></button></td>',
	         '<td><button type="button" class="btn btn-default btn-sm " style="display: block; margin-left: auto; margin-right: auto;" id="@{id}YM" ><strong>2013年</strong> <span class="glyphicon glyphicon-chevron-down"></span></button></td>',
	          '<td><button type="button" class="btn btn-default btn-xs" id="@{id}right"  style="display: block; margin-left: auto; "><span class="glyphicon glyphicon-chevron-right"></span></button></td>',
	          '</tr>',  
	          '<tr>',
	          '<td colspan="3">',
	          '<div class="_song_calendar_wrapper" id="cal@{id}" >',
	          '</div>',
	          '</td>',
	          '</tr>', 
	          '<tr>',
	          '<td colspan="3">',
	         '<button type="button"  id="@{id}today" class="btn btn-primary" style="display:block;margin-left:auto;margin-right:auto;">今天</button></div>',
	         '</td>',
	          '</tr>',
	         '</table>'].join(''),
	       initialize:function(Template){
		       this.modleTem = new Template(this.modle);
	           this.sign=false;
           },
           getElemEx:function(options){
         	   return this.modleTem.compile(options);
            },
           sign:true
        },
        getDate:function(){
        	return this.day;
        },
        getMonth:function(){
        	return this.month;
        },
        getYear:function(){
        	return this.year;
        },
        monthMap:{1:"一月",2:"二月",3:"三月",4:"四月",5:"五月",6:"六月",7:"七月",8:"八月",9:"九月",10:"十月",11:"十一月",12:"十二月"},
        callBack:function(M,Y){
        	this.day=1;
        	
        	this.setMonthYear(M,Y);
        	this.createTable(Y, M);  	
        },
        setMonthYear:function(M,Y){
        	this.month=M;
        	this.year=Y;
        
        	this.$$(this.id+"YM").innerHTML=this.monthMap[M]+"&nbsp;"+Y;
        },
        format:function(value){
        	value=value.replace(/^\s+|\s+$/g, '');
        	var v=value.split("-");
        	this.year=parseInt(v[0],10);
        	this.month=parseInt(v[1],10);
        	this.day=parseInt(v[2],10);
    
        	if(!this.year||!(this.year!=NaN)||this.year>this.maxYear||this.year<this.minYear){
        		this.year=this.y;
        	}
            if(!this.month||!(this.month!=NaN)||this.month>12||this.month<1){
            	this.month=this.m;
            }
            if(!this.day||!(this.day!=NaN)||this.day>new Date(this.year, this.month, 0).getDate()||this.day<1){
            	this.day=this.d;
            }
         //   this.Log("Format: "+ this.year+"  "+this.Month+"  "+this.Day)
        },
        datepickerHide:function(){
        	this.sp.hide();
        },
        show:function(x,y){
            if(this.elem==null){
            	this.createElem();
	        	this.Manager.push(this.elem.id,this);
	        	this.eventElem();	
            }
        	this.Manager.hide(this.elem.id);
        	
        	if(this.options.inputElem.nodeName.toLowerCase()=="input"){
            	this.format(this.$$(this.options.inputElem).value);
        	}else{
        	
        		this.format(this.$$(this.options.inputElem).innerHTML);
        	}
    
        	this.setDate();
      
        
        	this.createTable(this.year, this.month);
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
        setDate:function(){
        	this.setMonthYear(this.month,this.year);
        },
        click:function(e){

    	    var elem=e.target||e.srcElement;
    	    if(elem.nodeName.toLowerCase()=="a"){
    	    	this.day=elem.getAttribute('value');	
    	    	
    	    	var mon=this.month;
    	    	if(mon<10){mon="0"+mon;}
    	    	var day=this.day;
    	    	if(day<10){day="0"+day;}
    	    	if(this.options.inputElem.nodeName.toLowerCase()=="input"){
    	    		this.$$(this.options.inputElem).value=this.year+"-"+mon+"-"+day;
    	    	}else{
    	    		this.$$(this.options.inputElem).innerHTML=this.year+"-"+mon+"-"+day;
    	    	}
    	    	
    	    	this.hide();
    	    }
        },
        clickLeft:function(){
        	if(this.month-1<1){
        		this.month=12;
        		this.year=this.year-1;
        	}else{
        		this.month=this.month-1;
        	}
        //	this.Log(this.Month);
        	if(this.day>(new Date(this.year,this.month, 0).getDate())){
        		this.day=new Date(this.year,this.month, 0).getDate();
        	}
        	
        	this.setMonthYear(this.month,this.year);
        	this.createTable(this.year,this.month);
        },
        clickRight:function(){
        	if(this.month+1>12){
        		this.month=1;
        		this.year=this.year+1;
        	}else{
        		this.month=this.month+1;
        	}
        	if(this.day>(new Date(this.year,this.month, 0).getDate())){
        		this.day=new Date(this.year,this.month, 0).getDate();
        	}
        	this.setMonthYear(this.month,this.year);
        	this.createTable(this.year,this.month);
        },
        eventElem:function(){
			this._stopPropagation=this.bind(this,this.stopPropagation);
			$(this.elem).on('click',this._stopPropagation);

        	this._click=this.bind(this,this.click);      	
        	this._spShow=this.bind(this.sp,this.sp.show);
        	this._clickLeft=this.bind(this,this.clickLeft);
        	this._clickRight=this.bind(this,this.clickRight);
        	this._today=this.bind(this,this.today);
        	$("#cal"+this.id).on('click',this._click);
        	$("#"+this.id+"YM").on('click',this._spShow);
        	$("#"+this.id+"left").on('click',this._clickLeft);
        	$("#"+this.id+"right").on('click',this._clickRight);
        	$("#"+this.id+"today").on('click',this._today);
    
        },
        today:function(){
        	var year=this.y;
	    	var mon=this.m;
	    	if(mon<10){mon="0"+mon;}
	    	var day=this.d;
	    	if(day<10){day="0"+day;}

	    	if(this.options.inputElem.nodeName.toLowerCase()=="input"){
	    		this.$$(this.options.inputElem).value=year+"-"+mon+"-"+day;
	    	}else{
	    		this.$$(this.options.inputElem).innerHTML=year+"-"+mon+"-"+day;
	    	}
        	this.hide();
        },
        getWidth:function(){
        	return this.elem.offsetWidth;
        },
        getHeight:function(){
        	return this.elem.offsetHeight;
        },
		createElem:function(){
			this.id=this.randomId();
        	this.elem =document.body.appendChild(document.createElement("div"));
        	this.elem.id=this.id;
        	this.elem.className="panel panel-info";
        	this.elem.style.display="none";
        	this.elem.style.position="absolute";
        
        	this.panelBody=document.createElement("div");
        	this.panelBody.className="panel-body";
        	this.elem.appendChild(this.panelBody);
        	this.panelBody.innerHTML=this.Modle.getElemEx({
        		id: this.id
        	});
        	this.sp=new selectPanel({
        		papa:this,
        		container:this.elem
        	});
        },
	    createTable:function(y,m){
      
        	var sb=this.stringBuffer();
        	sb.append('<table border="0" cellspacing="0" cellpadding="0"  >');
         	sb.append('<tbody>');
        	sb.append('<tr>');
        	sb.append('<th class="month-day-td">日</th>');
        	sb.append('<th class="month-day-td">一</th>');
        	sb.append('<th class="month-day-td">二</th>');
        	sb.append('<th class="month-day-td">三</th>');
        	sb.append('<th class="month-day-td">四</th>');
        	sb.append('<th class="month-day-td">五</th>');
        	sb.append('<th class="month-day-td">六</th>');
        	sb.append('</tr>');
        	sb.append('</tbody><tbody>');
	    	var arr = [];    	
	        var arrreal=[];
	    	for(var j = 1, firstDay = new Date(y, m - 1, 1).getDay(),lastDate=new Date(y, m - 1, 0).getDate(); j <= firstDay; j++){ 
	    		arr.push(0); 
	    		arrreal.push(lastDate-firstDay+j);
	    	}    	
	    	for(var i = 1, monthDay = new Date(y, m, 0).getDate(); i <= monthDay; i++){ 
	    		arr.push(i);
	    		arrreal.push(i);
	    	}	    
	    	for(var k=arr.length,mw=1;k<42;k++,mw++){
	    		arr.push(0);
	    		arrreal.push(mw);
	    	} 		    
	    	while(arr.length){
	    		sb.append('<tr>');
	    		for(var i = 1; i <= 7; i++){	    			
	    			if(arr.length){
	    				var d = arr.shift();
	    				var r=arrreal.shift();
	    				if(d){
	    					sb.append('<td class="month-day  Mr" value="'+d+'">');
	    					sb.append('<a href="javascript:void(0)" hidefocus="on"  value="'+d+'"  ');
	    					
	    					if(this.day==d&&this.month==m&&this.year==y){
	    						sb.append(' class="calendar-x-tq"');	
	    					}else{
	    						sb.append(' class="calendar-x-date"');	  
	    					}
	    					if(this.d==d&&this.y==y&&this.m==m){
	    						sb.append(' style="font-weight: bold;" ');	    						
	    					}
	    					sb.append('>');
	    					sb.append(d);
	    					sb.append('</a>');
	    				}else{
	    					sb.append('<td class="month-day notday"  value="'+d+'">'+r+'</td>');
	    				}
	    			}
	    		}
	    		sb.append('</tr>');
	    	}
	    	sb.append('</tbody>');
	    	sb.append('</table>');
	    	this.$$("cal"+this.id).innerHTML=sb.toString();
	    },
	    maxYear:2050,
	    minYear:1970,
	    initialize: function(options) {
	       this.elem=null;
		   this.setOptionsValue();
		   this.setOptions(options);
		   if(this.Manager.sign){
			   this.Manager.initialize();
		   }
           if(this.Modle.sign){
        	   this.Modle.initialize(this.template());
           }
           this._documentClick=this.bind(this,this.documentClick);
		   this._inputElemClick=this.bind(this,this.inputElemClick);
		   $(this.options.triggerElem).on('click',this._inputElemClick);
		   this.flag=true;  

           var d=new Date();
           this.y=d.getFullYear();
           this.m=d.getMonth()+1;
           this.d=d.getDate();
      
	    },
	    setOptionsValue: function(options) {
	       this.options = {
	    	   inputElem:null,
	    	   triggerElem:null,
	    	   location:"right",
	    	   onHide:function(){},
	    	   onOk:function(){}
	       };
	    },
	    destroy:function(){
	    	if(this.elem!=null){
	        	$("#cal"+this.id).off('click',this._click);
	        	$("#"+this.id+"YM").off('click',this._spShow);
	        	$("#"+this.id+"left").off('click',this._clickLeft);
	        	$("#"+this.id+"right").off('click',this._clickRight);
	        	$("#"+this.id+"today").off('click',this._today);
	        	$(this.elem).off('click',this._stopPropagation);
	        	this.sp.destroy();
	       	    this.Manager.remove(this.elem.id);
			    document.body.removeChild(this.elem);
			    this.elem=null;
	    	}
	    }
	});

	module.exports=datepicker;
});