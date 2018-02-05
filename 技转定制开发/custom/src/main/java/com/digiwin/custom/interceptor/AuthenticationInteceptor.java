package com.digiwin.custom.interceptor;

import com.seeyon.esn.entity.digiwin.PersonDigiMiddleware;
import com.seeyon.esn.service.digiwin.PersonDigiMiddlewareService;
import com.seeyon.framework.component.util.StringUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Map;

/**
 * 身份验证拦截器。
 * preHandle方法
 * 把传入本工程的personID与user_id统一为personID，并通过Spring远程调用获取最新的互联应用token，保存在session。
 * postHandle方法
 * 把personID设置到ModelAndView中
 *
 * Created by zaregoto on 2017/9/10.
 */
public class AuthenticationInteceptor extends HandlerInterceptorAdapter {

    /**
     * 移动平台的人员ID，用于在定制页面中刷新互联应用的token
     */
    public static final String PERSON_ID_KEY = "personID";
    /**
     * 互联应用的AccessToken
     */
    public static final String MOBILE_TOKEN_KEY = "mobile_token";

    private static final Logger logger = LoggerFactory.getLogger(AuthenticationInteceptor.class);

    @Autowired
    private PersonDigiMiddlewareService personDigiMiddlewareService;

    @Override public boolean preHandle(HttpServletRequest request, HttpServletResponse response,
        Object handler) throws Exception {
        // 请求的路径
        String requestURI = request.getRequestURI();
        // 请求的方法
        String httpMethod = request.getMethod();

        /**
         * 页面跳转时，URL上必须有：personID或user_id
         */
        // 跳转页面的请求才做拦截处理
        if (httpMethod.equals("GET")) {
            String personID = request.getParameter("personID");
            String userId = request.getParameter("user_id");

            // 打开非CRM二期的页面时通过
            if (!requestURI.contains("/mp/crm/v2")) {
                return true;
            }
            String finalPersonIDValue = StringUtil.isNotEmpty(personID) ? personID.trim() : userId.trim();
            if (null == request.getAttribute(PERSON_ID_KEY)) {
                request.setAttribute(PERSON_ID_KEY, finalPersonIDValue);
            } else {
                if (!request.getAttribute(PERSON_ID_KEY).equals(finalPersonIDValue)) {
                    request.setAttribute(PERSON_ID_KEY, finalPersonIDValue);
                }
            }

            PersonDigiMiddleware personDigiMiddleware = personDigiMiddlewareService
                .findPersonDigiMiddlewareByPersonID(finalPersonIDValue);
            if (null == personDigiMiddleware) {
                logger.info("Cannot find persondigimiddleware by personID:{}, please check it out.",
                    finalPersonIDValue);
                return false;
            }
            String mobileToken = personDigiMiddleware.getAccessToken();
            request.getSession().setAttribute(MOBILE_TOKEN_KEY, mobileToken);

            logger.info("Request URI:{}\n"
                + "Request set personID:{}\n"
                + "Session set DigiAppMiddleware mobileToken:{}",
                requestURI, finalPersonIDValue, mobileToken);

            return true;
        }
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler,
        ModelAndView modelAndView) throws Exception {
        if (null != modelAndView) {
            Map modelMap = modelAndView.getModel();
            if (null != modelMap) {
                modelAndView.addObject(PERSON_ID_KEY, request.getAttribute(PERSON_ID_KEY));
            }
        }
        super.postHandle(request, response, handler, modelAndView);
    }
}
