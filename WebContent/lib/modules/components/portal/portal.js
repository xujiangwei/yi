/**
 * Portal
 * 
 * @author liangranhui, liangranhui@dhcc.com.cn 2014-05-20
 * 
 * @reqires utils, Map, extend, component
 * 
 * @method void load(Object option)
 * @method void add(Object portlet)
 * @method void remove(Object/String portlet)
 * @method void toggle([String id])
 * @method void sort(Boolean sortable)
 * @method void initEvents(Object elem)
 * @method Number getColumnIndex()
 * @method Object createPortlet(Object portlet)
 * @method Object getPortlet(String/Object portlet)
 * @method Object setPortletTitle(Object portlet)
 * @method Object setPortletContent(Object portlet)
 * 
 * @event load: function(Portal p, Object/Array data)
 * @event beforeadd: function(Gallery g, Object portlet, String id)
 * @event add: function(Tab t, Object portlet, String id)
 * @event beforeremove: function(Portal p, Object portlet, String id)
 * @event remove: function(Portal p, Object item, String id)
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';
	
	require('./portal.css');
	var utils = require('utils');
	var Map = require('map');
	var extend = require('extend');
	var Base = require('component');
	require('../../../../lib/core/jquery-ui/jquery-ui.min');
	require('../../../../lib/core/jquery-ui/jquery.ui.core.min');
	
	function onClick(e) {
		var comp = Base.get(e.data.componentId);
		if(comp) {
			var $target = $(e.target);
			var $portlet = $target.closest('.yi-portlet');
			if($target.hasClass('yi-portlet-remove')) {
				comp.remove($portlet);
			} else if($target.hasClass('yi-portlet-toggle')) {
				$target.toggleClass("glyphicon-chevron-down").toggleClass('glyphicon-chevron-up');
				$portlet.find('.yi-portlet-content').slideToggle();
			}
			$target = null;
			$portlet = null;
		}
		comp = null;
	}
	
	(function() {
		var Portal = extend(Base, {
			baseCls : 'yi-portal',
			/**
			 * @cfg columnWidths Array
			 * 
			 * 遵从Bootstrap的栅格系统，columnWidths数组中设置每一列所占的宽度
			 */
			columnWidths : [6, 6],
			/**
			 * @cfg sortable Boolean
			 * 
			 * 是否可重新排序
			 */
			sortable : true,
			defaultTitle : 'portlet',
			
			initComponent : function() {
				Portal.superclass.initComponent.call(this);
				
				this.addEvents('load',

				'beforeadd',
				
				'add',
				
				'beforeremove',

				'remove');
			},
			afterRender : function(container) {
				Portal.superclass.afterRender.call(this, container);
				
				var scope = this;
				
				scope.el.addClass('row');
				
				$.each(this.columnWidths, function(index, val) {
					var cls = 'col-xs-' + val + ' col-sm-' + val + ' col-md-' + val + ' col-lg-' + val;
					$('<div class="yi-portlet-col ' + cls + '">').appendTo(scope.el);
				});
				
				if(this.portlets){
					$.each(this.portlets, function(i, portlet) {
						scope.createPortlet(portlet);
					});
				} else if(this.url) {
					this.load({
						url : this.url,
						params : this.params
					});
				}
				
				this.initEvents();
				this.sort(this.sortable);
			},
			load : function(option) {
				if(this.rendered) {
					option = option || {};
					this.url = option.url;
					this.params = option.params;
					if(this.url) {
						this.doLoad(this.url, this.params);
					}
				}
			},
			doLoad : function(url, params) {
				$.ajax({
					url : url,
					data : params || null,
					traditional : true,
					success : this.onLoadSuccess,
					context : this,
				});
			},
			onLoadSuccess : function(data, textStatus, jqXhr) {
				var scope = this;
				var data = jqXhr.responseText || [];
				$.each(data, function(i, portlet) {
					scope.createPortlet(portlet);
				});
				this.trigger('load', this, data);
				
				data = null;
			},
			/**
			 * 绑定事件
			 * 
			 * @argument elem Portlet包裹对象
			 */
 			initEvents : function(elem) {
				var elem = elem || this.el;
				elem.find('.yi-portlet-title > .glyphicon').on('click', {
					componentId : this.getId()
				}, onClick);
			},
			/**
			 * 获取列索引
			 */
			getColumnIndex : function() {
				var arr = [];
				this.el.find('.yi-portlet-col').each(function(i) {
					arr[i] = $(this).height();
				});
				return $.inArray(Math.min.apply(Math, arr), arr);
			},
			/**
			 * 创建Portlet
			 * 
			 * @argument portlet Object portlet对象
			 */
			createPortlet : function(portlet) {
				if(!this.itemMap) {
					this.initItems();
				}
				
				var id = portlet.id;
				var $portlet = null;
				if (this.trigger('beforeadd', this, portlet, id) !== false) {
					$portlet = $('<div/>').attr('id', id)
								.addClass('yi-portlet yi-portlet-default')
								.data('itemId', id);
					
					this.itemMap.put(id, $portlet);
					
					var index = this.getColumnIndex();
					var column = this.el.find('.yi-portlet-col').eq(index);
					$portlet.appendTo(column);
					
					var $title = $('<div/>', {
						'class' : 'yi-portlet-title',
						html : this.setPortletTitle(portlet)
					}).appendTo($portlet);
					
					var op = '<span class="yi-portlet-toggle glyphicon glyphicon-chevron-down"></span>'
						+ '<span class="yi-portlet-remove glyphicon glyphicon-remove"></span>'
					
					$title.append(op);
					
					var content = $('<div/>', {
		                'class': 'yi-portlet-content',
		                html : function() {
		                	return $(this).load(portlet.content);
		                }
		            }).appendTo($portlet);
					
					this.trigger('add', this, $portlet, id);
				}
				return $portlet;
			},
			initItems : function() {
				this.itemMap = new Map();
			},
			/**
			 * 设置Portlet的标题
			 * 
			 * @argument portlet Object portlet对象
			 */
			setPortletTitle : function(portlet) {
				return portlet.title || this.defaultTitle;
			},
			/**
			 * 设置Portlet的内容
			 * 
			 * @argument portlet Object 参数可以是portlet对象
			 */
			setPortletContent : function(portlet) {
				return portlet.content;
			},
			/**
			 * 获取Portlet对象
			 * 
			 * @argument portlet String/Object
			 *           参数可以是portlet对象、唯一标识
			 */
			getPortlet : function(portlet) {
				if (utils.isString(portlet)) {
					return this.itemMap.get(portlet);
				} else if (utils.isObject(portlet)) {
					return portlet;
				} else {
					return null;
				}
			},
			/**
			 * 添加Portlet
			 * 
			 * @argument portlet Object portlet对象
			 * 1)title String: Portlet标题 
			 * 2)content String: Portlet内容
			 */
			add : function(portlet) {
				portlet = portlet || {};
				
	            var elem = this.createPortlet(portlet);
	            
	            this.initEvents(elem);
	            
	            this.sort(this.sortable);
			},
			/**
			 * 删除Portlet
			 * 
			 * @argument portlet Object/String
			 *           参数可以是portlet对象、唯一标识
			 */
			remove : function(portlet) {
				var id, $portlet, ri;
				if (utils.isObject(portlet)) {
					ri = portlet;
					id = ri.data('itemId');
					$portlet = ri;
				} else if(utils.isString(portlet)) {
					id = portlet;
					ri = this.itemMap.get(portlet);
					$portlet = ri;
				}
				
				if(ri && this.trigger('beforeremove', this, ri, id) !== false) {
					$portlet.remove();
					this.itemMap.remove(id);
					
					this.trigger('remove', this, ri, id);
				}
				
				ri = null;
				$portlet = null;
			},
			/**
			 * 排序Portlet
			 * 
			 * @argument sortable Boolean 是否可以排序
			 */
			sort : function(sortable) {
				var st = this.el.find('.yi-portlet-col').sortable({
					connectWith : '.yi-portlet-col',
					handle : '.yi-portlet-title',
					items : '.yi-portlet',
					placeholder: "yi-portlet-placeholder ui-corner-all"
				});
				
				if(sortable == true) {
					this.el.find('.yi-portlet-title').css('cursor', 'move');
					st.sortable('enable');
				} else {
					this.el.find('.yi-portlet-title').css('cursor', 'default');
					st.sortable('disable');
				}
				this.el.find('.yi-portlet-title > .glyphicon').css('cursor', 'pointer');
			},
			/**
			 * 折叠或者展开Portlet内容
			 * 
			 * @argument id String 可选 唯一标识
			 */
			toggle : function(id) {
				var el = this.el;
				if(id) {
					$('#' + id + ' .yi-portlet-toggle', el).toggleClass("glyphicon-chevron-down").toggleClass('glyphicon-chevron-up');
					$('#' + id + ' .yi-portlet-content', el).slideToggle();
				} else {
					$('.yi-portlet-toggle', el).toggleClass("glyphicon-chevron-down").toggleClass('glyphicon-chevron-up');
					$('.yi-portlet-content', el).slideToggle();
				}
			},
			beforeDestroy : function() {
				if (this.itemMap) {
					this.itemMap.clear();
					delete this.itemMap;
				}
				
				this.el.find('.yi-portlet-title > .glyphicon').off('click', onClick);
				
				Portal.superclass.beforeDestory.call(this);
			}
		});
		module.exports = Portal;
	}());
});