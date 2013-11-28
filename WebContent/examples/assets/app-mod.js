/*
 * mod.js
 */

(function() {
	var yi = window.yi;

	// 配置 CommonJS
	yi.config("../");

	yi.ready(function() {
		// helloworld_1
		$('#btn_helloworld_1').click(function(e) {
			yi.mod.load("helloworld_1");
		});

		// helloworld_2
		$('#btn_helloworld_2').click(function(e) {
			yi.prompt("请输入 MOD 参数，例如：{\"name\":\"东华软件\"}", function(result) {
				if (result !== null) {
					if (result.length > 10) {
						yi.mod.load("helloworld_2", JSON.parse(result));
					}
					else {
						yi.alert("输入参数错误");
					}
				}
			});
		});

		// beginner_1
		$('#btn_beginner_1').click(function(e) {
			yi.mod.load('beginner_1');
		});
	});
})();
