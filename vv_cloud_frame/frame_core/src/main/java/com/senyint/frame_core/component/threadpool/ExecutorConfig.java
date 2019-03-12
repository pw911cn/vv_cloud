
package com.senyint.frame_core.component.threadpool;

import java.lang.reflect.Method;
import java.util.concurrent.Executor;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.aop.interceptor.AsyncUncaughtExceptionHandler;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.AsyncConfigurer;
import org.springframework.scheduling.annotation.EnableAsync;

/**
 * 类名：ExecutorConfig<BR>
 * 描述：线程池配置类<BR>
 * 作者： wangshi<BR>
 * 日期 ：2018年12月4日 上午10:33:11<BR>
 */
@Configuration
@EnableAsync
public class ExecutorConfig implements AsyncConfigurer
{

    private static final Logger logger = LoggerFactory.getLogger(ExecutorConfig.class);

    private int corePoolSize = 5;

    private int maxPoolSize = 10;

    private int queueCapacity = 200;

    private String threadNamePrefix = "async-threadpool-";

    /**
     * <p>
         * 名称: taskExecutor<BR>
         * 描述: 声明线程池，springboot会优先使用名称为'taskExecutor'的线程池<BR>
         * 作者: wangshi<BR>
         * 日期: 2018年12月4日 下午3:07:15<BR>
     * 
     * @return Executor
     */
    @Bean
    public Executor taskExecutor()
    {
        logger.info("start taskExecutor");
        WorkThreadPoolExecutor executor = new WorkThreadPoolExecutor(corePoolSize, maxPoolSize, 60L, TimeUnit.SECONDS,
                new LinkedBlockingQueue<Runnable>(queueCapacity));
        executor.setThreadFactory(new WorkThreadFactory(threadNamePrefix));
        executor.setRejectedExecutionHandler(new ThreadPoolExecutor.CallerRunsPolicy());
        executor.setAwaitTerminationSeconds(3);
        return executor;
    }

    /**
     * <p>
     * 重写_方法：getAsyncUncaughtExceptionHandler<BR>
     * 描述：异常统一处理方法<BR>
     * 作者：wangshi<BR>
     * 重写_日期2018年12月4日 下午3:01:32<BR>
     * </p>
     * 
     * @return ExecutorConfig
     * @see org.springframework.scheduling.annotation.AsyncConfigurer#getAsyncUncaughtExceptionHandler()
     */

    @Override
    public AsyncUncaughtExceptionHandler getAsyncUncaughtExceptionHandler()
    {
        return new MyAsyncExceptionHandler();
    }

    /**
     * 类名：MyAsyncExceptionHandler<BR>
     * 描述：自定义异常类<BR>
     * 作者： wangshi<BR>
     * 日期 ：2018年12月4日 下午1:56:11<BR>
     */
    class MyAsyncExceptionHandler implements AsyncUncaughtExceptionHandler
    {

        @Override
        public void handleUncaughtException(Throwable throwable, Method method, Object... obj)
        {
            logger.error("Exception message - " + throwable.getMessage());
            logger.error("Method name - " + method.getName());
            for (Object param : obj)
            {
                logger.error("Parameter value - " + param);
            }
            logger.error("Exception - ", throwable);
        }

    }
}
