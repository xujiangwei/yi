define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	require('./projects.css');
	var Base = require('component');
	var extend = require('extend');
	var ProjectGallery = require('./units/projectGallery');

	function createProject(e) {
		framework.load('develop/project/create_project.jsp');
	}

	var CLOSED_PROJECTS_SWITCHER_TEXT = {
		hide : '<<隐藏已结束项目',
		show : '已结束项目>>'
	}
	function switchClosedProjects(e) {
		var comp = Base.get(e.data.componentId);
		if (comp.gallery) {
			if (comp.gallery.hidden) {
				comp.gallery.show();
				$(this).html(CLOSED_PROJECTS_SWITCHER_TEXT['hide'])
			} else {
				comp.gallery.hide();
				$(this).html(CLOSED_PROJECTS_SWITCHER_TEXT['show'])
			}
		}

		comp = null;
	}

	// will be replaced by Button
	var Extension;

	(function() {
		Extension = Base.extend({
					afterRender : function(parent) {
						this.el.on('click', {
									componentId : this.getId()
								}, createProject);
					}
				});
	}());

	var Extension2;

	(function() {
		Extension2 = Base.extend({
					afterRender : function(parent) {
						this.el.on('click', {
									componentId : this.getId()
								}, switchClosedProjects);
					}
				});
	}());

	// 大图列表测试数据
	var data = [{
				id : '1',
				name : '国航三期',
				status : {
					code : 'developing',
					name : '开发中'
				},
				startDate : '2013-09-30',
				endDate : '2013-12-31',
				manager : {
					face : '../private/styles/default/project/project_manager_face.png'
				},
				ip : '192.168.1.2'
			}, {
				id : '2',
				name : '水利部三期',
				status : {
					code : 'draft',
					name : '草拟'
				},
				startDate : '2013-09-30',
				endDate : '2013-12-31',
				manager : {
					face : '../private/styles/default/project/project_manager_face.png'
				},
				ip : '192.168.1.3'
			}, {
				id : '3',
				name : '厦门银行一期',
				status : {
					code : 'draft',
					name : '草拟'
				},
				startDate : '2013-09-30',
				endDate : '2013-12-31',
				manager : {
					face : '../private/styles/default/project/project_manager_face.png'
				},
				ip : '192.168.1.4'
			}, {
				id : '4',
				name : '宁夏银行一期',
				status : {
					code : 'draft',
					name : '草拟'
				},
				startDate : '2013-09-30',
				endDate : '2013-12-31',
				manager : {
					face : '../private/styles/default/project/project_manager_face.png'
				},
				ip : '192.168.1.5'
			}, {
				id : '5',
				name : '新汶煤矿',
				status : {
					code : 'draft',
					name : '草拟'
				},
				startDate : '2013-09-30',
				endDate : '2013-12-31',
				manager : {
					face : '../private/styles/default/project/project_manager_face.png'
				},
				ip : '192.168.1.6'
			}, {
				id : '6',
				name : '汉口银行',
				status : {
					code : 'draft',
					name : '草拟'
				},
				startDate : '2013-09-30',
				endDate : '2013-12-31',
				manager : {
					face : '../private/styles/default/project/project_manager_face.png'
				},
				ip : '192.168.1.7'
			}];
	var closedData = [{
				id : '11',
				name : '国航三期',
				status : {
					code : 'developing',
					name : '开发中'
				},
				startDate : '2013-09-30',
				endDate : '2013-12-31',
				manager : {
					face : '../private/styles/default/project/project_manager_face.png'
				},
				ip : '192.168.1.2'
			}, {
				id : '12',
				name : '水利部三期',
				status : {
					code : 'draft',
					name : '草拟'
				},
				startDate : '2013-09-30',
				endDate : '2013-12-31',
				manager : {
					face : '../private/styles/default/project/project_manager_face.png'
				},
				ip : '192.168.1.3'
			}, {
				id : '13',
				name : '厦门银行一期',
				status : {
					code : 'draft',
					name : '草拟'
				},
				startDate : '2013-09-30',
				endDate : '2013-12-31',
				manager : {
					face : '../private/styles/default/project/project_manager_face.png'
				},
				ip : '192.168.1.4'
			}];

	return {
		run : function() {
			var e = new Extension({
						applyTo : 'projects_create_project_btn'
					});

			var projects = new ProjectGallery({
						applyTo : 'projects_gallery',
						data : data
					});

			var closedProjects = new ProjectGallery({
						hidden : true,
						applyTo : 'closed_projects_gallery',
						data : data
					});

			var switcher = new Extension2({
						applyTo : 'closed_projects_switch',
						gallery : closedProjects
					});
		}
	};
});