/**
 * ImageGallery
 * 
 * @author dengfenfen, dengfenfen@dhcc.com.cn, 2013-12-25
 * 
 * @extends gallery
 * 
 * @requires utils, extend, gallery
 * 
 * @method void setTitle(Object/String/Number item, String title)
 * 
 * @description updated on 2014-01-08
 * 
 */
define(function(require, exports, module) {
	'require:nomunge,exports:nomunge,module:nomunge';

	require('./image-gallery.css');
	var utils = require('utils');
	var extend = require('extend');
	var Gallery = require('gallery');

	(function() {
		var ImageGallery = extend(Gallery, {
					baseCls : 'yi-gallery',

					/**
					 * @cfg reader Object 1)identifier String: item的id对应数据哪个属性
					 *      2)srcProperty String/Function: 图片的src对应数据哪个属性
					 *      3)titleProperty String/Function : 图片的标题对应数据哪个属性
					 */
					reader : {},

					/**
					 * @cfg defaultSrc String
					 * 
					 * 数据中找不到src对应的属性则使用它作为图片的src
					 */
					defaultSrc : '',

					/**
					 * @cfg defaultSrc String
					 * 
					 * 数据中找不到title对应的属性则使用它作为标题
					 */
					defaultTitle : 'Title',

					/**
					 * @cfg hideTitle Boolean
					 * 
					 * 是否隐藏标题
					 */

					/**
					 * @cfg imageWidth Number
					 * 
					 * 图片宽度
					 */

					/**
					 * @cfg imageHeight Number
					 * 
					 * 图片高度
					 */

					onItemRender : function(item, container, id, data, isAdd) {
						ImageGallery.superclass.onItemRender.call(this, item,
								container, id, data, isAdd);

						var src, title;
						var sp = this.reader && this.reader.srcProperty;
						var tp = this.reader && this.reader.titleProperty;
						if (utils.isFunction(sp)) {
							src = sp.call(null, this, item, id, data, isAdd);
						} else if (sp) {
							src = data ? data[sp] : this.defaultSrc;
						}
						if (utils.isFunction(tp)) {
							title = tp.call(null, this, item, id, data, isAdd);
						} else if (tp) {
							title = data ? data[tp] : this.defaultTitle;
						}

						item.el
								.addClass(this.baseCls + '-image-item')
								.html('<div class="'
										+ this.baseCls
										+ '-item-top"><img '
										+ (this.imageWidth ? 'width="'
												+ this.imageWidth + 'px"' : '')
										+ ' '
										+ (this.imageHeight ? 'height="'
												+ this.imageHeight + 'px"' : '')
										+ ' src="' + src
										+ '" /></div><div class="'
										+ this.baseCls
										+ '-item-bottom" title="' + title
										+ '">' + title + '</div>');
					},
					/**
					 * 修改标题
					 * 
					 * @argument
					 * 
					 * 1、item String/Number/Object
					 * 参数可以是item对象、唯一标识或者UI中的位置（从0开始）
					 * 
					 * 2、title String: 新的标题
					 */
					setTitle : function(item, title) {
						var item = this.getItem(item);
						if (item) {
							title = title || '';

							var data = this.getItemData(item);
							data.title = title;

							item.el.children('.' + this.baseCls
									+ '-item-bottom').html(title);
						}
					}
				});

		module.exports = ImageGallery;
	}());
});