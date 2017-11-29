# 数据库规范

## 数据库内容
 种类表：
        content:string
 用户表：
        user_id  [key]:string
        user_name:string
        user_email [key]:string
        user_pwd:string
        user_avatar_url:string
        user_role:string
        user_activation_code:string
        user_status:string
  
文章表:
        article_id[key]:string
        article_title:string
        article_content:string
        article_author_id:string
        article_ category:string

评论表:
        comment_id[key]:string
        comment_content:string
        comment_time:string
        comment_author_id:string

用户-文章关系表:
      id[key]:string
      user_id[foreign key]:string
      article_id[foreign key]:string
      time:date

用户-评论关系表：
     id[key]:string
     user_id[foreign key]:string
     article_id[foreign key]:string
     comment_id[foreign key]:string
     time:date
文章-评论关系表：
    id[key]:string
    article_id[foreign key]:string
    comment_id[foreign key]:string
    time:date

# API 规范

## API
0. 注册||激活码，登录
1. 获取主页
2. 获取各类别页面
3. 获取个人中心
4. 获取某篇文章的详情
5. 获取某篇文章的评论
6. 删除某篇文章
7. 删除某篇评论
8. 修改个人中心

## 注册

|     url   |                    header                |methods|
| -------- | ----------------------------------| ----------  |
| /signup/  | Content-Type:application/json|POST|

URL PARAMS:None

POST DATA:
    {
        "password":string,
        "username":string,
        "email":string,
    }

RETURN DATA:NONE

STATUS CODE:
    200 //成功 
    401 // 用户名已存在 
    402 // 邮箱已注册
    403 // 邮箱未激活

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
        "usename":string,
    }

STATUS CODE:

        200 //成功 
        403 // 没有这个用户
        401 // 密码不正确    

    
