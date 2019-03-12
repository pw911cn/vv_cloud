package com.senyint.frame_core.component.threadpool;

import java.util.concurrent.atomic.AtomicInteger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
  * 类名：WorkThread<BR>
  * 描述：自定义线程<BR>
  * 作者： wangshi<BR>
  * 日期 ：2018年12月12日 下午3:06:29<BR>
  *
  */
public class WorkThread extends Thread {     
    
    private static final Logger logger = LoggerFactory.getLogger(WorkThread.class);
    private Runnable target;   //线程执行目标
    private AtomicInteger counter;  
 
    public WorkThread(Runnable target, AtomicInteger counter) {  
        this.target = target;  
        this.counter = counter;  
    }  
    @Override 
    public void run() {  
        try {  
            target.run();  
        } finally {  
            int c = counter.getAndDecrement();  
            logger.info("停止 no " + c + " 线程: "+ this.getName());  
        }  
    }  
}
