/**
 * 
 * @author Xiaoyin Song
 * 
 * 所有choosetime.XXXX的父类，实现对所有子类的及子类实例化对象的管理。
 * 此类并不可以实例化
 * 
 */
define(function(require, exports, module) {
	require("utils/hashmap.js");
	var BaseClass=require("modules/components/calendar/base.js");
	var DoubleTimeSlider=require("modules/components/calendar/timeslider.js");
	var CalendarGroup=require("modules/components/calendar/calendar.js");
	
	function getElementX(e) {
		if (! /Firefox/i.test(navigator.userAgent)) {
			return window.event.offsetX;
		} else {
			return e.layerX;
		}
	}
	function getElementY(e) {
		if (! /Firefox/i.test(navigator.userAgent)) {
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
	var ChooseTime=Class(BaseClass,{
		
		Manager:{
			remove:function(key){
				this.map.remove(key);
			},
			get:function(key){
				return this.map.get(key);
			},
	        push:function(key,obj){
	            this.map.put(key,obj);
	        },
	        hide:function(key){
	        	var values= this.map.values();
	        	for(var i=0,len=values.length;i<len;i++){
	        		if(values[i].elem.id!=key){
	        			values[i].hide();
	        		}
	        	}
	        },
	        initialize : function() {
	    	    this.map=new HashMap();
	            this.sign = false;
	        },		
	        sign:true
	    },
		hide:function(){
			
			$(document).off("click",this._documentClick);
			this.elem.style.display="none";
			this.flag=true;
			this.options.onHide(this);
		},
		inputElemClick:function(e){
			
			if(this.flag){
				if(this.env.ie){
					if(this.options.location=="left"){
						 var x=this.$$(this.options.triggerElem).getBoundingClientRect().left;
					}else{
						 var x=document.documentElement.scrollWidth-this.$$(this.options.triggerElem).getBoundingClientRect().right;
					}
			       
			        var y=this.$$(this.options.triggerElem).getBoundingClientRect().top+document.documentElement.scrollTop+this.$$(this.options.triggerElem).offsetHeight;
				}else{
					 if(this.options.location=="left"){
						 var x=this.$$(this.options.triggerElem).getBoundingClientRect().left;
					 }else{
					     var x=document.documentElement.scrollWidth-this.$$(this.options.triggerElem).getBoundingClientRect().right;
					 }
					 var y=toContainerY(this.$$(this.options.triggerElem),document.body)+this.$$(this.options.triggerElem).offsetHeight;
				}

			    this.show(x,y);
			    $(document).on("click",this._documentClick);
		        if (e && e.stopPropagation ){ 
		            e.stopPropagation();
		        }else{
		           window.event.cancelBubble = true;
		        }
		     
		        this.flag=false;
		     
			}else{
				this.hide();
				 
				this.flag=true;
			}
		},
	    initialize : function(options) { },
	    setOptionsValue : function(options) {
		    this.options = {
		    		onHide:function(){
		    			
		    		},
		    		onOk:function(){},
		    		location:"right",
		    		caleNum:3,
                    startTime:"2013-10-16 00:00:00",
                    endTime: "2013-10-17 12:00:00",
					inputElem:null,
					triggerElem:null,
					CalendarGroup:CalendarGroup,
					DoubleTimeSlider:DoubleTimeSlider
		    };
	    }
	});
	module.exports=ChooseTime;
});