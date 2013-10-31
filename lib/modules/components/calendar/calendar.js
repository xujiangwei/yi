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

	var RangeCalendar = BaseClass.extend( {
		Manager:{
		    Extend:function(destination, source) {
		         for ( var property in source) {
			        destination[property] = source[property];
		         }
	        },
	        SetBetweenDate:function(obj){//{start:new Date(),end:new Date()}
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
	        	this.Extend(this.Start,Start);
	        	this.Extend(this.End,End);
		        this.sign = false;
	        },
	        ClearSelected:function(){
	        	for(var i=0,len=this.list.length;i<len;i++){
	        		this.list[i].ClearSelected();
	        	}
	        },
	        AdjustSelected:function(){
	        	for(var i=0,len=this.list.length;i<len;i++){
	        		this.list[i].AdjustSelected();
	        	}
	        },
		    CellClick:function(){
		        if(this.flag){
		        	this.flag=false;
		        }else{
		        	this.flag=true;
		        }
	        },
		    flag:true,
		    sign:true
	    },
	    BeforeMonth:function(){
        	if(this.options.month-1<1){
        		this.options.month=12;
        		this.options.year=this.options.year-1;
        	}else{
        		this.options.month=this.options.month-1;
        	}
        	this.AdjustTable(this.options.year,this.options.month);
	    },
	    NextMonth:function(){
        	if(this.options.month+1>12){
        		this.options.month=1;
        		this.options.year=this.options.year+1;
        	}else{
        		this.options.month=this.options.month+1;
        	}     
        	this.AdjustTable(this.options.year,this.options.month);
	    },
	    CompareMonth:function(A,B){
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
	    CompareDate:function(A,B){//1 0 -1
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
	    SetInputValue:function(){
	    	if(this.options.StartElem&&this.options.EndElem){
	    		var month=this.Manager.Start.month;
	    		if(month<10){
	    			month="0"+month;
	    		}
	    		var day=this.Manager.Start.day;
	    		if(day<10){
	    			day="0"+day;
	    		}
	    		$$(this.options.StartElem).value=this.Manager.Start.year+"-"+month+"-"+day;
	    	    month=this.Manager.End.month;
	    		if(month<10){
	    			month="0"+month;
	    		}
	    		day=this.Manager.End.day;
	    		if(day<10){
	    			day="0"+day;
	    		}
	    		$$(this.options.EndElem).value=this.Manager.End.year+"-"+month+"-"+day;
	    	}
	    },
		CellClick:function(e){
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
				   this.Manager.ClearSelected();
				   a.className="calendar-x-tq";
				   this.SetInputValue();
			   }else{
				   if(this.CompareDate(this.Manager.Start,{
			           year:this.options.year,
			           month:this.options.month,
			           day:date						   
			       })==1){
					   this.Manager.setStartDate(this.options.year,this.options.month,date);
				   }else{
					   this.Manager.setEndDate(this.options.year,this.options.month,date);
					   
				   }
				   this.Manager.AdjustSelected();
				   this.SetInputValue();
			   }
			   this.Manager.CellClick();
	    	}
		},
		ClearSelected:function(){
			var arr=this.elem.getElementsByTagName("a");
			for(var i=0,len=arr.length;i<len;i++){
				 arr[i].className="calendar-x-date";
			}
		},
        AdjustSelected:function(){
			var month={
			         year:this.options.year,
			         month:this.options.month	
			};
      
			if(this.CompareMonth(this.Manager.Start,month)!=1&&this.CompareMonth(this.Manager.End,month)!=-1){
        	    for(var i=0,len=this.cells.length;i<len;i++){
        	    	 month.day=parseInt(this.cells[i].getAttribute('value'),10);
        		     if(month.day!==0&&this.CompareDate(this.Manager.Start,month)!=1&&this.CompareDate(this.Manager.End,month)!=-1){
        		    	 var a=this.cells[i].getElementsByTagName("a")[0];
      				     a.className="calendar-x-tq";
        		     }
        	    }
			}

        },
	    AdjustTable:function(y,m){ 	
	    	this.button.innerHTML=m+'月 '+y;
	    	var w=0;
	    	for(var j = 1, firstDay = new Date(y, m - 1, 1).getDay(); j <= firstDay; j++,w++){
				this.cells[w].className="month-day";
				this.cells[w].innerHTML="&nbsp;";
				this.cells[w].setAttribute("value",0);
	    	}    	
	    	for(var i = 1, monthDay = new Date(y, m, 0).getDate(); i <= monthDay; i++,w++){  
	    		this.cells[w].className="month-day Mr";
				var buffer=this.StringBuffer();
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
	    	for(;w<42;w++){
	    		this.cells[w].className="month-day";
	    		this.cells[w].innerHTML="&nbsp;";
	    		this.cells[w].setAttribute("value",0);
	    	} 
	    	this.AdjustSelected();
	    },
		CreateTable:function(y,m){
        	var sb=this.StringBuffer();
        	sb.append('<table border="0" cellspacing="0" cellpadding="0">');
        	if(this.options.Single){
        	    sb.append('<thead><tr class="month-title-tr">');
        	    sb.append('<td id="'+this.elem.id+'before" class="before">');
        	    sb.append('<div><div class="xt"></div></div>');
        	    sb.append('</td>');
        	    sb.append('<td colspan="5" class="month-title">');
        	    sb.append('<button type="button" style="cursor: pointer;">'+m+'月 '+y+'</button>');
        	    sb.append('</td>');
        	    sb.append('<td  id="'+this.elem.id+'next" class="next">');
        	    sb.append('<div><div class="xt"></div></div>');
        	    sb.append('</td>');
        	    sb.append('</tr></thead>');
        	}else{
        	    sb.append('<thead><tr class="month-title-tr">');
        	    sb.append('<td colspan="7" class="month-title">');
        	    sb.append('<button type="button" style="cursor: pointer;">'+m+'月 '+y+'</button>');
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
	    	for(var j = 1, firstDay = new Date(y, m - 1, 1).getDay(); j <= firstDay; j++){ arr.push(0); }    	
	    	for(var i = 1, monthDay = new Date(y, m, 0).getDate(); i <= monthDay; i++){ arr.push(i); }	    
	    	for(var k=arr.length;k<42;k++){ arr.push(0); } 		    
	    	while(arr.length){
	    		sb.append('<tr>');
	    		for(var i = 1; i <= 7; i++){	    			
	    			if(arr.length){
	    				var d = arr.shift();
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
	    					sb.append('<td class="month-day"  value="'+d+'">&nbsp;</td>');
	    				}
	    			}
	    		}
	    		sb.append('</tr>');
	    	}
	    	sb.append('</tbody>');
	    	sb.append('</table>');
			this.elem.innerHTML=sb.toString();
			this.button=this.elem.getElementsByTagName("button")[0];
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
        ButtonClick:function(){
			   this.Manager.ClearSelected();
			   this.Manager.setStartDate(this.options.year,this.options.month,new Date(this.options.year, this.options.month - 1, 1).getDate());
			   this.Manager.setEndDate(this.options.year,this.options.month,new Date(this.options.year, this.options.month, 0).getDate());
			   this.Manager.AdjustSelected();
			   this.SetInputValue();
			   this.Manager.flag=true;
		},
		EventElem:function(){
			
			this.addEventHandler(this.elem.getElementsByTagName("table")[0].tBodies[1],"click",this.Bind(this,this.CellClick));
			this.addEventHandler(this.elem.getElementsByTagName("button")[0],"click",this.Bind(this,this.ButtonClick));
			if(this.options.Single){
			    this.addEventHandler($$(this.elem.id+"before"),"click",this.Bind(this,this.BeforeMonth));
	    	    this.addEventHandler($$(this.elem.id+"next"),"click",this.Bind(this,this.NextMonth));
			}
			
		},
	    JustDate:function(){
			var date=new Date();
			this.Day=date.getDate();
            this.Year=date.getFullYear();
            this.Month=date.getMonth()+1;
	    },
        RandomId:function(){
        	do{
        		var id=this.randomChar();
        	}while($$(id));
            return id;
        },
		CreateElem : function() {
			this.elem = document.createElement("div");
			this.elem.id=this.RandomId();
			this.CreateTable(this.options.year,this.options.month);
			this.options.Container.appendChild(this.elem);
		},
		initialize : function(options) {
			this.parent(options);
			if (this.Manager.sign) {
				this.Manager.initialize(this.options.Start,this.options.End);
			}
			this.cells=[];
        	this.JustDate();
			this.CreateElem();
			this.SetInputValue();
			this.EventElem();
			this.Manager.push(this);
		},
		SetOptionsValue : function(options) {
			this.options = {
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
	var CalendarGroup = BaseClass.extend( {
		Hide:function(){
		    this.elem.style.display="none";
	    },
		Show:function(){
		    this.elem.style.display="";
	    },
	    BeforeClick:function(){
	    	for(var i=0,len=this.objList.length;i<len;i++){
	    		this.objList[i].BeforeMonth();
	    	}
	    },
	    NextClick:function(){
	    	for(var i=0,len=this.objList.length;i<len;i++){
	    		this.objList[i].NextMonth();
	    	}
	    },
	    SetBetweenDate:function(obj){//{start:new Date(),end:new Date()}
	    	this.objList[0].Manager.SetBetweenDate(obj);
	    	this.objList[0].Manager.AdjustSelected();
	    	this.objList[0].SetInputValue();
	    },
	    TextElemClick:function(){
	    	this.options.Papa.TimeSliderHide();
	    	this.Show();
	    },
	    InputBlur:function(){
            if(!/^20\d\d-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])$/.test(this.options.StartElem.value)){
            	this.options.Papa.ShowAlert("请输入正确的起始时间");
            	return false;
            }
	    	if(!/^20\d\d-(0[1-9]|1[012])-(0[1-9]|[12]\d|3[01])$/.test(this.options.EndElem.value)){
            	this.options.Papa.ShowAlert("请输入正确的结束时间");
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
			    this.objList[0].Manager.AdjustSelected();
			    this.options.Papa.HideAlert();
	    	}else{
	    		this.options.Papa.ShowAlert("请让结束时间大于等于起始时间");
	    	}
	    },
		EventElem:function(){
	    	
	    	this.addEventHandler(this.before,"click",this.Bind(this,this.BeforeClick));
	    	this.addEventHandler(this.next,"click",this.Bind(this,this.NextClick));
	    	if(this.options.StartElem){
	    		this.addEventHandler($$(this.options.StartElem),"click",this.Bind(this,this.TextElemClick));
	    		this.addEventHandler($$(this.options.StartElem),"blur",this.Bind(this,this.InputBlur));
	    	}
	    	if(this.options.EndElem){
	    		this.addEventHandler($$(this.options.EndElem),"click",this.Bind(this,this.TextElemClick));
	    		this.addEventHandler($$(this.options.EndElem),"blur",this.Bind(this,this.InputBlur));
	    	}
	    
	    },
	    JustDate:function(){
			var date=new Date();
			this.options.month=date.getMonth()+1;
			this.options.year=date.getFullYear();
	    },
	    AdjustDate:function(){
        	if(this.options.month-1<1){
        		this.options.month=12;
        		this.options.year=this.options.year-1;
        	}else{
        		this.options.month=this.options.month-1;
        	}
	    },
		CreateElem:function(){
	    	
			this.elem=document.createElement("table");
			this.elem.border="0";
			this.elem.cellspacing="0";
			this.elem.cellpadding="0";
	        
			this.elem.className="_song_calendar_wrapper";		
			var tr=this.elem.insertRow(0);
			var i=0;
			this.before=tr.insertCell(i++);
			this.before.className="before";
			this.before.innerHTML='<div><div class="xt"></div></div>';
			
			for(var j=0,len=this.options.CaleNum;j<len;j++){
			
				var td=tr.insertCell(1);
				td.className="wrapper-td";
				if(j>0){this.AdjustDate();}
				this.objList.push(new this.options.RangeCalendar({
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
			
			this.JustDate();
			this.next=tr.insertCell(i++);
			this.next.className="next";
			this.next.innerHTML='<div><div class="xt"></div></div>';
			
			this.options.Container.appendChild(this.elem);
			
			this.objList[0].Manager.setStartDate(this.options.Start.year,this.options.Start.month,this.options.Start.day);
			this.objList[0].Manager.setEndDate(this.options.End.year,this.options.End.month,this.options.End.day);
			this.objList[0].Manager.AdjustSelected();
		},
		initialize : function(options) {
			this.parent(options);
			this.objList=[];
            this.JustDate();
			
			this.CreateElem();

			this.EventElem();
			
		},
		SetOptionsValue : function(options) {
			this.options = {
					CaleNum:3,
					Papa:{
				        HideAlert:function(){},
				        ShowAlert:function(){}
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