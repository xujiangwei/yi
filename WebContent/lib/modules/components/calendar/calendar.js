/** 
*  日立及日历组
 * @author Xiaoyin Song
 * v 1.0.0
 *使用说明：
 *		var calendarGroupObj=new this.options.CalendarGroup({
 *				caleNum:this.options.caleNum,
 *			    Start:{
 *		            year:2012,
 *		            month:10,
 *		            day:1
 *	            },
 *	            End:{
 *		            year:2012,
 *		            month:11,
 *		            day:1        	
 *	            },
 *              StartElem:startElem,
 *              EndElem:endElem,
 *				Container:this.$$("choose"+this.id)
 *			});
 *
 */
define(function(require, exports, module) {
	require('class');
	var BaseClass=require("modules/components/calendar/base.js");
    /**
     * 作为组件中一个完整单元的日历类，
     * 但在范围日历中不可被外部创建
     * 
     */
	var RangeCalendar = Class(BaseClass, {

	    beforeMonth:function(){
        	if(this.options.month-1<1){
        		this.options.month=12;
        		this.options.year=this.options.year-1;
        	}else{
        		this.options.month=this.options.month-1;
        	}
        	this.adjustTable(this.options.year,this.options.month);
	    },
	    nextMonth:function(){
        	if(this.options.month+1>12){
        		this.options.month=1;
        		this.options.year=this.options.year+1;
        	}else{
        		this.options.month=this.options.month+1;
        	}     
        	this.adjustTable(this.options.year,this.options.month);
	    },
	    compareMonth:function(A,B){
	    	if(A.year>B.year){
	    		return 1;
	    	}else if(A.year<B.year){
	    		return -1;
	    	}else{
	    		if(A.month>B.month){
	    			return 1;
	    		}else if(A.month<B.month){
	    			return -1;
	    		}else{
	    			return 0;
	    		}
	    	}
	    },
	    compareDate:function(A,B){//1 0 -1
	    	if(A.year>B.year){
	    		return 1;
	    	}else if(A.year<B.year){
	    		return -1;
	    	}else{
	    		if(A.month>B.month){
	    			return 1;
	    		}else if(A.month<B.month){
	    			return -1;
	    		}else{
	    			if(A.day>B.day){
	    				return 1;
	    			}else if(A.day<B.day){
	    				return -1;
	    			}else{
	    				return 0;
	    			}
	    		}
	    	}
	    },
	    setInputValue:function(){
	    	if(this.options.StartElem&&this.options.EndElem){
	    		var month=this.Manager.Start.month;
	    		if(month<10){
	    			month="0"+month;
	    		}
	    		var day=this.Manager.Start.day;
	    		if(day<10){
	    			day="0"+day;
	    		}
	    		this.$$(this.options.StartElem).value=this.Manager.Start.year+"-"+month+"-"+day;
	    	    month=this.Manager.End.month;
	    		if(month<10){
	    			month="0"+month;
	    		}
	    		day=this.Manager.End.day;
	    		if(day<10){
	    			day="0"+day;
	    		}
	    		this.$$(this.options.EndElem).value=this.Manager.End.year+"-"+month+"-"+day;
	    		
	    		if(this.options.inputElem!=null){
	    			
	    			this.$$(this.options.inputElem).innerHTML=this.$$(this.options.StartElem).value+" - "+this.$$(this.options.EndElem).value;
	    		}
	    	}
	    },
		cellClick:function(e){
	    	var elem = e.target || e.srcElement;
	    	var date=0;	
	    	var a;
	    	if(elem.tagName.toUpperCase()=="TD"){
	    		date=elem.getAttribute("value");
	    		a=elem.getElementsByTagName("a")[0];
	    	}else if(elem.tagName.toUpperCase()=="A"){
	    		a=elem;
	    		elem=elem.parentNode;
	    		date=elem.getAttribute("value");
	    	}else{
	    		return false;
	    	}
	    	date=parseInt(date,10);
	    	if(date!=0){
			   if(this.Manager.flag){
				   this.Manager.setStartDate(this.options.year,this.options.month,date);
				   this.Manager.setEndDate(this.options.year,this.options.month,date);
				   this.Manager.clearSelected();
				   a.className="calendar-x-tq";
				   this.setInputValue();
			   }else{
				   if(this.compareDate(this.Manager.Start,{
			           year:this.options.year,
			           month:this.options.month,
			           day:date						   
			       })==1){
					   this.Manager.setStartDate(this.options.year,this.options.month,date);
				   }else{
					   this.Manager.setEndDate(this.options.year,this.options.month,date);
					   
				   }
				   this.Manager.adjustSelected();
				   this.setInputValue();
			   }
			   this.Manager.cellClick();
	    	}
		},
		clearSelected:function(){
			var arr=this.elem.getElementsByTagName("a");
			for(var i=0,len=arr.length;i<len;i++){
				 arr[i].className="calendar-x-date";
			}
		},
        adjustSelected:function(){
			var month={
			         year:this.options.year,
			         month:this.options.month	
			};
      
			if(this.compareMonth(this.Manager.Start,month)!=1&&this.compareMonth(this.Manager.End,month)!=-1){
        	    for(var i=0,len=this.cells.length;i<len;i++){
        	    	 month.day=parseInt(this.cells[i].getAttribute('value'),10);
        		     if(month.day!==0&&this.compareDate(this.Manager.Start,month)!=1&&this.compareDate(this.Manager.End,month)!=-1){
        		    	 var a=this.cells[i].getElementsByTagName("a")[0];
      				     a.className="calendar-x-tq";
        		     }
        	    }
			}
        },
        /**
         * 改变当前日历的内容，通过manager被next,before外层方法调用
         */
	    adjustTable:function(y,m){ 	
	    	this.button.innerHTML=y+'年'+m+'月';
	    	var w=0;
	    	for(var j = 1, firstDay = new Date(y, m - 1, 1).getDay(),lastDate=new Date(y, m - 1, 0).getDate(); j <= firstDay; j++,w++){
				this.cells[w].className="month-day notday";
				this.cells[w].innerHTML=lastDate-firstDay+j;
				this.cells[w].setAttribute("value",0);
	    	}    	
	    	for(var i = 1, monthDay = new Date(y, m, 0).getDate(); i <= monthDay; i++,w++){  
	    		this.cells[w].className="month-day Mr";
				var buffer=this.stringBuffer();
				buffer.append('<a href="javascript:void(0)" hidefocus="on" value="'+i+'"   class="calendar-x-date" ');
				if(this.Day==i&&this.Year==y&&this.Month==m){
					buffer.append(' style="font-weight: bold;" ');	    					
				}
				buffer.append(' >');
				buffer.append(i);
				buffer.append('</a>');
				this.cells[w].setAttribute("value",i);
				this.cells[w].innerHTML=buffer.toString();	    
	    	}	 
	    	for(var m=1;w<42;w++,m++){
	    		this.cells[w].className="month-day notday";
	    		this.cells[w].innerHTML=m;
	    		this.cells[w].setAttribute("value",0);
	    	} 
	    	this.adjustSelected();
	    },
	    /**
	     * 初始化创建日历表格
	     */
		createTable:function(y,m){
        	var sb=this.stringBuffer();
        	sb.append('<table border="0" cellspacing="0" cellpadding="0">');
        	if(this.options.Single){
        	    sb.append('<thead><tr class="month-title-tr">');
        	    sb.append('<td id="'+this.elem.id+'before" class="before">');
        	    sb.append('<div><div class="xt"></div></div>');
        	    sb.append('</td>');
        	    sb.append('<td colspan="5" class="month-title">');
        	    sb.append('<div id="'+this.elem.id+'all" class="button">'+y+'年'+m+'月 </div>');
        	    sb.append('</td>');
        	    sb.append('<td  id="'+this.elem.id+'next" class="next">');
        	    sb.append('<div><div class="xt"></div></div>');
        	    sb.append('</td>');
        	    sb.append('</tr></thead>');
        	}else{
        	    sb.append('<thead><tr class="month-title-tr">');
        	    sb.append('<td colspan="7" class="month-title">');
        	    sb.append('<div id="'+this.elem.id+'all" class="button">'+y+'年'+m+'月</div>');
        	    sb.append('</td>');
        	    sb.append('</tr></thead>');
        	}
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
        	sb.append('</tbody>');
        	sb.append('<tbody>');
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
	    	for(var k=arr.length,m=1;k<42;k++,m++){
	    		arr.push(0);
	    		arrreal.push(m);
	    	} 		    
	    	while(arr.length){
	    		sb.append('<tr>');
	    		for(var i = 1; i <= 7; i++){	    			
	    			if(arr.length){
	    				var d = arr.shift();
	    				var r=arrreal.shift();
	    				if(d){
	    					sb.append('<td class="month-day  Mr" value="'+d+'">');
	    					sb.append('<a href="javascript:void(0)" hidefocus="on"  value="'+d+'" class="calendar-x-date" ');
	    					if(this.Day==d&&this.Year==y&&this.Month==m){
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
			this.elem.innerHTML=sb.toString();
		
			this.button=this.$$(this.elem.id+"all");
			var tables=this.elem.getElementsByTagName("table");
			var table=tables[0];
			var rows=table.tBodies[1].rows;
			for(var i=0,len=6;i<len;i++){
				var cells=rows[i].cells;
	    		for(var j=0,lenj=7;j<lenj;j++){
	    			this.cells.push(cells[j]);
	    		}
			}
		},
        buttonClick:function(){
			   this.Manager.clearSelected();
			   this.Manager.setStartDate(this.options.year,this.options.month,new Date(this.options.year, this.options.month - 1, 1).getDate());
			   this.Manager.setEndDate(this.options.year,this.options.month,new Date(this.options.year, this.options.month, 0).getDate());
			   this.Manager.adjustSelected();
			   this.setInputValue();
			   this.Manager.flag=true;
		},
		eventElem:function(){
			this._cellClick=this.bind(this,this.cellClick);
			this._buttonClick=this.bind(this,this.buttonClick);
			this._beforeMonth=this.bind(this,this.beforeMonth);
			this._nextMonth=this.bind(this,this.nextMonth);
			
			$(this.elem.getElementsByTagName("table")[0].tBodies[1]).on("click",this._cellClick);
		
			$('#'+this.elem.id+"all").on("click",this._buttonClick);
			if(this.options.Single){
			   $("#"+this.elem.id+"before").on("click",this._beforeMonth);
	    	   $("#"+this.elem.id+"next").on("click",this._nextMonth);
			}
			
		},
	    justDate:function(){
			var date=new Date();
			this.Day=date.getDate();
            this.Year=date.getFullYear();
            this.Month=date.getMonth()+1;
	    },
		createElem : function() {
			this.elem = document.createElement("div");
			this.elem.id=this.randomId();
			this.options.Container.appendChild(this.elem);
			this.createTable(this.options.year,this.options.month);
		
		},
		initialize : function(options) {
			this.setOptionsValue();
			this.setOptions(options);
			this.Manager=this.options.Manager;
			if (this.Manager.sign) {
				this.Manager.initialize(this.options.Start,this.options.End);
			}
			this.cells=[];
        	this.justDate();
			this.createElem();
			this.setInputValue();
			this.eventElem();
			this.Manager.push(this);
		},
		destroy:function(){
			$(this.elem.getElementsByTagName("table")[0].tBodies[1]).off("click",this._cellClick);
			$('#'+this.elem.id+"all").off("click",this._buttonClick);
			if(this.options.Single){
			   $("#"+this.elem.id+"before").off("click",this._beforeMonth);
	    	   $("#"+this.elem.id+"next").off("click",this._nextMonth);
			}
			this.options.Container.removeChild(this.elem);
			this.elem=null;
			if (!this.Manager.sign) {
				this.Manager.destroy();
			}
		},
		setOptionsValue : function(options) {
			this.options = {
					inputElem:null,
					Manager:{},
				key:null,
				Single:false,
	            StartElem:null,
	            EndElem:null,
			    Start:{
		           year:null,
		           month:null,
		           day:null
	            },
	            End:{
			       year:null,
			       month:null,
			       day:null	        	
	            },
				year : null,
				month : null,
				Container : ""
			};
		}
	});	
	var CalendarGroup = Class(BaseClass,{
		hide:function(){
		    this.elem.style.display="none";
	    },
		show:function(){
		    this.elem.style.display="";
	    },
	    beforeClick:function(){
	    	for(var i=0,len=this.objList.length;i<len;i++){
	    		this.objList[i].beforeMonth();
	    	}
	    },
	    nextClick:function(){
	    	for(var i=0,len=this.objList.length;i<len;i++){
	    		this.objList[i].nextMonth();
	    	}
	    },
	    setBetweenDate:function(obj){//{start:new Date(),end:new Date()}
	    	this.objList[0].Manager.setBetweenDate(obj);
	    	this.objList[0].Manager.adjustSelected();
	    	this.objList[0].setInputValue();
	    },
	    textElemClick:function(){
	    	this.options.papa.timeSliderHide();
	    	this.show();
	    },
	    inputBlur:function(){
            if(!/^20\d\d-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])$/.test(this.options.StartElem.value)){
            	this.options.papa.showAlert("请输入正确的起始时间");
            	return false;
            }
	    	if(!/^20\d\d-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])$/.test(this.options.EndElem.value)){
            	this.options.papa.showAlert("请输入正确的结束时间");
            	return false;
            }
	    	var s = new Date();
	    	var srr=this.options.StartElem.value.split("-");   
	    	s.setFullYear(parseInt(srr[0],10),parseInt(srr[1],10),parseInt(srr[2],10));
	    	var e = new Date();
	    	var err=this.options.EndElem.value.split("-");  
	    	e.setFullYear(parseInt(err[0],10),parseInt(err[1],10),parseInt(err[2],10));
	    	if(s.getTime()<=e.getTime()){	    	
			    this.objList[0].Manager.setStartDate(parseInt(srr[0],10),parseInt(srr[1],10),parseInt(srr[2],10));
			    this.objList[0].Manager.setEndDate(parseInt(err[0],10),parseInt(err[1],10),parseInt(err[2],10));
			    this.objList[0].Manager.adjustSelected();
			    this.options.papa.hideAlert();
	    	}else{
	    		this.options.papa.showAlert("请让结束时间大于等于起始时间");
	    	}
	    },
		eventElem:function(){
			this._beforeClick=this.bind(this,this.beforeClick);
			this._nextClick=this.bind(this,this.nextClick);
			this._textElemClick=this.bind(this,this.textElemClick);
			this._inputBlur=this.bind(this,this.inputBlur);
			
			
	    	$(this.before).on("click",this._beforeClick);
	    	$(this.next).on("click",this._nextClick);
	    	if(this.options.StartElem){
	    		$(this.options.StartElem).on("click",this._textElemClick);
	    		$(this.options.StartElem).on("blur",this._inputBlur);
	    	}
	    	if(this.options.EndElem){
	    		$(this.options.EndElem).on("click",this._textElemClick);
	    		$(this.options.EndElem).on("blur",this._inputBlur);
	    	}
	    
	    },
	    justDate:function(){
			var date=new Date();
			this.options.month=date.getMonth()+1;
			this.options.year=date.getFullYear();
	    },
	    adjustDate:function(){
        	if(this.options.month-1<1){
        		this.options.month=12;
        		this.options.year=this.options.year-1;
        	}else{
        		this.options.month=this.options.month-1;
        	}
	    },
		createElem:function(){
	    	
			this.elem=document.createElement("table");
			this.elem.border="0";
			this.elem.cellspacing="0";
			this.elem.cellpadding="0";
	        
			this.elem.className="_song_calendar_wrapper";		
			this.options.Container.appendChild(this.elem);
			var tr=this.elem.insertRow(0);
			var i=0;
			var beforetd=tr.insertCell(i++);
			beforetd.className="before";
			this.before=document.createElement("button");
			this.before.type="button";
			this.before.className="btn btn-default btn-xs";
			this.before.innerHTML='<span class="glyphicon glyphicon-chevron-left"></span>';
			beforetd.appendChild(this.before);
	
			for(var j=0,len=this.options.caleNum;j<len;j++){
			
				var td=tr.insertCell(1);
				td.className="wrapper-td";
				if(j>0){this.adjustDate();}
				this.objList.push(new this.options.RangeCalendar({
					inputElem:this.options.inputElem,
					Manager:this.options.Manager,
					key:this.options.key,
	                StartElem:this.options.StartElem,
	                EndElem:this.options.EndElem,
				    Start:this.options.Start,
		            End:this.options.End,
					year : this.options.year,
					month : this.options.month,
					Container:td
					}));
				i++;
			}
			
			this.justDate();
			var nexttd=tr.insertCell(i++);
			nexttd.className="next";
			this.next=document.createElement("button");
			this.next.type="button";
			this.next.className="btn btn-default btn-xs";
			this.next.innerHTML='<span class="glyphicon glyphicon-chevron-right"></span>';
			nexttd.appendChild(this.next);
			
			this.objList[0].Manager.setStartDate(this.options.Start.year,this.options.Start.month,this.options.Start.day);
			this.objList[0].Manager.setEndDate(this.options.End.year,this.options.End.month,this.options.End.day);
			this.objList[0].Manager.adjustSelected();
		},
		initialize : function(options) {

			this.setOptionsValue();
			this.setOptions(options);
			this.options.Manager={
					    extend:function(destination, source) {
					         for ( var property in source) {
						        destination[property] = source[property];
					         }
				        },
				        setBetweenDate:function(obj){//{start:new Date(),end:new Date()}
				        	this.Start.day=obj.start.getDate();
				        	this.Start.year=obj.start.getFullYear();
				            this.Start.month=obj.start.getMonth()+1;
				            
				        	this.End.day=obj.end.getDate();
				        	this.End.year=obj.end.getFullYear();
				            this.End.month=obj.end.getMonth()+1;
				        },
				        setStartDate:function(year,month,day){
				        	this.Start.year=year;
				        	this.Start.month=month;
				        	this.Start.day=day;
				        },
				        setEndDate:function(year,month,day){
				        	this.End.year=year;
				        	this.End.month=month;
				        	this.End.day=day;
				        },
					    Start:{
					           year:null,
					           month:null,
					           day:null
				        },
				        End:{
						       year:null,
						       month:null,
						       day:null	        	
				        },
					    push:function(obj){
					        this.list.push(obj);
				        },
					    initialize : function(Start,End) {
				        	this.list=[];
				        	this.extend(this.Start,Start);
				        	this.extend(this.End,End);
					        this.sign = false;
				        },
				        destroy:function(){
				        	this.list=[];
						    this.flag=true;
						    this.sign=true;
				        },
				        clearSelected:function(){
				        	for(var i=0,len=this.list.length;i<len;i++){
				        		this.list[i].clearSelected();
				        	}
				        },
				        adjustSelected:function(){
				        	for(var i=0,len=this.list.length;i<len;i++){
				        		this.list[i].adjustSelected();
				        	}
				        },
					    cellClick:function(){
					        if(this.flag){
					        	this.flag=false;
					        }else{
					        	this.flag=true;
					        }
				        },
					    flag:true,
					    sign:true
				    };
			this.objList=[];
            this.justDate();
			
			this.createElem();

			this.eventElem();
			
		},
		destroy:function(){
			for(var i=0,len=this.objList.length;i<len;i++){
				this.objList[i].destroy();
			}
			this.objList=[];
	    	$(this.before).off("click",this._beforeClick);
	    	$(this.next).off("click",this._nextClick);
	    	if(this.options.StartElem){
	    		$(this.options.StartElem).off("click",this._textElemClick);
	    		$(this.options.StartElem).off("blur",this._inputBlur);
	    	}
	    	if(this.options.EndElem){
	    		$(this.options.EndElem).off("click",this._textElemClick);
	    		$(this.options.EndElem).off("blur",this._inputBlur);
	    	}
	    	this.options.Container.removeChild(this.elem);
	    	this.elem=null;
	    	this.before=null;
	    	this.next=null;
		},
		setOptionsValue : function(options) {
			this.options = {
					inputElem:null,
					key:null,
					caleNum:3,
					papa:{
						timeSliderHide:function(){}
			        },
				    Start:{
		               year:null,
		               month:null,
		               day:null
	                },
	                End:{
			           year:null,
			           month:null,
			           day:null	        	
	                },
	                StartElem:null,
	                EndElem:null,
					year : null,
					month : null,
				    RangeCalendar:RangeCalendar,
				    Container : ""
			};
		}
	});

	module.exports=CalendarGroup;
});