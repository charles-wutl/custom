package com.digiwin.custom.service.impl;


import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.digiwin.custom.interceptor.AuthenticationInteceptor;
import com.digiwin.custom.service.TodoService;
import com.digiwin.custom.util.PropertiesUtil;
import com.digiwin.custom.util.RecordToMp3;
import com.digiwin.custom.util.http.CustomHttpUtil;
import com.digiwin.custom.util.http.RequestParameterUtil;
import com.seeyon.framework.util.UUIDUtil;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.util.WebUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * Created by sh-wutl on 2017/6/20.
 */
@Service
public class TodoServiceImpl implements TodoService {

    /**
     * CRM日程的详情页面
     *
     * @return
     */
    public String getCrmScheduleScheduleInfoData(HttpServletRequest request)
            throws Exception {
        //获取社区ID
        String companyID= request.getParameter("companyID");
        //获取授权凭证
        String mobile_token = (String) WebUtils
            .getSessionAttribute(request, AuthenticationInteceptor.MOBILE_TOKEN_KEY);

        //获取行程ID
        String schedule_id = request.getParameter("schedule_id");
        String locale = request.getParameter("locale");

        String personID = request.getParameter("personID");

        String service_name = "crm.todo.detail";
        String url = PropertiesUtil.getDigiwinCrmUrl() + "/crm/todo/detail";

        JSONObject root = new JSONObject();
        JSONObject stdData = new JSONObject();
        JSONObject parameter = new JSONObject();

        parameter.put("locale", locale);
        parameter.put("schedule_id", schedule_id);
        parameter.put("service_name", service_name);
        parameter.put("access_token", mobile_token);
        parameter.put("company_id", companyID);

        stdData.put("parameter", parameter);
        root.put("std_data", stdData);

        String str = CustomHttpUtil.doJsonPost(url,root.toJSONString(),personID,request);
        return str;
    }

    /**
     * 取得待辦回填數據
     *
     * @return
     */
    public String getTodoContinueData(HttpServletRequest request)
            throws Exception {
        //获取社区ID
        String companyID= request.getParameter("companyID");
        //获取授权凭证
        String access_token = (String)WebUtils.getSessionAttribute(request, AuthenticationInteceptor.MOBILE_TOKEN_KEY);
        String related_id = request.getParameter("related_id");
        String locale = request.getParameter("locale");
        if (StringUtils.isEmpty(locale)) {
            locale = "zh_CN";
        }
        String personID = request.getParameter("personID");
        String service_name = "crm.v2.todo.detail";
        String url = PropertiesUtil.getDigiwinCrmUrl() + "/crm/v2/todo/detail";

        JSONObject root = new JSONObject();
        JSONObject stdData = new JSONObject();
        JSONObject parameter = new JSONObject();

        parameter.put("locale", locale);
        parameter.put("id", related_id+"※category§custom");
        parameter.put("service_name", service_name);
        parameter.put("access_token", access_token);
        parameter.put("company_id", companyID);

        stdData.put("parameter", parameter);
        root.put("std_data", stdData);

        String str = CustomHttpUtil.doJsonPost(url,root.toJSONString(),personID,request);
        return str;
    }
    /**
     * @param request
     * @Author: Tianluo WU
     * @Email: wutl@digiwin.com
     * @Description: 继续待办数据通过接口提交
     * @Date: 2017/6/16
     * @Time: 17:12
     */
    public String postDataTodoContinue(HttpServletRequest request)
            throws Exception {
        Map<String, Object> reqMap = RequestParameterUtil.getPostDataMap(
                RequestParameterUtil.getPostData(request, false, "UTF-8")
        );

        //获取社区ID
        String companyID = (String) reqMap.get("companyID");
        //获取行程ID
        //String scheduleId = UUIDUtil.getUUID();

        //获取用户ID
        String personID = (String) reqMap.get("personID");
        //获取授权凭证
        String accessToken = (String) reqMap.get("access_token");

        String relatedId = (String) reqMap.get("related_id");
        String finishTime = (String) reqMap.get("finish_time");
        String jobContent = (String) reqMap.get("job_content");
        String todo_type = (String) reqMap.get("todo_type");
        String locale = (String) reqMap.get("locale");
        String schedule_id = (String) reqMap.get("schedule_id");
        String jobDuration = (String) reqMap.get("job_duration");
        String nextSubject = (String) reqMap.get("next_subject");
        List photoDataset = (List) reqMap.get("photo_dataset");
        String received_amount = (String) reqMap.get("received_amount");

        String serviceName = "crm.v2.todo.continue";
        String startTime = (String) reqMap.get("start_time");
        String todoId = (String) reqMap.get("todo_id");
        String todoSn = (String) reqMap.get("todo_sn");

        String finish = finishTime.replace("-", "").replace("/", "").replace(" ", "").replace(":", "");
        String start = startTime.replace("-", "").replace("/", "").replace(" ", "").replace(":", "");

        //组装请求数据格式
        JSONObject root = new JSONObject();
        JSONObject std_data = new JSONObject();
        JSONObject parameter = new JSONObject();
        parameter.put("access_token", accessToken);
        parameter.put("company_id", companyID);
        parameter.put("finish_time", finish);
        parameter.put("job_content", jobContent);
        parameter.put("locale", locale);
        parameter.put("received_amount", received_amount);
        parameter.put("job_duration", jobDuration);
        parameter.put("next_subject", nextSubject);
        parameter.put("photo_dataset", photoDataset);
        parameter.put("schedule_id", schedule_id);
        parameter.put("id", relatedId);
        parameter.put("service_name", serviceName);
        parameter.put("start_time", start);
        parameter.put("todo_id", todoId);
        parameter.put("todo_sn", todoSn);
        parameter.put("todo_type", todo_type);
        std_data.put("parameter", parameter);
        root.put("std_data", std_data);
        //CRM接口
        String newcustomerrecordURL = PropertiesUtil.getDigiwinCrmUrl() + "/crm/v2/todo/continue";
//        String newcustomerrecordURL = "http://180.167.0.42:8668/mockjsdata/9/crm/v2/todo/continue";
        //向CRM接口发送数据
        String str = CustomHttpUtil.doJsonPost(
            newcustomerrecordURL,root.toJSONString(),personID,request);

        return str;
    }

    /**
     * @param request
     * @Author: Tianluo WU
     * @Email: wutl@digiwin.com
     * @Description: 结束待办通过接口提交
     * @Date: 2017/6/16
     * @Time: 18:32
     */
    public String postDataTodoFinish(HttpServletRequest request)
            throws Exception {

        Map<String, Object> reqMap = RequestParameterUtil.getPostDataMap(
                RequestParameterUtil.getPostData(request, false, "UTF-8")
        );

        //获取社区ID
        String companyId = (String) reqMap.get("companyID");
        //获取行程ID
        //String scheduleId = UUIDUtil.getUUID();

        //获取用户ID
        String personID = (String) reqMap.get("personID");
        //获取授权凭证
        String accessToken = (String) reqMap.get("access_token");
        String scheduleId = (String) reqMap.get("schedule_id");
        String related_id = (String) reqMap.get("related_id");
        String jobContent = (String) reqMap.get("job_content");
        String locale = (String) reqMap.get("locale");
        String jobDuration = (String) reqMap.get("job_duration");
        String trace_result = (String) reqMap.get("trace_result");
        String reason_id = (String) reqMap.get("reason_id");
        List photoDataset = (List) reqMap.get("photo_dataset");
        String received_amount = (String) reqMap.get("received_amount");

        String serviceName = "crm.v2.todo.finish";
        String todoId = (String) reqMap.get("todo_id");
        String todoSn = (String) reqMap.get("todo_sn");
        String todo_type = (String) reqMap.get("todo_type");

        //组装请求数据格式
        JSONObject root = new JSONObject();
        JSONObject std_data = new JSONObject();
        JSONObject parameter = new JSONObject();
        parameter.put("access_token", accessToken);
        parameter.put("company_id", companyId);
        parameter.put("job_content", jobContent);
        parameter.put("locale", locale);
        parameter.put("received_amount", received_amount);
        parameter.put("job_duration", jobDuration);
        parameter.put("trace_result", trace_result);
        parameter.put("reason_id", reason_id);
        parameter.put("photo_dataset", photoDataset);
        parameter.put("schedule_id", scheduleId);
        parameter.put("service_name", serviceName);
        parameter.put("todo_id", todoId);
        parameter.put("todo_sn", todoSn);
        parameter.put("todo_type", todo_type);
        parameter.put("id", related_id);
        std_data.put("parameter", parameter);
        root.put("std_data", std_data);
        //CRM接口
        String newcustomerrecordURL = PropertiesUtil.getDigiwinCrmUrl() + "/crm/v2/todo/finish";
//        newcustomerrecordURL = "http://180.167.0.42:8668/mockjsdata/9/crmv2/todo/finish";
        //向CRM接口发送数据
        String str = CustomHttpUtil.doJsonPost(
            newcustomerrecordURL,root.toJSONString(),personID,request);

        return str;
    }

    /**
     * @param request
     * @Author: CJSHIE
     * @Email: cjshie@digiwin.com
     * @Description: 新增待办事项
     * @Date: 2017/6/16
     * @Time: 18:32
     */
    public String postDataTodoCreate(HttpServletRequest request)
            throws Exception {

        Map<String, Object> reqMap = RequestParameterUtil.getPostDataMap(
                RequestParameterUtil.getPostData(request, false, "UTF-8")
        );

        
        //获取社区ID
        String companyId = (String) reqMap.get("companyID");
        //获取行程ID
        //String schedule_id = (String) reqMap.get("schedule_id");

        //获取授权凭证
        String accessToken = (String) reqMap.get("access_token");
//        String scheduleId = (String) reqMap.get("schedule_id");
        String locale = (String) reqMap.get("locale");
        List photoDataset = (List) reqMap.get("photo_dataset");
        Object recordDataset = reqMap.get("record_dataset");
        // add by cjshie 20170907 轉MP3若失敗時, 不要影響原本的邏輯
        try {
            //update by iwutl 2017/09/07  测试录音格式转成mp3 start
        	recordDataset = RecordToMp3.recordToMp3(recordDataset);
        	//update by iwutl 2017/09/07  测试录音格式转成mp3 end
        } catch (Exception e) {
        	System.out.println("recordToMp3 Error!!!!!!!!!!" + e.getMessage());
        	e.printStackTrace();
        }

        String finishTime = (String) reqMap.get("finish_time");
        String importanceId = (String) reqMap.get("importance_id");
        String jobCategory = (String) reqMap.get("job_category");
        String relatedCategoryId = (String) reqMap.get("related_category_id");
        String relatedFormId = (String) reqMap.get("related_form_id");
        String relatedFormType = (String) reqMap.get("related_form_type");
        String startTime = (String) reqMap.get("start_time");
        String subject = (String) reqMap.get("subject");

        String personID = (String) reqMap.get("personID");

        String finish = finishTime.replace("-", "").replace("/", "").replace(" ", "").replace(":", "");
        String start = startTime.replace("-", "").replace("/", "").replace(" ", "").replace(":", "");

        //edit by cjshie 20170908 先新增到行事曆, 才寫回CRM
        String  returnStr = postDataScheduleCreate(reqMap, (HashMap) recordDataset, request);
        //解析回傳字串, 確認是否成功
        JSONObject responseJSON = JSON.parseObject(returnStr);
        if (responseJSON.containsKey("std_data")) {
        	JSONObject data = responseJSON.getJSONObject("std_data");
            JSONObject execution = data.getJSONObject("execution");
            String result = execution.getString("code");
            if ("0".equals(result)) {
                JSONObject param = data.getJSONObject("parameter");
                JSONArray list = param.getJSONArray("schedule_add_list");
                String schedule_id = "";
                if (list != null && list.size() > 0) {
                	schedule_id = list.getJSONObject(0).getString("schedule_id");
                } else {
                	schedule_id = UUIDUtil.getUUID();
                }

                String serviceName = "crm.v2.todo.create";
                //组装请求数据格式
                JSONObject root = new JSONObject();
                JSONObject std_data = new JSONObject();
                JSONObject parameter = new JSONObject();
                parameter.put("access_token", accessToken);
                parameter.put("company_id", companyId);
                parameter.put("locale", locale);
                parameter.put("schedule_id", schedule_id);
                parameter.put("service_name", serviceName);

                parameter.put("finish_time", finish);
                parameter.put("importance_id", importanceId);
                parameter.put("job_category_id", jobCategory);
                parameter.put("photo_dataset", photoDataset);
                parameter.put("record_dataset", recordDataset);

                parameter.put("related_category_id", relatedCategoryId);
                parameter.put("related_form_id", relatedFormId);
                parameter.put("related_form_type", relatedFormType);
                parameter.put("start_time", start);
                parameter.put("subject", subject);

                std_data.put("parameter", parameter);
                root.put("std_data", std_data);
                //CRM接口
                String newcustomerrecordURL = PropertiesUtil.getDigiwinCrmUrl() + "/crm/v2/todo/create";
                //向CRM接口发送数据
                String str = CustomHttpUtil.doJsonPost(
                    newcustomerrecordURL,root.toJSONString(),personID, request);
                return str;
            } else {
            	//若有問題, 直接將移動平台回傳的字串丟回畫面
            	return returnStr;
            }
        } else {
        	//若有問題, 直接將移動平台回傳的字串丟回畫面
        	return returnStr;
        }
    }
    /**
     * 將Todo寫到行事曆中.
     * @param
     * @return
     * @throws Exception
     */
    public String postDataScheduleCreate(Map<String, Object> reqMap, HashMap recordDataset,
        HttpServletRequest request)
            throws Exception {
    	//获取社区ID
        String companyId = (String) reqMap.get("companyID");
        
        //获取授权凭证
        //String accessToken = (String) reqMap.get("access_token");
        String mobileToken = CustomHttpUtil.getMobileServerToken();
        String personId = (String) (reqMap.get("personID") == null ? "" : reqMap.get("personID"));
        String locale = (String) reqMap.get("locale");
        List photoDataset = (List) reqMap.get("photo_dataset");
        //LinkedHashMap recordDataset = (LinkedHashMap) reqMap.get("record_dataset");
        
        String finishTime = (String) reqMap.get("finish_time");
        String importanceName = (String) reqMap.get("importance_Name");
        String jobCategory = (String) reqMap.get("job_category_Name");
        String relatedCategoryId = (String) reqMap.get("related_category_id");
        String relatedFormId = (String) reqMap.get("related_form_id");
        String relatedFormType = (String) reqMap.get("related_form_type");
        String startTime = (String) reqMap.get("start_time");
        String subject = (String) reqMap.get("subject");
        
        String finish = finishTime.replace("-", "").replace("/", "").replace(" ", "").replace(":", "");
        String start = startTime.replace("-", "").replace("/", "").replace(" ", "").replace(":", "");

        String personID = (String) reqMap.get("personID");

        String serviceName = "dinghui.calendar.schedule.add";
        String srcSystemId = "CRM";
        //组装请求数据格式
        JSONObject root = new JSONObject();
        JSONObject std_data = new JSONObject();
        JSONObject parameter = new JSONObject();
        parameter.put("access_token", mobileToken);
        parameter.put("company_id", companyId);
        parameter.put("locale", locale);
        //schedule_detail
        List<JSONObject> scheduleList = new ArrayList<JSONObject>();
        JSONObject schedule_detail = new JSONObject();
        schedule_detail.put("attendees", "");
        schedule_detail.put("datetime_end", finish + "00");
        schedule_detail.put("datetime_finish", "");
        schedule_detail.put("datetime_start", start + "00");
        schedule_detail.put("description", "");
        //ext_schedule_detail
        JSONObject ext_schedule_detail = new JSONObject();
        ext_schedule_detail.put("ext_val", "");
        schedule_detail.put("ext_schedule_detail", ext_schedule_detail);
        
        schedule_detail.put("importance", importanceName);
        schedule_detail.put("job_category", jobCategory);
        schedule_detail.put("notification_type", "05");
        schedule_detail.put("outer_detail_url", PropertiesUtil.getPropertyValueByKey("todo.detail.forwardApplicationId"));
        schedule_detail.put("outer_schedule_id", "");
        schedule_detail.put("person_id", personId);
        if (photoDataset != null && photoDataset.size() > 0) {
        	schedule_detail.put("photo_dataset", photoDataset);
        }
        //position
//        JSONObject position = new JSONObject();
//        position.put("latitude", "");
//        position.put("location", "");
//        position.put("longitude", "");
//        schedule_detail.put("position", position);
        if (recordDataset != null && recordDataset.containsKey("content")) {
        	schedule_detail.put("record_dataset", recordDataset);
        }
        schedule_detail.put("schedule_id", "");
        schedule_detail.put("src_system_access_token", "");
        schedule_detail.put("status", "notstarted");
        schedule_detail.put("status_desc", "");
        schedule_detail.put("task_cycle", "");
        schedule_detail.put("title", subject);
        schedule_detail.put("type", "todo");
        schedule_detail.put("type_desc", getTodoTypeDesc(locale));
        schedule_detail.put("use_ext_only", false);
        schedule_detail.put("use_outer_detail_url", true);
        scheduleList.add(schedule_detail);
        
        parameter.put("schedule_detail", scheduleList);
        parameter.put("service_name", serviceName);
        parameter.put("src_system_id", srcSystemId);
        
        
        std_data.put("parameter", parameter);
        root.put("std_data", std_data);
        //CRM接口
        String url = PropertiesUtil.getMobileServerUrl() + "/openapi/invoke/dinghui/calendar/schedule/add?access_token=" + mobileToken;
        //向CRM接口发送数据
        String str = CustomHttpUtil.doJsonPost(url,root.toJSONString(),personID,request);
        return str;
    }
    /**
     * 取得待辦要顯示的文字
     * @param locale
     * @return
     */
    private String getTodoTypeDesc(String locale) {
    	if ("zh_TW".equals(locale)) {
    		return "待辦事項";
    	} else if ("zh_CN".equals(locale)) {
    		return "待办事项";
    	} else {
    		return "Todo";
    	}
    }
}

