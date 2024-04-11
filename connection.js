
const mysql= require("mysql2");
var mysqlconnection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "khushalvk18@",
    database: "delta_app"
  });

  mysqlconnection.connect((err)=>{
    if(err){
        console.log('error in db connection '+json.Stringify(err,undefined,2));
    }else{
        console.log('DB connected successfully')
    }
  })

  module.exports=mysqlconnection