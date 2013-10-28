/**
 * Utils
 */

/** 是否出现垂直滚动条。 */
function hasVScroll() {
	if (document.documentElement.clientHeight < document.documentElement.offsetHeight - 4) {
		return true;
	}
	else {
		return false;
	}
}
