package com.digiwin.custom.controller;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.digiwin.custom.service.TodoService;
import com.digiwin.custom.util.PropertiesUtil;
import com.seeyon.framework.util.JsonHelper;
import com.seeyon.framework.util.UUIDUtil;

/**
 * @Author: Tianluo WU
 * @Email: wutl@digiwin.com
 * @Description: “待办”
 * @Date: 2017/6/15
 * @Time: 22:13
 */
@Controller
@RequestMapping(value = "/r")
public class TodoController {
    @Autowired
    private TodoService todoService;

    private Logger log = LoggerFactory.getLogger(TodoController.class);

    /**
     * @param
     * @Author: Tianluo WU
     * @Email: wutl@digiwin.com
     * @Description: 继续待办页面
     * @Date: 2017/6/15
     * @Time: 10:39
     */
    @RequestMapping(value = "/mp/crm/v2/todo/continue")
    public ModelAndView goToContinue(HttpServletRequest request) throws Exception {
        ModelAndView mv = new ModelAndView();
        String locale = request.getParameter("locale");
        String companyID = request.getParameter("companyID");
        String personID = request.getParameter("personID");
        String access_token = request.getParameter("access_token");
        if (StringUtils.isEmpty(locale)) {
            locale = "zh_CN";
        }
        String related_id = request.getParameter("related_id");

        //获取继续待办页面时，把数据也一起带回来
        String continueData = new String();
        try {
            continueData = todoService.getTodoContinueData(request);
        }catch (Exception e){
            log.info("获取待办详情资料失败");
        }

        mv.addObject("locale", locale);
        mv.addObject("companyID", companyID);
        mv.addObject("personID", personID);
        mv.addObject("access_token", access_token);
        mv.addObject("related_id", related_id);
        mv.addObject("scheduleId", "");
        mv.addObject("mobileServer", PropertiesUtil.getMobileServerUrl());
        mv.addObject("continueData", JsonHelper.object2json(continueData));

        mv.setViewName("/todo/142_continue");
        return mv;
    }

    /**
     * @param request
     * @Author: Tianluo WU
     * @Email: wutl@digiwin.com
     * @Description: 继续待办数据通过接口提交
     * @Date: 2017/6/16
     * @Time: 17:12
     */
    @RequestMapping(value = "/mp/crm/v2/todo/continue/post/data", method = RequestMethod.POST)
    @ResponseBody
    public String postDataTodoContinue(HttpServletRequest request) throws Exception {

        String str = todoService.postDataTodoContinue(request);

        return str;
    }


    /**
     * @param request
     * @Author: CJSHIE
     * @Email: cjshie@digiwin.com
     * @Description: 新增待办页面
     * @Date: 2017/07/18
     */
    @RequestMapping(value = "/mp/crm/v2/todo/create")
    public ModelAndView goToCreate(HttpServletRequest request) {
        ModelAndView mv = new ModelAndView();
        String locale = request.getParameter("locale");
        String companyID = request.getParameter("companyID");
        String personID = request.getParameter("personID");
        String access_token = request.getParameter("access_token");
        if (request.getParameter("mobile_token") != null) {
            access_token = request.getParameter("mobile_token");
        }
        if (StringUtils.isEmpty(locale)) {
            locale = "zh_CN";
        }
        String currentDate = request.getParameter("currentDate");
        String schedule_id = request.getParameter("schedule_id");
        schedule_id = UUIDUtil.getUUID();

        String todo_id = request.getParameter("todo_id");
        String todo_sn = request.getParameter("todo_sn");

        mv.addObject("locale", locale);
        mv.addObject("companyID", companyID);
        mv.addObject("personID", personID);
        mv.addObject("access_token", access_token);
        mv.addObject("schedule_id", schedule_id);
        mv.addObject("todo_id", todo_id);
        mv.addObject("todo_sn", todo_sn);
        mv.addObject("currentDate", currentDate);

        mv.setViewName("/crmv2/todo/156_create");
        log.info("goToPage==" + mv.toString());
        return mv;
    }

    /**
     * 新增待辦事項
     *
     * @return
     */
    @RequestMapping(value = "/mp/crm/v2/todo/create/post/data")
    @ResponseBody
    public String postDataTodoCreate(HttpServletRequest request) throws Exception {
        String str = todoService.postDataTodoCreate(request);
        return str;
    }

    /**
     * 取得繼續待辦回填數據
     *
     * @return
     */
    @RequestMapping(value = "/mp/crm/v2/todo/getTodoContinue/data")
    @ResponseBody
    public String getTodoContinueData(HttpServletRequest request) throws Exception {
        String str = todoService.getTodoContinueData(request);
        return str;
    }

}
