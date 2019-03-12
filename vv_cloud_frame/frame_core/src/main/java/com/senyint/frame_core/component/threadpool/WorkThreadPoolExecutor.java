
package com.senyint.frame_core.component.threadpool;

import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicLong;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
  * 类名：WorkThreadPoolExecutor<BR>
  * 描述：自定义线程池<BR>
  * 作者： wangshi<BR>
  * 日期 ：2018年12月12日 下午2:46:08<BR>
  *
  */
public class WorkThreadPoolExecutor extends ThreadPoolExecutor
{

    public WorkThreadPoolExecutor(int corePoolSize, int maximumPoolSize, long keepAliveTime, TimeUnit unit,
            BlockingQueue<Runnable> workQueue)
    {
        super(corePoolSize, maximumPoolSize, keepAliveTime, unit, workQueue);
    }

    private static final Logger log = LoggerFactory.getLogger(WorkThreadPoolExecutor.class);
    private final ThreadLocal<Long> startTime = new ThreadLocal<Long>();
    private final AtomicLong numTasks = new AtomicLong();
    private final AtomicLong totalTime = new AtomicLong();
    private long awaitTerminationSeconds = 0;

    public long getAwaitTerminationSeconds()
    {
        return awaitTerminationSeconds;
    }

    public void setAwaitTerminationSeconds(long awaitTerminationSeconds)
    {
        this.awaitTerminationSeconds = awaitTerminationSeconds;
    }

    @Override
    protected void beforeExecute(Thread t, Runnable r)
    {
        super.beforeExecute(t, r);
        log.info(String.format("任务开始执行: Thread %s: Runnable %s", t, r));
        startTime.set(System.nanoTime());
    }

    @Override
    protected void afterExecute(Runnable r, Throwable t)
    {
        try
        {
            long endTime = System.nanoTime();
            long taskTime = endTime - startTime.get();
            numTasks.incrementAndGet();
            totalTime.addAndGet(taskTime);
            log.info(String.format("任务结束执行 Runnable %s, 耗时=%dns", r, taskTime));
        }
        finally
        {
            super.afterExecute(r, t);
        }
    }

    @Override
    protected void terminated()
    {
        try
        {
            log.info(String.format("停止: 平均时间=%dns",totalTime.get()/numTasks.get()));
        }
        finally
        {
            super.terminated();
        }
    }
    
    @Override
    public void shutdown() {
        
        try
        {
            if(awaitTerminationSeconds > 0 ) {
                TimeUnit.SECONDS.sleep(awaitTerminationSeconds);
            }
        } 
        catch (InterruptedException e)
        {
            log.error("shutdown: ",e);
        }
        finally
        {
            super.shutdown();
            
        }
        
    }
//    private void showThreadPoolInfo(String prefix)
//    {
//        ThreadPoolExecutor threadPoolExecutor = this;
//        log.info("{}, {},taskCount [{}], completedTaskCount [{}], activeCount [{}], queueSize [{}]", this.toString(),
//                prefix, threadPoolExecutor.getTaskCount(), threadPoolExecutor.getCompletedTaskCount(),
//                threadPoolExecutor.getActiveCount(), threadPoolExecutor.getQueue().size());
//    }

}
