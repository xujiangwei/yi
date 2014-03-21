define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	require('./resources/project-gallery.css');
	require('./resources/dir-gallery.css');
	require('./resources/carousel.css');
	require('./resources/graph-radio-group.css');
	require('./resources/project-content-detail.css');
	var utils = require('utils');
	var DateFormat = require('date-format');
	var Base = require('component');
	var Clickable = require('clickable');
	var Button = require('button');
	var Gallery = require('gallery');
	var ImageGallery = require('image-gallery');
	var PageLoader = require('page-loader');
	var Tab = require('tab');
	var Timeline = require('timeline');
	var GraphRadioGroup = require('graph-radio-group');
	var ModalWindow = require('modal-window');
	var Carousel = require('carousel');
	var Form = require('form');

	// gallery_customization_example
	var PROJECT_STATUS = {
		'active' : '（开发中）',
		'closed' : '（已结束）'
	};
	var formatter = new DateFormat('yyyy-MM-dd');

	function renderProject(g, item, id, isAdd) {
		var data = this.getItemData(id);

		var timelineId = data.code + '_timeline';

		item.el
				.html(
				// row 1
				'<div class="row">'
						+ '<div class="project-gallery-name col-xs-6">'
						+ data.name
						+ '</div>'
						+ '<div class="project-gallery-status col-xs-6">'
						+ '<a href="javascript:void(0)">'
						+ (PROJECT_STATUS[data.status] || '')
						+ '</a>'
						+ '</div>'
						+ '</div>'
						// row 2
						+ '<div class="row">'
						+ '<div class="project-gallery-tools col-md-12">'
						+ '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-inbox"></span></button>'
						+ '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-book"></span></button>'
						+ '<button type="button" class="btn btn-default"><span class="glyphicon glyphicon-briefcase"></span></button>'
						+ '</div>'
						+ '</div>'
						// row 3
						+ '<div class="row">'
						+ '<div class="project-gallery-timeline col-md-12">'
						+ '<div id="'
						+ timelineId
						+ '" class="yi-timeline yi-timeline-sm">'
						+ '<div class="yi-timeline-axis"></div>'
						+ '<div class="yi-timeline-start">'
						+ data.startDate
						+ '</div>'
						+ '<div class="yi-timeline-end">'
						+ data.endDate
						+ '</div>'
						+ '</div>'
						+ '</div>'
						+ '</div>'
						// row 4
						+ '<div class="row">'
						+ '<div class="project-gallery-manager col-md-12">'
						+ '<button type="button" class="btn btn-default"><img class="project-manager-face" src="'
						+ (data.manager
								? data.manager.face
								: 'examples/components/resources/images/32_32/project_manager_face.png')// 循环
						+ '"></img></button>'
						+ '</div>'
						+ '</div>'
						// row 5
						+ '<div class="row">'
						+ '<div class="project-gallery-ip col-xs-6">'
						+ '<p>平台主IP：mdp>'
						+ '<p><a href="javascript:void(0)">'
						+ data.ip
						+ '</a></p>'
						+ '</div>'
						+ '<div class="project-gallery-syn col-xs-6">'
						+ '<button type="button" class="btn btn-default btn-xs"><span class="glyphicon glyphicon-refresh"></span> 同步</button>'
						+ '</div>' + '</div>');

		item.timeline = new Timeline(
				{
					applyTo : timelineId,
					startDate : data.startDate ? data.startDate
							.substring(0, 10) : null,
					endDate : data.endDate
							? data.endDate.substring(0, 10)
							: null,
					value : formatter.format(new Date()),
					readonly : true
				});
	}

	function destroyProject(g, item, id, isAdd) {
		if (item.timeline) {
			item.timeline.destroy();
			delete item.timeline;
		}
	}

	// gallery_customization_example2
	function renderDir(g, item, id, isAdd) {
		item.el.html(this.getItemData(id).name);
	}

	function addDir() {
		var $input = $('input[name="dir_name"]');
		var val = $input.val();
		if (!utils.isEmpty(val)) {
			this.add({
				name : val
			});
		}
		$input.val('');
		$input = null;
	}

	// image_gallery_example
	function getSrc(g, item, id, data, isAdd) {
		return isAdd
				? 'examples/components/resources/images/100_120/add.png'
				: 'examples/components/resources/images/100_120/bp.png';
	}

	function getTitle(g, item, id, data, isAdd) {
		return isAdd ? '创建' : data.name;
	}

	// 带图单选组
	var onRadioItemRender = function(comp, $ct, data) {
		$ct.html('<p>' + data.text + '</p><img src="' + data.url + '"/>')
				.addClass('yi-component-demo-radio-group-graph');
	}

	// 模态窗口
	function handler($btn) {
		this.hide();
	}

	// 轮播
	var onItemRender = function(scope, item, id) {
		var data = scope.getItemData(id);
		item.el
				.html('<img src="examples/components/resources/images/carousel/base.png"/><p class="yi-component-demo-carousel-name">'
						+ data.name + '</p>');
	}
	var onItemRenderThumail = function(scope, item, id) {
		var data = scope.getItemData(id);
		item.el
				.html('<img src="examples/components/resources/images/carousel/upageVersion.jpg"/><p class="yi-component-demo-carousel-thumbnail-name">'
						+ data.name + '</p>');
	}
	var onSwitch = function($scope, currentItem, nextItem) {
		// console.log('switch', $scope, currentItem, nextItem);
	}

	// page_loader_example
	function renderProjectContent(p) {
		this.switcher = this.el.find('.project-content-switcher');
		this.switcher.children('.project-content-switcher-' + this.type)
				.addClass('project-content-switcher-item-active');
		this.switcher.on('click', {
			componentId : this.getId()
		}, onSwitcherClick);
	}

	function onSwitcherClick(e) {
		var $item = $(e.target).closest('.project-content-switcher-item');

		if ($item.size() > 0) {
			$item.parent().children('.project-content-switcher-item')
					.removeClass('project-content-switcher-item-active');

			$item.addClass('project-content-switcher-item-active');
		} else {
			return;
		}

		var type;
		if ($item.hasClass('project-content-switcher-bp')) {
			type = 'bp';
		} else if ($item.hasClass('project-content-switcher-page')) {
			type = 'page';
		} else if ($item.hasClass('project-content-switcher-report')) {
			type = 'report';
		}

		if (type) {
			var comp = Base.get(e.data.componentId);
			if (comp) {
				comp.type = type;
			}

			comp = null;
		}

		$item = null;
	}

	// tab_example
	function renderGalleryInTab(p) {
		var resourceGallery = new ImageGallery({
			renderTo : 'image_gallery_in_tab_example',
			cols : [2, 3, 4, 6],
			itemCls : 'resource-gallery-item',
			imageWidth : 100,
			imageHeight : 120,
			hasAddItem : true,
			addItemFront : true,
			dataUrl : 'examples/components/data/resource-gallery-data.json',
			autoLoad : true,
			reader : {
				identifier : 'code',
				srcProperty : getSrc,
				titleProperty : getTitle
			}
		});
	}

	function addNewTab(t, addButton, e) {
		var ts = this
				.add({
					title : '新的标签',
					html : '<br><p>壹框</p><p>基于 Servlet & Bootstrap & jQuery & Seajs 简洁、直观、强悍、移动设备可用的前端开发框架，让 Web 开发更迅速、简单。</p>'
				});
		this.setActive(ts[0]);
	}

	// clickable_example
	var SWITCHER_TEXT = {
		'expand' : '展开>>',
		'collapse' : '<<收起'
	};

	function toggleTarget(c, e) {
		if (this.hidden) {
			c.getEl().html(SWITCHER_TEXT['collapse']);
			this.show();
		} else {
			c.getEl().html(SWITCHER_TEXT['expand']);
			this.hide();
		}
	}

	// button_example
	var ICON_CLASSES = ['glyphicon glyphicon-cog',
			'glyphicon glyphicon-envelope', 'glyphicon glyphicon-check'], ii = 0;
	var TEXT = ['按钮图标a', '按钮图标b', '按钮图标'], jj = 0;

	function onButtonClick(b, e) {
		yi.alert('应用于已有元素 ');
	}

	function onButton2Click(b, e) {
		yi.alert('按钮的类型：' + b.type);
	}

	function onButton3Click(b, e) {
		yi.alert('按钮的名称：' + b.name);
	}

	function onButton4Click(b, e) {
		yi.alert('按钮的值：' + b.value);
	}

	function onButton5Click(b, e) {
		yi.alert('我永远不会执行');
	}

	function onButton6Click(b, e) {
		b.setIconCls(ICON_CLASSES[ii++ % 3]);
		b.setText(TEXT[jj++ % 3]);
	}

	function onButton7Click(b, e) {
		yi.alert('按钮的文字：' + b.text);
	}

	function onButton8Click(b, e) {
		yi.alert('新按钮');
	}

	// form_submit_example
	function onSubmitFormRender(c) {
		this.el.find('input[name=startDate]').val(formatter.format(new Date()));
	}

	function submit(b, e) {
		this.submit({
			url : 'examples/components/data/url-for-submit-form.jsp',
			method : 'POST',
			success : onSubmitSuccess,
			scope : this
		});
	}

	function onSubmitSuccess(form, xhr) {
		var r = $.parseJSON(xhr.responseText);
		if (r) {
			$('#form_submit_example_name').html(r.name);
			$('#form_submit_example_description').html(r.description);
			$('#form_submit_example_start_date').html(r.startDate);
			$('#form_submit_example_end_date').html(r.endDate);
		}
	}

	(function() {
		function Components() {
			// timeline_example
			var timeline = new Timeline({
				renderTo : 'timeline_example3',
				startDate : '2013-06-23',
				endDate : '2013-12-31'
			});

			// gallery_base_example
			var emptyGallery = new Gallery({
				renderTo : 'gallery_base_example',
				cols : [4, 4, 4, 4],
				itemHeight : 100,
				data : [{
					"code" : "C8E7204207E87FEE31A8EF391729072D"
				}, {
					"code" : "0AAF8643D5E31F0318C4521F9D2F981F"
				}, {
					"code" : "CD58ED41913D38C0F58CC5B1AD327C11"
				}, {
					"code" : "CC9D5D1B2F3DFC5B01C027E46F81901D"
				}, {
					"code" : "05BC186E584E8F398EEBC339440FDB5D"
				}, {
					"code" : "EDB16ABF1DDA96128A5B46D4A45560BE"
				}, {
					"code" : "2E949599AEBBFB1AC077FA6D92ADBB91"
				}, {
					"code" : "3A05D5ADFBC2087D3C550A6C44E56CCB"
				}, {
					"code" : "BA323F77E6549D1771037F55503E33D8"
				}, {
					"code" : "C79F121832DCD993179C88775AEFFC5A"
				}, {
					"code" : "B442E769F27937794BB53E69DD15439C"
				}, {
					"code" : "FF4F2D7CABD588D757C76B143DF2FDF0"
				}],
				reader : {
					identifier : 'code'
				}
			});

			// gallery_customization_example
			var projectGallery = new Gallery({
				renderTo : 'gallery_customization_example',
				cols : [1, 1, 2, 2],
				itemCls : 'project-gallery-item',
				dataUrl : 'examples/components/data/project-gallery-data.json',
				params : {
					status : 'active'
				},
				autoLoad : true,
				reader : {
					identifier : 'code'
				},
				listeners : {
					'itemrender' : {
						fn : renderProject
					},
					'beforeitemdestroy' : {
						fn : destroyProject
					}
				}
			});

			// gallery_customization_example2
			var dirGallery = new Gallery({
				renderTo : 'gallery_customization_example2',
				cols : [3, 3, 3, 3],
				itemCls : 'dir-gallery-item',
				dataUrl : 'examples/components/data/dir-gallery-data.json',
				params : {
					project : 'PROJECTCODE'
				},
				autoLoad : true,
				reader : {
					identifier : 'code'
				},
				listeners : {
					'itemrender' : {
						fn : renderDir
					}
				}
			});
			var dirAddBtn = new Button({
				applyTo : 'gallery_customization_example2_add_btn',
				listeners : {
					'click' : {
						fn : addDir,
						scope : dirGallery
					}
				}
			});

			// image_gallery_example
			var resourceGallery = new ImageGallery(
					{
						renderTo : 'image_gallery_example',
						cols : [2, 3, 4, 6],
						itemCls : 'resource-gallery-item',
						imageWidth : 100,
						imageHeight : 120,
						hasAddItem : true,
						addItemFront : true,
						dataUrl : 'examples/components/data/resource-gallery-data.json',
						autoLoad : true,
						reader : {
							identifier : 'code',
							srcProperty : getSrc,
							titleProperty : getTitle
						}
					});

			// 带图单选组
			var graphRadioGroup = new GraphRadioGroup(
					{
						applyTo : 'graph_radio_group_example_custom',
						margin : 50,
						region : "north",
						data : [
								{
									text : '集中开发',
									url : 'examples/components/resources/images/graph_radio_group/centralize.png'
								},
								{
									text : '分散开发',
									url : 'examples/components/resources/images/graph_radio_group/separate.png'
								},
								{
									text : '自由开发',
									url : 'examples/components/resources/images/graph_radio_group/free.png'
								},
								{
									text : '个人开发',
									url : 'examples/components/resources/images/graph_radio_group/individual.png'
								}],
						listeners : {
							'itemrender' : onRadioItemRender
						}
					});

			// 模态窗口
			var win = new ModalWindow({
				renderTo : 'modal_window_example_first',
				url : 'examples/components/html/modal_win_example.html',
				title : 'Modal Heading',
				height : 500,
				buttons : [{
					text : 'close',
					disabled : false,
					handler : handler
				}, {
					text : 'save',
					iconCls : 'glyphicon glyphicon-ok',
					cls : 'btn-primary'
				}]
			});
			$('#window_example_one_btn').on('click', function() {
				win.show();
			});

			// 轮播
			var carousel = new Carousel({
				applyTo : 'carousel_example_base',
				data : [{
					id : 'carousel_1',
					name : 'item_1'
				}, {
					id : 'carousel_2',
					name : 'item_2'
				}, {
					id : 'carousel_3',
					name : 'item_3'
				}, {
					id : 'carousel_4',
					name : 'item_4'
				}, {
					id : 'carousel_5',
					name : 'item_5'
				}],
				width : 600,
				height : 300,
				hasIndicators : true,
				autoPlay : true,
				listeners : {
					'itemRender' : {
						fn : onItemRender
					}
				}
			});
			var carouselThumail = new Carousel({
				applyTo : 'carousel_example_thumail',
				data : [{
					id : 'carousel_1',
					name : 'item_1'
				}, {
					id : 'carousel_2',
					name : 'item_2'
				}, {
					id : 'carousel_3',
					name : 'item_3'
				}, {
					id : 'carousel_4',
					name : 'item_4'
				}, {
					id : 'carousel_5',
					name : 'item_5'
				}],
				width : 600,
				height : 300,
				hasIndicators : true,
				thumbnail : true,
				startWidth : 240,
				startHeight : 240,
				listeners : {
					'itemRender' : {
						fn : onItemRenderThumail
					},
					'switch' : {
						fn : onSwitch
					}
				}
			});

			// page_loader_example
			var projectContent = new PageLoader(
					{
						type : 'bp',
						renderTo : 'page_loader_example',
						url : 'examples/components/html/page_for_page_loader_example.html',
						listeners : {
							'load' : renderProjectContent
						}
					});

			// tab_example
			var tab = new Tab(
					{
						renderTo : 'tab_example2',
						hasAddButton : true,
						items : [
								{
									title : '标签1',
									html : '<br>通过html字符串添加标签页内容'
								},
								{
									title : '标签2',
									url : 'examples/components/html/page_for_tab_example2.html',
									loadScripts : true
								},
								{
									title : '标签3',
									html : '<br>通过事件添加标签页内容<br><br><div id="image_gallery_in_tab_example"></div>',
									listeners : {
										'load' : {
											fn : renderGalleryInTab
										}
									}
								}],
						listeners : {
							'addbuttonclick' : {
								fn : addNewTab
							}
						}
					});

			// clickable_example
			var target = new Base({
				applyTo : 'clickable_example_target',
				hidden : true
			});
			var switcher = new Clickable({
				applyTo : 'clickable_example_switcher',
				listeners : {
					'click' : {
						fn : toggleTarget,
						scope : target
					}
				}
			});

			// clickable_example
			var be = new Button({
				applyTo : 'button_example1',
				listeners : {
					'click' : {
						fn : onButtonClick
					}
				}
			});
			var be2 = new Button({
				applyTo : 'button_example2',
				cls : 'btn-primary',
				type : 'submit',
				listeners : {
					'click' : {
						fn : onButton2Click
					}
				}
			});
			var be3 = new Button({
				applyTo : 'button_example3',
				cls : 'btn-success',
				name : 'button_example3',
				listeners : {
					'click' : {
						fn : onButton3Click
					}
				}
			});
			var be4 = new Button({
				applyTo : 'button_example4',
				cls : 'btn-info',
				value : '4',
				listeners : {
					'click' : {
						fn : onButton4Click
					}
				}
			});
			var be5 = new Button({
				applyTo : 'button_example5',
				cls : 'btn-warning',
				disabled : true,
				listeners : {
					'click' : {
						fn : onButton5Click
					}
				}
			});
			var be6 = new Button({
				applyTo : 'button_example6',
				cls : 'btn-danger',
				iconCls : 'glyphicon glyphicon-check',
				listeners : {
					'click' : {
						fn : onButton6Click
					}
				}
			});
			var be7 = new Button({
				applyTo : 'button_example7',
				cls : 'btn-link',
				text : '按钮的文字',
				listeners : {
					'click' : {
						fn : onButton7Click
					}
				}
			});
			var be8 = new Button({
				renderTo : 'button_example',
				text : '新按钮',
				listeners : {
					'click' : {
						fn : onButton8Click
					}
				}
			});

			// form_submit_example
			var submitForm = new Form({
				applyTo : 'form_submit_example',
				listeners : {
					'render' : {
						fn : onSubmitFormRender
					}
				}
			});
			var submitBtn = new Button({
				applyTo : 'form_submit_example_submit_btn',
				listeners : {
					'click' : {
						fn : submit,
						scope : submitForm
					}
				}
			});
		}

		Components.run = function() {
			new Components();
		};

		module.exports = Components;
	}());
});