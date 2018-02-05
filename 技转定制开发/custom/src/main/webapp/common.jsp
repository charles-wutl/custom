<%--引入jstl、定义上下文对象ctxPath、国际化资源--%>
<%@ page pageEncoding="utf-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<c:set var="ctxPath" value="${pageContext.request.contextPath}" />
<%@ taglib prefix="c5" uri="http://www.seeyon.com/tags" %>
<script>
    //上下文对象
    var ctxPath= "${ctxPath}";
    //语言别参数
    var locale= "${locale}";
</script>
