package com.senyint.frame_core.component.httpclient;

import java.io.IOException;

import org.apache.http.HttpEntity;
import org.apache.http.HttpResponse;
import org.apache.http.StatusLine;
import org.apache.http.client.ClientProtocolException;
import org.apache.http.client.HttpResponseException;
import org.apache.http.client.ResponseHandler;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

/**
 * 默认的ResponseHandler
 * 
 * @author zhangyanchao
 *
 */
public class DefaultResponseHandler implements ResponseHandler<DefaultResponse> {

    private static Logger LOGGER = LoggerFactory.getLogger(DefaultResponseHandler.class);

    @Override
    public DefaultResponse handleResponse(HttpResponse response) throws ClientProtocolException, IOException {
        final StatusLine statusLine = response.getStatusLine();
        LOGGER.info("response statusCode : " + statusLine.getStatusCode());

        final HttpEntity entity = response.getEntity();

        // 状态码>=400的请求认为为失败请求
        /*if (statusLine.getStatusCode() >= 400) {
            EntityUtils.consume(entity);
            throw new HttpResponseException(statusLine.getStatusCode(), statusLine.getReasonPhrase());
        }*/

        String content = entity == null ? null : EntityUtils.toString(entity);

        return new DefaultResponse(content, statusLine.getStatusCode());
    }

}
