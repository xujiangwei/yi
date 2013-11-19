define(function(require, exports, moudle) {
	require('../../../plugins/select2/select2.css');
	require('../../../plugins/select2/select2');
	function createBaseSelect(id, param, extra){
		if(arguments.length == 1){//只传入select的id值时，此时参数仅为1个
			$("#" + id).select2();
		} else if(arguments.length == 2){//只传入select的id值和select2()方法中的参数，tagName默认为"select"，mutiple默认为false，不指定宽度时默认为200px，此时参数为2个，
			var str = "<select id='"+id+"' style='width:200px'>";
			if(param.placeholder != null){
				str += "<option></option>";
			}
			str += $("#"+id)[0].innerHTML;
			str += "</select>";
			$("#" + id)[0].outerHTML = str;
			$("#" + id).select2(param);
		} else {//传入select的id值,以及select2()方法中2个参数，第3个参数中指定tagName的值为input或select，有无mutiple和设定width宽度
			if(param == ""){//select2()方法中不传任何参数
				if(extra != null){
					if(extra.tagName == "select"){//当使用select标签时
						if(extra.multiple){
							var str = "<select id = '"+id+"' multiple>";
							if(extra.width){
								str = "<select id = '"+id+"' multiple style='width:"+extra.width+"'>";
							}
						} else if(extra.width){
							var str = "<select id = '"+id+"' style='width:"+extra.width+"'>";
						} else {
							var str = "<select id = '"+id+"'>";
						}
						str += $("#"+id)[0].innerHTML;
						str += "</select>";
						$("#" + id)[0].outerHTML = str;
						$("#" + id).select2();
					} else if(extra.tagName == "input"){//当使用input标签时需要传入一个json形式的参数作为下拉菜单选项
						alert("请传一个json字符串作为下拉菜单选项！");
					} 
				}
			} else {//select2()方法中传入参数
				if(extra != null){
					if(extra.tagName == "select"){//当标签为select时
						if(extra.multiple){
							var str = "<select id = '"+id+"' multiple>";
							if(extra.width){
								str = "<select id = '"+id+"' multiple style='width:"+extra.width+"'>";
							}
						} else if(extra.width){
							var str = "<select id = '"+id+"' style='width:"+extra.width+"'>";
						} else {
							var str = "<select id = '"+id+"'>";
						}
						str += $("#"+id)[0].innerHTML;
						str += "</select>";
						$("#" + id)[0].outerHTML = str;
						$("#" + id).select2(param);
					} else if(extra.tagName == "input"){//当使用input标签时,multiple默认为false，可使用tags:["red", "green", "blue"]形式作为select2()参数实现multiple多选形式
						if(extra.width){
							var str = "<input type='hidden' id='"+id+"' style='width:"+extra.width+"' />";
						} else {
							var str = "<input type='hidden' id='"+id+"' />";
						}
						$("#" + id)[0].outerHTML = str;
						$("#" + id).select2(param);
					}
				}
			}
		}
	}
	moudle.exports=createBaseSelect;
});