# 数据库规范

## 数据库内容

 种类表(category)：
        id:string
        content:string
 用户表(user)：

        user_id  [key]:string
        user_name:string
        user_email [key]:string
        user_pwd:string
        user_avatar:string
        user_role:string
        user_activation_code:string
        user_status:string
  
文章表(article):

        article_id[key]:string
        article_title:string
        article_content:string
        article_author_id:string
        article_ category:string

评论表(comment):

        comment_id[key]:string
        comment_content:string
        comment_time:string
        comment_author_id:string
    

用户-文章关系表(user-article):

      id[key]:string
      user_id[foreign key]:string
      article_id[foreign key]:string
      time:string

用户-评论关系表(user-comment)：

     id[key]:string
     user_id[foreign key]:string
     article_id[foreign key]:string
     comment_id[foreign key]:string
     time:string

文章-评论关系表(article-comment)：

    id[key]:string
    article_id[foreign key]:string
    comment_id[foreign key]:string
    time:string

# API 规范

## API
### 前台
0. 注册||激活码，登录
1. 获取主页
2. 获取各类别页面
3. 获取个人中心
4. 获取某篇文章的详情
5. 获取某篇文章的评论
6. 删除某篇文章
7. 删除某篇评论
8. 修改个人中心
9. 注销
10. 删除用户

### 后台
1. 获取所有用户信息（n>=1）
2. 更新部分用户信息（n>=1）
3. 删除部分用户信息（n>=1）

## 注册

|     url   |                    header                |methods|
| -------- | ----------------------------------| ----------  |
| /signup/  | Content-Type:application/json|POST|

URL PARAMS:None

POST DATA:

    {
        "password":string,
        "user_name":string,
        "activation_code":string
        "email":string,
    }

RETURN DATA:NONE

STATUS CODE:

    200 //成功 
    401 // 用户名已存在 
    402 // 邮箱已注册
    405 //验证码错误 

## 获取验证码
   |     url   |                    header                |methods|
| -------- | ----------------------------------| ---------- |
| /get_activation_code/  | Content-Type:application/json|POST|

URL PARAMS:NONE

POST DATA:

    {
        "email":string
    }
RETURN DATA:NONE

STATUS CODE:

        200 //已发送
        403 // 邮箱已注册
        404 //邮箱不存在
        
        
## 登录
|     url   |                    header                |methods|
| -------- | ----------------------------------| ---------- |
| /login/  | Content-Type:application/json|POST|

URL PARAMS:NONE

POST DATA:

    {
        "emial":string,
        "password":string,
    }

RETURN DATA:
    {
        "user_name":string,
    }

STATUS CODE:

        200 //成功 
        403 // 没有这个用户
        401 // 密码不正确    
   

    
## 获取主页

|     url   |                    header                |methods|
| -------- | ----------------------------------| ---------- |
| /  | Content-Type:application/json|GET|

URL PARAMS:

    {
        "page":int,
        "sort":string
    }

POST DATA:NONE

RETURN DATA:

    {
      "articles":[
          {
              "id":string,
              "content":string,
              "title":string,
              "category":string,
              "date":date,
              "user_id":string,
              "user_name":string,
              "user_avatar":string,
              "comment_num":string,
          }
      ],
      "page":int  //当前页数
      "allpage_count":int //总页数
    }

STATUS CODE:

        200 //成功 
        404 //查找页数不存在

## 获取个人中心


|     url   |                    header                |methods|
| -------- | ----------------------------------| ---------- |
| /information  | Content-Type:application/json|POST|

URL PARAMS:NONE


POST DATA:

    {
        "user_id":string,
    }

RETURN DATA:

    {
        "user_name":string,
        "email":string,
        "user_avatar":string
        "aticle_num":int,
        "comment_num":int
    }

STATUS CODE:

        200 //成功 
        404 //查无此人


## 获取某篇文章的详情包括评论


|     url   |                    header                |methods|
| -------- | ----------------------------------| ---------- |
| /article /{id}/views| Content-Type:application/json|POST|

URL PARAMS:

    {
        "article_id":string
    }

POST DATA:NONE

RETURN DATA:

    {
        "comments":[{
            "comment":string,
            "date":date,
            "comment_author_name":string,
            "comment_author_avatar":string,
        }],
        "article":{
            "article_id":string,
            "article_title":string,
            "article_content":string,
            "article_author_name":string,
            "article_author_avatar":string,
            "article_category":string,
            "comment_num":int
        }
    }

STATUS CODE:

        200 //成功 
        404 //文章不存在



## 删除某篇文章


|     url   |                    header                |methods|
| -------- | ----------------------------------| ---------- |
| /article/{id}/delete  | Content-Type:application/json|DELETE|

URL PARAMS:

    {
        "article_title":string
    }


POST DATA:

    {
        "title_id":string,
    }

RETURN DATA:NONE

STATUS CODE:

        200 //成功 
        401 //未登录
        404 //无此文章
        403 //无权限

## 删除某篇评论


|     url   |                    header                |methods|
| -------- | ----------------------------------| ---------- |
| /comment/{id}/delete  | Content-Type:application/json|DELETE|

URL PARAMS: NONE

POST DATA:

    {
         "comment_id":string
         "user_id":string,
    }

RETURN DATA:NONE

STATUS CODE:

        200 //成功 
        401 //未登录
        403 //无权限
        404 //无此评论
        

## 修改个人资料(除邮箱和密码)


|     url   |                    header                |methods|
| -------- | ----------------------------------| ---------- |
| /information/{username}  | Content-Type:application/json|UPDATE|

URL PARAMS:

    {
        "user_name":string
    }


POST DATA:

    {
        "user_id":string,
        "user_name":string,
        "user_avatar":string
    }

RETURN DATA:NONE

STATUS CODE:

        200 //成功 
        403 //无权限




## 修改个人密码


|     url   |                    header                |methods|
| -------- | ----------------------------------| ---------- |
| /information/{username}/pwd  | Content-Type:application/json|UPDATE|

URL PARAMS:

    {
        "user_name":string
    }


POST DATA:

    {
        "user_id":string,
         "user_old_password":string,
         "user_new_password":string
    }

RETURN DATA:NONE

STATUS CODE:

        200 //成功 
        403 //密码错误


## 修改个人邮箱


|     url   |                    header                |methods|
| -------- | ----------------------------------| ---------- |
| /information/{username}/email  | Content-Type:application/json|UPDATE|

URL PARAMS:

    {
        "user_name":string
    }


POST DATA:

    {
        "user_id":string,
        "user_mail":string,
        "activation_code":string
    }

RETURN DATA:NONE

STATUS CODE:
   
        200 //已发送
        403 // 邮箱已注册
        404 //邮箱不存在
        405 //验证码错误

## 发表文章

|     url   |                    header                |methods|
| -------- | ----------------------------------| ---------- |
| /article/send  | Content-Type:application/json|POST|

URL PARAMS:NONE

POST DATA:

    {
        "title":string,
        "content":string,
        "category":string,
        "user_id":string,
    }

RETURN DATA:NONE

STATUS CODE:

    200 //成功
    401 //未登录


## 发表评论

|     url   |                    header                |methods|
| -------- | ----------------------------------| ---------- |
| /comment/send  | Content-Type:application/json|POST|

URL PARAMS:NONE

POST DATA:

    {
        "content":string,
        "article_id":string,
        "article_author_id":string,
        "comment_author_id":string,
    }

RETURN DATA:NONE

STATUS CODE:

    200 //成功
    401 //未登录

## 修改除某篇文章


|     url   |                    header                |methods|
| -------- | ----------------------------------| ---------- |
| /article/{name}  | Content-Type:application/json|UPDATE|

URL PARAMS:

    {
        "article_name":string
    }


POST DATA:

    {
        "article_id":string
        "user_id":string,
        "content":string,
        "title":string,
        "category":string,
        "date":date
    }

RETURN DATA:   NONE

STATUS CODE:

        200 //成功 
        401 //未登录
        404 //无此文章
        403 //无权限
