package com.senyint.frame_core.component.threadpool;

import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.scheduling.annotation.AsyncResult;
import org.springframework.stereotype.Component;
import org.springframework.util.concurrent.ListenableFuture;

/**
  * 类名：HelloExample<BR>
  * 描述：调用服务例子<BR>
  *  hello.sayHello2("ws");   //异步调用
  *  String r = hello.sayHello("yan").get();//阻塞调用
  *  hello.sayHello("yan").get(1, TimeUnit.SECONDS);// 限时调用
  * 作者： wangshi<BR>
  * 日期 ：2018年12月4日 下午7:59:29<BR>
  *
  */
@Component
public class HelloExample {
    
	
	/**
	 *<p>
	  * 名称:  sayHello1<BR>
	  * 描述:  异步例子<BR>
	  * 作者:  wangshi<BR>
	  * 日期:  2018年12月4日 下午3:20:26<BR>
	  * 
	  * @param name  
	  * void  
	  */
	@Async
	public void sayHello1(String name) {
//		try {
//			Thread.sleep(10000);
//		} catch (InterruptedException e) {
//			e.printStackTrace();
//		}
//		int i=1/0;
		LoggerFactory.getLogger(HelloExample.class).info(Thread.currentThread().getName()+"--"+name + ":Hello World1!");
	}
	
	/**
	 *<p>
	  * 名称:  sayHello2<BR>
	  * 描述:  同步例子<BR>
	  * 作者:  wangshi<BR>
	  * 日期:  2018年12月4日 下午3:20:38<BR>
	  * 
	  * @param name
	  * @return  
	  * ListenableFuture<String>  
	  */
	@Async
    public ListenableFuture<String> sayHello2(String name) {
		try {
		Thread.sleep(1000);
	} catch (InterruptedException e) {
		e.printStackTrace();
	}
        String res = name + ":Hello World2!";
        LoggerFactory.getLogger(HelloExample.class).info(res);
        return new AsyncResult<>(res);
    }
}