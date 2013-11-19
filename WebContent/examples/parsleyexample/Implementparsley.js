define(function(require, exports, moudles) {
		var parsley = require('../../lib/modules/components/parsley/Nparsley');
		var param= new Array();
        param[0]={id:'pwd',param:'data-minlength="6" data-required="true" data-trigger="change" data-required-message="密码不能为空" data-minlength-message="密码长度必须大于6位" '};
        param[1]={id:'m',param:'value="male" data-required="true" data-required-message="请选择性别"'};
		    param[2]={id:'repwd',param:'data-equalto="#pwd" data-trigger="change" data-required="true" data-required-message="密码不能为空"  data-equalto-message="两次密码不一致" '};
		   param[3]={id:'age',param:'data-type="digits" data-trigger="keyup" data-range="[1,100]" data-range-message="请输入合适数字" data-type-digits-message="请填入数字"'};
		   param[4]={id:'phone',param:'data-type="phone" data-trigger="change" data-type-phone-message="联系方式格式不合法"'};
		   param[5]={id:'mail',param:'data-type="email" data-trigger="change" data-required="true" data-required-message="邮箱不能为空" data-type-email-message="邮箱格式不正确"'};
		parsley.createSheetCheck('regist',param,'data-focus="first"');
});