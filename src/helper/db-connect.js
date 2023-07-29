const mysql=require('mysql');

module.exports = function () {
    const db =mysql.createConnection({
        host: process.env.HOST,
        user: process.env.USER_NAME,
        password: process.env.PASSWORD,
        database: process.env.DATABASE,
      });
    
    db.connect(function (err) {
        if (err) {
            throw err;
        }
        console.log("Mysql Connected!");
    });
    return db;
};