
package com.senyint.frame_core.component.threadpool;

import java.util.concurrent.ThreadFactory;
import java.util.concurrent.atomic.AtomicInteger;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
  * 类名：WorkThreadFactory<BR>
  * 描述：自定义线程工厂类<BR>
  * 作者： wangshi<BR>
  * 日期 ：2018年12月12日 上午10:13:07<BR>
  *
  */
public class WorkThreadFactory implements ThreadFactory
{

    private static final Logger logger = LoggerFactory.getLogger(WorkThreadFactory.class);
    
    private AtomicInteger atomicInteger = new AtomicInteger(0);
    
    private String threadNamePrefix = "WORKTHREAD-";
    
    public WorkThreadFactory() {}
    
    public WorkThreadFactory(String threadNamePrefix) {
        this.threadNamePrefix = threadNamePrefix;
    }

    @Override
    public Thread newThread(Runnable r)
    {
        int c = atomicInteger.incrementAndGet();
        WorkThread workThread = new WorkThread(r, atomicInteger);// 通过计数器，可以更好的管理线程
        workThread.setName(threadNamePrefix + atomicInteger);
        logger.info("创建  " + c + " 线程: " + workThread);
        return workThread;
    }
}