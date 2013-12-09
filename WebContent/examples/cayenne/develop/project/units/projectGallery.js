define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	require('./projectGallery.css');
	var Base = require('component');
	var extend = require('extend');
	var Gallery = require('gallery');
	var Timeline = require('modules/components/timeline/timeline');

	var ProjectGallery = extend(Gallery, {
		onItemRender : function($item, item) {
			var timelineId = item.id + '_timeline';

			$item.addClass('project-gallery-item')
					//row 1
					.html('<div class="row">'
									+ '<div class="project-gallery-name col-lg-6">'
									+ item.name
									+ '</div>'
									+ '<div class="project-gallery-status col-lg-6">'
									+ '<a href="javascript:void(0)">（'
									+ (item.status ? item.status.name : '')
									+ '）</a>'
									+ '</div>'
									+ '</div>'
									// row 2
									+ '<div class="row">'
									+ '<div class="project-gallery-tools col-lg-12">'
									+ '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-inbox"></span></button>'
									+ '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-book"></span></button>'
									+ '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-briefcase"></span></button>'
									+ '</div>'
									+ '</div>'
									// row 3
									+ '<div class="row">'
									+ '<div id="'
									+ timelineId
									+ '" class="project-gallery-timeline yi-timeline yi-timeline-sm col-lg-12">'
									+ '<div class="yi-timeline-axis"></div>'
									+ '<div class="yi-timeline-start">'
									+ item.startDate
									+ '</div>'
									+ '<div class="yi-timeline-end">'
									+ item.endDate
									+ '</div>'
									+ '</div>'
									+ '</div>'
									// row 4
									+ '<div class="row">'
									+ '<div class="project-gallery-manager col-lg-12">'
									+ '<button type="button" class="btn btn-default"><img class="project-manager-face" src="'
									+ item.manager.face// 循环
									+ '"></img></button>'
									+ '</div>'
									+ '</div>'
									// row 5
									+ '<div class="row">'
									+ '<div class="project-gallery-ip col-lg-6">'
									+ '<p>平台主IP：</p>'
									+ '<p><a href="javascript:void(0)">'
									+ item.ip
									+ '</a></p>'
									+ '</div>'
									+ '<div class="project-gallery-syn col-lg-6">'
									+ '<button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-refresh"></span> 同步</button>'
									+ '</div>' + '</div>').height(210);

			new Timeline({
						applyTo : timelineId,
						startDate : item.startDate,
						endDate : item.endDate,
						value : '2013-12-06',// TODO 日期格式化工具将今天的日期填上去
						readonly : true
					});

			return ''
		}
	});

	return module.exports = ProjectGallery;
});