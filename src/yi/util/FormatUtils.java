/*
 * Yi Framework
 * 
 * Copyright (c) 2013,2014 DHC Software Research Department
 */

package yi.util;

import java.text.DecimalFormat;

/**
 * 格式化辅助函数库。
 * 
 * @author Jiangwei Xu
 *
 */
public final class FormatUtils {

	private final static DecimalFormat DF_WITH_COMMA = new DecimalFormat("0,000");

	/**
	 * 使用逗号（,）格式化数字。
	 * @param number
	 * @return
	 */
	public static String formatNumberWithComma(long number) {
		if (number < 1000)
			return String.valueOf(number);

		return DF_WITH_COMMA.format(number);
	}
}
