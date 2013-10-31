/**
 * 主题管理器。
 * 
 * @author Jiangwei Xu
 */

define(function(require, exports, module) {

	require('class');
	require('map');

	var ThemeManager = Class({
		initialize: function() {
			
		},

		/** 添加主题样式
		 * theme: {
		 * 	   name: 'cool',
		 *     styles: ['cool1.css', 'cool2.css']
		 * }
		 */
		addTheme: function(theme) {
		}
	});

	// 导出
	module.exports = ThemeManager;
});
