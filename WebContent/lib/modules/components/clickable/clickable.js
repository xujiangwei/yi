/**
 * Clickable 点击类
 * 
 * @author songdarui, songdarui@dhcc.com.cn, 2013-12-18
 * 
 * @extends component
 * 
 * @requires extend, component
 * 
 * @event click: function(Clickable c, Event e)
 * @event dblClick: function(Clickable c, Event e)
 * 
 * @description updated on 2014-03-11
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	var extend = require('extend');
	var Base = require('component');

	function onClick(e) {
		var comp = Base.get(e.data.componentId);
		comp.trigger('click', comp, e);

		comp = null;
	}

	function onDblClick(e) {
		var comp = Base.get(e.data.componentId);
		comp.trigger('dblclick', comp, e);

		comp = null;
	}

	(function() {
		var Clickable = extend(Base, {
			baseCls : 'yi-clickable',

			initComponent : function() {
				Clickable.superclass.initComponent.call(this);

				this.addEvents('click',

				'dblclick');
			},
			afterRender : function(container) {
				Clickable.superclass.afterRender.call(this, container);

				this.el.on('click', {
					componentId : this.getId()
				}, onClick);
				this.el.on('dblclick', {
					componentId : this.getId()
				}, onDblClick);
			},
			beforeDestroy : function() {
				this.el.off('click', onClick);
				this.el.off('dblclick', onDblClick);

				Clickable.superclass.beforeDestroy.call(this);
			}
		});

		module.exports = Clickable;
	}());
});