define(function(require, exports, module) {
	var Class = function(properties) {
		var klass = function() {

			return (arguments[0] !== null && this.initialize && $type(this.initialize) == 'function') ? this.initialize
					.apply(this, arguments)
					: this;
		};
		$extend(klass, this);
		klass.prototype = properties;
		klass.constructor = Class;

		return klass;
	};
	Class.prototype = {
		extend : function(properties) {

			var proto = new this(null);

			for ( var property in properties) {
				var pp = proto[property];
				proto[property] = Class.Merge(pp, properties[property]);
			}
			return new Class(proto);
		},
		implement : function() {
			for ( var i = 0, l = arguments.length; i < l; i++) {
				$extend(this.prototype, arguments[i]);
			}
		}
	};
	Class.Merge = function(previous, current) {
		if (previous && previous != current) {
			var type = $type(current);
			if (type != $type(previous))
				return current;
			switch (type) {
			case 'function':
				var merged = function() {
					this.parent = arguments.callee.parent;
					return current.apply(this, arguments);
				};
				merged.parent = previous;
				return merged;
			case 'object':
				return $merge(previous, current);
			}
		}
		return current;
	};
	function $merge() {
		var mix = {};
		for ( var i = 0; i < arguments.length; i++) {
			for ( var property in arguments[i]) {
				var ap = arguments[i][property];
				var mp = mix[property];
				if (mp && $type(ap) == 'object' && $type(mp) == 'object')
					mix[property] = $merge(mp, ap);
				else
					mix[property] = ap;
			}
		}
		return mix;
	}
	function $type(obj) {
		if (!$defined(obj))
			return false;
		if (obj.htmlElement)
			return 'element';
		var type = typeof obj;
		if (type == 'object' && obj.nodeName) {
			switch (obj.nodeType) {
			case 1:
				return 'element';
			case 3:
				return (/\S/).test(obj.nodeValue) ? 'textnode' : 'whitespace';
			}
		}
		if (type == 'object' || type == 'function') {
			switch (obj.constructor) {
			case Array:
				return 'array';
			case RegExp:
				return 'regexp';
			case Class:
				return 'class';
			}
			if (typeof obj.length == 'number') {
				if (obj.item)
					return 'collection';
				if (obj.callee)
					return 'arguments';
			}
		}
		return type;
	};
	function $defined(obj) {
		return (obj != undefined);
	};
	var $extend = function() {
		var args = arguments;
		if (!args[1])
			args = [ this, args[0] ];

		for ( var property in args[1])
			args[0][property] = args[1][property];

		return args[0];
	};
	var slice = Array.prototype.slice;
	function StringBuffer(){
		this._strings_=new  Array;
	}
	StringBuffer.prototype.append=function (str){
		this._strings_.push(str);
	};
	StringBuffer.prototype.toString=function(){
		return this._strings_.join("");
	};
	String.prototype.Trim = function(){
		return this.replace(/(^\s*)|(\s*$)/g,""); 
	};
	var Template = function(template, pattern) {
		this.template = String(template);
		this.pattern = pattern || Template.Pattern;
	};
	Template.Pattern = /@\{([^}]*)\}/mg;
	Template.trim = String.trim || function(str) {
		return str.replace(/^\s+|\s+$/g, '');
	};
	Template.prototype = {
		constructor : Template,
		compile : function(object) {
			return this.template.replace(this.pattern, function(displace,
					variable) {
				variable = Template.trim(variable);
				return displace = object[variable];
			});
		}
	};
	var BaseClass = new Class( {
		addEventHandler : function(oTarget, sEventType, fnHandler) {
			if (oTarget.addEventListener) {
				oTarget.addEventListener(sEventType, fnHandler, false);
			} else if (oTarget.attachEvent) {

				oTarget.attachEvent("on" + sEventType, fnHandler);
			} else {
				oTarget["on" + sEventType] = fnHandler;
			}
		},
		removeEventHandler:function(oTarget, sEventType, fnHandler) {
			if (oTarget.removeEventListener) {
				oTarget.removeEventListener(sEventType, fnHandler, false);
			} else if (oTarget.detachEvent) {
				oTarget.detachEvent("on" + sEventType, fnHandler);
			} else {
				oTarget["on" + sEventType] = null;
			}
		},
		Template:function(){
			return  Template;
		},
		StringBuffer:function(){
			return new StringBuffer();
		},
		Bind:function(thisp, fun) {
			var args = slice.call(arguments, 2);
			return function() {
				return fun.apply(thisp, args.concat(slice.call(arguments)));
			};
		},
		BindAsEventListener:function(thisp, fun) {
			var args = slice.call(arguments, 2);
			return function(event) {
				return fun.apply(thisp, [ event || window.event ].concat(args));
			};
		},
		randomChar:function()  {
			  var l=7;
		      var  x="qwertyuioplkjhgfdsazxcvbnm";
		      var  tmp=[];
		      var re;
		      for(var  i=0;i<  l;i++)  {
		           tmp.push(x.charAt(Math.ceil(Math.random()*100000000)%x.length));
		      }
		      re=tmp.join("");
		      return re;
		},
		Extend : function(destination, source) {
			for ( var property in source) {
				destination[property] = source[property];
			}
			return destination;
		},
		initialize : function(options) {
			this.SetOptionsValue();
			this.SetOptions(options);

		},
		SetOptionsValue : function() {
			this.options = {};
		},
		SetOptions : function(options) {
			this.Extend(this.options, options || {});
		}
	});
	module.exports=BaseClass;
});