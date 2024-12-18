const mysql=require('mysql2')
require("dotenv").config(); 

const db = mysql.createPool({
    host : "localhost",
    user : "root",
    password : "Sry#9789506",
    database : "autosys",
    port : 3306,
    multipleStatements : true
})
db.getConnection((err)=>{
    if(err){
        console.log("database connection failed:" ,err)

    }
    else{
        console.log("database connected")
    }

})

module.exports=db