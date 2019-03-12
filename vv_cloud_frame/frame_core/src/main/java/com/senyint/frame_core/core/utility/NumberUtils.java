package com.senyint.frame_core.core.utility;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.UUID;

public class NumberUtils {

	/**
	 * 返回全球唯一编号(用于数据库字段主键)<br>
	 * Length = 32
	 * 
	 * @return 18c70f1727d5490b9086a566211eda77
	 */
	public static String getUUID() {
		UUID primaryKey = UUID.randomUUID();
		return primaryKey.toString().replace("-", "");
	}

	/**
	 * 根据日期生成流水号<br>
	 * Length = 20
	 * 
	 * @return 20111210115823147658
	 */
	public static String getPkByDate() {
		StringBuffer sb = new StringBuffer();
		SimpleDateFormat sft = new SimpleDateFormat("yyyyMMddhhmmss");
		sb.append(sft.format(new Date()));
		sb.append(String.valueOf(Math.random()).substring(2, 8));
		return sb.toString();
	}

	/**
	 * 根据传入的参数自定义流水号 Length = key1 + key2 + 23
	 * 
	 * @param key1
	 *            流水号第一个关键字
	 * @param key2
	 *            流水号第二个关键字，如order(代表订单 )
	 * @return ct-order-20111210115823-147658
	 */
	public static String getPkByDIY(String key1, String key2) {
		StringBuffer sb = new StringBuffer();
		sb.append(key1).append("-");
		sb.append(key2).append("-");

		SimpleDateFormat sft = new SimpleDateFormat("yyyyMMddhhmmss");
		sb.append(sft.format(new Date())).append("-");

		sb.append(String.valueOf(Math.random()).substring(2, 8));

		return sb.toString();
	}
	
	public static void main(String[] args) {
	    System.out.println(NumberUtils.getPkByDIY("", ""));
	}
	
}
