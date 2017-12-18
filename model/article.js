//model作用：让程序做到根据实体类自动创建数据库
//利用sequelize,示例代码如下
//注意：只是示例，依赖包未装，代码也只是演示做法，和本次项目无关
const T=require('sequelize');  
  
const employee = {  
    id:{type:T.INTEGER.UNSIGNED,primaryKey:true,autoIncrement:true},  
   name:{type:T.STRING(20),allowNull:false},  
   age:{type:T.INTEGER,allowNull:false,defaultValue:1},  
   email:{type:T.STRING(20),allowNull:false},  
   depart_id:{type:T.INTEGER.UNSIGNED,allowNull:false}  
};  
  
module.exports = function(sequelize){  
    return sequelize.define('employee',employee,{  
        'timestamps': false,  
        'indexes':[{name:'idx_employee',fields:['name'],uniq:true}]  
    });  
};  