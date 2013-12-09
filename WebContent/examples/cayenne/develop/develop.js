define(function(require, exports, module) {
			'require:nomunge,exports:nomunge,module:nomunge';

			require('./develop.css');

			// 框架建立后，seajs的base为WebRoot
			window.yi.config("../");

			(function() {
				function Main(ctx, uri, bcId, bId) {
					// 全文搜索

					// 工具栏

					// 模块加载
					this.modules = this._loadModules();

					this.ctx = ctx;
					this.path = this._getRelativePath();
					this.uri = uri;

					this.breadcrumb = $('#' + bcId);
					this.body = $('#' + bId);
				}

				/**
				 * 页面刷新时，载入模块
				 */
				Main.prototype.init = function() {
					if (!this.uri) {
						var m = this.modules[0];
						if (!m) {
							return;
						} else {
							this.uri = m.uri;
						}
					}
					this.body.load(this.ctx + '/' + this.uri);
					var m = this._findModule(this.uri, this.modules);
					if (m) {
						this._updateBreadcrumb(m);
					}
				}

				// 自动计算
				Main.prototype._getRelativePath = function() {
					return '/develop/develop.jsp';
				}

				/**
				 * 加载指定模块
				 */
				Main.prototype.load = function(uri) {
					if (uri) {
						window.location.href = this.ctx
								+ this._getRelativePath() + '?pageUri=' + uri;
					}
				}

				// 用Ajax获取
				Main.prototype._loadModules = function() {
					return [{
								id : '0',
								parent : null,
								code : 'platform_home',
								name : '平台首页',
								uri : 'develop/project/projects.jsp'
							}, {
								id : '01',
								parent : '0',
								code : 'create_project',
								name : '创建项目',
								uri : 'develop/project/create_project.jsp'
							}, {
								id : '02',
								parent : '0',
								code : 'project_home',
								name : '项目首页',
								uri : 'develop/project/project.jsp'
							}, {
								id : '021',
								parent : '02',
								code : 'synchronize_project',
								name : '项目级同步',
								uri : 'develop/project/synchronize_project.jsp'
							}, {
								id : '022',
								parent : '02',
								code : 'all_project_content',
								name : '所有内容',
								uri : 'develop/project/project_content.jsp'
							}, {
								id : '023',
								parent : '02',
								code : 'create_page',
								name : '创建页面',
								uri : 'develop/project/create_page.jsp'
							}, {
								id : '024',
								parent : '02',
								code : 'design_page',
								name : '页面设计',
								uri : 'develop/project/design_page.jsp'
							}];
				}

				Main.prototype._findModule = function(uri) {
					var M = this.modules, len = M.length, i;
					for (i = 0; i < len; i++) {
						if (M[i].uri == uri) {
							return M[i];
						}
					}
					return null;
				}

				Main.prototype._getModule = function(id) {
					var M = this.modules, len = M.length, i;
					for (i = 0; i < len; i++) {
						if (M[i].id == id) {
							return M[i];
						}
					}
					return null;
				}

				Main.prototype._updateBreadcrumb = function(module) {
					var m = module, ms = [];
					while (m) {
						ms.push(m);
						m = this._getModule(m.parent);
					}
					var len = ms.length, i;
					for (i = len - 1; i >= 0; i--) {
						this.breadcrumb.append('<li'
								+ (i == 0 ? ' class="active">' : '>')
								+ (i == 0
										? ms[i].name
										: ('<a href="' + this.ctx + this.path
												+ '?pageUri=' + ms[i].uri
												+ '">' + ms[i].name + '</a>'))
								+ '</li>');
					}
				}

				module.exports = Main;
			}());
		});