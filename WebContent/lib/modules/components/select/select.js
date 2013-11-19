define(function(require, exports, moudle) {
	require('../../../plugins/select2/select2.css');
	require('../../../plugins/select2/select2');
	function createBaseSelect(id, param, extra){
		if(arguments.length == 1){
			$("#" + id).select2();
		} else if(arguments.length == 2){
			
			var str = "<select id='"+id+"' style='width:200px'>";
			if(param.placeholder != null){
				str += "<option></option>";
			}
			str += $("#"+id)[0].innerHTML;
			str += "</select>";
			$("#" + id)[0].outerHTML = str;
			$("#" + id).select2(param);
		} else {
			if(param == null){
				if(extra != null){
					var str = "<select id = '"+id+"' " + extra + " style='width:200px'>";
					str += $("#"+id)[0].innerHTML;
					str += "</select>";
					$("#" + id)[0].outerHTML = str;
					$("#" + id).select2();
				}
			} else {
				if(extra != null){
					if(extra.tagName == 'input'){
						$("#" + id).select2(param);
					}
				}
			}
			
		}
	}
	moudle.exports=createBaseSelect;
});