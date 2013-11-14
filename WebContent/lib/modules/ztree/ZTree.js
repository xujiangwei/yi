define(function(require, exports, moudles) {
			require('../../plugins/ztree/zTreeStyle.css');
			require('../../plugins/ztree/jquery.ztree.all-3.5.min-cmd');
			require('../../plugins/ztree/jquery.ztree.exhide-3.5.min-cmd');

			function ZTree(selector, option, root) {
				return $.fn.zTree.init($(selector).addClass('ztree'), selector,
						root);
			}

			/**
			 * static
			 */
			ZTree.getZTree = function(id) {
				return $.fn.zTree.getZTreeObj(id);
			};

			/**
			 * static
			 */
			ZTree.destroy = function(id) {
				return $.fn.zTree.destroy(id);
			};

			return ZTree;
		});