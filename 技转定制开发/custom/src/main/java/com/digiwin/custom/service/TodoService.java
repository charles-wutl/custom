package com.digiwin.custom.service;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by sh-wutl on 2017/6/20.
 */
public interface TodoService {
    String postDataTodoContinue(HttpServletRequest request) throws Exception;
    String postDataTodoCreate(HttpServletRequest request) throws Exception;
    String getTodoContinueData(HttpServletRequest request) throws Exception;
}
