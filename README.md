# 基于REST风格，遵循swagger语法的API规范

**注意事项:**

1. URL中不能包含动词而应该使用名词，动词应该放在HTTP请求头中
2. URL中不能包含版本号，版本号应该在HTTP请求头中
3. 出于安全考虑，URL中不应该暴露数据库信息也不应该对资源状态有所改变，比如参数中不能含有数据库中的ID等。
4. 警惕返回结果的大小。对返回结果加入限制，可以用HTTP中的link进行分页，也可以后台提前分页，再返回。

## [SwaggerAPI规范](./readme.eyaml)（YAML语言）


如想更直观化，请将代码复制至此[网页](https://editor.swagger.io//?_ga=2.222477339.1439974010.1512016881-811929844.1512016881#/)

   