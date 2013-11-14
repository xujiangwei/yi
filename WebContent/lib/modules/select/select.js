function createSelect(id, param, extra){
		if(extra != null){
			var str = "<select id = '"+id+"' " + extra + ">";
			if(param.placeholder != null){
				str += "<option></option>";
			}
			str += $("#"+id)[0].innerHTML;
			str += "</select>";
		} else {
			var str = "<select id='"+id+"' style='width:300px'>";
			if(param.placeholder != null){
				str += "<option></option>";
			}
			str += $("#"+id)[0].innerHTML;
			str += "</select>";
		}
		$("#" + id)[0].outerHTML = str;
		$("#"+id).select2(param);
}

function createDataSelect(id,param,extra){
	if(extra != null){
		var str = "<input type='hidden' id='"+id+"' " + extra + " />";
		$("#" + id)[0].outerHTML = str;
	}
	$("#"+id).select2(param);
}