function getProjectName(){
	var pathName = location.pathname;	

      if(pathName.substring(0,1)=="/"){
var temp = pathName.substring(1,pathName.length);
var result= temp.substring(0,temp.indexOf("/"));
}
     else{
var temp = pathName.substring(0,pathName.length);
var result= temp.substring(0,temp.indexOf("/"));
}
       return result;
}

function createSheetCheck(containerID, optionsParam,type){
	var checkDom=$("#"+containerID);    
    var form=checkDom[0].outerHTML;
    var formi='id="'+containerID+'"';
    var formb=form.substring(0,form.indexOf(formi)+formi.length);
    var forma=form.substring(form.indexOf(formi)+formi.length,form.length);       
    if(type!=null){
    checkDom[0].outerHTML=formb+' data-validate="parsley" '+type+' '+forma;   
    
    }else{
    checkDom[0].outerHTML=formb+' data-validate="parsley" '+forma;
    
    }
    if(optionsParam.length!=0){
    for(var i=0;i<optionsParam.length;i++){
   var id=optionsParam[i].id;
   var fieldDom=$("#"+id)[0];
   var field=fieldDom.outerHTML;
   var fieldid='id="'+id+'"';
   var before=field.substring(0, field.indexOf(fieldid)+fieldid.length);
   var after=field.substring(field.indexOf(fieldid)+fieldid.length,field.length);
   fieldDom.outerHTML=before+' '+optionsParam[i].param+' '+after;
    }
    }


}	